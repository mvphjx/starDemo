//普通控件缓存数组
MatchDetailConfig.prototype.webInputArr = [];

function MatchDetailConfig()
{

}
/*
 param.cards  格式规范：
            [{
            cardId,
            cardNum,
            printType//卡片类型，捺印/现场
            }]
 param.matchType 	= this.matchType;
 param.bty 			= this.getBty();
 param.matchMethodId	= this.getAlgId();
 param.mpIds			= this.mp.getValue();
 param.srcMntGid 	= this.getSrcMntGid();
 param.priority		= this.getPriority();
 param.maxCandCnt	= this.maxCandCnt.getValue();
 param.mps //比对分区对象数组
 param.matchAlgorithm//比对算法对象  com.hisign.pu.abis.orm.param.ent.SearchAlgProp
 */
MatchDetailConfig.prototype.init = function(param)
{
	this.param = param;

    this.load();//初始化数据

    this.initUI();

	this.initEvent();

};
MatchDetailConfig.prototype.setParam = function(param){
    this.param = param;
    //更新fpg
    
    //根据参数表更  比对分区 比对算法
    this.loadMatchAlgorithm(param.matchAlgorithm);
    this.loadMatchPartition(param.mps);
    this.loadTreeNode(null,null,this.treeObj.getSelectedNodes()[0],null);
    this.load();//初始化数据 文本过滤所需视图
};
MatchDetailConfig.prototype.getParam = function(){
    var _this = this;
    var param = {};
    param.textSearchFilter=this.searchInfo.getText();
    //综合参数
    //commonConfigInfo1
    param.mask1 = 0;
    var mask1s = _this.commonConfigInfo1&&_this.commonConfigInfo1.getSelectIds();
    for(var i = 0;i<mask1s.length;i++){
        param.mask1 = param.mask1|WebUtil.getNumberFromOx(mask1s[i]);
    }
    param.mask2 = 0;
    var mask2s = _this.commonConfigInfo2&&_this.commonConfigInfo2.getSelectIds();
    for(var i = 0;i<mask2s.length;i++){
        param.mask2 = param.mask2|WebUtil.getNumberFromOx(mask2s[i]);
    }
    param.isSrcDestFvcgSame=null;
    param.isDestCardIDLTSrc=null;
    param.minScoreAllowed = null;


    param.baseMatchParameter={};
    var baseMatchParameter = param.baseMatchParameter;
    //1 筛选率
    var filters = {};
    filters["0"]={"level":0,"filterRate":_this.level0.getValue()};
    filters["1"]={"level":1,"filterRate":_this.level1.getValue()};
    filters["2"]={"level":2,"filterRate":_this.level2.getValue()};
    baseMatchParameter.filters =filters;
    //2 TT策略
    var fingerTTPolicy = {};
    fingerTTPolicy.correctBadSequencePolicy = _this.correctBadSequencePolicy&&_this.correctBadSequencePolicy.getValue();
    fingerTTPolicy.matchPolicy = _this.matchPolicy&&_this.matchPolicy.getValue();
    fingerTTPolicy.minMatchFingerCount = _this.minMatchFingerCount&&_this.minMatchFingerCount.getValue();
    fingerTTPolicy.maxNonmatchFingerCount = _this.maxNonmatchFingerCount&&_this.maxNonmatchFingerCount.getValue();
    baseMatchParameter.fingerTTPolicy =fingerTTPolicy;
    //3 源现场（指纹、掌纹） 使用的特征组 目标gid
    var srcLPParam = {};
    baseMatchParameter.srcLPParam = srcLPParam;
    srcLPParam.rotateDir =_this.rotateDir&&_this.rotateDir.getValue();
    srcLPParam.zoomRange ={
        "min": _this.minZoomRangeParam&&_this.minZoomRangeParam.getValue(),
        "max": _this.maxZoomRangeParam&&_this.maxZoomRangeParam.getValue()
    };
    //4 源捺印 使用指位/掌位
    var srcTPParam = {};
    baseMatchParameter.srcTPParam = srcTPParam;
    srcTPParam.vids = _this.srcVidConfigInfo&&_this.srcVidConfigInfo.getSelectIds();
    srcTPParam.fgps = _this.srcFgpConfigInfo&&_this.srcFgpConfigInfo.getSelectIds();
    //5 目标现场 使用的特征组 目标gid
    var destLPParam = {};
    baseMatchParameter.destLPParam = destLPParam;
    destLPParam.mntCopies = _this.mntCopies&&_this.mntCopies.getSelectIds();
    destLPParam.gids = [];
    //6 目标捺印 使用指位/掌位
    var destTPParam = {};
    baseMatchParameter.destTPParam = destTPParam;
    destTPParam.vids = _this.destVidConfigInfo&&_this.destVidConfigInfo.getSelectIds();
    destTPParam.fgps = _this.destFgpConfigInfo&&_this.destFgpConfigInfo.getSelectIds();
    return param;
};
MatchDetailConfig.prototype.initEvent = function(){
    var _this = this;
    this.$dom = $(".general-search-dialog")
};

MatchDetailConfig.prototype.initUI = function () {
    var _this = this;
    this.loadTree();

    //初始化 源卡指位设置
    var srcCidConfigData = this.AbisCheckData.cidData;
    var srcVidConfigData = this.AbisCheckData.vidData;
    var srcFgpConfigData = this.AbisCheckData.candFgps;
    _this.srcCidConfigInfo = new CheckBnt("srcCidConfigInfoDiv", srcCidConfigData, {param: {colCount: 5}});
    _this.srcVidConfigInfo = new CheckBnt("srcVidConfigInfoDiv", srcVidConfigData, {param: {colCount: 5}});
    _this.srcFgpConfigInfo = new CheckBnt("srcFgpConfigInfoDiv", srcFgpConfigData, {param: {colCount: 5}});
    _this.srcFgpConfigInfoButton = WebUI.createWebButton("srcFgpConfigInfoButton1", WebUI.BntType.B_120_28, "left-button", srcCheckAll);
    _this.srcFgpConfigInfoButton.setText(toolName.SelectAll);
    _this.srcFgpConfigInfoButton = WebUI.createWebButton("srcFgpConfigInfoButton2", WebUI.BntType.B_120_28, "left-button", srcCheckInvert);
    _this.srcFgpConfigInfoButton.setText(toolName.SelectInverse);
    function srcCheckAll() {
        _this.srcCidConfigInfo.setAllSelected(true);
        _this.srcVidConfigInfo.setAllSelected(true);
        _this.srcFgpConfigInfo.setAllSelected(true);
    }

    function srcCheckInvert() {
        _this.srcCidConfigInfo.setInverse();
        _this.srcVidConfigInfo.setInverse();
        _this.srcFgpConfigInfo.setInverse();
    }
    srcCheckAll();//默认全选


    //初始化 目标卡指位设置
    var destCidConfigData = this.AbisCheckData.cidData;
    var destVidConfigData = this.AbisCheckData.vidData;
    var destFgpConfigData = this.AbisCheckData.candFgps;
    _this.destCidConfigInfo = new CheckBnt("destCidConfigInfoDiv", destCidConfigData, {param: {colCount: 5}});
    _this.destVidConfigInfo = new CheckBnt("destVidConfigInfoDiv", destVidConfigData, {param: {colCount: 5}});
    _this.destFgpConfigInfo = new CheckBnt("destFgpConfigInfoDiv", destFgpConfigData, {param: {colCount: 5}});
    _this.destFgpConfigInfoButton = WebUI.createWebButton("destFgpConfigInfoButton1", WebUI.BntType.B_120_28, "left-button", destCheckAll);
    _this.destFgpConfigInfoButton.setText(toolName.SelectAll);
    _this.destFgpConfigInfoButton = WebUI.createWebButton("destFgpConfigInfoButton2", WebUI.BntType.B_120_28, "left-button", destCheckInvert);
    _this.destFgpConfigInfoButton.setText(toolName.SelectInverse);
    function destCheckAll() {
        _this.destCidConfigInfo.setAllSelected(true);
        _this.destVidConfigInfo.setAllSelected(true);
        _this.destFgpConfigInfo.setAllSelected(true);
    }

    function destCheckInvert() {
        _this.destCidConfigInfo.setInverse();
        _this.destVidConfigInfo.setInverse();
        _this.destFgpConfigInfo.setInverse();
    }
    destCheckAll();//默认全选



    //比对分区参数
    this.loadMatchPartition(this.param.mps);

    //初始化通用检索界面
    _this.searchInfo = WebUI.createMulText("searchInfoDiv", "searchInfo", "WebTextArea_MatchConfig");
    _this.searchInfo.setEditable(false);
    _this.searchInfoButton = WebUI.createWebButton("searchInfoButton", WebUI.BntType.B_120_28, "left-button", openSearch);
    _this.searchInfoButton.setText(AbisMessageResource.SetTextSearchFilter);
    function openSearch(){
        var searchData = {};
        searchData.tableName = _this.tableName;
        searchData.callback = function (data) {
            if (data.SimpFilter_Filter.indexOf("ColNode") >= 0) {
                _this.searchInfo.setValue(data.xml_Filter);
            }
        };
        var dataJson = {};
        if (_this.searchInfo.getValue()) {
        }
        searchData.data = dataJson;
        if (_this.searchWindow) {
            _this.searchWindow.open();
        } else {
            _this.searchWindow = parent.ABISWindowUtil.openSearch(searchData)
        }
    }
    //初始化综合参数界面
    _this.commonConfigInfo1  = new CheckBnt("commonConfigInfoDiv1",this.AbisCheckData.commonConfig1,{param:{colCount: 1}});
    _this.commonConfigInfo2  = new CheckBnt("commonConfigInfoDiv2",this.AbisCheckData.commonConfig2,{param:{colCount: 1}});


    //初始化比对算法
    var alg = _this.param.matchAlgorithm;
    if(alg){
        _this.level0 = WebUI.createText("level0Div", "level0", "CntTxt");
        _this.level1 = WebUI.createText("level1Div", "level1", "CntTxt");
        _this.level2 = WebUI.createText("level2Div", "level2", "CntTxt");
        _this.loadMatchAlgorithm(alg);
    }
};

/**
 * 加载比对算法
 * @param alg com.hisign.pu.abis.orm.param.ent.SearchAlgProp
 */
MatchDetailConfig.prototype.loadMatchAlgorithm=function(alg){
    var _this = this;
    var node_parent = this.treeObj.getNodeByParam("id","5",null);
    this.treeObj.removeChildNodes(node_parent);
    if(WebUtil.isEmpty(alg)){
        return;
    }
    var newalg = {"name": alg.description, "pId": "2", "id": "51", "click": true, "open": true};
    _this.treeObj.addNodes(node_parent,newalg);
    var $matchAlgorithmInfoDiv = $("#matchAlgorithmInfoDiv");
    var html = "";
    switch(_this.param.matchType) {
        case ABISCode.QryType.LT:
        case ABISCode.QryType.LL:
            html +='<div  class="M_Top_10">源现场卡片参数</div>'
            html = html+'<div  class="M_Left_30  OverHidden RowItem">'+
                '<div class="Align_Left M_Top_2 LabelWidth">旋转角度</div>'+
                '<div class="Align_Left ">'+
                '<div id="rotateDirDiv" class="Align_Left "></div>'+
                '<div id="rotateDirDiv_tip" class="Align_Left  Color_Red"></div>'+
                '</div></div>';
            html = html+'<div  class="M_Left_30  OverHidden RowItem">'+
                '<div class="Align_Left M_Top_2 LabelWidth">最小缩放比例</div>'+
                '<div class="Align_Left ">'+
                '<div id="minZoomRangeParamDiv" class="Align_Left "></div>'+
                '<div id="minZoomRangeParamDiv_tip" class="Align_Left  Color_Red"></div>'+
                '</div></div>';
            html = html+'<div  class="M_Left_30  OverHidden RowItem">'+
                '<div class="Align_Left M_Top_2 LabelWidth">最大缩放比例</div>'+
                '<div class="Align_Left ">'+
                '<div id="maxZoomRangeParamDiv" class="Align_Left "></div>'+
                '<div id="maxZoomRangeParamDiv_tip" class="Align_Left  Color_Red"></div>'+
                '</div></div>';
        case ABISCode.QryType.TL:
            html=html+"<div class=\"M_Top_10\">现场使用特征</div><div id=\"mntCopiesDiv\"class=\"M_Left_30\"></div>";
            $matchAlgorithmInfoDiv.html(html);
            var rotateDirParam={};
            rotateDirParam.minvalue=0;
            rotateDirParam.maxvalue=12;
            rotateDirParam.isdigital=true;
            _this.rotateDir = WebUI.createText("rotateDirDiv","rotateDir", "CntTxt");
            _this.rotateDir.setValidateType(rotateDirParam);
            _this.rotateDir.setErrorTip("rotateDirDiv_tip");
            var minZoomRangeParamParam={};
            minZoomRangeParamParam.minvalue=10;
            minZoomRangeParamParam.maxvalue=100;
            minZoomRangeParamParam.isdigital=true;
            _this.minZoomRangeParam = WebUI.createText("minZoomRangeParamDiv","minZoomRangeParam", "CntTxt");
            _this.minZoomRangeParam.setValidateType(minZoomRangeParamParam);
            _this.minZoomRangeParam.setErrorTip("minZoomRangeParamDiv_tip");
            var maxZoomRangeParamParam={};
            maxZoomRangeParamParam.minvalue=100;
            maxZoomRangeParamParam.maxvalue=200;
            maxZoomRangeParamParam.isdigital=true;
            _this.maxZoomRangeParam = WebUI.createText("maxZoomRangeParamDiv","maxZoomRangeParam", "CntTxt");
            _this.maxZoomRangeParam.setValidateType(maxZoomRangeParamParam);
            _this.maxZoomRangeParam.setErrorTip("maxZoomRangeParamDiv_tip");

            _this.mntCopies  = new CheckBnt("mntCopiesDiv",_this.AbisCheckData.mntCopiesData,{param:{colCount: 1}});
            break;

        case ABISCode.QryType.TT:

            html +='<div  class="M_Top_10">TT比对策略</div>';
            html += '<div  class="M_Left_30  OverHidden RowItem">'+
                    '<div class="Align_Left M_Top_2 LabelWidth">匹配策略</div>'+
                    '<div class="Align_Left ">'+
                    '<div id="matchPolicyDiv" class="Align_Left"></div>'+
                    '</div></div>';
            html = html+'<div  class="M_Left_30  OverHidden RowItem">'+
                '<div class="Align_Left M_Top_2 LabelWidth">纠正策略</div>'+
                '<div class="Align_Left ">'+
                '<div id="correctBadSequencePolicyDiv" class="Align_Left"></div>'+
                '</div></div>';
            html = html+'<div  class="M_Left_30  OverHidden RowItem">'+
                '<div class="Align_Left M_Top_2 LabelWidth">最小匹配指纹数量</div>'+
                '<div class="Align_Left ">'+
                '<div id="minMatchFingerCountDiv" class="Align_Left "></div>'+
                '<div id="minMatchFingerCountDiv_tip" class="Align_Left  Color_Red"></div>'+
                '</div></div>';
            html = html+'<div  class="M_Left_30  OverHidden RowItem">'+
                '<div class="Align_Left M_Top_2 LabelWidth">最大匹配指纹数量</div>'+
                '<div class="Align_Left ">'+
                '<div id="maxNonmatchFingerCountDiv" class="Align_Left "></div>'+
                '<div id="maxNonmatchFingerCountDiv_tip" class="Align_Left  Color_Red"></div>'+
                '</div></div>';
            $matchAlgorithmInfoDiv.html(html);
            _this.matchPolicy  = WebUI.createCombo("matchPolicyDiv","matchPolicy",null,null,true,true,"CodeTableName","",null);
            _this.correctBadSequencePolicy  = WebUI.createCombo("correctBadSequencePolicyDiv","correctBadSequencePolicy",null,null,true,true,"CodeTableName","",null);;
            var countParam={};
            countParam.minvalue=1;
            countParam.maxvalue=20;
            countParam.isdigital=true;
            _this.minMatchFingerCount = WebUI.createText("minMatchFingerCountDiv","minMatchFingerCount", "CntTxt");
            _this.minMatchFingerCount.setValue(5);
            _this.minMatchFingerCount.setValidateType(countParam);
            _this.minMatchFingerCount.setErrorTip("minMatchFingerCountDiv_tip");
            _this.maxNonmatchFingerCount = WebUI.createText("maxNonmatchFingerCountDiv","maxNonmatchFingerCount", "CntTxt");
            _this.maxNonmatchFingerCount.setValue(5);
            _this.maxNonmatchFingerCount.setValidateType(countParam);
            _this.maxNonmatchFingerCount.setErrorTip("maxNonmatchFingerCountDiv_tip");
            break;
    }
}
/**
 * 加载比对分区
 * @param mp com.hisign.pu.abis.orm.match.ent.MatchPartition
 *
 treeData.push({"name": "Hx1捺印指纹比对分区", "pId": "2", "id": "21", "click": false, "open": true});
 treeData.push({"name": "OID范围", "pId": "21", "id": "211", "click": true, "open": true});
 treeData.push({"name": "指位设置", "pId": "21", "id": "212", "click": true, "open": true});
 */
MatchDetailConfig.prototype.loadMatchPartition=function(mps){

    var _this = this;
    var node = this.treeObj.getNodeByParam("id","2",null);
    this.treeObj.removeChildNodes(node);
    if(WebUtil.isEmpty(mps)){
        return;
    }
    for(var i=0;i<mps.length;i++){
        var mp = mps[i];
        var newmpid = "2_"+mp.id;
        var newmp = {"name": mp.description, "pId": "2", "id": newmpid, "click": false, "open": true};
        var newoid = {"name": "OID范围", "pId": newmpid, "id": newmpid+"1", "click": true, "open": true};
        newmp = _this.treeObj.addNodes(node,newmp)[0];
        _this.treeObj.addNodes(newmp,newoid);
    }

};

MatchDetailConfig.prototype.load = function()
{
    switch(this.param.matchType) {
        case ABISCode.QryType.LT:
        case ABISCode.QryType.TT:
            if(this.tableName !== "TP_CARD_VIEW"){
                this.tableName = "TP_CARD_VIEW";
                this.searchWindow=null;
                this.searchInfo&&this.searchInfo.setValue("");
            }
            break;
        case ABISCode.QryType.LL:
        case ABISCode.QryType.TL:
            if(this.tableName !== "LP_CARD_VIEW"){
                this.tableName = "LP_CARD_VIEW";
                this.searchWindow=null;
                this.searchInfo&&this.searchInfo.setValue("");
            }
            break;
    }
};
MatchDetailConfig.prototype.loadTree=function(){
    this.treeId = "leftTree";
    var treeData = [];
    treeData.push({"name": AbisMessageResource.SrcFgpConfig, "pId": "0", "id": "1S", "click": true, "open": true});
    treeData.push({"name": AbisMessageResource.DestFgpConfig, "pId": "0", "id": "1D", "click": true, "open": true});
    treeData.push({"name": AbisMessageResource.MatchPartitionConfig, "pId": "0", "id": "2", "click": false, "open": true});
    treeData.push({"name": AbisMessageResource.TextSearchFilter, "pId": "0", "id": "3", "click": true, "open": true});
    treeData.push({"name": AbisMessageResource.SyntheticParam, "pId": "0", "id": "4", "click": true, "open": true});
    treeData.push({"name": AbisMessageResource.Match.MatchAlgorithm, "pId": "0", "id": "5", "click": false, "open": true});
    var setting = {
        data : {
            simpleData : {
                enable : true
            }
        },
        view : {
            nameIsHTML : true
        },
        callback : {
            beforeClick : beforeClick,
            onClick : onClick
        }
    };
    var _this = this;

    function beforeClick(treeId, treeNode, clickFlag) {
        if(treeNode.click===false){
            return false;
        }
    }
    function onClick(event, treeId, treeNode, clickFlag)
    {
        _this.loadTreeNode(event, treeId, treeNode, clickFlag);
    }
    $.fn.zTree.init($("#"+this.treeId), setting, treeData);
    // 初始化后 选中第一个节点
    this.treeObj = $.fn.zTree.getZTreeObj(this.treeId);
    if(this.treeObj.getNodes()[0].click){
        this.treeObj.selectNode(this.treeObj.getNodes()[0]);
    }else{
        this.treeObj.selectNode(this.treeObj.getNodes()[0].children[0]);
    }
    onClick(null,null,this.treeObj.getSelectedNodes()[0],null);
};
/**
 * 节点 单击事件处理
 * @param event
 * @param treeId 树id
 * @param treeNode 触发节点
 * @param clickFlag
 */
MatchDetailConfig.prototype.loadTreeNode = function(event, treeId, treeNode, clickFlag){
    var _this = this;
    var $dom = $("#righContent");
    $dom.children("div").hide();
    if(WebUtil.isEmpty(treeNode)||WebUtil.isEmpty(treeNode.id)){
        return;
    }
    switch(treeNode.id) {
        case "1S":
            switch(_this.param.matchType) {
                case ABISCode.QryType.TL:
                case ABISCode.QryType.TT:
                    $dom.find("#srcFgpConfigDiv").show();
            }
            break;
        case "1D":
            switch(_this.param.matchType) {
                case ABISCode.QryType.LT:
                case ABISCode.QryType.TT:
                    $dom.find("#destFgpConfigDiv").show();
            }

            break;
        case "2":
            break;
        case "3":
            $dom.find("#searchDiv").show();
            break;
        case "4":
            $dom.find("#commonConfigDiv").show();
            break;
    }
    switch(treeNode.pId) {
        case "5":
            if(treeNode.id==="51"){
                $dom.find("#matchAlgorithmDiv").show();
            }
    }

}
MatchDetailConfig.prototype.AbisCheckData = {};
MatchDetailConfig.prototype.AbisCheckData.cidData  = [{
    id: "0",
    text: "第一份",
    enabled: true
},{
    id: "1",
    text: "第二份",
    enabled: true
},{
    id: "2",
    text: "第三份",
    enabled: true
}];
MatchDetailConfig.prototype.AbisCheckData.vidData  = [{
    id: "0",
    text: "滚动指纹",
    enabled: true
},{
    id: "1",
    text: "平面指纹",
    enabled: true
}];
MatchDetailConfig.prototype.AbisCheckData.candFgps = [{
    id: "0",
    text: AbisMessageResource.FingerPosition['RightThumb'],
    enabled: true
}, {
    id: "1",
    text: AbisMessageResource.FingerPosition['RightIndex'],
    enabled: true
}, {
    id: "2",
    text: AbisMessageResource.FingerPosition['RightMiddle'],
    enabled: true
}, {
    id: "3",
    text: AbisMessageResource.FingerPosition['RightRing'],
    enabled: true
}, {
    id: "4",
    text: AbisMessageResource.FingerPosition['RightLittle'],
    enabled: true
}, {
    id: "5",
    text: AbisMessageResource.FingerPosition['LeftThumb'],
    enabled: true
}, {
    id: "6",
    text: AbisMessageResource.FingerPosition['LeftIndex'],
    enabled: true
}, {
    id: "7",
    text: AbisMessageResource.FingerPosition['LeftMiddle'],
    enabled: true
}, {
    id: "8",
    text: AbisMessageResource.FingerPosition['LeftRing'],
    enabled: true
}, {
    id: "9",
    text: AbisMessageResource.FingerPosition['LeftLittle'],
    enabled: true
}];
MatchDetailConfig.prototype.AbisCheckData.commonConfig1 = [{
    id: "0x4000000",
    text: "不进行候选过滤",
    enabled: true
},{
    id: "0x40000000",
    text: "不使用非匹配记录",
    enabled: true
},{
    id: "0x2000000",
    text: "查重串查（TT/LL）的时候，目标卡片ID小于当前源数据卡片ID",
    enabled: true
},{
    id: "0x8000000",
    text: "LT或者TL的时候，不移除捺印或者现场的重卡",
    enabled: true
},{
    id: "0x10000000",
    text: "TT/LL的情况下，移除候选中的重卡",
    enabled: true
},{
    id: "0x20000000",
    text: "倒查(TL)时候不移除已经比中的现场卡片",
    enabled: true
}
];
MatchDetailConfig.prototype.AbisCheckData.commonConfig2 = [{
    id: "1",
    text: "不进行卡片ID到号码转换",
    enabled: true
},{
    id: "2",
    text: "删除比对过程中间记录",
    enabled: true
},{
    id: "4",
    text: "将指纹当做掌纹比对",
    enabled: true
},{
    id: "8",
    text: "查重串查（TT/LL）的时候，保留自己",
    enabled: true
},
];
MatchDetailConfig.prototype.AbisCheckData.mntCopiesData = [{
    id: "0",
    text: "专家特征",
    enabled: true
}, {
    id: "1",
    text: "矫正后的专家特征",
    enabled: true
}, {
    id: "2",
    text: "自动提取1",
    enabled: true
}, {
    id: "3",
    text: "自动提取2",
    enabled: true
}
];
