<template>
	<view class="index">
		<!--顶部滑块区域 -->
		<scroll-view scroll-x="true" class="scroll-content" :scroll-into-view="scrollIndex">
			<view class="scroll-item"
			 v-for="(item,index) in topBar" 
			 :key="index"
			 @tap="topTabChange(index)"
			 :id="'top'+index">
				<text :class='topBarIndex===index ?"f-active-color": "f-color"'>{{item.name}}</text>
			</view>	
		</scroll-view>
		<swiper @change="swipChanges" :current="topBarIndex" :style="'height:'+homeH+'px;'" >
			<swiper-item v-for="(item,index) in newTopBar" :key="index">
			<scroll-view scroll-y="true" :style="'height:'+homeH+'px;'" @scrolltolower="scrollEvent(index)">
				<block v-if="item.data.length>0">
					<block v-for="(k,j) in item.data" :key="j">
						<!-- 首页 -->
						<IndexSwiper v-if="k.type==='swiperList'" :dataList="k.data"></IndexSwiper>
						<template v-if="k.type==='recommendList'">
							<Recommend :dataList="k.data"></Recommend>
							<card cardTitle="猜你喜欢"></card>
						</template>
						<!-- 运动户外 -->
						
						<Banner v-if="k.type==='bannerList'" :dataList="k.imgUrl"></Banner>
						<template v-if="k.type==='iconsList'">
							<Icons :dataList="k.data" ></Icons>
							<Card cardTitle="热销爆品"></Card>
						</template>
						<template v-if="k.type==='hotList'">
							<Hot  :dataList="k.data"></Hot>
							<Card cardTitle="推荐店铺"></Card>
						</template>
					
						<template v-if="k.type==='shopList'">
							<Shop :dataList="k.data"></Shop>
							<Card cardTitle="为您推荐"></Card>
						</template>
						<CommodityList v-if="k.type==='commodityList'" :dataList="k.data"> </CommodityList>
					</block>
					<view class="push">
						<text>{{newTopBar[index].loadingText}}</text>
					</view>
				</block>  
				<view v-else>暂无数据</view>
				
			</scroll-view>
			</swiper-item>
		</swiper>
		<!-- 推荐模板 -->
		<!-- <IndexSwiper></IndexSwiper>
		<Recommend></Recommend>
		<card cardTitle="点击更多"></card>
		<CommodityList></CommodityList> -->
		
		<!-- 首页其他模板 -->
		<!-- <Banner></Banner>
		<Icons></Icons>
		<Card cardTitle="热销爆品"></Card>
		<Hot></Hot>
		<Shop></Shop>
		<Card>为您推荐</Card>
		<CommodityList></CommodityList> -->	
		<Tabber currentPage="index"></Tabber>
	</view>
</template>

<script>
	import http from '@/comment/api/request.js'
	import IndexSwiper from '@/components/index/indexSwiper.vue'
	import Card from '../../components/comment/Card.vue'
	import Recommend from '../../components/index/Recommend.vue'
	import CommodityList from '../../components/comment/CommodityList.vue'
	import Banner from '@/components/index/Banner.vue'
	import Icons from '@/components/index/Icons.vue'
	import Hot from '@/components/index/Hot.vue'
	import Shop from '@/components/index/Shop.vue'
	import Tabber from '../../components/tabbar/tabbar.vue'
	export default {
		data() {
			return {
				topBarIndex:0,
				scrollIndex:"top0",
				//装载组件盒子的高度
				homeH:0,
				topBar:[],
				//我们想要的渲染的数据
				newTopBar:[],
				//下方的loading文字，因为这个也是动态改变的，也就是说，请求完之后我们需要改变他
				//另一方面，每一个swoper里面的内容都会有不同的状态，因此我们不能再这里定义，
				// loading:"下拉加载更多..."
				}
			
		},
		components:{
			IndexSwiper,
			Recommend,
			Card,
			CommodityList,
			Banner,
			Icons,
			Hot,
			Shop,
			Tabber
			
		},
		onLoad() {
			this._init_()
		},
		onReady(){
			// console.log(this.getClientHight()) 我们得到的是2px，因为我们减去了一点距离，
			//对于这个安卓手机来讲，上面的刘海并不影响布局，因此可以不用管
			uni.getSystemInfo({
				success:(res)=>{
					this.homeH=res.windowHeight-uni.upx2px(80)
					// console.log(res.windowHeight) 这个是获取到的窗口的高度
					// console.log(this.homeH) 这个是最终高度
					
				}
			}) 
			 
		},
		//监听原生标题栏的点击事件
		onNavigationBarButtonTap(e){
			if(e.float==="left"){
				uni.navigateTo({
					url:"../search/search"
					
				})
			}
		},
		methods: {
			//首页数据
			//
			_init_(){
					http.request({url:"/index_list/data"})
														.then((res)=>{
														this.topBar=res.topBar
														this.newTopBar=this.getData(res)
														
													})
													  .catch(()=>{
														  console.log("请求失败!")
													  })	
				
				// uni.request({
				// 	url:'http://192.168.1.198:3000/api/index_list/data',
				// 	success:(res)=>{
				// 		let data=res.data.data
				// 		// console.log(data)
				// 		this.topBar=data.topBar
				// 		//将我们得到的数据，进行处理，得到我们想要的格式
				// 		//像这种的newTopBar{data:[{type:"xxx",data:[]]}
				// 		this.newTopBar=this.getData(data)
				// 		// console.log(JSON.stringify(this.newTopBar))
				// 	}
				// })
			},
			getData(res){
				let arr=[]
				for( var i=0;i<this.topBar.length;i++){
					let obj={
						data:[],
						load:"first",
						loadingText:"上拉加载更多"
					}
					if(i===0){
						obj.data=res.data
							
					}
					arr.push(obj)
						
					}
					return arr
					// console.log(JSON.stringify(arr))
			},
			topTabChange(index){
				if(index===this.topBarIndex){
					return
				}
				this.topBarIndex=index
				this.scrollIndex="top"+index
				//当我们点击topbar的时候，拿到相应的id，然后进行根据id请求数据
				//发起请求，因为我们是监听滑动到那个区域才能够请求数据，所以每次滑动都会请求一遍，
				//所以我们要设置限定条件
				//思路是：每次请求钱，我们这是一个first，请求后我们设置为end，只有在first的情况下才会请求数据
				if(this.newTopBar[index].load==="first"){
					this.addData()}
				
			},
			swipChanges(e){
				this.topTabChange(e.detail.current)
			},
			//获得可视区域的高度
			//坑： 正常情况下，我们想法是，通过获取到高度之后，减掉我们的topbar就ok的，
			//但是，手机有刘海屏，到时候我们计算的肯定会有问题，所以需要判断是安卓还是ios
			//实际我们要给的高度为  拿到可视窗口的高度-ios或者安卓的刘海高度（安卓是48 ios是44px），再减去状态栏的高度
			//在减去我们的顶部topBar的高度
			getClientHight(){
				const res=uni.getSystemInfoSync()
				const system=res.platform
						if(system==="ios"){
							//statusBarHeight 状态栏的高度
							//经过测试，该手机不需要这一步操作，
							return 44+res.statusBarHeight
						}else if(system==="android"){
							return res.statusBarHeight-22
						}else{
							return 0
						}
			},
			//获取运动户外和服饰内衣
			addData(callback){
				//index不能做为id，因为index是0 1 2 ，而我们是 1 ，2 3
				// console.log(index )
				let index=this.topBarIndex
				let id=this.topBar[index].id
				let page=Math.ceil(this.newTopBar[index].data.length/5)+1
				// console.log(page)
				// console.log(id) 
				http.request({url:'/index_list/'+id+'/data/'+page})
																		.then(res=>{
																			// let data=res.data.data
																			// console.log(data)
																			this.newTopBar[index].data=[...this.newTopBar[index].data,...res]
																		})
																		.catch(()=>{
																			console.log("获取数据失败")
																		})
				
					// uni.request({
					// 	url:`http://192.168.1.198:3000/api/index_list/${id}/data/${page}`,
					// 	success:(res)=>{
					// 		// this.newTopBar=res.data
					// 		// console.log(res.data)
					// 		//如果我们不做处理，后面的鞋靴箱包没有数据的话，请求会报错
					// 		//因此我们通过返回的状态码来进行观察是否请求数据
					// 		if(res.statusCode!==200){
					// 			return 
					// 		}
					// 		let data=res.data.data
					// 		// console.log(data)
					// 		this.newTopBar[index].data=[...this.newTopBar[index].data,...data]
					// 		// console.log(this.newTopBar[index].data)
							
					// 	}
					// })
					this.newTopBar[index].load="end"
					if(typeof callback==="function"){
						callback() 
					}
	},
			//当我们滑动到底部的时候会触发这个函数
			scrollEvent(index){
				this.newTopBar[index].loadingText="加载中..."
				//之后就是请求数据
				console.log(this.newTopBar[index].load)
				this.addData(()=>{
					this.newTopBar[index].loadingText="上拉加载更多..."
				})
		
			}
		}
	}

</script>

<style scoped>
	.wx-nav{
		line-height: 200rpx;
		height:200rpx;
		width:100%;
		text-align: center;
		display: flex;
		justify-content: space-between;
		align-content: center;
	}
	.scroll-content{
		width:100%;
		height: 80rpx;
		white-space: nowrap;
	}
	.scroll-item{
		display: inline-block;
		padding:4rpx 20rpx;
		font-size: 36rpx;
		font-weight: bold;
	
	}
	.f-active-color{
		padding: 2rpx 0;
		border-bottom: solid 4rpx #49BDFB;
	}
	.push{
		border-top: 8rpx solid #3F536E;
		text-align: center;
		font-size: 30rpx;
		padding-top:20rpx;
		
	}
	
	
</style>
