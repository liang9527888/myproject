/**
 * Created by Administrator on 2016/7/16.
 */
$(function(){
    banner();

    $('.carousel').carousel({
        interval: 2000
    })
});
/*ajax数据请求处理*/
function  banner(){
    /*
    1.拿到数据 ajax
    2.判断设备类型    >=768 --非移动设备   <768=移动设备
    3.根据设备解析对应的数据  (读取json   1.字符串拼接   2.模板引擎--underscorejs.template)
    4.渲染到html页面
    5.当屏幕的尺寸发生变化的时候，动态的加载数据  on resize
    * */
    //1.通过ajax获取数据
    var getData=function(callback){
        $.ajax({
            url:"../js/index.json",  /*这个路径是相对于发出请求的页面的路径*/
            type:"get",
            data:{},
            dataType:"json",
            success:function(data){
                callback(data);
            }
        });
    };
    //2.整个渲染过程
    var render=function(){
        //1.获取屏幕尺寸，判断屏幕的类型
        var width=$(window).width();
        //2.标记是否是移动端
        var isMoblie=false;
        //3.判断是否是移动端
        if(width < 768 ){ //是移动端
            isMoblie=true;
        }
        //4.获取数据
        getData(function(data){
            //1.数据已经读取
            //2.读取模板,转换为模板对象
            var templateIndicator= _.template($("#bannerIndicator").html());
            //3.传入数据，生成展示的html代码
            var htmlIndicator=templateIndicator({model:data});
            //4.展示
            $(".carousel-indicators").html(htmlIndicator);

            //操作图片模板
            var templateImgBox= _.template($("#bannerImgBox").html());
            var htmlImgBox=templateImgBox({model:data,isMoblie:isMoblie});
            $(".carousel-inner").html(htmlImgBox);
        });
    }
    //当屏幕大小发生改变的时候，监听,并实时渲染
    $(window).on("resize",function(){
        render();
    }).trigger("resize");

    //使用bootstarp实现轮播图手势滑动操作
    var startX=0;
    var moveX=0;
    var distanceX=0;
    var isMove=false;
    //1,获取需要进行滑动的图片盒子
    $(".carousel-inner").on("touchstart",function(e){
        startX= e.originalEvent.touches[0].clientX;
    });
    $(".carousel-inner").on("touchmove",function(e){
        isMove=true;
        moveX= e.originalEvent.touches[0].clientX;
        distanceX=moveX-startX;
    });
    $(".carousel-inner").on("touchend",function(e){
        /*指定最小滑动的距离*/
        if(Math.abs(distanceX) > 50 && isMove){
            if(distanceX >0){
                /*上一张*/
                $(".carousel").carousel('prev');
            }
            else {
                /*下一张*/
                $(".carousel").carousel('next');
            }
        }
        //重置参数
        isMove=false;
    });
}