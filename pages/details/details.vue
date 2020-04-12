<template>
	<view class="detail"  >
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<view class="swiper-item">
					<image :src="item.imgUrl" class="swiper-img"></image>	
				</view>
			</swiper-item>
		</swiper>
		<!-- 商品基本信息 -->
		<view class="goods-detail">
			<view class="pprice-goods">现价:￥{{goodsContent.pprice}}</view>
			<view class="oprice-goods">原价:￥{{goodsContent.oprice}}</view>
			<view class="name-goods">{{goodsContent.commodityName}}</view>	
		</view>
	<!-- 商品详情图 -->
	    <view>
			<view >
				<image src="../../static/img/detail1.jpg"  class="goods-image"></image>
			</view>
			<view >
				<image src="../../static/img/detail2.jpg" class="goods-image"></image>
			</view>
			<view>
				<image src="../../static/img/detail3.jpg"  class="goods-image"></image>
			</view>
			<view >
				<image src="../../static/img/detail4.jpg" class="goods-image"></image>
			</view>
			<view >
				<image src="../../static/img/detail5.jpg" class="goods-image"></image>
			</view>
		</view>
		<!-- 推荐图 -->
		<Card cardTitle="看了又看"></Card>
		<CommodityList :dataList="dataList"></CommodityList>
		<!-- 固定底部的按钮 -->
		<view class="goods-foot">
			<view class="iconfont icon-xiaoxi"></view>
			<view class="iconfont icon-gouwuche" @tap="goShop"></view>
			<view class="shop-car" @tap="showPop">加入购物车</view>
			<view class="purchase" @tap="showPop">立即购买</view>
		</view>
		<!-- 点击购物车和购买会弹出pop的页面 -->
		<view class="pop" v-show="popMask" @touchmove.stop.prevent="" >
			<!-- //蒙版 -->
			<view class="pop-mask" @tap="hidPop" ></view>
			<!-- 内容区域 -->
			<view class="pop-content" :animation="animationData">
				<!-- //商品的图片价格以及确定购买 -->
				<view>
					<view class="pop-item">
						<image class="pop-image" :src="goodsContent.imageSrc"></image>
					</view>
					<view class="pop-num">
						<view >数量</view>
						<BoxNum 
						:min="1"
						:value="count"
						@change="numChange"></BoxNum>
					</view>					
					<view class="pop-btn" @tap="addGoods">确定</view>
				</view>
			</view>
			
		</view>
	
		
	</view>
</template>

<script>
	import Card from '@/components/comment/Card.vue'
	import CommodityList from '@/components/comment/CommodityList.vue'
	// 引入我们的原始组件
	import  BoxNum from '@/components/components/uni-number-box/uni-number-box.vue'
	import http from'../../comment/api/request.js'
	import {mapMutations} from 'vuex'
	import store from 'store'
	export default {
		data() {
			return { 
				//点击加入购物车之后里面的商品数量的控制
				count:1,
				//显示蒙版是否隐藏
				popMask:false,
				//动画的数据
				animationData:{},
				swiperList:[
				{imgUrl:"../../static/img/details1.jpeg"},
				{imgUrl:"../../static/img/details2.jpeg"},
				{imgUrl:"../../static/img/details3.jpeg"},
				],
				dataList:[
					{
							"id": 1,
							"imageSrc": "../../static/img/commodity1.jpg",
							"commodityName": "新款毛衣,材质来自意大利脱落州",
							"pprice": "255",
							"oprice": "355",
							"discount": "2.5"
						},
						{
							"id": 2,
							"imageSrc": "../../static/img/commodity2.jpg",
							"commodityName": "新款毛衣,材质来自意大利脱落州",
							"pprice": "255",
							"oprice": "355",
							"discount": "2.5"
						},
						{
							"id": 3,
							"imageSrc": "../../static/img/commodity3.jpg",
							"commodityName": "新款毛衣,材质来自意大利脱落州",
							"pprice": "255",
							"oprice": "355",
							"discount": "2.5"
						},
						{
							"id": 4,
							"imageSrc": "../../static/img/commodity4.jpg",
							"commodityName": "新款毛衣,材质来自意大利脱落州",
							"pprice": "255",
							"oprice": "355",
							"discount": "2.5"
						}
					
				],
				//根据id获取到的单个商品的数据，以便于进行分享
				goodsContent:{}
				
			}
		},
		methods: {
			...mapMutations(["addShopCar"]),
			showPop(){
				//1.加入购物车前需要先进行验证是否有token,我们还需要从后台拿
				//然后和我们的store里面的token进行比较，肯定又要请求接口
				//2.或者是在我们封装的request请求中做判断，如果没有token，就发送
				if(!store.state.user.token){
					uni.showToast({
						title:"请先登录",
						icon:"none"
						
					})
					return 
				}
				
				//我们在展示的时候添加动画
				var animation = uni.createAnimation({
				      duration: 500,
				    })
					//step的意思就是结束了当前动画的操作,让我们的蒙版从下面往上面走
					//因为我们初始位置定义了一个值，
					animation.translateY(2000).step()
					//然后我们将动画export给对象
					this.animationData=animation.export()
					//然后我们在一段时间之后，上面走
					//2s钟之后
					setTimeout(()=>{
						animation.translateY(0).step()
						this.animationData=animation.export()
						
					}, 10);
					this.popMask=true
			},
			
			hidPop(){
				// console.log(222)
				this.popMask=false
			},
			getData(id){
				http.request({
					url:"/goods/details",
					data:{id:id}
				})
				.then(res=>{
					this.goodsContent=res[0]
					// console.log(this.dataContent)
				})
											
				
			},
			//去往购物车页面
			goShop(){
				
				uni.reLaunch({
					url:"../shopcar/shopcar"
				})
				
			},
			numChange(value){
				this.count=value
			},
			//点击确定按钮加入购物车
			addGoods(){
				let goods=this.goodsContent
				// this.goodsContent["checked"]=false
				// this.goodsContent["count"]=this.count
				goods["checked"]=false
				goods["count"]=this.count
				// console.log(goods)
				// 在这里我们点击确定之后，拿到了我们想要传给购物车的数据，因此我们在card里面写了方法
				//在这里可以引用
				//添加购物车数据
				this.addShopCar(goods)
				//隐藏弹出框
				this.hidPop()
				//提示信息
				uni.showToast({
					title:"添加购物车成功",
					icon:"none"
				})
				
				
				
				
				
			}
			
			
		},
		//commodity页面跳转过来会有一个id值
		onLoad(e){
			// console.log(e.id)
			//然后我们会根据id请求后端的数据
			this.getData(e.id)
			
			
		},
		//监听页面返回事件
		onBackPress(){
			// console.log(111)
			//隐藏我们的蒙版
			if(this.popMask){
					this.hidPop()
					return true
			}	
			// 监听的事件必须要return 否则会返回上一页
			
		},
		//监听我们点击tabbar的时候，（分享）
		onNavigationBarButtonTap(e){
			if(e.type==="share"){
				uni.share({
					"provider":"weixin",
					"title":this.goodsContent.commodityName,
					"type":0,
					 "scene": "WXSceneSession",
					"href":"http://192.168.1.198:8080/#/pages/details/details",
					"imageUrl":"../../static/img/commodity3.jpg",
					"success":()=>{
						uni.showToast({
							title:"分享成功",
							icon:"none"
						})
					},
					"fail":(res)=>{
						console.log(res)
					}
						
				})
			}
		},
		
		components:{
			Card,
			CommodityList,
			BoxNum
		}
	}
</script>

<style scoped>
	.detail{
		padding-bottom: 90rpx;
	}
	swiper{
		width:100%;
		height: 700rpx;
	}
	.swiper-img{
		width:100%;
		height: 700rpx;
		
	}
	.goods-detail{
		font-weight: bold;
		font-size: 36rpx;
		padding:10rpx 0;
		text-align: center;
	}
	.goods-image{
		width: 100%;
	}
	.goods-foot{
		position: fixed;
		left:0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 90rpx;
		width: 100%;
		
	}
	.goods-foot .iconfont{
		width: 60rpx;
		height:60rpx;
		border-radius: 100%;
		background-color: #000000;
		color: #FFFFFF;
		text-align: center;
		margin: 0 20rpx;
		
	}
	.shop-car{
		margin: 0 40rpx;
		padding: 6rpx 30rpx;
		background-color: #000000;
		color: #FFFFFF;
		border-radius: 40rpx;
	}
	.purchase{
		margin: 0 40rpx;
		padding: 6rpx 30rpx;
		background-color: #42B7FB;
		color: #FFFFFF;
		border-radius: 40rpx;
		
	}
	.pop{
		position: fixed;
		left:0;
		bottom: 0;
		width: 100%;
		height: 100%;
		z-index: 999;
	}
	.pop-mask{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0,0,0,0.3)
		
		
	}
	.pop-content{
		position: absolute;
		left: 0;
		bottom: 0;
		width:100%;
		background-color:#FFFFFF;
		
	}
	.pop-image{
		width:260rpx;
		height: 260rpx;	
	}
	.pop-num{
		display: flex;
		justify-content: space-between;
		line-height: 80rpx;
		align-items: center;
		padding: 25rpx;
	}
	.pop-btn{
		width:100%;
		line-height: 100rpx;
		background-color: #49BDFB;
		color: #FFFFFF;
		text-align: center;
	}
	

</style>
