<template>
	<view class="card">
		<view>-</view>
		<slot>
			<view class="cardName">{{cardTitle}}</view>
		</slot>
		<view>-</view>
	</view>
</template>

<script>
	export default{
		props:{
			cardTitle:String
		}
	}
</script>

<style scoped>
	.card{
		 display: flex;
		 font-size: 32rpx;
		 justify-content: center;
		 font-weight: bold;
		 margin-top: 20rpx;
	}
	.cardName{
		margin: 0 20rpx;
		
	}
	
</style>
