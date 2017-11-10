
SendMatchTask.prototype.partTypeList= null;
SendMatchTask.prototype.partType	= null;
SendMatchTask.prototype.bty 		= null;
SendMatchTask.prototype.matchType	= null;
//普通控件缓存数组
SendMatchTask.prototype.webInputArr = [];

function SendMatchTask()
{
	this.initUI();
}
/*
 param.cards  格式规范：
            [{
            cardId,
            cardNum,
            printType//卡片类型，捺印/现场
            }]
 */
SendMatchTask.prototype.init = function(param)
{
	this.param = param;
	
	this.initMatchType();
	
	this.load();
}

SendMatchTask.prototype.initUI = function()
{
    var requiredField = ["PartType_UI","Bty_UI","Alg_UI","MP_UI","SrcMntGid_UI","Priority_UI","CandCnt_UI"];
	this.partTypeCombo	= WebUI.createCombo("PartType", "PartType_UI", "ItemWidth", null,true,true,null,AbisMessageResource.Match["MatchPartitionType"], requiredField,2,2);
	this.btyCombo		= WebUI.createCombo("Bty", "Bty_UI", "ItemWidth", null,true,true,null,AbisMessageResource.Match["Bty"], requiredField,2,2);
	this.algCombo		= WebUI.createCombo("Alg", "Alg_UI", "ItemWidth", null,true,true,null,AbisMessageResource.Match["MatchAlgorithm"], requiredField,2,2);
	this.mp				= WebUI.createSearchCombo("MP","MP_UI","ItemWidth", 2, false,requiredField);
	this.srcMntGid		= WebUI.createCombo("SrcMntGid", "SrcMntGid_UI", "ItemWidth", null,true,true,null,AbisMessageResource.Match["SrcCardFeatureGroup"], requiredField,2,2);
	this.priority		= WebUI.createCombo("Priority", "Priority_UI", "ItemWidth", null,true,true,null,AbisMessageResource.Match["MatchPriority"], requiredField,2,2);
	this.maxCandCnt 	= WebUI.createText("MaxCandCnt", "CandCnt_UI", "CandCntTxt", AbisMessageResource.Match["MaxCandNum"], requiredField);
	this.webInputArr.push(this.partTypeCombo)
	this.webInputArr.push(this.btyCombo)
	this.webInputArr.push(this.algCombo)
	this.webInputArr.push(this.mp)
	this.webInputArr.push(this.srcMntGid)
	this.webInputArr.push(this.priority)
	this.webInputArr.push(this.maxCandCnt)
	//增加校验
	var maxCandCntParam={};
	maxCandCntParam.isdigital=true;
	maxCandCntParam.mixvalue=1;
	maxCandCntParam.maxvalue=10000;	
	this.maxCandCnt.setValidateType(maxCandCntParam);
	this.maxCandCnt.setErrorTip("MaxCandCnt_tip");
	this.srcMntGid.setValidateType({});
	//初始值
	this.maxCandCnt.setValue(50);
	WebComboUtil.addClickListener();
	
	this.partTypeCombo.addChangeListener(call);
	this.btyCombo.addChangeListener(call);
	this.algCombo.addChangeListener(call);
	this.mp.addChangeListener(call);
	
	var nThis = this;
	function call(id,code,text)
	{
		switch(id)
		{
			case "PartType_UI":
				nThis.changePartType();
				break;
			case "Bty_UI":
				nThis.changeBty();
				break;
			case "Alg_UI":
				nThis.changeAlg();
				break;
			case "MP_UI":
				nThis.changeMp(id,code,text);
				break;
		}
	}
	
	//
	var data = 
	[
		{id:"IncludeMnt",text:AbisMessageResource.Match["BandFeatureMatch"],enabled:true}
	];
	var bntSetting = 
	{
		param:		{colCount:1}
	}
	this.IncludeMnt = new CheckBnt("IncludeMnt",data,bntSetting);
}

SendMatchTask.prototype.changeMp = function(id,value,text)
{
	
}

SendMatchTask.prototype.setParam = function(param)
{
	this.init(param);
}

SendMatchTask.prototype.initMatchType = function()
{
	var data = {}
	if(this.param.printType == ABISCode.PrintTypeCode.PRINT_TP)
	{
		data = 
		[
			{id:"tt",text:AbisMessageResource.Match["TPTT"],checked:true},
			{id:"tl",text:AbisMessageResource.Match["TPTL"]}
		];
		if(this.matchType===ABISCode.MatchTypeCode.TL){
			//保存上一次的类型
			data[0].checked = false;
			data[1].checked = true;
		}else{
			this.matchType = ABISCode.MatchTypeCode.TT;
		}
		
	}
	else
	{
		data = 
		[
			{id:"lt",text:AbisMessageResource.Match["LPLT"],checked:true},
			{id:"ll",text:AbisMessageResource.Match["LPLL"]}
		];
		if(this.matchType===ABISCode.MatchTypeCode.LL){
			//上一次的类型
			data[0].checked = false;
			data[1].checked = true;
		}else{
			this.matchType = ABISCode.MatchTypeCode.LT;
		}
	}
	var bntSetting = 
	{
		param:		{colCount	: 2},
		callback:	{onClick	: qryTypeEvent}
	}
	var className = {};
	className.check = "radio";
	className.ncheck = "nradio";
	className.checkhover = "radiohover";
	$("#MatchType").empty();
	var bnts = new CheckBnt("MatchType", data, bntSetting,className);
	
	var nThis = this;
	function qryTypeEvent(id,checked)
	{
		if(checked == false)
		{
			bnts.setSelected(id, true);
			return;
		}
		if(id == "tt")
		{
			bnts.setSelected("tl", false);
			nThis.matchType = ABISCode.MatchTypeCode.TT;
		}
		if(id == "tl")
		{
			bnts.setSelected("tt", false);
			nThis.matchType = ABISCode.MatchTypeCode.TL;
		}
		if(id == "lt")
		{
			bnts.setSelected("ll", false);
			nThis.matchType = ABISCode.MatchTypeCode.LT;
		}
		if(id == "ll")
		{
			bnts.setSelected("lt", false);
			nThis.matchType = ABISCode.MatchTypeCode.LL;
		}
		nThis.loadPartType();
	}
}

SendMatchTask.prototype.load = function()
{
	var nThis = this;
	var url = WebVar.VarPath + "/match/sendmatch/load/";
	jQuery.ajax( 
    {
		type : 'POST',
		contentType : 'application/json',
		url : url,
		data : $.toJSON(this.param),
		dataType : 'json',
		success : function(resultInfo)
		{
			if(resultInfo.status===WebCode.WebResultStatus.ok){
                var data = resultInfo.data;
                nThis.initData(data);
            }else{
                DialogUtil.openSimpleDialogForOcx(resultInfo.msg);
			}
		},
		error : function(e) 
		{
			alert(AbisMessageResource.Alert['SearchError']);
		}   
	});
}

SendMatchTask.prototype.initData = function(data)
{
	this.data = data;
	if(WebUtil.isNull(data))return;
	this.loadPartType();
	
	// 比对优先级单独加载
	var ds = new Array();
	var prioritys = this.data.prioritys;
	for(var code in prioritys)
	{
		var code = prioritys[code];
		ds.push(code);
	}
	this.priority.setComboData(ds);
	if(!WebUtil.isEmpty(ds))
	{
		this.priority.setValue(ABISCode.PriorityCode.NORMAL);
	}
	this.priority.combo.setListStyle({height:65});//避免iframe显示不下  
}

SendMatchTask.prototype.getBty = function()
{
	var bty = this.btyCombo.getValue();
	if(WebUtil.isNull(bty))return null;
	return 	parseInt(bty);
}

SendMatchTask.prototype.getAlgId = function()
{
	var obj = this.algCombo.getObject();
	if(obj == null) return null;
	return obj.code;
}

SendMatchTask.prototype.getPartType = function()
{
	var partType = this.partTypeCombo.getValue();
	if(WebUtil.isNull(partType))return null;
	return parseInt(partType);
}

SendMatchTask.prototype.getSrcMntGid = function()
{
	var obj = this.srcMntGid.getObject();
	if(obj == null) return null;
	return obj.code;
}

SendMatchTask.prototype.getPriority = function()
{
	var obj = this.priority.getObject();
	if(obj == null) return null;
	return obj.code;
}

SendMatchTask.prototype.getPrintType = function()
{
	//2017年9月22日13:16:52 韩健祥 用来过滤比对分区
	var printType = ABISCode.PrintTypeCode.PRINT_LP;
	if(this.matchType === ABISCode.MatchTypeCode.TT || this.matchType === ABISCode.MatchTypeCode.LT)
	{
		printType = ABISCode.PrintTypeCode.PRINT_TP;
	}
	return printType;
}
SendMatchTask.prototype.getPrintType2 = function()
{
    //用来过滤特征组
    var printType = ABISCode.PrintTypeCode.PRINT_LP;
    if(this.matchType === ABISCode.MatchTypeCode.TT || this.matchType === ABISCode.MatchTypeCode.TL)
    {
        printType = ABISCode.PrintTypeCode.PRINT_TP;
    }
    return printType;
}
// 加载比对分区类型
SendMatchTask.prototype.loadPartType = function()
{
	if(this.data == null)return;
	var mps = this.data.mps;
	if(mps == null)return;
	var codes = this.data.partTypes;
	
	var printType = this.getPrintType();
	
	var vDs = {};
	var ds = new Array();
	if(!WebUtil.isEmpty(mps))
	{
		for(var i =0;i<mps.length;i++)
		{
			var mp = mps[i];
			if(mp.printType == printType)
			{
				if(vDs[mp.partType] != null)continue;
				var text = mp.description;
				if(codes != null)
				{
					var c = codes[mp.partType];
					if(c != null)
					{
						text = c.text;
					}
				}
				var data = {};
				data.code 	= mp.partType;
				data.pinyin	= text;
				data.text	= text;
				data.data 	= mp;
				ds.push(data);
				vDs[mp.partType] = data;
			}
		}
		this.partTypeCombo.setComboData(ds);
		this.partTypeCombo.setValue(ds[0].code);
	}
	else
	{
		this.partTypeCombo.setComboData(ds);
	}
	
	this.loadBty();
}

SendMatchTask.prototype.loadBty = function()
{
	if(this.data == null)return;
	var mps = this.data.mps;
	if(mps == null)return;
	var btyCodes = this.data.btys;
	var printType = this.getPrintType();
	
	var obj = this.partTypeCombo.getObject();
	if(obj == null)return;
	var part = obj.data;
	
	var btyList = new Array();
	for (var i in mps)
	{
		var mp = mps[i];
		if (mp.printType == printType && mp.partType == part.partType)
		{	
			var btyMask = mp.btyMask;
			if(typeof(this.param.bty) != 'undefined' && this.param.bty != null)
			{
				var btyMask = this.param.bty;
			}
			var btys = ABISCode.BtyFlagCode.flagToBtys(btyMask);
			if(btys != null)
			{
				for(var i in btys)
				{
					var bty = btys[i];
					
					if(jQuery.inArray(bty, btyList)== -1 )
					{
						btyList.push(bty);
					}
				}
			}
		}
	}
	
	var ds = new Array();
	var first = null;
	for(var i in btyList)
	{
		var bty = btyList[i];
		if(btyCodes != null)
		{
			var c = btyCodes[bty];
			if(c != null)
			{
                var data = {};
                data.code 	= bty;
                data.pinyin	= c.pinyin;
                data.text	= c.text;
                data.data 	= null;
                ds.push(data);
			}
		}
	}
	this.btyCombo.setComboData(ds);
	if(!WebUtil.isEmpty(ds))
	{
		this.btyCombo.setValue(ds[0].code);
	}

	this.loadAlg();
}
//读取比对算法
SendMatchTask.prototype.loadAlg = function()
{
	if(this.data == null) return;
	var algs = this.data.algs;
	if(algs == null) return;
	
	var bty = this.getBty();
	if(bty == null) return;
	var curAlgs = {};
	for (var i in algs)
	{
		var alg = algs[i];
		if (alg.qryType == this.matchType)
		{
			var btys = ABISCode.BtyFlagCode.flagToBtys(alg.btyFlag);
			if(jQuery.inArray(bty, btys) != -1)
			{
				var obj = curAlgs[alg.searchAlgId];
				if(obj == null)
				{
					curAlgs[alg.searchAlgId] = alg;
				}
			}
		}
	}
	
	var  grps = this.getMntFmtGroup();
	var supportedAlg = new Array();
	for (var i in curAlgs)
	{
		var alg = curAlgs[i];
		if (grps[alg.defaultMntFmtId])
		{
		    //缺省比对分区
			supportedAlg.push(alg);
		}else if(alg.supportedMntFmtId){
		    //支持的比对分区
            var supportedMntFmtIds = alg.supportedMntFmtId.split(",");
            for(var mntFmtIndex=0;mntFmtIndex<supportedMntFmtIds.length;mntFmtIndex++){
                var mntFmtId = supportedMntFmtIds[mntFmtIndex];
                if (grps[mntFmtId])
                {
                    supportedAlg.push(alg);
                    break;
                }
            }
           // supportedAlg.push(alg);//2017年8月14日18:03:25 暂时不通过比对分区过滤算法
        }
	}

	var ds = new Array();
	for (var i in supportedAlg)
	{
		var alg = supportedAlg[i];
		var d = {};
		d.code 	= alg.searchAlgId;
		d.text 	= alg.description;
		d.pinyin= alg.description;
		d.data 	= alg;
		ds.push(d);
	}
	this.algCombo.setComboData(ds);

	// 选择第一个算法
	if (!WebUtil.isEmpty(ds))
	{
		var obj = ds[0];
		var alg = obj.data;
		this.algCombo.setValue(alg.searchAlgId);
	}
	this.loadMp();
	this.loadSrcMntGid();
}

//更新显示的比对分区
SendMatchTask.prototype.loadMp = function()
{
	var datas = new Array();
	var db = null;
	var grps = this.getMntFmtGroup();
	var obj = this.algCombo.getObject();
	if(obj != null)
	{
		var alg = obj.data;
		// var mntFmtId = alg.defaultMntFmtId;
		// var mps = grps[mntFmtId];
		// if(mps != null)
		// {
		// 	for(var i in mps)
		// 	{
		// 		var mp 		= mps[i];
		// 		var d 		= {};
		// 		d.code 		= mp.id;
		// 		d.text		= mp.description;
		// 		d.pinyin	= mp.description;
		// 		datas.push(d);
		// 	}
		// }
        if(alg.supportedMntFmtId){
            //支持的比对分区
            var supportedMntFmtIds = alg.supportedMntFmtId.split(",");
            for(var mntFmtIndex=0;mntFmtIndex<supportedMntFmtIds.length;mntFmtIndex++){
                var mntFmtId = supportedMntFmtIds[mntFmtIndex];
                if (grps[mntFmtId])
                {
                    for(var i in grps[mntFmtId])
                    {
                        var mp 		= grps[mntFmtId][i];
                        var d 		= {};
                        d.code 		= mp.id;
                        d.text		= mp.description;
                        d.pinyin	= mp.description;
                        datas.push(d);
                    }
                }
            }
        }
	}
	this.mp.setComboData(datas);
	if(!WebUtil.isEmpty(datas))
	{
	    var selelctValue = null;
	    for(var datasIndex in datas){
            selelctValue=selelctValue===null?datas[datasIndex].code:(selelctValue+","+datas[datasIndex].code)
        }
		this.mp.setValue(selelctValue);
	}
}
//更新源卡特征组
SendMatchTask.prototype.loadSrcMntGid = function()
{
	if(this.data == null)return;
	var dbs = this.data.dbs;
	if(dbs == null)return;
	
	var bty = this.getBty();
	if(bty != null)
	{
		var printType = this.getPrintType2();
		var cfgs = new Array();
		for (var i  in dbs)
		{
			var db = dbs[i];
			if (db.printType == printType && db.bty == bty)
			{
				cfgs.push(db);
			}
		}
		var obj = this.algCombo.getObject();
		if(obj != null)
		{
			var alg = obj.data;
			var ds = new Array();
			var select = null;
			for(var i in cfgs)
			{
				var db = cfgs[i];
				var d 		= {};
				d.code		= db.groupId;
				d.text 		= db.description;
				d.pinyin	= db.description;
				ds.push(d);	
//韩健祥 2017年6月30日11:22:42  hjx
//这是 缺省的提取算法，不能用来联动 比对算法
//				if(db.defaultMexMethod == alg.searchAlgId)
//				{
//					select = d;
//				}			
				if(select==null&&WebUtil.isEmpty(this.srcMntGid.getValue())){
					//缺省值初始化为第一个
					select = d;
				}
			}
			this.srcMntGid.setComboData(ds);
			if(select != null)
			{
				this.srcMntGid.setValue(select.code);
			}
		}
	}
	
}
//通过比对类型，生物特征类型和分区类型  ，过滤比对分区 
SendMatchTask.prototype.getPartitions = function()
{
	if(this.data == null) return null;
	
	var mps = this.data.mps;
	if(mps == null) return null;
	
	var partType = this.getPartType();
	if(partType == null) return null;
	
	var bty = this.getBty();
	if (bty == null) return null;
	
	var printType = this.getPrintType();
	
	var parts = new Array();
	for(var i in mps)
	{
		var mp = mps[i];
		if(mp.printType == printType && mp.partType == partType)
		{
			var btys = ABISCode.BtyFlagCode.flagToBtys(mp.btyMask);
			if(jQuery.inArray(bty, btys) != -1)				
			{
				parts.push(mp);
			}
		}
	}
	return parts;
}

/** 按特征格式进行分组，前提是满足比对类型，生物特征类型和分区类型 */
SendMatchTask.prototype.getMntFmtGroup = function()
{
	var parts = this.getPartitions();
	if(parts == null)return;
	
	var grps = {};
	for(var i in parts)
	{
		var part = parts[i];
		var mps = grps[part.matchMntFmt];
		if (mps == null)
		{
			mps = new Array();
			grps[part.matchMntFmt] = mps;
		}
		mps.push(part);
	}
	return grps;
}

SendMatchTask.prototype.changePartType = function()
{
	this.loadBty();
}

SendMatchTask.prototype.changeBty = function()
{
	this.loadAlg();
}

SendMatchTask.prototype.changeAlg = function()
{
	this.loadMp();
	this.loadSrcMntGid();
}

SendMatchTask.prototype.getParam = function()
{
	if(!this.isPassLenValidate()|!this.validateRequired()){
		return;
	}
	var p = {};
	p.cards 		= this.param.cards;
	p.matchType 	= this.matchType;
	p.bty 			= this.getBty();
	p.matchMethodId	= this.getAlgId(); 
	p.mpIds			= this.mp.getValue();
	p.srcMntGid 	= this.getSrcMntGid();
	p.priority		= this.getPriority();
	p.maxCandCnt	= this.maxCandCnt.getValue();
	var v 			= this.IncludeMnt.getSelectData();
	p.includeMnt	= false;
	if(!WebUtil.isEmpty(v))
	{
		p.includeMnt = true;
	}
	return p;
}
/**
 * 验证所有必填项是否都填了
 */
SendMatchTask.prototype.validateRequired = function() {
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
SendMatchTask.prototype.isPassLenValidate = function() {
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