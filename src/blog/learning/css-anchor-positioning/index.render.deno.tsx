// deno-lint-ignore-file jsx-key
import { Render$ } from "~/lib/0_RenderBase.deno.tsx"
import { SUB } from "~/blog/learning/css-anchor-positioning/SITEMAP.deno.ts"
import { generateD2Diagram } from "~/lib/remark_rehype/remark-plant-uml.deno.ts"
import { from } from "rxjs"
const $ = Render$(import.meta.filename!)

export default $.SSGLayout({
  title: "Notes: CSS Anchor Positioning",
  description:
    "position: absolute KAIOKEN x 10. Popper.js is in CSS now.",
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

${(
  <details className="basic">
    <summary>Perhaps a chart {"(click to expand)"}</summary>
    <div style="max-width:500px; margin: auto;">
      {from(
        generateD2Diagram(`

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
vars: {
  d2-config: {
    layout-engine: elk
  }
}
*.style.font-size: 12
**.style.font-size: 12
(** -> **)[*]: {
  style.font-size: 12
}    
`),
      )}
    </div>
  </details>
)}

## Create Anchor Name
use rule \`anchor-name: --VAR-NAME\` 

### Reference Anchor Name
use rule \`position-anchor: --VAR-NAME\`

## Call anchor for inset rules
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

### YOU CAN REFERENCE MULTIPLE ANCHORS
There are 2 anchor function signatures, one with 1 arg (implicit ref), or 2 args where first is explicit anchor name.

This allows multi-reference.

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


## Define position-area 
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

### Center with justify-self
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

## Woah anchor-size(height) function
WOW. You can just read the height of element? This has got to be busted. I'm gonna try this out later


## Auto flip with position-try-fallbacks
Instead of having to make the config every time, you can use common presets like:

~~~css
position-try-fallbacks: flip-block, flip-inline, flip-block flip-inline;
~~~

### @position-try
Funky @ rule to allow custom fallback options that aren't just auto flip.
But auto flip and centering cover all usecases I have had with popper.js.

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


## position-visibility
position-visibility: no-overflow;
vs 
position-visibility: anchors-visible;
`,
  // ``
})
