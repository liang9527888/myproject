/**
 * Created by Administrator on 2016/7/12.
 */
window.itcast={};

//添加函数
itcast.addTransitionEnd=function(dom,callback){
    //传入的对象不为null
    if (dom && typeof dom==="object"){
        dom.addEventListener("webkitTransitionEnd",function(){
            callback && callback();
        });
        dom.addEventListener("transitionEnd",function(){
            callback && callback();
        });
    }
}