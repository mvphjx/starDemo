var star= (function(){
    //默认参数
    var defaults={
        //选择半颗或整颗模式
        mode:"lightStar",
        //默认点亮数
        num:0,
        //是否允许修改
        readyOnly:false,
        //鼠标移到每颗星星上执行的方法
        select:function(){},
        //选择评分后执行的方法
        choose:function(){}
    };

    //继承,因为只需要继承原型链上的方法，不需要继承属性，
    //可以通过定义一个空构造函数的方式可以对程序进行优化
    var extend= function (subClass,superClass) {
        var F=function(){};
        F.prototype=superClass.prototype;
        subClass.prototype=new F();
        subClass.prototype.constructor=subClass;
    };


    //初始化
    var init=function(el,options){
        //使用jquery方法替换默认参数
        options=$.extend({},defaults,options);
        //判断使用的模式时半颗还是整颗
        if(options.mode==="lightStar"){
            new lightStar(el,options).init();
        }else if(options.mode==="lightStarHalf"){
            new lightStarHalf(el,options).init();
        }else{
            console.log("您输入的模式名称有误，已使用默认的整颗模式");
            new lightStar(el,options).init();
        }
    };


    //将两个子类方法抽象
    var light=function(el,options){
        this.ul=$(el);
        this.li=this.ul.find(".item");
        this.opts=options;
        //定义需要展示的星星为半颗还是整颗
        this.add=1;
        //半颗和整颗执行的鼠标事件不同，子类中定义方法名称
        this.selectEvent="";
    };
    //将方法绑定到原型链上
    light.prototype.init=function(){
        //点亮星星
        this.lightOn(this.opts.num);
        //绑定事件
        if(!this.readyOnly){
            this.bindEvent();
        }
    };
    light.prototype.lightOn=function(num){
        this.li.each(function(index){
            if(index<num){
                $(this).css("background-position","0 -32px");
            }else{
                $(this).css("background-position","0 0");
            }
        });
    };
    light.prototype.bindEvent=function(){
        //保存当前this,当前this指向lightStar对象，以区分事件绑定函数中的this
        var $this=this;
        var $length=$this.li.length;
        $this.ul.on($this.selectEvent,".item",function(e){
            //根据模式的不同，判断$this.add的值
            var $num=0;
            $this.selectStar(e,$(this));
            $num=$(this).index()+$this.add;

            $this.lightOn($num);

            //判断配置参数中的select是否为一个方法，防止用户传入名称为select的参数不是一个方法,call方法将this改变为当前事件的this
            (typeof $this.opts.select ==="function") && $this.opts.select.call(this,$num,$length);

            //使用自定义事件时
            //$this.ul.trigger("select",[$num,$length]);

        }).on("click",".item",function(){
            //click事件一定是在鼠标移入事件之后才可能执行，所以之前已经修改过$this.add的值，不需要再次修改，可以直接使用
            var $num=$(this).index()+$this.add;
            $this.opts.num=$num;
            (typeof $this.opts.choose ==="function") && $this.opts.choose.call(this,$num,$length);

            //使用自定义事件时
            //$this.ul.trigger("choose",[$num,$length]);

        }).on("mouseout",function(){
            //鼠标移除时根据选择评分的值执行评分方法
            $this.lightOn($this.opts.num);
        });
    };
    light.prototype.selectStar=function(){
        throw new Error("子类必须重写此方法");
    };


    //点亮整颗星星
    var lightStar=function(el,options){
        //继承父类中的配置参数
        light.call(this,el,options);
        this.selectEvent="mouseover";
    };
    //将方法绑定到原型链上
    //继承父类方法
    extend(lightStar,light);
    lightStar.prototype.lightOn=function(num){
        num=parseInt(num);
        //调用父类的lightOn方法，绑定到lightStar的this上
        light.prototype.lightOn.call(this,num);
    };
    lightStar.prototype.selectStar=function(){
        //模式为整颗时，此方法可以为空，但必须定义
        this.add=1;
    };

    //点亮半颗星星
    var lightStarHalf=function(el,options){
        //继承父类中的配置参数
        light.call(this,el,options);
        this.selectEvent="mousemove";
    };
    //将方法绑定到原型链上
    //继承父类方法
    extend(lightStarHalf,light);
    lightStarHalf.prototype.lightOn=function(num){
        //判断是否为半颗
        var cur=parseInt(num);
        var isHalf=cur!==num;
        //调用父类的lightOn方法，绑定到lightStar的this上
        light.prototype.lightOn.call(this,cur);
        if(isHalf){
            this.li.eq(cur).css("background-position","0 -64px");
        }
    };
    lightStarHalf.prototype.selectStar=function(e,$this){
        //根据鼠标的位置与元素位置进行对比，判断鼠标是否位于元素的左半边，左半边是将
        if(e.pageX-$this.offset().left<$this.width()/2){
            this.add=0.5;
        }else{
            this.add=1;
        }
    };


    //改造为jquery插件
    $.fn.extend({
        star:function(options){
            return this.each(function(){
                init(this,options);
            })
        }
    });

    //返回方法绑定到star插件上
    return {
        init:init
    }

})();

star.init("#a",{
    mode:"lightStarHalf",
    num:3.5,
    select:function(num,all){
        //console.log(this,num+"/"+all);
    },
    choose:function(){
        //选择评分后移除事件，不再能够进行评分操作
        $(this).parent().off();
    }
});
$("#b").star({
    num:3,
    select:function(num,all){
        //console.log(this,num+"/"+all);
    },
    choose:function(){
        //选择评分后移除事件，不再能够进行评分操作
        $(this).parent().off();
    }
});
//定义自定义事件
/*
$("#a").on("select",function(e,num,all){
    console.log(num+"/"+all);
}).on("choose",function(e,num,all){
    console.log(num+"/"+all);
});*/
