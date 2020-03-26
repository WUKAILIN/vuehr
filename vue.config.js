let proxyObj={};
/*
  代理对象代理至后端配置
    ws:是否开启websocket
    target:代理至后端项目地址
    changeOrigin:表示是否跨域
    pathRewrite:target访问地址替换(此处不替换)
 */
proxyObj['/']={
    ws:false,
    target: 'http://localhost:8081',
    changeOrigin: true,
    pathRewrite:{
        '^/':''
    }
}
/*
   前端导入配置
   host:配置导入ip地址
   port:配置导入端口
   proxy:配置前端访问代理兑现通过
 */
module.exports={
    devServer:{
        host:'localhost',
        port:8080,
        proxy:proxyObj
    }
}


