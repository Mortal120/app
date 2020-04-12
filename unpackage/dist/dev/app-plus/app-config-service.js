
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/list/list","pages/shopcar/shopcar","pages/my/my","pages/search/search","pages/search-list/search-list","pages/details/details","pages/config/config","pages/my-path-list/my-path-list","pages/my-add-path/my-add-path","pages/my-order-list/my-order-list","pages/confirm-order/confirm-order","pages/payment/payment","pages/payment-success/payment-success","pages/login/login","pages/telLogin/telLogin","pages/login-code/login-code"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"app","compilerVersion":"2.6.5","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true},"window":{"navigationBarTitleText":"爺的黑店","navigationBarBackgroundColor":"#FFFFFF","scrollIndicator":"none","titleNView":{"buttons":[{"float":"left","fontSrc":"./static/iconfont.ttf","text":""},{"float":"right","fontSrc":"./static/iconfont.ttf","text":""}]}}},{"path":"/pages/list/list","meta":{},"window":{"navigationBarBackgroundColor":"#FFFFFF","scrollIndicator":"none","titleNView":{"searchInput":{"autoFocus":false,"placeholder":"请输入关键字","backgroundColor":"#F7F7F7","placeholderColor":"#B3B3B3","align":"left","borderRadius":"15px","disabled":true}}}},{"path":"/pages/shopcar/shopcar","meta":{},"window":{"titleNView":false,"scrollIndicator":"none"}},{"path":"/pages/my/my","meta":{},"window":{"titleNView":false,"scrollIndicator":"none"}},{"path":"/pages/search/search","meta":{},"window":{"navigationBarBackgroundColor":"#FFFFFF","scrollIndicator":"none","titleNView":{"searchInput":{"autoFocus":true,"placeholder":"请输入要搜索的内容","backgroundColor":"#F7F7F7","placeholderColor":"#B3B3B3","align":"left","borderRadius":"15px"},"buttons":[{"float":"right","text":"搜索","fontSize":"16px","width":"60px","color":"#636263"}]}}},{"path":"/pages/search-list/search-list","meta":{},"window":{"navigationBarBackgroundColor":"#FFFFFF","scrollIndicator":"none","titleNView":{"searchInput":{"placeholder":"请输入要搜索的内容","backgroundColor":"#F7F7F7","placeholderColor":"#B3B3B3","align":"left","borderRadius":"15px","disabled":true},"buttons":[{"float":"right","text":"筛选","fontSize":"16px","width":"60px","color":"#636263"}]}}},{"path":"/pages/details/details","meta":{},"window":{"scrollIndicator":"none","navigationBarTitleText":"商品详情","titleNView":{"type":"transparent","buttons":[{"type":"menu"},{"type":"share"}]}}},{"path":"/pages/config/config","meta":{},"window":{"navigationBarTitleText":"设置"}},{"path":"/pages/my-path-list/my-path-list","meta":{},"window":{"navigationBarTitleText":"地址管理"}},{"path":"/pages/my-add-path/my-add-path","meta":{},"window":{"navigationBarTitleText":"添加地址","titleNView":{"buttons":[{"float":"right","text":"保存","fontSize":"30rpx"}]}}},{"path":"/pages/my-order-list/my-order-list","meta":{},"window":{"navigationBarTitleText":"我的订单"}},{"path":"/pages/confirm-order/confirm-order","meta":{},"window":{"navigationBarTitleText":"确认订单"}},{"path":"/pages/payment/payment","meta":{},"window":{"titleNView":false,"scrollIndicator":"none"}},{"path":"/pages/payment-success/payment-success","meta":{},"window":{"navigationBarTitleText":"支付成功"}},{"path":"/pages/login/login","meta":{},"window":{"titleNView":false,"scrollIndicator":"none"}},{"path":"/pages/telLogin/telLogin","meta":{},"window":{"navigationBarTitleText":"输入手机号"}},{"path":"/pages/login-code/login-code","meta":{},"window":{"navigationBarTitleText":"验证码"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,window:void 0}}}});