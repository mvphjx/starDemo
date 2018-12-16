/**
 *工具栏
 */
var toolBoxObj = {
    id: ".tool_box",
    pref: -1,
    bindClick: function () {
        var _this = this;
        $(".tool_tool li").click(function () {
            var i = parseInt($(this).attr("index"));
            if (_this.pref == i) {
                $(".tool").hide();
                _this.pref = -1
            } else {
                var div = $(".tool").eq(i);
                div.show().siblings().hide();
                _this.pref = i
            }
            //$(".ul_details").hide();
        });
        $(".tool_details5 ul li").click( function(){
             if($(this).hasClass("on")){
                 $(this).removeClass("on");
             }else{
                 $(this).addClass("on");
             }

        });
    },
    clearDraw: function () {
        drawPlugin.clearAll();
        drawlinearrowsPlugin.clearAll();
        measurePlugin.clearAll();
    },
    clearSelect: function () {
        selectPlugin.clearAll();
    },
    show:function () {
        $(".tool_box").show()
    },
    hide:function(){
        $(".tool_box").hide()
    }
}
toolBoxObj.bindClick();