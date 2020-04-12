<template>
	<view class="search">
		<Lines></Lines>
		<view class="search-item f-color">
			<view class="search-title">
				<view class="f-color">最近搜索</view>
				<view class="iconfont icon-lajitong" @tap="delData"></view>
			</view>
			<view v-if="searchList.length>0" >
					<view class="search-name"  v-for="(item,index) in searchList" :key="index" @tap="pushIn(item)">{{item}}</view>
			</view>
			<view class="search-end" v-else>暂无搜索记录</view>
			<view class="search-title">
				<view class="f-color">热门搜索</view>
			</view>
			<view>
				<view class="search-name">千年狐皮肤</view>
				<view class="search-name">芭比娃娃套装</view>
				<view class="search-name">最美夕阳红</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import Lines from "@/components/comment/Lines.vue"
	export default {
		data(){
			return{
				keyWords:"",
				searchList:[]
			}
		},
		onLoad(){
			uni.getStorage({
				key:"searchData",
				success:(res)=>{
					// console.log(res)
					this.searchList=JSON.parse(res.data)
					
				}
			})
		},
		//监听原生标题的点击事件
		onNavigationBarButtonTap(){
			//因为我们上面只有一个搜索按钮所以只要点击了，就算触发
			//在我们点击的时候，我们判断，如果里面的值的长度大于0，就发起请求
			this.search()
		},
		onNavigationBarSearchInputConfirmed(){
			this.search()
		},
		components:{
			Lines
		},
		//监听原生标题栏的搜索的事件
		onNavigationBarSearchInputChanged(e){
			this.keyWords=e.text
		},
		
		methods: {
			search(){
				if(this.keyWords.length>0){
					uni.navigateTo({
						url:"../search-list/search-list?keywords="+this.keyWords+""
					})
				}else{
					uni.showToast({
						"title":"请输入要搜索的商品",
						"icon":"none"
					})
				}
				// 发起请求之后,我们把里面的keywords缓存到本地
				this.addData()
			},
			addData(){
				let idx=this.searchList.indexOf(this.keyWords)
				if(idx<0){
					this.searchList.unshift(this.keyWords)
				}else{
					// this.searchList.splice(idx,1)//根据索引值来进行删除操作，返回的是已经删的值所组成的数组
					this.searchList.unshift(this.searchList.splice(idx,1)[0])
				}
				uni.setStorage({
					key:"searchData",
					data:JSON.stringify(this.searchList)
				})
				//我们已经将我们的数据存储到本地了，在页面开始加载的时候，我们读取他，也就是onload
				
			},
			//删除最近搜索
			//1弹出信息框，询问是否删除
			//2根据条件判断是否删除
			delData(){
				uni.showModal({
					title:"提示：",
					content:"是否删除搜索记录",
					success:(res)=>{
						if(res.confirm){
							uni.removeStorage({
								key:"searchData",
								success:()=>{
									this.searchList=[]
								}
							})
						}
					}
					
				})
				
			},
			//点击最近搜索的单个item，进行搜索
			pushIn(item){
				uni.navigateTo({
					url:"../search-list/search-list?keywords="+item+""
				})
				
				
			},
			
		}
	}
</script>

<style scoped>
	.search-item{
		padding:20rpx
	}
	.search-title{
		display: flex;
		justify-content: space-between;
	}
	.search-name{
		padding:2rpx 24rpx;
		display: inline-block;
		background-color: #E1E1E1;
		border-radius: 26rpx;
		margin: 10rpx;
	}
	.search-end{
		text-align: center;
	}
	

</style>
