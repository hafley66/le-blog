import { Observable, map, scan, startWith, tap, withLatestFrom } from "rxjs";
import $ from "jquery";
import { drawTick, fromEventDelegate, mergeByKeyScan, mouseMove$ } from "./lib";

const hex = $("#hex");
const metrics$ = new Observable<void>(() => {
  const metricsDiv = $(`
    <div style="position: fixed; top: 10px; right: 10px; background: rgba(255, 255, 255, 0.8);
                padding: 5px; border-radius: 5px; box-shadow: 0 0 5px rgba(0,0,0,0.3); z-index: 1000;">
      <div>FPS: <span id="fpsValue">0</span></div>
      <div>Mouse px/s: <span id="mouseVelValue">0</span></div>
    </div>
  `).appendTo("body");

  const fpsValue = $("#fpsValue");
  const velValue = $("#mouseVelValue");

  let lastTime = performance.now();
  let id: number;

  const updateFPS = () => {
    const currentTime = performance.now();
    const deltaTime = currentTime - lastTime;
    const fps = Math.round(1000 / deltaTime);
    fpsValue.text(fps.toString());
    lastTime = currentTime;
    id = requestAnimationFrame(updateFPS);
  };

  const mouseSubscription = mouseMove$.subscribe(vel => {
    const speed = Math.sqrt(vel.x * vel.x + vel.y * vel.y);
    velValue.text(Math.round(speed));
  });

  updateFPS();

  return () => {
    metricsDiv.remove();
    id && cancelAnimationFrame(id);
    mouseSubscription.unsubscribe();
  };
});

metrics$.subscribe(); /**
 * An observable that emits the form element.
 */
const form$ = new Observable<HTMLElement>(subscriber => {
  const form = $(`
    <form style="position: fixed; top: 10px; left: 10px; background: rgba(255, 255, 255, 0.8);
                padding: 10px; border-radius: 5px; box-shadow: 0 0 5px rgba(0,0,0,0.3); z-index: 1000;">
      <label>Velocity X: <input type="number" id="velocityX" value="2" style="width: 50px; margin-right: 5px;"></label>
      <label>Velocity Y: <input type="number" id="velocityY" value="2" style="width: 50px;"></label>
    </form>
  `).appendTo("body");

  subscriber.next(form[0]);

  return () => form.remove();
});

const velocityX$ = fromEventDelegate("#velocityX", "input").pipe(
  map(() => +($("#velocityX").val() as string) || 2),
);

const velocityY$ = fromEventDelegate("#velocityY", "input").pipe(
  map(() => +($("#velocityY").val() as string) || 2),
);

if (hex.length) {
  const screenWidth = window.innerWidth - hex.width()!;
  const screenHeight = window.innerHeight - hex.height()!;
  const velocity$ = mergeByKeyScan(
    {
      dx: velocityX$,
      dy: velocityY$,
    },
    { dx: 2, dy: 2 },
  );

  const animationTimer$ = drawTick.pipe(
    withLatestFrom(velocity$, mouseMove$, form$.pipe(startWith(null))),
    scan(
      (state, [t, velocity, mouseVel]) => {
        let { x, y, xd, yd } = state;

        // Get hex bounds
        const hexBounds = hex[0].getBoundingClientRect();

        // Check for intersection
        const isIntersecting =
          mouseVel.currentX >= hexBounds.left &&
          mouseVel.currentX <= hexBounds.right &&
          mouseVel.currentY >= hexBounds.top &&
          mouseVel.currentY <= hexBounds.bottom;

        // Apply base velocity
        x += velocity.dx * xd;
        y += velocity.dy * yd;

        // Only apply impulse on intersection
        if (isIntersecting) {
          x += mouseVel.x * 20;
          y += mouseVel.y * 20;
        }

        if (x <= 0 || x >= screenWidth) xd *= -1;
        if (y <= 0 || y >= screenHeight) yd *= -1;

        hex.css("transform", `translate(${x}px, ${y}px)`);

        return { x, y, xd, yd };
      },
      { x: 100, y: 100, xd: 1, yd: 1 },
    ),
  );

  animationTimer$.subscribe();
}
