1.  Wrap rxjs operators at import level (e.g. via custom module or alias)
    - as custom module, that is loaded during dev time, and its callsites dynamically injected.
    - we independently test the intended outputs of the api by writing static js tests.
    - then we write bash or vitest style tests for compiler runs
2. couple problems
    - top level subscribe calls must be implicitly transformed to have a pipe that shuts them off during dispose
    - higher order maps in the pipes and wrapping things like new Observable and from/defer
    - waht do we do when somehting that was in a merge?
    - behavior subjects? subjects? we must trap their creation some way and make sure their subs are also referring by static analysis id. Although those guys can use whatever, like make an outer class to trap the constructor calls. We will want to ultimately trap new Observable itself at the core for all classes
    - Im trying to think of all other ways we can figure out how to unique ID all observables in every static time scenario so that cancelling all of them will go by order of creation from a single file
