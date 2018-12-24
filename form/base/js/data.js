var WebVar = {
	VarPath: "http://192.168.129.148:7950/abisweb",
	ImgOcxBg: 0x8c8d8b,
	TimeOut: 10000
};
//调试模式
var isDebug= true;
var isLogin = false;
/**
 * 此方法只是为了单机运行实例  测试
 * 浏览器必须调整安全等级，允许ajax跨域访问
 * 比如调整chrome安全等级需要加以下启动参数：
 * chrome.exe --args --disable-web-security --user-data-dir
 */
function login() {
	var name = 'han';
	var password = '4690255';
	var validate = "";
	var url = WebVar.VarPath + "/login/";
	var data = {
		userName: name,
		password: password
	};
	jQuery.ajax({
		async: false,
		type: 'POST',
		contentType: 'application/json',
		url: url,
		data: JSON.stringify(data),
		dataType: 'json',
		success: function(data) {
			if(data != null) {
				//alert(JSON.stringify(data))						
			}
		}
	});
}

/**
 * 普通代码
 */
var WebCode =
{
		
	Order:
	{
		ASC		: 0,
		DESC	: 1
	},
	MenuType:
	{
		MENU	: 0,
		LINK	: 1
	},
	MenuItemType:
	{
		MENU	: 0,
		LINK	: 1
	},
	MenuLinkType:
	{
		SELF	: 0,
		BLANK	: 1
	},
	//消息类型
	MsgType :
	{
	    Info 		: 0,
	    Question 	: 1,
	    Warning 	: 2,
	    Error 		: 3,
	    Success		: 4,
	    Fail		: 5
	},
	LayoutType:
	{
		Single		: 0,
		Multi		: 1
	},
	/* 返回结果键名 */
	WebResultKey:
	{
		status		: "status",
		msg			: "msg",
		errcode		: "errcode"
	},
	/* 结果状态键名  */
	WebResultStatus:
	{
		ok			:"ok",
		error		:"error"
	},
	ValidateType :
	{
		StringLength 	: 0,
		NumberLength 	: 1,
		Number			: 2,
		Date			: 3,
		DateLength		: 4
	}
	,
	/* 工作模式 */
	WorkMode:
	{
		normal		: "normal", //自由模式
		queue		: "queue", //编辑队列模式
		list		: "list", //列表模式
        qual		: "qual" //质量检查队列模式
	}
}

var AbisMessageResource = {
	"ImportFPTNumLimited": "导入文件最多可增加7个!",
	"SearchError": "检索出错!",
	"SaveSuccess": "保存成功!",
	"SaveFail": "保存失败!",
	"ImportYPFSuccess": "导入YPF成功",
	"CreateSuccess": "创建成功!",
	"OK": "确定",
	"Cancel": "取消",
	"Yes": "是",
	"No": "否",
	"Prompt": "提示",
	"OperationFailed": "操作失败!",
	"Save": "保存",
	"Add": "添加",
	"Update": "更新",
	"SelectPrintTemplate": "选择打印模版",
	"HomicideCase": "命案",
	"SerialNo": "序号",
	"NoFillRequiredField": "必填字段填写不完整!",
	"EditQueueNoTask": "编辑队列没有数据!",
	"CompleteFailed": "完成任务失败!",
	"Cause": "原因",
	"SaveCardFail": "保存卡片失败!",
	"PleaseOpenACase": "请打开一个案件再进行图像导入",
	"Fingerprint": "指纹",
	"Palm": "掌纹",
	"Photo": "人像",
	"NotSupported": "不支持",
	"PleaseInputCardNum": "请输入卡号再进行检索",
	"NoCutParam": "没有配置生物特征切割规格参数!",
	"FullScreen": "全屏模式",
	"ExitFullScreen": "退出全屏",
	"CheckComplete": "完成认定",
	"Hit": "比中",
	"NotHit": "不中",
	"ConfirmHit": "确认比中",
	"ConfirmNotHit": "确认不中",
	"CopyBarCode": "拷贝条码",
	"ApplyReview": "申请复核",
	"CancelReview": "取消复核",
	"NewMenu": "新菜单",
	"AddPage": "增加页面",
	"MenuProperty": "菜单属性",
	"PageProperty": "页面属性",
	"MenuNameEmptyTip": "菜单名称不能为空!",
	"PrintTemplatePath": "打印模板路径",
	"ConfigFilePath": "配置文件路径",
	"PleaseSelectFPTFile": "请选择导入的FPT文件",
	"FPTFilePath": "FPT文件路径",
	"RMTUnitCode": "远程单位代码",
	"SVRUnitCode": "服务器单位代码",
	"DataType": "数据类型",
	"IsDownload": "是否下载",
	"IsQryCand": "是否比对候选",
	"Source": "源",
	"Status": "状态",
	"Priority": "优先级",
	"NotReadInfo": " 条未读信息",
	"CurrentNoOpenCard": "当前没有打开的卡片",
	"NoData": "没有数据!",
	"FlatFinger": "平面指纹",
	"RollFinger": "滚动指纹",
	"Nothing": "无",
	"Name2": "名称",
	"Search": "检索",
	"PleaseSelectOne": "请选择一项",
	"NoChange": "无变化,不用提交",
	"InstantMessageTips": "即时通讯包括下面的帐号、广播消息、组、组员、@、好友等信息",
	"Delete": "删除",
	"UpTo8": "最多可增加8个!",
	"ScannFunctionInDebug": "扫描功能在调试中",
	"AlreadyExistReEnter": "已存在，重新输入",
	"IncompleteRoleInfo": "角色信息填写不完整或错误！",
	"NotFindOutAbout": "没有找到关于",
	"RelevantInfo": "的相关信息",
	"PieChart": "饼图",
	"Male": "男",
	"Female": "女",
	"Unknown": "未知",
	"Error": "错误",
	"NotExplain": "未说明",
	"UserName": "用户名",
	"ScanCount": "扫描数量",
	"CutCount": "切割数量",
	"Total": "合计",
	"Counting": "正在统计...",
	"PleaseTrustedSite": "请将网站设置为信任站点！",
	"ConnectTimeOut": "连接超时",
	"UpLoad2": "上传",
	"Roll": "滚动",
	"Flat": "平面",
	"AddAddressInfo": "增加地址信息",
	"EditAddressInfo": "编辑地址信息",
	"AddNumInfo": "增加号码信息",
	"EditNumInfo": "编辑号码信息",
	"AddPhoneInfo": "增加电话信息",
	"EditPhoneInfo": "编辑电话信息",
	"AddCertificateInfo": "增加证件信息",
	"EditCertificateInfo": "编辑证件信息",
	"CardTemplate": "卡片模版",
	"ScanPageList": "扫描页面列表",
	"Page": "页",
	"CodeTableLoadFailed": "代码表加载失败!",
	"AddUnit": "增加单位",
	"Describe": "描述",
	"HomePage": "首页",
	"CreateTime": "创建时间",
	"CreateUser": "创建人",
	"TemplateNotExist": "模版不存在",
	"Type": "类型",
	"SelectConfig": "选择配置",
	"IntegratedAcquisitionConfig": "一体化采集配置",
	"SelectTPCardTemplate": "选择捺印卡片模版",
	"SelectLPCardTemplate": "选择现场卡片模版",
	"SelectCertificateTemplate": "选择鉴定证书模版",
	"AddAllowedPermission": "增加允许的权限",
	"Prohibit": "禁止",
	"Allow": "允许",
	"AddForbid": "增加禁止权限",
	"SendMatchTask": "发送比对任务",
	"ListConfig": "列表配置",
	"NotStat": "未统计",
	"Other": "其他",
	"Information": "信息",
	"Fugitive": "在逃人员",

	QualReason: {
		"NotDescribed": "未描述",
		"Scar": "伤疤",
		"Peeling": "脱皮",
		"Other": "其他"
	},
	Alert: {
		"PleaseSelectDataItemToDelete": "请选择要删除的数据项",
		"LeftNavWithoutDataNotSupportAddConfig": "左侧导航无数据不支持添加配置!",
		"PleaseChooseToSaveConfigFile": "请选择保存的配置文件",
		"ConfigNameLenTip": "配置名称最多60个字符或30个汉字",
		"ConfigDescLenTip": "配置描述最多200个字符或100个汉字",
		"PleaseFillInConfigName": "请填写配置名称",
		"HaveNoConfigColCannotCreate": "没有配置栏目不能创建",
		"NoDownloadSelected": "没有选中下载项",
		"LackSoftwareTypeCanNotUpload": "缺少软件类型无法上传!",
		"PleaseChooseUploadFile": "请选上传的文件",
		"PleaseFillInUploadFileName": "请填写上传文件的名称",
		"FileNameLenTip": "文件名称最多60个字符或30个汉字",
		"FileDescLenTip": "文件描述最多200个字符或100个汉字",
		"StartTimeCanNotGreaterThanEndTime": "开始时间不能大于结束时间",
		"MaxStatIntervalTip": "统计最大间隔为20天,从重新输入!",
		"PersonNumAlreadyExists": "该号码已存在!",
		"HaveNoSelectedTableRecord": "没有选中表格中的记录！",
		"IncompleteInfo": "信息填写不完整!",
		"NoCprParamCanNotSave": "没有配置压缩提取参数,无法保存！",
		"NoImgCutSpecifyParamCanNotSave": "没有配置图像切割规格参数,无法保存！",
		"SaveCardFail": "保存卡片失败!",
		"PleaseEnterCardNum": "请输入卡号再进行检索",
		"PleaseEnterPersonNum": "请输入人员号码再进行检索",
		"NoCprParamConfig": "没有配置压缩提取参数!",
		"NoImgCutSpecifyParam": "没有配置生物特征切割规格参数!",
		"IncompleteUserInfo": "用户信息填写不完整或错误！",
		"MustFillInUnitCodeAndName": "必须填写单位代码和名称!",
		"TwoInputPasswordNotConsistent": "两次密码不一致",
		"ConnectSvrException": "连接服务器异常",
		"Error": "出错了",
		"NotFindCorrespondConfig": "没有找到对应的配置！",
		"SelectAtLeastOneColSearch": "至少选择一列进行检索",
		"SaveListConfigFailed": "保存列表配置失败",
		"PleaseEnterSearchContent": "请输入检索内容",
		"MenuCallbackFunctionNotFound": "未找到菜单回调函数",
		"TableNoSuchColumn": "表格中没有此列:",
		"SaveSuccessContinueInput": "保存成功,是否继续录入？",
		"OperateFailedDetailInfo": "操作失败！以下是详细信息：",
		"DidNotImplementFocusMethod": "未实现focus方法",
		"DidNotImplementBlurMethod": "未实现blur方法",
		"CanBeNoLongerThan": "长度不能大于",
		"CanNotBeLessThan": "长度不能小于",
		"CanBeNoBigerThan": "值不能大于",
		"CanNotBeSmallerThan": "值不能小于",
		"IDNumFormatNotCorrect": "身份证号码格式不正确!",
		"PleaseEnterANum": "请输入数字!",
		"DidNotImplementSetEditableMethod": "未实现setEditable方法",
		"ConnectTimeOut": "连接超时",
		"SearchError": "检索出错!",
		"AddScanPageTip": "请先添加扫描页面!"

	},
	Case: {
		"CaseNum": "案件号码",
		"CaseName": "案发名称",
		"CaseType": "案件类型",
		"CaseStatus": "案件状态",
		"CaseOccurTime": "案发时间",
		"CaseSerialNum": "案件编号"
	},
	FingerPosition: {
		"RightThumb": "右拇",
		"RightIndex": "右食",
		"RightMiddle": "右中",
		"RightRing": "右环",
		"RightLittle": "右小",
		"LeftThumb": "左拇",
		"LeftIndex": "左食",
		"LeftMiddle": "左中",
		"LeftRing": "左环",
		"LeftLittle": "左小",
		"RightPalm": "右手掌纹",
		"LeftPalm": "左手掌纹",
		"FourFingers": "四联指",
		"LeftFourFingers": "左侧四联指",
		"RightFourFingers": "右侧四联指",
		"TwoThumbs": "双手拇指"
	},
	Foot: {
		"FootPrint": "鞋足底印",
		"LeftFoot": "左脚",
		"RightFoot": "右脚"
	},
	PhotoPosition: {
		"LeftPortrait": "左侧人像",
		"FrontPortrait": "正面人像",
		"RightPortrait": "右侧人像"
	},
	LayoutType: {
		"SingleFinger": "单个指位",
		"Tile": "平铺"
	},
	ImageShowType: {
		"PriorityCompressGraph": "优先压缩图",
		"PriorityOriginalGraph": "优先原图",
		"CompressGraph": "压缩图",
		"OriginalGraph": "原图",
		"NotShow": "不显示"
	},
	ToolIdText: {
		"Move": "移动",
		"CutBox": "绘制切割框",
		"ZoomIn": "放大",
		"ZoomOut": "缩小",
		"ViewPort": "视口",
		"FitWidth": "适宽",
		"FitHeight": "适高",
		"Precent50": "50%",
		"Precent100": "100%",
		"Precent150": "150%",
		"Precent200": "200%",
		"RotateLeft": "向左旋转",
		"RotateRight": "向右旋转",
		"Rotate0": "旋转0度",
		"Rotate90": "旋转90度",
		"Rotate180": "旋转180度",
		"Rotate270": "旋转270度",
		"Align": "居中对其"
	},
	Match: {
		"MatchPartitionType": "分区类型",
		"Bty": "生物特征类型",
		"MatchAlgorithm": "比对算法",
		"SrcCardFeatureGroup": "源卡特征组",
		"MatchPriority": "比对优先级",
		"MaxCandNum": "最大候选个数",
		"BandFeatureMatch": "带特征比对",
		"TPTT": "捺印查重TT",
		"TPTL": "捺印倒查TL",
		"LPLT": "现场正查LT",
		"LPLL": "现场串查LL"

	},
	Stat: {
		"PersonCount": "人员数量",
		"QualifiedFingerPrintCount": "指纹合格数量",
		"UnqualifiedFingerprintCount": "指纹不合格数量",
		"FingerprintUnknownCount": "指纹未知质量",
		"QualifiedPalmPrintCount": "掌纹合格数量",
		"UnqualifiedPalmprintCount": "掌纹不合格数量",
		"PalmPrintUnknownCount": "掌纹未知质量",
		"BloodSampleCount": "血样数量",
		"ArticlePhoneCount": "物品手机数量",
		"ArticleOtherCount": "物品其他数量",
		"PhotoCount": "人像数量",
		"HandwritingCount": "笔迹数量",
		"FootCount": "足迹数量",
		"TTSubmitCount": "查重(TT)提交数",
		"TTHitCount": "查重(TT)比中数",
		"TLSubmitCount": "倒查(TL)提交数",
		"TLHitCount": "倒查(TL)比中数"
	},
	ToolTipText: {
		"NextOne": "下一个",
		"LastOne": "上一个",
		"Save": "保存",
		"SwitchWorkMode": "切换工作模式",
		"GetTask": "获取任务",
		"FinishTask": "完成任务",
		"AbortTask": "放弃任务",
		"Open": "打开",
		"SelectDB": "选择数据库"

	}
}
//模板  需要扩展的国际化文件
AbisMessageResource.copy = "复制";
var AbisCheckData = {};
AbisCheckData.candFgps = [{
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
AbisCheckData.candFgps_zw = [{
						id: "0",
						text: AbisMessageResource.FingerPosition['RightPalm'],
						enabled: true
					}, {
						id: "1",
						text: AbisMessageResource.FingerPosition['LeftPalm'],
						enabled: true
					}, {
						id: "2",
						text: AbisMessageResource.FingerPosition['LeftFourFingers'],
						enabled: true
					}, {
						id: "3",
						text: AbisMessageResource.FingerPosition['RightFourFingers'],
						enabled: true
					}];
					
					
					
					
					
					
					
					



//一下为测试数据 和 json demo

//查询后台返回数据
var codeDataDemo = {'dbid':[{"code":"2","text":"现场库","pinyin":""},{"code":"32","text":"远程现场库","pinyin":""},{"code":"128","text":"临时现场库","pinyin":""}],'CEBasicInfo|CEOccurPlaceCode':[{"code":"0","pinyin":"wz","text":"未知"}]};
//案件信息
var lpDataDemo = '{"cards":[{"cardInfo":{"seqNo":1,"cardNum":"A000000","hasTpMatch":"Y"}}],"mainInfo":{"id":2081,"dbid":2,"subDbMask":0,"subDbMask2":0,"subDbMask3":0,"subDbMask4":0,"ceUuid":"86c08a59f43d44bab8fcc8dbd2627635","ceType":1,"ceNum":"A1100000000002018050001","ceName":"A1100000000002018050001","misCeNum":null,"dataPath":"/11","createTime":"2017-1-22 11:31:54","createUser":"wanglixin","createUnitCode":"110000000000","updateTime":"2017-1-22 11:31:54","updateUser":"wanglixin","updateUnitCode":"110000000000","ceStatus":0,"deleteFlag":0,"orgSysType":null,"orgSysInstanceName":null,"abisCeNum":"A1100000000002018050001","sceneInvestNum":"A1100000000002018050001","policeNum":"A1100000000002018050001"},"caseTextInfo":{"BasicInfo":{"ceoccurPlaceCode":"330303","cesuspiciousAreaCode1":"110102","cesuspiciousAreaCode2":"110102","cesuspiciousAreaCode3":"110103","ceclassCode1":"040101","ceclassCode2":"010000","ceclassCode3":"010000","ceoccurDate":"2005-4-17 0:00:00","ceoccurPlace":"浙江温州市龙湾区滨海园区纬六路机耕路和滨海大道交叉路口","cecomments":"2005年4月17日早上7时许，接到陈德芳（山东巨野县人）报称：在滨海园区纬六路机耕路和滨海大道交叉路口的东侧河里发现一具尸体，在路边有少量的血迹。","cepremium":"0","CEClassCode1":"040101","CEClassCode2":"010000","CEClassCode3":"010000","CEOccurDate":"2005-4-17 0:00:00","CEOccurPlaceCode":"330303","CEOccurPlace":"浙江温州市龙湾区滨海园区纬六路机耕路和滨海大道交叉路口","HasPersonKilled":"1","PersonKilledCnt":0,"CaseLoss":"0","CEComments":"2005年4月17日早上7时许，接到陈德芳（山东巨野县人）报称：在滨海园区纬六路机耕路和滨海大道交叉路口的东侧河里发现一具尸体，在路边有少量的血迹。","CESuspiciousAreaCode1":"110102","CESuspiciousAreaCode2":"110102","CESuspiciousAreaCode3":"110103","CEPremium":"0"},"AcceptInfo":{"AcceptOperator":"接警人员","AcceptTime":"20171111","AcceptUnitName":"接警单位名称","AcceptPlace":"接警地点","AcceptComments":"备注"},"RegisterInfo":{"RegiApprover":"立案人","RegiTime":"20171021","RegiUnitName":"立案单位名称"},"SolvedCaseInfo":{"BreakDate":"20171221","BreakMethodDesc":"破案描述"},"ExtractInfo":{"ExtractDate":"2017-10-12 0:00:00","Extractor1":"朱定海","Extractor2":"22","Extractor3":"2222","ExtractUnitCode":"110101000000","ExtractUnitName":"北京东城区分局"},"CoopInvestInfo":{"SuperviseLevel":9},"CancelInfo":{"CancelDate":"20170526"}}}';
//现场指纹卡片
var lpCardDataDemo = '{"cardTextInfo":{"NamelessCorpseId":"1","LeftLocation":"2","StartFgp":"3","EndFgp":"4","SenderId":"5","EnrollInfo":{"IniEnrollUser":"6","IniSysId":"7","IniEnrollTime":"8","EnrollSiteId":"9"},"CandFgps":"0000110000"},"cardInfo":{"cardNum":"10","seqNo":"11","createUser":"12","createTime":"13","updateUser":"14","updateTime":"15","comments":"16"}}'
//现场掌纹卡片
var lpCardDataDemoZw = '{"cardTextInfo":{"NamelessCorpseId":"1","LeftLocation":"2","StartFgp":"3","EndFgp":"4","SenderId":"5","EnrollInfo":{"IniEnrollUser":"6","IniSysId":"7","IniEnrollTime":"8","EnrollSiteId":"9"},"CandFgps":"0011110000"},"cardInfo":{"bty":"2","cardNum":"10","seqNo":"11","createUser":"12","createTime":"13","updateUser":"14","updateTime":"15","comments":"16"}}';
//捺印人员数据 完整数据
var rcptpcard = {"mainInfo":{"id":"80","dbId":1,"subDbMask":0,"uniPersonId":6182,"personNum":"R1101150000002017030044","misPersonNum":"","dataPath":"","personUUID":"5db3e66416704b7993ddf4ea5d60b138","cuInfo":{"createUser":"hsabisadm","createTime":"2017-3-20 16:12:26","createUnitCode":"110115","updateUser":"hsabisadm","updateTime":"2017-3-20 16:53:37","updateUnitCode":"110115"},"btyMask":0,"deleteFlag":0},"tpCardInfo":{"id":8102,"cardNum":"1101150000002017030041","cardNum2":"","createTime":"1970-1-1 8:00:00","createUser":"hsabisadm","updateTime":"2017-3-20 16:53:37","updateUser":"hsabisadm","printDate":"20170320","printBy":"1231231","printUnitCode":"110103","printUnitName":"123123123","printReason":""},"personTextInfo":{"Id":8102,"Name":"测试全部数据","ShenfenId":"620123199110037936","NamePinyin":"5123123","BirthDate":"20170320","SexCode":9,"Nation":"016","MinZu":"05","Alias":"125123123","PoliticalAffiliation":"02","ReligiousFaith":"5","MaritalStatus":"40","HighestEduDegree":"04","MilitaryServiceStatus":"1","Comments":"1231231","AddrInfo":[{"AddressType":5,"AddressCode":"110102","AddressDetail":"123123","AddressZipCode":"12312312"},{"AddressType":2,"AddressCode":"110104","AddressDetail":"41231231","AddressZipCode":"123123123123"}],"BodyInfo":{"BodyHeight":173,"BodyWeight":75,"FootLength":26,"BloodType":"2","BodyFeatureCodes":"0211","HairColor":"1","EyeColor":"1","AuditionCap":"1","VocalCap":"1","Accent":"130000","FingerMissedCnt":5},"CaseInfo":{"CaseClassCode1":"010110","CaseClassCode2":"010120","CaseClassCode3":"010150","IsCriminal":1,"PersonClassCode":"2","CriminalRecord":"12123123","CaseNum":"11231231231231231231231"},"EnrollInfo":{"IniEnrollTime":"2017-3-8 0:00:00","IniEnrollUser":"123123123","IniEnrollUnitCode":"110103","IniEnrollType":1},"CertInfo":[{"CertType":111,"CertNum":"123123","IssueDate":"20170320","StartDate":"20170320","ExpireDate":"20170320","IssueBy":"123123"}],"CommInfo":[{"CommType":1,"CommNum":"123123","LoginPass":"123123"},{"CommType":11,"CommNum":"123123","LoginPass":"123123123"}],"EduInfo":[],"EmploymentInfo":[],"PhoneInfo":[{"PhoneNumType":4,"PhoneNum":"123123123112312312311231231231123123123112312312311231231231"},{"PhoneNumType":3,"PhoneNum":"123123123"}]}};
var tpdata01="{\"mainInfo\":{\r\n  \"id\" : 17764,\r\n  \"dbId\" : 1,\r\n  \"subDbMask\" : 0,\r\n  \"subDbMask2\" : 0,\r\n  \"subDbMask3\" : 0,\r\n  \"subDbMask4\" : 0,\r\n  \"uniPersonId\" : 17763,\r\n  \"personNum\" : \"R3201000008883210707514\",\r\n  \"misPersonNum\" : \"R3201000008883210707514\",\r\n  \"dataPath\" : \"\/\",\r\n  \"personUUID\" : \"c2fa72f0ba94495ea51f1fcb8ef8159d\",\r\n  \"cuInfo\" : {\r\n    \"createUser\" : \"wangyanfang\",\r\n    \"createTime\" : \"2018-7-11 14:54:56\",\r\n    \"createUnitCode\" : \"100000000000\",\r\n    \"updateUser\" : \"wangyanfang\",\r\n    \"updateTime\" : \"2018-7-11 14:54:56\",\r\n    \"updateUnitCode\" : \"100000000000\"\r\n  },\r\n  \"btyMask\" : 1,\r\n  \"deleteFlag\" : 0,\r\n  \"orgSysType\" : \"\",\r\n  \"orgSysInstanceName\" : \"\"\r\n},\"tpCardInfo\":{\r\n  \"id\" : 17764,\r\n  \"cardNum\" : \"3201000008883210707514\",\r\n  \"cardNum2\" : \"\",\r\n  \"createTime\" : \"2018-7-11 14:54:56\",\r\n  \"createUser\" : \"wangyanfang\",\r\n  \"updateTime\" : \"2018-7-11 14:54:56\",\r\n  \"updateUser\" : \"wangyanfang\",\r\n  \"printDate\" : \"20180418\",\r\n  \"printBy\" : \"\u8C22\u542F\u660E\",\r\n  \"printUnitCode\" : \"320100131500\",\r\n  \"printUnitName\" : \"\u5357\u4EAC\u5E02\u7B2C\u4E8C\u770B\u5B88\u6240\",\r\n  \"printReason\" : \"\",\r\n  \"tenFingerPrintStatus\" : \"\"\r\n},\"personTextInfo\":{\r\n  \"Id\" : 17764,\r\n  \"Name\" : \"\u5E38\u6709\u798F\",\r\n  \"NamePinyin\" : \"ChangYouFu\",\r\n  \"BirthDate\" : \"19911003\",\r\n  \"SexCode\" : \"9\",\r\n  \"Nation\" : \"156\",\r\n  \"ShenfenId\" : \"620123199110037936\",\r\n  \"MinZu\" : \"01\",\r\n  \"Comments\" : \"<RY>R3201066420180400700<\/RY>\",\r\n  \"AddrInfo\" : [ {\r\n    \"AddressType\" : 5,\r\n    \"AddressCode\" : \"620123\",\r\n    \"AddressDetail\" : \"\u7518\u8083\u6986\u4E2D\u53BF\u7518\u8083\u7701\u6986\u4E2D\u53BF\u4E2D\u8FDE\u5DDD\u4E61\u9EC4\u84BF\u6E7E\u6751\u90A6\u90A6\u6C9F\u793E13\u53F7\",\r\n    \"AddressZipCode\" : \"\"\r\n  } ],\r\n  \"CaseInfo\" : {\r\n    \"CaseClassCode1\" : \"050299\"\r\n  },\r\n  \"CertInfo\" : [ ],\r\n  \"CommInfo\" : [ ],\r\n  \"EduInfo\" : [ ],\r\n  \"EmploymentInfo\" : [ ],\r\n  \"PhoneInfo\" : [ ]\r\n}}"
//比对任务数据
var qryDataDemo = {"id":1,"subDbMask":0,"qryNum":"3100002000067151I","qryTaskUuid":"01c58c664f5b4cbd80893dd9615e2486","qryStatus":0,"owner":"","dataPath":"","matchPriority":4,"verifyPriority":1,"qryType":2,"comments":"12345","cuInfo":{"createUser":"hsabisadm","createTime":"2017-1-22 11:31:54","createUnitCode":"110115","updateUser":"hsabisadm","updateTime":"2017-1-22 11:31:54","updateUnitCode":"110115"},"wfid":"","mask1":0,"mask2":0,"curCandCnt":0,"rmtFlag":0,"btyMask":1,"lastVerifyResult":0,"toNextStepSet":0,"submitUser":"hsabisadm","submitUnitCode":"110115","submitTime":"2017-1-22 11:31:54","submitComputerIp":"192.168.128.133","submitComputerName":"Hxue-PC","firstSrcCardId":1,"firstSrcCardNum":"3100002000067151I","destPids":"4","hitProbability":0,"maxCandSocre":0,"matchFinishTime":"1970-1-1 8:00:00","verifyFinishTime":"1970-1-1 8:00:00","qryGroupNum":"","userField1":"","userField2":"","responseType":"","dbId":20,"checkHit":false,"recheckHit":false};

//必填项
var requried = {"TP_CARD_INFO":["CARD_NUM","PRINT_DATE","PRINT_BY","PRINT_UNIT_CODE"],"MIS_PERSON_BASIC_INFO":["NAME","NAME_PINYIN","SHENFEN_ID","SEX_CODE","BIRTH_DATE","NATION","MIN_ZU","ALIAS"],"MIS_PERSON_CE_INFO":["CASE_NUM","PERSON_CLASS_CODE","CASE_CLASS_CODE_1","CASE_CLASS_CODE_2","CASE_CLASS_CODE_3","CRIMINAL_RECORD","IS_CRIMINAL"],"MIS_PERSON":["PERSON_NUM"]}
//不允许更新项
var upd = {"MIS_PERSON_BASIC_INFO":["NAME","NAME_PINYIN","SHENFEN_ID","SEX_CODE","BIRTH_DATE","NATION","MIN_ZU","ALIAS"],"MIS_PERSON_CE_INFO":["CASE_NUM","PERSON_CLASS_CODE","CASE_CLASS_CODE_1","CASE_CLASS_CODE_2","CASE_CLASS_CODE_3","CRIMINAL_RECORD","IS_CRIMINAL"]}

var caseRequried = {"CASE_EVENT":["CE_NAME","ABIS_CE_NUM","CE_NUM","CE_STATUS","CE_TYPE","COMMENTS","DBID"],"CASE_EXTRACT_INFO":["EXTRACT_DATE","EXTRACT_UNIT_CODE","EXTRACT_UNIT_NAME","EXTRACTOR_1","EXTRACTOR_2","EXTRACTOR_3"],"CE_BASIC_INFO":["CASE_LOSS","CE_CLASS_CODE_1","CE_CLASS_CODE_2","CE_CLASS_CODE_3"],"CE_ACCEPT_INFO":["CE_OCCUR_DATE","CE_OCCUR_PLACE","CE_OCCUR_PLACE_CODE","CE_PREMIUM","CE_SUSPICIOUS_AREA_CODE_1","CE_SUSPICIOUS_AREA_CODE_2","CE_SUSPICIOUS_AREA_CODE_3","HAS_PERSON_KILLED","PERSON_KILLED_CNT","SUPERVISE_LEVEL"]}
caseRequried = {"CASE_EXTRACT_INFO":["EXTRACT_UNIT_CODE","EXTRACT_UNIT_NAME"]};
var caseNotUpdate = {"CASE_EVENT":["CE_NAME","ABIS_CE_NUM","CE_NUM","CE_STATUS","CE_TYPE","COMMENTS","DBID"],"CASE_EXTRACT_INFO":["EXTRACT_DATE","EXTRACT_UNIT_CODE","EXTRACT_UNIT_NAME","EXTRACTOR_1","EXTRACTOR_2","EXTRACTOR_3"],"CE_BASIC_INFO":["CASE_LOSS","CE_CLASS_CODE_1","CE_CLASS_CODE_2","CE_CLASS_CODE_3"],"CE_ACCEPT_INFO":["CE_OCCUR_DATE","CE_OCCUR_PLACE","CE_OCCUR_PLACE_CODE","CE_PREMIUM","CE_SUSPICIOUS_AREA_CODE_1","CE_SUSPICIOUS_AREA_CODE_2","CE_SUSPICIOUS_AREA_CODE_3","HAS_PERSON_KILLED","PERSON_KILLED_CNT","SUPERVISE_LEVEL"]}

var columXML = '<?xml version="1.0" encoding="UTF-8"?>\r\n<Items Name="测试">\r\n<CASE_EVENT>\r\n<Item Name="CE_NUM" MinLength="" />\r\n<Item Name="ABIS_CE_NUM" MinLength="" />\r\n<Item Name="CE_NAME" MinLength="" />\r\n<Item Name="DBID" MinLength="" />\r\n<Item Name="CE_STATUS" MinLength="" />\r\n<Item Name="CE_TYPE" MinLength="" />\r\n</CASE_EVENT>\r\n<CE_ACCEPT_INFO>\r\n<Item Name="CE_COMMENTS" MinLength="" />\r\n</CE_ACCEPT_INFO>\r\n<MIS_PERSON>\r\n<Item Name="PERSON_NUM" MinLength="" />\r\n<Item Name="DBID" MinLength="" />\r\n</MIS_PERSON>\r\n</Items>';

var columJson = "{\r\n\"CASE_EVENT\" : [\"ABIS_CE_NUM\",\"CE_NAME\", \"CE_STATUS\" ]\r\n}";


var rcptpdata2 = '{\"mainInfo\":{\r\n  \"id\" : 3337,\r\n  \"dbId\" : 1,\r\n  \"subDbMask\" : 0,\r\n  \"subDbMask2\" : 0,\r\n  \"subDbMask3\" : 0,\r\n  \"subDbMask4\" : 0,\r\n  \"uniPersonId\" : 3337,\r\n  \"personNum\" : \"R3301825032016052300009\",\r\n  \"misPersonNum\" : \"R3301825032016052300009\",\r\n  \"dataPath\" : \"\",\r\n  \"personUUID\" : \"5527005847db436c9d245612e4cf071e\",\r\n  \"cuInfo\" : {\r\n    \"createUser\" : \"hsabisadm\",\r\n    \"createTime\" : \"2017-07-24 09:22:30\",\r\n    \"createUnitCode\" : \"110001\",\r\n    \"updateUser\" : \"mex_service\",\r\n    \"updateTime\" : \"2018-09-07 22:14:49\",\r\n    \"updateUnitCode\" : \"110001\"\r\n  },\r\n  \"btyMask\" : 1,\r\n  \"deleteFlag\" : 0,\r\n  \"orgSysType\" : \"\",\r\n  \"orgSysInstanceName\" : \"\"\r\n},\"tpCardInfo\":{\r\n  \"id\" : 3337,\r\n  \"cardNum\" : \"3301825032016052300009\",\r\n  \"cardNum2\" : \"\",\r\n  \"createTime\" : \"2017-07-24 09:22:30\",\r\n  \"createUser\" : \"hsabisadm\",\r\n  \"updateTime\" : \"2017-07-24 09:22:30\",\r\n  \"updateUser\" : \"hsabisadm\",\r\n  \"printDate\" : \"20160523\",\r\n  \"printBy\" : \"\u8BB8\u71D5\\u0000\u6CC4\uE06D\u7C3F\uFF1F\\u0000\uFF1F\\u0000\\u0010\\u0004\\u0000\\u0000\\u0000\\u000F\\u0000\\u0000\\u0000\\u0000\\u0000\\u0000\\u00000\uFF1F\",\r\n  \"printUnitCode\" : \"330182000000\",\r\n  \"printUnitName\" : \"\u5EFA\u5FB7\u5E02\u516C\u5B89\u5C40\\u0000\uFF1F\\u0000\\u0010\\f\\u0000\\u0000\\u0000\\u000F\\u0000\\u0000\\u0000\\u0000\\u0000\\u0000\\u00000\u6C90\\u00002012\/12\/01\\u0000\\u0000\\u0000\\u0000\\u0000\\u0010\\n\\u0000\\u0000\\u0000\\u000F\\u0000\\u0000\\u0000\uE0D9t\\u000B`\u908B\\u00002016\/0\",\r\n  \"printReason\" : \"\",\r\n  \"tenFingerPrintStatus\" : \"\"\r\n},\"personTextInfo\":{\r\n  \"Id\" : 3337,\r\n  \"Name\" : \"\u9648\u6C34\u4ED9\\u000015000\\u0000\uFF1F\\u0000\\u0010\\u0006\\u0000\\u0000\\u0000\\u000F\\u0000\\u0000\\u0000\\u0000\\u0000\\u0000\\u00000\uFF1F\",\r\n  \"SexCode\" : \"\\u0000\",\r\n  \"ShenfenId\" : \"330126195002130721\",\r\n  \"AddrInfo\" : [ {\r\n    \"AddressType\" : 2,\r\n    \"AddressCode\" : null,\r\n    \"AddressDetail\" : null,\r\n    \"AddressZipCode\" : null\r\n  }, {\r\n    \"AddressType\" : 5,\r\n    \"AddressCode\" : null,\r\n    \"AddressDetail\" : null,\r\n    \"AddressZipCode\" : null\r\n  } ],\r\n  \"CaseInfo\" : {\r\n    \"IsCriminal\" : 0,\r\n    \"CriminalRecord\" : \"\u7B2C\u4E00\u6279\u8EAB\u4EFD\u8BC1\u5E73\u9762\u6307\u7EB9,\u5165\u5E93\u65E5\u671F:20160830,\u7F16\u53F7\u4E0D\u7B26\u5408\u89C4\u8303,\u4E3A\u529E\u8BC1\u53D7\u7406\u7F16\u53F7,\u4E0D\u5F97\u5916\u4F20\\u0000\u5C6F\uE466\uE466\\u0000\\u0000\\u0000\\u0000\u8635\uFF1F\\u0000\\u0000\\u0000\u5C76\uE0DCa8\uE0DCa\\u0000\\u0000\\u0000\\u0000\\u0000\\u0000\\u0000\\u0000P\\u0000\\u0000\\u0000\\u0001\\u0000\\u0000\\u0000\u6F7Cb\\f\uE466\uE466\u7B2C\u4E00\u6279\u8EAB\u4EFD\u8BC1\u5E73\u9762\u6307\u7EB9,\u5165\u5E93\u65E5\u671F:20160830,\u7F16\u53F7\u4E0D\u7B26\u5408\u89C4\u8303,\u4E3A\u529E\u8BC1\u53D7\u7406\u7F16\u53F7,\u4E0D\u5F97\u5916\u4F20\\u0000\u5C6F\uE466\uE466\\u0000\\u0000\\u0000\\u0000\u8EB8\uFF1F\\u0000\\u0000\\u0000\u5C10\u6C89a\u5591\u7F87\\u0000\\u0000\\u0000\\u0000\\u0000\\u0000\\u0000\\u0000P\\u0000\\u0000\\u0000\\u0001\\u0000\\u0000\\u00003\u50DB\\f\uE466\uE466\u7B2C\u4E00\u6279\u8EAB\u4EFD\u8BC1\u5E73\u9762\u6307\u7EB9,\u5165\u5E93\u65E5\u671F:20160830,\u7F16\u53F7\u4E0D\u7B26\u5408\u89C4\u8303,\u4E3A\u529E\u8BC1\u53D7\u7406\u7F16\u53F7,\u4E0D\u5F97\u5916\u4F20\\u0000\u5C6F\uE466\uE466\\u0000\\u0000\\u0000\\u0000,u\uFF1F\\u0000\\u0000\\u0000\u5B48\u5676ax\u5676a\\u0000\\u0000\\u0000\\u0000\\u0000\\u0000\\u0000\\u0000P\\u0000\\u0000\\u0000\\u0001\\u0000\\u0000\\u0000N\u50DB\\f\uE466\uE466\u7B2C\u4E00\u6279\u8EAB\u4EFD\u8BC1\u5E73\u9762\u6307\u7EB9,\u5165\u5E93\u65E5\u671F:20160830,\u7F16\u53F7\u4E0D\u7B26\u5408\u89C4\u8303,\u4E3A\u529E\u8BC1\u53D7\u7406\u7F16\u53F7,\u4E0D\u5F97\u5916\u4F20\\u0000\u5C6F\uE466\uE466\\u0000\\u0000\\u0000\\u0000<u\uFF1F\\u0000\\u0000\\u0000\u5C6B\u5242a\\u0010\u6405a\\u0000\\u0000\\u0000\\u0000\\u0000\\u0000\\u0000\\u0000P\\u0000\\u0000\\u0000\\u0001\\u0000\\u0000\\u0000i\u50DB\\f\uE466\uE466\u7B2C\u4E00\u6279\u8EAB\u4EFD\u8BC1\u5E73\u9762\u6307\u7EB9,\u5165\u5E93\u65E5\u671F:20160830,\u7F16\u53F7\u4E0D\u7B26\u5408\u89C4\u8303,\u4E3A\u529E\u8BC1\u53D7\u7406\u7F16\u53F7,\u4E0D\u5F97\u5916\u4F20\\u0000\u5C6F\uE466\uE466\\u0000\\u0000\\u0000\\u0000\\fu\uFF1F\\u0000\\u0000\\u0000\u5BB2\u4EAEa\uE7C9\u7F87\\u0000\\u0000\\u0000\\u0000\\u0000\\u0000\\u0000\\u0000P\\u0000\\u0000\\u0000\\u0001\\u0000\\u0000\\u0000\u525D[\\f\uE466\uE466\u7B2C\u4E00\u6279\u8EAB\u4EFD\u8BC1\u5E73\u9762\u6307\u7EB9,\u5165\u5E93\u65E5\u671F:20160830,\u7F16\u53F7\u4E0D\u7B26\u5408\u89C4\u8303,\u4E3A\u529E\u8BC1\u53D7\u7406\u7F16\u53F7,\u4E0D\u5F97\u5916\u4F20\\u0000\u5C6F\uE466\uE466\\u0000\\u0000\\u0000\\u0000\\u001Cu\uFF1F\\u0000\\u0000\\u0000\uFF1F\\b\u5C4Fa@\u5C4Fa\\u0000\\u0000\\u0000\\u0000\\u0000\\u0000\\u0000\\u0000P\\u0000\\u0000\\u0000\\u0001\\u0000\\u0000\\u0000\u7139[\\f\uE466\uE466\u7B2C\u4E00\u6279\u8EAB\u4EFD\u8BC1\u5E73\u9762\u6307\u7EB9,\u5165\u5E93\u65E5\u671F:20160830,\u7F16\u53F7\u4E0D\u7B26\u5408\u89C4\u8303,\u4E3A\u529E\u8BC1\u53D7\u7406\u7F16\u53F7,\u4E0D\u5F97\u5916\u4F20\\u0000\u5C6F\uE466\uE466\\u0000\\u0000\\u0000\\u0000lu\uFF1F\\u0000\\u0000\\u0000\u5C03\u67FFa\u53A5\u7F87\\u0000\\u0000\\u0000\\u0000\\u0000\\u0000\\u0000\\u0000P\\u0000\\u0000\\u0000\\u0001\\u0000\\u0000\\u0000\u7C1D[\\f\uE466\uE466\u7B2C\u4E00\u6279\u8EAB\u4EFD\u8BC1\u5E73\u9762\u6307\u7EB9,\u5165\u5E93\u65E5\u671F:20160830,\u7F16\u53F7\u4E0D\u7B26\u5408\u89C4\u8303,\u4E3A\u529E\u8BC1\u53D7\u7406\u7F16\u53F7,\u4E0D\u5F97\u5916\u4F20\\u0000\u5C6F\uE466\uE466\\u0000\\u0000\\u0000\\u0000|u\uFF1F\\u0000\\u0000\\u0000\uFF1Fap\u72EDa\\u0000\\u0000\\u0000\\u0000\\u0000\\u0000\\u0000\\u0000P\\u0000\\u0000\\u0000\\u0001\\u0000\\u0000\\u0000\u8AC6[\\f\uE466\uE466\"\r\n  },\r\n  \"CertInfo\" : [ ],\r\n  \"CommInfo\" : [ ],\r\n  \"EduInfo\" : [ ],\r\n  \"EmploymentInfo\" : [ ],\r\n  \"PhoneInfo\" : [ ]\r\n}}';










