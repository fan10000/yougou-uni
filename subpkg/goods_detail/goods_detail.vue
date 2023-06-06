<template>
	<view class="goods-info-container" v-if="goodsInfo.goods_name">
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" indicator-active-color="#fff" :interval="3000" :duration="1000" autoplay
			circular>
			<swiper-item v-for="(item,i) in goodsInfo.pics" :key="item.goods_id" @click="preview(i)">
				<image :src="item.pics_big"></image>
			</swiper-item>
		</swiper>
		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<view class="price">
				¥{{goodsInfo.goods_price}}
			</view>
			<view class="goods-info-body">
				<view class="goods-name">
					{{goodsInfo.goods_name}}
				</view>
				<uni-fav :checked="checked" class="favBtn" :circle="true" bg-color="#dd524d" bg-color-checked="#007aff"
					fg-color="#ffffff" fg-color-checked="#ffffff" @click="favClick" />
			</view>
			<view class="yf">
				快递：免运费 -- {{cart.length}}
			</view>
		</view>
		<!-- 商品详情信息 -->
		<rich-text :nodes="goodsInfo.goods_introduce"></rich-text>
		<!-- 商品导航组件 -->
		<view class="goods-nav">
			<uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import { mapState, mapActions } from 'pinia'
	import { useCartStore } from "@/stores/cart.js";
	export default {
		data() {
			return {
				// 商品详情数据
				goodsInfo: {},
				// 收藏状态
				checked: false,
				// 商品导航组件左侧按钮组
				options: [{
					icon: 'chat',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					infoBackgroundColor: '#007aff',
					infoColor: "#f5f5f5"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				// 导航组件右侧按钮组
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
						color: '#fff'
					}
				]
			};
		},
		onLoad(option) {
			// 获取上个页面传递来的商品 id
			const goods_id = option.goods_id
			// 获取商品详情数据
			this.getGoodsDetail(goods_id)
		},
		computed: {
			// 购物车的数组对象
			...mapState(useCartStore, ['cart', 'total'])
		},
		watch: {
			// 即时回调的侦听器，
			total: {
				handler(newVal) {
					// 找到购物车的配置对象
					const findResult = this.options.find(x => x.text === '购物车')
					if (findResult) {
						findResult.info = newVal
					}
				},
				// 强制立即执行回调
				immediate: true
			}
		},
		methods: {
			async getGoodsDetail(goods_id) {
				const { data: res } = await uni.$http.get('/api/public/v1/goods/detail', { goods_id })
				if (res.meta.status !== 200) return uni.$showMsg()
				// 解决商品图文中图片底部空白间隙，webp格式的图片在 iOS 社备无法显示
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img/g,
					'<img style="display:block;"').replace(/webp/g, 'jpg')
				this.goodsInfo = res.message
			},
			// 轮播图的预览效果
			preview(i) {
				uni.previewImage({
					/** 当前显示图片的链接/索引 */
					current: i,
					/* 需要预览的图片链接列表 */
					urls: this.goodsInfo.pics.map(x => x.pics_big)
				})
			},
			// 收藏按钮的点击事件
			favClick() {
				this.checked = !this.checked
			},
			// 商品导航组件左侧按钮组点击事件
			//	e = {index,content}
			onClick(e) {
				if (e.content.text === '购物车') {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			// // 商品导航组件右侧侧按钮组点击事件
			//	e = {index,content}
			buttonClick(e) {
				if (e.content.text === '加入购物车') {
					const goods = {
						goods_id: this.goodsInfo.goods_id, //商品的 id
						goods_name: this.goodsInfo.goods_name, //商品的名称
						goods_price: this.goodsInfo.goods_price, //商品的价格
						goods_count: 1, //商品的数量
						goods_small_logo: this.goodsInfo.goods_small_logo, //商品的图片
						goods_state: true, //商品的勾选状态
					}
					// 存储数据到购物车中
					this.addCart(goods)
				}
			},
			// 将 'stores/cart'储存库 中 加入购物车的 方法 映射到这个页面
			...mapActions(useCartStore, ['addCart'])
		}
	}
</script>

<style lang="scss">
	.goods-info-container {
		padding-bottom: 100rpx;

		swiper {
			height: 750rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}


	.goods-info-box {
		padding: 20rpx;

		.price {
			color: red;
			font-size: 36rpx;
			margin: 20rpx 0;
		}

		.goods-info-body {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.goods-name {
				font-size: 26rpx;
				margin-right: 20rpx;
			}
		}

		.yf {
			font-size: 24rpx;
			margin: 20rpx 0;
			color: gray;
		}
	}

	.goods-nav {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
	}
</style>