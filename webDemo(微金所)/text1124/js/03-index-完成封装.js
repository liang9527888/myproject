/**
 * Created by Administrator on 2016/11/21.
 */
window.onload=function(){
    headerEffect();

    bannerEffect();
}

/*顶部背景透明效果*/
function  headerEffect(){
    /*1.获取头部*/
    var header=document.querySelector(".jd_header");
    /*2.获取banner*/
    var banner=document.querySelector(".jd_banner");
    var bannerH=banner.offsetHeight;

    /*3，添加屏幕滚动事件*/
    window.onscroll=function(){
        /*4.获取当前页面内容滚出浏览器之外的高度*/
        var windowHeight=document.body.scrollTop;
        /*5设置默认的透明度*/
        var opacity=1;
        /*6.动态的计算实际的透明度*/
        if(windowHeight/bannerH <1){
            opacity=windowHeight/bannerH;
        }
        else{
            opacity=1;
        }
        /*7.设置透明度*/
        header.style.backgroundColor="rgba(233,35,34,"+opacity+")";
    }
}

/*轮播图*/
function bannerEffect(){
    /*让轮播自动滚动*/
    /*1.获取banner*/
    var banner=document.querySelector(".jd_banner");
    /*获取banner的宽度*/
    var bannerW=banner.offsetWidth;
    /*2.获取图片ul*/
    var ulBox=banner.querySelector("ul:first-of-type");
    /*3.获取标记*/
    var indicator=banner.querySelector("ul:last-of-type");
    /*4.获取标记中所有li标签*/
    var lis=indicator.querySelectorAll("li");


    /*设置点样式*/
    var setIndicator=function(index){
        /*清除所有点样式*/
        for(var i=0;i<lis.length;i++){
            lis[i].classList.remove("active");
        }
        /*为当前索引位置的li标签添加样式*/
        lis[index-1].classList.add("active");
    };

    /*声明时钟ID*/
    var timerID;
    /*开启时钟*/
    var startTimer=function(){
        timerID=setInterval(function(){
            /*设置索引*/
            index++;
            /*添加过渡*/
            ulBox.style.transition="all .2s";
            ulBox.style.webkitTransition="all .2s";
            /*设置偏移*/
            ulBox.style.transform="translateX("+(-index*bannerW)+"px)";
            ulBox.style.webkitTransform="translateX("+(-index*bannerW)+"px)";
        },2000);
    }

    /*开启过渡*/
    var openTransition=function(){
        ulBox.style.transition="all .2s";
        ulBox.style.webkitTransition="all .2s";
    }

    /*关闭过渡*/
    var closeTransition=function(){
        ulBox.style.transition="none";
        ulBox.style.webkitTransition="none";
    }

    /*设置偏移*/
    var setTransform=function(distanceX){
        ulBox.style.transform="translateX("+(distanceX)+"px)";
        ulBox.style.webkitTransform="translateX("+(distanceX)+"px)";
    }

    /*定义当前的图片索引:等于 1是因为图片已经有默认的偏移*/
    var index=1;
    /*6.开启定时器，实现自动滚动*/
    startTimer();

    /*添加移动端的滑动事件*/
    var startX=0;//起始x值
    var moveX=0;//移动过程中x值
    var distanceX=0;//差异x值
    /*触摸开始*/
    ulBox.addEventListener("touchstart",function(e){
        /*清除时钟*/
        clearInterval(timerID);
        /*记录起始位置*/
        startX= e.touches[0].clientX;
    });
    /*触摸过程--滑动过程*/
    ulBox.addEventListener("touchmove",function(e){
        /*记录滑动过程中的x值*/
        moveX= e.touches[0].clientX;
        /*计算差异*/
        distanceX=moveX-startX;
        /*滑动事件中不要添加过渡：move事件是频繁触发，过渡会有延迟*/
        closeTransition();
        /*设置偏移:我们一定要在当前ulBox偏移基础之上再进行当前偏移操作*/
        setTransform(-index*bannerW+distanceX);
    });
    /*触摸结束*/
    ulBox.addEventListener("touchend",function(e){
        /*判断当前偏移值是否超出三分之一*/
        if(Math.abs(distanceX) > bannerW/3){
            /*判断是上一张还是上一张*/
            if(distanceX > 0){
                index--;
            }
            else if(distanceX < 0){
                index++;
            }
            /*添加过渡*/
            openTransition();
            /*设置偏移*/
            setTransform(-index*bannerW);
            /*设置点样式*/
        }
        else if(Math.abs(distanceX) >0){
            /*添加过渡*/
            openTransition();
            /*设置偏移*/
            setTransform(-index*bannerW);
        }
        /*重新开启时钟定时器*/
        startTimer();
    });


    /*添加过渡监听的处理*/
    var transitionDeal=function(){
        /*判断索引值：如果是9,就回到1，如果是0，就回到8*/
        /*判断索引，如果到最后一张，就让其瞬间移动到索引1*/
        if(index==9){
            index=1;
            /*清除过渡*/
            closeTransition();
            setTransform(-index*bannerW);
        }
        else if(index==0){
            index=8;
            /*清除过渡*/
            closeTransition();
            /*设置偏移*/
            setTransform(-index*bannerW);
        }
        setIndicator(index);
    }

    /*为ulBox添加过渡结束的监听*/
    itcast.addTransition(ulBox,transitionDeal);
    /*ulBox.addEventListener("transitionEnd",function(){
        transitionDeal();
    });
    ulBox.addEventListener("webkitTransitionEnd",function(){
        transitionDeal();
    });*/
}
