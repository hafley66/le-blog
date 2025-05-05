// auto-generated
import { Endpoint } from './Endpoint';
import { Pet, ApiResponse, Order, User } from './components2';

export interface ResponseBase<T> {}; 
export interface JsonResponse<T> {
  json(): Promise<T>;
}

export interface BlobResponse<T> {
  blob(): Promise<T>;
}

export type POST__petInput = Pet

export interface POST__petOutput extends Pet {}

export type PUT__petInput = Pet

export interface PUT__petOutput extends Pet {}

export interface GET__pet_findByStatusInput {
  status?: 'available' | 'pending' | 'sold';
}

export interface GET__pet_findByStatusOutput {}

export interface GET__pet_findByTagsInput {
  tags?: string[];
}

export interface GET__pet_findByTagsOutput {}

export interface GET__pet__petId_Input {
  petId: number;
}

export interface GET__pet__petId_Output extends Pet {}

export interface POST__pet__petId_Input {
  petId: number;
  name?: string;
  status?: string;
}

export interface POST__pet__petId_Output extends Pet {}

export interface DELETE__pet__petId_Input {
  'api_key'?: string;
  petId: number;
}

export interface DELETE__pet__petId_Output {}

export interface POST__pet__petId__uploadImageInput {
  petId: number;
  additionalMetadata?: string;
  body: any;
}

export interface POST__pet__petId__uploadImageOutput extends ApiResponse {}

export interface GET__store_inventoryInput {

}

export interface GET__store_inventoryOutput {}

export type POST__store_orderInput = Order

export interface POST__store_orderOutput extends Order {}

export interface GET__store_order__orderId_Input {
  orderId: number;
}

export interface GET__store_order__orderId_Output extends Order {}

export interface DELETE__store_order__orderId_Input {
  orderId: number;
}

export interface DELETE__store_order__orderId_Output {}

export type POST__userInput = User

export interface POST__userOutput extends User {}

export interface POST__user_createWithListInput {
  body: any;
}

export interface POST__user_createWithListOutput extends User {}

export interface GET__user_loginInput {
  username?: string;
  password?: string;
}

export interface GET__user_loginOutput {}

export interface GET__user_logoutInput {

}

export interface GET__user_logoutOutput {}

export interface GET__user__username_Input {
  username: string;
}

export interface GET__user__username_Output extends User {}

export interface PUT__user__username_Input {
  username: string;
  body: User;
}

export interface PUT__user__username_Output {}

export interface DELETE__user__username_Input {
  username: string;
}

export interface DELETE__user__username_Output {}

export const sdk = {
  "POST /pet": new Endpoint<"POST /pet", POST__petInput, JsonResponse<POST__petOutput>>("POST /pet", { url: "/pet", method: "POST" }),
  "PUT /pet": new Endpoint<"PUT /pet", PUT__petInput, JsonResponse<PUT__petOutput>>("PUT /pet", { url: "/pet", method: "PUT" }),
  "GET /pet/findByStatus": new Endpoint<"GET /pet/findByStatus", GET__pet_findByStatusInput, JsonResponse<GET__pet_findByStatusOutput>>("GET /pet/findByStatus", { url: "/pet/findByStatus", method: "GET", queryKeys: ["status"], }),
  "GET /pet/findByTags": new Endpoint<"GET /pet/findByTags", GET__pet_findByTagsInput, JsonResponse<GET__pet_findByTagsOutput>>("GET /pet/findByTags", { url: "/pet/findByTags", method: "GET", queryKeys: ["tags"], }),
  "GET /pet/{petId}": new Endpoint<"GET /pet/{petId}", GET__pet__petId_Input, JsonResponse<GET__pet__petId_Output>>("GET /pet/{petId}", { url: "/pet/{petId}", method: "GET", pathKeys: ["petId"], }),
  "POST /pet/{petId}": new Endpoint<"POST /pet/{petId}", POST__pet__petId_Input, JsonResponse<POST__pet__petId_Output>>("POST /pet/{petId}", { url: "/pet/{petId}", method: "POST", pathKeys: ["petId"], queryKeys: ["name", "status"], }),
  "DELETE /pet/{petId}": new Endpoint<"DELETE /pet/{petId}", DELETE__pet__petId_Input, ResponseBase<DELETE__pet__petId_Output>>("DELETE /pet/{petId}", { url: "/pet/{petId}", method: "DELETE", headerKeys: ["api_key"], pathKeys: ["petId"], }),
  "POST /pet/{petId}/uploadImage": new Endpoint<"POST /pet/{petId}/uploadImage", POST__pet__petId__uploadImageInput, JsonResponse<POST__pet__petId__uploadImageOutput>>("POST /pet/{petId}/uploadImage", { url: "/pet/{petId}/uploadImage", method: "POST", pathKeys: ["petId"], queryKeys: ["additionalMetadata"], }),
  "GET /store/inventory": new Endpoint<"GET /store/inventory", GET__store_inventoryInput, JsonResponse<GET__store_inventoryOutput>>("GET /store/inventory", { url: "/store/inventory", method: "GET" }),
  "POST /store/order": new Endpoint<"POST /store/order", POST__store_orderInput, JsonResponse<POST__store_orderOutput>>("POST /store/order", { url: "/store/order", method: "POST" }),
  "GET /store/order/{orderId}": new Endpoint<"GET /store/order/{orderId}", GET__store_order__orderId_Input, JsonResponse<GET__store_order__orderId_Output>>("GET /store/order/{orderId}", { url: "/store/order/{orderId}", method: "GET", pathKeys: ["orderId"], }),
  "DELETE /store/order/{orderId}": new Endpoint<"DELETE /store/order/{orderId}", DELETE__store_order__orderId_Input, ResponseBase<DELETE__store_order__orderId_Output>>("DELETE /store/order/{orderId}", { url: "/store/order/{orderId}", method: "DELETE", pathKeys: ["orderId"], }),
  "POST /user": new Endpoint<"POST /user", POST__userInput, JsonResponse<POST__userOutput>>("POST /user", { url: "/user", method: "POST" }),
  "POST /user/createWithList": new Endpoint<"POST /user/createWithList", POST__user_createWithListInput, JsonResponse<POST__user_createWithListOutput>>("POST /user/createWithList", { url: "/user/createWithList", method: "POST" }),
  "GET /user/login": new Endpoint<"GET /user/login", GET__user_loginInput, JsonResponse<GET__user_loginOutput>>("GET /user/login", { url: "/user/login", method: "GET", queryKeys: ["username", "password"], }),
  "GET /user/logout": new Endpoint<"GET /user/logout", GET__user_logoutInput, ResponseBase<GET__user_logoutOutput>>("GET /user/logout", { url: "/user/logout", method: "GET" }),
  "GET /user/{username}": new Endpoint<"GET /user/{username}", GET__user__username_Input, JsonResponse<GET__user__username_Output>>("GET /user/{username}", { url: "/user/{username}", method: "GET", pathKeys: ["username"], }),
  "PUT /user/{username}": new Endpoint<"PUT /user/{username}", PUT__user__username_Input, ResponseBase<PUT__user__username_Output>>("PUT /user/{username}", { url: "/user/{username}", method: "PUT", pathKeys: ["username"], }),
  "DELETE /user/{username}": new Endpoint<"DELETE /user/{username}", DELETE__user__username_Input, ResponseBase<DELETE__user__username_Output>>("DELETE /user/{username}", { url: "/user/{username}", method: "DELETE", pathKeys: ["username"], }),
} as const;

