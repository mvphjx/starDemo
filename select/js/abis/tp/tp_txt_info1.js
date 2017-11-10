/**
 * 显示一个捺印卡片的所有文本信息
 * tpcardobj对象为CTPCardObject
 */
function TPCardTxtPage(parentid,tpcardobj,i)
{
	this.tpcardObj=tpcardobj;
	this.parentid=parentid;
	this.i=i;	
	this.init();
}
TPCardTxtPage.prototype.init = function()
{
	var page=$("#"+this.parentid);
	//人员信息	
	var personsection=$("<div></div>");
	personsection.addClass("personInfo");
	personsection.addClass("sectionbg1");
	this.persontitle=$("<div></div>");
	this.persontitle.addClass("sub_title");
	this.persontitle.addClass("columnvalue");
	if(this.tpcardObj!=null)
	this.persontitle.html(this.tpcardObj.basicInfo.name);
	personsection.append(this.persontitle);
	var personline=$("<div></div>");
	personline.attr("class","sub_title_line");
	personsection.append(personline);
	var personcontent=$("<div></div>");
	personcontent.attr("class","sectioncontent");
	personsection.append(personcontent);
	page.append(personsection);
	var personNum		= $("<div></div>");	
	personNum.attr("id","personNum"+"_"+this.i);
	personNum.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	personNum.html(this.tpcardObj.mainInfo.personNum);
	personcontent.append(personNum);
	
	var dbid		= $("<div></div>");
	dbid.attr("id","dbid"+"_"+this.i);
	dbid.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	dbid.html(this.tpcardObj.mainInfo.dbidText);
	personcontent.append(dbid);
	
	var personType		= $("<div></div>");
	personType.attr("id","personType"+"_"+this.i);
	personType.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	personType.html(this.tpcardObj.mainInfo.personTypeText);
	personcontent.append(personType);
	
	var iniEnrollType		= $("<div></div>");
	iniEnrollType.attr("id","iniEnrollType"+"_"+this.i);
	iniEnrollType.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	iniEnrollType.html(this.tpcardObj.mainInfo.iniEnrollTypeText);
	personcontent.append(iniEnrollType);
	
	var iniEnrollTime		= $("<div></div>");
	iniEnrollTime.attr("id","iniEnrollTime"+"_"+this.i);
	iniEnrollTime.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	iniEnrollTime.html(this.tpcardObj.mainInfo.iniEnrollTime);
	personcontent.append(iniEnrollTime);
	
	var iniEnrollUser		= $("<div></div>");
	iniEnrollUser.attr("id","iniEnrollUser"+"_"+this.i);
	iniEnrollUser.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	iniEnrollUser.html(this.tpcardObj.mainInfo.iniEnrollUser);
	personcontent.append(iniEnrollUser);
	
	var iniEnrollUnitCode		= $("<div></div>");
	iniEnrollUnitCode.attr("id","iniEnrollUnitCode"+"_"+this.i);
	iniEnrollUnitCode.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	iniEnrollUnitCode.html(this.tpcardObj.mainInfo.iniEnrollUnitCode);
	personcontent.append(iniEnrollUnitCode);
	
	var createTime		= $("<div></div>");
	createTime.attr("id","createTime"+"_"+this.i);
	createTime.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	createTime.html(this.tpcardObj.mainInfo.createTime);
	personcontent.append(createTime);
	
	var createUser		= $("<div></div>");
	createUser.attr("id","createUser"+"_"+this.i);
	createUser.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	createUser.html(this.tpcardObj.mainInfo.createUser);
	personcontent.append(createUser);
	
	var createUnitCode		= $("<div></div>");
	createUnitCode.attr("id","createUnitCode"+"_"+this.i);
	createUnitCode.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	createUnitCode.html(this.tpcardObj.mainInfo.createUnitCode);
	personcontent.append(createUnitCode);


	
	//捺印信息
	var tpcardsection=$("<div></div>");
	tpcardsection.addClass("tpcardinfo");
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
	var cardNum		= $("<div></div>");
	cardNum.attr("id","cardNum"+"_"+this.i);
	cardNum.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	cardNum.html(this.tpcardObj.tpCardInfo.cardNum);
	tpcardcontent.append(cardNum);
	
	var printDate		= $("<div></div>");
	printDate.attr("id","printDate"+"_"+this.i);
	printDate.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	printDate.html(this.tpcardObj.tpCardInfo.printDate);
	tpcardcontent.append(printDate);
	
	var printBy		= $("<div></div>");
	printBy.attr("id","printBy"+"_"+this.i);
	printBy.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	printBy.html(this.tpcardObj.tpCardInfo.printBy);
	tpcardcontent.append(printBy);
	
	var printUnitCode		= $("<div></div>");
	printUnitCode.attr("id","printUnitCode"+"_"+this.i);
	printUnitCode.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	printUnitCode.html(this.tpcardObj.tpCardInfo.printUnitCode);
	tpcardcontent.append(printUnitCode);
	
	var printUnitName		= $("<div></div>");
	printUnitName.attr("id","printUnitName"+"_"+this.i);
	printUnitName.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	printUnitName.html(this.tpcardObj.tpCardInfo.printUnitName);
	tpcardcontent.append(printUnitName);

	//人员基本信息
	var basicsection=$("<div></div>");
	basicsection.addClass("basicinfo");	
	basicsection.addClass("sectionbg1");
	var basictitle=$("<div></div>");
	basictitle.attr("class","sub_title");
	basicsection.append(basictitle);
	var basicline=$("<div></div>");
	basicline.attr("class","sub_title_line");
	basicsection.append(basicline);
	var basiccontent=$("<div></div>");
	basiccontent.attr("class","sectioncontent");
	basicsection.append(basiccontent);
	page.append(basicsection);
	
	var name		= $("<div></div>");
	name.attr("id","name"+"_"+this.i);
	name.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	name.html(this.tpcardObj.basicInfo.name);
	basiccontent.append(name);
	
	var alias		= $("<div></div>");
	alias.attr("id","alias"+"_"+this.i);
	alias.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	alias.html(this.tpcardObj.basicInfo.alias);
	basiccontent.append(alias);	
	
	var birthDate		= $("<div></div>");
	birthDate.attr("id","birthDate"+"_"+this.i);
	birthDate.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	birthDate.html(this.tpcardObj.basicInfo.birthDate);
	basiccontent.append(birthDate);	
	
	var sexCode		= $("<div></div>");
	sexCode.attr("id","sexCode"+"_"+this.i);
	sexCode.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	sexCode.html(this.tpcardObj.basicInfo.sexCodeText);
	basiccontent.append(sexCode);	
	
	var nation		= $("<div></div>");
	nation.attr("id","nation"+"_"+this.i);
	nation.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	nation.html(this.tpcardObj.basicInfo.nationText);
	basiccontent.append(nation);	
	
	var nationality		= $("<div></div>");
	nationality.attr("id","nationality"+"_"+this.i);
	nationality.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	nationality.html(this.tpcardObj.basicInfo.nationalityText);
	basiccontent.append(nationality);
	
	var shenfenId		= $("<div></div>");
	shenfenId.attr("id","shenfenId"+"_"+this.i);
	shenfenId.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	shenfenId.html(this.tpcardObj.basicInfo.shenfenId);
	basiccontent.append(shenfenId);	
	
	var namePinyin		= $("<div></div>");
	namePinyin.attr("id","namePinyin"+"_"+this.i);
	namePinyin.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	namePinyin.html(this.tpcardObj.basicInfo.namePinyin);
	basiccontent.append(namePinyin);
	
	var politicalAffiliation		= $("<div></div>");
	politicalAffiliation.attr("id","politicalAffiliation"+"_"+this.i);
	politicalAffiliation.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	politicalAffiliation.html(this.tpcardObj.basicInfo.politicalAffiliationText);
	basiccontent.append(politicalAffiliation);	
	
	var religiousFaith		= $("<div></div>");
	religiousFaith.attr("id","religiousFaith"+"_"+this.i);
	religiousFaith.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	religiousFaith.html(this.tpcardObj.basicInfo.religiousFaithText);
	basiccontent.append(religiousFaith);
	
	var maritalStatus		= $("<div></div>");
	maritalStatus.attr("id","maritalStatus"+"_"+this.i);
	maritalStatus.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	maritalStatus.html(this.tpcardObj.basicInfo.maritalStatusText);
	basiccontent.append(maritalStatus);	
	
	var highestEduDegree		= $("<div></div>");
	highestEduDegree.attr("id","highestEduDegree"+"_"+this.i);
	highestEduDegree.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	highestEduDegree.html(this.tpcardObj.basicInfo.highestEduDegreeText);
	basiccontent.append(highestEduDegree);	
	
	var militaryServiceStatus		= $("<div></div>");
	militaryServiceStatus.attr("id","militaryServiceStatus"+"_"+this.i);
	militaryServiceStatus.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	militaryServiceStatus.html(this.tpcardObj.basicInfo.militaryServiceStatusText);
	basiccontent.append(militaryServiceStatus);	
	
	var comments		= $("<div></div>");
	comments.attr("id","comments"+"_"+this.i);
	comments.attr("class","columnvalue commentsvalue");
	if(this.tpcardObj!=null)
	comments.html(this.tpcardObj.basicInfo.comments);
	basiccontent.append(comments);	

	//体貌特征
	var bodysection=$("<div></div>");
	bodysection.addClass("bodyinfo");	
	bodysection.addClass("sectionbg2");
	var bodytitle=$("<div></div>");
	bodytitle.attr("class","sub_title");
	bodysection.append(bodytitle);
	var bodyline=$("<div></div>");
	bodyline.attr("class","sub_title_line");
	bodysection.append(bodyline);
	var bodycontent=$("<div></div>");
	bodycontent.attr("class","sectioncontent");
	bodysection.append(bodycontent);
	page.append(bodysection);
	
	var bodyHeight		= $("<div></div>");
	bodyHeight.attr("id","bodyHeight"+"_"+this.i);
	bodyHeight.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	bodyHeight.html(this.tpcardObj.bodyInfo.bodyHeight);
	bodycontent.append(bodyHeight);
	
	var footLength		= $("<div></div>");
	footLength.attr("id","footLength"+"_"+this.i);
	footLength.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	footLength.html(this.tpcardObj.bodyInfo.footLength);
	bodycontent.append(footLength);
	
	var bodyWeight		= $("<div></div>");
	bodyWeight.attr("id","bodyWeight"+"_"+this.i);
	bodyWeight.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	bodyWeight.html(this.tpcardObj.bodyInfo.bodyWeight);
	bodycontent.append(bodyWeight);	
	
	var bloodType		= $("<div></div>");
	bloodType.attr("id","bloodType"+"_"+this.i);
	bloodType.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	bloodType.html(this.tpcardObj.bodyInfo.bloodTypeText);
	bodycontent.append(bloodType);	
	
	var bodyFeature		= $("<div></div>");
	bodyFeature.attr("id","bodyFeature"+"_"+this.i);
	bodyFeature.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	bodyFeature.html(this.tpcardObj.bodyInfo.bodyFeatureText);
	bodycontent.append(bodyFeature);	
	
	var hairColor		= $("<div></div>");
	hairColor.attr("id","hairColor"+"_"+this.i);
	hairColor.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	hairColor.html(this.tpcardObj.bodyInfo.hairColorText);
	bodycontent.append(hairColor);	
	
	var eyeColor		= $("<div></div>");
	eyeColor.attr("id","eyeColor"+"_"+this.i);
	eyeColor.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	eyeColor.html(this.tpcardObj.bodyInfo.eyeColorText);
	bodycontent.append(eyeColor);	
	
	var auditionCap		= $("<div></div>");
	auditionCap.attr("id","auditionCap"+"_"+this.i);
	auditionCap.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	auditionCap.html(this.tpcardObj.bodyInfo.auditionCapText);
	bodycontent.append(auditionCap);	
	
	var vocalCap		= $("<div></div>");
	vocalCap.attr("id","vocalCap"+"_"+this.i);
	vocalCap.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	vocalCap.html(this.tpcardObj.bodyInfo.vocalCapText);
	bodycontent.append(vocalCap);	
	
	var accent		= $("<div></div>");
	accent.attr("id","accent"+"_"+this.i);
	accent.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	accent.html(this.tpcardObj.bodyInfo.accentText);
	bodycontent.append(accent);
	
	var fingerMissedCnt		= $("<div></div>");
	fingerMissedCnt.attr("id","fingerMissedCnt"+"_"+this.i);
	fingerMissedCnt.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	fingerMissedCnt.html(this.tpcardObj.bodyInfo.fingerMissedCnt);
	bodycontent.append(fingerMissedCnt);
	
	//关联案件信息
	var cesection=$("<div></div>");
	cesection.addClass("caseinfo");	
	cesection.addClass("sectionbg1");
	var cetitle=$("<div></div>");
	cetitle.attr("class","sub_title");
	cesection.append(cetitle);
	var celine=$("<div></div>");
	celine.attr("class","sub_title_line");
	cesection.append(celine);
	var cecontent=$("<div></div>");
	cecontent.attr("class","sectioncontent");
	cesection.append(cecontent);
	page.append(cesection);
	
	var caseNum		= $("<div></div>");
	caseNum.attr("id","caseNum"+"_"+this.i);
	caseNum.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	caseNum.html(this.tpcardObj.ceInfo.caseNum);
	cecontent.append(caseNum);
	
	var personClassCode		= $("<div></div>");
	personClassCode.attr("id","personClassCode"+"_"+this.i);
	personClassCode.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	personClassCode.html(this.tpcardObj.ceInfo.personClassCodeText);
	cecontent.append(personClassCode);
	
	var isCriminal		= $("<div></div>");
	isCriminal.attr("id","isCriminal"+"_"+this.i);
	isCriminal.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	isCriminal.html(this.tpcardObj.ceInfo.isCriminalText);
	cecontent.append(isCriminal);
	
	var criminalRecord		= $("<div></div>");
	criminalRecord.attr("id","criminalRecord"+"_"+this.i);
	criminalRecord.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	criminalRecord.html(this.tpcardObj.ceInfo.criminalRecord);
	cecontent.append(criminalRecord);
	
	var caseClassCode1		= $("<div></div>");
	caseClassCode1.attr("id","caseClassCode1"+"_"+this.i);
	caseClassCode1.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	caseClassCode1.html(this.tpcardObj.ceInfo.caseClassCode1Text);
	cecontent.append(caseClassCode1);
	
	var caseClassCode2		= $("<div></div>");
	caseClassCode2.attr("id","caseClassCode2"+"_"+this.i);
	caseClassCode2.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	caseClassCode2.html(this.tpcardObj.ceInfo.caseClassCode2Text);
	cecontent.append(caseClassCode2);
	
	var caseClassCode3		= $("<div></div>");
	caseClassCode3.attr("id","caseClassCode3"+"_"+this.i);
	caseClassCode3.attr("class","columnvalue");
	if(this.tpcardObj!=null)
	caseClassCode3.html(this.tpcardObj.ceInfo.caseClassCode3Text);
	cecontent.append(caseClassCode3);	
	
	//this.initTable();	
	//this.setTableData(this.tpcardObj);
}

TPCardTxtPage.prototype.initTable=function()
{
	addrtableMgr = new WebTableMgr("addrTable","addrPageBar",5);
	commtableMgr = new WebTableMgr("commTable","commPageBar",5);	
	phonetableMgr = new WebTableMgr("phoneTable","phonePageBar",5);
	certtableMgr = new WebTableMgr("certTable","certPageBar",5);
}
TPCardTxtPage.prototype.setTableData=function(obj)
{
	var commJson="commJson";
	var phoneJson="phoneJson";
	var certJson="certJson";
	var addrJson="addrJson";		
	addrtableMgr.setInput(eval('('+obj[addrJson]+')'));;
	commtableMgr.setInput(eval('('+obj[commJson]+')'));
	phonetableMgr.setInput(eval('('+obj[phoneJson]+')'));
	certtableMgr.setInput(eval('('+obj[certJson]+')'));
}

TPCardTxtPage.prototype.setTPCardObject = function(obj)
{	
	
}
TPCardTxtPage.prototype.setWanted = function()
{	
	var name=this.persontitle.html();		
	this.persontitle.html("<a style='color:red'>" +  AbisMessageResource["Fugitive"] + " " + name + " " + AbisMessageResource["Information"] + "</a>");
}



