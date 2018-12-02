var EchartLPComponent = function () {
    /**
     * 构造器
     * @param setting{$parent:父容器,timeInterval}
     * @constructor
     */
    var EchartLPComponentClass = function (setting) {
        this.config = setting;
        init.call(this);
    };
    EchartLPComponentClass.prototype = {//这里定义 暴露给外界调用的 接口/方法
        setType:function(type){
            setType.call(this,type);
        },
        /**
         * 开启自动切换
         * @param enbale {boolean}
         */
        switchAuto:function (enbale) {
            var _this = this;
            var $dom = this.config.$parent.find(".time");
            if(enbale){
                if(!this.timeout){
                    this.timeout = setInterval(function(){
                        var $thisDom = $dom.find(".active");
                        var $nextDom = $thisDom.next();
                        if($nextDom.length===0){
                            $nextDom = $thisDom.prevAll().last()
                        }
                        $thisDom.removeClass('active');
                        $nextDom.addClass('active');
                        var type = $nextDom.attr("name");
                        _this.setType(type);
                    }, this.config.timeInterval||10000);
                }
            }else{
                clearInterval(this.timeout);
                this.timeout=null;
            }
        }
    };
    var option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['勘查现场数', '现场指掌纹采集数'],
            top:30
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                data: ""
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '勘查现场数',
                type: 'bar',
                data: [1]
            },
            {
                name: '现场指掌纹采集数',
                type: 'bar',
                data: [2]
            }
        ]
    };
    return EchartLPComponentClass;

    function init() {
        this.myChart = echarts.init(this.config.$parent.find("#chart")[0], 'hisign');
    }
    /**
     * 切换统计类型
     * @param type DateType
     */
    function setType(type){
        if(!type){
            type = DateType.day;
        }
        var statData = getStatData();
        this.myChart.setOption(createOption.call(this, statData,type));
    }

    /**
     * 获取统计数据
     * @returns {{year, month, day}}
     */
    function getStatData(){
        return lpdata;
    }
    /**
     *
     * @param statData  统计数据
     * @param type 显示的统计类型
     */
    function createOption(statData,type) {
        var thisOption = $.extend(true, {}, option);
        $.each(statData, function (key, unitModels) {// 遍历 年月日
            if(type!=key){
                return true;
            }
            var legendData = [];
            var series = [];
            var xAxisData = [];
            $.each(unitModels, function (index, unitModel) {//遍历单位数组
                xAxisData.push(unitModel.unitName);
                var countModels = unitModel.data;
                if (legendData.length === 0) {
                    $.each(countModels, function (index, countModel) {//遍历 统计指标数组
                        legendData.push(countModel.name);
                        series.push({name: countModel.name, type: 'bar', data: []});
                    })
                }
                $.each(countModels, function (index, countModel) {//遍历 统计指标数组
                    var serieData = series[index].data;
                    serieData.push(countModel.count);
                })
            });
            thisOption.legend.data = legendData;
            thisOption.xAxis[0].data = xAxisData;
            thisOption.series = series;
            return false;
        });
        return thisOption;
    }
}();
var echartLPComponent = new EchartLPComponent({"$parent": $("#lpmain"),timeInterval:timeInterval});
echartLPComponent.setType(DateType.day);
echartLPComponent.switchAuto(true);