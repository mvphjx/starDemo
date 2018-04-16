/**
 * Chrome插件的 injected script
 * 
 * 暴露接口给网页，负责页面与插件通信（使用消息机制）
 */

// query code  加载代码表
//TP_CARD_INFO|PRINT_UNIT_CODE
function queryCode(data, callback) {
	data = data || "TP_CARD_INFO|PRINT_UNIT_CODE"
	var url = "http://127.0.0.1:8020";
	window.addEventListener("message", function(e) {
		if(e.origin === url && e.source === window) {
			var dataAll = e.data;
			var data = dataAll.data;
			var type = dataAll.type;
			if(type === "setCode") {
				console.log(data);
			}
		}
	}, false);
	var param = {
		"data": data,
		"type": "queryCode"
	};
	window.postMessage(param, url);
}