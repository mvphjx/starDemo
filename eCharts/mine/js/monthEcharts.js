var monthlyData = {"2024-05": 19, "2024-06": 20};

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
    var averages = calculateMonthlyAverage(monthlyData);
    var averagesData = Object.values(averages);
    // 计算日均次数
    var dailyAverages = calculateDailyAverages(monthlyData);
    var dailyAveragesData = Object.values(dailyAverages);
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
        yAxis: [{type: 'value', name: '每月数量'}, {
            type: 'value',
            name: '日均次数',
            position: 'right',
            alignTicks: true
        }],
        series: [{
            name: '每月数量',
            type: 'bar',
            data: seriesData
        }, {
            name: '每月日均数',
            type: 'line',
            yAxisIndex: 1,
            data: averagesData
        }, {
            name: '日均数量',
            type: 'line',
            yAxisIndex: 1,
            data: dailyAveragesData
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

/**
 *计算每月日均数
 */
function calculateMonthlyAverage(data) {
    var averages = {};
    Object.keys(data).forEach(function (month) {
        var year = parseInt(month.substring(0, 4), 10);
        var monthIndex = parseInt(month.substring(5, 7), 10) - 1; // JavaScript 月份从 0 开始
        var total = data[month];
        var days = getDaysInMonth(year, monthIndex + 1);
        var average = (total / days).toFixed(2);
        averages[month] = average;
    });
    return averages;
}

function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

/**
 * 计算日均数
 */
function calculateDailyAverages(data) {
    let dailyAverages = {};
    // 定义起始日期
    const startDate = moment('2023-07-12', 'YYYY-MM-DD');
    const todayDate = moment();
    for (let month in data) {
        // 构造每个月的月末日期
        let monthDate = moment(month, 'YYYY-MM')
        let endOfMonth = monthDate.add(1, 'months').subtract(1, 'days');
        if (todayDate.isBefore(endOfMonth)) {
            endOfMonth = todayDate;
        }
        // 计算从月末到起始日期的天数
        const days = endOfMonth.diff(startDate, 'days');
        //console.log(month,days)
        let total = 0;
        for (let monthKey in data) {
            if (moment(monthKey, 'YYYY-MM').isBefore(monthDate)) {
                total = total + data[monthKey];
            }
        }
        // 计算日均次数
        let dailyAverage = total / days;
        // 保存结果
        dailyAverages[month] = dailyAverage.toFixed(2);
    }
    return dailyAverages;
}
