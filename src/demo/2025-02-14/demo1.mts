import { range } from "lodash";
import {
  Observable,
  filter,
  fromEvent,
  map,
  mergeMap,
  of,
  scan,
  startWith,
  tap,
  withLatestFrom,
} from "rxjs";
import $ from "jquery";
import { drawTick, mergeByKeyScan } from "../../lib.dual.mts";
import { fromEventDelegate, mouseMove$ } from "../../lib.dom.mts";

const GEN_HEX = () => String.raw`
  <svg class="hex" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <polygon points="50 0 100 25 100 75 50 100 0 75 0 25" fill="black" />
    <text x="50" y="55" text-anchor="middle" fill="white" font-family="Arial" font-size="20">DVD</text>
  </svg>
`;

const metrics$ = new Observable<void>(() => {
  const metricsDiv = $(String.raw`
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
  const form = $(String.raw`
    <form style="position: fixed; top: 10px; left: 10px; background: rgba(255, 255, 255, 0.8);
                padding: 10px; border-radius: 5px; box-shadow: 0 0 5px rgba(0,0,0,0.3); z-index: 1000;">
      <label>Hex Count:  <input type="number" id="count" value="1" style="width: 50px;"></label> 
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

const inputChange$ = fromEventDelegate("#count", "input").pipe(
  map(i => +($("#count").val() as string) || 2),
  startWith(1),
  // shareReplay({ bufferSize: 1, refCount: true }),
);

const velocity$ = mergeByKeyScan(
  {
    dx: velocityX$,
    dy: velocityY$,
  },
  { dx: 2, dy: 2 },
);

const screenBoundary$ = fromEvent(window, "resize").pipe(
  map(() => ({
    width: window.innerWidth,
    height: window.innerHeight,
  })),
  startWith({ width: window.innerWidth, height: window.innerHeight }),
);

const animationTimer$ = (hex: JQuery<HTMLElement>) =>
  drawTick.pipe(
    withLatestFrom(velocity$, mouseMove$, screenBoundary$),
    scan(
      (state, [t, velocity, mouseVel, windowSize]) => {
        let { x, y, xd, yd, rafId } = state;

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

        const screenWidth = windowSize.width - hex.width()!;
        const screenHeight = windowSize.height - hex.height()!;
        if (x <= 0 || x >= screenWidth) xd *= -1;
        if (y <= 0 || y >= screenHeight) yd *= -1;
        try {
          if (rafId) cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(() => {
            hex.css("transform", `translate(${x}px, ${y}px)`);
          });
        } catch (e) {
          console.log(e);
        }
        return { x, y, xd, yd, rafId };
      },
      { x: 100, y: 100, xd: 1, yd: 1, rafId: 0 },
    ),
  );

inputChange$
  .pipe(
    scan(
      ([prev], next) => {
        return next > prev ? [next, next - prev] : [next, 0];
      },
      [0, 0],
    ),
    filter(([count, diff]) => diff > 0),
    tap(console.log),
    mergeMap(([count, diff], cIndex) => {
      console.log("Wtf", count, diff);
      return of(...range(diff)).pipe(
        mergeMap(i => {
          const hex = $(GEN_HEX()).appendTo(".hexagon");
          return animationTimer$(hex).pipe(
            map(next => ({ i: i + diff, next, cIndex })),
            // takeUntil(inputChange$.pipe(filter(i => i < count + diff))),
          );
        }),
      );
    }),
    withLatestFrom(form$.pipe(startWith(null))),
  )
  .subscribe();
