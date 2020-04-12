<template>
	<view class="icons" >
		<view class="icons-item" v-for="(item,index) in dataList" :key="index">
			<image class="icon-image" :src="item.imgurl"></image>
			<text> {{item.name}}</text>
		</view>	
	</view>
</template>

<script>
	export default{
		props:{
			dataList:Array
		}
	}
</script>

<style scoped>
	.icons{
		display: flex;
		flex-wrap: wrap;
		
	}
	.icons-item{
		padding-top: 20rpx;
		width:25%;
		display: flex;
		flex-direction: column;
	}
	.icon-image{
		height: 110rpx;
		width: 110rpx;
	}
	
	
</style>
