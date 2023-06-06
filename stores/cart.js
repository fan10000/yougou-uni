import { defineStore } from "pinia"

export const useCartStore = defineStore('uni-cart', {
	/*
	购物车的数组，用来存储购物车中每个商品的信息对象，
	每个信息对象都包含 6 个属性：
	{goods_id，goods_name，goods_price，goods_count，goods_small_logo，goods_state}
	 */
	state: () => {
		return { cart: JSON.parse(uni.getStorageSync('cart') || '[]') }
	},
	getters: {
		// 统计购物车中商品的总数量
		total: (state) => {
			return state.cart.reduce((total, item) => total += item.goods_count, 0)
		},
		// 勾选商品的总数量
		checkedGoodsCount: (state) => {
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item
				.goods_count, 0)
		},
		// 勾选商品的总价格
		checkedGoodsAmount(state) {
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count *
				item.goods_price, 0).toFixed(2)
		}
	},
	actions: {
		// 添加到购物车的方法
		addCart(goods) {
			// goods 是要添加到购物车的数据对象
			// 根据提交的商品 id 查询购物车有没有这个商品，
			// 有则返回查找到的商品数据，无则返回 undefind
			const findResult = this.cart.find(x => x.goods_id === goods.goods_id)
			if (!findResult) {
				this.cart.push(goods)
			} else {
				findResult.goods_count++
			}
			this.saveStorage()
		},
		// 更新购物车的商品勾选状态
		updateGoodsState(goods) {
			// 根据 id 查询 购物车商品
			const findResult = this.cart.find(x => x.goods_id === goods.goods_id)
			if (findResult) {
				findResult.goods_state = goods.goods_state
			}
			// 存储到本地
			this.saveStorage()
		},
		// 更新所有商品的勾选状态，实现全选与反选
		updateAllGoodsState(newState) {
			this.cart.forEach(x => x.goods_state = newState)
			this.saveStorage()
		},

		// 更新购物车的商品数量
		updateGoodscount(goods) {
			// 根据 id 查询 购物车商品
			const findResult = this.cart.find(x => x.goods_id === goods.goods_id)
			if (findResult) {
				findResult.goods_count = goods.goods_count
			}
			// 存储到本地
			this.saveStorage()
		},
		// 移除商品
		removeGoods(goods_id) {
			this.cart = this.cart.filter(x => x.goods_id !== goods_id)
			this.saveStorage()
		},
		// 将购物车数据持久化 存储到本地
		saveStorage() {
			uni.setStorageSync('cart', JSON.stringify(this.cart))
		},
	}
})