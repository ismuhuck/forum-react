import axios from 'axios'
import Config from './config'
let isFormData = false // 是否需要formData格式
let isDownLoad = false // 获取内容是否为Blob格式
axios.defaults.timeout = 50000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// axios.defaults.baseURL = Config.baseUrl
//请求拦截
axios.interceptors.request.use(
  config => {
    // 当为文件上传时更改content-type
    if (isFormData) {
      axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
    } else {
      axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
    }
    if (isDownLoad) {
      config.responseType = 'blob'
    }
    // config.headers['X-Gisq-Token'] = `Bearer ${token}`
    return config
  },
  error => {
    return Promise.error(error)
  }
)
//响应拦截
axios.interceptors.response.use(
  response => {
    if (response.status == 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    // if (error.response.status === 401) {

    // }
  }
)
//get请求
export function get(url, params, loadingText = '加载中...', isLoading = true,   ) {
  isFormData = false
  return new Promise((resolve, reject) => {
    axios
      .get(url, { params: params })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
//post请求
export function post(url, params, loadingText = '加载中...', isLoading = true, baseUrl) {
  isFormData = false
  isDownLoad = false
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
// 文件上传
export function fileFormData(url, params, loadingText = '文件上传中，请稍后...') {
  isFormData = true
  isDownLoad = false
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
// 请求类型为formData 返回类型为Blob
export function downloadFormData(url, params) {
  isFormData = true
  isDownLoad = true
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, { responseType: 'blob' })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

// 文件下载，返回类型为Blob
export function download(url, params) {
  isFormData = false
  isDownLoad = true
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, { responseType: 'blob' })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}
