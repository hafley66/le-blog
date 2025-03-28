import React from "react";
import { Observable } from "rxjs";
export declare function jsx(tag: string | ((props: any) => Observable<string>), propsWithChildren: JSX.IntrinsicElements[keyof JSX.IntrinsicElements] | null): Observable<string>;
export declare const jsxs: typeof jsx;
export default jsx;
export type Prims = number | string | boolean | Observable<string | number | boolean>;
export type Node$ = Prims | Prims[];
export type RxJSXNode = Node$;
export declare namespace RxJSX {
    type Node = RxJSXNode;
    type FC<T extends Record<string, any>> = (props: T & {
        id?: string;
        style?: React.CSSProperties | Observable<React.CSSProperties>;
        className?: string | number | Observable<string | number>;
        children?: RxJSXNode;
    }) => JSX.Element;
}
export declare namespace JSX {
    type Element = Observable<string>;
    interface CSSProperties extends React.CSSProperties {
    }
    interface IntrinsicElements {
        [key: string]: {
            id?: string;
            style?: string | CSSProperties | Observable<CSSProperties>;
            className?: string | number | Observable<string | number>;
            children?: RxJSXNode;
        } & {
            [prop: string]: string | number | boolean | Observable<string | number | boolean> | undefined | {};
        };
    }
}
export declare const Fragment: typeof jsx;
