var User={
	//关于用户的注册，登录，验证码等操作
	//查询用户是否存在
	queryUserName(param){
		//phone应该是一个变量，为了方便，所以后面就用了userName
		return "select * from user where userName='"+param.userName+"' or phone='"+param.userName+"'";
	},
	//验证用户名喝密码
	queryUserPwd(param){
		return "select * from user where (userName='"+param.userName+"' or phone='"+param.userName+"') and userPwd='"+param.userPwd+"'";	
	},
	//增加一条用户数据
	insertData(param){
		const jwt=require("jsonwebtoken")
		let payLoad={name:param.userName}
		let secret="xiaoguo"
		let token=jwt.sign(payLoad,secret)
		return "insert into user (userName,userPwd,phone,imgUrl,nickName,token) values('','clown123','"+param.userName+"','../../static/img/cat.jpg','clown','"+token+"')"
	}
}
exports=module.exports=User