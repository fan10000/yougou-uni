<template>
	<view>
		<view class="my-settle-container">
			<label class="radio" @click="changeAllstate">
				<radio color="red" :checked="isFullCheck"><text>全选</text></radio>
			</label>
			<view class="amount">
				合计：<text>¥ {{checkedGoodsAmount}}</text>
			</view>
			<button class="btn-set" type="default" size="mini">结算 {{checkedGoodsCount}}</button>
		</view>
	</view>
</template>

<script>
	import { mapState, mapActions } from "pinia"
	import { useCartStore } from "@/stores/cart.js"
	export default {
		name: "my-settle",
		data() {
			return {};
		},
		computed: {
			// 导入 cart 储存库的 数据
			...mapState(useCartStore, ['total', 'checkedGoodsCount', 'checkedGoodsAmount']),
			// 是否全选
			isFullCheck() {
				return this.total === this.checkedGoodsCount
			}
		},
		methods: {
			...mapActions(useCartStore, ['updateAllGoodsState']),
			// 实现全选/反选
			changeAllstate() {
				this.updateAllGoodsState(!this.isFullCheck)
			}
		}
	}
</script>

<style lang="scss">
	.my-settle-container {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		box-sizing: border-box;
		padding: 0 14rpx;
		background-color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28rpx;

		radio {
			transform: scale(0.8);
		}

		.amount {
			flex: 2;
			margin: 0 20rpx;
			text-align: end;

			text {
				color: red;
			}
		}

		.btn-set {
			color: #fff;
			border-radius: 100px;
			background: linear-gradient(90deg, #FF8A18, #EF1224)
		}
	}
</style>