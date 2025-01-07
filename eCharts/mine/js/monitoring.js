//及格的数据值
var passingData = 0.5;
//优秀的数据值
var targetData = 0.15;

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
        showMessageByTime('message30Compare', nextTime30Compare);
    }
    if (nextTime90Compare) {
        show("alert90Compare");
        showMessageByTime('message90Compare', nextTime90Compare);
    }
    nextTime30 = getNextTime(rencent30AveragesData, 30);
    if (nextTime30) {
        show("alert30");
        showMessageByTime('message30', nextTime30);
    }
    nextTime90 = getNextTime(rencent90AveragesData, 90);
    if (nextTime90) {
        show("alert90");
        showMessageByTime('message90', nextTime90);
    }
    var nextTimeNow = getNextTimeNow();
    if (nextTimeNow) {
        show("alertNow");
        showMessageByTime('messageNow', nextTimeNow);
    }
}

/**
 * 根据最近48小时数据，获取恢复时间
 * @returns {null|*}
 */
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

/**
 * 根据当前数据，获取恢复时间
 * @param averagesData
 * @param days
 * @returns {null}
 */
function getNextTime(averagesData, days) {
    var thisData = averagesData[averagesData.length - 1];
    var nextTime = null;
    if (thisData < passingData) {
        return null;
    }
    //计算修复时间
    var count = days * passingData;
    var countRound = Math.round(count);
    var datetime = datetimeArray[datetimeArray.length + 1 - countRound];
    nextTime = datetime.add(days, 'days');
    return nextTime;
}

/**
 * 同比上次数据，获取恢复时间
 * @param averagesData
 * @param days
 * @returns {null}
 */
function getCompareNextTime(averagesData, days) {
    //监控的数据
    var lastData = averagesData[averagesData.length - 2];
    var thisData = averagesData[averagesData.length - 1];
    var nextTime = null
    if (thisData < passingData) {
        return null;
    }
    //计算修复时间
    if (thisData > lastData) {
        var count = days * lastData;
        var countRound = Math.round(count);
        var datetime = datetimeArray[datetimeArray.length + 1 - countRound]
        nextTime = datetime.add(days, 'days');
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

function showMessageByTime(id, nextTime) {
    var msg = nextTime.format('YYYY年MM月DD日HH:mm:ss') + "({hours}小时后)";
    var diffHours = nextTime.diff(moment(), 'hours');
    msg = msg.replace("{hours}", diffHours)
    document.getElementById(id).innerHTML = msg;

}

