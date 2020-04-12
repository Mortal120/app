var express = require('express');
var router = express.Router();
var https = require('https');
var querystring = require('querystring');

//对于跨域的控制

//引入我们的数据库
var connection = require('../db/sql.js')
var user=require('../db/userSql.js')
//添加用户到我们的数据库
router.post('/api/adduser',function(req,res,next){
	//获取到前端给我们的值
	let param={
		userName:req.body.phone
	}
	//保险起见，我们还是在服务器端也加入验证
	connection.query(user.queryUserName(param),function(err,result,fields){
		if(err) throw err;
		if(JSON.stringify(result).length===2){
			//如果里面没有数据
			connection.query(user.insertData(param),function(err,result,fields){
				//上面已经做了一次判断
				if (err) throw err;
				res.send({
					data:{
						success:true,
						msg:"添加数据库成功"
					}
				})
				
				
			})
			
			
		}else{
			res.send({
				data:{
					msg:"该数据库已经拥有该手机号"
				}
			})
		}
		
	})
	
	
})
//获取验证码
router.post('/api/code',function(req,res,next){
	let mobile=req.body.mobile
	
	let postData = {
		    mobile:mobile,
		    message:'验证码:28261【铁壳测试】'
		};
	let content = querystring.stringify(postData);
	
	let options = {
	    host:'sms-api.luosimao.com',
	    path:'/v1/send.json',
	    method:'POST',
	    auth:'api:key-47382d24131ceecb40fe182bc00b7c64',
	    agent:false,
	    rejectUnauthorized : false,
	    headers:{
	    'Content-Type' : 'application/x-www-form-urlencoded',
	    'Content-Length' :content.length
	    }
	};
	
	let reqs = https.request(options,function(ress){
	    ress.setEncoding('utf8');
	    ress.on('data', function (chunk) {
	    console.log(JSON.parse(chunk));
		if(JSON.parse(chunk).msg==="ok"){
			res.send({
				data:{
					code:"28261",
					msg:"验证码已经发送"
				}
			})
			
		}else{
			res.send({
				data:{
					msg:"验证码发送失败!"
					
				}
			})
		}
	    });
	    ress.on('end',function(){
	    console.log('over');
	    });
	});
	
	    reqs.write(content);
	    reqs.end();
		
})
//验证我们的注册的手机号是否存在
router.post("/api/register",function(req,res,next){
	let param={
		userName:req.body.userName
	}
	connection.query(user.queryUserName(param),function(err,result,fields){
		if (err) throw err;
		console.log(JSON.stringify(result))
		if(JSON.stringify(result).length>2){
			res.send({
				data:{
					success:false,
					msg:"该手机号已经注册"
					
				}
			})
		}else{
			res.send({
				data:{
					success:true,
					msg:"该手机号尚未注册"
					
				}
			})
		}
	})
	
})
//查询用户名或者电话号码是否存在
router.post('/api/login',function(req,res,next){
	let param={
		userName:req.body.userName,
		userPwd:req.body.userPwd
	}
	console.log(param)
	connection.query(user.queryUserName(param),function(err,result,fields){
		if (err) throw err;
		//如果账号或者手机号验证成功的话
		if(JSON.stringify(result).length>2){
			
			connection.query(user.queryUserPwd(param),function(err,results,fields){
				// console.log(JSON.stringify(results).length)
				if(JSON.stringify(results).length>2){
					
					//此时验证了密码，可以登录
					// console.log(JSON.stringify(results))
					res.json({
						data:{
							success:false,
							data:JSON.parse(JSON.stringify(results)),
							msg:"登陆成功!"
						}
					})
				}else{
					res.json({
						success:false,
						msg:"密码错误"
					})
				}
			})
		}else{
			res.json({
				success:false,
				msg:"账号不存在！"
			})
		}
		
	})
	
})
router.get('/api/goods/search', function(req, res, next) {
	//where name like 模糊搜索
	//desc是降序 asc是升序
	//获取前端传过来的数据 ?name="大衣"&&pprice="asc"
	// console.log(req.query)
	let [goodsName, orderbyName] = Object.keys(req.query) //通过解构赋值获取到我们的数据,keys
	let name = req.query[goodsName] //大衣
	let order = req.query[orderbyName] //desc
	console.log(goodsName, orderbyName)
	console.log(name, order)
	connection.query("select * from goods_search where commodityName like '%" + name + "%' order by " + orderbyName +
		" " + order + "",
		function(error, results, fields) {
			if (error) throw error;
			// console.log('The solution is: ', JSON.parse(JSON.stringify(results)));
			// console.log(results)
			res.json({
				code: "0",
				data: JSON.parse(JSON.stringify(results))
			})

		})
	// connection.end(); 

});
//获取商品列表
router.get('/api/goods/list', function(req, res, next) {
	res.json({
		code: "0",
		data: [{
				id: 1,
				name: "箱包",
				data: [{
						
						name: "女包",
						list: [{
								id: 1,
								imgUrl: '../../static/img/shop1.jpg',
								name: "单肩斜跨包"
							},
							{
								id: 2,
								imgUrl: '../../static/img/shop1.jpg',
								name: "手提包"
							},
							{
								id: 3,
								imgUrl: '../../static/img/shop1.jpg',
								name: "手拿包"
							},
							{
								id: 4,
								imgUrl: '../../static/img/shop1.jpg',
								name: "双肩包"
							},
							{
								id: 5,
								imgUrl: '../../static/img/shop1.jpg',
								name: "卡包/零钱包"
							},
							{
								id: 6,
								imgUrl: '../../static/img/shop1.jpg',
								name: "钱包"
							}
						]
					},
					{
						
						name: "男包",
						list: [{
								id: 1,
								imgUrl: '../../static/img/shop1.jpg',
								name: "单肩斜跨包"
							},
							{
								id: 2,
								imgUrl: '../../static/img/shop1.jpg',
								name: "双肩包"
							},
							{
								id: 3,
								imgUrl: '../../static/img/shop1.jpg',
								name: "商务公文包"
							},
							{
								id: 4,
								imgUrl: '../../static/img/shop1.jpg',
								name: "手提包/手拿包"
							},
							{
								id: 5,
								imgUrl: '../../static/img/shop1.jpg',
								name: "钱包"
							},
							{
								id: 6,
								imgUrl: '../../static/img/shop1.jpg',
								name: "腰包"
							}
						]
					}
				]
			},
			{
				id: 2,
				name: "裙装/套装",
				data: [{
					
					name: "女包",
					list: [{
							id: 1,
							imgUrl: '../../static/img/shop1.jpg',
							name: "半身裙"
						},
						{
							id: 2,
							imgUrl: '../../static/img/shop1.jpg',
							name: "连衣裙"
						},
						{
							id: 3,
							imgUrl: '../../static/img/shop1.jpg',
							name: "吊带/背带裙"
						},
						{
							id: 4,
							imgUrl: '../../static/img/shop1.jpg',
							name: "套装"
						},
					]
				}]
			},
			{
				id: 3,
				name: "男装",
				data: [{
					
					name: "上装",
					list: [{
							id: 1,
							imgUrl: '../../static/img/shop1.jpg',
							name: "半身裙"
						},
						{
							id: 2,
							imgUrl: '../../static/img/shop1.jpg',
							name: "连衣裙"
						},
						{
							id: 3,
							imgUrl: '../../static/img/shop1.jpg',
							name: "吊带/背带裙"
						},
						{
							id: 4,
							imgUrl: '../../static/img/shop1.jpg',
							name: "套装"
						},
					]
				}]
			},
			{
				id: 4,
				name: "内衣服饰",
				data: [{
					name: "鞋子裤袜",
					list: [{
							id: 1,
							imgUrl: '../../static/img/shop1.jpg',
							name: "半身裙"
						},
						{
							id: 2,
							imgUrl: '../../static/img/shop1.jpg',
							name: "连衣裙"
						},
						{
							id: 3,
							imgUrl: '../../static/img/shop1.jpg',
							name: "吊带/背带裙"
						},
						{
							id: 4,
							imgUrl: '../../static/img/shop1.jpg',
							name: "套装"
						},
					]
				}]
			},
			{
				id: 5,
				name: "运动户外",
				data: [{
					name: "运动跑鞋",
					list: [{
							id: 1,
							imgUrl: '../../static/img/shop1.jpg',
							name: "半身裙"
						},
						{
							id: 2,
							imgUrl: '../../static/img/shop1.jpg',
							name: "连衣裙"
						},
						{
							id: 3,
							imgUrl: '../../static/img/shop1.jpg',
							name: "吊带/背带裙"
						},
						{
							id: 4,
							imgUrl: '../../static/img/shop1.jpg',
							name: "套装"
						},
					]
				}]
			}

		]
	})
})
//根据id来获取数据库里面商品的单个数据
router.get('/api/goods/details',function(req,res,next){
	let id=req.query.id
	connection.query("select * from goods_search where id="+id+"",
		function(error, results, fields) {
			if (error) throw error;
			// console.log('The solution is: ', JSON.parse(JSON.stringify(results)));
			// console.log(results)
			res.json({
				code: "0",
				data: JSON.parse(JSON.stringify(results))
			})
	
		})
	
	
})
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Express'
	});
});
//测试数据
router.get('/test', function(req, res, next) {
	res.json({
		code: 0,
		msg: "测试接口"
	})
});
router.get('/api/index_list/data', function(req, res, next) {
	res.json({
		code: "0",
		data: {
			topBar: [{
					id: 1,
					name: "推荐"
				},
				{
					id: 2,
					name: "运动户外"
				},
				{
					id: 3,
					name: "服饰内衣"
				},
				{
					id: 4,
					name: "鞋靴箱包"
				},
				{
					id: 5,
					name: "美妆个护"
				},
				{
					id: 6,
					name: "家具数码"
				},
				{
					id: 7,
					name: "食品母婴"
				}
			],
			data: [{
					type: "swiperList",
					data: [{
							imgUrl: "../../static/img/swiper1.jpg"
						},
						{
							imgUrl: "../../static/img/swiper2.jpg"
						},
						{
							imgUrl: "../../static/img/swiper3.jpg"
						}
					]
				},
				{
					type: "recommendList",
					data: [{
							bigImg: "../../static/img/Children.jpg",
							data: [{
									imgUrl: "../../static/img/Children1.jpg"
								},
								{
									imgUrl: "../../static/img/Children2.jpg"
								},
								{
									imgUrl: "../../static/img/Children3.jpg"
								}

							]
						},
						{
							bigImg: "../../static/img/Furnishing.jpg",
							data: [{
									imgUrl: "../../static/img/Furnishing1.jpg"
								},
								{
									imgUrl: "../../static/img/Furnishing2.jpg"
								},
								{
									imgUrl: "../../static/img/Furnishing3.jpg"
								},

							]
						}
					]
				},
				{
					type: "commodityList",
					data: [{
							id: 1,
							imageSrc: "../../static/img/commodity1.jpg",
							commodityName: "新款毛衣,材质来自意大利脱落州",
							pprice: "255",
							oprice: "355",
							discount: "2.5"
						},
						{
							id: 2,
							imageSrc: "../../static/img/commodity2.jpg",
							commodityName: "新款毛衣，材质来自意大利脱落州，穿上它，非一般的感觉，只要255，现价只要255，错过一次,再等一年",
							pprice: "255",
							oprice: "355",
							discount: "2.5"
						},
						{
							id: 3,
							imageSrc: "../../static/img/commodity3.jpg",
							commodityName: "新款毛衣，材质来自意大利脱落州，穿上它，非一般的感觉，只要255，现价只要255，错过一次,再等一年",
							pprice: "255",
							oprice: "355",
							discount: "2.5"
						},
						{
							id: 4,
							imageSrc: "../../static/img/commodity4.jpg",
							commodityName: "新款毛衣，材质来自意大利脱落州，穿上它，非一般的感觉，只要255，现价只要255，错过一次,再等一年",
							pprice: "255",
							oprice: "355",
							discount: "2.5"
						}
					]
				},
			]
		}




	})
});
//获取首页的运动户外的数据
router.get('/api/index_list/2/data/1', function(req, res, next) {
	res.json({
		code: 0,
		data: [{
				type: "bannerList",
				imgUrl: "../../static/img/banner1.jpg"
			},
			{
				type: "iconsList",
				data: [{
						imgurl: "../../static/img/icons1.png",
						name: "服饰内衣"
					},
					{
						imgurl: "../../static/img/icons2.png",
						name: "潮流跑鞋"
					},
					{
						imgurl: "../../static/img/icons3.png",
						name: "潮流跑鞋"
					},
					{
						imgurl: "../../static/img/icons4.png",
						name: "潮流跑鞋"
					},
					{
						imgurl: "../../static/img/icons5.png",
						name: "潮流跑鞋"
					},
					{
						imgurl: "../../static/img/icons6.png",
						name: "潮流跑鞋"
					},
					{
						imgurl: "../../static/img/icons7.png",
						name: "潮流跑鞋"
					},
					{
						imgurl: "../../static/img/icons8.png",
						name: "潮流跑鞋"
					}
				]
			},
			{
				type: "hotList",
				data: [{
						id: 1,
						imageSrc: "../../static/img/hot1.jpg",
						commodityName: "新款毛衣,材质来自意大利xxx州",
						pprice: "255",
						oprice: "355",
						discount: "2.5"
					},
					{
						id: 2,
						imageSrc: "../../static/img/hot2.jpg",
						commodityName: "新款毛衣，材质来自意大利xxx州，穿上它，非一般的感觉，只要255，现价只要255，错过一次,再等一年",
						pprice: "255",
						oprice: "355",
						discount: "2.5"
					},
					{
						id: 3,
						imageSrc: "../../static/img/hot3.jpg",
						commodityName: "新款毛衣，材质来自意大利xxx州，穿上它，非一般的感觉，只要255，现价只要255，错过一次,再等一年",
						pprice: "255",
						oprice: "355",
						discount: "2.5"
					}
				]
			},
			{
				type: "shopList",
				data: [{
					imgurl: "../../static/img/shop.jpg",
					data: [{
							id: 1,
							imageSrc: "../../static/img/shop1.jpg",
							commodityName: "新款毛衣,材质来自意大利xxx州",
							pprice: "255",
							oprice: "355",
							discount: "2.5"
						},
						{
							id: 2,
							imageSrc: "../../static/img/shop2.jpg",
							commodityName: "新款毛衣，材质来自意大利xxx州，穿上它，非一般的感觉，只要255，现价只要255，错过一次,再等一年",
							pprice: "255",
							oprice: "355",
							discount: "2.5"
						},
						{
							id: 3,
							imageSrc: "../../static/img/shop3.jpg",
							commodityName: "新款毛衣，材质来自意大利xxx州，穿上它，非一般的感觉，只要255，现价只要255，错过一次,再等一年",
							pprice: "255",
							oprice: "355",
							discount: "2.5"
						},
						{
							id: 4,
							imageSrc: "../../static/img/shop4.jpg",
							commodityName: "新款毛衣，材质来自意大利xxx州，穿上它，非一般的感觉，只要255，现价只要255，错过一次,再等一年",
							pprice: "255",
							oprice: "355",
							discount: "2.5"
						},
						{
							id: 5,
							imageSrc: "../../static/img/shop1.jpg",
							commodityName: "新款毛衣,材质来自意大利xxx州",
							pprice: "255",
							oprice: "355",
							discount: "2.5"
						},
						{
							id: 6,
							imageSrc: "../../static/img/shop2.jpg",
							commodityName: "新款毛衣，材质来自意大利xxx州，穿上它，非一般的感觉，只要255，现价只要255，错过一次,再等一年",
							pprice: "255",
							oprice: "355",
							discount: "2.5"
						},
						{
							id: 7,
							imageSrc: "../../static/img/shop3.jpg",
							commodityName: "新款毛衣，材质来自意大利xxx州，穿上它，非一般的感觉，只要255，现价只要255，错过一次,再等一年",
							pprice: "255",
							oprice: "355",
							discount: "2.5"
						},
						{
							id: 8,
							imageSrc: "../../static/img/shop4.jpg",
							commodityName: "新款毛衣，材质来自意大利xxx州，穿上它，非一般的感觉，只要255，现价只要255，错过一次,再等一年",
							pprice: "255",
							oprice: "355",
							discount: "2.5"
						}
					]
				}]


			},
			{
				type: "commodityList",
				data: [{
						"id": 1,
						"imageSrc": "../../static/img/commodity1.jpg",
						"commodityName": "新款毛衣,材质来自意大利脱落州",
						"pprice": "255",
						"oprice": "355",
						"discount": "2.5"
					},
					{
						"id": 2,
						"imageSrc": "../../static/img/commodity2.jpg",
						"commodityName": "新款毛衣,材质来自意大利脱落州",
						"pprice": "255",
						"oprice": "355",
						"discount": "2.5"
					},
					{
						"id": 3,
						"imageSrc": "../../static/img/commodity3.jpg",
						"commodityName": "新款毛衣,材质来自意大利脱落州",
						"pprice": "255",
						"oprice": "355",
						"discount": "2.5"
					},
					{
						"id": 4,
						"imageSrc": "../../static/img/commodity4.jpg",
						"commodityName": "新款毛衣,材质来自意大利脱落州",
						"pprice": "255",
						"oprice": "355",
						"discount": "2.5"
					}
				]
			}
		]

	})
})
//获得运动户外加载更多的数据，第一次上拉，
router.get('/api/index_list/2/data/2', function(req, res, next) {
	res.json({
		code: 0,
		data: [{
			type: "commodityList",
			data: [{
					"id": 1,
					"imageSrc": "../../static/img/commodity1.jpg",
					"commodityName": "新款毛衣,材质来自意大利脱落州",
					"pprice": "255",
					"oprice": "355",
					"discount": "2.5"
				},
				{
					"id": 2,
					"imageSrc": "../../static/img/commodity2.jpg",
					"commodityName": "新款毛衣,材质来自意大利脱落州",
					"pprice": "255",
					"oprice": "355",
					"discount": "2.5"
				},
				{
					"id": 3,
					"imageSrc": "../../static/img/commodity3.jpg",
					"commodityName": "新款毛衣,材质来自意大利脱落州",
					"pprice": "255",
					"oprice": "355",
					"discount": "2.5"
				},
				{
					"id": 4,
					"imageSrc": "../../static/img/commodity4.jpg",
					"commodityName": "新款毛衣,材质来自意大利脱落州",
					"pprice": "255",
					"oprice": "355",
					"discount": "2.5"
				}
			]
		}]
	})
})
//第二次下拉加载更多
router.get('/api/index_list/2/data/3', function(req, res, next) {
	res.json({
		code: "0",
		data: [{
			type: "commodityList",
			data: [{
					"id": 1,
					"imageSrc": "../../static/img/commodity1.jpg",
					"commodityName": "新款毛衣,材质来自意大利脱落州",
					"pprice": "255",
					"oprice": "355",
					"discount": "2.5"
				},
				{
					"id": 2,
					"imageSrc": "../../static/img/commodity2.jpg",
					"commodityName": "新款毛衣,材质来自意大利脱落州",
					"pprice": "255",
					"oprice": "355",
					"discount": "2.5"
				},
				{
					"id": 3,
					"imageSrc": "../../static/img/commodity3.jpg",
					"commodityName": "新款毛衣,材质来自意大利脱落州",
					"pprice": "255",
					"oprice": "355",
					"discount": "2.5"
				},
				{
					"id": 4,
					"imageSrc": "../../static/img/commodity4.jpg",
					"commodityName": "新款毛衣,材质来自意大利脱落州",
					"pprice": "255",
					"oprice": "355",
					"discount": "2.5"
				}
			]
		}]
	})
})
router.get('/api/index_list/1/data/2', function(req, res, next) {
	res.json({
		code: "0",
		data: [{
			type: "commodityList",
			data: [{
					"id": 1,
					"imageSrc": "../../static/img/commodity1.jpg",
					"commodityName": "新款毛衣,材质来自意大利脱落州",
					"pprice": "255",
					"oprice": "355",
					"discount": "2.5"
				},
				{
					"id": 2,
					"imageSrc": "../../static/img/commodity2.jpg",
					"commodityName": "新款毛衣,材质来自意大利脱落州",
					"pprice": "255",
					"oprice": "355",
					"discount": "2.5"
				},
				{
					"id": 3,
					"imageSrc": "../../static/img/commodity3.jpg",
					"commodityName": "新款毛衣,材质来自意大利脱落州",
					"pprice": "255",
					"oprice": "355",
					"discount": "2.5"
				},
				{
					"id": 4,
					"imageSrc": "../../static/img/commodity4.jpg",
					"commodityName": "新款毛衣,材质来自意大利脱落州",
					"pprice": "255",
					"oprice": "355",
					"discount": "2.5"
				}
			]
		}]
	})
})
//获取服饰内衣的数据
//第二个参数是服饰内衣的数据，根据id，服饰内衣的id是3，我们这样设计
router.get('/api/index_list/3/data/1', function(req, res, next) {
	res.json({
		code: "0",
		data: [{
				type: "bannerList",
				imgUrl: "../../static/img/banner1.jpg"
			},
			{
				type: "iconsList",
				data: [{
						imgurl: "../../static/img/icons1.png",
						name: "服饰内衣"
					},
					{
						imgurl: "../../static/img/icons2.png",
						name: "服饰内衣"
					},
					{
						imgurl: "../../static/img/icons3.png",
						name: "服饰内衣"
					},
					{
						imgurl: "../../static/img/icons4.png",
						name: "服饰内衣"
					},
					{
						imgurl: "../../static/img/icons5.png",
						name: "服饰内衣"
					},
					{
						imgurl: "../../static/img/icons6.png",
						name: "服饰内衣"
					},
					{
						imgurl: "../../static/img/icons7.png",
						name: "服饰内衣"
					},
					{
						imgurl: "../../static/img/icons8.png",
						name: "服饰内衣"
					}
				]
			},
			{
				type: "hotList",
				data: [{
						id: 1,
						imageSrc: "../../static/img/hot1.jpg",
						commodityName: "新款毛衣,材质来自意大利xxx州",
						pprice: "255",
						oprice: "355",
						discount: "2.5"
					},
					{
						id: 2,
						imageSrc: "../../static/img/hot2.jpg",
						commodityName: "新款毛衣，材质来自意大利xxx州，穿上它，非一般的感觉，只要255，现价只要255，错过一次,再等一年",
						pprice: "255",
						oprice: "355",
						discount: "2.5"
					},
					{
						id: 3,
						imageSrc: "../../static/img/hot3.jpg",
						commodityName: "新款毛衣，材质来自意大利xxx州，穿上它，非一般的感觉，只要255，现价只要255，错过一次,再等一年",
						pprice: "255",
						oprice: "355",
						discount: "2.5"
					}
				]
			},
			{
				type: "shopList",
				data: [{
					imgurl: "../../static/img/shop.jpg",
					data: [{
							id: 1,
							imageSrc: "../../static/img/shop1.jpg",
							commodityName: "新款毛衣,材质来自意大利xxx州",
							pprice: "255",
							oprice: "355",
							discount: "2.5"
						},
						{
							id: 2,
							imageSrc: "../../static/img/shop2.jpg",
							commodityName: "新款毛衣，材质来自意大利xxx州，穿上它，非一般的感觉，只要255，现价只要255，错过一次,再等一年",
							pprice: "255",
							oprice: "355",
							discount: "2.5"
						},
						{
							id: 3,
							imageSrc: "../../static/img/shop3.jpg",
							commodityName: "新款毛衣，材质来自意大利xxx州，穿上它，非一般的感觉，只要255，现价只要255，错过一次,再等一年",
							pprice: "255",
							oprice: "355",
							discount: "2.5"
						},
						{
							id: 4,
							imageSrc: "../../static/img/shop4.jpg",
							commodityName: "新款毛衣，材质来自意大利xxx州，穿上它，非一般的感觉，只要255，现价只要255，错过一次,再等一年",
							pprice: "255",
							oprice: "355",
							discount: "2.5"
						},
						{
							id: 5,
							imageSrc: "../../static/img/shop1.jpg",
							commodityName: "新款毛衣,材质来自意大利xxx州",
							pprice: "255",
							oprice: "355",
							discount: "2.5"
						},
						{
							id: 6,
							imageSrc: "../../static/img/shop2.jpg",
							commodityName: "新款毛衣，材质来自意大利xxx州，穿上它，非一般的感觉，只要255，现价只要255，错过一次,再等一年",
							pprice: "255",
							oprice: "355",
							discount: "2.5"
						},
						{
							id: 7,
							imageSrc: "../../static/img/shop3.jpg",
							commodityName: "新款毛衣，材质来自意大利xxx州，穿上它，非一般的感觉，只要255，现价只要255，错过一次,再等一年",
							pprice: "255",
							oprice: "355",
							discount: "2.5"
						},
						{
							id: 8,
							imageSrc: "../../static/img/shop4.jpg",
							commodityName: "新款毛衣，材质来自意大利xxx州，穿上它，非一般的感觉，只要255，现价只要255，错过一次,再等一年",
							pprice: "255",
							oprice: "355",
							discount: "2.5"
						}
					]
				}]


			},
			{
				type: "commodityList",
				data: [{
						"id": 1,
						"imageSrc": "../../static/img/commodity1.jpg",
						"commodityName": "新款毛衣,材质来自意大利脱落州",
						"pprice": "255",
						"oprice": "355",
						"discount": "2.5"
					},
					{
						"id": 2,
						"imageSrc": "../../static/img/commodity2.jpg",
						"commodityName": "新款毛衣,材质来自意大利脱落州",
						"pprice": "255",
						"oprice": "355",
						"discount": "2.5"
					},
					{
						"id": 3,
						"imageSrc": "../../static/img/commodity3.jpg",
						"commodityName": "新款毛衣,材质来自意大利脱落州",
						"pprice": "255",
						"oprice": "355",
						"discount": "2.5"
					},
					{
						"id": 4,
						"imageSrc": "../../static/img/commodity4.jpg",
						"commodityName": "新款毛衣,材质来自意大利脱落州",
						"pprice": "255",
						"oprice": "355",
						"discount": "2.5"
					}
				]
			}
		]

	})
})
//获取服饰内衣上拉第二次的数据
router.get('/api/index_list/3/data/2', function(req, res, next) {
	res.json({
		code: 0,
		data: [{
			type: "commodityList",
			data: [{
					"id": 1,
					"imageSrc": "../../static/img/commodity1.jpg",
					"commodityName": "新款毛衣,材质来自意大利脱落州",
					"pprice": "255",
					"oprice": "355",
					"discount": "2.5"
				},
				{
					"id": 2,
					"imageSrc": "../../static/img/commodity2.jpg",
					"commodityName": "新款毛衣,材质来自意大利脱落州",
					"pprice": "255",
					"oprice": "355",
					"discount": "2.5"
				},
				{
					"id": 3,
					"imageSrc": "../../static/img/commodity3.jpg",
					"commodityName": "新款毛衣,材质来自意大利脱落州",
					"pprice": "255",
					"oprice": "355",
					"discount": "2.5"
				},
				{
					"id": 4,
					"imageSrc": "../../static/img/commodity4.jpg",
					"commodityName": "新款毛衣,材质来自意大利脱落州",
					"pprice": "255",
					"oprice": "355",
					"discount": "2.5"
				}
			]
		}]
	})
})
module.exports = router;
