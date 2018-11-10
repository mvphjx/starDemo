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
    var count = 360;
    var data = [];
    for (var i = 0; i < count; i++) {
        data.push([1, i]);
    }
    var option = {
        title: [{
            text: '倒查案件数',
            x: '50%',
            y: '80%',
            textAlign: 'center',
            textStyle: {
                color: '#fff',
                textAlign: 'center',
                fontSize: 45,
                fontWeight: 'bold'
            },
        }, {
            text: '2587',
            textStyle: {
                color: '#ffffff',
                fontSize: 50,
                fontWeight: 'normal',
                fontFamily: '华文细黑',
            },
            x: 'center',
            y: 'center'
        }],
        legend: {
            orient: 'vertical',
            x: 'left',
            data: ['']
        },
        series: [{
            name: '',
            type: 'pie',
            color:["#3399ff"],
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [{
                value: 0.7,
                name: ''
            }]
        }]
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
                var thisOption = $.extend(true, {}, option);
                thisOption.title[0].text = hitModel.name;
                thisOption.title[1].text = hitModel.count;
                if(index==0){
                    thisOption.series[0].color=["#3399ff"];
                }else{
                    thisOption.series[0].color=["#33cccc"];
                }
                result.push(thisOption);
            });
        });
        return result;
    }
}();
var echartHITComponent = new EchartHITComponent({"$parentTL": $("#tlhitmain"),"$parentLT": $("#lthitmain")});
echartHITComponent.setObject(hitdata);