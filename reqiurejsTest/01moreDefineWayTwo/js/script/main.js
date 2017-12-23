/**
 * Created by PVer on 2017/12/20.
 */
//配置路径
require.config({
    paths:{
        "jquery":"../lib/jquery.min",
        "npm":"../lib/npm",
        "bootstrap":"../lib/bootstrap.min"
    }
})

//引入依赖(错误写法)
/*
define(["require"],function(require){
    var mod1 = require("jquery");
    var mod2 = require("npm");
    var mod3 = require("bootstrap");
    var mod4 = require("require");
    $("#messagebox").html(mod1.name);
})

//引入依赖(真确写法)
/*define(["require","jquery","npm","bootstrap"],function(require){
    var mod1 = require("jquery");
    var mod2 = require("npm");
    var mod3 = require("bootstrap");
    $("#boxMsg").html("success");
})*/
