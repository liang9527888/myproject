/**
 * Created by PVer on 2017/12/20.
 */
//配置路径
require.config({
    paths:{
        "jquery":"../lib/jquery.min",
        "bootstrap":"../lib/bootstrap/js/bootstrap.min",
        "html5shiv":"../lib/html5shiv/html5shiv.min",
        "respond":"../lib/respond/respond.js/respond"
    },
    shim:{
        "bootstrap":['jquery'],
    }
})

//方便查看依赖包写法:
//引入依赖
define(["require","jquery","bootstrap","npm"],function(require){
    var mod1 = require("jquery");
    var mod2 = require("bootstrap");
    var mod3 = require("html5shiv");
    var mod4 = require("respond");
    $("#boxMsg").html("success");
})
