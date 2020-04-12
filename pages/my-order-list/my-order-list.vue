<template>
	<view class="my-order-list">
		<Lines></Lines>
		<!-- 头部点击区域 -->
		<view class="my-order-titles">
			<view v-for="(item,index) in tabList" :key="index" @tap="tabChange(index)">
				<view class="my-order-title" :class="tabIndex==index?'my-order-title-active':''" >{{item.name}}</view>	
			</view>
		</view>
		<Lines></Lines>
		
		<view  style='"height:" +homeH+"px;"' v-for="(item,index) in tabList" :key="index" class="homeH" >
			<view v-if="item.status===tabIndex">
				<view v-if="item.list.length>0">
				<!-- 订单头部部分 -->
				<view class="order-status">
					<view class="f-active-color">待买家支付</view>
				</view>
				<Lines></Lines>
				<Goods :dataList="item.list"/>
				
				<!-- 结算部分 -->
				<view class="count">
					<view>订单金额<span class="f-active-color" >¥{{item.total}}</span>(含运费0.00)</view>
					<view class="order-pay">支付</view>
				</view>

				</view>
				<view class="no-order" v-else>
					<view>您还没有相关订单</view>
					<view class="goMain">去首页看看</view>
				</view>
				

				
			</view>
			
			
			
			
			
		</view>
		
		
		
	</view>
</template>

<script>
	import Lines from '@/components/comment/Lines.vue'
	import Goods from "@/components/my/my-order-goods.vue"
	export default {
		data() {
			return {
				tabList:[
					{name:"全部",
					total:190,
					status:0,
					list:[{
						imgUrl:"../../static/img/Children.jpg",
						goodsName:"貂皮大衣，貂皮大衣貂皮大衣貂皮大衣貂皮大衣貂皮大衣貂皮大衣",
						color:"竹炭坐垫黑色",
						size:"45*45cm",
						count:"39"
						
					},
					{
						imgUrl:"../../static/img/Children.jpg",
						goodsName:"貂皮大衣，貂皮大衣貂皮大衣貂皮大衣貂皮大衣貂皮大衣貂皮大衣",
						color:"竹炭坐垫黑色",
						size:"45*45cm",
						count:"49"
						
					}]},
					{
						name:"待付款",
						total:39,
						status:1,
						list:[]
					},
					{
						name:"代发货",
						total:39,
						status:2,
						list:[]
					},
					{
						name:"待收货",
						total:39,
						status:3,
						list:[]
					},
					{
						name:"待评价",
						total:39,
						status:4,
						list:[]
					},
					
					],
				    tabIndex:0,
					homeH:0
			}
		},
		onLoad(){
			this.getHomeH()
		},
		methods: {
			//切换tabbar
			tabChange(index){
				this.tabIndex=index
				
				
			},
			//获取高度
			getHomeH(){
				uni.getSystemInfo({
					success:(res)=>{
						this.homeH=res.windowHeight-uni.upx2px(100)
					}
				})
				
			}
			
		},
		components:{
			Lines,
			Goods
		}
	}
</script>

<style scoped>
	.homeH{
		/* background-color: pink; */
	}
	.my-order-list{
		background-color: #F7F7F7;
		height: 100vh;
		
	}
	.my-order-titles{
		display: flex;
		justify-content: space-between;
		height: 100rpx;
	}
	.my-order-title{
		padding: 10rpx 20rpx;
		font-size: 30rpx;
	}
	.my-order-title-active{
		border-bottom: solid 2rpx #49BDFB;
	}
	.order-status{
		display: flex;
		justify-content: flex-end;
		padding: 20rpx;
	}
	
	.count{
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		padding: 20rpx 20rpx;
		
	}
	.order-pay{
		width: 100rpx;
		height: 50rpx;
		border-radius: 18rpx;
		border:solid 2rpx #49BDFB;
		display: flex;
		justify-content: center;
		align-items: center;
		color:#49BDFB ;
	}
	.no-order{
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding-top: 100rpx;
		
	}
	.goMain{
		width:200rpx ;
		height: 80rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #49BDFB;
		border: solid 2rpx #49BDFB;
		border-radius: 20rpx;
		
	}
	

</style>
