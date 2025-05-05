// auto-generated
import { Endpoint } from './Endpoint';


export interface JsonResponse<T> {
  json(): Promise<T>;
}

export interface BlobResponse<T> {
  blob(): Promise<T>;
}

export interface POST__petInput {
  id?: number;
  name: string;
  category?: string;
  photoUrls: string[];
  tags?: string[];
  status?: 'available' | 'pending' | 'sold';
}

export interface POST__petOutput {
  [key: string]: any; // TODO: refine
}

export interface PUT__petInput {
  id?: number;
  name: string;
  category?: string;
  photoUrls: string[];
  tags?: string[];
  status?: 'available' | 'pending' | 'sold';
}

export interface PUT__petOutput {
  [key: string]: any; // TODO: refine
}

export interface GET__pet_findByStatusInput {
  status?: 'available' | 'pending' | 'sold';
}

export interface GET__pet_findByStatusOutput {
  [key: string]: any; // TODO: refine
}

export interface GET__pet_findByTagsInput {
  tags?: string[];
}

export interface GET__pet_findByTagsOutput {
  [key: string]: any; // TODO: refine
}

export interface GET__pet__petId_Input {
  petId: number;
}

export interface GET__pet__petId_Output {
  [key: string]: any; // TODO: refine
}

export interface POST__pet__petId_Input {
  petId: number;
  name?: string;
  status?: string;
}

export interface POST__pet__petId_Output {
  [key: string]: any; // TODO: refine
}

export interface DELETE__pet__petId_Input {
  'api_key'?: string;
  petId: number;
}

export interface DELETE__pet__petId_Output {
  [key: string]: any; // TODO: refine
}

export interface POST__pet__petId__uploadImageInput {
  petId: number;
  additionalMetadata?: string;
  body: any;
}

export interface POST__pet__petId__uploadImageOutput {
  [key: string]: any; // TODO: refine
}

export interface GET__store_inventoryInput {

}

export interface GET__store_inventoryOutput {
  [key: string]: any; // TODO: refine
}

export interface POST__store_orderInput {
  id?: number;
  petId?: number;
  quantity?: number;
  shipDate?: string;
  status?: 'placed' | 'approved' | 'delivered';
  complete?: boolean;
}

export interface POST__store_orderOutput {
  [key: string]: any; // TODO: refine
}

export interface GET__store_order__orderId_Input {
  orderId: number;
}

export interface GET__store_order__orderId_Output {
  [key: string]: any; // TODO: refine
}

export interface DELETE__store_order__orderId_Input {
  orderId: number;
}

export interface DELETE__store_order__orderId_Output {
  [key: string]: any; // TODO: refine
}

export interface POST__userInput {
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: string;
  userStatus?: number;
}

export interface POST__userOutput {
  [key: string]: any; // TODO: refine
}

export interface POST__user_createWithListInput {
  body: any;
}

export interface POST__user_createWithListOutput {
  [key: string]: any; // TODO: refine
}

export interface GET__user_loginInput {
  username?: string;
  password?: string;
}

export interface GET__user_loginOutput {
  [key: string]: any; // TODO: refine
}

export interface GET__user_logoutInput {

}

export interface GET__user_logoutOutput {
  [key: string]: any; // TODO: refine
}

export interface GET__user__username_Input {
  username: string;
}

export interface GET__user__username_Output {
  [key: string]: any; // TODO: refine
}

export interface PUT__user__username_Input {
  username: string;
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: string;
  userStatus?: number;
}

export interface PUT__user__username_Output {
  [key: string]: any; // TODO: refine
}

export interface DELETE__user__username_Input {
  username: string;
}

export interface DELETE__user__username_Output {
  [key: string]: any; // TODO: refine
}

export const sdk = {
  "POST /pet": new Endpoint<POST__petInput, JsonResponse<POST__petOutput>>({ url: "/pet", method: "POST", headerKeys: [], pathKeys: [], queryKeys: [], cookieKeys: [] }),
  "PUT /pet": new Endpoint<PUT__petInput, JsonResponse<PUT__petOutput>>({ url: "/pet", method: "PUT", headerKeys: [], pathKeys: [], queryKeys: [], cookieKeys: [] }),
  "GET /pet/findByStatus": new Endpoint<GET__pet_findByStatusInput, JsonResponse<GET__pet_findByStatusOutput>>({ url: "/pet/findByStatus", method: "GET", headerKeys: [], pathKeys: [], queryKeys: ["status"], cookieKeys: [] }),
  "GET /pet/findByTags": new Endpoint<GET__pet_findByTagsInput, JsonResponse<GET__pet_findByTagsOutput>>({ url: "/pet/findByTags", method: "GET", headerKeys: [], pathKeys: [], queryKeys: ["tags"], cookieKeys: [] }),
  "GET /pet/{petId}": new Endpoint<GET__pet__petId_Input, JsonResponse<GET__pet__petId_Output>>({ url: "/pet/{petId}", method: "GET", headerKeys: [], pathKeys: ["petId"], queryKeys: [], cookieKeys: [] }),
  "POST /pet/{petId}": new Endpoint<POST__pet__petId_Input, JsonResponse<POST__pet__petId_Output>>({ url: "/pet/{petId}", method: "POST", headerKeys: [], pathKeys: ["petId"], queryKeys: ["name", "status"], cookieKeys: [] }),
  "DELETE /pet/{petId}": new Endpoint<DELETE__pet__petId_Input, unknown<DELETE__pet__petId_Output>>({ url: "/pet/{petId}", method: "DELETE", headerKeys: ["api_key"], pathKeys: ["petId"], queryKeys: [], cookieKeys: [] }),
  "POST /pet/{petId}/uploadImage": new Endpoint<POST__pet__petId__uploadImageInput, JsonResponse<POST__pet__petId__uploadImageOutput>>({ url: "/pet/{petId}/uploadImage", method: "POST", headerKeys: [], pathKeys: ["petId"], queryKeys: ["additionalMetadata"], cookieKeys: [] }),
  "GET /store/inventory": new Endpoint<GET__store_inventoryInput, JsonResponse<GET__store_inventoryOutput>>({ url: "/store/inventory", method: "GET", headerKeys: [], pathKeys: [], queryKeys: [], cookieKeys: [] }),
  "POST /store/order": new Endpoint<POST__store_orderInput, JsonResponse<POST__store_orderOutput>>({ url: "/store/order", method: "POST", headerKeys: [], pathKeys: [], queryKeys: [], cookieKeys: [] }),
  "GET /store/order/{orderId}": new Endpoint<GET__store_order__orderId_Input, JsonResponse<GET__store_order__orderId_Output>>({ url: "/store/order/{orderId}", method: "GET", headerKeys: [], pathKeys: ["orderId"], queryKeys: [], cookieKeys: [] }),
  "DELETE /store/order/{orderId}": new Endpoint<DELETE__store_order__orderId_Input, unknown<DELETE__store_order__orderId_Output>>({ url: "/store/order/{orderId}", method: "DELETE", headerKeys: [], pathKeys: ["orderId"], queryKeys: [], cookieKeys: [] }),
  "POST /user": new Endpoint<POST__userInput, JsonResponse<POST__userOutput>>({ url: "/user", method: "POST", headerKeys: [], pathKeys: [], queryKeys: [], cookieKeys: [] }),
  "POST /user/createWithList": new Endpoint<POST__user_createWithListInput, JsonResponse<POST__user_createWithListOutput>>({ url: "/user/createWithList", method: "POST", headerKeys: [], pathKeys: [], queryKeys: [], cookieKeys: [] }),
  "GET /user/login": new Endpoint<GET__user_loginInput, JsonResponse<GET__user_loginOutput>>({ url: "/user/login", method: "GET", headerKeys: [], pathKeys: [], queryKeys: ["username", "password"], cookieKeys: [] }),
  "GET /user/logout": new Endpoint<GET__user_logoutInput, unknown<GET__user_logoutOutput>>({ url: "/user/logout", method: "GET", headerKeys: [], pathKeys: [], queryKeys: [], cookieKeys: [] }),
  "GET /user/{username}": new Endpoint<GET__user__username_Input, JsonResponse<GET__user__username_Output>>({ url: "/user/{username}", method: "GET", headerKeys: [], pathKeys: ["username"], queryKeys: [], cookieKeys: [] }),
  "PUT /user/{username}": new Endpoint<PUT__user__username_Input, unknown<PUT__user__username_Output>>({ url: "/user/{username}", method: "PUT", headerKeys: [], pathKeys: ["username"], queryKeys: [], cookieKeys: [] }),
  "DELETE /user/{username}": new Endpoint<DELETE__user__username_Input, unknown<DELETE__user__username_Output>>({ url: "/user/{username}", method: "DELETE", headerKeys: [], pathKeys: ["username"], queryKeys: [], cookieKeys: [] }),
} as const;
