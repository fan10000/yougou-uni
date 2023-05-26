// 封装展示消息提示的方法
uni.$showMsg = function(title = '数据请求失败!', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: 'none'
	})
}