import { Observable } from "rxjs"

export const HEvents = [
  "abort",
  "animationcancel",
  "animationend",
  "animationiteration",
  "animationstart",
  "auxclick",
  "beforeinput",
  "beforetoggle",
  "blur",
  "cancel",
  "canplay",
  "canplaythrough",
  "change",
  "click",
  "close",
  "contextlost",
  "contextmenu",
  "contextrestored",
  "copy",
  "cuechange",
  "cut",
  "dblclick",
  "drag",
  "dragend",
  "dragenter",
  "dragleave",
  "dragover",
  "dragstart",
  "drop",
  "durationchange",
  "emptied",
  "ended",
  "error",
  "focus",
  "formdata",
  "gotpointercapture",
  "input",
  "invalid",
  "keydown",
  "keypress",
  "keyup",
  "load",
  "loadeddata",
  "loadedmetadata",
  "loadstart",
  "lostpointercapture",
  "mousedown",
  "mouseenter",
  "mouseleave",
  "mousemove",
  "mouseout",
  "mouseover",
  "mouseup",
  "paste",
  "pause",
  "play",
  "playing",
  "pointercancel",
  "pointerdown",
  "pointerenter",
  "pointerleave",
  "pointermove",
  "pointerout",
  "pointerover",
  "pointerup",
  "progress",
  "ratechange",
  "reset",
  "resize",
  "scroll",
  "scrollend",
  "securitypolicyviolation",
  "seeked",
  "seeking",
  "select",
  "selectionchange",
  "selectstart",
  "slotchange",
  "stalled",
  "submit",
  "suspend",
  "timeupdate",
  "toggle",
  "touchcancel",
  "touchend",
  "touchmove",
  "touchstart",
  "transitioncancel",
  "transitionend",
  "transitionrun",
  "transitionstart",
  "volumechange",
  "waiting",
  "webkitanimationend",
  "webkitanimationiteration",
  "webkitanimationstart",
  "webkittransitionend",
  "wheel",
] as const
export type HtmlEvent = (typeof HEvents)[number]
export const HEVENTS = new Set(HEvents)

export type HtmlEventIndex$ = {
  abort: Observable<UIEvent>
  animationcancel: Observable<AnimationEvent>
  animationend: Observable<AnimationEvent>
  animationiteration: Observable<AnimationEvent>
  animationstart: Observable<AnimationEvent>
  auxclick: Observable<MouseEvent>
  beforeinput: Observable<InputEvent>
  beforetoggle: Observable<Event>
  blur: Observable<FocusEvent>
  cancel: Observable<Event>
  canplay: Observable<Event>
  canplaythrough: Observable<Event>
  change: Observable<Event>
  click: Observable<MouseEvent>
  close: Observable<Event>
  compositionend: Observable<CompositionEvent>
  compositionstart: Observable<CompositionEvent>
  compositionupdate: Observable<CompositionEvent>
  contextlost: Observable<Event>
  contextmenu: Observable<MouseEvent>
  contextrestored: Observable<Event>
  copy: Observable<ClipboardEvent>
  cuechange: Observable<Event>
  cut: Observable<ClipboardEvent>
  dblclick: Observable<MouseEvent>
  drag: Observable<DragEvent>
  dragend: Observable<DragEvent>
  dragenter: Observable<DragEvent>
  dragleave: Observable<DragEvent>
  dragover: Observable<DragEvent>
  dragstart: Observable<DragEvent>
  drop: Observable<DragEvent>
  durationchange: Observable<Event>
  emptied: Observable<Event>
  ended: Observable<Event>
  error: Observable<ErrorEvent>
  focus: Observable<FocusEvent>
  focusin: Observable<FocusEvent>
  focusout: Observable<FocusEvent>
  formdata: Observable<FormDataEvent>
  gotpointercapture: Observable<PointerEvent>
  input: Observable<Event>
  invalid: Observable<Event>
  keydown: Observable<KeyboardEvent>
  keypress: Observable<KeyboardEvent>
  keyup: Observable<KeyboardEvent>
  load: Observable<Event>
  loadeddata: Observable<Event>
  loadedmetadata: Observable<Event>
  loadstart: Observable<Event>
  lostpointercapture: Observable<PointerEvent>
  mousedown: Observable<MouseEvent>
  mouseenter: Observable<MouseEvent>
  mouseleave: Observable<MouseEvent>
  mousemove: Observable<MouseEvent>
  mouseout: Observable<MouseEvent>
  mouseover: Observable<MouseEvent>
  mouseup: Observable<MouseEvent>
  paste: Observable<ClipboardEvent>
  pause: Observable<Event>
  play: Observable<Event>
  playing: Observable<Event>
  pointercancel: Observable<PointerEvent>
  pointerdown: Observable<PointerEvent>
  pointerenter: Observable<PointerEvent>
  pointerleave: Observable<PointerEvent>
  pointermove: Observable<PointerEvent>
  pointerout: Observable<PointerEvent>
  pointerover: Observable<PointerEvent>
  pointerup: Observable<PointerEvent>
  progress: Observable<ProgressEvent>
  ratechange: Observable<Event>
  reset: Observable<Event>
  resize: Observable<UIEvent>
  scroll: Observable<Event>
  scrollend: Observable<Event>
  securitypolicyviolation: Observable<SecurityPolicyViolationEvent>
  seeked: Observable<Event>
  seeking: Observable<Event>
  select: Observable<Event>
  selectionchange: Observable<Event>
  selectstart: Observable<Event>
  slotchange: Observable<Event>
  stalled: Observable<Event>
  submit: Observable<SubmitEvent>
  suspend: Observable<Event>
  timeupdate: Observable<Event>
  toggle: Observable<Event>
  touchcancel: Observable<TouchEvent>
  touchend: Observable<TouchEvent>
  touchmove: Observable<TouchEvent>
  touchstart: Observable<TouchEvent>
  transitioncancel: Observable<TransitionEvent>
  transitionend: Observable<TransitionEvent>
  transitionrun: Observable<TransitionEvent>
  transitionstart: Observable<TransitionEvent>
  volumechange: Observable<Event>
  waiting: Observable<Event>
  webkitanimationend: Observable<Event>
  webkitanimationiteration: Observable<Event>
  webkitanimationstart: Observable<Event>
  webkittransitionend: Observable<Event>
  wheel: Observable<WheelEvent>
}
