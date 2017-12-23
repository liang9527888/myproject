/**
 * Created by PVer on 2017/12/20.
 */
//文件配置
require.config({
    paths:{
        "jquery":"../lib/jquery.min",
        "npm":"../lib/npm",
        "bootstrap":"../lib/bootstrap.min",
        "require":"../lib/require"
    }
   /* shim:{
        "bootstrap":{
            "exports":"_"
        }
    }*/
})

//引入依赖
require(['jquery','bootstrap','npm'],function(jquery,bootstrap,npm){
    /*var mod3 = require("jquery");
    var mod1 = require("bootstrap");
    var mod2 = require("npm");*/
})