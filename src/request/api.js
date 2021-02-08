import {AxiosRequest} from "@/request/http";

export function HttpRequest(path, params, method) {
  return AxiosRequest(path, params, method)
}
