var JsonUtil ={
		splitChar : '_And_',
		getJson: function(cfg, data, splitChar) {
			splitChar = splitChar||this.splitChar;
			var result={};
			var config=$.extend(true, {}, cfg);
			var _this = this;
			if(WebUtil.isNull(data)) {
				return;
			} else if(typeof data == 'string') {
				data = eval('(' + data + ')');
			}
			$.each(config, function(name, obj) {
				if(typeof obj == "string") {
					var value = _this.getJsonValueById(obj, data, splitChar);
					if(value===null){
						delete config[name];
					}else{
						config[name]=value
					}
				}
				_this.createJsonById(name,config[name],splitChar,result);
			});
			return result;
		},
		getJsonStr: function(cfg, data, splitChar) {
			return JSON.stringify(this.getJson(cfg, data, splitChar));
		},
		getJsonValueById: function(id, data, splitChar) {
			var arr = new Array();
			arr = id.split(splitChar);
			for(var i = 0; i < arr.length; i++) {
				if(data[arr[i]] != undefined) {
					data = data[arr[i]]
				} else {
					data = null;
					break
				}
			}
			return data;
		},
		createJsonById: function(id, value, splitChar,jsonData) {
			splitChar = splitChar||this.splitChar;
			if(WebUtil.isNull(id) || WebUtil.isNull(value)) {
				return;
			}
			var arr = new Array();
			arr = id.split(splitChar);
			var result = jsonData;
			for(var i = 0; i < arr.length - 1; i++) {
				if(result[arr[i]] == undefined) {
					result[arr[i]] = {};
				}
				result = result[arr[i]];
			}
			result[arr[arr.length - 1]] = value;
		}
}		