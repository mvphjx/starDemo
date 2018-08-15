;$(function(){
    'use strict';

    let slideBar = $(".slideBar"),   //侧边栏
        mask = $(".mask"),  //遮罩层
        showSlideBar = $(".showSlideBar"), //更多
        backToTop = $(".back-to-top"); //返回顶部
    
    function showBar() {
        mask.fadeIn(); //显示遮罩区
        slideBar.css('right', 0); //修改CSS
    }

    function hideBar() {
        mask.fadeOut(); //隐藏遮罩区
        slideBar.css('right', - slideBar.width()) //修改CSS
    }

    function backTop() {
        $('html,body').animate({
            scrollTop: 0
        },800);  // 800ms返回顶部
    }

    $(window).on('scroll', function () {
        // 如果滚动大于一屏，显示返回顶部，否则隐藏
       if ($(window).scrollTop() > $(window).height())
           backToTop.fadeIn();
       else
           backToTop.fadeOut();
    });
    //模拟页面滚动事件
    $(window).trigger('scroll');

    showSlideBar.on('click', showBar);//点击更多显示slide
    mask.on('click', hideBar);//点击遮罩层隐藏slide
    backToTop.on('click', backTop);//返回顶部事件

});