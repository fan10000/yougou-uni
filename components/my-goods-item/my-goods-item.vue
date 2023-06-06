<template>
	<view>
		<view class="goods-item">
			<!-- 左侧区域 -->
			<view class="item-left">
				<radio :checked="goods.goods_state" color="red" @click="radioClick" v-if="showRadio"></radio>
				<image class="doods-pic" :src="goods.goods_small_logo || defaultPic"></image>
			</view>
			<!-- 右侧区域 -->
			<view class="item-right">
				<view class="goods-name">{{goods.goods_name}}</view>
				<view class="goods-info">
					<view class="price">
						¥{{price}}
					</view>
					<uni-number-box :value="goods.goods_count" :min="1" @change="numChange"
						v-if="showNumBox"></uni-number-box>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-goods-item",
		props: {
			goods: {
				type: Object,
				default (rawProps) {
					return {}
				}
			},
			showRadio: {
				type: Boolean,
				default: false
			},
			showNumBox: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				// 默认的空图片
				defaultPic: '/static/images/default-pic.png'
			};
		},
		computed: {
			price() {
				return this.goods.goods_price.toFixed(2)
			}
		},
		methods: {
			// 商品勾选状态
			radioClick() {
				// 触发自定义事件，向父组件传递数据
				this.$emit('radio-change', {
					// 商品 id
					goods_id: this.goods.goods_id,
					// 切换商品勾选状态
					goods_state: !this.goods.goods_state
				})
			},
			// 商品数量变化
			numChange(val) {
				this.$emit('num-change', {
					// 商品 id
					goods_id: this.goods.goods_id,
					// 商品数量
					goods_count: +val
				})
			}
		},
	}
</script>

<style lang="scss">
	.goods-item {
		width: 750rpx;
		box-sizing: border-box;
		display: flex;
		padding: 20rpx 14rpx;
		border-bottom: 2rpx solid #f0f0f0;
	}

	.item-left {
		margin-right: 10rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		radio {
			transform: scale(0.7)
		}

		.doods-pic {
			display: block;
			width: 200rpx;
			height: 200rpx;
		}
	}

	.item-right {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: space-between;


		.goods-name {
			font-size: 24rpx;
		}

		.goods-info {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.price {
				font-size: 32rpx;
				color: red;
			}
		}

	}
</style>