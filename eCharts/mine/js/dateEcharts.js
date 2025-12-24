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
                const format = echarts.time.format(p.data[0], '{yyyy}年{MM}月{dd}日', false);
                var startDate = moment(format, 'YYYY-MM-DD').subtract(1, 'seconds');
                var endDate = startDate.clone().add(1, 'days').add(1, 'seconds');
                //获取明细 datetimeArray
                var detail = null
                datetimeArray.forEach(function (date) {

                    if (date.isAfter(startDate) && date.isBefore(endDate)) {
                        //'YYYY年MM月DD日HH:mm:ss'
                        var dataStr = date.format('YYYY年MM月DD日HH:mm:ss')
                        if (!detail) {
                            detail = dataStr
                        } else {
                            detail = detail + "</br>" + dataStr
                        }
                    }
                });
                //优先显示明细，此次显示日期标注信息
                if (detail) {
                    return detail;
                } else {
                    return format + ':' + p.data[1];
                }

            }
        },
        visualMap: {
            min: 0,
            max: 4,
            left: 765,
            top: 'center',
            calculable: true,
            orient: 'vertical'
        },
        calendar: [
            {
                left: 25,
                orient: 'vertical',
                cellSize: [20, 20],
                range: '2023',
                dayLabel: {
                    margin: 5
                }
            },
            {
                left: 225,
                cellSize: [20, 20],
                orient: 'vertical',
                range: '2024',
                dayLabel: {
                    margin: 5
                }
            },
            {
                left: 425,
                cellSize: [20, 20],
                orient: 'vertical',
                range: '2025',
                dayLabel: {
                    margin: 5
                }
            },
            {
                left: 625,
                cellSize: [20, 20],
                orient: 'vertical',
                range: '2026',
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
            {
                type: 'heatmap',
                coordinateSystem: 'calendar',
                calendarIndex: 3,
                data: getVirtualData('2026')
            },
            createScatterSeries(0, lunarData),
            createScatterSeries(1, lunarData),
            createScatterSeries(2, lunarData),
            createScatterSeries(3, lunarData)
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
                if (params.value[1] === '今天') {
                    return `{b|${dayNum}}`;
                } else {
                    return `{a|${dayNum}}`;
                }
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
