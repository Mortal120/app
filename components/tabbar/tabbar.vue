<template>
	<!-- 底部导航栏 -->
	<view class="tabber">
		<view class="tabber-content">
			<view class="tabber-item" v-for="(item,index) in tabList" :key="index" @tap=tabbarChange(item.pagePath)>
                <image v-if="item.pagePath===currentPage" :src="item.selectedIconPath" class="tabber-image" mode=""></image>
				<image v-else :src="item.iconPath" class="tabber-image" mode=""></image>
				<text>{{item.text}}</text>
				
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				tabList:[
					{
					    "pagePath": "index",
					    "iconPath": "/static/tabbar/home.png",
					    "selectedIconPath": "/static/tabbar/homeSelect.png",
					    "text": "首页"
					},
					{
					    "pagePath": "list",
					    "iconPath": "/static/tabbar/sort.png",
					    "selectedIconPath": "/static/tabbar/sortSelect.png",
					    "text": "分类"
					},
					
					{
					    "pagePath": "shopcar",
					    "iconPath": "/static/tabbar/shop.png",
					    "selectedIconPath": "/static/tabbar/shopSelect.png",
					    "text": "购物车"
					},
					{
					    "pagePath": "my",
					    "iconPath": "/static/tabbar/my.png",
					    "selectedIconPath": "/static/tabbar/mySelect.png",
					    "text": "我的"
					}
					
					
				]
			}
		},
		props:{
			 currentPage:{
				 type:String,
				 default:"index"
			 }
		},
		methods:{
			tabbarChange(e){
				//购物车和我的页面需要去验证是否有账号登录
				if(e==="shopcar"|| e==="my"){
					this.navigateTo({url:"/pages/"+e+"/"+e+""})	
				}else{
					uni.redirectTo({
						url:`/pages/${e}/${e}`
					})
				}
				
			}
		}
	}
</script>

<style scoped>
	.tabber{
		position: fixed;
		left: 0;
		bottom: 0;
		height: 120rpx;
		width: 100%;
		background-color: #FFFFFF;
		color: #636262;
		
	}
	.tabber-content{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding:  0 40rpx;
		margin-top: 20rpx;
		
	}
	.tabber-item{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
		
	}
	.tabber-image{
		width: 40rpx;
		height: 40rpx;
	}
</style>
