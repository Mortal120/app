<template>
	<view>
		<Lines />
		<view class="list" >
			<!-- 左边滑块 -->
			<scroll-view scroll-y="true" class="list-left" :style="'height:'+homeH+'px;'" >
				<view class="left-item" v-for="(item,index) in leftList" :key="index" @tap="leftChange(index,item.id)">
					<view class="left-name" :class=" leftIndex===index ? 'left-name-active':'left-name'">{{item.name}}</view>
				</view>
			</scroll-view>
			<!-- 右边滑块 -->
			<scroll-view scroll-y="true" class="list-right"  :style="'height:'+homeH+'px;'">
				<view class='righ-list' v-for="(item,index) in rightList" :key="index">
					<view class='list-title'>{{item.name}}</view>
					<view class='right-content' >	
						<block v-for="(k,j) in item.list" :key="j">
							<view class='right-item'>
								<image class='right-img' :src="k.imgUrl"></image>
								<view class='right-name'>{{k.name}}</view>
							</view>
						</block>
					</view>
				</view>
			</scroll-view>
		</view>
		<Tabber  currentPage="list"></Tabber>
	</view>
</template>

<script>
	import Lines from '../../components/comment/Lines.vue'
	import http from '@/comment/api/request.js'
	import Tabber from '../../components/tabbar/tabbar.vue'
	export default {
		data() {
			return {
				//滑块的高度
				homeH: 0,
				leftIndex: 0,
				//左边滑块的数据
				leftList: [],
				rightList: []

			}
		},
		onReady() {
			// console.log(this.getClientHight()) 我们得到的是2px，因为我们减去了一点距离，
			//对于这个安卓手机来讲，上面的刘海并不影响布局，因此可以不用管
			uni.getSystemInfo({
				success: (res) => {
					this.homeH = res.windowHeight
					// console.log(res.windowHeight) 这个是获取到的窗口的高度
					// console.log(this.homeH) 这个是最终高度

				}
			})

		},
		onLoad() {
			this.getData()
		},
		components: {
			Lines,
			Tabber
		},
		methods: {
			leftChange(i, id) {
				//确定我们点击的是哪项
				this.leftIndex = i
				this.getData(id)

			},
			getData(id) {
				//假如我们点击的id和当前的所选中的id不同，就不请求数据
				if (id === (this.activeIndex + 1)) {
					return;
				}

				http.request({
						url: "/goods/list"
					})
					.then((res) => {
						// console.log(JSON.stringify(res))
						let leftList = []
						let rightList = []
						res.forEach((v) => {
							if ((this.leftIndex + 1) === v.id) {
								rightList = v.data

							}
							leftList.push({
								id: v.id,
								name: v.name
							})
						})

						this.leftList = leftList
						this.rightList = rightList
						// console.log(JSON.stringify(this.leftList))
						// console.log(JSON.stringify(this.rightList))

						// console.log(res)
					})
					.catch(() => {
						uni.showModal({
							title: "请求失败！"

						})
					})

			}
		},
		//点击原生标题栏，进行跳转到搜索页面
		onNavigationBarSearchInputClicked() {
			//只有在不获取焦点的情况下才能点击
			uni.navigateTo({
				url: "../search/search"
			})
		},


	}
</script>

<style scoped>
	.list {
		display: flex;
	}

	.list-left {
		width: 200rpx;
	}

	.left-item {
		border-bottom: 2rpx solid #FFFFFF;
		font-size: 28rpx;
		font-weight: bold;
		background-color: #F7F7F7;
	}

	.left-name {
		padding: 30rpx 6rpx;
		text-align: center;
	}

	.left-name-active {
		border-left: 8rpx solid #49BDFB;
		background-color: #FFFFFF;
	}

	.list-right {
		flex: 1;
		padding-left: 30rpx;
	}

	.list-title {
		font-weight: bold;
		padding: 30rpx 0;
	}

	.right-content {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		
	}

	.right-item {
		width: 150rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 10rpx;
	}

	.right-name {
		padding: 16rpx 0;
	}

	.right-img {
		width: 150rpx;
		height: 150rpx;
	}
</style>
