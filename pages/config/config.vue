<template>
	<view class="config">
		<view class="config-content">
			<view class="account-config">账号设置</view>
			<view class="config-item">
				<view class="config-main">
					<image  class="config-avator" :src=" loginStatu ? userInfo.imgUrl : '../../static/img/beiyong.jpg' "></image>
					<view class="config-name">{{ loginStatu ? userInfo.nickName:"我的昵称"}}</view>
					
				</view>
				
				<view class="config-icon">></view>	
			</view>
			<view class="config-item">
				<view class="config-name">修改密码</view>
				<view class="config-icon">></view>	
			</view>
			<view class="config-item">
				<view class="config-name">绑定手机号码</view>
				<view class="config-icon">></view>	
			</view>
			<view class="config-item" @tap="goPathList">
				<view class="config-name">地址管理</view>
				<view class="config-icon">></view>	
			</view>
		</view>
		<view class="config-content">
			<view class="account-config">系统设置</view>
			<view class="config-item">
				<view class="config-name">消息推送</view>
				<view class="config-icon">></view>	
			</view>
			<view class="config-item">
				<view class="config-name">短信提醒</view>
				<view class="config-icon">></view>	
			</view>
			<view class="config-item">
				<view class="config-name">图片显示</view>
				<view class="config-icon">智能模式></view>	
			</view>
			<view class="config-item">
				<view class="config-name">清除缓存</view>
				<view class="config-icon">18.0M</view>	
			</view>
		</view>
		
		<view class="loginOut" @tap="outLogin">退出登录</view>
		
		
	</view>
</template>

<script>
	import {mapMutations,mapState} from 'vuex'
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
			...mapMutations(["loginOut"]),
			//点击进入地址管理页面
			goPathList(){
				uni.navigateTo({
					url:"../my-path-list/my-path-list"
				})
			},
			outLogin(){
				uni.showToast({
					title:"退出成功!",
					icon:"none"
				})
				this.loginOut()
				
				uni.reLaunch({
					url:"../index/index"
				})
				setTimeout(()=>{
					uni.hideToast()
				},1000)
			}
			
		}
		
	}
</script>

<style scoped>
	.config{
		margin-left: 20rpx;
	}
	.account-config{
		border-bottom: solid  2rpx #636263;
		padding: 20rpx;
		font-size: 0.8em;
	}
	.config-content{
		padding-right: 20rpx;
	}
	.config-item{
		display: flex;
		justify-content: space-between;
		padding: 20rpx 0;
		border-bottom: solid 2rpx  #CCCCCC;
	}
	.config-main{
		display: flex;
		align-items: center;
	}
	.config-name{
		font-weight: bold;
	}
	.config-avator{
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		margin-right: 20rpx;
		border: solid #CCCCCC 2rpx;
	}
	.config-icon{
		color: #CCCCCC;
	}
	.loginOut{
		line-height: 100rpx;
		background-color: #42B7FB;
		text-align: center;
		color: #FFFFFF;
		font-weight: bold;
	}

</style>
