/**
 * 小时分布
 */
function hourEcharts() {
    // 准备 ECharts 数据
    var hours = Object.keys(hourlyData).map(Number);
    var counts = hours.map(hour => hourlyData[hour]);
    // 使用 ECharts 绘制柱状图
    var myChart = echarts.init(document.getElementById('hourStat'));
    var option = {
        title: {
            text: '按小时统计'
        },
        tooltip: {},
        xAxis: {
            type: 'category',
            data: hours
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: counts,
            type: 'bar',
            barWidth: '60%'
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}
