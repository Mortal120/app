<template>
	<view class="banner">
		<image class="banner-image" :src="dataList"></image>
	</view>
</template>

<script>
	export default{
		props:{
			dataList:String
		}
	}
</script>

<style scoped>
	.banner{
		width: 100%;
		height: 300rpx;
	}
	.banner-image{
		width:100%;
		height: 300rpx;
	}
</style>
