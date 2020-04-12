<template>
	<view class="confirm-order" >
		<Lines></Lines>
		<view @tap="goPath">
			<template v-if="this.path">
				<view class="order-infos">
					<view class="order-info" >
						<view style="font-size: 36rpx;">收货人:{{path.name}}</view>
						<view style="font-size: 36rpx;">{{path.tel}}</view>
					</view>
					<view class="order-add f-color">收货地址:{{path.address}}{{path.detail}}</view>
				</view>	
			</template>
			<template v-else>
				<view  class="no-path">
					请选择默认地址>
				</view>
			</template>
		</view>
		
		<Goods :dataList="goodsList"></Goods>
		<view></view>
		<view class="order-total">
			<view class="confirm-total">合计:<span>¥1000</span></view>
			<view class="confrim-order" @tap="goPayment">提交订单</view>
		</view>
		
		
	</view>
</template>

<script>
	import Lines from '../../components/comment/Lines.vue'
	import Goods from '../../components/my/my-order-goods.vue'
	import { mapGetters}from 'vuex'
	export default {
		data() {
			return {
				goodsList:[{
					imgUrl:"../../static/img/Children.jpg",
					goodsName:"貂皮大衣，貂皮大衣貂皮大衣貂皮大衣貂皮大衣貂皮大衣貂皮大衣",
					color:"竹炭坐垫黑色",
					size:"45*45cm",
					count:"39"
					
				},
				{
					imgUrl:"../../static/img/Children.jpg",
					goodsName:"貂皮大衣，貂皮大衣貂皮大衣貂皮大衣貂皮大衣貂皮大衣貂皮大衣",
					color:"竹炭坐垫黑色",
					size:"45*45cm",
					count:"49"
					
				}],
				//默认地址存储路径
				path:false
				
			}
		},
		methods: {
			//点击上方地址页面，选择地址
			goPath(){
				uni.navigateTo({
					url:"../my-path-list/my-path-list?type=selected"
				})
			},
			//去往支付页面
			goPayment(){
				uni.navigateTo({
					url:"../payment/payment"
				})
				
			}
			
		},
		components:{
			Lines,
			Goods
		},
		computed:{
			...mapGetters(["getDefaultPath"])
		},
		onUnload() {
			uni.$off(["selectedPath"],(res)=>{
				console.log("移除了yas")
			})
		},
		onLoad(){
			//判断是否有默认地址
			// console.log(this.getDefaultPath)
			if(this.getDefaultPath.length>0){
				// console.log(this.getDefaultPath[0].isDefault)
				this.path=this.getDefaultPath[0]
				// console.log(this.path)
			}
			//接收到自定义的方法
			uni.$on("selectedPath",res=>{
				this.path=res
				
			})	
			
		}
		
	}
</script>

<style scoped>
	.confirm-order{
		background-color: #CCCCCC;
		height: 100vh;
		width: 100vw;
	}
	.order-infos{
		padding: 20rpx;
		border-bottom: solid 2rpx #636263;
		background-color: #FFFFFF;
	}
	.order-info{
		display: flex;
		justify-content: space-between;
		align-items: center;
		
		
	}
	.order-add{
		/* text-align: center; */
		/* width: 100%; */
		padding: 20rpx 0;
	}
	.no-path{
		padding: 30rpx;
	}
	.order-total{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 150rpx;
		background-color:#FFFFFF ;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		
	}
	.confirm-total{
		flex: 1;
		display: flex;
		justify-content: flex-end;
		padding-right: 20rpx;
		font-weight: bold;
	}
	.confrim-order{
		width:200rpx;
		height: 100%;
		background-color:#49BDFB;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #FFFFFF;
		font-weight: bold;
		
		
		
	}
	span{
		color:#49BDFB ;
		padding: 0 20rpx;
		line-height: 50rpx;
		text-align: center;
	
	}

</style>
