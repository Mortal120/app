<template>
	<view>
		<!-- 因为别的地方也要用到他，所以我们要封装一个shop-list -->
		<ShopList :keywords="keywords"></ShopList>
	</view>
</template>

<script>
	import ShopList from '@/components/comment/ShopList.vue'
	export default {
		data(){
			return{
				keywords:''
			}
		},
		components:{
			ShopList
		},
		onLoad(e){
			
			this.keywords=e.keywords
			// #ifdef APP-PLUS
			var webView = this.$mp.page.$getAppWebview();  
			webView.setTitleNViewSearchInputText(this.keywords)  
			// #endif
		},
		methods:{
			
		}
	}
</script>

<style>

</style>
