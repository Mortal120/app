<template>
	<view>
		<view v-for="(k,j) in dataList" :key="j">
			<!-- 商品部分 -->
			<view class="order-goods">
				<image class="order-goods-image" :src="k.imgUrl"></image>
				<view class="order-goods-info">
					<view class="order-goods-name">{{k.goodsName}}</view>
					<view class="f-color" style="font-size: 24rpx;">颜色分类{{k.color}}尺寸{{k.size}}cm</view>
					<view class="f-active-color">7天无理由退货</view>
				</view>
				<view class="order-prices">
					<view >¥{{k.count}}</view>
					<view  class="f-color">*1</view>
				</view>
			</view>
			<Lines></Lines>
			
		</view>
	</view>
	
	
	
</template>

<script scoped>
	import Lines from "../comment/Lines.vue"
	export default{
		data(){
			return{}
		},
		props:{
			dataList:Array,
			
		},
		components:{
			Lines
		}
	}
	
</script>

<style>
	.order-goods{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10rpx;
		background-color: #FFFFFF;
	}
	.order-goods-image{
		width: 180rpx;
		height: 180rpx;
	}
	.order-goods-info{
		width: 430rpx;
	}
	.order-goods-name{
		overflow: hidden;
	}
	.order-prices{
		width: 100rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
</style>
