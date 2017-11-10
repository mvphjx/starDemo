//文本编辑模式(编辑|更新|只读)
var TxtMode = {
    INPUT: 0,
    EDIT: 1,
    VIEW: 2
};
//保存初始赋值
EditPage.prototype.srcObject = {};
EditPage.prototype.requiredField = null;
EditPage.prototype.updateField = null;
EditPage.prototype.mode = null;
EditPage.prototype.type = null;
EditPage.prototype.splitChar = '_And_';
EditPage.prototype.tableMaxRow = 20;
EditPage.prototype.columns = null;//初始化编辑控件所包含的列
//为了实现单例,外界不要修改
EditPage.prototype.unique = null;
//候选指位 时间问题，checkbox控件未抽象出统一操作的对象，先特殊处理 
EditPage.prototype.candFgps = null;
//普通控件缓存数组
EditPage.prototype.webInputArr = [];
//表格控件缓存数组
EditPage.prototype.webTableArr = [];
//表格控件填写 需要一些字段 unique
EditPage.prototype.webTableUniqueCols = [];
//一些字段 需要展示 代码值而不是文本
EditPage.prototype.showCodeCols = [];
function EditPage(requiredField, updateField, defValue, columnlengths, type, mode,columns) {
	if(!WebUtil.isNull(EditPage.prototype.unique)) {
		return EditPage.prototype.unique;
	}
	EditPage.prototype.unique = this;
	this.requiredField = requiredField;
	this.updateField = updateField;
	this.defValue = defValue;
	this.mode = mode;
	this.type = type;
	this.columns = columns;
	this.init();
	if(type>=0){
			$(document).ready(function(){
	    		$(document).bind("contextmenu",function(e){
	          		return false;
	    		});
			});
	}
}

/*缓存&字典项置空*/
EditPage.prototype.initCache = function(contro) {
		if(WebUtil.isNull(contro)) {
			return;
		}
		var type = contro.constructor;
		if(type == WebInput) {
			this.webInputArr.push(contro);
			if(!WebUtil.isNull(contro.columnName)) {
				contro.setComboData(null)
			}
		} else if(type == WebTableMgr) {
			this.webTableArr.push(contro);
		}

	}
	//保存传入的id值，更新时返回
EditPage.prototype.upDataTemp = {};
/*
 * 给表单赋值
 */
EditPage.prototype.setObject = function(jsonData) {
	if(WebUtil.isNull(jsonData)) {
		return;
	} else if(typeof jsonData == 'string') {
		jsonData = eval('(' + jsonData + ')');
	}
	//普通控件
	var arrObject = this.webInputArr;
	var srcObject = this.srcObject;
	var _this = this;
	for(var i = 0, l = arrObject.length; i < l; i++) {
		var control = arrObject[i];
		var id = control.getId()
		var data = getJson(id, this.splitChar)
		if(!WebUtil.isNull(control.type) && control.type == 'Date' && !WebUtil.isNull(data)) {
			//日期格式转换
			if(data.indexOf("-") > -1) {
				data = data.replace(/(\d{4}).(\d{1,2}).(\d{1,2}).+/mg, function($0, $1, $2, $3) {
					if($2.length == 1) {
						$2 = '0' + $2
					}
					if($3.length == 1) {
						$3 = '0' + $3
					}
					return $1 + $2 + $3
				});
			}
		}
		if(WebUtil.isNull(data)) {
			control.clear();
		}else{
			control.setValue(data);
		}


	}
	//表格控件
	for(var i = 0, l = this.webTableArr.length; i < l; i++) {
		var webTable = this.webTableArr[i];
		var data = getJson(webTable.tblId, this.splitChar)
		if(WebUtil.isNull(data)) {
			//根据数据隐藏显示表格控件
			$('#' + webTable.tblId).parent().hide()
		} else {
			$('#' + webTable.tblId).parent().show()
		}
		this.setTableData(webTable, this.webInputArr, data, this);
	}
	//候选指位单独处理 checkbox
	if(!WebUtil.isNull(this.candFgps)) {
		var data = getJson(this.candFgps.id, this.splitChar)
		this.setCandFgpsData(data);
	}
	//缓存id
	createUpDataTemp(this.upDataTemp, jsonData);
	//开始监听
	this.Txtchange();

	function getJson(id, splitChar) {
		var arr = new Array();
		arr = id.split(splitChar);
		var data = jsonData;
		for(var i = 0; i < arr.length; i++) {
			if(data[arr[i]] != undefined) {
				data = data[arr[i]]
			} else {
				data = null;
				break
			}
		}
		//缓存初始值，检测是否改变
		srcObject[id] = data;
		return data;
	}
	//创建id的缓存模板
	function createUpDataTemp(upDataTemp, jsonDate) {
		$.each(jsonDate, function(name, obj) {
			if(obj instanceof Array) {
				//目前数组json中没有id，就不处理了
			} else if(typeof obj == "string" || typeof obj == "number") {
				if(name.toUpperCase() == 'ID') {
					upDataTemp[name] = obj;

				}
			} else if(obj instanceof Object) {
				upDataTemp[name] = {};
				createUpDataTemp(upDataTemp[name], obj)
			}
		});
	}
}
/*
 *获取表单值  json对象
 */
EditPage.prototype.getJsonObject = function() {
	var jsonData = $.extend(true, {}, this.upDataTemp);
	//普通控件
	var arrObject = this.webInputArr;
	for(var i = 0, l = arrObject.length; i < l; i++) {
		var control = arrObject[i];
		var id  = control.getId()
		var value = control.getValue();
		if(!WebUtil.isNull(control.type) && control.type == 'CodeText') {
			//字典关联框，获取完整信息
			value = control.getText();
		}
		createJson(id, value, this.splitChar);
	}
	//表格控件
	for(var i = 0, l = this.webTableArr.length; i < l; i++) {
		var webTable = this.webTableArr[i];
		createJson(webTable.tblId, this.getTableData(webTable), this.splitChar)
	}
	//候选指位单独处理 checkbox
	if(!WebUtil.isNull(this.candFgps)) {
		if(!WebUtil.isNull(this.candFgps.id)) {
			createJson(this.candFgps.id, this.getCandFgpsData(), this.splitChar)
		}
	}
	return jsonData;

	function createJson(id, value, splitChar) {
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
/*
 *获取表单值  字符串
 */
EditPage.prototype.getObject = function() {
		return JSON.stringify(this.getJsonObject());
	}
	/**
		初始化
		控件
		字典
		编辑状态
	*/
EditPage.prototype.init = function() {
	this.initUI();
	this.initComboData();
	this.initUIStatus();
	this.initTable();
	//this.initDefault();
	//开始监听
	this.Txtchange();
}
/**
 *
 * @param {Object} mode 编辑状态（新增还是编辑）
 * @param {Object} cols 需要操作的控件的setting id
 */
EditPage.prototype.initUIStatus = function(mode,cols) {
        if(mode||mode===0){
			this.mode = mode;
		}
		if(this.mode == TxtMode.EDIT) {
			for(var i in cols){
				var control = this.getControlById(cols[i])
				control.setEditable(false);
			}
		}else{
			for(var i in cols){
				var control = this.getControlById(cols[i])
				control.setEditable(true);
			}
		}
	}
	/*
	 * 根据页面div  生成控件
	 */
EditPage.prototype.initUI = function() {
		this.filedMap = {};
		//页面控件 的 容器
		this.crolArray = new Array();
		//必填项
		this.requiredMap = new Array();
		//更新项
		this.updateMap = new Array();
		this.changeField = {};
		var _this = this;
		$("div").each(function() {
			var settingStr = $(this).attr('setting')
			var setting =getSetting(settingStr,_this);
			if(WebUtil.isNull(setting) || WebUtil.isNull(setting.id)){
				return;
			}
			if(!WebUtil.isNull(_this.requiredField) && !WebUtil.isNull(setting.validate) && !WebUtil.isNull(setting.validate.isRequired)) {
				if(setting.validate.isRequired) {
					_this.requiredField.push(setting.id);
				}
			}
			var id = setting.id;
			var arr = setting.id.split(_this.splitChar);
			var dataType = parseInt(setting.dataType);
			//创建父容器
			var divid = id + "div";
			$(this).append($("<div id=\"" + divid + "\"></div>"));
			var abisInput = null;
			if(dataType === ABISCode.InputType.CODE) {
				var codeName = "";
				var showText = true;
				if(!WebUtil.isNull(setting.columnName)) {
					codeName = setting.columnName;
				}
				if(!WebUtil.isNull(setting.showText)) {
					showText = setting.showText;
				}
				var issearchall = true;
				if(!WebUtil.isNull(setting.all)) {
					issearchall = false;
				}
				var relatid = null;
				if(!WebUtil.isNull(setting.relatid)) {
					relatid = setting.relatid;
					showText = false;
				}
				if(!showText){
					_this.showCodeCols.push(id);
				}
				abisInput = WebUI.createCombo(divid, id, null, relatid, showText, issearchall, codeName, "", _this.requiredField);
			} else if(dataType === ABISCode.InputType.DATE) {
				var options ={maxDate:"%y-%M-%d"}//编辑页面 缺省设置最大日期
				if(setting.my97Options){
				    $.extend(options,setting.my97Options)
				}
				abisInput = WebUI.createDateText(divid, id, "WebTextField", "", _this.requiredField,options);
            }
            else if (dataType === ABISCode.InputType.DATETIME) {
                var options = {maxDate: "%y-%M-%d"}//编辑页面 缺省设置最大日期
                if (setting.my97Options) {
                    $.extend(options, setting.my97Options)
                }
                abisInput = WebUI.createDateTimeText(divid, id, "WebTextField", "", _this.requiredField, options);
            }
			else if(dataType === ABISCode.InputType.TEXT) {
				abisInput = WebUI.createText(divid, id, "WebTextField", "", _this.requiredField);
			} else if(dataType === ABISCode.InputType.MULTEXT) {
				abisInput = WebUI.createMulText(divid, id, "WebTextArea_Auto", "", _this.requiredField);
			} else if(dataType === ABISCode.InputType.CODETEXT) {
				$("#" + divid).addClass('oneinput');
				abisInput = WebUI.createCodeText(divid, id, "Address", "", _this.requiredField);
			}else if(dataType === ABISCode.InputType.CODETEXT2) {
				$("#" + divid).addClass('twoinput');
				abisInput = WebUI.createCodeText(divid, id, "WebTextField", "", _this.requiredField);
			} else if(dataType == ABISCode.InputType.TABLE) {
				$("#" + divid).attr('id', id);
				abisInput = new WebTableMgr(id, "", _this.tableMaxRow, null);
			} else if(dataType === ABISCode.InputType.CHECKBNT) {
				//候选指位单独处理
				$("#" + divid).attr('id', id);
				abisInput = null;
			} else {
				//console.log(settingStr);
				return;
			}
			//validate  &&  setEditable
			if(!WebUtil.isNull(abisInput) && abisInput.constructor == WebInput) {
				var tipid = id + "tip";
				$(this).append($("<div style=\"color:#F00\" id=\"" + tipid + "\"></div>"));
				abisInput.setErrorTip(tipid);
				var param = setting.validate;
				abisInput.setValidateType(param);
				var editable = setting.editable
				if(editable==='false'||editable===false||editable===0){
					abisInput.setEditable(false);
				}
			}
			_this.initCache(abisInput);
		});
		return;
		function getSetting(settingStr,_this){
			var setting=null;
			try {
				setting = eval('(' + settingStr + ')');
			} catch(e) {
				setting=null;
			}
			try {
				//优先取div配置，如果没有，从传入的配置中找
				if(WebUtil.isNull(setting) || WebUtil.isNull(setting.id)){
					if(!WebUtil.isNull(_this.columns)&&!WebUtil.isNull(_this.columns[settingStr])){
						setting = _this.columns[settingStr];
					}
				}
			} catch(e) {
				setting=null;
			}
			return setting;

		}
	}
	/*初始化字典下拉选*/
EditPage.prototype.initComboData = function() {
	var columnnames = Array();
	var arrObject = this.webInputArr;
	for(var i = 0, l = arrObject.length; i < l; i++) {
		var control = arrObject[i];
		if(!WebUtil.isNull(control.columnName)) {
			//去重
			if($.inArray(control.columnName, columnnames) == -1) {
				columnnames.push(control.columnName);
			}
		}
	}
	var _this = this;
	WebComboUtil.getCodeTable(columnnames, getComboData);

	function getComboData(data) {
		if(WebUtil.isNull(data)) return;
		_this.setComboData(data);
	}
}
EditPage.prototype.setComboData = function(data) {
		data = eval('(' + data + ')');
		var arrObject = this.webInputArr;
		for(var i = 0, l = arrObject.length; i < l; i++) {
			var control = arrObject[i];
			if(!WebUtil.isNull(control.columnName)) {
				if(control.columnName.indexOf(ABISCode.DBCodeName) > -1) {
					//数据库特殊处理
					if(control.columnName.split(this.splitChar).length > 1) {
						var dbType = control.columnName.split(this.splitChar)[1];
						this.initDBInfo(control, dbType);
					}
				} else {
					if(!WebUtil.isNull(data[control.columnName])) {
						control.setComboData(data[control.columnName])
					} else {
						//兼容小写
						control.setComboData(data[control.columnName.toLowerCase()])
					}
				}
			}
		}
	}
	//初始化数据库下拉选
EditPage.prototype.initDBInfo = function(control, dbType) {
	var _this = this;
	var url = WebVar.VarPath + "/db/mgr/dbinfo/" + dbType;
	jQuery.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: url,
		data: null,
		dataType: 'json',
		success: function(data) {
			if(data != null) {
				if(typeof data == 'string') {
					data = eval('(' + data + ')');
				}
				control.setComboData(data);
				if(_this.dbid != null) {
					control.setValue(_this.dbid);
				}
			}
		}
	});
}

/**
 * 是否通过了验证，包括长度验证和必填项验证
 */
EditPage.prototype.isPassValidate = function() {
		return this.isPassLenValidate() && this.validateRequired();
	}
	/**
	 * 是否通过了长度验证，既页面中存在红色字体提示长度不符合时不予保存
	 */
EditPage.prototype.isPassLenValidate = function() {
		var _this = this;
		var bool = true;
		$.each(_this.webInputArr, function(index, input) {
			//只校验非隐藏域
			if($('#' + input.id).is(":visible")) {
				var flag = input.validateValue();
				if(!flag) {
					bool = false;
					//全都校验后再返回
				}
			}

		});
		return bool;
	}
	/**
	 * 验证所有必填项是否都填了
	 */
EditPage.prototype.validateRequired = function() {
		var flag = true;
		var _this = this;
		//验证必填项是否都填了
		$.each(_this.webInputArr, function(index, input) {
			//只校验非隐藏域
			if($('#' + input.id).is(":visible")) {
				flag = input.validateRequried();
				if(!flag) {
					return flag;
				}
			}

		});
		return flag
	}
	/**
	 * 所有必填项的数量
	 */
	EditPage.prototype.requiredNum = function() {
		var num = 0;
		var _this = this;
		//验证必填项是否都填了
		$.each(_this.webInputArr, function(index, input) {
			//只校验非隐藏域
			if($('#' + input.id).is(":visible")) {
				if(input.required){
					num++;
				}
			}

		});
		return num;
	}
	/**
	 * 通过校验的必填项数量
	 */
	EditPage.prototype.validateRequiredNum = function() {
		var num = 0;
		var flag = true;
		var _this = this;
		//验证必填项是否都填了
		$.each(_this.webInputArr, function(index, input) {
			//只校验非隐藏域
			if($('#' + input.id).is(":visible")) {
				if(input.required){
					flag = input.validateValue()&&input.validateRequried();
					if(flag) {
						num++;
					}
				}
			}

		});
		return num;
	}
	/**
	 * 开启监听
	 * 为所有文本框注册当前文本是否发生了变化
	 * ，编辑页面赋值后调用。
	 */
EditPage.prototype.Txtchange = function() {
		var _this = this;
		$.each(_this.webInputArr, function(index, input) {
			var inputarr = new Array();
			inputarr = input.getId().split(_this.splitChar);
			var inputname = inputarr[inputarr.length - 1];
			register(input);
		});

		function register(contro) {
			contro.addChangeListener(textChange);

			function textChange(id, value, txt) {
				var oldtext = null;
				if(_this.srcCaseObj != null) {
					oldtext = _this.srcCaseObj[id];
				}
				if(oldtext == null) {
					oldtext = "";
				}
				if(value != oldtext) {
					_this.changeField[id] = true;
					flag = true;
				} else {
					_this.changeField[id] = false;
					flag = false;
				}
				if(WebUtil.isFunction(_this.changeListener)) {
					_this.changeListener(flag);
				}
			}
		}

	}
	/**
	 * 编辑页面的信息是否发生了变化
	 */
EditPage.prototype.isTxtInfoChanged = function() {
		var flag = false;
		for(var name in this.changeField) {
			if(this.changeField[name]) {
				flag = true;
				break;
			}
		}
		return flag;
}
	/**
	 * 注册文本改变事件
	 * @param {Object} listener
	 */
EditPage.prototype.registerChangeListener = function(listener) {
		this.changeListener = listener;
	}
	/**
	 * 主动触发监听事件
	 */
EditPage.prototype.runChangeListener = function() {
		this.changeListener&&this.changeListener();
}
	/**
	 * 清空所有控件的值
	 */
EditPage.prototype.clear = function() {
	//普通控件
	var arrObject = this.webInputArr;
	for(var i = 0, l = arrObject.length; i < l; i++) {
		var control = arrObject[i];
		control.setText(null);

	}
	//表格控件
	for(var i = 0, l = this.webTableArr.length; i < l; i++) {
		var webTable = this.webTableArr[i];
		this.setTableData(webTable, this.webInputArr, null, this);
	}
	//checkbox
}
/*
 * 根据id 给表格控件赋值
 */
EditPage.prototype.setValueById = function(id,value) {
	//普通控件
	var arrObject = this.webInputArr;
	var _this = this;
	for(var i = 0, l = arrObject.length; i < l; i++) {
		var control = arrObject[i];
		var controlId = control.getId()
		if(id!==controlId){
			continue;
		}
		if(!WebUtil.isNull(control.type) && control.type == 'Date' && !WebUtil.isNull(value)) {
			value = ""+value;
			//日期格式转换
			if(value.indexOf("-") > -1) {
				value = value.replace(/(\d{4}).(\d{1,2}).(\d{1,2}).+/mg, function($0, $1, $2, $3) {
					if($2.length == 1) {
						$2 = '0' + $2
					}
					if($3.length == 1) {
						$3 = '0' + $3
					}
					return $1 + $2 + $3
				});
			}
		}
		control.setValue(value);
	}
}
/*
 * 根据id 获取普通控件
 */
EditPage.prototype.getControlById = function(id) {
	//普通控件
	var arrObject = this.webInputArr;
	var _this = this;
	for(var i = 0, l = arrObject.length; i < l; i++) {
		var control = arrObject[i];
		var controlId = control.getId()
		if(id!==controlId){
			continue;
		}
		return control;
	}
}
/*
TableStart
页面表格操作相关方法

*/
EditPage.prototype.initTable = function() {
	//表格控件 初始化
	for(var i = 0, l = this.webTableArr.length; i < l; i++) {
		var webTable = this.webTableArr[i];
		this.initTableData(webTable, this);
	}
	//按钮事件绑定
	$("button[name='del_box']").bind("click", delBox)
	$("button[name='edit_box']").bind("click", editBox)
	$("button[name='add_box']").bind("click", addBox)
	var _this = this;

	function addBox() {
		_this.addBox(this);
	}

	function delBox() {
		_this.delBox(this);
	}

	function editBox() {
		_this.editBox(this);
	}
}
EditPage.prototype.initTableData = function(tableMgr, _this) {

	if(WebUtil.isNull(tableMgr)) {
		return null;
	}
	var tblId = tableMgr.tblId;
	var tableJson = $.extend(true, {}, tableJsonTemple);
	$.each(_this.webInputArr, function(index, input) {
		if(input.getId().indexOf(tblId) > -1) {
			var arr = new Array();
			arr = input.getId().split(_this.splitChar);
			var name = arr[arr.length - 1];
			//prevAll('label').html()  or  .prev().html()
			tableJson["headerText"][name] = $("#" + input.getId() + "div").prev().html();
			tableJson["header"].push(name)
		}
	});
	tableMgr.setInput(tableJson);
}
EditPage.prototype.setTableData = function(tableMgr, webInputArr, data, _this) {
	if(WebUtil.isNull(tableMgr)) {
		return null;
	}
	var tblId = tableMgr.tblId;
	var table = tableMgr.getTable();
	if(!WebUtil.isNull(table)) {
		table.clear();
	}
	if(!WebUtil.isNull(data)) {
		$.each(data, function(index, rowdata) {
			var array = {
				'data': {}
			};
			$.each(webInputArr, function(index, input) {
				if(input.getId().indexOf(tblId) > -1) {
					var arr = new Array();
					arr = input.getId().split(_this.splitChar);
					var name = arr[arr.length - 1];
					var value = rowdata[name];
					if(input.type == "Combo") {
						if($.inArray(input.getId(), _this.showCodeCols) === -1){
								text = WebComboUtil.getCodeText(input.columnName, value);
								value = value + WebTable.splitChar + text;
						}
					}
					array.data[name] = value;
				}
			});
			table.addRow(array);
		});
	}
}
EditPage.prototype.getTableData = function(tableMgr) {
		var result = [];
		if(WebUtil.isNull(tableMgr)) {
			return null;
		}
		if(WebUtil.isNull(tableMgr.getTable())) {
			return null;
		}
		if(WebUtil.isNull(tableMgr.getTable().getRowCount())) {
			return null;
		}
		var count = tableMgr.getTable().getRowCount();
		for(var i = 0; i < count; i++) {
			var resultData = {}
			var rowdata = tableMgr.getTable().getRowData(i);
			jQuery.extend(resultData, rowdata)
			result.push(resultData)
		}
		return result;
	}
	/*
	 * 以下的增加，删除，修改操作结果，只是在页面上显示，不对库中的数据进行操作。
	 * 最终的返回的object会保存着所做的修改，统一保存。
	 */
EditPage.prototype.addBox = function(e, key) {
		var tblId = null;
		if(!WebUtil.isNull(key)) {
			tblId = key;
		} else {
			var settingStr = $(e).parent().parent().attr('setting')
			var setting = eval('(' + settingStr + ')');
			tblId = setting.id;
		}
		var arr = new Array();
		arr = tblId.split(this.splitChar);
		name = arr[arr.length - 1];
		var _this = this;
		//content 需要dom对象，规范的getElementsByName只对input有效
		var d = dialog({
			fixed: true,
			title: AbisMessageResource["Add"],
			content: $("div[name='" + name + "']")[0],
			okValue: AbisMessageResource['Add'],
			cancelValue: AbisMessageResource['Cancel'],
			ok: function() {
				return add(0, tblId);
			},
			cancel: function() {
				_this.boxInputClear(_this.webInputArr, tblId);
			}
		});
		d.showModal();

		function add(type, tblId) {
			return _this.addRow(type, tblId);
		}
	}
	/**
	 * type 表示 是增加还是更新 0增加 1更新
	   tblId 表示缓存的表格控件tblId
	 */
EditPage.prototype.addRow = function(type, tblId) {
	var _this = this;
	var canSave = true;
	var errorMsg = null;
	$.each(_this.webTableArr, function(index, tableMgr) {
		if(tableMgr.tblId == tblId) {
			var table = tableMgr.getTable();
			var array = {
				data: {}
			}
			var codemsg = "";//代码表文本信息
			$.each(_this.webInputArr, function(index, input) {
				if(input.getId().indexOf(tblId) > -1) {
					if(!input.validateValue() || !input.validateRequried()) {
						canSave = false;
					}
					var arr = new Array();
					arr = input.getId().split(_this.splitChar);
					var name = arr[arr.length - 1];
					var value = input.getValue();
					if(value != null) {
						if(input.type == "Combo") {
							if($.inArray(input.getId(), _this.showCodeCols) === -1){
								value = input.getCode() + WebTable.splitChar + input.getText();
							}else{
								value = input.getCode();
							}
							codemsg = input.getText();
						}
						if(input.type == 'CodeText'){
							//TODO 这里有一个依赖   Combo与CodeText 布局要一前一后相邻
							value = codemsg +value;
						}
						array.data[name] = value;
					}

					//增加 一个重复字段校验 比如 地址类型...
					if(type===0&&$.inArray(input.getId(), _this.webTableUniqueCols) > -1) {
						errorMsg = _this.validateTableData(tableMgr, name, input.getCode());
						if(errorMsg) {
							alert(errorMsg +"，"+ AbisMessageResource.AlreadyExistReEnter);
							canSave = false;
						}
					}

				}
			});
			if(canSave) {
				if(type == 0) {
					table.addRow(array);
					$('#' + tableMgr.tblId).parent().show()
				} else {
					table.deleteSelectRow();
					table.addRow(array);
				}
				if(WebUtil.isFunction(_this.changeListener)) {
					_this.changeListener();
				}
				_this.boxInputClear(_this.webInputArr, tblId);
			}
		}
	});
	//console.log(canSave?"close":"no close")
	return canSave;
}
EditPage.prototype.delBox = function(e) {
	var settingStr = $(e).parent().parent().attr('setting')
	var setting = eval('(' + settingStr + ')');
	var tblId = setting.id;
	var arr = new Array();
	arr = tblId.split(this.splitChar);
	var name = arr[arr.length - 1];
	var _this = this;
	$.each(_this.webTableArr, function(index, tableMgr) {
		if(tableMgr.tblId == tblId) {
			var table = tableMgr.getTable();
			var data = table.getSelectItems();
			if(WebUtil.isEmpty(data)){
				alert(AbisMessageResource.Alert["HaveNoSelectedTableRecord"]);
			} else {
				table.deleteSelectRow();
			}
			if(WebUtil.isFunction(_this.changeListener)) {
				_this.changeListener();
			}
		}
	});
}
EditPage.prototype.editBox = function(e) {
	var settingStr = $(e).parent().parent().attr('setting')
	var setting = eval('(' + settingStr + ')');
	var tblId = setting.id;
	var arr = new Array();
	arr = tblId.split(this.splitChar);
	var name = arr[arr.length - 1];
	var _this = this;
	if(setValue()) {
		var d = dialog({
			fixed: true,
			title: AbisMessageResource["Edit"],
			content: $("div[name='" + name + "']")[0],
			okValue: AbisMessageResource['Update'],
			cancelValue: AbisMessageResource['Cancel'],
			ok: function() {
				return add(1, tblId)
			},
			cancel: function() {
				_this.boxInputClear(_this.webInputArr, tblId);
			}
		});
		d.showModal();
	} else {
		alert(AbisMessageResource.Alert["HaveNoSelectedTableRecord"]);
	}

	function add(type, tblId) {
		return _this.addRow(type, tblId);
	}

	function setValue() {
		var result = false;
		$.each(_this.webTableArr, function(index, tableMgr) {
			if(tableMgr.tblId == tblId) {
				var table = tableMgr.getTable();
				var data = table.getSelectItems();
				if(!WebUtil.isNull(data)) {
					result = true;
					$.each(_this.webInputArr, function(index, input) {
						var inputarr = new Array();
						inputarr = input.getId().split(_this.splitChar);
						var inputname = inputarr[inputarr.length - 1];
						if(input.getId().indexOf(tblId) > -1) {
							input.setValue(data[0][inputname]);
						}
					});

				}
			}
		});
		return result;
	}
}
EditPage.prototype.boxInputClear = function(webInputArr, tblId) {
	$.each(webInputArr, function(index, input) {
		if(input.getId().indexOf(tblId) > -1) {
			input.clear();
			input.cancelErrorTip();
		}
	});
}
/**
 * tableMgr 表格对象
 * col 列
 * value 值
 * 校验表格数据 比如某列不能重复  也许只会用到一列，先简单写 不考虑多列情况
 */
EditPage.prototype.validateTableData= function(tableMgr,col,value) {
	var result = null;
	if(WebUtil.isNull(tableMgr)) {
		return null;
	}
	if(WebUtil.isNull(tableMgr.getTable())) {
		return null;
	}
	if(WebUtil.isNull(tableMgr.getTable().getRowCount())) {
		return null;
	}
	if(WebUtil.isNull(col)||WebUtil.isNull(value)){
		return null;
	}
	var count = tableMgr.getTable().getRowCount();
	for(var i = 0; i < count; i++) {
		var resultData = {}
		var rowdata = tableMgr.getTable().getRowDataPlus(i);
		if(!WebUtil.isNull(rowdata[col])){
			if(rowdata[col]===value){
				if(!WebUtil.isNull(rowdata[col+"Text"])){
					result =rowdata[col+"Text"];
				}else{
					result =col;
				}
				break;
			}
		}
	}
	if(result!=null){
		result =tableMgr.getTable().input.headerText[col]+":"+result;
	}
	return result;
}
/*
TableStart
页面表格操作相关方法
end
*/

/*
候选指位 操作相关方法
*/
EditPage.prototype.defaultFgps = "0000000000"
EditPage.prototype.candFgpsClick = function() {
	var newCandFgps = this.getCandFgpsData();
	this.srcCardObj = this.srcCardObj||this.defaultFgps;
	if(this.srcCardObj != null) {
		var oldCandFgps = this.srcCardObj['candFgps'];
		if(newCandFgps == oldCandFgps) {
			this.changeField['candFgps'] = false;
			if(this.changeListener != null) {
				this.changeListener(false);
			}
		} else {
			this.changeField['candFgps'] = true;
			if(this.changeListener != null) {
				this.changeListener(true);
			}
		}
	}
}
EditPage.prototype.getCandFgpsData = function() {
	var arr = this.candFgps.getSelectData();
	var data = new Array();
	for(var i = 0; i < this.defaultFgps.length; i++) {
		data[i] = 0;
	}
	for(var i = 0; i < arr.length; i++) {
		var index = parseInt(arr[i].id);
		data[index] = 1;
	}
	var candFgps = data.toString();
	return candFgps.replace(/,/g, '');
}
EditPage.prototype.setCandFgpsData = function(data) {
		if(data == null) {
			data=this.defaultFgps;
		}
		for(var i = 0; i < data.length; i++) {
			if(data.substr(i, 1) == '1') {
				this.candFgps.setSelected(i, true);
			} else {
				this.candFgps.setSelected(i, false);
			}
		}
	}
	/*
	候选指位 操作相关方法end
	*/