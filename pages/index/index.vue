<template>
	<!-- 上导航栏 -->
	<van-sticky>
		<view class="search-container">
			<view class="search" :style="navStyle">
				<view class="search-title" :style="titleStyle">
					优购商城
				</view>
				<input placeholder-class="search-placeholder" type="text" placeholder="输入关键词搜索" disabled
					:style="inputStyle" value="" @click="goSearch">
			</view>
		</view>
	</van-sticky>
	<!--上导航栏 -->

	<!-- 轮播图 -->
	<swiper indicator-dots indicator-active-color="#fff" autoplay circular interval="3000" duration="1000">
		<swiper-item v-for="item in swiperList" :key="item.goods_id">
			<navigator class="swiper-item" :url="`/subpkg/goods_detail/goods_detail?goods_id='item.goods_id'`">
				<image mode="widthFix" lazy-load="true" :src="item.image_src"></image>
			</navigator>
		</swiper-item>
	</swiper>
	<!-- 轮播图 -->

	<!-- 分类导航区域 -->
	<view class="nav-list">
		<view class="nav-item" v-for="item in navList" :key="item.name" @click="navClickHandler(item)">
			<image class="nav-img" :src="item.image_src"></image>
		</view>
	</view>
	<!-- 分类导航 区域-->

	<!-- 楼层区域 -->
	<view class="floor-list">
		<!-- 楼层 item 项 -->
		<view class="floor-item" v-for="item in floorList" :key="item.name">
			<!-- 楼层标题 -->
			<image class="floor-title" mode="widthFix" :src="item.floor_title.image_src"></image>
			<!-- 楼层图片区域 -->
			<view class="floor-img-box">
				<!-- 左侧大图区域 -->
				<navigator class="letf-img-box" :url="item.product_list[0].url">
					<image mode="widthFix" :src="item.product_list[0].image_src"
						:style="{width:item.product_list[0].image_width + 'rpx'}"></image>
				</navigator>
				<!-- 右侧小图区域 -->
				<view class="right-img-box">
					<template v-for="(item2,i2) in item.product_list" :key="item2.name">
						<navigator class="right-img-item" :url="item2.url" v-if="i2 !== 0">
							<image mode="widthFix" :style="{width:item2.image_width + 'rpx'}" :src="item2.image_src">
							</image>
						</navigator>
					</template>
				</view>
			</view>
		</view>
	</view>


</template>

<script>
	export default {
		data() {
			return {
				navStyle: { height: '', paddingTop: '' },
				titleStyle: { width: '', height: '', linHeight: '' },
				inputStyle: { width: '', height: '' },
				swiperList: [], //轮播图的数据列表，默认是空数组
				navList: [], // 分类导航数据
				floorList: [], // 楼层的数据列表
			}
		},
		onLoad() {
			// 检测navbar高度
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect() //自定义后的小程序胶囊按钮的布局位置信息
			uni.getSystemInfo({
				success: res => {
					let statusBarHeight = res.statusBarHeight
					let navHeight = menuButtonInfo.height
					this.navStyle = {
						height: statusBarHeight + navHeight + (menuButtonInfo.top -
							statusBarHeight) * 2 + 'px', //导航栏高度
						paddingTop: menuButtonInfo.top + 'px' //胶囊按钮与顶部的距离
					}
					this.titleStyle = {
						width: (135 / 52) * navHeight + 'px',
						height: navHeight + 'px',
						linHeight: navHeight + 'px'
					}
					this.inputStyle = {
						width: menuButtonInfo.left - 18 - ((132 / 52) * navHeight) + 'px',
						height: navHeight +
							'px'
					}
				},
				fail(err) {
					console.log(errs)
				}
			})
			// 获取轮播图数据
			this.getSwiperList()
			// 获取分类导航数据
			this.getNavList()
			// 获取楼层数据
			this.getFloorList()
		},
		methods: {
			goSearch() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
			async getSwiperList() {
				const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.swiperList = res.message
			},
			async getNavList() {
				const { data: res } = await uni.$http.get('/api/public/v1/home/catitems')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.navList = res.message
			},
			navClickHandler(item) {
				if (item.name === '分类') {
					uni.switchTab({
						url: '/pages/category/category'
					})
				}
			},
			async getFloorList() {
				const { data: res } = await uni.$http.get('/api/public/v1/home/floordata')
				if (res.meta.status !== 200) return uni.$showMsg()
				// 通过双层 forEach 循环，处理 URL 地址
				res.message.forEach(floor => {
					floor.product_list.forEach(prod => {
						prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
					})
				})
				this.floorList = res.message
			}
		}
	}
</script>

<style lang="scss">
	.search-container {
		background-color: white;
	}

	.search {
		position: relative;
		width: 100vw;
		height: 50rpx;
		display: flex;
		box-sizing: border-box;
		padding-left: 26rpx;
		background-color: white;

		&-title {
			left: 0;
			font-weight: bold;
			font-size: 32rpx;
			line-height: 64rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}

		&-placeholder {
			font-size: 28rpx;
			color: #A9A6A6;
			line-height: 64rpx;
		}

		input {
			display: block;
			box-sizing: border-box;
			background: #F7F8FA;
			height: 62rpx;
			line-height: 64rpx;
			border-radius: 20rpx;
			padding-left: 20rpx;
			font-size: 12px;
		}
	}

	swiper {
		height: 340rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15px 0;

		.nav-img {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.floor-title {
		width: 100%;
		display: flex;
	}

	.floor-img-box {
		display: flex;
		padding-left: 10rpx;

		.right-img-box {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}
	}
</style>