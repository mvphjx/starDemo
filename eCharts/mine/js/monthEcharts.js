/**
 * 月分布
 */
function monthEcharts() {
    var myChart = echarts.init(document.getElementById('monthStat'));
    // 准备 ECharts 的数据
    var xAxisData = Object.keys(monthlyData).map(function (key) {
        return key; // 这里直接使用年月作为x轴数据
    });
    var seriesData = Object.values(monthlyData);

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '每月数量分布'
        },
        tooltip: {},
        xAxis: {
            type: 'category',
            data: xAxisData
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name: '数量',
            type: 'bar',
            data: seriesData
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}
