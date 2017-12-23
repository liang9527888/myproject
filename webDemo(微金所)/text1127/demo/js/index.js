/**
 * Created by Administrator on 2016/11/27.
 */
$(function(){
    var getData = function(callback){
        $.ajax({
            type:"get",
            url:"lunbo.json",
            data:{},
            success:function(result){
               callback(result);
            }
        })
    }

    var banner = document.querySelector(".carousel-inner");

    var isMobile = true;
    //判断是否手机端
    var checkMobile = function(){
        //获取手机端类型
        var deviceWidth = $(window).width();

        if(deviceWidth >= 768){
            isMobile = false;
        }else if(deviceWidth < 768){
            isMobile = true;
        }
        getData(function(result){
            var html = template("lunbo",{"item":result,"isMobile":isMobile});
            $(".carousel-inner").html(html);
        })
    }

    //获取高度
    var getWidth = function(obj){
        //初始化宽度
        var maxWidth = 0;
        for (var i = 0; i < obj.length; i++) {
            maxWidth += $(obj).outerWidth(true);
        }
        $(obj).css({width:maxWidth});
    }
    checkMobile();
    getWidth();
    $(window).on("resize",function(){
        //判断是否从移动端转换为PC端
        var deviceWidth = $(window).width();
        if(isMobile && deviceWidth >= 768 || isMobile == false && deviceWidth < 768){
            checkMobile();
        }
        getWidth();
    })


    var startX = 0;
    var moveX = 0;
    var distenceX = 0;

    var openTransition = function(){
        banner.style.transition = "all .2";
        banner.style.webkitTransition = "all .2";
    }

    var closeTransition = function(){
        banner.style.transition = "none";
        banner.style.webkitTransition = "none";
    }

    var setTransform = function(distence){
        banner.style.transform = "translateX("+distence+"px)";
    }

    banner.addEventListener("touchstart",function(e){
        startX = e.touches[0].clientX;
        console.log(11111);
    });
    banner.addEventListener("touchmove",function(e){
        moveX  = e.touches[0].clientX;
        distenceX = moveX-startX;
        /*closeTransition();
        //设置转化值
        setTransform(distenceX);
        console.log(distenceX);*/
    });
    banner.addEventListener("touchend",function(){
        if(Math.abs(distenceX) > 100){
            if(distenceX > 0){
                $(".carousel").carousel('prev');
            }else{
                $(".carousel").carousel('next');
            }
        }
    });
})