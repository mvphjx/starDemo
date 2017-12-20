/**
 * 通用检索弹出框
 * @param options
 * {
 * tableName,//表名 必须
 * data{xml,SimpFilter,xmls,SimpFilters，initWhere,columns}  //初始化的数据
 * //初始条件 结构同 com.hisign.pu.abis.abisweb.abis.base.qryparam.WhereParam
 * //columns 要显示那些可以配置得列  ["id","name"...]
 * loadLastCfg，//是否优先使用 最后一次检索条件
 * }
 */
function SearchDialog(options)
{
	if(WebUtil.isNull(options)){
		return;
	}
	this.$dom = $(".general-search-dialog");//操作的dom控件，以后兼容多实例，可扩展
    this.$customtem=$(this.$dom.find(".customtem ul"));//用户自定义模板
    this.lastOperation =AbisMessageResource.GeneralSearch.lastOperation;// "最后一次检索条件";
	this.$searchItems=$(this.$dom.find(".search-items" ));
	this.tableName	= options.tableName;//表名
    this.disableCols=[];//不予展示的列
    this.limitCols=[];//需要限制的列  字典值需要过滤
    if(options.data&&options.data.initWhere){//初始条件规范化
        this.initWhere={};
        options.data.initWhere = $.extend(true,[],options.data.initWhere);
        for (var i_init = options.data.initWhere.length-1;i_init>=0;i_init--){
            var where = options.data.initWhere[i_init];
            if(where.value1&&where.value2){
                where.oper="btwn";
                this.disableCols.push(where.colName)
            }else if(where.values){
                where.oper="in"
                this.limitCols.push(where.colName);
            }else if(where.value1&&(!where.value2)){
                where.oper="eq";
                this.disableCols.push(where.colName)
            }
            if(!where.dataType){
                where.dataType="s";
            }else if(dateTypeCode[where.dataType]){
                where.dataType=dateTypeCode[where.dataType];
            }
            this.initWhere[where.colName]=where;
        }
    }
    if(options.data&&options.data.columns){
    	this.columns =  options.data.columns;
	}
    this.loadLastCfg =  options.loadLastCfg;//是否优先使用 最后一次检索条件
	this.__xml__ = options.data&&options.data.xml;//初始化数据
	if(options.data&&options.data.xmls&&(options.data.xmls.length>0)){
		for(var i =0  ; i<options.data.xmls.length;i++){//合并多个xmls
			this.__xml__ =this.extendXML(this.__xml__,options.data.xmls[i])
		}
	}
	this.__SimpFilter__ = options.data&&options.data.SimpFilter;
	if(options.data&&options.data.SimpFilters&&(options.data.SimpFilters.length>0)){
		for(var i =0  ; i<options.data.SimpFilters.length;i++){//合并多个SimpFilters
			this.__SimpFilter__ =this.extendXML(this.__SimpFilter__,options.data.SimpFilters[i])
		}
	}
	if(this.__xml__ &&this.__SimpFilter__ ){//合并 xml 与 simpleFilter
		try{
            var json1 = (this.__xml__&&fromXML(this.__xml__))||{};
            var json1Filter =  json1.TextFilter.Where.SimpFilter;
            var json2Filter = (this.__SimpFilter__&&fromXML(this.__SimpFilter__))||{};
            var reusltFilter = $.extend(true,{},json1Filter,json2Filter);
            json1.TextFilter.Where.SimpFilter = reusltFilter;
            this.__xml__ = toXML(json1);
            this.__SimpFilter__ = null;
		}catch(e){
			console.log(e);
		}
	}

	this.$selelct = null;
	this.userCfgs = {};//用户自定义配置
	this.init();

}

SearchDialog.prototype = {
		init: function(){
			var _this = this;
			this.initData();
			this.$dom.find('#qrytext').bind('keypress', function (e){//查询框输入监听
				if(!WebUtil.isNull(e))
				{
					var key = (e.keyCode) || (e.which) || (e.charCode);
					var act = document.activeElement.id; //获得文本框焦点的ID
					if(act=="qrytext")
					{
						_this.filter();
					}
				}
			});
			this.$dom.find('#qrytext').bind('keyup', function (e){//查询框输入监听
				if(!WebUtil.isNull(e))
				{
					var act = document.activeElement.id; //获得文本框焦点的ID
					if(act=="qrytext")
					{
						_this.filter();
					}
				}
				return;
			});
			this.$dom.find('#qrytextclear').bind('click', function (e){//清空
				$('#qrytext').val("");
				_this.filter(true);
			});
			this.$dom.on('dblclick','#columnCatlogs li',function(event){//左侧列点击事件
				var options = $(this).data("options");
				_this.addSearchItem(options);
			});
			this.$searchItems.sortable({//右侧查询条件，可排序
				handle: ".item-title"
			});
			this.$searchItems.on('click','.item-title',function(event){//右侧搜索条件   点击事件
				_this.$selelct = $(this).parent();
			});
			this.$searchItems.on('dblclick','.item-title',function(event){//右侧  搜索条件 双击事件
				$(this).parent().remove();
			});
			this.$dom.on('click','.savetem',function(event){//保存模板	
				var css = null;
				var $window = $("#savetmp");
				$($window.find("#tmpnamediv")).empty();
				var abisInput = WebUI.createText("tmpnamediv", "tmpname", css||"WebTextField", "");
				$.dialog({
				    title: AbisMessageResource.SaveSearchTemplet,
				    content: $window[0],	   
				    cancelValue:AbisMessageResource.Cancel,	 
				    cancel: function () { return true; },
				    okValue: AbisMessageResource.OK,
				    ok: function () {return save();}
				});
				function save (){
					var title = abisInput.getValue();
					_this.saveCfg(title);
				}
			});
			this.$dom.on('click','.sorticon',function(event){//排序功能	
				$.dialog({
				    title: AbisMessageResource.SetSortFields,
				    content: document.getElementById('savesort'),	
//				    cancelValue:AbisMessageResource.Cancel,	 
//				    cancel: function () { return true; },
				    okValue: AbisMessageResource.OK,
				    ok: function () {return true;}
				});
				function save (){
					var options = {}
					options.col =  _this.sortColInput.getValue();
					options.order =   _this.sortRuleInput.getValue();
					_this.setSort(options);
				}
			});
			this.$dom.on('click','.clearcon',function(event){//清空模板
				_this.clear();
			});
			
			//待优化  操作选择  TODO
			this.$dom.on('click','.right-content .search-item .logic-choose .choose-current',function(event){
				$(this).siblings('ul').toggleClass('hide');
			});
			this.$dom.on('click','.right-content .search-item .logic-choose ul li',function(event){
				$(this).parent('ul').addClass('hide');
			});
			this.$dom.on('mouseenter','.right-content .search-item .logic-choose ul',function(event){
				$(this).removeClass('hide');
			});
			this.$dom.on('mouseleave','.right-content .search-item .logic-choose ul',function(event){
				$(this).addClass('hide');
			});
            this.$dom.find('.right-content .search-item .logic-choose ul li').hover(function() {
                console.log(1)
            }, function() {
                $(this).addClass('hide');
            });
			/*最右侧检索项下拉点击事件*/
			this.$dom.on('click','.right-content .search-item .filter .select-arrow',function(event){
				$(this).siblings('.option-wrap').toggleClass('hide');
			});
			this.$dom.on('click','.right-content .search-item .filter .option-wrap',function(event){
				$(this).addClass('hide');
			});
			this.$dom.on('mouseenter','.right-content .search-item .filter .option-wrap',function(event){
				$(this).removeClass('hide');
			});
			this.$dom.on('mouseleave','.right-content .search-item .filter .option-wrap',function(event){
				$(this).removeClass('hide');
			});
			/*自定义模板按钮下拉点击事件*/
			
			this.$dom.on('click','.top-btngroup .customtem',function(event) {
				$(this).children('ul').toggleClass('hide');	
			});
			var timeId_click;
			this.$dom.on('click','.customtem ul li',function(event) {
				var $this = $(this);
				timeId_click =setTimeout(function() {
					var options = $this.data("options");//点击加载模板
					var id = $this.data("id");
					options&&_this.setOneCfg(options);
					$this.parent().toggleClass('hide');	
				  }, 500); 
				event.stopPropagation();
				
			});
			this.$dom.on('dblclick','.customtem ul li',function(event){//删除模板	
				var $this = $(this);
				clearTimeout(timeId_click);
				var title = $(this).html();
				var id = $(this).data("id");
				_this.deleteCfg(title,id);
				$this.parent().toggleClass('hide');	
			});	
			this.$dom.find('.top-btngroup .customtem ul').hover(function() {
				$(this).removeClass('hide');
			}, function() {
				$(this).addClass('hide');
			});
		},
		initData: function(){
			var _this =this;
			//左侧新建分组的配置 描述  isGroup代表分组标示
			_this.group_columnCatlog = {"id":0,"tableName":null,"columnName":AbisMessageResource.GeneralSearch.group,"colDispName":AbisMessageResource.GeneralSearch.createGroup,"colDispWidth":0,"inputCode":null,"entityAttrType":null,"description":null,"codeTableName":null,"storageFmt":0,"dataType":0,"dataFmt":null,"codeFmt":null,"cpCodeCol":null,"codeDispStyle":0}
			_this.group_columnCatlog.isGroup = true;
			var url = WebVar.VarPath + "/tblcfg/searchDialog";
			var jsonData ={};
			jsonData.tableName =this.tableName;
			jQuery.ajax({
				url:url,
				data:$.toJSON(jsonData),
				type: "POST",
				dataType : 'json',
				beforeSend: function() {},
				contentType: 'application/json',
				success : function(result) 
		        {   
		            if(!WebUtil.isNull(result)){

		            	if (result.status = WebCode.WebResultStatus.ok)
		            	{
		            		var columnCatlogs = result.data.columnCatlogs;
		            		var $columnCatlogs = _this.$dom.find("#columnCatlogs");
		            		$columnCatlogs.empty();
		            		var group_columnCatlog = _this.group_columnCatlog;
		            		var group_str = $("<li id="+group_columnCatlog.columnName+" class='group'>"+group_columnCatlog.colDispName+"</li>")
							group_str.data("options",group_columnCatlog);
							$columnCatlogs.append(group_str);
							var length = columnCatlogs.length;
							for(var i=0;i<length;i++) 
							{
								if(WebUtil.isArray(_this.columns)){//对左侧显示的列进行过滤
									if($.inArray(columnCatlogs[i].columnName,_this.columns)===-1){
										continue;
									}
                                }
								var li_str = $("<li id="+columnCatlogs[i].columnName+" class='column'>"+columnCatlogs[i].colDispName+"</li>")
								li_str.data("options",columnCatlogs[i]);//缓存列描述	
								$columnCatlogs.append(li_str);
                                if($.inArray(columnCatlogs[i].columnName, _this.disableCols)>-1){
                                    li_str.hide();
                                }
							}
							createSortData();
							if(result.data.xml){
								var jsonCfg=result.data.xml;
								if(typeof result.data.xml==='string'){
									jsonCfg=WebUtil.string2Json(result.data.xml);//加载用户配置
								}
								_this.setCfgs(jsonCfg,_this.loadLastCfg);	//加载用户配置
							}
                            //加载传入的值
                            if(_this.__xml__&&!_this.loadLastCfg){
                                _this.setOneCfg(_this.__xml__);//加载一个xml
                            }else if (_this.__SimpFilter__){
                                _this.setSearchItems(_this.fixFromXML(fromXML(_this.__SimpFilter__)).SimpFilter);//加载一个xml
                            }
		            	}
		            	else
		            	{
		            		DialogUtil.openSimpleDialogForOcx(result.msg);
		            	}		            	
		            }
		        },   
		        error : function(e) 
		        {   
		            
		        }
			});
			function createSortData(){
				var defaultSortCol = "";
				var css = "test";			
				var $window = $("#savesort");
				if($($window.find("#sortdiv")).html()===""){
					//_this.sortColInput = WebUI.createCombo("sortdiv", "sort", css, null, true, true, null,null,null,null,2);
					_this.sortColInput = WebUI.createMultipleCombo("sortdiv", "sort",null,null,false,true,null,null,null,{single:true})
					var $columnCatlogs = _this.$dom.find("#columnCatlogs");
					var colsdata = [];
					_this.$dom.find("#columnCatlogs").find("li.column").each(function(){
						var $this =$(this);
						var options =$this.data("options");
						if(!WebUtil.isNull(options)){
							var codeModel = {}
							codeModel.code = options.columnName||"";
							codeModel.pinyin =options.inputCode ||"";
							codeModel.text = options.colDispName||"";
							colsdata.push(codeModel);
							if(defaultSortCol === "ID"){
								defaultSortCol = "ID"
							}else{
								defaultSortCol=codeModel.code;
							}
						}
					});	
					_this.sortColInput.setComboData(colsdata);
					//_this.sortRuleInput = WebUI.createCombo("sortrulediv", "sortrule", css, null, true, true, null);
					_this.sortRuleInput = WebUI.createMultipleCombo("sortrulediv","sortrule",null,null,false,true,null,null,null,{single:true})
					var orderdata = [
					                {code: "DESC", pinyin: "", text: AbisMessageResource.DESC, weight: 0, isEditVisible: true},
					                {code: "ASC", pinyin: "", text: AbisMessageResource.ASC, weight: 0, isEditVisible: true}]
					_this.sortRuleInput.setComboData(orderdata);
					
					//缺省值
					var options = {}
					options.order ="DESC" ;
					options.col = defaultSortCol;
					_this.setSort(options);
				}
			}
		},
		
		setCfgs: function(jsonCfg,loadLastCfg){//加载用户配置
			this.$customtem.empty();
			var oneJsonCfg = null;
			for (var i in jsonCfg) {
				if(oneJsonCfg==null||i===this.lastOperation){
					oneJsonCfg  = jsonCfg[i].template;
				}
				var $li = $("<li>"+i+"</li>")
				$li.data("options",jsonCfg[i].template);
				$li.data("id",jsonCfg[i].id);
				this.$customtem.append($li);
			}
            loadLastCfg&&this.setOneCfg(oneJsonCfg)
		},
		setOneCfg: function(xmlCfg){//加载一个用户配置  
			var jsonCfg = this.fixFromXML(fromXML(xmlCfg));
			//console.log(jsonCfg)
			if(jsonCfg.TextFilter.From.Table!==this.tableName){
				return;
			}
			this.$searchItems.empty();
			if(jsonCfg.TextFilter.Where&&jsonCfg.TextFilter.Where.SimpFilter){
				this.setSearchItems(jsonCfg.TextFilter.Where.SimpFilter);
			}
			var OrderBy = jsonCfg.TextFilter.OrderBy;
			if(OrderBy&&OrderBy.Oi){
				var orderByOptions = {}
				orderByOptions.order = OrderBy.Oi["@Order"]||OrderBy.Oi[0]["@Order"];
				orderByOptions.col =   OrderBy.Oi["#"]||OrderBy.Oi[0]["#"];
				this.setSort(orderByOptions);						
			}
		},
		setSearchItems: function(SimpFilter){//加载$searchItems 接收simpfilter的json格式
			var groups = SimpFilter&&SimpFilter.Group;
			for(var i=0 ;i<groups.length;i++){
				var searchItems =(groups[i].ColNode)||[];
				if(searchItems.length>0){
					this.addSearchItem(this.group_columnCatlog);//分组
                    for (var ii = 0; ii < searchItems.length; ii++) {
                        var  colName = searchItems[ii]['@Col'];
                        var  options = this.$dom.find("#"+colName).data("options");
                        this.addSearchItem(options,searchItems[ii]);
                    }
				}
			}
		},
		/*
		 * 必须参数：  colOptions 列描述
		 * 可选参数： 比较运算符，值  
		 */
		addSearchItem: function(colOptions,cfgs){
			if(WebUtil.isEmpty(colOptions)){
				return;
			}
		    var columnName = colOptions.columnName||"";
			//是否为分组
			var isGroup = colOptions.isGroup||false;
			//是否为限制列
            var disable = ($.inArray(columnName, this.disableCols)>-1);
            //是否为无效列
            var limit = ($.inArray(columnName, this.limitCols)>-1);
            //创建查询列的扩展参数
            var param = {};
            param.isGroup = isGroup;
			//增加一搜索行
            if(disable){
                return;
            }else if(limit){
                param.limitValues =this.initWhere[columnName].values;
                param.limitOperations = [this.initWhere[columnName].oper];
                new SearchItem(colOptions,cfgs,this.$searchItems,param);
            }else{
                new SearchItem(colOptions,cfgs,this.$searchItems,param);
            }
		},
		/*
		 * 接收参数   options:{order:,col:}
		 */
		setSort: function(options){//用户设置的排序字段 排序规则  
			if(options&&options.order&&options.col){	
				this.sortColInput.setValue(options.col);
				this.sortRuleInput.setValue(options.order);
			}
		},
		//返回 xml映射的json格式
		getSort: function(){//获取 用户设置的排序字段 排序规则  
			var options = {};
			var OrderBy = {};
			options.col =  this.sortColInput.getValue();
			options.order =   this.sortRuleInput.getValue();
			if(options.col&&options.order){
				OrderBy ={Oi:[{"@Order": "", "#": ""}]};
				OrderBy.Oi[0]["@Order"] = options.order;
				OrderBy.Oi[0]["#"] = options.col;		
			}
			return OrderBy;
		},
		filter : function (showall)//实现本地  列检索
		{
			var _this = this;
			if(showall){
				this.$dom.find("#columnCatlogs").find("li").show();
			}
			var qryval = this.$dom.find("#qrytext").val().toUpperCase();
			if(WebUtil.isNull(qryval)){
				this.$dom.find("#columnCatlogs").find("li").show();
			}else{
				var $columnCatlogs = this.$dom.find("#columnCatlogs");
				this.$dom.find("#columnCatlogs").find("li").each(function(){
					var $this =$(this);
					var options =$this.data("options");
					if(!WebUtil.isNull(options)){
						var code = options.columnName||"";
						var pinyin =options.inputCode ||"";
						var name = options.colDispName||"";
						if(code.indexOf(qryval)>-1||pinyin.indexOf(qryval)>-1||name.indexOf(qryval)>-1){
							$this.show();
						}else{
							$this.hide();
						}					
					}
				});				
			}
            //过滤 无效的的列
			if(!WebUtil.isEmpty(this.disableCols)){
                var $columnCatlogs = this.$dom.find("#columnCatlogs");
                this.$dom.find("#columnCatlogs").find("li").each(function(){
                    var $this =$(this);
                    var options =$this.data("options");
                    if(!WebUtil.isNull(options)){
                        var code = options.columnName||"";
                        var pinyin =options.inputCode ||"";
                        var name = options.colDispName||"";
                        if($.inArray(code, _this.disableCols)>-1){
                            $this.hide();
                        }
                    }
                });
            }
		},
		clear:function(){
			this.$searchItems.find(".search-item").each(function(){
				var $this =$(this);
				var searchItem  =$this.data("options");	
				searchItem.clear();
			});
		},
		findCfg : function(title){
			var _this =this;
			var $dom = this.$dom.find('.customtem ul li').filter(function(index){
				return $(this).html()===title;
			});		
			var tmp = {};
			tmp.id  = $dom.data("id");
			return tmp;
			
		},
		saveCfg : function(title){
			//alert(AbisMessageResource.Alert.NotFindCorrespondConfig)
			//输入配置名字，如果输入配置名字相同，询问是否覆盖
			var id = this.findCfg(title).id;
			if(id){
				
			}
			var _this =this;
			var xml = this.getXML();
			//console.log(xml)
			var url = WebVar.VarPath + "/tblcfg/saveSearchDialog";
			var jsonData ={};
			jsonData.name =title;
			jsonData.tableName =this.tableName;
			jsonData.template= xml;
			jsonData.id = id;
			console.log(jsonData);
			jQuery.ajax({
				url:url,
				data:$.toJSON(jsonData),
				type: "POST",
				dataType : 'json',
				beforeSend: function() {},
				contentType: 'application/json',
				success : function(result) 
		        {   
		            if(!WebUtil.isNull(result)){
		            	if (result.status = WebCode.WebResultStatus.ok)
		            	{
		            		//删除配置
		            		_this.$customtem.find('li').each(function(){
		            			var $this = $(this);
		            			if($this.html()===title){
		            				$this.remove();
		            			}
		            		})
		            		//加载用户配置  列表增加一个 展示项
		            		var $li = $("<li>"+title+"</li>")
		    				$li.data("options",xml);
		    				_this.$customtem.append($li);
		            	}
		            	else
		            	{
		            		DialogUtil.openSimpleDialogForOcx(result.msg);
		            	}		            	
		            }
		        },   
		        error : function(e) 
		        {   
		            
		        }
			});
		},
		deleteCfg : function(title,id){
			var _this =this;
			var url = WebVar.VarPath + "/tblcfg/saveSearchDialog";
			var jsonData ={};
			jsonData.tableName =this.tableName;
			jsonData.name =title;
			jsonData.template= "";
			jsonData.id = id;
			jQuery.ajax({
				url:url,
				data:$.toJSON(jsonData),
				type: "POST",
				dataType : 'json',
				beforeSend: function() {},
				contentType: 'application/json',
				success : function(result) 
		        {   
		            if(!WebUtil.isNull(result)){
		            	if (result.status = WebCode.WebResultStatus.ok)
		            	{
		            		//删除配置
		            		_this.$customtem.find('li').each(function(){
		            			var $this = $(this);
		            			if($this.html()===title){
		            				$this.remove();
		            			}
		            		})
		            	}
		            	else
		            	{
		            		DialogUtil.openSimpleDialogForOcx(result.msg);
		            	}		            	
		            }
		        },   
		        error : function(e) 
		        {   
		            
		        }
			});
		},
		//合并xml
		extendXML:function(xml1,xml2){
			var json1 = (xml1&&fromXML(xml1))||{};
			this.fixFromXML(json1);
			var json2 = (xml2&&fromXML(xml2))||{};
			this.fixFromXML(json2);
			var result = $.extend(true,{},json1,json2);
			return toXML(result);
		},
		//修复一下  这fromXML 生成json的bug：如果元素（ColNode Agr等）[只有一个] 会生成对象而不是数组
		//TODO 有时间的话修复一下 fromXML的源码吧
		fixFromXML:function(json){
			//json2.SimpFilter.Group.ColNode instanceof Array
			try{
				if(!(json.SimpFilter.Group instanceof Array)){
					json.SimpFilter.Group = new Array(json.SimpFilter.Group);
				}
				for(var i = 0;i<json.SimpFilter.Group.length;i++){
					if(!(json.SimpFilter.Group[i].ColNode instanceof Array)){
						json.SimpFilter.Group[i].ColNode = new Array(json.SimpFilter.Group[i].ColNode);
					}
				}
			}catch(e){}
			try{
				if(!(json.TextFilter.Where.SimpFilter.Group instanceof Array)){
					json.TextFilter.Where.SimpFilter.Group = new Array(json.TextFilter.Where.SimpFilter.Group);
				}
				for(var i = 0;i<json.TextFilter.Where.SimpFilter.Group.length;i++){
					if(!(json.TextFilter.Where.SimpFilter.Group[i].ColNode instanceof Array)){
						json.TextFilter.Where.SimpFilter.Group[i].ColNode = new Array(json.TextFilter.Where.SimpFilter.Group[i].ColNode);
					}
				}
			}catch(e){}
			return json;
		},
		//根据字符串返回相应节点  例如 SimpFilter
		//notEmpty 是否包含没有条件的检索节点
		getXML: function (nodeName,notEmpty)
		{
		    var _this = this;
			//获取数据
			var reslutJson = 
			{
				"?": "xml version=\"1.0\" encoding=\"UTF-8\"",
				"TextFilter":{
					"Projection":{"Pi":"*"},
					"From":{"Table":""},
					"OrderBy":{"Oi":[{"@Order": "DESC", "#": "CREATE_UNIT_CODE"}]}
				}
			};
			var where = {
					SimpFilter: {
						Group: [{
							ColNode: []
						}]
				}
			};
			reslutJson.TextFilter.From.Table = this.tableName;
			var groupNum  =  1;//需要拼接的group的数量
			var firstNode = true;//第一个节点
			this.$searchItems.find(".search-item").each(function(){
				if(!reslutJson.TextFilter["Where"]){
					reslutJson.TextFilter["Where"] = where;//有检索条件再 增加  where节点
				}
				if(!reslutJson.TextFilter.Where.SimpFilter.Group[groupNum-1]){
					reslutJson.TextFilter.Where.SimpFilter.Group[groupNum-1]={ColNode: []};
				}
				var $this =$(this);
				var searchItem  =$this.data("options");
				var searchItemJson = searchItem.getJsonObject(notEmpty);
				if(searchItemJson&&searchItemJson.isGroup){
					if(!firstNode){
                        groupNum++;
					}
				}else if(searchItemJson){
					reslutJson.TextFilter.Where.SimpFilter.Group[groupNum-1].ColNode.push(searchItemJson);	
				}
                firstNode = false;
			});
            reslutJson = merge(reslutJson,this.initWhere);
            reslutJson = validateData(reslutJson);
			reslutJson.TextFilter.OrderBy = this.getSort();
			if(nodeName==="SimpFilter"){
				return  toXML(where);
			}else{
				return  toXML(reslutJson);
			}
			//写个方法  校验数据的合法性，不合法就去掉相应节点，为了适应后台解析
			function validateData(validateJsonData){
				if(validateJsonData.TextFilter["Where"]){
					var this_Where = validateJsonData.TextFilter["Where"];
					if(this_Where.SimpFilter&&this_Where.SimpFilter.Group){
						var this_Group = this_Where.SimpFilter.Group;
						for(var i = this_Group.length-1 ;i>=0;i--){
							var this_ColNode = this_Group[i].ColNode
							if(WebUtil.isNull(this_ColNode)||this_ColNode.length==0){
								validateJsonData.TextFilter["Where"].SimpFilter.Group.splice(i,1);//删除空的 group节点
								continue;
							}
						}
					}
				}
				return validateJsonData;
			}
			//写个 方法  合并 初始条件 和 用户配置的条件
            function merge(mergeJsonData,initWhere){
                if(mergeJsonData.TextFilter&&initWhere){
                    if(!mergeJsonData.TextFilter["Where"]){
                        mergeJsonData.TextFilter["Where"] = {
                            SimpFilter: {
                                Group: [{
                                    ColNode: []
                                }]
                            }
                        };
                    }
                    var this_Where = mergeJsonData.TextFilter["Where"];
                    if(this_Where.SimpFilter&&this_Where.SimpFilter.Group){
                        var this_Group = this_Where.SimpFilter.Group;
                        for(var i = this_Group.length-1 ;i>=0;i--){
                            var this_ColNode = this_Group[i].ColNode
							/*
							1 过滤空分组
							2 当所有分组都为空的时候  把初始条件合并到一个空分组中
							 */
							var hasMerge = false;
                            if(WebUtil.isArray(this_ColNode)&&(((this_Group.length===i+1)&&!hasMerge)||!WebUtil.isEmpty(this_ColNode))){
                                hasMerge = true;
                                var this_Col= {"@Col": "CREATE_TIME","@Op": "btwn","@Dt": "b",
                                    "#": {
                                        Arg: [{"@Lt": "const","@Dt":"dt","#":"20150101"}]
                                    }
                                };
                                var where;
                                for(var i_lim =_this.limitCols.length-1;i_lim>=0;i_lim--){
                                    this_Col = $.extend(true,{},this_Col);
                                    where = initWhere[_this.limitCols[i_lim]];
                                    var pageValues=[];
                                    for(var i_ColNode=this_ColNode.length-1;i_ColNode>=0;i_ColNode--){
                                        if( this_ColNode[i_ColNode]["@Col"]=== where.colName){//合并
                                            var args = this_ColNode[i_ColNode]["#"]["Arg"];
                                            for(var i_arg=args.length-1;i_arg>=0;i_arg--){
                                                pageValues.push(args[i_arg]["#"]);
                                            }
                                            this_ColNode.splice(i_ColNode,1)
                                        }
                                    }
                                    this_Col["@Col"]= where.colName;
                                    this_Col["@Op"]= where.oper;
                                    this_Col["@Dt"]= where.dataType;
                                    this_Col["#"]["Arg"]=[];
                                    if(WebUtil.isEmpty(pageValues)){
                                        //追加 初始条件
                                        for(var i_values=where.values.length-1;i_values>=0;i_values--){
                                            this_Col["#"]["Arg"].push({"@Lt": "const","@Dt":where.dataType,"#":where.values[i_values]})
                                        }
                                    }else{
                                        //合并  用户配置的条件
                                        pageValues  = WebUtil.unique(pageValues);
                                        for(var i_values=pageValues.length-1;i_values>=0;i_values--){
                                            this_Col["#"]["Arg"].push({"@Lt": "const","@Dt":where.dataType,"#":pageValues[i_values]});
                                        }
                                    }
                                    this_ColNode.push(this_Col);
                                }
                                for(var i_dis =_this.disableCols.length-1;i_dis>=0;i_dis--){//追加
                                    this_Col = $.extend(true,{},this_Col);
                                    where = initWhere[_this.disableCols[i_dis]];
                                    this_Col["@Col"]= where.colName;
                                    this_Col["@Op"]= where.oper;
                                    this_Col["@Dt"]= where.dataType;
                                    this_Col["#"]["Arg"]=[];
                                    this_Col["#"]["Arg"].push({"@Lt": "const","@Dt":where.dataType,"#":where.value1});
                                    where.value2&&this_Col["#"]["Arg"].push({"@Lt": "const","@Dt":where.dataType,"#":where.value2});
                                    mergeJsonData.TextFilter["Where"].SimpFilter.Group[i].ColNode.push(this_Col);
                                }
                            }
                        }
                    }
                }
                return mergeJsonData;
            }
		}
}
/**
 * 每一行的检索数据，运算操作复杂，单独写个类处理
 * 主要职责: 解析/拼接 一个where条件
 * @options 列描述
 * @cfgs 运算符，值 {"@Col": "CREATE_TIME","@Op": "btwn","@Dt": "b",
									"#": {
											Arg: [{"@Lt": "const","@Dt":"dt","#":"20150101"},
									            {"@Lt": "const","@Dt":"dt","#": "20150101"}]							
										 }
				 }
 * @param  扩展的参数
 * {
 *      isGroup//是否分组标示
 *      limitValues//  多选列表的可用值
 *      limitOperations //限制操作类型
 * }
 */
function SearchItem(options,cfgs,parent,param){
	this.$searchItems = parent||$(".search-items" );
	this.columnCatlog = options;
	this.limitValues = param.limitValues||[];
    this.limitOperations = param.limitOperations;
	this.initData();
	this.init(cfgs);
	if(param.isGroup&&this.$searchItem){//如果是分组标示
		this.isGroup = param.isGroup;
		this.$searchItem.children().filter('div').hide()
		this.$searchItem.children().filter('span').addClass('group')
		this.$searchItem.children().filter('span').html(this.columnCatlog.columnName)
	}
	return {};
}
SearchItem.prototype = {
		initData:function(){//组织数据格式
			var equal = '<li class="equal" operationType="eq">'+AbisMessageResource.GeneralSearch.eq+'</li>';
			var unequal = '<li class="unequal"  operationType="neq">'+AbisMessageResource.GeneralSearch.neq+'</li>';
			var __in = '<li class="equal" operationType="in">'+AbisMessageResource.GeneralSearch.eq+'</li>';
			var __noti = '<li class="unequal" operationType="noti">'+AbisMessageResource.GeneralSearch.neq+'</li>';
			var inlimit = '<li class="inlimit" operationType="btwn">'+AbisMessageResource.GeneralSearch.btwn+'</li>';
			var outlimit = '<li class="outlimit" operationType="notb">'+AbisMessageResource.GeneralSearch.notb+'</li>';
			var greater = '<li class="greater" operationType="gt">'+AbisMessageResource.GeneralSearch.gt+'</li>';
			var less = '<li class="less" operationType="lt">'+AbisMessageResource.GeneralSearch.lt+'</li>';
			var greaterEqual = '<li class="greater-equal" operationType="ge">'+AbisMessageResource.GeneralSearch.ge+'</li>';
			var lessEqual = '<li class="less-equal" operationType="le">'+AbisMessageResource.GeneralSearch.le+'</li>';
			var empty = '<li class="empty" operationType="null">'+AbisMessageResource.GeneralSearch['null']+'</li>';
			var notempty = '<li class="notempty" operationType="notn">'+AbisMessageResource.GeneralSearch.notn+'</li>';
			var match = '<li class="match" operationType="like">'+AbisMessageResource.GeneralSearch.like+'</li>';
			var nomatch = '<li class="nomatch" operationType="notl">'+AbisMessageResource.GeneralSearch.notl+'</li>';
			this.macrosLi  = '<li class="macros" operationType="macros">'+AbisMessageResource.GeneralSearch.Macros+'</li>';//宏操作
			this.operationData={};
			this.operationData["s"]=[equal,unequal,greater,less,match,nomatch,empty,notempty];//字符串
			this.operationData["d"]=[equal,unequal,inlimit,outlimit,empty,notempty];//日期
			this.operationData["t"]=[equal,unequal,inlimit,outlimit,empty,notempty];//时间
			this.operationData["dt"]=[equal,unequal,inlimit,outlimit,empty,notempty];//日期时间
			this.operationData["n"]=[equal,unequal,greater,greaterEqual,less,lessEqual,inlimit,outlimit];//数值
			this.operationData["b"]=[];//boolean
			this.operationData["code"]=[__in,__noti,match,nomatch,empty,notempty];//代码表
			this.dateType = "s";
			
			this.operationTypeCode = {//操作与样式 映射
					"btwn":"inlimit",
					"notb":"outlimit",
					"like":"match",
					"notl":"nomatch",
					"null":"empty",
					"notn":"notempty",
					"in":"equal",
					"noti":"unequal",
					"lt":"less",
					"le":"less-equal",
					"eq":"equal",
					"gt":"greater",
					"ge":"greater-equal",
					"neq":"unequal",
					"and":"",
					"not":"",
					"or":"",
					"reg_like":"",
					"nreg_like":"",
					"macros":"macros"
			};
			//支持宏操作的操作符
			this.operationTypeCodeForMacros = ["btwn","notb","like","notl","in","noti","lt",
			               					"le",
			            					"eq",
			            					"gt",
			            					"ge",
			            					"neq"]
		},
		init:function(cfgs){
			var _this =this;
			var defaultOp = "eq";
			this.dateType = (dateTypeCode[this.columnCatlog.dataType+""]||this.dateType);
			var searchItemStr  = '<div class="search-item">'+
									'<span class="item-title">{{columName}}</span>'+
									'<div class="logic-choose">'+
										'<div class="choose-current equal"></div>'+
										'<ul class="hide" id="operation">{{operationData}}'+
										'</ul>'+
									'</div>'+
									'<div id=control class="range-wrap"></div>'+
									'<div class="clear"></div>'+
								'</div>';
			searchItemStr =searchItemStr.replace("{{columName}}",this.columnCatlog.colDispName);
            var operationData;
            if(this.columnCatlog.codeTableName){
                operationData = this.operationData["code"];
                defaultOp = "in";
            }else{
                operationData = this.operationData[this.dateType];
            }
            operationData =operationData.join("");
			searchItemStr =searchItemStr.replace("{{operationData}}",operationData);
			this.$searchItem= $(searchItemStr)
			this.$searchItem.data("options",this);//缓存检索数据行对象
			this.$searchItems.append(this.$searchItem);
			this.changeOperation(cfgs&&cfgs['@Op']||defaultOp,cfgs&&(cfgs["Arg"]||cfgs['#']&&cfgs['#']["Arg"]));
			this.$searchItem.find("#operation li").bind('click', function (e){//清空
                if(_this.limitOperations){
                    return;
                }
				var operationType = $(this).attr("operationType");
				_this.changeOperation(operationType);
				_this.$searchItem.find("#operation").addClass('hide');
				
			});
		},
		changeOperation:function(op,arg){//运算符改变
			var _this = this;
			var macrosOperation ="macros";//宏标示  常量
			if(op===macrosOperation){
				if($.inArray(this.op, _this.operationTypeCodeForMacros) !== -1){
					for (var i = 0; i < this.controls.length; i++) { 
						var control  =this.controls[i];
						var $control = $( "#"+control.id);
						if($control.is(":visible")) {
							$control.hide();
						}else{
							$control.show();
						}
					}
					return;
				}else{
					//无效的宏操作
					return;
				}
			}
			if(WebUtil.isNull(op)||op===this.op){
				return;
			}else{
				this.controls = [];
			}
            if (op === "in" || op === "noti") {
                //in notin 多个 arg标签合并
                if (arg instanceof Array && arg.length>1) {
                    var argNew = $.extend({}, arg[0]);
                    var valueNew;
                    for (var index = 0; index < arg.length; index++) {
                        if(valueNew){
                            valueNew= valueNew+","+arg[index]["#"];
                        }else{
                            valueNew= arg[index]["#"];
                        }
                    }
                    argNew["#"]=valueNew;
                    arg=[];
                    arg.push(argNew);
                }
            }
            this.op = op;
            this.arg = arg||[];
			//样式切换
			var className = this.operationTypeCode[op];
			this.$searchItem.find('.choose-current').prop('className','choose-current '+className)
			//控件切换
			var $control =this.$searchItem.find("#control");
			switch(className)
			{
				case "equal":
				case "unequal":
				case "greater":
				case "less":
				case "greater-equal":	
				case "less-equal":	
					$control.html("");
					var id  =  this.columnCatlog.columnName+new Date().getTime()+""+parseInt(Math.random()*1000);
					var divid = id+ "div";
					$control.append($("<div id=\"" + divid + "\"></div>"));
					var value = this.arg&&(this.arg["#"]||(this.arg[0]&&this.arg[0]["#"])||"");
					var xmlOp = this.arg&&(this.arg["@Dt"]||(this.arg[0]&&this.arg[0]["@Dt"])||"");
					var xmlLt = this.arg&&(this.arg["@Lt"]||(this.arg[0]&&this.arg[0]["@Lt"])||"");
					var text = createControl(divid,id,this.dateType,this.columnCatlog,null,value,xmlOp,xmlLt);
					break;
				case "match":	
				case "nomatch":
					//匹配非匹配特殊处理，创建文本控件
					$control.html("");
					var id  =  this.columnCatlog.columnName+new Date().getTime()+""+parseInt(Math.random()*1000);
					var divid = id+ "div";
					$control.append($("<div id=\"" + divid + "\"></div>"));
					var value = this.arg&&(this.arg["#"]||(this.arg[0]&&this.arg[0]["#"])||"");
					var xmlOp = this.arg&&(this.arg["@Dt"]||(this.arg[0]&&this.arg[0]["@Dt"])||"");
					var text = createControl(divid,id,"s",null,null,value);
					break;
				case "inlimit":	
				case "outlimit":
					$control.html("");
					var id  =  this.columnCatlog.columnName+new Date().getTime()+""+parseInt(Math.random()*1000);
					var divid = id + "div";
					var idEnd  =  this.columnCatlog.columnName+new Date().getTime()+""+parseInt(Math.random()*1000)+"End";
					var dividEnd = idEnd + "div";
					$control.append($("<div id='" + divid + "' class='first-control' ></div><p class='between-control'><span>-</span></p><div id='" + dividEnd + "' class='second-control'></div>"));
					var value1 = this.arg&&this.arg[0]&&this.arg[0]["#"]||"";
					var value2 = this.arg&&this.arg[1]&&this.arg[1]["#"]||"";
					var xmlOp1 = this.arg&&(this.arg["@Dt"]||(this.arg[0]&&this.arg[0]["@Dt"])||"");
					var xmlOp2 = this.arg&&(this.arg["@Dt"]||(this.arg[1]&&this.arg[1]["@Dt"])||"");
                    var xmlLt1 = this.arg&&(this.arg["@Lt"]||(this.arg[0]&&this.arg[0]["@Lt"])||"");
                    var xmlLt2 = this.arg&&(this.arg["@Lt"]||(this.arg[1]&&this.arg[1]["@Lt"])||"");
                    var text1 = createControl(divid,id,this.dateType,this.columnCatlog,"rangetext",value1,xmlOp1,xmlLt1);
					var text2 = createControl(dividEnd,idEnd,this.dateType,this.columnCatlog,"rangetext",value2,xmlOp2,xmlLt2);
//					text1.setValue(value1);
//			     	text2.setValue(value2);
					break;
				case "empty":
					$control.html("");
					$control.append($('<input type="text" class="textinput readonly" value="'+AbisMessageResource.GeneralSearch['null']+'" disabled="disabled">'));
					break;
				case "notempty":
					$control.html("");
					$control.append($('<input type="text" class="textinput readonly" value="'+AbisMessageResource.GeneralSearch.notn+'" disabled="disabled">'));
					break;	
			}	
			//创建宏操作控件
			function createMacrosControl(divid,id,columnCatlog,value,css){
                id  = id+"__Macros__";
                var macrosInput= WebUI.createMultipleCombo(divid,id,null,null,false,true,null,null,null,{single:true});
                macrosInput.setComboData(this.getMacrosByColumnCatlog());
				macrosInput.setValue(value);
				return macrosInput;
			}
			//根据数据类型，是否代码表 创建控件
			function createControl(divid,id,dateType,columnCatlog,css,value,xmlOp,xmlLt){
				//创建普通业务控件
				var abisInput = null;
				columnCatlog = columnCatlog||{};
				value= value||"";
				var codeTableName = columnCatlog.codeTableName;
				var	tableName=columnCatlog.tableName;
				var	columnName=columnCatlog.columnName;
				var codeDispStyle =columnCatlog.codeDispStyle;
				if(codeTableName){
					var showCode = false;
					var itemType = 0;
					//abisInput = WebUI.createSearchCombo(divid,id,null,null,false,null,tableName+"|"+columnName)
					if(codeDispStyle==ABISCode.CodeDispStyleType.CODE){
						showCode = true;
						itemType = 2;
					}
					abisInput = WebUI.createMultipleCombo(divid,id,null,null,showCode,false,null,tableName+"|"+columnName,itemType)
					var  colNameList = [];
					colNameList.push(tableName+"|"+columnName);
					var colFilterRgxs ="";
					WebComboUtil.getCodeTable(colNameList,getComboData,colFilterRgxs)
					function getComboData(data) {
							if(WebUtil.isNull(data)) return;
							if(typeof data == 'string') {
								data =JSON.parse(data);
							}
							data = data[colNameList[0].toUpperCase()]||data[colNameList[0].toLowerCase()]||data[("_base_8cdd25a0_|"+columnName).toLowerCase()]||data[("_base_8cdd25a0_|"+columnName).toUpperCase()];
                            var filterdata = [];
							for(var i_lim=_this.limitValues.length-1;i_lim>=0;i_lim--){
							    var code = _this.limitValues[i_lim]+"";
                                for(var i_data=data.length-1;i_data>=0;i_data--){
                                    if(code===data[i_data].code){
                                        filterdata.push(data[i_data]);
                                    }
                                }
                            }
                            if(!WebUtil.isEmpty(filterdata)){
                                abisInput.setComboData(filterdata);
                            }else if(!WebUtil.isEmpty(data)){
                                abisInput.setComboData(data);
                            }
							abisInput.setValue(value)
					}
				}else{
					switch(dateType)
					{
						case "s":
							abisInput = WebUI.createText(divid, id, css||"WebTextField", "");
							break;
						case "d":
							abisInput = WebUI.createDateText(divid, id, css||"WebTextField", "");
							break;
						case "t":
							abisInput = WebUI.createDateText(divid, id, css||"WebTextField", "");
							break;
						case "dt":
							abisInput = WebUI.createDateTimeText(divid, id, css||"WebTextField", "");
                            value= WebUtil.string2DateString(value);
							break;
						case "n":
							abisInput = WebUI.createText(divid, id, css||"WebTextField", "");
							break;
						//case "b":	
                    }
					abisInput&&abisInput.setValue(value);
				}
				abisInput&&_this.controls.push(abisInput);
				//创建 宏控件
                var macrosInput=  createMacrosControl.call(_this,divid,id,columnCatlog,value,css);
				macrosInput&&_this.controls.push(macrosInput);
				if(xmlLt&&xmlLt==='macro'){
					abisInput.setValue("");
					$("#"+abisInput.id).parent().hide();
				}else{
					$("#"+macrosInput.id).parent().hide();
				}
                if(_this.getMacrosByColumnCatlog().length>0){//宏切换标示
					var $img = $('<img width="24" height="24" title="切换" style="float: left;display: inline-block"' + '>')
                    $img.attr("src",WebVar.VarPath+"/image/abis/search/macros_change.png")
                    $img.attr("title",AbisMessageResource.GeneralSearch.MacrosSwitch);
                    $img.click(function () {
                    	if($("#"+abisInput.id).is(":visible")){
                            $("#"+abisInput.id).parent().hide();
                            $("#"+macrosInput.id).parent().show();
						}else{
                            $("#"+abisInput.id).parent().show();
                            $("#"+macrosInput.id).parent().hide();
						}
                    })
                    $("#"+divid).append($img)
                }
				return abisInput;
			}
		},
		//是否允许没有检索数据的节 点
		getJsonObject:function(notEmpty){
			if(this.isGroup){
				return {"isGroup":true};
			}
			//获取数据
			var reslut =  {"@Col": "CREATE_TIME","@Op": "btwn","@Dt": "b",
							"#": {
								Arg: [{"@Lt": "const","@Dt":"dt","#":"20150101"}]							
								  }
	          }
			reslut['@Col']=this.columnCatlog.columnName;
			reslut['@Op']=this.op;
			if(this.columnCatlog.storageFmt){
				reslut['@Dt']=dateTypeCode[this.columnCatlog.storageFmt];
			}else{
				reslut['@Dt']=this.dateType;
			}
			reslut['#']["Arg"]=[];
			for (var i = 0; i < this.controls.length; i++) { 
				var control  =this.controls[i];
				if(!($("#"+control.id).is(":visible"))) {
					continue;  //不添加隐藏域
				}
				var arg = {};
                arg["@Dt"] = this.dateType;
				if(control.id.indexOf('__Macros__')>-1){
                    arg["@Lt"] = "macro";
                    arg["@Dt"] = "s";
				}else{
                    arg["@Lt"] = "const";
				}
				var value = formatOutputValue(control);
				if(value instanceof Array){
				    //in notin 生成多个Arg
                    for(var index=0;index<value.length;index++){
                        var argNew = $.extend({},arg);
                        argNew["#"] = value[index];
                        reslut['#']["Arg"].push(argNew);
                    }
				}else{
                    arg["#"] = value;
                    reslut['#']["Arg"].push(arg);
                }
			}
			if(notEmpty){//非空过滤
                if((this.op!=="null"&&this.op!=="notn")){
                    if(reslut['#']["Arg"].length==1){
                        var node = reslut['#']["Arg"][0];
                        if(WebUtil.isEmpty(node['#'])){
                            reslut=null;
                        }
                    }else if(reslut['#']["Arg"].length==2){
                        var node1 = reslut['#']["Arg"][0];
                        var node2 = reslut['#']["Arg"][1];
                        if(WebUtil.isEmpty(node1['#'])&&WebUtil.isEmpty(node2['#'])){
                            reslut=null;
                        }
                    }else if(reslut['#']["Arg"].length==0){
                        reslut=null;
                    }
                }
			}

			function formatOutputValue(webInput){//格式化界面返回值
                var value = webInput.getValue();
                //2017年11月3日16:38:05  通用检索日期格式  为yyyyMMddsshhmm....
                if(webInput.type===WebUI.WebInputType.Date){
                    value = WebUtil.dateTime2Date(value);
                }else  if(webInput.type===WebUI.WebInputType.DateTime){
                    value = WebUtil.dateTime2DateTime(value);
                }else if(webInput.type===WebUI.WebInputType.Time){
                    value =WebUtil.time2Time(value);
                }
                return value
            }


			return reslut;
		},
		setJsonObject:function(reslut){
			
		},
		clear : function(){
			for (var i = 0; i < this.controls.length; i++) { 
				var control  =this.controls[i];
				control.setValue("");
			}
		},
        getMacrosByColumnCatlog:function(columnCatlog){
            columnCatlog = columnCatlog||this.columnCatlog;
            var data_date = [];
            data_date.push({"code":"$TODAY","text":AbisMessageResource.GeneralSearch.macros['$TODAY']});
            data_date.push({"code":"$YESTERDAY","text":AbisMessageResource.GeneralSearch.macros['$YESTERDAY']});
            data_date.push({"code":"$THIS_WEEK","text":AbisMessageResource.GeneralSearch.macros['$THIS_WEEK']});
            data_date.push({"code":"$LAST_WEEK","text":AbisMessageResource.GeneralSearch.macros['$LAST_WEEK']});
            data_date.push({"code":"$THIS_MONTH","text":AbisMessageResource.GeneralSearch.macros['$THIS_MONTH']});
            data_date.push({"code":"$LAST_MONTH","text":AbisMessageResource.GeneralSearch.macros['$LAST_MONTH']});
            data_date.push({"code":"$THIS_QUARTER","text":AbisMessageResource.GeneralSearch.macros['$THIS_QUARTER']});
            data_date.push({"code":"$LAST_QUARTER","text":AbisMessageResource.GeneralSearch.macros['$LAST_QUARTER']});
            data_date.push({"code":"$THIS_YEAR","text":AbisMessageResource.GeneralSearch.macros['$THIS_YEAR']});
            var data_string = [];
            data_string.push({"code":"$CUR_USER_NAME","text":AbisMessageResource.GeneralSearch.macros['$CUR_USER_NAME']});
            data_string.push({"code":"$CUR_UNIT_CODE","text":AbisMessageResource.GeneralSearch.macros['$CUR_UNIT_CODE']});
            data_string.push({"code":"$CUR_USER_IP","text":"当前登录用户操作的机器的IP地址"});
            data_string.push({"code":"$CUR_USER_MAC","text":"当前登录用户的MAC"});
            data_string.push({"code":"$CUR_USER_MODULE_NAME","text":"当前用户使用的客户端的名称"});
            data_string.push({"code":"$CUR_USER_LOGIN_TIME","text":"当前用户的登录时间"});
            data_string.push({"code":"$CUR_USER_COMPUTER_NAME","text":"用户登录的机器的名称"});
            data_string.push({"code":"$CUR_USER_ID","text":AbisMessageResource.GeneralSearch.macros['$CUR_USER_ID']});
            var data_user = [];//用户宏操作
            data_user.push({"code":"$CUR_USER_NAME","text":AbisMessageResource.GeneralSearch.macros['$CUR_USER_NAME']});
            data_user.push({"code":"$CUR_USER_ID","text":AbisMessageResource.GeneralSearch.macros['$CUR_USER_ID']});
            var data_unit = [];//单位宏操作
            data_unit.push({"code":"$CUR_UNIT_CODE","text":AbisMessageResource.GeneralSearch.macros['$CUR_UNIT_CODE']});
            var result = [];
            if((columnCatlog.storageFmt!==2)&&(columnCatlog.dataType===3||columnCatlog.dataType===4||columnCatlog.dataType===5)){
                result=data_date;
            }else if(columnCatlog.macroType===1){
                result=data_user;
            } else  if (columnCatlog.macroType===2){
                result=data_unit;
            }
            return result;
        }
}
var colDataDemo ={"@Col": "CREATE_TIME","@Op": "btwn","@Dt": "b",
    "#": {
        Arg: [{"@Lt": "const","@Dt":"dt","#":"20150101"}]
    }
};
var  dateTypeCode = {
    "0":"s",
    "1":"n",
    "2":"s",
    "3":"d",
    "4":"t",
    "5":"dt",
    "6":"n",
    "7":"b"
}
//模拟数据
var searchData= {
	json:{
		"?": "xml version=\"1.0\" encoding=\"UTF-8\"",
		TextFilter:{
//			FirstRowPos:100,
//			MaxRowCount:1000,
			Projection:[{Pi:"CREATE_UNIT_CODE"},{Pi:"COUNT(CREATE_UNIT_CODE)"}],
			From:{Table:"MIS_PERSONS"},
//			GroupBy:"CREATE_UNIT_CODE",
//			Having:"COUNT(CREATE_UNIT_CODE)&lt;0",
//			'OrderBy':{'Oi':[{"@Order": "DESC", "#": "CREATE_UNIT_CODE"}]},
			Where: {
				SimpFilter: {
					Group: {
						ColNode: [
						          {"@Col": "CREATE_TIME","@Op": "btwn","@Dt": "b",
									"#": {
											Arg: [{"@Lt": "const","@Dt":"dt","#":"20150101"},
									            {"@Lt": "const","@Dt":"dt","#": "20150101"}]							
										 }
						          }
						          ]
					}
				},
				ComplexFilter: {}
			}	
		}
	},
	xml:'<?xml version="1.0" encoding="UTF-8"?><TextFilter><FirstRowPos>100</FirstRowPos><MaxRowCount>1000</MaxRowCount><Projection><Pi>CREATE_UNIT_CODE</Pi></Projection><Projection><Pi>COUNT(CREATE_UNIT_CODE)</Pi></Projection><From><Table>MIS_PERSONS</Table></From><GroupBy>CREATE_UNIT_CODE</GroupBy><Having>COUNT(CREATE_UNIT_CODE)&amp;lt;0</Having><OrderBy><Oi Order="DESC">CREATE_UNIT_CODE</Oi></OrderBy><Where><SimpFilter><Group><ColNode Col="CREATE_TIME" Op="btwn" Dt="b"><Arg Lt="const" Dt="dt">20150101</Arg><Arg Lt="const" Dt="dt">20150101</Arg></ColNode></Group></SimpFilter><ComplexFilter></ComplexFilter></Where></TextFilter>'
}

