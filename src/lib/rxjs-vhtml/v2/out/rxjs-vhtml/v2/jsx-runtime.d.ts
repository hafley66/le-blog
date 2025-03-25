import React from "react";
import { Observable } from "rxjs";
export declare function jsx(tag: string, propsWithChildren: JSX.IntrinsicElements[keyof JSX.IntrinsicElements] | null): Observable<string>;
export declare const jsxs: typeof jsx;
export default jsx;
export type RxJSXNode = string | string[] | Element | Element[] | (string | Element)[];
export declare namespace RxJSX {
    type Node = RxJSXNode;
    type FC<T extends Record<string, any>> = Props$<T> & {
        id?: string;
        style?: React.CSSProperties | Observable<React.CSSProperties>;
        className?: string | number | Observable<string | number>;
        children?: RxJSXNode;
    };
}
export type Props$<T extends Record<string, any | Observable<any>>> = {
    [K in keyof T]: T[K] extends Observable<any> ? T[K] : Observable<T[K]>;
};
export declare namespace JSX {
    type Element = Observable<string>;
    interface CSSProperties extends React.CSSProperties {
    }
    interface IntrinsicElements {
        [key: string]: {
            id?: string;
            style?: CSSProperties | Observable<CSSProperties>;
            className?: string | number | Observable<string | number>;
            children?: RxJSXNode;
        } & {
            [prop: string]: string | number | boolean | Observable<string | number | boolean> | undefined | {};
        };
    }
}
export declare const Fragment: typeof jsx;
