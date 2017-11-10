/**
 * 显示一个案件的所有文本信息
 * tpcardobj对象为CLPCaseObject
 */
function LPCaseTxtPage(parentid,tpcardobj,i,w)
{
	this.tpcardObj=tpcardobj;
	this.parentid=parentid;
	this.i=i;
	this.w=w;
	this.init();
}
LPCaseTxtPage.prototype.init = function()
{
	var page=$("<div></div>");
	page.addClass("floatleft");
	page.css("width",this.w+"%");
	$("#"+this.parentid).append(page);
	//主要信息	
	var personsection=$("<div></div>");
	personsection.addClass("mainInfo");
	personsection.addClass("sectionbg1");
	var persontitle=$("<div></div>");
	persontitle.attr("class","sub_title");
	persontitle.html(this.tpcardObj.basicInfo.name);
	personsection.append(persontitle);
	var personline=$("<div></div>");
	personline.attr("class","sub_title_line");
	personsection.append(personline);
	var personcontent=$("<div></div>");
	personcontent.attr("class","sectioncontent");
	personsection.append(personcontent);
	page.append(personsection);
	var ceNum		= $("<div></div>");
	ceNum.attr("id","ceNum"+"_"+this.i);
	ceNum.attr("class","columnvalue");
	ceNum.html(this.tpcardObj.mainInfo.ceNum);
	personcontent.append(ceNum);
	
	var dbid		= $("<div></div>");
	dbid.attr("id","dbid"+"_"+this.i);
	dbid.attr("class","columnvalue");
	dbid.html(this.tpcardObj.mainInfo.dbidText);
	personcontent.append(dbid);
	
	var ceStatus		= $("<div></div>");
	ceStatus.attr("id","ceStatus"+"_"+this.i);
	ceStatus.attr("class","columnvalue");
	ceStatus.html(this.tpcardObj.mainInfo.ceStatusText);
	personcontent.append(ceStatus);
	
	var ceType		= $("<div></div>");
	ceType.attr("id","ceType"+"_"+this.i);
	ceType.attr("class","columnvalue");
	ceType.html(this.tpcardObj.mainInfo.ceTypeText);
	personcontent.append(ceType);
	
	var createUser		= $("<div></div>");
	createUser.attr("id","createUser"+"_"+this.i);
	createUser.attr("class","columnvalue");
	createUser.html(this.tpcardObj.mainInfo.createUser);
	personcontent.append(createUser);
	
	var createTime		= $("<div></div>");
	createTime.attr("id","createTime"+"_"+this.i);
	createTime.attr("class","columnvalue");
	createTime.html(this.tpcardObj.mainInfo.createTime);
	personcontent.append(createTime);
	
	var createUnitCode		= $("<div></div>");
	createUnitCode.attr("id","createUnitCode"+"_"+this.i);
	createUnitCode.attr("class","columnvalue");
	createUnitCode.html(this.tpcardObj.mainInfo.createUnitCode);
	personcontent.append(createUnitCode);
	
	var ceName		= $("<div></div>");
	ceName.attr("id","ceName"+"_"+this.i);
	ceName.attr("class","columnvalue");
	ceName.html(this.tpcardObj.mainInfo.ceName);
	personcontent.append(ceName);
	
	var mainInfocomments		= $("<div></div>");
	mainInfocomments.attr("id","mainInfocomments"+"_"+this.i);
	mainInfocomments.attr("class","columnvalue");
	mainInfocomments.html(this.tpcardObj.mainInfo.comments);
	personcontent.append(mainInfocomments);
	
	//基本信息
	var tpcardsection=$("<div></div>");
	tpcardsection.addClass("basicInfo");
	tpcardsection.addClass("sectionbg2");
	var tpcardtitle=$("<div></div>");
	tpcardtitle.attr("class","sub_title");
	tpcardsection.append(tpcardtitle);
	var tpcardline=$("<div></div>");
	tpcardline.attr("class","sub_title_line");
	tpcardsection.append(tpcardline);
	var tpcardcontent=$("<div></div>");
	tpcardcontent.attr("class","sectioncontent");
	tpcardsection.append(tpcardcontent);
	page.append(tpcardsection);
	var ceOccurPlaceCode		= $("<div></div>");
	ceOccurPlaceCode.attr("id","ceOccurPlaceCode"+"_"+this.i);
	ceOccurPlaceCode.attr("class","columnvalue");
	ceOccurPlaceCode.html(this.tpcardObj.basicInfo.ceOccurPlaceCode);
	tpcardcontent.append(ceOccurPlaceCode);
	
	var ceOccurPlace		= $("<div></div>");
	ceOccurPlace.attr("id","ceOccurPlace"+"_"+this.i);
	ceOccurPlace.attr("class","columnvalue");
	ceOccurPlace.html(this.tpcardObj.basicInfo.ceOccurPlace);
	tpcardcontent.append(ceOccurPlace);
	
	var ceOccurDate		= $("<div></div>");
	ceOccurDate.attr("id","ceOccurDate"+"_"+this.i);
	ceOccurDate.attr("class","columnvalue");
	ceOccurDate.html(this.tpcardObj.basicInfo.ceOccurDate);
	tpcardcontent.append(ceOccurDate);
	
	var hasPersonKilled		= $("<div></div>");
	hasPersonKilled.attr("id","hasPersonKilled"+"_"+this.i);
	hasPersonKilled.attr("class","columnvalue");
	hasPersonKilled.html(this.tpcardObj.basicInfo.hasPersonKilledText);
	tpcardcontent.append(hasPersonKilled);
	
	var superviseLevel		= $("<div></div>");
	superviseLevel.attr("id","superviseLevel"+"_"+this.i);
	superviseLevel.attr("class","columnvalue");
	superviseLevel.html(this.tpcardObj.basicInfo.superviseLevelText);
	tpcardcontent.append(superviseLevel);
	
	var personKilledCnt		= $("<div></div>");
	personKilledCnt.attr("id","personKilledCnt"+"_"+this.i);
	personKilledCnt.attr("class","columnvalue");
	personKilledCnt.html(this.tpcardObj.basicInfo.personKilledCnt);
	tpcardcontent.append(personKilledCnt);
	
	var ceClassCode1		= $("<div></div>");
	ceClassCode1.attr("id","ceClassCode1"+"_"+this.i);
	ceClassCode1.attr("class","columnvalue");
	ceClassCode1.html(this.tpcardObj.basicInfo.ceClassCode1Text);
	tpcardcontent.append(ceClassCode1);
	
	var ceClassCode2		= $("<div></div>");
	ceClassCode2.attr("id","ceClassCode2"+"_"+this.i);
	ceClassCode2.attr("class","columnvalue");
	ceClassCode2.html(this.tpcardObj.basicInfo.ceClassCode2Text);
	tpcardcontent.append(ceClassCode2);
	
	var ceClassCode3		= $("<div></div>");
	ceClassCode3.attr("id","ceClassCode3"+"_"+this.i);
	ceClassCode3.attr("class","columnvalue");
	ceClassCode3.html(this.tpcardObj.basicInfo.ceClassCode3Text);
	tpcardcontent.append(ceClassCode3);
	
	var caseLoss		= $("<div></div>");
	caseLoss.attr("id","caseLoss"+"_"+this.i);
	caseLoss.attr("class","columnvalue");
	caseLoss.html(this.tpcardObj.basicInfo.caseLoss);
	tpcardcontent.append(caseLoss);
	
	var ceSuspiciousAreaCode1		= $("<div></div>");
	ceSuspiciousAreaCode1.attr("id","ceSuspiciousAreaCode1"+"_"+this.i);
	ceSuspiciousAreaCode1.attr("class","columnvalue");
	ceSuspiciousAreaCode1.html(this.tpcardObj.basicInfo.ceSuspiciousAreaCode1);
	tpcardcontent.append(ceSuspiciousAreaCode1);
	
	var ceSuspiciousAreaCode2		= $("<div></div>");
	ceSuspiciousAreaCode2.attr("id","ceSuspiciousAreaCode2"+"_"+this.i);
	ceSuspiciousAreaCode2.attr("class","columnvalue");
	ceSuspiciousAreaCode2.html(this.tpcardObj.basicInfo.ceSuspiciousAreaCode2);
	tpcardcontent.append(ceSuspiciousAreaCode2);
	
	var ceSuspiciousAreaCode3		= $("<div></div>");
	ceSuspiciousAreaCode3.attr("id","ceSuspiciousAreaCode3"+"_"+this.i);
	ceSuspiciousAreaCode3.attr("class","columnvalue");
	ceSuspiciousAreaCode3.html(this.tpcardObj.basicInfo.ceSuspiciousAreaCode3);
	tpcardcontent.append(ceSuspiciousAreaCode3);
	
	var cePremium		= $("<div></div>");
	cePremium.attr("id","cePremium"+"_"+this.i);
	cePremium.attr("class","columnvalue");
	cePremium.html(this.tpcardObj.basicInfo.cePremium);
	tpcardcontent.append(cePremium);
	
	var basicInfocomments		= $("<div></div>");
	basicInfocomments.attr("id","basicInfocomments"+"_"+this.i);
	basicInfocomments.attr("class","columnvalue");
	basicInfocomments.html(this.tpcardObj.basicInfo.comments);
	tpcardcontent.append(basicInfocomments);

	//接警信息
	var acceptsection=$("<div></div>");
	acceptsection.addClass("acceptInfo");	
	acceptsection.addClass("sectionbg1");
	var accepttitle=$("<div></div>");
	accepttitle.attr("class","sub_title");
	acceptsection.append(accepttitle);
	var acceptline=$("<div></div>");
	acceptline.attr("class","sub_title_line");
	acceptsection.append(acceptline);
	var acceptcontent=$("<div></div>");
	acceptcontent.attr("class","sectioncontent");
	acceptsection.append(acceptcontent);
	page.append(acceptsection);
	
	var acceptOperator		= $("<div></div>");
	acceptOperator.attr("id","acceptOperator"+"_"+this.i);
	acceptOperator.attr("class","columnvalue");
	acceptOperator.html(this.tpcardObj.acceptInfo.acceptOperator);
	acceptcontent.append(acceptOperator);
	
	var acceptTime		= $("<div></div>");
	acceptTime.attr("id","acceptTime"+"_"+this.i);
	acceptTime.attr("class","columnvalue");
	acceptTime.html(this.tpcardObj.acceptInfo.acceptTime);
	acceptcontent.append(acceptTime);	
	
	var acceptUnitCode		= $("<div></div>");
	acceptUnitCode.attr("id","acceptUnitCode"+"_"+this.i);
	acceptUnitCode.attr("class","columnvalue");
	acceptUnitCode.html(this.tpcardObj.acceptInfo.acceptUnitCode);
	acceptcontent.append(acceptUnitCode);	
	
	var acceptUnitName		= $("<div></div>");
	acceptUnitName.attr("id","acceptUnitName"+"_"+this.i);
	acceptUnitName.attr("class","columnvalue");
	acceptUnitName.html(this.tpcardObj.acceptInfo.acceptUnitName);
	acceptcontent.append(acceptUnitName);	
	
	var acceptPlaceName		= $("<div></div>");
	acceptPlaceName.attr("id","acceptPlaceName"+"_"+this.i);
	acceptPlaceName.attr("class","columnvalue");
	acceptPlaceName.html(this.tpcardObj.acceptInfo.acceptPlaceName);
	acceptcontent.append(acceptPlaceName);	
	
	var acceptInfocomments		= $("<div></div>");
	acceptInfocomments.attr("id","acceptInfocomments"+"_"+this.i);
	acceptInfocomments.attr("class","columnvalue");
	acceptInfocomments.html(this.tpcardObj.acceptInfo.acceptComments);
	acceptcontent.append(acceptInfocomments);	

	//立案信息
	var registersection=$("<div></div>");
	registersection.addClass("registerInfo");	
	registersection.addClass("sectionbg2");
	var registertitle=$("<div></div>");
	registertitle.attr("class","sub_title");
	registersection.append(registertitle);
	var registerline=$("<div></div>");
	registerline.attr("class","sub_title_line");
	registersection.append(registerline);
	var registercontent=$("<div></div>");
	registercontent.attr("class","sectioncontent");
	registersection.append(registercontent);
	page.append(registersection);
	
	var regiApprover		= $("<div></div>");
	regiApprover.attr("id","regiApprover"+"_"+this.i);
	regiApprover.attr("class","columnvalue");
	regiApprover.html(this.tpcardObj.registerInfo.regiApprover);
	registercontent.append(regiApprover);
	
	var regiTime		= $("<div></div>");
	regiTime.attr("id","regiTime"+"_"+this.i);
	regiTime.attr("class","columnvalue");
	regiTime.html(this.tpcardObj.registerInfo.regiTime);
	registercontent.append(regiTime);
	
	var regiUnitCode		= $("<div></div>");
	regiUnitCode.attr("id","regiUnitCode"+"_"+this.i);
	regiUnitCode.attr("class","columnvalue");
	regiUnitCode.html(this.tpcardObj.registerInfo.regiUnitCode);
	registercontent.append(regiUnitCode);	
	
	var regiUnitName		= $("<div></div>");
	regiUnitName.attr("id","regiUnitName"+"_"+this.i);
	regiUnitName.attr("class","columnvalue");
	regiUnitName.html(this.tpcardObj.registerInfo.regiUnitName);
	registercontent.append(regiUnitName);		
	
	//破案信息
	var breaksection=$("<div></div>");
	breaksection.addClass("breakInfo");	
	breaksection.addClass("sectionbg1");
	var breaktitle=$("<div></div>");
	breaktitle.attr("class","sub_title");
	breaksection.append(breaktitle);
	var breakline=$("<div></div>");
	breakline.attr("class","sub_title_line");
	breaksection.append(breakline);
	var breakcontent=$("<div></div>");
	breakcontent.attr("class","sectioncontent");
	breaksection.append(breakcontent);
	page.append(breaksection);
	
	var breakDate		= $("<div></div>");
	breakDate.attr("id","breakDate"+"_"+this.i);
	breakDate.attr("class","columnvalue");
	breakDate.html(this.tpcardObj.breakInfo.breakDate);
	breakcontent.append(breakDate);
	
	var breakDateTypeCode		= $("<div></div>");
	breakDateTypeCode.attr("id","breakDateTypeCode"+"_"+this.i);
	breakDateTypeCode.attr("class","columnvalue");
	breakDateTypeCode.html(this.tpcardObj.breakInfo.breakDateTypeCodeText);
	breakcontent.append(breakDateTypeCode);
	
	var breakMethodCode		= $("<div></div>");
	breakMethodCode.attr("id","breakMethodCode"+"_"+this.i);
	breakMethodCode.attr("class","columnvalue");
	breakMethodCode.html(this.tpcardObj.breakInfo.breakMethodCodeText);
	breakcontent.append(breakMethodCode);
	
	var breakMethodDesc		= $("<div></div>");
	breakMethodDesc.attr("id","breakMethodDesc"+"_"+this.i);
	breakMethodDesc.attr("class","columnvalue");
	breakMethodDesc.html(this.tpcardObj.breakInfo.breakMethodDesc);
	breakcontent.append(breakMethodDesc);
	
	
	//提取信息
	var extractsection=$("<div></div>");
	extractsection.addClass("extractInfo");	
	extractsection.addClass("sectionbg2");
	var extracttitle=$("<div></div>");
	extracttitle.attr("class","sub_title");
	extractsection.append(extracttitle);
	var extractline=$("<div></div>");
	extractline.attr("class","sub_title_line");
	extractsection.append(extractline);
	var extractcontent=$("<div></div>");
	extractcontent.attr("class","sectioncontent");
	extractsection.append(extractcontent);
	page.append(extractsection);
	
	var extractDate		= $("<div></div>");
	extractDate.attr("id","extractDate"+"_"+this.i);
	extractDate.attr("class","columnvalue");
	extractDate.html(this.tpcardObj.extractInfo.extractDate);
	extractcontent.append(extractDate);
	
	var extractor1		= $("<div></div>");
	extractor1.attr("id","extractor1"+"_"+this.i);
	extractor1.attr("class","columnvalue");
	extractor1.html(this.tpcardObj.extractInfo.extractor1);
	extractcontent.append(extractor1);
	
	var extractor2		= $("<div></div>");
	extractor2.attr("id","extractor2"+"_"+this.i);
	extractor2.attr("class","columnvalue");
	extractor2.html(this.tpcardObj.extractInfo.extractor2);
	extractcontent.append(extractor2);	
	
	var extractor3		= $("<div></div>");
	extractor3.attr("id","extractor3"+"_"+this.i);
	extractor3.attr("class","columnvalue");
	extractor3.html(this.tpcardObj.extractInfo.extractor3);
	extractcontent.append(extractor3);
	
	var extractInfocomments		= $("<div></div>");
	extractInfocomments.attr("id","extractInfocomments"+"_"+this.i);
	extractInfocomments.attr("class","columnvalue");
	extractInfocomments.html(this.tpcardObj.extractInfo.extractComments);
	extractcontent.append(extractInfocomments);	
	
	//销案信息
	var cancelsection=$("<div></div>");
	cancelsection.addClass("cancelInfo");	
	cancelsection.addClass("sectionbg1");
	var canceltitle=$("<div></div>");
	canceltitle.attr("class","sub_title");
	cancelsection.append(canceltitle);
	var cancelline=$("<div></div>");
	cancelline.attr("class","sub_title_line");
	cancelsection.append(cancelline);
	var cancelcontent=$("<div></div>");
	cancelcontent.attr("class","sectioncontent");
	cancelsection.append(cancelcontent);
	page.append(cancelsection);
	
	var cancelDate		= $("<div></div>");
	cancelDate.attr("id","cancelDate"+"_"+this.i);
	cancelDate.attr("class","columnvalue");
	cancelDate.html(this.tpcardObj.cancelInfo.cancelDate);
	cancelcontent.append(cancelDate);
	
	var cancelReasonCode		= $("<div></div>");
	cancelReasonCode.attr("id","cancelReasonCode"+"_"+this.i);
	cancelReasonCode.attr("class","columnvalue");
	cancelReasonCode.html(this.tpcardObj.cancelInfo.cancelReasonCode);
	cancelcontent.append(cancelReasonCode);
}

LPCaseTxtPage.prototype.setLPCaseObject = function(obj)
{	
	
}



