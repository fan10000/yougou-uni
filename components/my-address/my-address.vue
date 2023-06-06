<template>
	<view class="address-container">
		<!-- 选择收货地址 -->
		<view class="address-choose-box" v-if="JSON.stringify(address) === '{}'">
			<button class="button" type="primary" size="mini" @click="chooseAddress">请选择收货地址+</button>
		</view>
		<!-- 收货信息 -->
		<view class="address-info-box" @click="chooseAddress" v-else>
			<view class="row1">
				<view class="col-left">
					<view class="name">收件人：{{address.userName}} </view>
				</view>
				<view class="col-right">
					<view class="mobile">电话：{{address.telNumber}}</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="col-left">收件地址：</view>
				<view class="col-right">{{fullAddress}}</view>
			</view>

		</view>
		<!-- 底部线条 -->
		<image class="address-border" src="/static/images/cart/cart_border@2x.png"></image>
	</view>
</template>

<script>
	import { mapState, mapActions } from "pinia"
	import { useUserStore } from "@/stores/user.js"
	export default {
		name: "my-address",
		data() {
			return {};
		},
		computed: {
			// 将 user 储存库中的 数据 导入此页面
			...mapState(useUserStore, ['address', 'fullAddress']),

		},
		methods: {
			// 将 user 储存库中的  更新地址 方法 导入此页面
			...mapActions(useUserStore, ['updateaddress']),

			async chooseAddress() {
				// 调用小程序选择收货地址API
				const res = await uni.chooseAddress().catch(err => err)
				// 用户选择了收货地址
				if (res.errMsg === 'chooseAddress:ok') {
					// 储存到本地
					this.updateaddress(res)
				}
				// 用户未授权
				if (res.errMsg === 'chooseAddress:fail auth deny') {
					this.reAuth()
				}
			},
			// 重新发起收货地址的授权
			async reAuth() {
				// 调用 uni 的 弹窗提示API
				await uni.showModal({
					content: '检测到您没有打开地址权限，是否去设置打开？',
					confirmText: '确认',
					cancelText: '取消',
					success(res) {
						if (res.cancel) {
							return uni.$showMsg('您取消了地址授权！')
						}
						if (res.confirm) {
							// 调起客户端小程序设置界面
							return uni.openSetting({
								success(settingRes) {
									if (settingRes.authSetting['scope.address']) return uni.$emit(
										'授权成功，请选择地址')
									if (!settingRes.authSetting['scope.address']) return uni.$showMsg(
										'您取消了地址授权！')
								}

							})
						}
					}

				})
			}
		},
	}
</script>

<style lang="scss">
	.address-container {
		padding: 0 14rpx;
	}

	.address-choose-box {
		height: 180rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.address-info-box {
		height: 180rpx;
		font-size: 24rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;

		.row1 {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.col-right {
				display: flex;
			}
		}

		.row2 {
			display: flex;
			align-items: center;
			margin-top: 20rpx;

			.col-left {
				white-space: nowrap;
			}
		}
	}

	.address-border {
		display: block;
		width: 100%;
		height: 10rpx;
	}
</style>