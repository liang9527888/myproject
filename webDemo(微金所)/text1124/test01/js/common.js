/**
 * Created by Administrator on 2016/11/22.
 */
/*function addTransition(dom,callback){
    dom.addEventListener("transitionEnd",function(){
        callback();
    });
    dom.addEventListener("webkitTransitionEnd",function(){
        callback();
    });
}*/

var itcast={};

/*添加过渡结束的监听*/
itcast.addTransition=function(dom,callback){
    /*判断是否传入了dom元素*/
    if(dom!=null && typeof dom=="object"){
        dom.addEventListener("transitionEnd",function(){
            /*判断是否传递的回调函数*/
            callback && callback();
        });
        dom.addEventListener("webkitTransitionEnd",function(){
            callback && callback();
        });
    }
}

/*添加tap事件*/
itcast.tap=function(dom,callback){
    if(dom && typeof dom=="object"){
        var isMove=false;/*标记进行过滑动操 作*/
        var st=0;
        dom.addEventListener("touchstart",function(e){
            /*毫秒做为单位*/
            st=Date.now();
        });
        dom.addEventListener("touchmove",function(e){
            isMove=true;
        });
        dom.addEventListener("touchend",function(e){
            /*判断：是否是点击事件：1.不能进行过滑动 2.结束与开始的时间差异在150ms内*/
            if(isMove==false && Date.now()-st <150){
                /*调用回调方法*/
                callback && callback(e);
            }
            isMove=false;
        });
    }
}