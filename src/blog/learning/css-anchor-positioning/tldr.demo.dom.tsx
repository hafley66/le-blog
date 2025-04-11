import { autoDemo } from "~/lib/client/auto-demo"

const Demo = () => (
  <div>
    {String.raw`
    <style>
      
      #my-button-popover-trigger {
        anchor-name: --my-important-button;
      }

      #my-popover {
        margin: 0px;
        position: absolute;
        position-anchor: --my-important-button;
        position-area: top center;
        position-try-fallbacks: flip-block;
      }
    </style>
    `}
    <button
      id="my-button-popover-trigger"
      popovertarget="my-popover"
      className="btn--blue"
    >
      Open Tooltip
    </button>

    <div id="my-popover" popover>
      Tooltip! Thats all it takes now. I dont know all
      changes but as of 2025/04/06, quite a few changes have
      happened. Here is the spec,{" "}
      <a href="https://www.w3.org/TR/css-anchor-position-1/#changes">
        take a look at changes
      </a>
    </div>
  </div>
)

export default Demo
