import Vue from 'vue'
import axios from 'axios'
import App from '@/App'
import store from '@/store'
class HttpRequest {

	constructor(baseUrl = baseURL) {
		this.baseUrl = baseUrl
		this.queue = {}
	}
	getInsideConfig() {
		const config = {
			baseURL: this.baseUrl,
			headers: {
				"Content-Type": "application/json"
			}
		}
		return config
	}

	destroy(url) {
		delete this.queue[url]
		if (!Object.keys(this.queue).length) {

		}
	}

	interceptors(instance, url) {
		//请求拦截
		instance.interceptors.request.use(config => {
			//全局 loading...
			if (!Object.keys(this.queue).length) {

			}
			this.queue[url] = true
			return config
		}, error => {
			return Promise.reject(error)
		})
		//响应拦截
		instance.interceptors.response.use(res => {
			this.destroy(url)
			const { data, status } = res
			if (status == '401') {

				Vue.$vux.toast.show({  //token过期
					type: 'warn',
					text: '未获取到登录状态'
				});
			} else if (status == '404') {
				Vue.$vux.toast.show({  //未找到资源
					type: 'warn',
					text: '网络异常'
				});
			} else if (status == '500') {
				Vue.$vux.toast.show({  //服务器错误
					type: 'warn',
					text: '网络异常'
				});
			}
			return data.body;
			// return data.body
		}, error => {
			this.destroy(url)
			Vue.$vux.toast.show({
				type: 'cancel',
				text: '系统异常'
			});
			//错误业务逻辑操作
			return Promise.reject(error)
		})
	}
	request(options) {
		const instance = axios.create()
		options = Object.assign(this.getInsideConfig(), options)
		this.interceptors(instance, options.url)
		return instance(options)
	}
}
export default HttpRequest