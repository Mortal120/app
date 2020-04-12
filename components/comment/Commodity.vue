<template>
	<!-- 单个商品界面 -->
	
	<view class="commodity" :style="'flex-wrap:'+wrap+';'">
		
		<view class="commodity-item" 
		 v-for="(item,index) in dataList" :key="index"
		 :style="'width:'+itemW+';'"
		 @tap="goDetail(item.id)">
			<image class="commodity-image" :src="item.imageSrc" :style="'height:'+imgH+';'"></image>
			<view class="commodity-content" :style="'font-size:'+fontName+';'">
				<text class="commodity-name">{{item.commodityName}}</text>
				<view >
					<text class="pprice">￥{{item.pprice}}</text>
					<text class="oprice">￥{{item.oprice}}</text>
				</view>
				<text class="discount">{{item.discount}}折</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		//给首页的每一个商品添加路由跳转
		methods:{
			goDetail(id){
				uni.navigateTo({
					url:'../../pages/details/details?id='+id+''
				})
			}
		},
		props:{
			dataList:Array,
			//每一个item的宽度值
			itemW:{
				type:String,
				default:"375rpx"
				
			},
			//图片高度
			imgH:{
				type:String,
				default:"375rpx"
			},
			//是否换行
			wrap:{
				type:String,
				default:"wrap"
			},
			fontName:{
				type:String,
				default:"26rpx"
			}
		}
	}
</script>

<style scoped>
	.commodity{
		margin-top: 20rpx;
		display: flex;
		
	}
	.commodity-item{
		padding-bottom:20rpx;
	}
	.commodity-image{
		width:100%;
	}
	.commodity-content{
		text-align: center;
	}
	.commodity-name{
		text-overflow: ellipsis;
		overflow: hidden;
		display:-webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		word-break: break-all;
		padding: 6rpx 20rpx;
		color: #333333;
	}
	.oprice{
		text-decoration: line-through;
		color: #99999;
	}
	.discount{
		border-radius: 5rpx;
		border: solid 1px #FF3333;
		padding:2rpx 10rpx;
		font-size: 20rpx;
		color: #FF3333;
		
		
	}
</style>
