<template>
	<view class="shop">
		<view class="shop-item" v-for="(item,index) in dataList" :key="index">
			<view class="shop-img">
				<image class="shop-img" :src="item.imgurl"></image>
			</view>
			<scroll-view scroll-x="true" class="scroll-content" >
				<Commodity :dataList="item.data" :wrap="'nowrap'" :itemW="'200rpx'" :imgH="'200rpx'" :fontName="'20rpx'"></Commodity>
			</scroll-view>
		</view>	
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

<style scoped>
	.shop-img{
		width:100%;
		height: 350rpx;
	}
	.scroll-content{
		width:100%;
		white-space: nowrap;
	}
	/* .scroll-item{
		display:inline-block;
		width: 300rpx;
		height: 300rpx;
	} */
</style>
