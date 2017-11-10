
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

    this.printType = param.cards[0].printType

    this.initEvent();

    this.initMatchType();

    this.load();

}
SendMatchTask.prototype.initEvent = function(){
    var _this = this;
    this.$dom = $(".general-search-dialog")
    this.$dom.on('click','.addcondi',function(event){
        _this.showCardWindow(_this.printType)
    });
    this.$dom.on('click','.customtem',function(event){
        _this.showDetailConfig(_this.printType)
    });
    this.$dom.on('click','.clearcon',function(event){
        _this.param.cards=[];
        _this.loadCardNums();
    });
    this.$dom.on('dblclick','#cardsul li',function(event){//左侧列点击事件
        var options = $(this).data("options");
        var index = $.inArray(options,_this.param.cards);
        if (index >= 0) {
            _this.param.cards.splice(index, 1);
        }
        _this.loadCardNums();
    });

    this.$dom.find('#qrytext').bind('keyup', function (e){//查询框输入监听
        if(!WebUtil.isNull(e))
        {
            var act = document.activeElement.id; //获得文本框焦点的ID
            if(act=="qrytext")
            {
                filter();
            }
        }
        return;
    });
    this.$dom.find('#qrytextclear').bind('click', function (e){//清空
        $('#qrytext').val("");
        filter(true);
    });
    function filter(showall)//实现本地  列检索
    {
        if(showall){
            _this.$dom.find("#cardsul").find("li").show();
        }else {
            var qryval = _this.$dom.find("#qrytext").val().toUpperCase();
            _this.$dom.find("#cardsul").find("li").hide().filter(":contains('" + (qryval) + "')").show();
        }
    }
}


SendMatchTask.prototype.initUI = function()
{
    var requiredField = ["PartType_UI","Bty_UI","Alg_UI","MP_UI","SrcMntGid_UI","Priority_UI","CandCnt_UI"];
    this.partTypeCombo	= WebUI.createCombo("PartType", "PartType_UI", "ItemWidth", null,true,true,null,AbisMessageResource.Match["MatchPartitionType"], requiredField,2,2);
    this.btyCombo		= WebUI.createCombo("Bty", "Bty_UI", "ItemWidth", null,true,true,null,AbisMessageResource.Match["Bty"], requiredField,2,2);
    this.algCombo		= WebUI.createCombo("Alg", "Alg_UI", "ItemWidth", null,true,true,null,AbisMessageResource.Match["MatchAlgorithm"], requiredField,2,2);
    this.matchPartitionTable = null;
    this.srcMntGid		= WebUI.createCombo("SrcMntGid", "SrcMntGid_UI", "ItemWidth", null,true,true,null,AbisMessageResource.Match["SrcCardFeatureGroup"], requiredField,2,2);
    this.priority		= WebUI.createCombo("Priority", "Priority_UI", "ItemWidth", null,true,true,null,AbisMessageResource.Match["MatchPriority"], requiredField,2,2);
    this.maxCandCnt 	= WebUI.createText("MaxCandCnt", "CandCnt_UI", "CandCntTxt", AbisMessageResource.Match["MaxCandNum"], requiredField);
    this.webInputArr.push(this.partTypeCombo)
    this.webInputArr.push(this.btyCombo)
    this.webInputArr.push(this.algCombo)
    this.webInputArr.push(this.srcMntGid)
    this.webInputArr.push(this.priority)
    this.webInputArr.push(this.maxCandCnt)
    if(!this.matchPartitionTable){
        this.matchPartitionTable = new WebTableMgr("MatchPartitionTable", "", 20, {isCheck:true,order:WebCode.Order.DESC});
    }
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
    //this.mp.addChangeListener(call);

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
        //重置详细配置
        nThis.clearDetailConfig();
        nThis.loadPartType();
    }
}

SendMatchTask.prototype.load = function()
{
    //加载左侧卡片号码
    this.loadCardNums();
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
                    nThis.param.cards=data.cards;
                    nThis.loadCardNums();
                }else{
                    DialogUtil.openSimpleDialogForOcx(resultInfo.msg);
                }
            },
            error : function(e)
            {
                alert(AbisMessageResource.Alert['SearchError']);
            }
        });
};

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
        if(ABISCode.PriorityCode.REALTIME==code){//实时 只限后端使用，界面不显示
            continue;
        }
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
//加载左侧卡片号码
SendMatchTask.prototype.loadCardNums = function()
{
    if(this.param.cards == null)return;
    var length = this.param.cards.length;
    var $cards = $("#cardsul");
    $cards.empty();
    for(var i=0;i<length;i++)
    {
        var model = this.param.cards[i];
        var li_str = $("<li>"+model.cardNum+"</li>")
        li_str.data("options",model);//缓存描述
        $cards.append(li_str);
    }
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

    var db = null;
    var grps = this.getMntFmtGroup();
    var obj = this.algCombo.getObject();
    var mps = [];//要显示的比对分区
    if(obj != null)
    {
        var alg = obj.data;
        if(alg.supportedMntFmtId){
            //支持的比对分区
            var supportedMntFmtIds = alg.supportedMntFmtId.split(",");
            for(var mntFmtIndex=0;mntFmtIndex<supportedMntFmtIds.length;mntFmtIndex++){
                var mntFmtId = supportedMntFmtIds[mntFmtIndex];
                if (grps[mntFmtId])
                {
                    for(var i in grps[mntFmtId])
                    {
                        mps.push(grps[mntFmtId][i])
                    }
                }
            }
        }
    }
    if(!this.matchPartitionTable){
        this.matchPartitionTable = new WebTableMgr("MatchPartitionTable", "", 20, {isCheck:true,order:WebCode.Order.DESC});
    }
    initTableData(this.matchPartitionTable,mps);
    //初始化表格
    function initTableData(tableMgr,mps){
        if(WebUtil.isNull(tableMgr)) {
            return null;
        }
        var tblId = tableMgr.tblId;
        var tableJson = $.extend(true, {}, tableJsonTemple);
        tableJson["header"] = ["id","description","unitCode","remote"];
        tableJson["headerText"][tableJson["header"][0]] ="ID";
        tableJson["headerText"][tableJson["header"][1]] ="比对分区名称";
        tableJson["headerText"][tableJson["header"][2]] ="单位代码";
        tableJson["headerText"][tableJson["header"][3]] ="是否远程";
        for(var i=0 ;i<mps.length;i++){
            var rowModel = {};
            rowModel[tableJson["header"][0]] = mps[i].id;
            rowModel[tableJson["header"][1]] = mps[i].description;
            rowModel[tableJson["header"][2]] = mps[i].unitCode;
            rowModel[tableJson["header"][3]] =(mps[i].remote===true?AbisMessageResource.Yes:AbisMessageResource.No) ;
            tableJson["result"].push({data:rowModel});
        }
        tableMgr.table.setInput(tableJson);
        tableMgr.table.checkAllRows();
        tableMgr.table.setSortColName("id");
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
/*
 将参数 返回给调用者
 */
SendMatchTask.prototype.getParam = function()
{
    if (WebUtil.isEmpty(this.param.cards) || this.param.cards.length === 0) {
        DialogUtil.openSimpleDialogForOcx(AbisMessageResource.Alert.PleaseAtLeastSelectOne);
        return;
    }
    if (!this.isPassLenValidate() | !this.validateRequired()) {
        DialogUtil.openSimpleDialogForOcx(AbisMessageResource.Alert.IncompleteErrorInfo);
        return;
    }
    return this.getParamData();
}
/*
 获取配置的参数
 */
SendMatchTask.prototype.getParamData = function()
{
    var p = {};
    p.cards 		= this.param.cards;
    p.matchType 	= this.matchType;
    p.bty 			= this.getBty();
    p.matchMethodId	= this.getAlgId();
    p.mpIds = [];
    var mprows = this.matchPartitionTable.table.getCheckItems();
    for(var i = 0;i<mprows.length;i++){
        p.mpIds.push(mprows[i]["id"]);
    }
    p.srcMntGid 	= this.getSrcMntGid();
    p.priority		= this.getPriority();
    p.maxCandCnt	= this.maxCandCnt.getValue();
    var v 			= this.IncludeMnt.getSelectData();
    p.includeMnt	= false;
    if(!WebUtil.isEmpty(v))
    {
        p.includeMnt = true;
    }
    p.textSearchFilter = this.textSearchFilter;
    p.baseMatchParameter = this.baseMatchParameter;
    p.mask1 =this.mask1;
    p.mask2 =this.mask2;
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
    var mprows = this.matchPartitionTable&&this.matchPartitionTable.table.getCheckItems();
    if(WebUtil.isEmpty(mprows)){
        return false;
    }
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
/*
 打开卡片选择界面
 @param type:ABISCode.PrintTypeCode  1.2.
 */
SendMatchTask.prototype.showCardWindow = function(type) {
    var _this = this;
    if (this.cardWindow == null) {
        if(type===ABISCode.PrintTypeCode.PRINT_TP){
            this.cardWindow = parent.ABISWindowUtil.openTPCard("searchcard", null, null,
                selectedCard, true, TPCardInfoCol.ID, WebTable.DES);
        }else if(type===ABISCode.PrintTypeCode.PRINT_LP){
            this.cardWindow = parent.ABISWindowUtil.openLPCard("searchcard", null, null,
                selectedCard, true, TPCardInfoCol.ID, WebTable.DES);
        }
    } else {
        this.cardWindow.setData({
            dbid : this.dbid
        });
        this.cardWindow.open();
    }
    function selectedCard(rows) {
        if (!WebUtil.isEmpty(rows)) {
            var length = rows.length;
            for(var i=0;i<length;i++){
                var r = rows[i];
                var card 		= {};
                card.cardId 	= r.ID;
                card.cardNum 	= r.CARD_NUM;
                card.printType 	= type;
                if(_this.param.cards.length==1){
                    //TODO 更新页面 加载项为  群发设置，不过滤生物特征
                    //_this.data.btys=null;
                    //_this.initData(_this.data);
                    _this.param.cards.push(card);
                    _this.load();
                }else{
                    _this.param.cards.push(card);
                }

            }
            _this.loadCardNums();
        }
    }
}
/**
 * 打开详细配置界面
 * @param type
 */
SendMatchTask.prototype.showDetailConfig = function(type) {
    var _this = this;
    var p=this.getParamData();
    p.mps = [];//比对分区对象
    for ( var i = 0; i < this.data.mps.length; i++){
        var mp = this.data.mps[i];
        if($.inArray(parseInt(mp.id),p.mpIds)>-1){
            p.mps.push(mp);
        }else if($.inArray(mp.id+"",p.mpIds)>-1){
            p.mps.push(mp);
        }
    }
    p.matchAlgorithm = {};//算法对象
    for ( var i = 0; i < this.data.algs.length; i++){
        var alg = this.data.algs[i];
        if(alg.searchAlgId==p.matchMethodId&&alg.qryType==p.matchType){
            p.matchAlgorithm = alg;
            break;
        }
    }
    if (this.configWindow == null) {
        this.configWindow = openMatchDetailConfig("showDetailConfig",p);
    } else {
        this.configWindow.setData(p);
        this.configWindow.open();
    }
    function openMatchDetailConfig(id,params) {
        var param =
            {
                title:AbisMessageResource.DetailParam,
                page:"/jsp/abis/widget/matchdetailconfig.jsp",
                initData:params,//call中函数 的参数
                call:{init:"init",get:"getParam",set:"setParam"},
                callBack:{ok:callback},
                language	: parent.ABISWindowUtil.language
            };
        var window = new parent.WebWindow(id,param);
        return window;

        function callback(p)
        {
            //保存  算法信息 文本过滤信息
            _this.textSearchFilter = p.textSearchFilter;
            _this.baseMatchParameter = p.baseMatchParameter;
            //基本信息
            _this.mask1 = p.mask1;
            _this.mask2 = p.mask2;
        }
    }
};
/**
 * 界面配置  切换的时候 清空对应的详细配置
 */
SendMatchTask.prototype.clearDetailConfig= function(){
    var _this = this;
    //保存  算法信息 文本过滤信息
    _this.textSearchFilter = "";
    _this.baseMatchParameter = {};
    //基本信息
    _this.mask1 =0;
    _this.mask2 =0;
}

