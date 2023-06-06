<template>
	<view>
		<view class="goods-list">
			<view v-for="item in goodsList" :key="item.goods_id" @click="goDetail(item)">
				<my-goods-item :goods="item"></my-goods-item>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 请求参数对象
				queryObj: {
					// 搜索关键字
					query: '',
					// 分类id
					cid: '',
					// 页码
					pagenum: 1,
					// 页容量
					pagesize: 10
				},
				// 商品列表的数据
				goodsList: [],
				// 数据总数量，用来分页
				total: 0,
				// 设置节流阀,是否正在请求数据
				isloading: false
			}
		},
		onLoad(options) {
			// 将上个页面传递的参数(参数数据类型为 Object)，转存到 data的queryObj对象中
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			// 调用方法获取数据列表
			this.getGoodsList()
		},
		methods: {
			async getGoodsList(cb) {
				this.isloading = true
				const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj)
				this.isloading = false
				// 按需调用 cb 回调函数
				cb && cb()
				if (res.meta.status !== 200) return uni.$showMsg()
				// 通过展开运算符，进行新旧数据数据拼接
				this.goodsList = [...this.goodsList, ...res.message.goods]
				this.total = res.message.total
			},
			// 点击跳转事件
			goDetail(item) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
				})
			}
		},
		// 页面触底事件
		onReachBottom() {
			// 判断是否还有下一页数据
			if (this.queryObj.pagenum * this.queryObj.cid >= this.total) return uni.$showMsg("没有更多了")
			// 根据节流阀状态判断是否在请求数据，如果是，则不发起额外的请求
			if (this.isloading) return
			// 让页码自增 +1
			this.queryObj.pagenum += 1
			// 再次获取数据
			this.getGoodsList()
		},
		// 下拉刷新事件
		onPullDownRefresh() {
			// 重置数据
			this.queryObj.pagenum = 1
			this.total = 0
			this.isloading = false
			this.goodsList = []
			// 重新发请求
			this.getGoodsList(() => uni.stopPullDownRefresh())
		}
	}
</script>

<style>

</style>