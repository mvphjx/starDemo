/**
 * 监控预警
 * 预警月度指标上升
 * 预测月度指标恢复，需要的数值
 */
function monitoring() {
    nextTime30 = getNextTime(rencent30AveragesData, 30);
    nextTime90 = getNextTime(rencent90AveragesData, 90);
    if (nextTime30) {
        show("alert30");
        document.getElementById('message30').innerHTML = nextTime30.format('YYYY年MM月DD日HH:mm:ss');
    }
    if (nextTime90) {
        show("alert90");
        document.getElementById('message90').innerHTML = nextTime90.format('YYYY年MM月DD日HH:mm:ss');
    }
}

function show(id) {
    var alertDiv = document.getElementById(id);
    var alertContainer = document.getElementById('alertContainer');
    alertContainer.style.display = 'block';
    alertDiv.style.display = 'flex';
}


function getNextTime(averagesData, days) {
    //监控的数据
    var lastData = averagesData[averagesData.length - 2];
    var thisData = averagesData[averagesData.length - 1];
    var nextTime = null
    if (thisData > lastData) {
        //如果数据上升，预测修复时间
        var averagesValue = lastData;
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

