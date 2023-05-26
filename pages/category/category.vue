<template>
	<view class="scroll-container">
		<!-- 左侧滚动区域 -->
		<scroll-view scroll-y class="left-scroll-view" :style="{height:wh +'px'}">
			<view v-for="(item,i) in cateList" :key="item.car_id" :class="['left-item',i === navIndex ? 'active' : '']"
				@click="changedIndex(i)">
				{{item.cat_name}}
			</view>
		</scroll-view>
		<!-- 右侧滚动区域 -->
		<scroll-view scroll-y class="right-scroll-view" :style="{height:wh +'px'}" :scroll-top="scrollTop">
			<view class="cate-lv2" v-for="item2 in cateLevel2" :key="item2.cat_id">
				<view class="cate-lv2-title">{{item2.cat_name}}</view>
				<!-- 三级分类列表 -->
				<view class="cate-lv3-list">
					<view class="cate-lv3-item" v-for="item3 in item2.children" :key="item3.cat_id"
						@click="gotoGoodsList(item3)">
						<image :src="item3.cat_icon"></image>
						<text>{{item3.cat_name}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				wh: 0, // 可用设备高度
				navIndex: 0, //初始化选中状态-高亮
				cateList: [], //一级分类数据列表
				cateLevel2: [], //二级分类数据列表
				// 竖向滚动条位置
				scrollTop: 0

			};
		},
		onLoad() {
			const sysInfo = uni.getSystemInfoSync()
			this.wh = sysInfo.windowHeight
			this.getCateList() //请求数据
		},
		methods: {
			async getCateList() {
				const { data: res } = await uni.$http.get('/api/public/v1/categories')
				if (res.meta.status !== 200) uni.$showMsg()
				this.cateList = res.message
				this.cateLevel2 = res.message[0].children
			},
			// 选中项改变的事件处理函数
			changedIndex(i) {
				this.navIndex = i
				this.cateLevel2 = this.cateList[i].children
				this.scrollTop = this.scrollTop === 0 ? 1 : 0
			},
			// 点击三级分类商品跳转商品详情页
			gotoGoodsList(item3) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + item3.cat_id
				})
			}
		}
	}
</script>

<style lang="scss">
	.scroll-container {
		display: flex;

		.left-scroll-view {
			width: 240rpx;

			.left-item {
				text-align: center;
				line-height: 120rpx;
				background-color: #f7f7f7;
				font-size: 28rpx;

				&.active {
					background-color: #fff;
					position: relative;

					&::before {
						content: '';
						display: block;
						height: 60rpx;
						width: 6rpx;
						background-color: red;
						position: absolute;
						left: 0;
						top: 50%;
						transform: translateY(-50%);
					}
				}
			}
		}

		.cate-lv2-title {
			text-align: center;
			font-size: 28rpx;
			font-weight: bold;
			padding: 30rpx 0;
		}

		.cate-lv3-list {
			display: flex;
			flex-wrap: wrap;

			.cate-lv3-item {
				display: flex;
				width: 33.33%;
				flex-direction: column;
				align-items: center;
				margin-bottom: 20rpx;

				image {
					width: 120rpx;
					height: 120rpx;
				}

				text {
					font-size: 24rpx;
				}
			}
		}
	}
</style>