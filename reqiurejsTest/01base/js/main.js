/**
 * Created by PVer on 2017/12/20.
 */
/*
*
* 方法一
* 未缩减路径
*
* */
/*//先定义加载文件路径变量
require(["c","b","a"],function(c,b,a){
    console.log("加载成功");
})
//给路径变量赋值
require.config({
    paths:{
        "a":'js/fileUploader/jquery.fileupload',
        "b":'js/fileUploader/jquery.fileupload-fp',
        "c":'js/fileUploader/jquery.fileupload-ui'
    }
});*/


/*
*
* 方法二
* 使用baseUrl缩减路径
*
* */
require.config({
    baseUrl:"js/fileUploader",
    paths:{
        "a":'jquery.fileupload',
        "b":'jquery.fileupload-fp',
        "c":'jquery.fileupload-ui'
    }
});

require(["a","b","b"],function(a,b,c){
    console.log("加载成功");
})

require.config({
    baseUrl:"js/fileUploader",
    paths:{
        "d":'jquery.locale'
    }
});

require(["d"],function(d){

})





