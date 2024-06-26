function init() {
    fetch(fileUrl)
        .then(response => {
            // 确保响应状态是成功的
            if (!response.ok) {
                throw new Error('网络响应错误');
            }
            // 解析文本内容
            return response.text();
        })
        .then(text => {
            // 将文本按行分割成数组
            const lines = text.split('\n');
            // 过滤掉可能的空行
            datetimeArray = lines.filter(line => line.trim() !== '');
            initEcharts();
        })
}

function initEcharts() {
    //数据清洗，转为统计数据
    datetimeArray.forEach(function (dateStr) {
        var date = parseDate(dateStr) // 转换为Date对象
        var year = date.year();
        var month = (date.month() + 1).toString().padStart(2, '0');
        var day = date.date();
        var hour = date.hour();
        var minutes = date.minute();
        var seconds = date.second();
        var monthKey = year + '-' + month;
        var calendarKey = [year, month, day].join('-');
        if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = 1;
        } else {
            monthlyData[monthKey]++;
        }
        //过滤掉缺少时间的数据
        if (minutes != 0 || seconds != 0 || hour != 0) {
            if (!hourlyData[hour]) {
                hourlyData[hour] = 1;
            } else {
                hourlyData[hour]++;
            }
        }
        if (!daylyData[calendarKey]) {
            daylyData[calendarKey] = 1;
        } else {
            daylyData[calendarKey]++;
        }
    });
    hourEcharts();
    monthEcharts();
    dateEcharts();
}


function parseDate(dateStr) {
    dateStr = dateStr.replace("\r", "")
    let format = "YYYY年MM月DD日HH:mm:ss";
    if (dateStr.indexOf('年') == -1) {
        if (dateStr.length == 10) {
            format = "YYMMDDHHmm";
        } else {
            format = "YYYYMMDDHHmmss";
        }
    }
    let jsDate = moment(dateStr, format);
    return jsDate;
}


function getVirtualData(yearStr) {
    // 创建一个空数组来存储结果
    var calendarData = [];
    // 遍历数据对象，将每个键值对添加到calendarData数组中
    for (var date in daylyData) {
        if (daylyData.hasOwnProperty(date)) {
            // 检查年份是否匹配
            if (date.substring(0, 4) === yearStr) {
                // 将日期和对应的值作为数组元素添加到calendarData中
                calendarData.push([date, daylyData[date]]);
            }
        }
    }
    return calendarData;
}
