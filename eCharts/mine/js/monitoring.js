/**
 * 监控预警
 * 预警月度指标上升
 * 预测月度指标恢复，需要的数值
 */
function monitoring() {
    nextTime30Compare = getCompareNextTime(rencent30AveragesData, 30);
    nextTime90Compare = getCompareNextTime(rencent90AveragesData, 90);
    if (nextTime30Compare) {
        show("alert30Compare");
        document.getElementById('message30Compare').innerHTML = nextTime30Compare.format('YYYY年MM月DD日HH:mm:ss');
    }
    if (nextTime90Compare) {
        show("alert90Compare");
        document.getElementById('message90Compare').innerHTML = nextTime90Compare.format('YYYY年MM月DD日HH:mm:ss');
    }
    nextTime30 = getNextTime(rencent30AveragesData, 30);
    if (nextTime30) {
        show("alert30");
        document.getElementById('message30').innerHTML = nextTime30.format('YYYY年MM月DD日HH:mm:ss');
    }
    var nextTimeNow = getNextTimeNow();
    if (nextTimeNow) {
        show("alertNow");
        document.getElementById('messageNow').innerHTML = nextTimeNow.format('YYYY年MM月DD日HH:mm:ss');
    }

}

function getNextTimeNow() {
    var thisData = datetimeArray[datetimeArray.length - 1];
    var hours = 48;
    var nextTime = thisData.clone().add(hours, 'hours')
    if (nextTime.isAfter(moment())) {
        return nextTime;
    } else {
        return null;
    }
}


function getNextTime(averagesData, days) {
    var thisData = averagesData[averagesData.length - 1];
    var goodData = 0.5;
    var nextTime = null
    //计算修复时间
    if (thisData > goodData) {
        var count = days * goodData;
        var countRound = Math.round(count);
        var datetime = datetimeArray[datetimeArray.length + 1 - countRound];
        nextTime = datetime.add(days, 'days');
    }
    return nextTime;
}

function getCompareNextTime(averagesData, days) {
    //监控的数据
    var lastData = averagesData[averagesData.length - 2];
    var thisData = averagesData[averagesData.length - 1];
    var nextTime = null
    //计算修复时间
    if (thisData > lastData) {
        var count = days * lastData;
        var countRound = Math.round(count);
        var datetime = datetimeArray[datetimeArray.length + 1 - countRound]
        nextTime = datetime.add(days, 'days');
    } else {

    }
    return nextTime;
}


/**
 * 调试模式，手动设置结束日期，看趋势图
 * @type {{date: string, enable: boolean}}
 */
var debug = {enable: false, date: "2024-12-26"}

function getTodayMont() {
    if (debug && debug.enable) {
        return moment(debug.date);
    } else {
        return moment();
    }

}

/**
 * 展示Dom
 * @param id
 */
function show(id) {
    var alertDiv = document.getElementById(id);
    var alertContainer = document.getElementById('alertContainer');
    alertContainer.style.display = 'block';
    alertDiv.style.display = 'flex';
}

