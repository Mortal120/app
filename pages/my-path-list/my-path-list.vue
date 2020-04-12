<template>
	<view class="my-path-list">
		<view v-for="(item,index) in list" :key="index" @tap="tapItem(index)">
			<view class="path-content" @tap="goPathBack(item)">
				<view class="path-item">
					<view class="path-name">{{item.name}}</view>
					<view>{{item.tel}}</view>
				</view>
				<view class="path-item">
					<view class="path-moren" v-if="item.isDefault">默认</view>
					<view>{{item.address}}{{item.detail}}</view>
				</view>
			</view>
		</view>
		<view class="add-path-content" >
			<view class="add-path-btn" @tap="addPath">添加地址</view>
		</view>
		
		
	</view>
</template>

<script>
	import {mapState,mapMutations,mapActions} from 'vuex'
	export default {
		data() {
			return {
				selected:false
				
			}
		},
		onLoad(e){
			if(e.type==="selected"){
				// this.goPathBack()
			this.selected=true
				
			}
			
		},
		computed:{
			...mapState({list:state=>state.path.list,}
			)
		},
		methods: {
			//去往添加地址页面
			addPath(){
				uni.navigateTo({
					url:"../my-add-path/my-add-path"
				})
			},
			tapItem(index){
				let obj=JSON.stringify({
					index:index,
					data:this.list[index]
				})
				uni.navigateTo({
					url:"../my-add-path/my-add-path?obj="+obj+""
				})
			},
			//返回确认订单页面
			goPathBack(item){
				if(this.selected){
					//自定义一个方法，拿到所选的地址
					uni.$emit("selectedPath",item)
					uni.navigateBack({
						data:1
					})
				}
			}
			
		
			
		}
	}
</script>

<style scoped>
	.my-path-list{
		margin-left: 10rpx;
	}
	.path-content{
		padding: 20rpx 0;
		border-bottom: solid #CCCCCC 2rpx;
		margin-bottom: 10rpx;
	}
	.add-path-content{
		display: flex;
		width: 100%;
		justify-content: center;
		align-items: center;
		
	}
	.path-item{
		display: flex;
		/* margin-top: 20rpx; */
	}
	.path-name{
		margin-right: 10rpx;
		font-weight: bold;
	}
	.path-moren{
		padding: 6rpx 5rpx;
		background-color: #49BDFB;
		color: #FFFFFF;
		border-radius: 10rpx;
		
	}
	.add-path-btn{
		background-color: #49BDFB;
		color: #FFFFFF;
		padding: 20rpx 60rpx;
		border-radius: 10rpx;
	}

</style>
