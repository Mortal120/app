<template>
	<view class="payment-success">
		<view class="pay-title">
			<view style="color: #49BDFB; padding: 20rpx 0; font-weight: bold; font-size: 1.2em;">支付成功！</view>
			<view class="goMain" @tap="goIndex">去首页看看</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goIndex(){
				uni.reLaunch({
					url:"../index/index"
					
				})
			}
			
		}
	}
</script>

<style scoped>
	.payment-success{
		height: 100vh;
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
		
	}
	.goMain{
		width: 140rpx;
		height: 60rpx;
		border-radius: 20rpx;
		border:solid 2rpx #49BDFB;
		text-align: center;
	}
	

</style>
