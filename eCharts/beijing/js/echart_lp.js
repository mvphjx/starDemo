var EchartLPComponent = function () {
    /**
     * 构造器
     * @param setting{$parent:父容器}
     * @constructor
     */
    var EchartLPComponentClass = function (setting) {
        this.config = setting;
        init.call(this);
    };
    EchartLPComponentClass.prototype = {//这里定义 暴露给外界调用的 接口/方法
        setObject: function (object) {
            this.myChart.setOption(createOption.call(this, object));
        }
    }
    var option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['勘查现场数', '现场指掌纹采集数'],
            top:30
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                data: ['单位1']
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
        this.myChart = echarts.init(this.config.$parent[0], 'hisign');
    }

    function createOption(object) {
        var thisOption = $.extend(true, {}, option);
        $.each(object, function (key, unitModels) {// 遍历 年月日
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
var echartLPComponent = new EchartLPComponent({"$parent": $("#main")});
echartLPComponent.setObject(lpdata);