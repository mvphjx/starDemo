$.fn.extend({
			position : function(value) {
				var elem = this[0];
				if (elem
						&& (elem.tagName == "TEXTAREA" || elem.type
								.toLowerCase() == "text")) {
					if (checkIEVersion()) {
						var rng;
						if (elem.tagName == "TEXTAREA") {
							rng = event.srcElement.createTextRange();
							rng.moveToPoint(event.x, event.y);
						} else {
							rng = document.selection.createRange();
						}
						if (value === undefined) {
							rng.moveStart("character",
									-event.srcElement.value.length);
							return rng.text.length;
						} else if (typeof value === "number") {
							var index = this.position();
							index > value ? (rng.moveEnd("character", value
									- index)) : (rng.moveStart("character",
									value - index))
							rng.select();
						}
					} else {
						if (value === undefined) {
							return elem.selectionStart;
						} else if (typeof value === "number") {
							elem.selectionEnd = value;
							elem.selectionStart = value;
						}
					}
				} else {
					if (value === undefined)
						return undefined;
				}
			}
		})

function checkIEVersion() {
	var ua = navigator.userAgent;
	var s = "MSIE";
	var i = ua.indexOf(s)
	if (i >= 0) {
		// 获取IE版本号
		var ver = parseFloat(ua.substr(i + s.length));
		return true;
	} else {
		// 其他情况，不是IE
		return false;
	}
}
