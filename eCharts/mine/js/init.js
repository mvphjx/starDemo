var fileUrl = 'data.txt';

function init() {
    // 定义要获取数据的文件 URL 数组
    var fileUrls = ['data.txt', 'data202405.txt'];
    initData(fileUrls)
        .then(dataArrays => {
            // dataArrays 是一个数组，包含了每个文件解析后的数据数组
            // 将这些数组合并为一个单一的数组
            datetimeArray = [].concat(...dataArrays);
            initEcharts();
        })
        .catch(error => {
            console.error('初始化数据时发生错误:', error);
        });
}

function initData(fileUrls) {
    // 创建一个数组，包含每个文件的获取和解析操作
    const dataPromises = fileUrls.map(fileUrl => {
        const timestamp = new Date().getTime();
        return fetch(`${fileUrl}?timestamp=${timestamp}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`从 ${fileUrl} 获取数据失败`);
                }
                return response.text();
            })
            .then(text => text.split('\n').filter(line => line.trim() !== ''));
    });
    // 使用 Promise.all 等待所有文件的数据获取完成
    return Promise.all(dataPromises);
}

function initEcharts() {
    var _datetimeArray = [];
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
        _datetimeArray.push(date)
    });
    datetimeArray = _datetimeArray;
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
        } else if (dateStr.length == 12) {
            format = "YYYYMMDDHHmm";
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
