// 导入网络请求的包
// 按需导入 $http 对象
import { $http } from "@escook/request-miniprogram"


// 把 $http 挂载到 uni 顶级对象之上，方便全局调用
uni.$http = $http

// 配置根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net'

// 请求拦截器
// 请求开始之前做一些事情
$http.beforeRequest = function(options) {
	uni.showLoading({
		title: "数据加载中"
	})
}

// 响应拦截器
// 请求完成之后做一些事情
$http.afterRequest = function() {
	uni.hideLoading()
}