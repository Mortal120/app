<template>
	<view calss="swiper-content">
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in dataList" :key="index" >
				<view class="swiper-item"><image :src="item.imgUrl"></image></view>
			</swiper-item>
			
		</swiper>
	</view>
	
</template>

<script>
	export default{
		props:{
			dataList:Array
		},
		
	}
	
</script>

<style scoped>
	swiper{
		width:100%;
		height: 400rpx;
		}
	.swiper-item image{
		width:100%;
		height: 400rpx;
	}
</style>
