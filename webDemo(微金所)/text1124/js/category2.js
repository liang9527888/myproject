/**
 * Created by Administrator on 2016/11/24.
 */
window.onload=function(){
    leftSwipe();
}

function leftSwipe(){
    /*1.获取需要进行滑动的元素--ul*/
    var left=document.querySelector(".jd_cLeft");
    var leftHeight=left.offsetHeight;
    var ulBox=left.querySelector("ul");
    var ulBoxHeight=ulBox.offsetHeight;

    /*静止状态下最大的Y坐标值*/
    var maxPosition=0;
    /*静止状态下最小的Y坐标值*/
    var minPosition=leftHeight-ulBoxHeight;
    /*弹簧状态下最小的Y坐标值*/
    var minBounce=minPosition-100;
    /*弹簧状态下最大的Y坐标值*/
    var maxBounce=maxPosition+100;

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
        /*判断在当前位置的基础之上进行的滑动距离有没有超出指定的范围*/
        if(currentY+distanceY > maxBounce || currentY+distanceY < minBounce){
            return;
        }
        /*关闭过渡*/
        closeTransition();
        /*设置偏移*/
        setTransform(currentY+distanceY);
    });
    /*2.4触摸结束*/
    ulBox.addEventListener("touchend",function(e){
        if(currentY+distanceY < minPosition){
            currentY=minPosition;
            /*开启过渡*/
            openTransition();
            /*设置偏移*/
            setTransform(minPosition);
        }
        else if(currentY+distanceY > maxPosition){
            currentY=maxPosition;
            /*开启过渡*/
            openTransition();
            /*设置偏移*/
            setTransform(maxPosition);
        }
        else{
            /*记录本次移动的距离，让下次移动的时候基于这个距离再进行移动*/
            currentY+=distanceY;
        }
    });


    /*2.5:绑定点击事件*/
    itcast.tap(ulBox,function(e){
        /*添加索引值*/
        var lis=ulBox.querySelectorAll("li");
        for(var i=0;i<lis.length;i++){
            var li=lis[i];
            /*清除样式*/
            li.classList.remove("active");
            /*设置索引属性*/
            /*li.setAttribute("index",i);*/
            li.index=i;
        }
        /*事件处理对象：e.target*/
        var li= e.target.parentNode;
        /*添加active样式*/
        li.classList.add("active");

        var liHeight=li.offsetHeight;
        /*获取当前被点击的li标签的索引*/
        var index=li.index;

        /*判断当前的偏移值是否超出了设置的最小Y坐标值*/
        if(-index*liHeight < minPosition){
            /*定位在最小Y坐标位置*/
            currentY=minPosition;
            /*开启过渡*/
            openTransition();
            /*设置偏移*/
            setTransform(minPosition);
        }
        else{
            /*重置currentY*/
            currentY=-index*liHeight;
            /*开启过渡*/
            openTransition();
            /*设置偏移*/
            setTransform(-index*liHeight);
        }
    });
}