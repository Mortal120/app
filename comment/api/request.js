//封装我们的request请求，
export default{
	common:{
		baseUrl:'http://192.168.1.198:3000/api',
		data:{},
		header:{
			"content-type":"application/json",
			"content-type":"application/x-www-form-urlencoded",
		},
		method:"GET",
		dataType:"json",
		
	},
	request(options={}){
		options.url=this.common.baseUrl+options.url,
		options.data=options.data||this.common.data,
		options.header=options.header||this.common.header,
		options.method=options.method||this.common.method,
		options.dataType=options.dataType||this.common.dataType
		return new Promise((res,rej)=>{
			// uni.showLoading({
			// 	title:"加载中"
			// })
			uni.request({
				//里面传的是一个对象。url 等等 {url:xxx,dataType:yyy}
				...options,
				//注意:这里是成功的回调，返回的是一个结果
				success:(result)=>{
					// console.log(res)
					if(result.statusCode!==200){
						return rej();
					}
					// setTimeout(function () {
					// 					    uni.hideLoading();
					// 					}, 500);
					//首先根据我们的uni.request获取到数据，然后将数据传递给我们的promise 里面res方法
				let data=result.data.data
				res(data)	
				}
			})
		})
	}
   
}