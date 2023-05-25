<template>
	<!-- 上导航栏 -->
	<van-sticky>
		<view class="search-container">
			<view class="search" :style="navStyle">
				<view class="search-title" :style="titleStyle">
					天使童装
				</view>
				<input placeholder-class="search-placeholder" type="text" placeholder="输入关键词搜索" disabled
					:style="inputStyle" value="" @click="goSearch">
			</view>
		</view>
	</van-sticky>
	<!--上导航栏 -->

	<!-- 轮播图 -->
	<view class="swiper-container">
		<swiper class="swiper1" indicator-dots indicator-active-color="#fff" autoplay circular>
			<swiper-item v-for="item in 3" :key="item">
				<img src="" alt="">
			</swiper-item>
		</swiper>
	</view>
	<!-- 轮播图 -->

</template>

<script>
	export default {
		data() {
			return {
				navStyle: { height: '', paddingTop: '' },
				titleStyle: { width: '', height: '', linHeight: '' },
				inputStyle: { width: '', height: '' }
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
		},
		methods: {
			goSearch() {
				uni.navigateTo({
					url: '/pages/search/search'
				})
			},
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
</style>