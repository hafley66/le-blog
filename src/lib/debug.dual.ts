// Import the original debug library
import originalDebug from "debug"

// Cache to store debug instances by filename
const debugCache: Record<string, debug.Debugger> = {}

// Create a proxy handler
const handler: ProxyHandler<typeof debugCache> = {
  get(target, prop: string) {
    prop = "" + prop
    if (prop.startsWith("http")) {
      try {
        prop = new URL(prop).pathname
      } catch (e) {}
    }
    // If the property is a standard method of the debug library, return it
    if (prop in target) {
      return target[prop as keyof typeof target]
    }

    if (prop.startsWith("/")) prop = prop.slice(1)

    // If it's a filename, create or return a cached debug instance
    if (typeof prop === "string") {
      if (!debugCache[prop]) {
        // Extract a reasonable namespace from the filename
        // Remove extension and convert path separators to colons
        const namespace = prop
          .replace(/\.(js|ts|jsx|tsx)$/, "")
          .replace(/[\/\\]/g, ":")

        debugCache[prop] = originalDebug(namespace)
      }
      return debugCache[prop]
    }

    return undefined
  },
}

// Create and export the proxied debug object
export const debug$ = new Proxy(debugCache, handler)
