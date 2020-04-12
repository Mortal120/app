<template>
	<view class="payment">
		<uniNavBar 
		leftText="关闭"
		title="确认支付"></uniNavBar>
		<view>
			<label for="">
				<view class="pay-item">
					<view class="pay-left">
						<image src="../../static/img/zfb.png" class="pay-image"></image>
						<view>
							<view class="pay-title">支付宝支付</view>
							<view class="pay-info">推荐支付宝用户使用</view>
						</view>
					</view>
					
					<label class="radio">
						<radio value="" /><text></text>
					</label>
				</view>
			</label>
			<label for="">
				<view class="pay-item">
					<view class="pay-left">
						<image src="../../static/img/wxf.png" class="pay-image"></image>
						<view>
							<view class="pay-title">微信支付</view>
							<view class="pay-info">推荐有微信账号的用户使用</view>
						</view>
					</view>
					
					<label class="radio">
						<radio value="" /><text></text>
					</label>
				</view>
			</label>
			<!-- 下方的固定区域 -->
			<view class="bot-containt">
				<view  class="count" >合计：<span>¥1000</span></view>
				<view style="color: #FFFFFF;" class="goPay" @tap="goPaySuccess">去支付</view>
			</view>
			
			
		</view>
		
	</view>
</template>

<script>
	import uniNavBar from '../../components/components/uni-nav-bar/uni-nav-bar.vue'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			//去往支付成功页面
			goPaySuccess(){
				uni.showToast({
					title:"支付中",
					icon:"none"
				})
				setInterval(()=>{
					uni.hideToast()
				},1000)
				uni.navigateTo({
					url:"../payment-success/payment-success"
				})
			}
			
		},
		components:{
			uniNavBar
			
		}
	}
</script>

<style scoped>
	.payment{
		padding-top: 50rpx;
	}
	.pay-item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 40rpx;
		
	}
	.pay-left{
		display: flex;
	}
	.pay-image{
		width: 100rpx;
		height: 100rpx;
		padding-right: 20rpx;
	}
	.pay-title{
		font-weight: bold;
		
	}
	.pay-info{
		color: #636263;
	}
	.bot-containt{
		position: fixed;
		left: 0;
		bottom: 0;
		background-color: #000000;
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 120rpx;
		
	}
	.count{
		display: flex;
		/* justify-content: flex-end; */
		padding-left: 40rpx;
		flex: 1;
		color: #CCCCCC;
	}
	.goPay{
		width: 180rpx;
		background-color: #42B7FB;
		line-height: 120rpx;
		text-align: center;
		font-weight: bold;
		font-size: 1.2em;
		
		
	}
	span{
		color: #FFFFFF;
		font-weight: bold;
		font-size: 1.2em;
	}

</style>
