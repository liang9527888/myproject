/**
 * Created by Administrator on 2016/11/24.
 */
window.onload=function(){
    leftSwipe();
}

function leftSwipe(){
    /*1.获取需要进行滑动的元素--ul*/
    var ulBox=document.querySelector(".jd_cLeft > ul ");

    /*添加全局的方法*/
    var openTransition=function(){
        ulBox.style.transition="all .2s";
        ulBox.style.webkitTransition="all .2s";
    }
    var closeTransition=function(){
        ulBox.style.transition="none";
        ulBox.style.webkitTransition="none";
    }
    var setTransform=function(distanceY){
        ulBox.style.transform="translateY("+distanceY+"px)";
        ulBox.style.webkitTransform="translateY("+distanceY+"px)";
    }
    /*2.为ul添加滑动的三个事件*/
    /*2.1:创建一些全局变量*/
    var startY=0;
    var moveY=0;
    var distanceY=0;
    /*创建全局的变量记录当前已经移动的距离*/
    var currentY=0;
    /*2.2开始触摸*/
    ulBox.addEventListener("touchstart",function(e){
        startY= e.touches[0].clientY;
    });
    /*2.3滑动过程*/
    ulBox.addEventListener("touchmove",function(e){
        moveY= e.touches[0].clientY;
        distanceY=moveY-startY;
        /*关闭过渡*/
        closeTransition();
        /*设置偏移*/
        setTransform(currentY+distanceY);
    });
    /*2.4触摸结束*/
    ulBox.addEventListener("touchend",function(e){
        /*记录本次移动的距离，让下次移动的时候基于这个距离再进行移动*/
        currentY+=distanceY;
    });
}