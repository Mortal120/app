<template>
	<!-- 手机注册页面 -->
	<view class="telLogin">
		<view class="showtel">
			<text style="font-weight: bold; padding-right: 40rpx;" >手机号</text>
			<input type="number" 
			value="" 
			placeholder="请输入11位手机号" 
			focus="true"
			v-model="telNum"
			 />
		</view>
		<Lines></Lines>
		<view class="info">
			<view class="nextStep" @tap="nextStep">下一步</view>
			<text>继续注册代表您阅读并同意<span>(百年奥莱网(含app)服务协议)</span></text>
			
		</view>
		
	</view>
</template>

<script>
	import Lines from '../../components/comment/Lines.vue'
	import $http from '../../comment/api/request.js'
	export default {
		data() {
			return {
				telNum:"",
				rules:{
					telNum:{
						rule:/^1[3456789]\d{9}$/,
						msg:"不合法的手机号"
					}
					
				}
				
			}
		},
		methods: {
			//点击下一步
			nextStep(){
				// console.log(this.rules.telNum.rule.test(this.telNum))
				//需要发起请求，看改手机号是否已经注册
				$http.request(
							{url:"/register",
							data:{userName:this.telNum},
							method:"POST"
							})
							  .then(res=>{
								 if(res.success){
									 //代表改手机号未注册，可以进行注册
									 if(!this.vaildKey("telNum"))return
									 uni.showLoading({
									 	title:"加载中",
									 })
									 // setInterval(()=>{
									 // 	uni.hideLoading()
									 // 	console.log(111)
									 	
									 // },1000)
									 uni.navigateTo({
									 	url:"../login-code/login-code?telNum="+this.telNum+""
									 })
									 uni.hideLoading()
									 
									 
								 }else{
									 uni.showToast({
									 	title:res.msg,
										icon:"none"
									 })
									 return 
									 
								 }
							  })
											
											
				
				
				
				
					
					
					
				
			},
			//进行手机号的校验
			vaildKey(key){
				let flag=true
				//如果验证失败
				if(!this.rules[key].rule.test(this[key])){
					uni.showToast({
						title:this.rules[key].msg,
						icon:"none"
					})
					flag=false
					return  false
				}
				return flag
				
			},
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
		margin-bottom: 20rpx;
		
	}
	.info{
		padding: 30rpx 20rpx;
	}
	span{
		color:#49BDFB ;
		
	}

</style>
