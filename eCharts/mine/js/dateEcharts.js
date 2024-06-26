/**
 * 日期分布
 */
const lunarData = []
cnHoliday.forEach(function (day) {
    let jsDate = moment(day, 'YYYY年MM月DD日');
    lunarData.push([jsDate.format('YYYY-MM-DD'), '休息']);
});
lunarData.push([moment().format('YYYY-MM-DD'), '今天']);

function dateEcharts() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('dateStat'));
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '按天统计'
        },
        tooltip: {
            position: 'top',
            formatter: function (p) {
                const format = echarts.time.format(p.data[0], '{yyyy}-{MM}-{dd}', false);
                return format + ': ' + p.data[1];
            }
        },
        visualMap: {
            min: 0,
            max: 4,
            calculable: true,
            orient: 'vertical',
            left: '800',
            top: 'center'
        },
        calendar: [
            {
                orient: 'vertical',
                cellSize: [30, 'auto'],
                range: '2023'
            },
            {
                left: 330,
                cellSize: [30, 'auto'],
                orient: 'vertical',
                range: '2024'
            },
            {
                left: 580,
                cellSize: [30, 'auto'],
                orient: 'vertical',
                range: '2025',
                dayLabel: {
                    margin: 5
                }
            }
        ],
        series: [
            {
                type: 'heatmap',
                coordinateSystem: 'calendar',
                calendarIndex: 0,
                data: getVirtualData('2023')
            },
            {
                type: 'heatmap',
                coordinateSystem: 'calendar',
                calendarIndex: 1,
                data: getVirtualData('2024')
            },
            {
                type: 'heatmap',
                coordinateSystem: 'calendar',
                calendarIndex: 2,
                data: getVirtualData('2025')
            },
            createScatterSeries(0, lunarData),
            createScatterSeries(1, lunarData),
            createScatterSeries(2, lunarData)
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

// 生成日历标签，标识特殊日期
function createScatterSeries(calendarIndex, data) {
    return {
        type: 'scatter',
        coordinateSystem: 'calendar',
        symbolSize: 10, // 显示点
        calendarIndex,
        label: {
            show: true,
            formatter: function (params) {
                const dateObj = echarts.number.parseDate(params.value[0]);
                const dayNum = dateObj.getDate();
                return params.value[1] === '今天' ? `{b|${dayNum}}` : `{a|${dayNum}}`;
            },
            rich: {
                a: {
                    color: 'green'
                },
                b: {
                    color: 'red',
                    fontWeight: 'bold'
                }
            }
        },
        data,
        silent: false
    };
}
