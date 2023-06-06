import App from './App'
// 导入封装的请求模块
import '@/utils/http.js'
// 导入封装的方法
import '@/utils/way.js'
// 导入 pinia
import * as Pinna from "pinia"


// vue2 初始化vue实例
// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// vue3 初始化 vue实例
// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	// 创建并使用 pinia 中间件
	app.use(Pinna.createPinia())
	return {
		app,
		Pinna, // 此处必须将 Pinia 返回
	}
}
// #endif