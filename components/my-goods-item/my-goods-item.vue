<template>
	<view>
		<view class="goods-item">
			<view class="goods-item-left">
				<image class="doods-pic" :src="goods.goods_small_logo || defaultPic"></image>
			</view>
			<view class="goods-item-right">
				<view class="goods-name">{{goods.goods_name}}</view>
				<view class="goods-info">
					<view class="goods-price">
						¥{{price}}
					</view>
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
		}
	}
</script>

<style lang="scss">
	.goods-item {
		display: flex;
		padding: 20rpx 10rpx;
		border-bottom: 2rpx solid #f0f0f0;

		&-left {
			margin-right: 10rpx;

			.doods-pic {
				display: block;
				width: 200rpx;
				height: 200rpx;
			}
		}

		&-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.goods {
				&-name {
					font-size: 24rpx;
				}

				&-price {
					font-size: 32rpx;
					color: red;
				}
			}
		}
	}
</style>