/**
 * 月分布
 */
function monthEcharts() {
    sortedMonthData(monthlyData);
    var myChart = echarts.init(document.getElementById('monthStat'));
    // 准备 ECharts 的数据
    var xAxisData = Object.keys(monthlyData).map(function (key) {
        return key; // 这里直接使用年月作为x轴数据
    });
    var seriesData = Object.values(monthlyData);
    var rencent30AveragesData = Object.values(calculateRecentAverage(monthlyData, 30));
    var rencent90AveragesData = Object.values(calculateRecentAverage(monthlyData, 90));
    // 计算日均次数
    var dailyAverages = calculateDailyAverages(monthlyData);
    var dailyAveragesData = Object.values(dailyAverages);
    // 指定图表的配置项和数据
    var option = {
        legend: {
            data: ['每月数量', '近30天日均数', '近90天日均数', '日均数']
        },
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
            name: '日均数',
            position: 'right',
            alignTicks: true
        }],
        series: [{
            name: '每月数量',
            type: 'bar',
            data: seriesData
        }, {
            name: '近30天日均数',
            type: 'line',
            yAxisIndex: 1,
            data: rencent30AveragesData
        }, {
            name: '近90天日均数',
            type: 'line',
            yAxisIndex: 1,
            data: rencent90AveragesData
        }, {
            name: '日均数',
            type: 'line',
            yAxisIndex: 1,
            data: dailyAveragesData
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

/**
 *计算最近X天日均数
 */
function calculateRecentAverage(data, dayCount) {
    var averages = {};
    const todayDate = moment();
    const _startDate = moment('2023-07-12', 'YYYY-MM-DD').subtract(1, 'seconds');
    Object.keys(data).forEach(function (month) {
        let _dayCount = dayCount;
        let startDate, endDate;
        let startOfMonth = moment(month, 'YYYY-MM')
        let endOfMonth = startOfMonth.clone().add(1, 'months').subtract(1, 'seconds');
        if (endOfMonth.isAfter(todayDate)) {
            endDate = todayDate;
        } else {
            endDate = endOfMonth;
        }
        startDate = endDate.clone().subtract(_dayCount, 'days');
        if (startDate.isBefore(_startDate)) {
            startDate = _startDate;
            _dayCount = endDate.diff(startDate, 'days');
        }
        let total = 0;
        datetimeArray.forEach(function (date) {
            if (date.isAfter(startDate) && date.isBefore(endDate)) {
                total++;
            }
        });
        var average = (total / _dayCount).toFixed(2);
        averages[month] = average;
    });
    return averages;

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
        const todayDate = moment();
        if (todayDate.month() == monthIndex && todayDate.year() == year) {
            days = todayDate.day();
        }
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
    const startDate = moment('2023-07-12', 'YYYY-MM-DD').subtract(1, 'seconds');
    const todayDate = moment();
    for (let month in data) {
        let endDate;
        let startOfMonth = moment(month, 'YYYY-MM')
        let endOfMonth = startOfMonth.clone().add(1, 'months').subtract(1, 'seconds');
        if (endOfMonth.isAfter(todayDate)) {
            endDate = todayDate;
        } else {
            endDate = endOfMonth;
        }
        // 计算从月末到起始日期的天数
        const days = endDate.diff(startDate, 'days');
        //console.log(month,days)
        let total = 0;
        datetimeArray.forEach(function (date) {
            if (date.isBefore(endDate)) {
                total++;
            }
        });
        // 计算日均次数
        let dailyAverage = total / days;
        dailyAverages[month] = dailyAverage.toFixed(2);
    }
    return dailyAverages;
}


//月度数据排序
function sortedMonthData() {
    // 将对象的键转换为数组
    var keys = Object.keys(monthlyData);
    // 按日期从远到近排序键
    keys = keys.sort((a, b) => {
        var dateA = moment(a, 'YYYY-MM');
        var dateB = moment(b, 'YYYY-MM');
        return dateA.diff(dateB, 'days'); // 降序
    })
    var sortedData = {};
    for (let key of keys) {
        sortedData[key] = monthlyData[key]
    }
    monthlyData = sortedData;
    var todayMont = moment().format('YYYY-MM');
    if (keys.indexOf(todayMont) === -1) {
        monthlyData[todayMont] = 0;
    }

}
