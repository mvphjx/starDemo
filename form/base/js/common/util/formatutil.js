/*
 * 格式转换
 * 日期格式标准化
 * 特殊字符转义
 */
var FormatUtil = {
	getDate: function(str) {
		//2016-12-22 14:43:33
		var datestr = str.replace(/-/g, "/");
		return new Date(datestr)
	},
	formateDateString: function(str) {
		//str = '2016-1-12 14:43:33'  to  20160112
		str = str.replace(/(\d{4}).(\d{1,2}).(\d{1,2}).+/mg, function($0, $1, $2, $3) {
			if($2.length == 1) {
				$2 = '0' + $2
			}
			if($3.length == 1) {
				$3 = '0' + $3
			}
			return $1 + $2 + $3
		});
		return str;
	},
	formateSpecialString: function(str) {
		//name = '&aaa bbb>· ccc· &amp;';
		console.log(name);
		var reg = /[&<">'·](?:(amp|lt|quot|gt|#39|middot|nbsp|#\d+);)?/g
		uw = str.replace(reg, function(a, b) {
			//console.log(a + '   ' + b)
			if(b) {
				//console.log(b + '=true   then return ' + a)
				return a;
			} else {
				return {
					'<': '&lt;',
					'&': '&amp;',
					'"': '&quot;',
					'>': '&gt;',
					'·': '&#39;',
					"'": '&middot;'
				}[a]
			}

		})
		return uw;
	}
}