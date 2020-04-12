import Vue from 'vue'
import App from './App'
import store from "./store/index.js"
Vue.config.productionTip = false
Vue.prototype.$store=store

App.mpType = 'app'
Vue.prototype.navigateTo=(options)=>{
	if(!store.state.user.loginStatu){
		//没有在登录状态
		// uni.showToast({
		// 	title:"请先登录",
		// 	icon:"none"
		// })
		return uni.navigateTo({
			url:"/pages/login/login",
			
		})
		 
		
	}
	 uni.navigateTo(options)
}

const app = new Vue({
	store,
    ...App
	
})
app.$mount()
