import { defineStore } from "pinia"

export const useUserStore = defineStore('uni-user', {
	state: () => ({
		// 读取本地的收货地址数据，初始化 address 对象
		address: JSON.parse(uni.getStorageSync('address') || '{}')
	}),
	getters: {
		// 拼接完整地址
		fullAddress() {
			if (!this.address.provinceName) return ''
			return this.address.provinceName + this.address.cityName + this.address.countyName + this.address
				.detailInfo
		}
	},
	actions: {
		// 更新收货地址
		updateaddress(address) {
			this.address = address
			this.saveAddressStorage()
		},
		// 持久化储存到本地
		saveAddressStorage() {
			uni.setStorageSync('address', JSON.stringify(this.address))
		}
	}
})