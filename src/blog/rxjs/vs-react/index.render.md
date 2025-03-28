
However, because of several design choices in React, and how it has decided to approach lazy-programming techniques for \`Suspense\`, React has become a very poor library for expressing async computations. 

Javascript natively has 4 kinds of functions
| | sync | async |
|-|------|-------|
|one|\`function sync(){}\`|\`async function(){}\`|
|many|\`function* sync_generator(){}\`|\`async function* async_generator(){}\`|



You must throw Promises(now \`use\`) that need memo-ized, because there is no other way to block rendering. Its so framework specific that you will never see such a thing in the standard language of ecmascript.

Contrast this to Observable's, which are sometimes called Promises++. They add +1 to Promise's data model in every way. While being very primitive, they can be used with RxJS, which is like Lodash for this data structure. 

I encourage you to ignore the difficulty of RxJS for now, and entertain the idea that we are all trying to express HTML __over time__ lazily.
