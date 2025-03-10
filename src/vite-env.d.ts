/// <reference types="vite/client" />

declare global {
  namespace JSX {
    interface IntrinsicElements {
      a: React.DetailedHTMLProps<
        React.AnchorHTMLAttributes<HTMLAnchorElement> & {
          href:
            | "/src/Sidebar.html"
            | "/tsconfig.app.json"
            | "/tsconfig.node.json"
            | string;
        },
        HTMLAnchorElement
      >;
    }
  }
}
