window.onload = function(){
    leftSlide();

    itcast.iScroll({
        swipeDom: document.querySelector(".jd_category_right"),
        swipeType: 'y',
        swipeDistance:100
    });
}

var leftSlide = function(){
    //获取操作对象
    var ul = document.querySelector(".jd_content ul");
    var ulBox = ul.parentNode;
    //1.初始化变量
    var startY = 0;//开始触摸坐标
    var moveY = 0;//移动触摸坐标
    var distenceY = 0;//偏移量
    var currentY = 0;//当前偏移量
    var moveSlide = 0; //滑动距离
    var overArea = ulBox.offsetHeight-ul.offsetHeight;//超出盒子的距离
    var maxArea = 100;//滑动区间
    var minArea = overArea-100;//滑动区间
    var currentIndex = 0;//当前索引
    //2.初始化过渡方法
    var openTransition = function(){
        ul.style.transition = "all .2s";
        ul.style.webkitTransition = "all .2s";
    }

    var closeTransition = function(){
        ul.style.transition = "none";
        ul.style.webkitTransition = "none";
    }

    var setTransfrom = function(distence){
        ul.style.transform = "translateY("+distence+"px)";
    }

    //1.开始触摸事件
    ul.addEventListener("touchstart",function(e){
       startY = e.touches[0].clientY;
    })
    //2.触摸滑动事件
    ul.addEventListener("touchmove",function(e){
        //2.1获取移动坐标
        moveY = e.touches[0].clientY;
        //2.2计算偏移量
        distenceY =moveY-startY;
        //2.3关闭动画
        closeTransition();
        //2.4 设置弹性区间,限制滑动
        moveSlide = distenceY+currentY;
        if(moveSlide > maxArea){
            setTransfrom(maxArea);
        }else if(moveSlide < minArea){
            //设置对象位移
            setTransfrom(minArea);
        }else{
            setTransfrom(moveSlide);
        }
    })
    //3. 触摸结束事件
    ul.addEventListener("touchend",function(e){
        console.log(minArea+"-----:"+moveSlide);
        //3.1设置区间进行回弹
        if(moveSlide > maxArea || (moveSlide <= maxArea && moveSlide > 0)){
            //开启动画
            currentY = 0;
            openTransition();
            setTransfrom(currentY);
        }else if(moveSlide < minArea || (moveSlide >= overArea && moveSlide < minArea)){
            currentY = overArea;
            openTransition();
            setTransfrom(overArea);
        }else{
            console.log(333);
            setTransfrom(moveSlide);
            currentY = moveSlide
        }
    })

    var liHeight = ul.querySelector("li").offsetHeight;
    var lis = ul.children;
    //4.移动端点击事件
    //4.1 调用点击方法
    for (var i = 0; i < lis.length; i++) {
        //4.3添加索引
        lis[i].index = i;
    }
    itcast.tap(ul,function(e){
        //4.2遍历，清楚选中li标签样式并添加索引
        for (var j = 0; j < lis.length; j++) {
            lis[j].classList.remove("active");
        }
        //4.4给当前标签设置样式
        var li = e.target.parentNode;
        li.classList.add("active");
        //4.5获取li标签索引
        currentIndex =li.index;
        //4.6 关闭动画
        closeTransition();
        //4.7 开启动画
        openTransition();
        if((-currentIndex*liHeight >= overArea)){
            //重置当前移动值
            currentY = -currentIndex*liHeight;
            setTransfrom(-currentIndex*liHeight);
        }else{
            //重置当前移动值
            currentY = overArea;
            //移到超出区域
            setTransfrom(overArea);
        }
    })
}