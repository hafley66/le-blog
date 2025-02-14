import { Observable, map, scan, tap, withLatestFrom } from "rxjs";
import $ from "jquery";
import { drawTick, fromEventDelegate, mergeByKeyScan } from "./lib";

const hex = $("#hex");

/**
 * An observable that emits the FPS value.
 */
const fps$ = new Observable<number>(subscriber => {
  const fpsDiv = $(`
    <div style="position: fixed; top: 10px; right: 10px; background: rgba(255, 255, 255, 0.8);
                padding: 5px; border-radius: 5px; box-shadow: 0 0 5px rgba(0,0,0,0.3); z-index: 1000;">
      FPS: <span id="fpsValue">0</span>
    </div>
  `).appendTo("body");
  const fpsValue = $("#fpsValue");
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
  updateFPS();
  return () => (fpsDiv.remove(), id && cancelAnimationFrame(id));
});

fps$.subscribe();
/**
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
  console.log({ screenHeight, screenWidth });
  const velocity$ = mergeByKeyScan(
    {
      dx: velocityX$,
      dy: velocityY$,
    },
    { dx: 2, dy: 2 },
  ).pipe(tap(console.log));

  const animationTimer$ = drawTick.pipe(withLatestFrom(velocity$)).pipe(
    tap(form$), // Ensure form is created at the start
    scan(
      (state, [t, { dx, dy }]) => {
        let { x, y, xd, yd } = state;

        x += dx * xd;
        y += dy * yd;

        if (x <= 0 || x >= screenWidth) xd *= -1;
        if (y <= 0 || y >= screenHeight) yd *= -1;

        hex.css("transform", `translate(${x}px, ${y}px)`);

        return { x, y, xd, yd };
      },
      { x: 100, y: 100, xd: 1, yd: 1 },
    ),
  );
}
