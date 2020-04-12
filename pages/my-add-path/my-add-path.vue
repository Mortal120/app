<template>
	<view class="my-add-path">
		
		<view>
			<view class="add-item">
				<view class="add-name-title">收件人</view>
				
				<view class="add-name" > <input type="text" v-model="dataItem.name"></view>
			</view>
			<view class="add-item">
				<view class="add-name-title">手机号</view>
				<view class="add-name"><input type="text" v-model="dataItem.tel"></view>
			</view>
			<view class="add-item">
				<view class="add-name-title" >所在地区</view>
				<view @tap="showCityPicker"  class="add-name"><input type="text" v-model="dataItem.address"></view>
				<template>
				    <mpvueCityPicker 
					 ref="mpvueCityPicker" 
					:pickerValueDefault="pickerValueDefault"
					 @onConfirm="onConfirm"></mpvueCityPicker>
				</template>
				
			</view>
			<view class="add-item">
				<view class="add-name-title">详细地址</view>
				<view class="add-name"><input type="text" v-model="dataItem.detail"></view>
			</view>
			<view class="add-item">
				<view class="add-name-title">设置为默认地址</view>
				<radio-group name="" class="add-name" @change="changeStatus" >
					<label class="radio">
						<radio value="" :checked="dataItem.isDefault"  /><text></text>
					</label>
				</radio-group>
					
			</view>
		</view>
		
		
		
	</view>
</template>

<script>
	import mpvueCityPicker from '../../components/components/mpvue-citypicker/mpvueCityPicker.vue'
	import {mapMutations,mapActions} from 'vuex'
	export default {
		data() {
			return {
				 pickerValueDefault: [0, 0, 1],
				 dataItem:{
					 name:"",
					 tel:"",
					 address:"请选择",
					 detail:"",
					 isDefault:''
				 },
				 index:-1,
				 //根据状态去判断是否进行修改
				 isState:false
				
			}
		},
		onLoad(e){
			// console.log(e.obj)
			if(e.obj){
				uni.setNavigationBarTitle({
					title:"修改地址"
				})
				let obj=JSON.parse(e.obj)
				this.dataItem=obj.data
				this.index=obj.index
				// console.log(this.dataItem)
				this.isState=true
				
				
				
			}
			
		},
		methods: {
			...mapActions(["saveAddPathFn","reversePathFn"]),
			showCityPicker() {
			      this.$refs.mpvueCityPicker.show();
			    },
			    onConfirm(e) {
			     this.dataItem.address=e.label
			    },
				changeStatus(){
					this.dataItem.isDefault=!this.dataItem.isDefault
				}
				
			
		},
		components:{
			mpvueCityPicker
		},
		//页面生命周期
		onNavigationBarButtonTap(){
			//如果状态为true，那么就是修改
			if(this.isState){
				this.reversePathFn(
				{index:this.index,
				data:this.dataItem}
				)	
				uni.navigateBack({
					data:1
				})
			}else{
				//如果没有设置为true，则我们点击了添加路径
				this.saveAddPathFn(this.dataItem)
				uni.navigateBack({	
					data:1
				})
			}
			
			
		}
	}
</script>

<style scoped>
	.my-add-path{
		margin-left:10rpx;
	}
	.add-item{
		border-bottom: solid #CCCCCC 2rpx;
		display: flex;
		padding: 20rpx 0;
	}
	.add-name-title{
		margin-right: 10rpx;
	}
	.add-name{
		font-weight: bold;
	}

</style>
