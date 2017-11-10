/**
 * 封装一个多选（单选）控件
 * 
 * 1检索功能
 * 2ajax 分步加载代码表
 * 3 显示样式增加  https://harvesthq.github.io/chosen/options.html
 * https://github.com/amazeui/chosen/blob/master/docs/options.md
 * 
 * hjx 2017年5月25日11:51:10
 */

/**
 * 用于检索的代码表控件 
 * id： 下拉文本框id，对应jsp中div的id 
 * placetype： 该代码框是放在页面上还是对话框里。参数PAGE = 1,BOX = 2 
 * flag： (代码值|显示文本) true|false 
 * qryAll：初始化时查询的数据量。全部加载还是部分加载。这里部分加载的只是地址信息（户籍，现住址，国家等涉及地址类和数量超过60的代码表信息的信息）
 * colName：列名，必须传。不能为null。用于后面查询（新版）。 
 * type： 取值[0|1|2]。(0：一般代码表, 1:总数据量>60并且支持检索,2:地址代码表) 
 * clickInvoke:单击时回调外面的方法 
 * reId：关联的checkbox控件id。父控件的id
 * width:这是代码表空间的宽度，如果该代码表创建在一个隐藏的div区域内，那么设置给它的宽度，将永远是0.故在这里设置一下。 
 * itemtype:下拉选中的 数据展示形式， 0文本（缺省） 1 代码 2 文本（代码） 
 * config :chosen config 可以覆盖defaultConfig  {single===true 变为单选}
 */
function WebMultipleCombo(id, placetype, flag, qryAll, colName, type,
		clickInvoke, reId, width, itemtype, config) {
	this.id = id;
	this.placetype = placetype;
	this.flag = flag;
	this.qryAll = qryAll;
	this.colName = colName;
	this.type = type;
	this.width = width;
	this.itemtype = itemtype;
	// this.registHotKey($("#" + this.id + "textfield" + this.qryAll));// 注册热键
	this.selectli = null;
	this.focuslist = null;
	this.editable = true;
	// this.inputField = $("#" + id + "textfield" + this.qryAll);// 文本框
	// this.initEvent();
	this.selectItem = [];
	this.itemNo = 0;
	this.invoke = clickInvoke;
	this.children = {};
	var _this = this;
	WebMultipleCombo.prototype.focus = function() {
		$select.trigger('focus.chosen');
	}
	WebMultipleCombo.prototype.blur = function() {
		$select.trigger('blur.chosen');
	}
	//格式为代码表数组
	WebMultipleCombo.prototype.setData = function(data) {
		if (typeof data == "string") {
			data = eval('(' + data + ')');
		}
		if (data != null && data.length != 0) {
            this.$select.empty();
			for (var i = 0; i < data.length; i++) {
				var codeModel = data[i];// {code:1,pinyin:"pinyin",text:"hjx",weight:100,isEditVisible:true}
				this.$select.append(create$Option(codeModel, this.itemtype));
			}
			this.$select.trigger("chosen:updated");
		}
	}
	WebMultipleCombo.prototype.getCode = function(data) {
		var selectCodes = [];
		var selectCode = "";
		this.$select.find('option:selected').each(function() {
			if (this.value && this.value !== "undefined") {
				selectCodes.push(this.value);
				selectCode = this.value;
			}
		})
		if (this.single) {
			return selectCode;
		} else {
			return selectCodes;
		}

	}
	WebMultipleCombo.prototype.setCode = function(data) {
		var _this = this;
		if (!WebUtil.isEmpty(data)) {
			if (typeof data === 'string') {
				data = data.split(",");
			}
			this.$select.find('option:selected').prop("selected", false)
			if (data instanceof Array) {
				var needLoadList = [];
				for (var i = 0; i < data.length; i++) { 
					var value = data[i];
					var $option = this.$select.find("option[value='" + value+ "']")
					if ($option.length > 0) {
						$option.prop("selected", true);
					} else {
						needLoadList.push(value);
					}
				}
				if (needLoadList.length > 0) {
					loadCodes(this.colName, needLoadList, function() {
						this.$select.trigger("chosen:updated");
					});
				} else {
					this.$select.trigger("chosen:updated");
				}

			}
		}else{
			this.clear();
		}
		// 通过后台 异步加载 不识别代码
		function loadCodes(columnName, codes, callback) {
			var url = WebVar.VarPath + "/util/combo/translate/" + columnName;
			var data = {};
			data["codes"] = codes;
			data["filterRgx"] = "";
			jQuery.ajax({
				async : true,
				type : 'POST',
				contentType : 'application/json',
				url : url,
				data : $.toJSON(data),
				dataType : 'json',
				success : function(result) {
					if (!WebUtil.isNull(result)) {
						if (result.status = WebCode.WebResultStatus.ok) {
							var codeModels = result.data || [];// {code:1,pinyin:"pinyin",text:"hjx",weight:100,isEditVisible:true}
							for (var i = 0; i < codeModels.length; i++) { 	
								var codeModel = codeModels[i];
								_this.$select.append(create$Option(codeModel,
										_this.itemtype, true));
							}
							_this.$select.trigger("chosen:updated");
						} else {
							DialogUtil.openSimpleDialogForOcx(result.msg);
						}
					}
				}
			});
		}
	}
	WebMultipleCombo.prototype.clear = function() {
		this.$select.find('option:selected').prop("selected", false)
		this.$select.trigger("chosen:updated");
	}
	
	
	init(config);//初始化
	
	
	
	function initData(config) {
        _this.max_selected_options = 10;
		_this.defaultConfig = {
			'.chosen-select' : {},
			'.chosen-select-deselect' : {
				allow_single_deselect : true
			},
			'.chosen-select-no-single' : {
				disable_search_threshold : 10
			},
			'.chosen-select-no-results' : {
				no_results_text : 'Oops, nothing found!'
			},
			'.chosen-select-width' : {
				width : "100%",
				search_contains : true,
				max_selected_options : _this.max_selected_options,
				ajax : searchData
			}
		};
		_this.config = {};
		_this.config.itemtype = _this.itemtype || 0;
		_this.config.flag = _this.flag || false;
		_this.config = $.extend({}, _this.defaultConfig['.chosen-select-width'],
				_this.config);
		_this.config = $.extend({}, _this.config, config);
		/*
		 * $dom selelct dom colName 表名|列名 value 检索的值 codeList 已经加载的代码数组，避免重复加载
		 */
		function searchData($dom, colName, value, codeList, filterRgx) {
			if (WebUtil.isEmpty(value)||WebUtil.isEmpty(colName)||_this.qryAll) {
				return;
			}
			value = encodeURI(value);
			$.post(WebVar.VarPath + "/util/combo/search/" + colName + "/"
					+ value, {
				filterRgx : filterRgx
			}, function(data) {
				var tempstr = "";
				try {
					if (typeof data === "string") {
						data = $.parseJSON(data);
					}
				} catch (e) {
					data = null
				}
				if (data != null && data.length != 0) {
					for (var i = 0; i < data.length; i++) {

						var codeModel = data[i];// {code:1,pinyin:"pinyin",text:"hjx",weight:100,isEditVisible:true}
						var code = codeModel.code;
						// 需要去重
						if (code && ($.inArray(code, codeList) == -1)) {
							codeList.push(code);
							$dom
									.append(create$Option(codeModel,
											_this.itemtype));
						}
					}
					$dom.trigger("chosen:updated");
				}
			});
		}
	}
	function init(config) {
		initData(config);

		var multipleStr = 'multiple=""';
		if (config && config.single === true) {

			multipleStr = "";// 单选
			_this.single === true
		}
		_this.$select = $('<select data-placeholder="" '
				+ multipleStr
				+ ' class="chosen-select-width" tabindex="-1" style="display: none;"></select>');
		$("#" + _this.id).append(_this.$select);
		var columnCatlog = {
			id : _this.id,
			colName : _this.colName
		};
		_this.$select.data("columnCatlog", columnCatlog)
		_this.$select.chosen(_this.config).on(
				'change',
				function(evt, params) {
					for (var i in params) { 	
						if (i === "selected") {
							_this.$select.find(
									"option[value='" + params[i] + "']").prop(
									"selected", true)
						} else if (i === "deselected") {
							_this.$select.find(
									"option[value=" + params[i] + "]").prop(
									"selected", false)
						}
					}					
					
					
				});
        _this.time =0;
        _this.$select.bind("chosen:maxselected",
            function(){
                //五秒内只提示一次
                if( _this.time ===0||(new  Date().getTime()-_this.time>5000)){
                    _this.time =new  Date().getTime();//当前时间的毫秒数
                    var msg = '最多可以选择'+_this.max_selected_options+"项";
                    DialogUtil.openSimpleDialogForOcx(msg,function(){

                    });
                }
        });
	}
	/*
	 * 创建一个 下拉节点 codeModel 字典对象 itemtype 下拉选展示形式 selected true/false 是否选中
	 */
	function create$Option(codeModel, itemtype, selected) {
		var showText = codeModel.text;
		var code = codeModel.code;
		var selectedStr = "";
		if (itemtype === 0) {

		} else if (itemtype === 1) {
			showText = codeModel.code;
		} else if (itemtype === 2) {
			showText = codeModel.text + '  (' + codeModel.code + ')';
		}
		if (selected) {
			selectedStr = "selected='selected'";
		}
		var $option = $('<option value=' + code + '  ' + selectedStr + '>'
				+ showText + '</option>');
		$option.data("ABISCode", codeModel)
		return $option
	}
}
