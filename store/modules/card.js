export default{
	state:{
		//购物车数据
		list:[],
		selectList:[]
	},
	getters:{
		checkedAll(state){
			//相同返回true
			return state.list.length===state.selectList.length
		},
		//合计和结算
		getTotal(state){
			let total={
				pprice:0,
				num:0
			}
			state.list.forEach(v=>{
				if(state.selectList.indexOf(v.id)>-1){
						 total.pprice+=v.pprice*v.count
					
				}
				
			})
			total.num=state.selectList.length
		
			return total
		}
		
	},
	mutations:{
		//全选
		checkAll(state){
			state.selectList=state.list.map(v=>{
				v.checked=true
				return v.id
			})
			
		},
		//不是全选
		uncheckAll(state){
			state.list.forEach(v=>{
				v.checked=false
			})
			state.selectList=[]
			
			
		},
		selectItem(state,index){
			// console.log(id)
			//判断当前商品选中的状态
			let id=state.list[index].id
			let i=state.selectList.indexOf(id)
			//当前为选中的状态，则需要删除state.selectlist里面的id，同时设置state.list[index].checked:false
			if(i>-1){
				state.list[index].checked=false
				// 必须return出去，这样才能进行下一次的判断
				return state.selectList.splice(i,1)
				
			}
			//为选中的状态，将state.list[index].checked:true 给state.selectList里面push进id
			
			state.selectList.push(id)
			return state.list[index].checked=true
		},
		delGoods(state){
			 state.list=state.list.filter(v=>{
				 //当我们点击删除的时候
				 return state.selectList.indexOf(v.id)===-1
			 })
			
		},
		//加入购物车
		addShopCar(state,goods){
			state.list.push(goods)	
		}
	},
	actions:{
		checkFnAll({commit,getters}){
			//true代表相同,当前状态为全选，我们点击他之后想让他不是全选
			getters.checkedAll ? commit("uncheckAll") : commit("checkAll")
			
		},
		delGoodsFn({commit}){
			commit("delGoods")
			commit("uncheckAll")
			uni.showToast({
				title:"删除成功！",
				icon:"none"
			})
		}
	}
}