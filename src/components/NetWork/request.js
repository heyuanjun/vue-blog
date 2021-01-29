import {requestConfig, PublishMessage, PageConfig, AxiosRequest} from "@/components/NetWork/requestConfig";

export function getNoteDetail(path) {
  return requestConfig(path)
}

export function PostMessage(path, data) {
  return PublishMessage(path, data)
}

export function PageSizeChange(path, params) {
  return PageConfig(path, params)
}

export function HttpRequest(path, params, method) {
  return AxiosRequest(path, params, method)
}
