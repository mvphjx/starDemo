WebTable.prototype.id = null;
WebTable.prototype.setting = null;
WebTable.prototype.input = null;
WebTable.prototype.selectIndex = null;
WebTable.prototype.isShiftKey = null;
WebTable.prototype.order = null;
WebTable.prototype.orderColName = null;

/**
 * 排序类型
 */
WebTable.ASC = 0;
WebTable.DES = 1;
WebTable.DESC = 1;
//字典列 分隔符重新定义
WebTable.splitChar= "__:__";
/**
 * 显示字段的长度
 */
WebTable.CONTENT_LENGTH=30;
WebTableKeyName = {
	Header : "Header_"
};

/**
 * 
 * @param {Object}
 *            id
 * @param {Object}
 *            setting 
 *            var setting = { 
 *            	callBack: { 
 *            		dbClick:function(),// 双击
 *            		onClick:function(), // 单击 
 *            		refresh:function()//刷新 比如翻页
 *            	}, 
 *            	sort: // 排序 { 
 *            		colName:name, 
 *            		order:0|1 
 *            	},
 *            	menu: { 
 *            		selectItem:函数名, 
 *            		width:菜单宽度, 
 *            		menuItem: [ 
 *            			id:编号(唯一),
 *            			type：1：分隔符 0：菜单项, 
 *            			txt:文本 
 *            		] 
 *            	}, 
 *            	multiSelect :true|false 默认为false //是否为多选, 
 *            	isCheck :true|false 默认为false //是否复选, 
 *            	canSort :true|false 默认为true //支持排序 
 *            	pageBarId :分页ID 
 *            }
 * 注意区分   rowIndex->dom
 * 		    objIndex ->data
 */
function WebTable(id, setting) {
	this.id = id;
	this.setting = setting;
	/*
	 * 索引  用来映射  
	 * DOM对象            与   js缓存数据
	 * 页面tr     与   this.input.result（序列与 td的id相同） 
	 */
	this.indexList = new Array();
	this.initParam();
	this.init();

}

WebTable.prototype.init = function() {
	/* 表格中的数据不允许被选中 */
	// $("#" + this.id).bind("selectstart", function()
	// {
	// return false
	// });
	/* 创建表格 */
	this.tableId = this.id + "_table";
	this.parent = $("#" + this.id);
	this.$table = $("<table id=\""
			+ this.id
			+ "_table\" cellspacing=\"0\" cellpadding=\"0\" class=\"gtable\"></table>");
	this.parent.append(this.$table);

	this.initMenu(this.parent, this.$table);

}

/**
 * 创建菜单
 */
WebTable.prototype.initMenu = function($content, $table) {
	/** 创建菜单 */
	if (this.setting != null && this.setting.menu != null) {
		this.parent.bind("contextmenu", function() {
			return false;
		});

		if (this.setting.menu.selectItem == null) {
			alert(AbisMessageResource.Alert["MenuCallbackFunctionNotFound"]);
			return;
		}

		/** 获取菜单项单击回调函数 */
		this.invokeMenuItem = eval(this.setting.menu.selectItem);
		if (this.setting.menu.menuItem == null) {
			return;
		}
		try {
			this.selectItem = eval(this.setting.menu.selectItem);
		} catch (e) {
			return;
		}
		var menuWidth = 200;// 默认宽度
		if (this.setting.menu.width != null) {
			menuWidth = this.setting.menu.width;
		}

		/** 创建菜单 */
		this.menuId = this.id + "Menu";
		this.$menu = $("<div id=\"" + this.menuId + "\" class=\"gMenu\"></div>");
		this.$menu.css("width", menuWidth);
		this.$menu.bind("selectstart", function() {
			return false;
		});
		$content.append(this.$menu);

		/** 菜单集合 */
		this.popMenu = {};

		/** 添加菜单项 */
		var itemLen = this.setting.menu.menuItem.length;
		for ( var i = 0; i < itemLen; i++) {
			var itemObj = this.setting.menu.menuItem[i];

			if (itemObj.type == 0) {
				/* 普通菜单项 */
				var $grow = $("<div class=\"grow\" ></div>");

				// 菜单项
				var $menuItem = $("<div id=\"" + itemObj.id
						+ "\" class=\"gItem\"></div>");

				// 图标
				var $gItemLogo = $("<div class=\"gItemLogo\"></div>");
				if (itemObj.logo != null) {
					$gItemLogo.addClass(itemObj.logo);
				}
				// 纵向分割线
				var $v_Line = $("<div class=\"gVerticalLine\"></div>");

				// 普通菜单项
				var $gItemTxt = $("<div class=\"gItemTxt\"></div>");
				$gItemTxt.html(itemObj.txt);

				$menuItem.append($gItemLogo);
				$menuItem.append($v_Line);
				$menuItem.append($gItemTxt);

				$grow.append($menuItem);

				this.$menu.append($grow);

				// 添加菜单项事件
				this.registerMenuItemEvent($menuItem);

				menuItem = {};
				menuItem.item = $grow;
				menuItem.img = $gItemLogo;
				menuItem.txt = $gItemTxt;
				this.popMenu[itemObj.id] = menuItem;
			} else if (itemObj.type == 1) {
				// 菜单项分割线
				var $vSeparator = $("<div class=\"gVSeparator\"></div>");
				var $hSeparator = $("<div class=\"gHSeparator\"></div>");
				this.$menu.append($vSeparator);
				this.$menu.append($hSeparator);
			}
		}

		var nThis = this;
		// 注册菜单触发事件
		$table.mouseup(function(e) {
			var ex = e || window.event;
			if (e.button == 2) {
				// 鼠标右键弹起事件
				var top = $(document.documentElement).scrollTop();
				nThis.$menu.css("left", e.clientX);
				nThis.$menu.css("top", e.clientY + top);
				nThis.$menu.fadeIn(200);
			}
		});
		$(document).mousedown(
				function(event) {
					var e = event || window.event;
					var element = e.srcElement || e.target;
					if (element.className == "gItemLogo"
							|| element.className == "gItemTxt"
							|| element.className == "gItem gselectItem") {
						return;
					}
					nThis.$menu.hide();
				});

		$(document).mouseup(function(event) {
			// TODO 暂时不加这段代码
			// var e = event || window.event;
			// var element = e.srcElement || e.target;
			// if (element.className == "cell" || element.className ==
			// "gItemLogo" || element.className == "gItemTxt"
			// || element.className == "gItem gselectItem") { return; }
			// nThis.$menu.hide();
		});
	}
}

/**
 * 获取右键菜单
 */
WebTable.prototype.getPopMenu = function() {
	return this.popMenu;
}

/**
 * 根据ID获取菜单项引用
 * 
 * @param {Object}
 *            itemId 菜单项ID
 */
WebTable.prototype.getPopMenuItem = function(itemId) {
	if (WebUtil.isEmpty(this.popMenu))
		return null;
	return this.popMenu[itemId];
}

/**
 * 初始化参数(外界禁止调用)
 */
WebTable.prototype.initParam = function() {
	if (this.setting == null)
		return;
	if (this.setting.sort != null) {
		this.orderColName = this.setting.sort.colName;
		this.order = this.setting.sort.order;
	}

	// 表示是否移动到了超链接列
	this.moveLink = false;
}

WebTable.prototype.registerMenuItemEvent = function($item) {
	var nThis = this;
	$item.mouseover(function(e) {
		var $vLine = $(this).find("div:eq(1)");
		$vLine.addClass("gVLineSelect");
		$(this).addClass("gselectItem");
	});

	$item.mouseout(function(e) {
		var $vLine = $(this).find("div:eq(1)");
		$vLine.removeClass("gVLineSelect");
		$(this).removeClass("gselectItem");
	});

	$item.mouseup(function(e) {
		// 隐藏菜单
		var $menu = $("#" + nThis.menuId);
		$menu.hide();
		var id = $(this).attr("id");
		nThis.invokeMenuItem(id);
	});
}

/**
 * 设置多行数据
 * 
 * @param {Object}
 *            rows 格式:[{ColName:Value},...]
 */
WebTable.prototype.setRows = function(rows) {
	this.clear();
	if (WebUtil.isEmpty(rows))
		return;
	var row;
	for ( var i = 0; i < rows.length; i++) {
		row = rows[i];
		this.addRowData(row, i);
	}
	this.initIndecs();
	this.sort();
	this.fillData();
}

/**
 * 设置多行数据并且带扩展数据
 * 
 * @param {Object}
 *            rowObjs 格式 [{row:{},extData:obj},..]
 */
// WebTable.prototype.addRows = function(rowObjs)
// {
// if(WebUtil.isEmpty(rowObjs))return;
// var rowObj;
// var row,extData;
// for(var i=0;i<rowObjs.length;i++)
// {
// rowObj = rowObjs[i];
// // row = rowObj["row"];
// // extData = rowObj["extData"];
// this.addRowData(rowObj);
// }
// this.initIndecs();
// this.sort();
// this.fillData();
// }
/**
 * 此方法只是添加数据并不进行排序和填充数据
 */
WebTable.prototype.addRowData = function(row, index) {
	// 添加一行数据需要对加入的对象进行验证
	if (row == null)
		return false;
	if (this.input == null)
		return false;
	var header = this.input.header;
	// 验证添加的列是否在Header中存在，将不存在的列记录下来，最后保存到数据的末尾
	var exists;
	var rowData = row.data;
	var extData = row.extData;
	for ( var str in rowData) {
		exists = false;
		for ( var i = 0; i < header.length; i++) {
			if (header[i] == str) {
				exists = true;
				break;
			}
		}
		if (exists == false) {
			alert(AbisMessageResource.Alert["TableNoSuchColumn"] + str);
			return false;
		}
	}
	var res = this.input.result;
	if (WebUtil.isEmpty(res)) {
		res = new Array();
		this.input.result = res;
	}
	var newItem = new Array();
	var colName;
	var value;
	for ( var i = 0; i < header.length; i++) {
		colName = header[i];
		value = rowData[colName];
		newItem.push(value);
	}
	res.push(row);

	// 表格增加一行
	$table = $("#" + this.tableId);
	var $row = $("<tr></tr>");
	$table.append($row);
	this.registerRow($row);

	var rowId = this.tableId + "_" + index;
	// 添加列
	for ( var j = 0; j < header.length; j++) {
		colName = header[j];
		// 判断链接
		if (!this.isLinkCol(colName)) {
			$td = $("<td class=\"cell\"></td>");
		} else {
			$td = $("<td class=\"cell\"></td>");
			var $link = $("<a href=\"#\" class=\"\"></a>");
			$link.attr("colName", colName);
			$link.attr("rowId", rowId);
			$td.append($link);
			this.registerLink($link);
		}
		if (j == 0) {
			$td.addClass("first_cell");
		}
		$row.append($td);
	}
	return true;
}

WebTable.prototype.checkData = function() {
	if (this.input == null)
		return;
	if (this.input.result == null) {
		this.initTableHead();
	}
}

/**
 * 添加一条数据</br> 执行此方法时需要对HEADER进行列验证
 * 
 * @param {Object}
 *            Array {key:value,...}
 */
WebTable.prototype.addRow = function(row) {
	this.checkData();

	var index = 0;
	if (!WebUtil.isEmpty(this.input.result)) {
		index = this.input.result.length;
	}
	var isOk = this.addRowData(row, index);

	if (isOk != true)
		return;

	this.initIndecs();

	this.sort();

	this.fillData();

	// 转换并加入数据，创建索引进行排序

	/*
	 * 是否有分页 有分页：如果索引大于最后一个，则放弃插入，否则将原先索引位置的数据替换，并且更新显示的数据 无分页：根据索引位置插入数据，更新显示数据
	 */

}

/**
 * 清空表格数据
 */
WebTable.prototype.clear = function(bool) {
	if (this.input == null)
		return;
	this.input.result = null;
	$table = $("#" + this.tableId);
	var $trs = $table.find("tr:gt(0)");
	$trs.remove();
	this.initIndecs();
	this.sort();
	this.fillData();
	//增加一个空行
	if(bool){
		this.updatePageCoder();
	}
}

/**
 * 删除当前选中的所有行
 */
WebTable.prototype.deleteSelectRow = function() {
	if (this.selectIndex == null)
		return;
	var objIndex;
	var delIndex;
	$table = $("#" + this.tableId);
	// 将选中的对象索引从高到低排序
	this.selectIndex.sort(function(i, j) {
		return j - i;
	});

	// 删除数据
	var res = this.input.result;
	for ( var i = 0; i < this.selectIndex.length; i++) {
		var index = this.selectIndex[i];
		res.splice(index, 1);
	}

	// 删除表格N行TR标签
	for ( var i = 0; i < this.selectIndex.length; i++) {
		var $row = $table.find("tr:eq(1)");
		$row.remove();
	}

	this.initIndecs();
	this.sort();
	this.fillData();

	this.selectIndex = new Array();
}
/**
 * 等待加载动画
 */
WebTable.prototype.wait = function() {
 	if(typeof Spinner != "undefined"){
 		//ajax查询慢    提示  加载中
 		this.spin =new Spinner().spin(document.getElementById(this.id));
 	}else{
 		this.spin=null;
 	}
}
/**
 * 等待加载动画停止
 */
WebTable.prototype.waitstop = function() {
 	if(this.spin){
 		this.spin.stop();
 	}
 	//bug : js removeChild  no use!!  so  jquery remove....
 	if(this.spin){
 		$('.spinner').remove();
 	}
}

/**
 * 给表格设置数据
 * 
 * @param {Object} {
 *            header:["dbid","cardId","cardNum","name","sex"],
 *            headerText:["数据库","卡片ID","卡号","姓名","性别"],
 *            dataType:{dbid:1,cardId:1,cardNum:2} result: [
 *            {data:{dbid:"1:捺印库(1)",cardId:1001,cardNum:"110108201205060001",name:"张海峰",sex:"男"},extdata:null},
 *            {data:["捺印库(1)",1021,"110108201206070001","张兰","女"]},
 *            {data:["捺印库(1)",1234,"110108201202210001","冯彪","男"]},
 *            {data:["捺印库(1)",1132,"110108200912150001","王玲雨","女"]},
 *            {data:["捺印库(1)",2313,"110108200903250001","孙德亮","女"]},
 *            {data:["捺印库(1)",2368,"110108201101250001","周乙","男"]},
 *            {data:["捺印库(1)",4850,"110108201203150001","王万成","男"]},
 *            {data:["捺印库(1)",2100,"110108201207190001","刘明义","男"]} ] };
 */
WebTable.prototype.setInput = function(input) {
	this.input = input;
	this.initIndecs();
	if (this.isCheckMode()) {
		this.sortCheck();
	} else {
		this.sort();
	}
	this.initTable();
	this.updateHeaderStatus();
	this.setSelectIndex(0);
	this.updatePageCoder();
	//重新渲染  填充数据 翻页后  回调
	if(this.setting&&this.setting.callBack){
		if(WebUtil.isFunction(this.setting.callBack.refresh)){
			this.setting.callBack.refresh();
		}
	}
}

WebTable.prototype.updatePageCoder = function() {
	if (WebUtil.isNull(this.input))
		return;
	if (WebUtil.isNull(this.setting))
		return;
	if (WebUtil.isNull(this.setting.pageBarId)) {
		$("#" + this.setting.pageBarId).hide();
	}
	var $table = $("#" + this.tableId);
	if (WebUtil.isNull(this.input) || WebUtil.isEmpty(this.input.result)) {
		/* 如果表格没有数据 默认添加一行空数据项 */
		cssName = this.getItemCssName(1);
		$row = $("<tr class=\"" + cssName + "\"></tr>");
		$row.attr("id", "space");
		$row.attr("cssName", cssName);
		$table.append($row);
		var colCount = this.input.header.length;
		if(this.isCheckMode()){
			$td = $("<td class=\"cell first_cell\"></td>");
			$row.append($td);
		}
		for ( var i = 0; i < colCount; i++) {
			$td = $("<td class=\"cell first_cell\"></td>");
			$row.append($td);
		}
	} else {
		$("#" + this.setting.pageBarId).show();
	}
}

/**
 * 设置并执行排序
 * 
 * @param {Object}
 *            colName 列名
 */
WebTable.prototype.setSort = function(orderColName) {
	if (this.setting.canSort != null && this.setting.canSort == false)
		return;
	this.orderColName = orderColName;
	this.updateHeaderStatus();
	this.sort();
	this.fillData();
}

WebTable.prototype.sortCheckCol = function() {
	if (this.setting.canSort != null && this.setting.canSort == false)
		return;
	this.updateHeaderStatus();
	this.sortCheck();
	this.fillData();
}

WebTable.prototype.sortCheck = function() {
	if (this.setting.canSort != null && this.setting.canSort == false)
		return;
	if (this.orderColName != null)
		return;

	if (this.order != WebTable.ASC && this.order != WebTable.DES) {
		this.order = WebTable.ASC;
	}
	var nThis = this;
	var obj1, obj2;
	this.indexList.sort(function(i, j) {
		obj1 = nThis.input.result[i];
		obj2 = nThis.input.result[j];
		var f = compBool(nThis.order, obj1.isCheck, obj2.isCheck);
		return f;
	});

	function compBool(order, v1, v2) {
		if (v1 == v2)
			return 0;

		var flag;
		if (order == WebTable.ASC) {
			flag = (v2 == true) ? 1 : -1;
		} else {
			flag = (v1 == true) ? 1 : -1;
		}
		return flag;
	}

}

/**
 * 创建索引(禁止外界调用)
 */
WebTable.prototype.initIndecs = function() {
	if (this.input != null) {
		// 建立索引
		this.indexList = new Array();
		this.selectIndex = null;
		if (this.input.result != undefined && this.input.result != null) {
			var rowCnt = this.input.result.length;
			for ( var i = 0; i < rowCnt; i++) {
				this.indexList[i] = i;
			}
		}
	}
}

/**
 * 更新列标题排序状态
 */
WebTable.prototype.updateHeaderStatus = function() {
	if (this.order == null)
		return;
	if (WebUtil.isNull(this.input))
		return;

	var $table = $("#" + this.tableId);
	var $tBody = $table.find("TBODY");
	var $tr = $tBody.find("tr:eq(0)");
	var header = this.input.header;
	var n = 0;
	if (this.isCheckMode()) {
		if (this.setting.isCheck == true) {
			n = 1;
		}
		if (this.setting.indexCheck == true) {
			n = 1;
		}
		if (this.setting.redCheck == true) {
			n = 2;
		}
		if (this.setting.wriCheck == true) {
			n = 3;
		}
		
	}
	if (this.isCheckMode() == true && this.orderColName == null) {
		for ( var i = 0; i < header.length; i++) {
			var $img = $tr.find("th:eq(" + (i + n) + ")").find("div:eq(0)");
			$img.attr("class", "");
		}

		var $checkImg = $tr.find("th:eq(0)").find("div:eq(0)");

		if (this.order == WebTable.DES) {
			$checkImg.attr("class", "order_dec");
		} else {
			$checkImg.attr("class", "order_asc");
		}
		$checkImg.css("marginTop", "0px");
	} else {

		// 取消CHECK列的排序样式
		var $img = $tr.find("th:eq(0)").find("div:eq(0)");
		$img.attr("class", "");

		for ( var i = 0; i < header.length; i++) {
			var $img = $tr.find("th:eq(" + (i + n) + ")").find("div:eq(0)");
			if (header[i] == this.orderColName) {
				if (this.order == WebTable.DES) {
					$img.attr("class", "order_dec");
				} else {
					$img.attr("class", "order_asc");
				}
			} else {
				$img.attr("class", "");
			}
		}
	}
}

/**
 * 执行排序(禁止外界调用)
 */
WebTable.prototype.sort = function() {
	if (this.setting.canSort != null && this.setting.canSort == false)
		return;
	if (this.orderColName == undefined || this.orderColName == null
			|| this.orderColName == "")
		return;

	if (this.order != WebTable.ASC && this.order != WebTable.DES) {
		// 默认升序
		this.order = WebTable.ASC;
	}
	var nThis = this;

	var cIndex = -1;
	if (WebUtil.isNull(this.input))
		return;
	var header = this.input.header;
	var $imgLab;
	for ( var i = 0; i < header.length; i++) {
		if (header[i] == this.orderColName) {
			cIndex = i;
			break;
		}
	}
	var dataType = null;
	if (this.input.dataType != undefined) {
		dataType = parseInt(this.input.dataType[this.orderColName]);
	} else {
		dataType = ABISCode.DBDataType.DB_STRING;
	}
	//console.log('before'+this.indexList.toString());
	if (cIndex >= 0) {
		// 更新排序图标找到排序的列
		var obj1, obj2;
		var v1, v2;
		this.indexList
				.sort(function(i, j) {
					obj1 = nThis.input.result[i];
					obj2 = nThis.input.result[j];
					v1 = obj1.data[nThis.orderColName];
					v2 = obj2.data[nThis.orderColName];
					if (nThis.input.dataType[nThis.orderColName] != ABISCode.DBDataType.DB_DATE) {
						v1 = nThis.getColValue(v1);
						v2 = nThis.getColValue(v2);
					}
					var flag;
					switch (dataType) {
					case ABISCode.DBDataType.DB_INT:
						flag = intSorter(nThis.order, v1, v2);
						break;
					case ABISCode.DBDataType.DB_STRING:
					case ABISCode.DBDataType.DB_DATE:
						flag = strSorter(nThis.order, v1, v2)
						//console.log('flag'+flag+'*****'+v1+'***'+v2);
						break;
					}
					return flag;
				});

		function strSorter(order, v1, v2) {
			var flag;
			v1 =$.trim(v1)
			v2 =$.trim(v2)  //空格页面不显示，所以不应该参与排序
			if (order == WebTable.DES) {
				flag = v1 > v2 ? -1 : 1;
			} else {
				flag = v1 > v2 ? 1 : -1;
			}
			return flag;
		}

		function intSorter(order, v1, v2) {
			var flag;
			if (order == WebTable.DES) {
				flag = v1 - v2 > 0 ? -1 : 1;
			} else {
				flag = v2 - v1 > 0 ? -1 : 1;
			}
			return flag;
		}
	}
	//console.log('afterr'+this.indexList.toString());
}

/**
 * 取一列的值(外界禁止调用)
 */
WebTable.prototype.getColValue = function(colStr) {
	if (WebUtil.isNull(colStr))
		return "";
	colStr += "";
	var arrs = colStr.split(WebTable.splitChar);
	return arrs[0];
}

/**
 * 取列值
 * 代码表的列为  code:text
 */
WebTable.prototype.getColText = function(colStr) {
	if (WebUtil.isNull(colStr))
		return "";
	colStr += "";
	var arrs = colStr.split(WebTable.splitChar);
	var text = arrs[0];
	if (arrs.length === 2) {//代码表的列  特殊处理
		text = arrs[1];
	}else{
        text = colStr;
	}
	return text;
}

WebTable.prototype.refreshRow = function(index) {
	var objIndex = this.indexList[index];
	var rowData = this.input.result[objIndex].data;
	var header = this.input.header;
	var $table = $("#" + this.tableId);
	// +1是因为需要跳过标题栏
	var $row = $table.find("tr:eq(" + (index + 1) + ")");
	var colCnt = $row.children().length;
	var text;

	for ( var i = 0; i < colCnt; i++) {
		var $col = $row.find("td:eq(" + i + ")");
		var cName = header[i];
		var arrs = rowData[cName].split(WebTable.splitChar);
		if (arrs.length > 1) {
			text = arrs[1];
		} else {
			text = arrs[0]
		}
		$col.text(text);
	}
}

/**
 * 填充表格数据(外界禁止调用)
 */
WebTable.prototype.fillData = function() {
	if (this.input == null)
		return;
	if (this.indexList == null)
		return;
	if (this.indexList.length == 0)
		return;
	var colCount = this.input.header.length;
	var $table = $("#" + this.tableId);
	var res = this.input.result;
	var cssName;
	var index;
	var $rowData;
	var content = null;
	var $row;
	var colStr;
	var i, j;
	var rowId;
	var colName;

	var n = 0;
	if (this.isCheckMode()) {
		if (this.setting.isCheck == true) {
			n = 1;
		}
		if (this.setting.indexCheck == true) {
			n = 1;
		}
		if (this.setting.redCheck == true) {
			n = 2;
		}
		if (this.setting.wriCheck == true) {
			n = 3;
		}
	}
	for (i = 0; i < this.indexList.length; i++) {
		index = this.indexList[i];
		$rowData = res[index];
		// +1是因为需要跳过标题栏
		$row = $table.find("tr:eq(" + (i + 1) + ")");
		rowId = this.tableId + "_" + index;
		$row.attr("id", rowId);
		if (this.isCheckMode()) {
			//这种加属性的方式，不能用对象获取，为假选
			//var checked = $rowData.isCheck == true ? "checked" : "";
			var checkbox = $row.find("td:eq(0)").find("input:checkbox");
			checkbox.attr("rowId", rowId);
			//checkbox.attr("checked", checked);
		}
		if (this.isCheckMode()) {
			//var checked = $rowData.indexCheck == true ? "checked" : "";
			var checkbox = $row.find("td:eq(0)").find("input:checkbox");
			checkbox.attr("rowId", rowId);
			//checkbox.attr("checked", checked);
		}
		if (this.isCheckMode()) {
			//var checked = $rowData.redCheck == true ? "checked" : "";
			//td:eq(1)根据指定列设置对应的rowId
			var checkbox = $row.find("td:eq(1)").find("input:checkbox");
			checkbox.attr("rowId", rowId);
			//checkbox.attr("checked", checked);
		}
		if (this.isCheckMode()) {
			//var checked = $rowData.wriCheck == true ? "checked" : "";
			var checkbox = $row.find("td:eq(2)").find("input:checkbox");
			checkbox.attr("rowId", rowId);
			//checkbox.attr("checked", checked);
		}
		cssName = this.getItemCssName(i);
		$row.attr("cssName", cssName);
		$row.attr("class", cssName);
		for (j = 0; j < colCount; j++) {
			colName = this.input.header[j];
			colStr = $rowData.data[colName];
			colType = parseInt(this.input.dataType[colName]);
			if (colType == ABISCode.DBDataType.DB_DATE) {
				content = colStr;
			} else {
				content = this.getColText(colStr);
			}
			if (this.isLinkCol(colName)) {
				$td = $row.find("td:eq(" + (j + n) + ")").find("a");
				$td.attr("rowId", rowId);
			} else {
				$td = $row.find("td:eq(" + (j + n) + ")");
			}
			/*字段过长截取*/
			if(content!=null&&this.getlen(content)>WebTable.CONTENT_LENGTH){
				content_td=content;
				content=this.getSubstr(content,WebTable.CONTENT_LENGTH-4)+"...";
				$td.attr("content",content_td);
                initWebtableLongContent();
			}
			/*字段过长截取 end*/
			$td.text(content);
		}
	}
}

WebTable.prototype.getItemCssName = function(i) {
	var cssName;
	if (i % 2 == 0) {
		cssName = "srow";
	} else {
		cssName = "drow";
	}
	return cssName;
}

WebTable.prototype.initTableHead = function() {
	if (this.input == null)
		return;
	if (this.input.header == null)
		return;

	var $table = $("#" + this.tableId);

	// 表格首先清空
	$table.find("tbody").remove();

	// 创建表头
	var $tr = $("<tr class=\"header\"></tr>");
	$tr.bind("selectstart", function() {
		return false;
	});
	$table.append($tr);
	var colCount = this.input.header.length;
	var $th;
	var colName;
	var colText;
	var thId;

	// 判断表格是否为CHECK类型
	var isCheck = false;
	var indexCheck = false;
	var redCheck = false;
	var wriCheck = false;
	if (this.setting.isCheck == true) {
		isCheck = true;
		$th = $("<th class=\"title normal\"></th>");
		$th.addClass("first_cell");
		$th.addClass("check_min_w");
		var $img = $("<div></div>");
		$th.append($img);
		this.registerHeader($th);
		$tr.append($th);
	}
	if (this.setting.indexCheck == true) {
		isCheck = true;
		$th = $("<th class=\"title normal\"></th>");
		$th.addClass("first_cell");
		$th.addClass("check_min_w");
		var $img = $("<div>"+ +"</div>");
		$th.append($img);
		this.registerHeader($th);
		$tr.append($th);
	}
	if (this.setting.redCheck == true) {
		redCheck = true;
		$th = $("<th class=\"title normal\"></th>");
		$th.addClass("first_cell");
		$th.addClass("check_min_w");
		var $img = $("<div>"+this.setting.redName+"</div>");
		$th.append($img);
		this.registerHeader($th);
		$tr.append($th);
	}
	if (this.setting.wriCheck == true) {
		wriCheck = true;
		$th = $("<th class=\"title normal\"></th>");
		$th.addClass("first_cell");
		$th.addClass("check_min_w");
		var $img = $("<div>"+this.setting.wriName+"</div>");
		$th.append($img);
		this.registerHeader($th);
		$tr.append($th);
	}
	for ( var i = 0; i < colCount; i++) {
		$th = $("<th class=\"title normal \"></th>");
		if (i == 0 && !isCheck) {
			$th.addClass("first_cell");
		}
		if (i == 0 && !indexCheck) {
			$th.addClass("first_cell");
		}
		if (i == 1 && !redCheck) {
			$th.addClass("first_cell");
		}
		if (i == 2 && !wriCheck) {
			$th.addClass("first_cell");
		}
		thId = WebTableKeyName.Header + i;
		$th.attr("id", thId);
		$th.attr("index", i);
		var $img = $("<div></div>");
		$th.append($img);
		colName = this.input.header[i];
		colText = colName;
		if (this.input.headerText != undefined) {
			colText = this.input.headerText[colName];
		}
		var $lab = $("<div></div>");
		$lab.text(colText);
		$lab.attr("class", "headerLab");
		$th.append($lab);
		this.registerHeader($th);
		$tr.append($th);
	}
}

/**
 * 初始化表格结构(禁止外界调用)
 */
WebTable.prototype.initTable = function() {
	if (WebUtil.isNull(this.input))
		return;
	if (WebUtil.isEmpty(this.input.header))
		return;

	this.initTableHead();
	var cssName = null;
	var len = 0;
	if (this.input.result != null) {
		len = this.input.result.length;
	}
	var index;
	var $rowData
	var $row;
	var content = null;
	var content_td = null;
	var colStr;
	var rowId;
	var colType;
	var colName;

	var $table = $("#" + this.tableId);
	var res = this.input.result;
	var header = this.input.header;
	var dateType = this.input.dataType;
	var colCount = header.length;

	var isCheck = false;
	var indexCheck = false;
	var redCheck = false;
	var wriCheck = false;
	if (this.setting.isCheck == true) {
		isCheck = true;
	}
	if (this.setting.indexCheck == true) {
		indexCheck = true;
	}
	if (this.setting.redCheck == true) {
		redCheck = true;
	}
	if (this.setting.wriCheck == true) {
		wriCheck = true;
	}
	for ( var i = 0; i < len; i++) {
		cssName = this.getItemCssName(i);
		index = this.indexList[i];
		$rowData = res[index];
		$row = $("<tr class=\"" + cssName + "\"></tr>");
		rowId = this.tableId + "_" + index;
		$row.attr("id", rowId);
		$row.attr("cssName", cssName);
		$table.append($row);
		this.registerRow($row,this.setting);

		if (isCheck) {
			var td = $("<td class=\"cell\"></td>");
			td.addClass("first_cell");
			var checkBox = $("<input id=\"\" name=\"chk\" type=\"checkbox\" class=\"M_Left_8\"/>");
			var checked = $rowData.isCheck == true ? true : false;
			// var checked = $rowData.isCheck == true ? "checked" : "";
			checkBox.attr("checked", checked);
			checkBox.attr("rowId", rowId);
			td.append(checkBox);
			$row.append(td);
			this.registerCheckBoxListener(checkBox,"isCheck");
		}
		if (indexCheck) {
			var td = $("<td class=\"cell\"></td>");
			td.addClass("first_cell");
			var checkBox = $("<input id=\"\" name=\"chk\" type=\"checkbox\" class=\"M_Left_8\"/>");
			var checked = $rowData.indexCheck == true ? true : false;
			checkBox.attr("checked", checked);
			checkBox.attr("rowId", rowId);
			td.append(checkBox);
			$row.append(td);
			this.registerCheckBoxListener(checkBox,"indexCheck");
		}
		if (redCheck) {
			var td = $("<td class=\"cell\"></td>");
			td.addClass("first_cell");
			var checkBox = $("<input id=\"\" name=\"chk1\" type=\"checkbox\" class=\"M_Left_8\"/>");
			var checked = $rowData.redCheck == true ? true : false;
			checkBox.attr("checked", checked);
			checkBox.attr("rowId", rowId);
			td.append(checkBox);
			$row.append(td);
			this.registerCheckBoxListener(checkBox,"redCheck");
		}
		if (wriCheck) {
			var td = $("<td class=\"cell\"></td>");
			td.addClass("first_cell");
			var checkBox = $("<input id=\"\" name=\"chk2\" type=\"checkbox\" class=\"M_Left_8\"/>");
			var checked = $rowData.wriCheck == true ? true : false;
			checkBox.attr("checked", checked);
			checkBox.attr("rowId", rowId);
			td.append(checkBox);
			$row.append(td);
			this.registerCheckBoxListener(checkBox,"wriCheck");
		}
		for ( var j = 0; j < colCount; j++) {
			colName = header[j];
			colStr = $rowData.data[colName];
			colType = parseInt(dateType[colName]);
			if (colType == ABISCode.DBDataType.DB_DATE) {
				content = colStr;
			} else {
				content = this.getColText(colStr);
			}
			/*字段过长截取*/
			if(content!=null&&this.getlen(content)>WebTable.CONTENT_LENGTH){
				content_td=content;
				content=this.getSubstr(content,WebTable.CONTENT_LENGTH-4)+"...";
			}else{
				content_td=null;
			}
			/*字段过长截取 end*/
			/** 是否为链接 */
			if (!this.isLinkCol(colName)) {
				$td = $("<td class=\"cell cell_min_w\" >" + content + "</td>");
			}else {
				$td = $("<td class=\"cell cell_min_w\"></td>");
				$link = $("<a href=\"#\" class=\"\"></a>");
				$link.attr("colName", colName);
				$link.attr("rowId", rowId);
				$link.text(content);
				$td.append($link);
				this.registerLink($link);
			}
			/*字段过长  悬浮显示*/
			if(content_td!=null){
				$td.attr("content", content_td);
                initWebtableLongContent();
			}
			/*字段过长  悬浮显示 end*/
			if (j == 0 && !isCheck) {
				$td.addClass("first_cell");
			}
			$row.append($td);
		}
	}
}
function initWebtableLongContent (){
	var _this = this;
    var td_showdiv =document.getElementById("td_showdiv");
    var $setTime;
    if(typeof td_showdiv =="undefined " || td_showdiv==null){
        td_showdiv = $("<div class=td_showdiv id=td_showdiv ></div>");
        $(document.body).append(td_showdiv);
        $(document).on('mouseenter','td.cell',function(event){
             var $this=$(this);
            var content_str=$this.attr("content")
            if(typeof content_str =="undefined " || content_str==null ){
                return false;
            }
            $locx=event.pageX+8;
            $locy=event.pageY;
            _this.$setTime=setTimeout(function(){
                $("div#td_showdiv").css("left",$locx).css("top",$locy).text(content_str).slideDown("normal");
            },500);
        }).on('mouseleave','td.cell',function(){
            $("div#td_showdiv").slideUp();
            var $this=$(this);
            var content_str=$this.attr("content")
            if(typeof content_str =="undefined " || content_str==null ){
                return false;
            }
            clearTimeout(_this.$setTime);
        });
    }
}
//判断字符串长度
WebTable.prototype.getlen = function(str) {  
	  var len = 0;  
	  for (var i=0; i<str.length; i++) {  
	    if (str.charCodeAt(i)>127 || str.charCodeAt(i)==94) {  
	       len += 2;  
	     } else {  
	       len ++;  
	     }  
	   }  
	  return len;  
}
//截取字符串
WebTable.prototype.getSubstr = function(str,length) {  
	  var len = 0;  
	  for (var i=0; i<str.length; i++) {  
	    if (str.charCodeAt(i)>127 || str.charCodeAt(i)==94) {  
	       len += 2;  
	     } else {  
	       len ++;  
	     }
	    if(len>=length){
	    	return str.substring(0,i);  
	    }
	   }    
}
WebTable.prototype.registerCheckBoxListener = function(checkbox,check) {
	var nThis = this;
	checkbox.click(function() {
		var rowId = $(this).attr("rowId");
		var arr = rowId.split("_");
		var objIndex = arr[arr.length - 1];
		var row = nThis.input.result[objIndex];
		if(check=="isCheck"){
			row.isCheck = $(this).is(":checked");
		}
		//选中某行时对当前行对应的列操作事件
		if(check=="indexCheck"){
			row.indexCheck = $(this).is(":checked");
			if(row.indexCheck){
				row.redCheck = $(this).is(":checked");
				row.wriCheck = $(this).is(":checked");
			}else{
				row.redCheck = $(this).not(":checked");
				row.wriCheck = $(this).not(":checked");
			}
			checkObj(rowId);
		}else if(check=="redCheck"){
			row.redCheck = $(this).is(":checked");
			if(row.redCheck){
				row.indexCheck = $(this).is(":checked");
			}else{
				
				if(row.wriCheck){
					row.indexCheck = $(this).is(":checked");
				}else{
					row.indexCheck = $(this).not(":checked");
				}
			}
			checkObj1(rowId);
		}else if(check=="wriCheck"){
			row.wriCheck = $(this).is(":checked");
			if(row.wriCheck){
				row.indexCheck = $(this).is(":checked");
			}else{
				
				if(row.redCheck){
					row.indexCheck = $(this).is(":checked");
				}else{
					row.indexCheck = $(this).not(":checked");
				}
			}
			checkObj2(rowId);
		}
	});
}
/** 注册超链接点击事件 */
WebTable.prototype.registerLink = function($link) {
	var nThis = this;
	$link.mouseover(function(e) {
		nThis.moveLink = true;
	});
	$link.mouseout(function(e) {
		nThis.moveLink = false;
	});
	$link.click(function(e) {
		// 选中记录时要将上一次选中的记录样式还原
		var colName = $(this).attr("colName");
		var objId = $(this).attr("rowId");
		var arr = objId.split("_");
		var objIndex = arr[arr.length - 1];
		var row = nThis.getRowByObjIndex(objIndex);

		if (!WebUtil.isNull(nThis.setting)) {
			if (!WebUtil.isNull(nThis.setting.link)) {
				if (WebUtil.isFunction(nThis.setting.link.callBack)) {
					nThis.setting.link.callBack(row, colName);
				}
			}
		}
	});
}

WebTable.prototype.isLinkCol = function(colName) {
	if (WebUtil.isNull(this.setting))
		return false;
	if (WebUtil.isNull(this.setting.link))
		return false;
	if (WebUtil.isNull(this.setting.link.cols))
		return false;
	for ( var i = 0; i < this.setting.link.cols.length; i++) {
		var linkCol = this.setting.link.cols[i];
		if (linkCol == colName) {
			return true;
		}
	}
	return false;
}

WebTable.prototype.isCheckMode = function() {
	var isCheck = false;
	if (this.setting.isCheck == true) {
		isCheck = true;
	}
	if (this.setting.indexCheck == true||this.setting.redCheck == true||this.setting.wriCheck == true) {
		isCheck = true;
	}
	return isCheck
}

WebTable.prototype.changeCheckStatus = function() {
	this.selectIndex = new Array();
	var _checkAll = false;
	for (i = 0; i < this.indexList.length; i++) {
		index = this.indexList[i];
		$rowData = this.input.result[index];
		// +1是因为需要跳过标题栏
		$row = $("#" + this.tableId).find("tr:eq(" + (i + 1) + ")");
		if (this.isCheckMode()) {
			if($rowData.isCheck){
			}else{
				_checkAll = true;
			}
		}
	}
	if(_checkAll){
		this.checkAllRows();
	}else{
		this.deCheckAllRows();
	}
	if (!WebUtil.isNull(this.setting)) {
		if (WebUtil.isFunction(this.setting.changeCheckStatusRegister)) {
			this.setting.changeCheckStatusRegister();
		}
	}
}
WebTable.prototype.registerHeader = function($th) {

	var nThis = this;
	$th.mouseover(function() {
		// $(this).attr("class","title hover");
		// var index = $(this).attr("index");
		// if(nThis.isCheckMode())
		// {
		// if(index == null)
		// {
		// $(this).addClass("first_cell");
		// $(this).addClass("check_min_w");
		// }
		// }
		// else
		// {
		// if(index == 0)
		// {
		// $(this).addClass("first_cell");
		// }
		// }

	});

	$th.mouseout(function() {
		$(this).attr("class", "title normal");
		var index = $(this).attr("index");
		if (nThis.isCheckMode()) {
			if (index == null) {
				$(this).addClass("first_cell");
				$(this).addClass("check_min_w");
			}
		} else {
			if (index == 0) {
				$(this).addClass("first_cell");
			}
		}
	});

	$th.mousedown(function() {
		$(this).attr("class", "title down");
		var index = $(this).attr("index");
		if (nThis.isCheckMode()) {
			if (index == null) {
				$(this).addClass("first_cell");
				$(this).addClass("check_min_w");
			}
		} else {
			if (index == 0) {
				$(this).addClass("first_cell");
			}
		}
	});

	$th.mouseup(function() {
		$(this).attr("class", "title hover");
		var index = $(this).attr("index");
		if (nThis.isCheckMode() && index == null) {
			$(this).addClass("first_cell");
			$(this).addClass("check_min_w");
			if (nThis.order == null) {
				nThis.order = WebTable.ASC;
			} else {
				nThis.order = Math.abs(nThis.order - 1);
			}
			nThis.orderColName = null;
			nThis.sortCheckCol();
			if(nThis.setting.checkAll){
				nThis.changeCheckStatus();
			}
		} else {
			if (index == 0) {
				$(this).addClass("first_cell");
			}
			var tId = $(this).attr("id");
			var colIndex = tId.split("_")[1];
			nThis.orderColName = nThis.input.header[colIndex];
			if (nThis.order == null) {
				nThis.order = WebTable.ASC;
			} else {
				nThis.order = Math.abs(nThis.order - 1);
			}
			nThis.setSort(nThis.orderColName);
		}
	});
}

/**
 * 注册表格行事件
 */
WebTable.prototype.registerRow = function($row,setting) {
	var nThis = this;
	$row.dblclick(function() {
		if (nThis.setting != null) {
			var callBack = nThis.setting.callBack;
			if (callBack != undefined) {
				if (callBack.dbClick != undefined) {
					// 获取选中的行
					var row = nThis.getSelectItem();
					var rows = new Array();
					rows.push(row);
					if(setting.noClick){
						//有的页面不需要双击调用callBack函数,则设置tableSetting的noClick:true
					}else{
						callBack.dbClick(rows);
					}
				}
			}
		}
	});
	$row.mouseover(function() {
		var rowIndex = $(this).attr("id");
		if ($(this).attr("class") != "rowdown") {
			// $(this).attr("class","rowhover");
			$(this).addClass("rowhover");
		}
	});
	$row.mouseout(function() {
		var rowIndex = $(this).attr("id");
		var cssName = $(this).attr("cssName");
		if ($(this).attr("class") != "rowdown") {
			// $(this).attr("class",cssName);
			$(this).removeClass("rowhover");
		}
	});
	$row.mousedown(function(e) {
		if (e.button == 1 || e.button == 0)// 左键
		{
			if (nThis.moveLink == true) {
				return;
			}
			// 选中记录时要将上一次选中的记录样式还原
			var objId = $(this).attr("id");
			var arr = objId.split("_");
			var objIndex = arr[arr.length - 1];

			var multi = false;
			if (!WebUtil.isNull(nThis.setting)) {
				multi = nThis.setting.multiSelect;
			}
			if (multi == true && e.ctrlKey == true) {
				if ($(this).attr("class") == "rowdown") {
					nThis.ctrlKeyDeSelect($(this), objIndex);
				} else {
					nThis.ctrlKeySelect($(this), objIndex);
				}
				nThis.isShiftKey = false;
			} else if (multi == true && e.shiftKey == true) {
				nThis.shiftKeySelect(objIndex);
				nThis.isShiftKey = true;
			} else {
				nThis.singleSelect($(this), objIndex);
				nThis.isShiftKey = false;
			}
		}
	});
}

/** 设置表格是否可以多选 */
WebTable.prototype.setMutilSelect = function(mutil) {
	if (WebUtil.isNull(this.setting))
		return;
	this.setting.multiSelect = mutil;
}

/** 设置排序的列名称 */
WebTable.prototype.setSortColName = function(colName) {
	if (WebUtil.isNull(colName))
		return;
	if (WebUtil.isNull(this.setting)) {
		this.setting = {};
	}
	if (WebUtil.isNull(this.setting.sort)) {
		this.setting.sort = {};
	}
	this.setting.sort.colName = colName;
	this.orderColName = colName;

}

/** 设置排序类型 */
WebTable.prototype.setSortOrder = function(order) {
	if (WebUtil.isNull(order))
		return;
	if (WebUtil.isNull(this.setting)) {
		this.setting = {};
	}
	if (WebUtil.isNull(this.setting.sort)) {
		this.setting.sort = {};
	}
	this.setting.sort.order = order;
	this.order = order;
}

/**
 * 按下CTRL键选择(外界禁止调用)
 */
WebTable.prototype.ctrlKeySelect = function($row, selectIndex) {
	this.selectRow($row, selectIndex);
}

/**
 * 按下CTRL键取消选中(外界禁止调用)
 */
WebTable.prototype.ctrlKeyDeSelect = function($row, selectIndex) {
	this.deSelectObj(selectIndex);
	var index = -1;
	for ( var i = 0; i < this.selectIndex.length; i++) {
		if (this.selectIndex[i] == selectIndex) {
			index = i;
			break;
		}
	}
	if (index < 0)
		return;
	this.selectIndex.splice(index, 1);
}

/**
 * 按下SHIFT键选中行(外界禁止调用)
 */
WebTable.prototype.shiftKeySelect = function(selectObjIndex) {
	if (this.selectIndex == null)
		return;
	// 如果上一次选择数据使用的是CTRL键则取最后一个选中的索引，默认取第一个被选中的索引
	var startIndex = this.selectIndex.length - 1;
	if (this.isShiftKey == true) {
		startIndex = 0;
	}
	var fristObjIndex = this.selectIndex[startIndex];
	var fristRowIndex = -1;
	var curRowIndex = -1;

	for ( var i = 0; i < this.indexList.length; i++) {
		if (this.indexList[i] == selectObjIndex) {
			curRowIndex = i;
		} else if (this.indexList[i] == fristObjIndex) {
			fristRowIndex = i;
		}
		if (curRowIndex != -1 && fristRowIndex != -1) {
			break;
		}
	}
	if (curRowIndex < 0 || fristRowIndex < 0)
		return -1;

	// 确定本次选中行的起始和结束位置
	var start, end;
	if (curRowIndex > fristRowIndex) {
		start = fristRowIndex;
		end = curRowIndex;
	} else {
		start = curRowIndex;
		end = fristRowIndex;
	}

	// 取消选中其他不在范围内的行
	var rowIndex;
	for ( var i = 0; i < this.selectIndex.length; i++) {
		var sIndex = this.selectIndex[i];
		rowIndex = -1;
		for ( var j = 0; j < this.indexList.length; j++) {
			if (this.indexList[j] == sIndex) {
				rowIndex = j;
				break;
			}
		}
		if (rowIndex < 0)
			continue;
		if (rowIndex < start || rowIndex > end) {
			// 需要取消选中状态
			this.deSelectRow(rowIndex);
		}
	}

	// 选中在范围内的行将索引添加到数组中
	var arr = new Array();
	if (fristRowIndex > curRowIndex) {
		for ( var i = fristRowIndex; i >= curRowIndex; i--) {
			arr.push(i);
		}
	} else {
		for ( var i = fristRowIndex; i <= curRowIndex; i++) {
			arr.push(i);
		}
	}

	this.setSelectIndices(arr);
}

/**
 * 单行选择(外界禁止调用)
 */
WebTable.prototype.singleSelect = function($row, selectObjId) {
	this.deSelectAll();
	this.selectRow($row, selectObjId);
}

/**
 * 选择一行数据并发送通知(外部禁止调用)
 */
WebTable.prototype.selectRow = function($row, objIndex) {
	// 本次选择的记录设置
	if (WebUtil.isEmpty(this.selectIndex)) {
		this.selectIndex = new Array();
	}
	this.selectIndex.push(objIndex);
	// $row.attr("class","rowdown");
	$row.addClass("rowdown");

	// 通知外界单击
	if (this.setting != null) {
		var callBack = this.setting.callBack;
		if (callBack != undefined) {
			if (callBack.onClick != undefined) {
				// 获取选中的行
				var row = this.getSelectItem();
				callBack.onClick(row);
			}
		}
	}

}

/**
 * 取消某一行的选中状态
 */
WebTable.prototype.deSelectRow = function(rowIndex) {
	if (rowIndex < 0 || rowIndex > this.indexList.length - 1)
		return;
	var objIndex = this.indexList[rowIndex];
	var rowId = this.tableId + "_" + objIndex;
	$row = $("#" + rowId);
	var cssName = $row.attr("cssName");
	$row.attr("class", cssName);
	$row.removeClass("rowdown");
}

/**
 * 取消某一行的选中状态
 */
WebTable.prototype.deSelectObj = function(objIndex) {
	if (objIndex < 0)
		return;
	var rowId = this.tableId + "_" + objIndex;
	$row = $("#" + rowId);
	var cssName = $row.attr("cssName");
	// $row.attr("class",cssName);
	$row.removeClass("rowdown");
}

WebTable.prototype.deSelectAll = function() {
	if (this.selectIndex != null) {
		for ( var i = 0; i < this.selectIndex.length; i++) {
			var objIndex = this.selectIndex[i];
			var objId = this.tableId + "_" + objIndex;
			$row = $("#" + objId);
			$row.removeClass("rowdown");
		}
		this.selectIndex = new Array();
	}
}

/**
 * 获取表格数据的总行数
 */
WebTable.prototype.getRowCount = function() {
	if (this.input == null)
		return 0;
	if (this.input.result == null)
		return 0;
	return this.input.result.length;
}

/**
 * 获取第一个勾选CheckBox行的对象索引
 */
WebTable.prototype.getCheckObjIndex = function() {
	if (this.input.result == null)
		return null;
	var index = null;
	for ( var i = 0; i < this.indexList.length; i++) {
		var idx = this.indexList[i];
		var row = this.input.result[idx];
		if (row.isCheck) {
			index = idx;
			break;
		}
	}
	return index;
}

/**
 * 获取所有勾选CheckBox行的对象索引
 */
WebTable.prototype.getCheckObjIndices = function() {
	if (this.input.result == null)
		return null;
	var indices = new Array();
	for ( var i = 0; i < this.indexList.length; i++) {
		var idx = this.indexList[i];
		var row = this.input.result[idx];
		if (row.isCheck) {
			indices.push(idx);
		}
		if (row.indexCheck==true) {//当选中行有多列checkbox的时候,勾选CheckBox行的对象索引
			indices.push(idx);
		}
		else if (row.redCheck==true) {
			indices.push(idx);
		}
		else if (row.wriCheck==true) {
			indices.push(idx);
		}
	}
	return indices;
}

/**
 * 获取第一个勾选CheckBox的行索引
 */
WebTable.prototype.getCheckRowIndex = function() {
	if (this.input.result == null)
		return null;

	var index = null;
	for ( var i = 0; i < this.indexList.length; i++) {
		var idx = this.indexList[i];
		var row = this.input.result[idx];
		if (row.isCheck) {
			index = i;
			break;
		}
	}
	return index;
}

/**
 * 获取所有勾选CheckBox的行索引
 */
WebTable.prototype.getCheckRowIndices = function() {
	if (this.input.result == null)
		return null;

	var indices = new Array();
	for ( var i = 0; i < this.indexList.length; i++) {
		var idx = this.indexList[i];
		var row = this.input.result[idx];
		if (row.isCheck) {
			indices.push(i);
		}
	}
	return indices;
}

/**
 * 获取当前选中行的对象索引
 */
WebTable.prototype.getSelectObjIndex = function() {
	if (this.selectIndex == null || this.selectIndex.length <= 0)
		return null;
	var objIndex = this.selectIndex[0];
	return objIndex;
}

/**
 * 获取选中的所有行的对象索引
 */
WebTable.prototype.getSelectObjIndices = function() {
	return this.selectIndex;
}

/**
 * 获取当前选中行的索引
 */
WebTable.prototype.getSelectIndex = function() {
	if (this.selectIndex == null || this.selectIndex.length <= 0)
		return null;
	var objIndex = this.selectIndex[0];
	var index = null;
	for ( var i = 0; i < this.indexList.length; i++) {
		if (this.indexList[i] == objIndex) {
			index = i;
			break;
		}
	}
	return index;
}

/**
 * 获取选中的所有行的索引
 */
WebTable.prototype.getSelectIndices = function() {
	if (this.selectIndex == null || this.selectIndex.length <= 0)
		return null;
	var indices = new Array();
	for ( var i = 0; i < this.selectIndex.length; i++) {
		var index = this.selectIndex[i];
		for ( var j = 0; j < this.indexList.length; j++) {
			if (this.indexList[j] == index) {
				indices.push(j);
				break;
			}
		}
	}
	return indices;
}

/**
 * 获取勾选的第一行数据
 */
WebTable.prototype.getCheckItem = function() {
	var objIndex = this.getCheckObjIndex();
	var row = this.getRowByObjIndex(objIndex);
	return row;
}

/**
 * 获取勾选的所有行数据
 */
WebTable.prototype.getCheckItems = function() {
	var objIdxs = this.getCheckObjIndices();
	if (objIdxs == null)
		return null;
	var rows = new Array();
	for ( var idx in objIdxs) {
		var row = this.getRowByObjIndex(objIdxs[idx]);
		if (row != null) {
			rows.push(row);
		}
	}
	return rows;
}

/**
 * 获取勾选的所有行多个复选框数据
 */
WebTable.prototype.getCheckItemsStatus = function() {
	var objIdxs = this.getCheckObjIndices();
	if (objIdxs == null)
		return null;
	var rows = new Array();
	var res = this.input.result;
	for ( var idx in objIdxs) {
		var rowData = res[objIdxs[idx]];
		if (rowData != null) {
			rows.push(rowData);
		}
	}
	return rows;
}

/**
 * 获取选中的一行数据(当表格为多选时返回最后一次选中的行的数据)
 */
WebTable.prototype.getSelectItem = function() {
	if (this.selectIndex == null)
		return null;
	if (this.selectIndex.length <= 0)
		return null;
	var objIndex = this.selectIndex[this.selectIndex.length - 1];
	var row = this.getRowByObjIndex(objIndex);
	return row;
}

/**
 * 获取选中的所有行数据
 * Boolean plus 是否要额外返回 字典类型的文本信息
 */
WebTable.prototype.getSelectItems = function(plus) {
	if (this.selectIndex == null)
		return null;
	var rows = new Array();
	if(plus){
		for ( var i = 0; i < this.selectIndex.length; i++) {
			var row = this.getRowDataPlus(this.selectIndex[i]);
			if (row != null) {
				rows.push(row);
			}
		}	
	}else{
		for ( var i = 0; i < this.selectIndex.length; i++) {
			objIndex = this.selectIndex[i];
			var row = this.getRowByObjIndex(objIndex);
			if (row != null) {
				rows.push(row);
			}
		}		
	}
	
	return rows;
}

/**
 * 获取表格内所有的数据
 */
WebTable.prototype.getAllItems = function() {
	if (WebUtil.isEmpty(this.indexList))
		return null;

	var rows = new Array();
	for ( var i = 0; i < this.indexList.length; i++) {
		//objIndex = this.indexList[i];
		var row = this.getRowByObjIndex(i);
		if (row != null) {
			rows.push(row);
		}
	}
	return rows;
}

/**
 * 查找数据
 */
WebTable.prototype.findData = function(custom) {
	if (WebUtil.isNull(this.input))
		return null;
	if (WebUtil.isEmpty(this.input.header))
		return null;
	if (WebUtil.isEmpty(this.input.result))
		return null;
	if (WebUtil.isEmpty(this.indexList))
		return null;

	var items = new Array();
	var objIndex;
	var rowData;
	var extData;
	var colName;
	var value;
	var obj;
	for ( var i = 0; i < this.indexList.length; i++) {
		objIndex = this.indexList[i];
		rowData = this.input.result[objIndex].data;
		extData = this.input.result[objIndex].extData;

		var b = true;
		for ( var j = 0; j < this.input.header.length; j++) {
			colName = this.input.header[j];
			obj = rowData[colName];
			value = null;
			if (obj != null) {
				obj += "";
				var arr = obj.split(WebTable.splitChar);
				value = arr[0];
			}
			if (custom[colName] && custom[colName] != value) {
				b = false;
				break;
			}
		}
		if (b) {
			items.push(objIndex);
		}
		if (extData != undefined) {
			items.extData = extData;
		}
	}
	return items;
}
/**
 * 判断数据是否存在
 */
WebTable.prototype.isExist = function(custom) {
	var indexs = this.findData(custom);
	if (indexs && indexs.length > 0) {
		return true;
	} else {
		return false;
	}
}
WebTable.prototype.find = function(custom) {
	return this.findData(custom);
}

/**
 * 输入list(索引)删除列 objindex
 */
WebTable.prototype.deleteRow = function(index) {
	this.indexList.splice(index, 1);
	this.input.result.splice(index, 1);
	$("#" + this.id + "_table_" + index).remove();
}

/**
 * 根据给定的对象索引构造该行数据
 * 
 * @param objIndex
 */
WebTable.prototype.getRowByObjIndex = function(objIndex) {
	if (objIndex == null)
		return null;
	if (this.input == null)
		return null;
	var res = this.input.result;
	if (res.length == 0)
		return null;

	var rowData = res[objIndex].data;
	var extData = res[objIndex].extData;
	var row = new Array();
	for ( var i = 0; i < this.input.header.length; i++) {
		var colName = this.input.header[i];
		var obj = rowData[colName];
		var value = null;
		if (obj != null) {
			obj += "";
			var arrValue = obj.split(WebTable.splitChar);
			value = arrValue[0];
		}
		row[colName] = value;
	}
	if (extData != undefined) {
		row.extData = extData;
	}
	return row;
}

/**
 * 获取指定行的数据
 * 
 * @param {Object}
 *            index 表格的索引
 */
WebTable.prototype.getRow = function(index) {
	if (index == null)
		return null;
	var objIndex = this.indexList[index];
	return this.getRowByObjIndex(objIndex);
}

/**
 * 获取指定行的数据
 * 
 * @param {Object}
 * 多返回 代码中文值的属性
 *            index 表格的索引
 */
WebTable.prototype.getRowDataPlus = function(index) {
	if (index == null)
		return null;
	var objIndex = this.indexList[index];
	var data1 =$.extend(true, {}, this.getRowByObjIndex(objIndex));
	var data2 =this.input.result[objIndex].data;
	for ( var j = 0; j < this.input.header.length; j++) {
		var colName = this.input.header[j];
		var value1 = data1[colName]
		var value2 = data2[colName]
		if(value1!=value2){
			data1[colName+"Text"] = value2.split(WebTable.splitChar)[1]
		}
	}
	
	return data1;
}
/**
 * 获取指定行的数据(code)
 * 
 * @param {Object}
 *            index 表格的索引
 *  return  code
 */
WebTable.prototype.getRowData = function(index) {
	if (index == null)
		return null;
	var objIndex = this.indexList[index];
	var data1 =$.extend(true, {}, this.getRowByObjIndex(objIndex));
	var data2 =this.input.result[objIndex].data;
	for ( var j = 0; j < this.input.header.length; j++) {
		var colName = this.input.header[j];
		var value1 = data1[colName]
		var value2 = data2[colName]
		if(value1!=value2){
			data1[colName] = value2.split(WebTable.splitChar)[0]
		}
	}
	
	return data1;
}
/**
 * 
 * @param index  表格的索引
 * @param colName
 * @param colValue
 * @param colText
 */
WebTable.prototype.setColValue = function(index, colName, colValue, colText) {
	var objIndex = this.indexList[index];
	var rowData = this.input.result[objIndex].data;
	if (rowData == null)
		return;
	var cName = null;
	var header = this.input.header;
	for ( var i = 0; i < header.length; i++) {
		if (header[i] == colName) {
			cName = colName;
			break;
		}
	}
	if (cName == null)
		return;
	if (WebUtil.isNull(colText)) {
		colText = "";
	}
	var str = colValue + WebTable.splitChar + colText;
	rowData[cName] = str;
	this.refreshRow(index);
}

/**
 * 添加选中一行
 * 
 * @param {Object}
 *            index 表格的索引
 */
WebTable.prototype.setSelectObjRow = function(n) {
	var $table = $("#" + this.id + "_table");
	var $tBody = $table.find("TBODY");
	var rowIndex = -1;
	for ( var i = 0; i < this.indexList.length; i++) {
		if (this.indexList[i] == n) {
			rowIndex = i;
			break;
		}
	}
	if (rowIndex < 0)
		return -1;

	var tableIndex = rowIndex + 1;// 将<TH>标记跳过
	var $row = $tBody.find("tr:eq(" + tableIndex + ")");

	// 从索引表中取出对象
	if (rowIndex > this.indexList.length - 1)
		return;

	this.selectIndex.push(n);
	// $row.attr("class","rowdown");
	$row.addClass("rowdown");
}

/**
 * 设置选中多行
 * 
 * @param {Object}
 *            index 表格的索引
 */
WebTable.prototype.setSelectIndices = function(indices) {
	var $table = $("#" + this.id + "_table");
	var $tBody = $table.find("TBODY");
	this.selectIndex = new Array();
	for ( var i = 0; i < indices.length; i++) {
		var index = indices[i];
		var tIndex = index + 1;
		var $row = $tBody.find("tr:eq(" + tIndex + ")");
		// 从索引表中取出对象
		if (index > this.indexList.length - 1)
			continue;
		var objIndex = this.indexList[index];
		this.selectIndex.push(objIndex);
		// $row.attr("class","rowdown");
		$row.addClass("rowdown");
	}
}

/**
 * 设置选中一行（互斥）
 * 
 * @param {Object}
 *            index 表格的索引
 */
WebTable.prototype.setSelectIndex = function(index) {
	if(this.indexList.length <index) return;
	var $table = $("#" + this.id + "_table");
	var $tBody = $table.find("TBODY");
	var i = index + 1;
	var $row = $tBody.find("tr:eq(" + i + ")");
	// 取消所有选中
	this.deSelectAll();
	// 从索引表中取出对象
	if (index > this.indexList.length - 1)
		return;
	var objIndex = this.indexList[index];
	this.selectIndex = new Array();
	this.selectIndex.push(objIndex);
	$row.addClass("rowdown");

}

WebTable.prototype.getShowCols = function() {
	// TODO 以后做好自定义显示列，以及显示顺序再做进一步筛选
	return this.input.header;
}

WebTable.prototype.setHeight = function(height) {
	this.parent.height(height);
}

WebTable.prototype.getHeight = function() {
	return this.parent.height();
}

WebTable.prototype.getOrder = function() {
	return this.order;
}

WebTable.prototype.getOrderName = function() {
	return this.orderColName;
}

var swapItems = function(arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
    return arr;
};

var swapToTop = function(arr, index1) {
	var tmp =  arr.splice(index1, 1)
	arr.unshift(tmp[0]);
    return arr;
};

var swapToBottom = function(arr, index1) {
	var tmp =  arr.splice(index1, 1)
	arr.push(tmp[0]);
    return arr;
};

WebTable.prototype.findRowIndex = function(index) {
	var $table = $("#" + this.id + "_table");
	var $tBody = $table.find("TBODY");
	var rowIndex = -1;
	
	for ( var i = 0; i < this.indexList.length; i++) {
		var rowId = $tBody.find("tr:eq(" + (i+1)+ ")").attr("id");
		var arr = rowId.split("_");
		var objIndex = arr[arr.length - 1];
		var objIndex = this.indexList[objIndex];
		if(objIndex == index)
		{
			rowIndex = i;
			break;
		}
	}
	return rowIndex;
}

WebTable.prototype.up = function() {
	var rowIndex = this.getSelectIndex();
	if(rowIndex<1) return false;
	var $table = $("#" + this.tableId);
	var $tBody = $table.find("TBODY");
	var i = rowIndex + 1;
	var $tr = $tBody.find("tr:eq(" + i + ")");
	if ($tr.index() > 1) {
		$tr.fadeOut().fadeIn();
		var $prev = $tr.prev();
		$tr.prev().before($tr);
		//swapItems(this.input.result, rowIndex, rowIndex-1);
		swapItems(this.indexList, rowIndex, rowIndex-1);
		this.setSelectIndex(rowIndex - 1);
	}
}

WebTable.prototype.down = function() {
	var rowIndex = this.getSelectIndex();
	if (rowIndex >= this.indexList.length - 1)
		return;
	var $table = $("#" + this.tableId);
	var $tBody = $table.find("TBODY");
	var i = rowIndex + 1;
	var $tr = $tBody.find("tr:eq(" + i + ")");
	var len = this.indexList.length;
	if ($tr.index() < len) {
		$tr.fadeOut().fadeIn();
		$tr.next().after($tr);
		swapItems(this.indexList, rowIndex, rowIndex+1);
		this.setSelectIndex(rowIndex + 1);
	}
}

WebTable.prototype.top = function() {
	var rowIndex = this.getSelectIndex();
	if(rowIndex == 0) return;
	var $table = $("#" + this.tableId);
	var $tBody = $table.find("TBODY");
	var i = rowIndex + 1;
	var $tr = $tBody.find("tr:eq(" + i + ")");
	var $first_tr = $tBody.find("tr:eq(0)");
	if ($tr.index() > 1) {
		$tr.fadeOut().fadeIn();
		$tr.insertAfter($first_tr);
		swapToTop(this.indexList,rowIndex);
		this.setSelectIndex(0);
	}
}

WebTable.prototype.bottom = function() {
	var rowIndex = this.getSelectIndex();
	if (rowIndex == this.indexList.length - 1)
		return;
	var $table = $("#" + this.tableId);
	var $tBody = $table.find("TBODY");
	var i = rowIndex + 1;
	var $tr = $tBody.find("tr:eq(" + i + ")");
	$tr.fadeOut().fadeIn();
	$tr.appendTo($table);
	var len = this.indexList.length;
	swapToBottom(this.indexList,rowIndex);
	this.setSelectIndex(this.indexList.length-1);
}
/*勾选 全选*/
WebTable.prototype.checkAllRows= function() {
	if (this.input.result == null)
		return null;
	var indices = new Array();
	for ( var i = 0; i < this.indexList.length; i++) {
		var idx = this.indexList[i];
		var row = this.input.result[idx];
		row.isCheck=true;
		var $table = $("#" + this.tableId);
		var $tBody = $table.find("TBODY");
		var $tr = $tBody.find("tr:eq(" + (i+1) + ")");
		$tr.find('input').first().prop("checked", row.isCheck);
	}
}
/*全部取消选择*/
WebTable.prototype.deCheckAllRows= function() {
	if (this.input.result == null)
		return null;

	var indices = new Array();
	for ( var i = 0; i < this.indexList.length; i++) {
		var idx = this.indexList[i];
		var row = this.input.result[idx];
		row.isCheck=false;
		var $table = $("#" + this.tableId);
		var $tBody = $table.find("TBODY");
		var $tr = $tBody.find("tr:eq(" + (i+1) + ")");
		$tr.find('input').first().prop("checked", row.isCheck);
	}
}
/*勾选  反选*/
WebTable.prototype.checkInvertRows= function() {
	if (this.input.result == null)
		return null;
	var indices = new Array();
	for ( var i = 0; i < this.indexList.length; i++) {
		var idx = this.indexList[i];
		var row = this.input.result[idx];
		row.isCheck = !row.isCheck
		var $table = $("#" + this.tableId);
		var $tBody = $table.find("TBODY");
		var $tr = $tBody.find("tr:eq(" + (i+1) + ")");
		$tr.find('input').first().prop("checked", row.isCheck);
	}
	return indices;
}
/* 检查选中当前行其他必选参数事件 */
function registerCheckBoxsListener(checkbox,check,row,rowId)
{
	if(check=="indexCheck"){
		row.indexCheck = $(this).is(":checked");
		if(row.indexCheck){
			row.redCheck = $(this).is(":checked");
			row.wriCheck = $(this).is(":checked");
		}else{
			row.redCheck = $(this).not(":checked");
			row.wriCheck = $(this).not(":checked");
		}
		checkObj(rowId);
	}else if(check=="redCheck"){
		row.redCheck = $(this).is(":checked");
		if(row.redCheck){
			row.indexCheck = $(this).is(":checked");
		}else{
			
			if(row.wriCheck){
				row.indexCheck = $(this).is(":checked");
			}else{
				row.indexCheck = $(this).not(":checked");
			}
		}
		checkObj1(rowId);
	}else if(check=="wriCheck"){
		row.wriCheck = $(this).is(":checked");
		if(row.wriCheck){
			row.indexCheck = $(this).is(":checked");
		}else{
			
			if(row.redCheck){
				row.indexCheck = $(this).is(":checked");
			}else{
				row.indexCheck = $(this).not(":checked");
			}
		}
		checkObj2(rowId);
	}
}
function checkObj(rowId)
{
	 var check = false;
     $(":checkbox[name='chk']").each(function () {
        if($(this).attr('rowid')==rowId){
        	if($(this).is(':checked')){
        		check = true;
        	}else{
        		check = false;
        	}
        }
     })
    $(":checkbox[name='chk1']").each(function () {
    	 if($(this).attr('rowid')==rowId){
         	if(check){
         		$(this).prop("checked",true);
         	}else{
         		$(this).prop("checked",false);
         	}
         }
     })
     $(":checkbox[name='chk2']").each(function () {
    	 if($(this).attr('rowid')==rowId){
         	if(check){
         		$(this).prop("checked",true);
         	}else{
         		$(this).prop("checked",false);
         	}
         }
     })
     
} 
function checkObj1(rowId)
{
	var check = false ;
	$(":checkbox[name='chk1']").each(function () {
        if($(this).attr('rowid')==rowId){
        	if($(this).is(':checked')){
        		check = true;
        	}
        }
     })
     $(":checkbox[name='chk']").each(function () {
        if($(this).attr('rowid')==rowId){
        	if(check){
        		$(this).prop("checked",true);
        	}else{
        		$(":checkbox[name='chk2']").each(function () {
        	        if($(this).attr('rowid')==rowId){
        	        	if($(this).is(':checked')){
        	        		check = true;
        	        	}else{
        	        		check = false;
        	        	}
        	        }
        	     })
        	     if(check){
        	    	$(this).prop("checked",true);
        	     }else{
        	    	 $(this).prop("checked",false);
        	     }
        	}
        }
     })
} 
function checkObj2(rowId)
{
	var check = false ;
	$(":checkbox[name='chk2']").each(function () {
        if($(this).attr('rowid')==rowId){
        	if($(this).is(':checked')){
        		check = true;
        	}
        }
     })
     $(":checkbox[name='chk']").each(function () {
        if($(this).attr('rowid')==rowId){
        	if(check){
        		$(this).prop("checked",true);
        	}else{
        		$(":checkbox[name='chk1']").each(function () {
        	        if($(this).attr('rowid')==rowId){
        	        	if($(this).is(':checked')){
        	        		check = true;
        	        	}else{
        	        		check = false;
        	        	}
        	        }
        	     })
        	     if(check){
        	    	 $(this).prop("checked",true);
        	     }else{
        	    	 $(this).prop("checked",false);
        	     }
        	}
        }
     })
}