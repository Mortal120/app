<template>
	<view>
		<!-- 在这个页面中我们想引入我们之前写过的组件，也就是commodity组件 -->
		<Commodity :dataList="dataList" :itemW="'250rpx'" :imgH="'220rpx'"></Commodity>
	</view>
</template>

<script>
	import Commodity from '../comment/Commodity.vue'
	export default{
		props:{
			dataList:Array
		},
		components:{
			Commodity
		}
		
	}
	
</script>

<style>
</style>
