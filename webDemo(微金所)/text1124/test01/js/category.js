window.onload = function(){
    leftSlide();
}

function leftSlide(){
    //滑动
    //1.设置初始值
    var startY = 0;
    var moveY = 0;
    var distenceY = 0;//偏移值
    var currentY = 0;//当前值
    var index = 0;

    //2.获取操作对象
    var ulBox = document.querySelector(".jd_cLeft");
    var ul = document.querySelector(".jd_cLeft ul");

    //3 静态移动区间
    var maxStaticArea = 0;
    var minStaticArea = ulBox.offsetHeight;

    //4 弹性区间
    var maxArea = 100;
    //5 超出区域
    var overArea = ulBox.offsetHeight-ul.offsetHeight;
    var minArea = overArea-100;

    //2.1 设置操作过渡方法
    var openTransition = function(){
        ul.style.transition = "all .2s";
        ul.style.webkitTransition = "all .2s";
    }
    var closeTransition = function(){
        ul.style.transition = "none";
        ul.style.webkitTransition = "none";
    }
    var setTransform = function(distence){
        ul.style.transform = "translateY("+distence+"px)";
    }

    //2. 触屏开始事件
    ul.addEventListener("touchstart",function(e){
        //2.1获取开始距离
        startY = e.touches[0].clientY;
    });
    //3.监听触屏事件
    ul.addEventListener("touchmove",function(e){
        //3.1获取移动距离
        moveY = e.touches[0].clientY;
        //3.2计算偏移量
        distenceY = moveY-startY;
        //3.3清楚过渡
        closeTransition();
        //设置移动区间
        if(distenceY+currentY > maxArea){//最大值
            var moveSition = maxArea;
        }else if(distenceY+currentY < minArea){//最小值
            var moveSition = minArea;
        }else{
            var moveSition = distenceY+currentY;
        }
        setTransform(moveSition);
    });
    //3.监听触屏结束事件
    ul.addEventListener("touchend",function(e){
        //设置移动区间
        var isCheck = distenceY+currentY;
        if(isCheck > maxArea || (isCheck > 0 && isCheck <= maxArea)){//最大值
            //重置
            currentY = 0;
            openTransition();
            setTransform(currentY);
        }else if(isCheck < minArea || (isCheck < overArea && isCheck >= minArea)){//最小值
            currentY = overArea;
            openTransition();
            setTransform(currentY);
        }else{
            //3.5重置当前偏移值
            currentY = isCheck;
        }
    });

    var li = ul.querySelector("li");
    var lis = ul.querySelectorAll("li");
    //4.遍历设置监听事件

    itcast.tap(ul,function(e){
        for (var i = 0; i < lis.length; i++) {
            //1.设置索引,以便计算偏移量
            lis[i].index = i;
            //2.移除样式
            lis[i].classList.remove("active");
        }
        //3.添加样式
        e.target.parentNode.classList.add("active");
        //4.获取索引
        index =  e.target.parentNode.index;
        //5.设置偏移量
        //5.1 开启过渡
        openTransition();
        //5.2 判断条件
        if(-index*li.offsetHeight < overArea){//最大值
            current = overArea;
            setTransform(overArea);
            console.log(111);
        }else{//最小值
            current = -index*li.offsetHeight;
            setTransform(-index*li.offsetHeight);
        }
    })
}