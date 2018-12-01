var EchartHITComponent = function () {


    /**
     * 构造器
     * @param setting{$parent:父容器}
     * @constructor
     */
    var EchartHITComponentClass = function (setting) {
        this.config = setting;
        init.call(this);
    };
    EchartHITComponentClass.prototype = {//这里定义 暴露给外界调用的 接口/方法
        setObject: function (object) {
            var options = createOption.call(this, object);
            this.myTLChart.setOption(options[0]);
            this.myLTChart.setOption(options[1]);
        }
    };
    return EchartHITComponentClass;

    function init() {
        this.myLTChart = echarts.init(this.config.$parentLT[0], 'hisign');
        this.myTLChart = echarts.init(this.config.$parentTL[0], 'hisign');
    }
    function createOption(object) {
        var result = [];
        $.each(object, function (key, hitModels) {// 遍历 年月日
            $.each(hitModels, function (index, hitModel) {//遍历比中类型数组
                var thisOption;
                if(index==0){
                    thisOption = createQryOption(hitModel.data);
                }else{
                    thisOption = createQryOption(hitModel.data);
                }
                result.push(thisOption);
            });
        });
        return result;
    }
    function createQryOption(scaleData) {
        var rich = {
            white: {
                color: '#ddd',
                align: 'center',
                padding: [5, 0]
            }
        };
        var placeHolderStyle = {
            normal: {
                label: {
                    show: false
                },
                labelLine: {
                    show: false
                },
                color: 'rgba(0, 0, 0, 0)',
                borderColor: 'rgba(0, 0, 0, 0)',
                borderWidth: 0
            }
        };
        var data = [];
        for (var i = 0; i < scaleData.length; i++) {
            data.push({
                value: scaleData[i].value,
                name: scaleData[i].name,
                itemStyle: {
                    normal: {
                        borderWidth: 5,
                        shadowBlur: 30,
                        borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 1, [{
                            offset: 0,
                            color: '#7777eb'
                        }, {
                            offset: 1,
                            color: '#70ffac'
                        }]),
                        shadowColor: 'rgba(142, 152, 241, 0.6)'
                    }
                }
            }, {
                value: 4,
                name: '',
                itemStyle: placeHolderStyle
            });
        }
        var seriesObj = [{
            name: '',
            type: 'pie',
            clockWise: false,
            radius: [195, 200],
            hoverAnimation: false,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'outside',
                        color: '#ddd',
                        formatter: function(params) {
                            var percent = 0;
                            var total = 0;
                            for (var i = 0; i < scaleData.length; i++) {
                                total += scaleData[i].value;
                            }
                            percent = ((params.value / total) * 100).toFixed(0);
                            if(params.name !== '') {
                                return params.name + '\n{white|' + '占比' + percent + '%}';
                            }else {
                                return '';
                            }
                        },
                        rich: rich
                    },
                    labelLine: {
                        show: false
                    }
                }
            },
            data: data
        }];
        var option =  {
            tooltip: {
                show: false
            },
            legend: {
                show: false
            },
            toolbox: {
                show: false
            },
            series: seriesObj
        };
        return option;
    }

}();
var echartHITComponent = new EchartHITComponent({"$parentTL": $("#tlhitmain"),"$parentLT": $("#lthitmain")});
echartHITComponent.setObject(hitdata);