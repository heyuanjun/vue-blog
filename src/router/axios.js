import Axios from 'axios'
import Qs from 'qs'

const CancelToken = Axios.CancelToken

class HttpRequest {
  queue = {}

  constructor(baseUrl = '/', selfConfig) {
    this.baseUrl = baseUrl
  }

  /**
   * 配置
   */
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      headers: {},
      timeout: 30 * 1000,
      withCredentials: true
    }
    return config
  }

  /**
   * 销毁队列
   * @param {string} url 请求路径
   */
  destroy(url) {
    delete this.queue[url]
  }

  /**
   * 取消请求
   * @param {string} url 请求路径
   */
  cancel(url) {
    this.queue[url](url)
    this.destroy(url)
  }

  /**
   * 设置拦截
   * @param {object} instance Axios.create()实例
   * @param {string} url 请求路径
   */
  interceptors(instance, url) {
    // 请求拦截
    instance.interceptors.request.use(config => {
      let _this = this
      //中止重复请求
      let filter = ['/api/cart', '/api/favorite', '/api/favorite/cancel', '/api/activity/tap'] //不需要中止的请求
      if (_this.queue[url] && filter.indexOf(url) == -1) {
        _this.cancel(url)
      }
      let method = ['post', 'put']
      if (method.indexOf(config.method) > -1) config.data = Qs.stringify(config.data)
      //添加cancelToken
      config.cancelToken = new CancelToken(function executor(e) {
        _this.queue[url] = e
      })
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const {
        data,
        status
      } = res
      data.code = status
      return data
    }, error => {
      if (error.message.indexOf('timeout') >= 0) { //请求超时
        layer.alert('请求超时，请刷新页面', {
          title: '温馨提示',
          icon: 2,
          btn: ['刷新'],
          yes() {
            window.location.reload()
          },
          cancel() {
            layer.closeAll()
          }
        })
      }
      if (Axios.isCancel(error)) { //终止重复请求
        return Promise.reject(error)
      }
      error.response.code = error.response.status
      error.response.message = error.response.data.message
      this.destroy(url)
      return Promise.reject(error)
    })
  }

  /**
   * 请求
   * @param {json} options 配置
   */
  request(options) {
    const instance = Axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export default HttpRequest
