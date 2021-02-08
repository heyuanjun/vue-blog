import axios from "axios";
import store from "@/store";

const baseURL = store.state.baseURL;

axios.defaults.withCredentials = true;

function AxiosRequest(path, params = {}, method = 'get') {
  let instance = axios.create({
    baseURL: baseURL, // 换成你自己的后台地址
    headers: {
      Authorization: localStorage.getItem('Authorization')
    },
    transformRequest: [function(data) {
      data = JSON.stringify(data)
      return data
    }],
    timeout: 10000,
  });

  switch (method) {
    case 'get':
      return instance({
        url: path,
        params: params,
      });
    case 'post':
      return instance({
        url: path,
        method: "post",
        data: params
      });
  }


}

export {AxiosRequest};
