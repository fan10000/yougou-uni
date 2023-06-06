<template>
	<view>
		<view class="cart-container" v-if="cart.length !== 0">
			<!-- 收货地址 -->
			<my-address></my-address>
			<view class="cart-title">
				<uni-icons type="shop"></uni-icons>
				<text class="cart-title-text">购物车</text>
			</view>
			<!-- 商品列表 -->
			<uni-swipe-action>
				<view v-for="item in cart" :key="item.goods_id">
					<uni-swipe-action-item :right-options="options" @click="swipeActionClick(item)">
						<my-goods-item :goods="item" :showRadio="true" @radio-change="radioChange" :showNumBox="true"
							@num-change="numChange"></my-goods-item>
					</uni-swipe-action-item>
				</view>
			</uni-swipe-action>
			<!-- 结算区 -->
			<my-settle></my-settle>
		</view>

		<view class="empty-container" v-else>
			<image class="empty-img" src="/static/images/cart/cart_empty@2x.png"></image>
			<text class="empty-text">空空如也</text>
		</view>
	</view>
</template>

<script>
	import { mapState, mapActions } from "pinia"
	import { useCartStore } from "@/stores/cart.js"
	export default {
		data() {
			return {
				// 右侧选项内容及样式
				options: [{
					text: '删除',
					style: {
						backgroundColor: 'red'
					}
				}]
			};
		},
		onShow() {
			this.setBadge()
		},
		watch: {
			checkedGoodsCount() {
				this.setBadge()
			}
		},
		computed: {
			// 将 cart 储存库的 数据 映射到此页面
			...mapState(useCartStore, ['cart', 'checkedGoodsCount']),

		},
		methods: {
			// 映射 cart 存储库 的 方法到此页面
			...mapActions(useCartStore, ['updateGoodsState', 'updateGoodscount', 'removeGoods']),
			// 商品勾选状态变化
			radioChange(e) {
				this.updateGoodsState(e)
			},
			// 商品数量发送变化
			numChange(e) {
				this.updateGoodscount(e)
			},
			// 删除商品
			swipeActionClick(e) {
				this.removeGoods(e.goods_id)
			},
			// 显示与隐藏购物车右上角的数字徽标
			setBadge() {
				if (this.checkedGoodsCount > 0) {
					uni.setTabBarBadge({
						index: 2,
						text: this.checkedGoodsCount + ''
					})
				} else {
					uni.removeTabBarBadge({
						index: 2,
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.cart-container {
		padding-bottom: 100rpx;
	}

	.cart-title {
		height: 80rpx;
		display: flex;
		align-items: center;
		font-size: 28rpx;
		padding-left: 14rpx;
		border-bottom: 2rpx solid #efefef;

		&-text {
			padding-left: 20rpx;
		}
	}

	.empty-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 300rpx;

		.empty-img {
			width: 180rpx;
			height: 180rpx;
		}

		.empty-text {
			font-size: 24rpx;
			color: gray;
			margin: top 30rpx;
		}
	}
</style>