var EchartHITComponent = function () {


    /**
     * 构造器
     * @param setting{$parent:父容器,timeInterval}
     * @constructor
     */
    var EchartHITComponentClass = function (setting) {
        this.config = setting;
        init.call(this);
    };
    EchartHITComponentClass.prototype = {//这里定义 暴露给外界调用的 接口/方法
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
    return EchartHITComponentClass;

    function init() {
        this.myQryChart = echarts.init(this.config.$parent.find("#chart1")[0], 'hisign');
        this.myHitChart = echarts.init(this.config.$parent.find("#chart2")[0], 'hisign');
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
        var options = createOption.call(this, statData,type)
        this.myQryChart.setOption(options[0]);
        this.myHitChart.setOption(options[1]);
    }
    /**
     * 获取统计数据
     * @returns {{year, month, day}}
     */
    function getStatData(){
        return hitdata;
    }
    /**
     *
     * @param statData  统计数据
     * @param type 显示的统计类型
     */
    function createOption(statData,type) {
        var result = [];
        $.each(statData, function (key, hitModels) {// 遍历 年月日
            if(type!==key){
                return true;
            }
            $.each(hitModels, function (index, hitModel) {//遍历比中类型数组
                var thisOption;
                if(index==0){
                    thisOption = createQryOption(hitModel.data);
                }else{
                    thisOption = createQryOption(hitModel.data);
                }
                thisOption.title.text=hitModel.name
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
                padding: [3, 0]
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
        var color=['#00ffff','#00cfff','#006ced','#ffe000'];
        for (var i = 0; i < scaleData.length; i++) {
            data.push({
                value: scaleData[i].value,
                name: scaleData[i].name,
                itemStyle: {
                    normal: {
                        borderWidth: 1,
                        shadowBlur: 0,
                        borderColor:color[i],
                        shadowColor: color[i]
                    }
                }
            }, {
                value: 2,
                name: '',
                itemStyle: placeHolderStyle
            });
        }
        var seriesObj = [{
            name: '',
            type: 'pie',
            clockWise: false,
            radius: [25, 50],
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
                        length:10,
                        length2:20,
                        show: true
                    }
                }
            },
            data: data
        }];
        var option = {
            title: {
                text: '',
                x: '50%',
                y: '78%',
                textAlign: 'center',
                textStyle: {
                    color: '#fff',
                    textAlign: 'center',
                    fontSize: 15,
                    fontWeight: 'bold'
                }
            },
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
var echartHITComponent = new EchartHITComponent({"$parent": $("#hitmain"),timeInterval:timeInterval});
echartHITComponent.setType(DateType.day);
echartHITComponent.switchAuto(true);