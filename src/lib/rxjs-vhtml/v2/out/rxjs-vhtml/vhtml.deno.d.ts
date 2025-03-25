export interface Attributes {
    [key: string]: any;
    children?: any[];
    dangerouslySetInnerHTML?: {
        __html: string;
    };
}
export declare function vhtml(name: string | ((attrs: Attributes) => string), attrs?: Attributes, ...children: any[]): string;
export default vhtml;
