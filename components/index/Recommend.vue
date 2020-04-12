<template>
	<view class="recommend bg-color">
		<view class="recommend-item" v-for="(item,index) in dataList" :key="index">
			<image class="image-big" :src="item.bigImg"></image>
			<view class="image-small" >
				<block v-for="(k,j) in item.data" :key="j">
					<image :src="k.imgUrl"></image>	
				</block>
				
			</view>
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
	.recommend{
		padding: 20rpx;
	}
	
	.recommend-item{
		margin:20rpx 0;
		border-radius: 20rpx;
		border:solid 4rpx #ccc;
		display: flex;
		flex-direction: column;
		/* justify-content: center;
		align-items: center; */
		margin: 20rpx 0;
		overflow: hidden;
	}
	.image-big{
		height: 300rpx;
		width: 100%;
		
	}
	.image-small{
		width:100%;
		height: 240rpx;
		}
	.image-small image{
		height: 240rpx;
		width:33.333%
	}
	
</style>
