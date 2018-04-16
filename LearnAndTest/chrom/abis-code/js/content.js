/**
 * Chrome插件的 content_scripts
 * Content Scripts能够访问当前Web页面的DOM，
 * 但是Content Scripts与当前Web页面自带的JavaScript变量和函数是不能直接互相访问的
 * ，根据配置的权限可以进行跨域等操作
 */
//postMessage 对origin进行安全校验，
var url = "http://127.0.0.1:8020";

// query
function httpRequest(callback) {
	var name = 'han';
	var password = '4690255';
	var validate = "";
	var url = "http://192.168.128.145:7950/abisweb/login/";
	var data = {
		userName: name,
		password: password,
		validate: validate,
		ip: "",
		computerName: "",
		serviceNum: ""
	};
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
			callback(xhr.responseText);
		}
	}
	xhr.send(JSON.stringify(data));
}

// query code  加载代码表 TP_CARD_INFO|PRINT_UNIT_CODE
function queryCode(data, callback) {
	var url = "http://192.168.128.145:7950/abisweb/util/combo/data/" + data;
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
			callback(xhr.responseText);
		}
	}
	xhr.send();
}
// render 结果处理
function showResult(result) {

	console.log(result)
}
// 向页面注入JS
function injectCustomJs(jsPath) {
	jsPath = jsPath || 'js/inject.js';
	var temp = document.createElement('script');
	temp.setAttribute('type', 'text/javascript');
	temp.src = chrome.extension.getURL(jsPath);
	temp.onload = function() {
		// 放在页面不好看，执行完后移除掉
		this.parentNode.removeChild(this);
	};
	document.head.appendChild(temp);
}
window.addEventListener("message", function(e) {
	if(e.origin === url && e.source === window) {
		var dataAll = e.data;
		var data = dataAll.data;
		var type = dataAll.type;
		if(type === "queryCode") {
			queryCode(data, callback);
			function callback(data) {
				var result = {"data":data,"type":"setCode"};
				window.postMessage(result, url);
			}
		}
	}
}, false);
httpRequest(showResult);
injectCustomJs();