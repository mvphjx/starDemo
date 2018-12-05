var EchartTPComponent = function () {
    /**
     * 构造器
     * @param setting{$parent:父容器,timeInterval}
     * @constructor
     */
    var EchartTPComponentClass = function (setting) {
        this.config = setting;
        init.call(this);
    };
    EchartTPComponentClass.prototype = {//这里定义 暴露给外界调用的 接口/方法
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
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {top:30},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis:  {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: ['单位1'],
            axisLabel:{interval :0}
        },
        series: []
    };
    return EchartTPComponentClass;

    function init() {
        this.myChart = echarts.init(this.config.$parent.find("#chart")[0], 'hisign');
        //开启定时切换
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
        return tpdata;
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
            var series = [];
            var yAxisData = [];
            var maxLength;
            $.each(unitModels, function (index, unitModel) {//遍历单位数组
                yAxisData.push(unitModel.unitName);
                var countModels = unitModel.data;
                $.each(countModels, function (index, countModel) {//遍历 统计指标数组
                    var serie = series[index];
                    if(!serie){
                        serie = {
                            name: countModel.name, type: 'bar', itemStyle: {
                                normal: {
                                    color: function (params) {
                                        return getColor(params,maxLength)
                                    }
                                }
                            }, data: []
                        };
                        series.push(serie);
                    }
                    var serieData = serie.data;
                    serieData.push(countModel.count);
                })
            });
            fixSort(series,yAxisData);
            thisOption.series = series;
            thisOption.yAxis.data = yAxisData;
            maxLength = yAxisData.length;
        });
        return thisOption;
    }

    /**
     * 根据排名获取颜色
     * @param params
     * @param maxLength
     * @returns {string}
     */
    function getColor(params,maxLength){
        var index = params.dataIndex;
        if(index==maxLength-1){
            return '#ff9900'
        }else if(index==maxLength-2){
            return '#33cc99'
        }else{
            return '#3399ff'
        }
    }
    /**
     * Y类目分组的时候 排序修复
     * @param series
     * @param yAxisData
     */
    function fixSort(series,yAxisData){
        $.each(series,function (index,serie) {
            serie.data = serie.data.reverse();
        });
        yAxisData = yAxisData.reverse();
    }
}();
var echartTPComponent = new EchartTPComponent({"$parent": $("#tpmain"),timeInterval:timeInterval});
echartTPComponent.setType(DateType.day);
echartTPComponent.switchAuto(true);