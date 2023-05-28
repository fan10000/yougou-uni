<template>
	<view>
		<view class="search-box">
			<uni-search-bar :focus="true" bgColor="#f7f8fA" @input="input" :radius="100" cancelButton="none"
				v-model="searchValue"></uni-search-bar>
		</view>
		<!-- 搜索结果列表 -->
		<view class="search-list" v-if="searchResult.length !== 0">
			<view class="search-item" v-for="item in searchResult" :key="item.goods_id"
				@click="goDetail(item.goods_id)">
				<view class="goods_name">{{item.goods_name}}</view>
				<uni-icons type="arrow-right" size="16"></uni-icons>
			</view>
		</view>
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="clearHistory"></uni-icons>
			</view>
			<view class="history-list">
				<uni-tag :text="item" v-for="(item,i) in historys" :key="i" @click="goGoodsList(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchValue: '',
				// 延时器 的返回值
				timer: null,
				// 搜索关键词
				kw: '',
				// 关键词搜索结果
				searchResult: [],
				// 搜索关键词的历史记录
				historyList: []
			}
		},
		methods: {
			input(e) {
				clearTimeout(this.timer)
				this.timer = setTimeout(() => {
					this.kw = e
					this.getSearchResult()
				}, 500)
			},
			// 根据关键词搜索结果
			async getSearchResult() {
				if (this.kw === '') {
					this.searchResult = []
					return
				}
				const { data: res } = await uni.$http.get('/api/public/v1/goods/qsearch', { query: this.kw })
				if (res.meta.status !== 200) return uni.$showMsg()
				this.searchResult = res.message
				// 保存搜索关键词
				this.saveSearchHistory()
			},
			goDetail(goods_id) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id' + goods_id
				})
			},
			saveSearchHistory() {
				// 解决关键词重复的问题
				const set = new Set(this.historyList)
				// 先删后增，保持关键词的前后顺序，最后搜索的显示在最前面
				set.delete(this.kw)
				set.add(this.kw)
				this.historyList = Array.from(set)
				// 调用 uni.setStorageSync(key,data)---同步保存关键词到本地缓存
				uni.setStorageSync('kw', JSON.stringify(this.historyList))
			},
			// 清空 data 和 本地缓存的关键词
			clearHistory() {
				this.historyList = []
				uni.setStorageSync('kw', '[]')
			},
			// 点击跳转到商品列表页
			goGoodsList(kw) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?query' + kw
				})
			}
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		},
		computed: {
			// 保持 后搜索的关键词排前面
			historys() {
				//注意：数组是引用数据类型，不要直接基于原数组修改，新建一个内存无关的数组，进行 reverse 反转
				return [...this.historyList].reverse()
			}
		}
	}
</script>

<style lang="scss">
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}

	.search {
		&-list {
			padding: 0 10rpx;
		}

		&-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 24rpx;
			padding: 26rpx 0;
			padding-bottom: 2rpx solid #efefef;

			.goods_name {
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				margin-right: 6rpx;
			}
		}
	}

	.history {
		&-box {
			padding: 0 10rpx;
		}

		&-title {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 80rpx;
			font-size: 26rpx;
			border-bottom: 2rpx solid #efefef;
		}

		&-list {
			display: flex;
			flex-wrap: wrap;

			.uni-tag {
				margin-top: 10rpx;
				margin-right: 10rpx;
			}
		}
	}
</style>