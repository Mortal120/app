<template>
	<view>
	<view class="shop-title">
		<view class="shop-item" v-for="(item,index) in topList.data" :key="index" @tap="tapChange(index)" >
				<view :class="topList.currendIndex===index ? 'f-active-color' :''">{{item.name}}</view>
				<view class="shop-icon" >
					<view class="iconfont icon-shangjiantou up" :class=" item.status===1 ? 'f-active-color':'' "></view>
					<view class="iconfont icon-xiajiantou down" :class=" item.status===2 ? 'f-active-color':'' "></view>
				</view>
		</view>
	</view>
	<Lines/>
	<CommodityList :dataList="dataList"></CommodityList>
	</view>

</template>

<script>
	import Lines from '@/components/comment/Lines.vue'
	import CommodityList from '@/components/comment/CommodityList.vue'
	import  http from '@/comment/api/request.js'
	export default{
		components:{
			Lines,
			CommodityList
		},
		props:{
			keywords:String
		},
		data(){
			return{
				topList:{
					currendIndex:0,
					data:[
						{name:"价格",status:1,key:"pprice"},
						{name:"折扣",status:0,key:"discount"},
						{name:"品牌",status:0}]
					
				},
				dataList:[]
			}
		},
		computed:{
			//监听价格或者折扣的变化，获取到数据(我们需要返回的是pprice 和desc)
			orderBy(){
				//首先找到我们点击的是哪个对象
				let obj =this.topList.data[this.topList.currendIndex]
				//返回的是1
				let val=obj.status===1 ? "desc":"asc"
				return {
					[obj.key]:val
				}
				
				
			}
		},
		//注意：这不是页面，是组件，所以要在mounted里面写请求
		mounted(){
			//请求数据，我们根据search-list传过来的keywords来请求
			this.getData()
		
		},
		
		methods:{
			//请求搜索数据的方法
			getData(){
				http.request({
					url:'/goods/search',
					data:{
						name:this.keywords,
						...this.orderBy
					}		
				})
				 .then(res=>{
					 // console.log(JSON.stringify(res))
					 this.dataList=JSON.parse(JSON.stringify(res))
					 // console.log(this.dataList)
				 })
				 .catch(()=>{
					uni.showModal({
						title:"请求失败",
						icon:"none"
					})
					 
				 })
				
				
			},
			tapChange(i){
				// console.log(this.orderBy)
				this.getData()
				//定义初始状态，刚开始渲染的时候
				// console.log(orderBy)
				let idx=this.topList.currendIndex//初始为0
				
				let item=this.topList.data[idx]
				if(idx==i){
					return item.status=item.status===1 ? 2: 1
			}
			let newItem=this.topList.data[i]
			item.status=0;
			this.topList.currendIndex=i;
			newItem.status=1
			
		}
	},
	}
</script>

<style scoped>
	.shop-title{
		display:flex;
		
	}
	.shop-item{
		flex:1;
		display: flex;
		height: 80rpx;
		justify-content: center;
		align-items: center;
		
		
	}
	.shop-icon{
		position: relative;
		margin-left:10rpx;
	}
	.iconfont{
		width: 18rpx;
		height: 9rpx;
		position: absolute;
		left:0;
		
	}
	
	.up{
		
		top:-37rpx
		
	}
	.dowm{
		top: -27rpx;
	}
	
</style>
