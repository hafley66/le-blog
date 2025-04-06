// deno-lint-ignore-file jsx-key
import { Render$ } from "~/lib/0_RenderBase.deno.tsx"
import { SUB } from "~/blog/learning/css-anchor-positioning/SITEMAP.deno.ts"
const $ = Render$(import.meta.filename!)

export default $.SSGLayout({
  title: "Notes: CSS Anchor Positioning",
  description: "position: absolute KAIOKEN x 10",
  date_created: "2025-02-25",
  tags: ["css", "anchor-positioning"],
  ...$.md`

## TLDR;
Popper.js is now in html+css lol. But extremely ergonomic.......if they stopped updating the spec. [This chrome blog announcement is outdated lol](https://developer.chrome.com/blog/anchor-positioning-api)

${
  $.CodeTabs.markdown`
~~~html
<button 
  id="my-button-popover-trigger"
  popovertarget="my-popover"
> 
  Open Tooltip 
</button>

<div 
  id="my-popover"
  popover
> 
  Tooltip! Thats all it takes now. Checkout the css for 
</div>
~~~

~~~css
#my-button-popover-trigger {
  anchor-name: --my-important-button;
}

#my-popover {
  /* Step 0: Reset popover css defaults :( */
  margin: unset;
  /* Popper.js offset module is just margin so here is that replacement. */

  position: absolute;
  position-anchor: --my-important-button;
  position-area: top center;
  position-try-fallbacks: flip-block;
}
~~~
` //``
}

${SUB.fs["tldr.demo.dom.tsx"].DemoScript()}


This SUPER powers \`position: absolute\`, my favorite css feature. It's a natural evolution and its pretty great.

### Perhaps a chart
~~~d2
vars: {
  d2-config: {
    layout-engine: elk
  }
}
css: {
  anchor: |css
    #my-anchor {
      anchor-name: --my-anchor-name;
    }
  |

  popover: |css
    #my-popover {
      margin: 0px;
      position: absolute;
      position-anchor: --my-anchor-name;
      position-area: top center;
      position-try-fallbacks: flip-block;
    }
  |

  popover -> anchor
}

html: {
  anchor: |html
    <button id="my-anchor" 
      popovertarget="my-popover" 
    >
      Trigger 
    </button>
  |

  popover: |css
    <div id="my-popover" popover> 
      Tooltip!
    <div>
  |

  anchor -> popover
}

css.popover -> html.popover
css.anchor -> html.anchor
*.style.font-size: 12
**.style.font-size: 12
(** -> **)[*]: {
  style.font-size: 12
}
~~~

## Create Anchor __A(x)__
use rule \`anchor-name: --VAR-NAME\` 

## Create Anchor Reference __R(y)__
use rule \`position-anchor: --VAR-NAME\`

## Call   Anchor Function __anchor(A(x))__
use built in css function
~~~css
.anchor-x {
  anchor-name: --anchor-x;
}

.referrer-A {
  position: absolute;
  position-anchor: --anchor-x;
  bottom: anchor(top); /* For popover on top of target */
  left: anchor(left);
}
~~~

## Centering with justify-self
Neat, new value for justify-self is \`anchor-center\`.

~~~css
.positioned-notice {
  position: absolute;
  /*  Anchor reference  */
  position-anchor: --anchor-el;
  /*  Position bottom of positioned elem at top of anchor  */
  bottom: anchor(top);
  /*  Center justification to the anchor */
  justify-self: anchor-center;
}
~~~

## position-area: To indicate positioning
This is the __placement__ from popper.js
~~~css
.positioned-notice {
  position: absolute;
  
  /*  Anchor reference  */
  position-anchor: --anchor-el;
  
  /* Reads: place my bottom on top of anchor, and center me on x-axis */
  position-area: top center; 
}
~~~

## CALL anchor-size(height)
WOW. You can just read the height of element? This has got to be busted. I'm gonna try this out later

## YOU CAN REFERENCE MULTIPLE ANCHORS
~~~css
.anchor-x {
  anchor-name: --anchor-x;
}

.anchor-xx {
  anchor-name: --anchor-xx;
}

.referrer-A {
  position: absolute;
  bottom: anchor(--anchor-x, top); 
  left: anchor(--anchor-xx, left);
}
~~~


## Configure dynamic positioning of popper.js with @position-try
~~~css
/* Step 0. Like @animation, you must declare a name for it, then do a configuration */
@position-try --bottom {
  margin: var(--padding) 0 0 var(--padding);
  inset-area: bottom;
}

/* Step 1. Now use your fallback with position-try-option */
.referrer-A {
  /* Stpe 1.a. initial position */
  margin-left: var(--padding);
  inset-area: right span-bottom;
  /* Step 1.b. fallback position */
  position-try-fallbacks: --bottom;
}
~~~


## Auto flip config aka preset position-try/fallbacks
Instead of having to make the config every time, you can use common presets like:

~~~css
position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline;
~~~

## position-visibility this is great
position-visibility: no-overflow;
vs 
position-visibility: anchors-visible;
`,
  // ``
})
