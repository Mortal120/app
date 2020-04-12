<template>
	<view class="my">
		<!-- 顶部导航栏区域 -->
		<view class="nav-content">
			<view class="nav-top">
				<image class="nav-top-image" src="../../static/img/setting.png" @tap="goConfig"></image>
				<image class="nav-top-image" src="../../static/img/xinxi.png"></image>
			</view>
			<view  class="avator" >
				<image class="avator-image" :src=" loginStatu ? userInfo.imgUrl : '../../static/img/beiyong.jpg' "></image>
				<view class="ava-name">{{ loginStatu ? userInfo.nickName:"我的昵称"}}</view>
			</view>
		</view>
		
		<!-- 我的订单，待收货代发货部分 -->
		<view class="order">
			<view class="order-title">
				<view>我的订单</view>
				<view @tap="goOrderList">全部订单></view>
			</view>
			<view class="order-contain">
				<view class="order-image">
					<image src="../../static/img/order1.png"></image>
					<view>代付款</view>
				</view>
				<view class="order-image">
					<image src="../../static/img/order2.png"></image>
					<view>代付款</view>
				</view>
				<view class="order-image">
					<image src="../../static/img/order3.png"></image>
					<view>代付款</view>
				</view>
				<view class="order-image">
					<image src="../../static/img/order4.png"></image>
					<view>代付款</view>
				</view>
				<view class="order-image">
					<image src="../../static/img/order5.png"></image>
					<view>代付款</view>
				</view>
				
			</view>
		</view>
		<!-- 下方的我的收藏 我的优惠券 我的积分 -->
		<view class="my-contain">
			<view class="my-item">
				<view class="my-name">我的收藏</view>
				<view>></view>	
			</view>
			<view class="my-item">
				<view class="my-name">我的优惠券</view>
				<view>></view>	
			</view>
			<view class="my-item1">
				<view class="my-name">我的积分</view>
				<view>></view>	
			</view>
			
		</view>
		<view class="my-contain">
			<view class="my-item1">
				<view class="my-name">加入超级vip</view>
				<view>></view>	
			</view>
			
		</view>
		<view class="my-contain">
			<view class="my-item">
				<view class="my-name">帮助中心</view>
				<view>></view>	
			</view>
			<view class="my-item">
				<view class="my-name">联系客服</view>
				<view>></view>	
			</view>
			<view class="my-item">
				<view class="my-name">商家入驻</view>
				<view>></view>	
			</view>
			
		</view>
		<Tabber  currentPage="my"></Tabber>
		
	</view>
</template>

<script>
	import Tabber from '../../components/tabbar/tabbar.vue'
	import {mapState} from 'vuex'
	
	export default {
		data() {
			return {
				
			}
		},
		computed:{
			...mapState({
				loginStatu:state=>state.user.loginStatu,
				userInfo:state=>state.user.userInfo,
				token:state=>state.user.token
			})
		},
		methods: {
			//去往设置页面
			goConfig(){
				uni.navigateTo({
					url:"../config/config"
				})
			},
			//去往订单列表页面
			goOrderList(){
				uni.navigateTo({
					url:"../my-order-list/my-order-list"
				})
			}
			
		},
		components:{
			Tabber
		}
	}
</script>

<style scoped>
	.my{
		background-color: #CCCCCC;
		
	}
	.nav-content{
		background-image: url("../../static/img/bg.jpg") ;
		width: 100%;
		height: 400rpx;
		position: relative;
		
		
		
		
	}
	.nav-top{
		padding-top: 80rpx;
		display: flex;
		justify-content: space-between;
	}
	.nav-top-image{
		width: 50rpx;
		height: 50rpx;
		padding: 0 20rpx;
	}
	.avator{
		
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%);
	}
	.avator-image{
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		
	}
	.ava-name{
		color: #CCCCCC;
		transform: translateX(15rpx);
		
	}
	.order-title{
		display: flex;
		justify-content: space-between;
		padding: 20rpx ;
	}
	.order-contain{
		display: flex;
		/* padding: 0 20rpx; */
		justify-content: space-between;
		background-color: #FFFFFF;
		
	}
	.order-image{
		/* width: 100rpx;
		height: 100rpx; */
		padding: 10rpx 20rpx;
	}
	.order-image image{
		width: 100rpx;
		height: 100rpx;
	}
	.my-contain{
		padding: 20rpx;
		background-color: #FFFFFF;
		margin: 20rpx 0;
	}
	.my-item{
		display: flex;
		justify-content: space-between;
		border-bottom: solid #CCCCCC 2rpx;
		padding: 20rpx 0;
	}
	.my-name{
		font-weight: bold;
	}
	.my-item1{
		display: flex;
		justify-content: space-between;
		/* border-bottom: solid #CCCCCC 2rpx; */
		padding: 20rpx 0;
		
	}
</style>
