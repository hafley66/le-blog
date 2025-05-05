help me write a vite plugin that does the following in ts:

its goal is to load v2 inside v1 at any vite entrypoint. i want to make a loader api in react that gives the Loader
type Config = {
  entrypoint: v2 src path to file,
}
`<ReactV2Loader {...config} />`
calls new Loader(config)

both apps are vite meaning 4 cases of (v1={dev,prod}, v2={dev,prod})

so we want to simply configure the loader during dev to use a proxy address back to our vite server and have that proxy to vite v2 app dev server.

during v1 prod, the host will have a diff host, so we want host configurable, but like
```tsx
// v2/0_loader.ts
import {LoaderLoader} from './loader-loader';
// Make loader 
export const Loader = new LoaderLoader(import.env.IS_DEV? DEV_HOST : PROD_HOST)

// Import loader in the router
import {Loader} from '~/lib/loader';

export const V2Routes = [
  Loader.Entrypoint( // creates react component that is waiting to be mounted.
    "entrypoint-string-fromv2", 
    options: { idk },
  ),
]
```

the react loader will pass the div it creates from its part in react tree, and async import the file from the manifest, access its "mount" export and its "unmount" export
and the loader will pass the div to the mount function. this happens when we have AsyncComponent.mount(div). on unmount from the div. Make this laoder as unit testable as possible

the react loader uses this to sync mount and unmount of a load with react
get manifest (fetch or whatever) from the config.
im trying to figure out best way for manifest to load so its cached or preloaded. back to that later, just fetch it but maybe abstract the "getManifest" function in this interface


create local manifest in public folder in v2 so it goes along for the ride, it should match each entrypoint from vite config

and during dev mode, can we make something that inserts the vite hot reload api into the mix. at my last job i had to have 

the local manifest in public refer to differently named files called main.dev.tsx and the prod build references mount.tsx. the main.dev.tsx is so we could prefix the module load with vite dev mode getting tooled at right time. 

i forget what that code was, i think it just improts the vite dev client and then loaded the mount file

can we make a dev plugin that accepts a request to a file that ends in .entrypoint.tsx? during its dev server mode? so we need a proxy on the v2 side and a proxy to v2 from the v1 side. but i wanna make this a generic plugin style, so i can have loader with dev and prod mode on both sides following protocol. so a vite plugin for the consuming app and the vite plugin for the referenced app in same place
