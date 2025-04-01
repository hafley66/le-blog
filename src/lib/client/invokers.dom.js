import {
  isSupported,
  isPolyfilled,
  apply,
} from "invokers-polyfill/fn"
console.log("Checking polyfill...", isSupported())
// console.log("Invokers not supported")
apply()
