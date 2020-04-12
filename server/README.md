###项目启动
请使用hubuidx 打开项目根目录
###后台启动
打开app根目录下的server文件夹，cmd，指向npm run start
####因为是本地启动，需要更改相应的ip地址
打开app->comment->api->request.js->baseUrl 改为本机地址（本地地址：使用ipconfig 即可查看）
###数据库层面
数据库只涉及了商品详情，查询价格，用户的登录操作 默认用户zhangsan，密码1234567
数据表我放在了server->mydb文件夹下，可以使用phpstudy 导入