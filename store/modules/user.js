export default{
	state:{
		loginStatu:false,
		token:null,
		userInfo:{}
	},
	getters:{},
	mutations:{
		//一旦我们进入app，就会执行这个方法，把用户信息自动导出来
		initUser(state){
			let userInfo=uni.getStorageSync("userInfo")
			console.log(userInfo)
			if(userInfo){
				userInfo=JSON.parse(userInfo)
				state.userInfo=userInfo
				state.loginStatu=true
				state.token=userInfo.token
				
			}
		},
		//用户登录的时候，存储用户登录状态
		login(state,userInfo){
			state.userInfo=userInfo
			state.loginStatu=true
			state.token=userInfo.token
			//持久化存储我们的登录信息
			uni.setStorageSync("userInfo",JSON.stringify(userInfo))
		},
		//退出登录
		loginOut(state){
			state.userInfo={}
			state.loginStatu=false
			state.token=null
			uni.clearStorageSync("userInfo")
			
		}
	},
	actions:{}
}