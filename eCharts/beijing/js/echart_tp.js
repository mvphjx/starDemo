var EchartTPComponent = function () {
    /**
     * 构造器
     * @param setting{$parent:父容器}
     * @constructor
     */
    var EchartTPComponentClass = function (setting) {
        this.config = setting;
        init.call(this);
    };
    EchartTPComponentClass.prototype = {//这里定义 暴露给外界调用的 接口/方法
        setObject: function (object) {
            this.myChart.setOption(createOption.call(this, object));
        }
    };
    var option = {
        title: {
            text: '档案数据采集排行',
            subtext: '月度'
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {},
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
            data: ['单位1']
        },
        series: []
    };
    return EchartTPComponentClass;

    function init() {
        this.myChart = echarts.init(this.config.$parent[0], 'hisign');
    }

    function createOption(object) {
        var thisOption = $.extend(true, {}, option);
        $.each(object, function (key, unitModels) {// 遍历 年月日
            thisOption.title.subtext = Resource[key];
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
            return false;
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
var echartTPComponent = new EchartTPComponent({"$parent": $("#tpmain")});
echartTPComponent.setObject(tpdata);