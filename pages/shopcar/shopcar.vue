<template>
	<view class="shop-cards">
		<!-- 自定义导航栏 -->
		<template v-if="cardList.length>0">
		<UniNavBar title="购物车" :rightText='isNavbar? "完成":"编辑"' statusBar='true' fixed="true" @clickRight="isNavbar=!isNavbar" class="navBar"></UniNavBar>
		<!-- 购物列表区域 -->
		<view class="shops-list" v-for="(item,index) in cardList" :key="index">
			<view class="shops-item">
				<!-- 单选按钮 -->
				<label class="radio" @tap="selectItem(index)">
					<radio value="" :checked="item.checked"/><text></text>
				</label>
				<!-- 图片 -->
				<image :src="item.imageSrc" class="shops-image"></image>
				<!--  商品的相关信息-->
				<view class="shops-content ">
					<view class="shops-name">{{item.commodityName}}</view>
					<view class="shops-color f-color">颜色分类：如图所示颜色</view>
					<view class='shops-prices'>
						<view class="shops-price">¥<span>{{item.pprice}}</span></view>
						<template v-if="!isNavbar">
							<view class="shops-count">x{{item.count}}</view>
						</template>
						<template v-else>
							<uniNumberBox
							:value="item.count"
							min=1 
							@change="numberChange($event,index)"></uniNumberBox>
						</template>
						
					</view>
				</view>
			</view>
		</view>
		<!-- 底部区域 -->
		<view class="shops-foot">
			<label class="radio" @tap="checkFnAll">
				<radio value=""  :checked="checkedAll"/><text>全选</text>
			</label>
			<view class="count">
				<template v-if="!isNavbar">
					<view class="total">合计:¥{{getTotal.pprice}}</view>
					<view class="sum bg-color" @tap="goConfirm">结算({{getTotal.num}})</view>
				</template>
				<template v-else>
					<view class="sum bg-colo" style="background-color:#000000;color: #FFFFFF;">移入收藏夹</view>
					<view class="sum bg-color" @tap="delGoodsFn">删除</view>
				</template>
			</view>
		</view>
			
		</template>
		<template v-else>
				<UniNavBar title="购物车" 
				statusBar='true' 
				fixed="true"
				></UniNavBar>
				<view class="shops-list-else"> <text>货架空空入也....</text></view>
			
			
		</template>
		<Tabber  currentPage="shopcar"></Tabber>
	</view>
</template>

<script>
	import UniNavBar from '@/components/components/uni-nav-bar/uni-nav-bar.vue'
	import {mapState,mapActions,mapGetters,mapMutations} from 'vuex'
	import uniNumberBox from '@/components/components/uni-number-box/uni-number-box.vue'
	import Tabber from '../../components/tabbar/tabbar.vue'
	export default {
		data() {
			return {
				isNavbar: false,
			}
		},
		methods: {
			...mapActions(["checkFnAll","delGoodsFn"]),
			...mapMutations(["selectItem"]),
			numberChange(value,index){
				//默认第一个值是value的值，第二个值是索引值
				// console.log(value,index)
				this.cardList[index].count=value
				// console.log(this.list[index])
			},
			//点击结算，去往购物车页面
			goConfirm(){
				uni.navigateTo({
					url:"../confirm-order/confirm-order"
				})
				
			}

		},
		components: {
			UniNavBar,
			uniNumberBox,
			Tabber
		},
		computed:{
			...mapState({
				cardList:state=>state.card.list
			}),
			...mapGetters(["checkedAll","getTotal"])
		}
	}
</script>

<style scoped>
	.navBar{
		padding-bottom: 20rpx;
	}
	.shops-item {
		display: flex;
		padding: 0 30rpx;
		background-color: #F7F7F7;
		padding-bottom: 80rpx;
	}

	.shops-image {
		width: 260rpx;
		height: 260rpx;
	}

	.shops-content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		flex: 1;
		margin-left: 6rpx;

	}

	.shops-name {
		font-weight: bold;
	}

	.shops-color {
		font-size: 18rpx;

	}

	.shops-prices {
		display: flex;
		justify-content: space-between;

	}

	span {
		font-weight: bold;
	}

	.shops-foot{
		border-top: 2rpx solid #F7F7F7;
		position: fixed;
		left: 0;
		bottom:0;
		width: 100%;
		padding-bottom: 120rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #F1F1F1;
	}
	.count{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100rpx;	
		
	}
	.total{
		margin-right: 30rpx;
		
	}
	.sum{
		padding: 20rpx 60rpx;	
	}
	.shops-list-else{
		position: absolute;
		left: 0;
		bottom: 0;
		top: 0;
		right: 0;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
