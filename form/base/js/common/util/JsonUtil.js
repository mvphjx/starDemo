var JsonUtil ={
		splitChar : '_And_',
		getJson: function(cfg, data, splitChar) {
			var _this = this;
			if(WebUtil.isNull(data)) {
				return;
			} else if(typeof data == 'string') {
				data = eval('(' + data + ')');
			}
			$.each(cfg, function(name, obj) {
				if(typeof obj == "string") {
					var value = _this.getJsonValueById(obj, data, splitChar);
					if(value===null){
						delete cfg[name];
					}else{
						cfg[name]=value
					}
				}
			});
			return cfg;
		},
		getJsonStr: function(cfg, data, splitChar) {
			return JSON.stringify(this.getJson(cfg, data, splitChar));
		},
		//将字符串转换为json，如果失败返回原字符串
		toJson: function(jsonstr) {
			var json = jsonstr;
			try {
				if(typeof jsonstr == "string") {
					json = eval('(' + jsonstr + ')');
				}
			} catch(e) {
				json={};
			}
			return json;
		},
		getJsonValueById: function(id, data, splitChar) {
			data =this.toJson(data);
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
		}
}		