/**
 * Created by PVer on 2017/12/20.
 */
//配置文件路径
require.config({
    paths:{
        "jquery":"../lib/jquery.min"
    }
})

//引入依赖
require(['jquery'],function($){
    $(document).on('click',"#contentBtn",function(){
        $('#messagebox').html('You have access Jquery by using require');
    })
})