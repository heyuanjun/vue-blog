import {requestConfig, PublishMessage, PageConfig} from './requestConfig'

export function getNoteDetail(path) {
  return requestConfig(path)
}

export function PostMessage(path, data) {
  return PublishMessage(path, data)
}

export function PageSizeChange(path, params) {
  return PageConfig(path, params)
}
