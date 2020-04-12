export default{
	state:{
		list:[
			{name:"小刚",
			tel:15055836378,
			address:"江西省南昌市南昌县",
			detail:"南昌大学四号楼",
			isDefault:false},
			{name:"老王",
			tel:15055836378,
			address:"江西省南昌市南昌县",
			detail:"江西师范大学6号楼",
			isDefault:true}
		],
		
	},
	getters:{
		getDefaultPath(state){
			
			return state.list.filter(v=>{
				return v.isDefault
			}
				 
			)
			
		}
	},
	mutations:{
		//点击保存的时候，返回的函数
		saveAddPath(state,obj){
			state.list.unshift(obj)
		},
		//修改
		reversePath(state,{index,data}){
			for(let key in data){
				//循环我们拿到的数据的每一项
				state.list[index][key]=data[key]
			}
			
		},
		//选择为默认收货地址逻辑是：只要我们点击了新增或者是修改，我们都让他们的其他默认地址设置为false，之后再让他们重新赋值
		defaultPath(state){
			state.list.forEach(v=>{
				v.isDefault=false
			})
			
		}
		
	},
	actions:{
		saveAddPathFn({commit},obj){
			if(obj.isDefault){
				commit("defaultPath")
			}
			commit("saveAddPath",obj)
		},
		reversePathFn({commit},{index,data}){
			if(data.isDefault){
				commit("defaultPath")	
			}
			commit("reversePath",{index,data})
		}
		
	}
	
}