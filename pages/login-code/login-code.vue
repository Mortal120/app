<template>
	<!-- 手机注册页面 -->
	<view class="telLogin">
		<view class="showtel">
			<text style="font-weight: bold; padding-right: 20rpx;" >验证码</text>
			<input type="number" 
			value="" 
			placeholder="请输入验证码" 
			focus="true"
			v-model="userCode"
			
			 />
			 <button class="send-btn" size="mini" 
			 @tap="getCode" 
			 :disabled="disable">{{telMsg}}</button>
		</view>
		<Lines></Lines>
		<view class="info">
			<text>我们已经给您的手机号{{telNum}}发送了验证码，请注意查收</span></text>
			<view class="nextStep" @tap="goNext">下一步</view>
		</view>
		
	</view>
</template>

<script>
	import 	Lines from '../../components/comment/Lines.vue'
	import  $http from '../../comment/api/request.js'
	export default {
		data() {
			return {
				//倒计时间
				timeNum:10,
				//手机号码
				telNum:"",
				//文本信息
				telMsg:"",
				disable:false,
				//用户输入的验证码
				userCode:"",
				//从后台获得的验证码
				code:"",
				
			}
		},
		onLoad(e){
			this.telNum=e.telNum
			
		},
		methods: {
			
			
			//点击发送获取验证码
			getCode(){
				//在这里请求数据
				$http.request({
					url:'/code',
					data:{mobile:this.telNum},
					method:"POST"})
											.then(res=>{
												this.code=res.code
												
											})
											.catch(()=>{
												uni.showToast({
													title:"验证码发送失败",
													icon:"none"
												})
											})
				
				this.disable=true
				const timer= setInterval(()=>{
					--this.timeNum
					this.telMsg='重新发送('+this.timeNum+')'
				},1000)
				setTimeout(()=>{
					clearInterval(timer)
					this.timeNum=10;
					this.telMsg='重新发送'
					this.disable=false
				},10000)
				
				
				
			},
			//用户输入验证码之后，点击下一步
			goNext(){
				// console.log(this.telNum)
				if(this.code===this.userCode){
					
					//注册成功之后我们需要发起请求，添加我们的用户到数据库里面
					$http.request({
						url:"/adduser",
						method:"POST",
						data:{phone:this.telNum}
					})
					 .then((res)=>{
						if(res.success){
							
							//显示信息，注册成功
							uni.showToast({
								title:"注册成功",
								icon:"none"
								
							})
							//进行跳转操作
							uni.reLaunch({
								url:"../index/index"
							})
							
						}else{
							uni.showToast({
								title:"注册失败",
								icon:"none"
							})
						}
					 })
					
					
				}else{
					uni.showToast({
						title:"验证码错误",
						icon:"none"
						
					})
					return 
					
				}
				
				
			}
			
		},
		onReady(){
			//进来的时候我们会拿到button里面的文字
			this.telMsg='重新发送('+this.timeNum+')'
			//进来的时候就会收到验证码
			this.getCode()
		},
		components:{
			Lines
		}
	}
</script>

<style scoped>
	.showtel{
		display: flex;
		padding:40rpx 20rpx;
	}
	.nextStep{
		width:100%;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		color:#FFFFFF;
		background-color: #49BDFB;
		border-radius: 40rpx;
		margin-top: 20rpx;
		
	}
	.info{
		padding: 30rpx 20rpx;
	}
	span{
		color:#49BDFB ;
		
	}
	

</style>
