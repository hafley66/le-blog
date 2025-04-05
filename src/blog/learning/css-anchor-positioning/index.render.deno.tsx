// deno-lint-ignore-file jsx-key
import { Render$ } from "~/lib/0_RenderBase.deno.tsx"
const $ = Render$(import.meta.filename!)

export default $.SSGLayout({
  title: "Notes: CSS Anchor Positioning",
  description: "",
  date_created: "2025-02-25",
  tags: ["css", "anchor-positioning"],
  ...$.md`

## TLDR;
~~~css


~~~
## Create Anchor __A(x)__
use \`anchor-name: --VAR-NAME\` 

## Create Anchor Reference __R(y)__
use \`position-anchor: --VAR-NAME\`

## Call   Anchor Function __anchor(A(x))__
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

## inset-area NANI?!?! (DONT USE THIS YET)
Instead of top/bottom and left/right, you can use singular inset-area: to describe where you are on the 9x9 grid of placement keywords from popper.js lol
inset-area: 
  - top === 'centered on top of'
  - bottom === 'centered on botto of'
  - inline-start

## CALL anchor-size(height)
WOW. You can just read the height of element? This has got to be busted. 

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
  position-try-options: --bottom;
}
~~~
`,
  // ``
})
