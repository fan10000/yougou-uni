<template>
	<view>
		<view class="my-search-container" :style="{'background-color':$props.bgcolor}" @click="$emit('clickSearch')">
			<!-- 使用 view 组件模拟 input 输入框的样式 -->
			<view class="search-box" :style="{'border-radius':$props.radius}">
				<uni-icons type="search" size="17"></uni-icons>
				<text class="placeholder">搜索</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-search",
		props: {
			bgcolor: {
				type: String,
				default: '#f7f8fA'
			},
			radius: {
				type: String,
				default: '32rpx'
			}
		},
		data() {
			return {

			};
		},
	}
</script>

<style lang="scss">
	.my-search-container {
		display: flex;
		height: 100rpx;
		background-color: #f7f8fA;
		padding: 0 20rpx;
		align-items: center;
	}

	.search-box {
		display: flex;
		width: 100%;
		height: 72rpx;
		background-color: #fff;
		align-items: center;
		justify-content: center;
		border-radius: 32rpx;

		.placeholder {
			font-size: 28rpx;
			color: #A9A6A6;
			margin-left: 10rpx;
		}
	}
</style>