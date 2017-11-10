
function TPFeedBack(id,pageNumLan)
{
	this.tableName = ViewName.MP_ENROLL_FEEDBACK_VIEW
	this.id 		= id;
	this.pageNumLan	= pageNumLan;
	this.init();
}

TPFeedBack.prototype.init = function()
{
	var _this =this;
	WebUI.createLinkButton("Qry",LinkButtonCfg.Qry,advSearch);

	
	//var xml = '<?xml version="1.0" encoding="UTF-8"?><TextFilter><Projection>*</Projection><From><Table>MP_ENROLL_FEEDBACK_VIEW</Table></From><OrderBy><Oi Order="DESC">ID</Oi></OrderBy><Where><SimpFilter><Group><ColNode Col="FINGER_TT_MATCH_ID" Op="eq" Dt="s"></ColNode><ColNode Col="CREATE_UNIT_CODE" Op="in" Dt="s"><Arg Lt="const" Dt="s">110101000000,110103000000</Arg></ColNode><ColNode Col="PERSON_NUM" Op="eq" Dt="s"><Arg Lt="const" Dt="s">111</Arg></ColNode></Group></SimpFilter></Where></TextFilter>';
	//var SimpFilter = '<SimpFilter><Group><ColNode Col="FINGER_TT_MATCH_ID" Op="eq" Dt="s"></ColNode><ColNode Col="CREATE_UNIT_CODE" Op="in" Dt="s"><Arg Lt="const" Dt="s">110101000000,110103000000</Arg></ColNode><ColNode Col="PERSON_NUM" Op="eq" Dt="s"><Arg Lt="const" Dt="s">2017</Arg></ColNode></Group></SimpFilter>';
    var data = {};
    data.xml = DefaultSearchNodes.tpFeedBack;
    //data.xml = xml;
    //data.SimpFilter = SimpFilter;
	//高级检索
	function advSearch()
	{
		if(_this.searchWindow){
			_this.searchWindow.open();
		}else{
			_this.searchWindow=parent.ABISWindowUtil.openSearch({"tableName":_this.tableName,"callback":invoke,"data":data,"loadLastCfg":true})
			function invoke(data){
				if(data.xml_Filter.indexOf("ColNode")>=0){
					_this.tblMgr.setXml(data.xml_Filter);
					_this.tblMgr.refresh();
				}else{
					_this.tblMgr.setXml('');
					_this.tblMgr.refresh();
				}
			}
		}
	}

	var cols = new Array();
	cols.push(MisPersonCol.PERSON_CLASS_CODE);
	cols.push(MisPersonCol.PERSON_NUM);
	cols.push(TPCardInfoCol.CARD_NUM);
	cols.push(MisPersonBasicInfoCol.NAME);
	cols.push(MisPersonBasicInfoCol.SEX_CODE);
	cols.push(MisPersonBasicInfoCol.SHENFEN_ID);
	cols.push(MisPersonBasicInfoCol.BIRTH_DATE);
	cols.push(TPCardInfoCol.PRINT_DATE);
	
	var tblParam =
	{
		pageBarId	: "pagebar",
		tblName		: this.tableName,
		cols		: cols,
		url			: WebVar.VarPath + "/tp/feedback/query",
		order		: MisPersonCol.ID,
		orderCol	: MisPersonCol.ID,
		sort		: {colName:MisPersonCol.INI_ENROLL_TIME,order:WebTable.DES},
		multiSelect	: false,
		invoke		: invokeFunc,
		pageSize	: 8,
		language	: this.pageNumLan
	}
	this.tblMgr = new TableCustomizeMgr(tblParam);
	var nThis = this;
	function invokeFunc(data)
	{
		nThis.searchFinish(data);
	}
}

TPFeedBack.prototype.searchFinish = function(data)
{
	this.clear();
	var tblData = data.tblData;
	var resData = tblData.result;
	var $rowtItems = $("#"+this.id);
	
	if(WebUtil.isNull(resData))
	{
		var $row = $("<div>"+AbisMessageResource["NoData"]+"</div>");
		$row.attr("class","nothing_item");
		$rowtItems.append($row);
		return;
	}
	
	for(var i=0;i<resData.length;i++)
	{
		var row = resData[i];
		var $rowItem = this.createRowItem(tblData.headerText,row);
		$rowtItems.append($rowItem);
	}
	
}

//创建每一行信息
TPFeedBack.prototype.createRowItem = function(hTxt,row)
{
	function createQryTask($tr,info,data)
	{
		var $lab 	= $("<td valign=\"top\"></td>");
		var $txt 	= $("<td class=\"txt\"></td>");
		$lab.html(data.text);
		var status = -1;
		if(!WebUtil.isNull(data.status))
		{
			status = parseInt(data.status);
		}
		switch(status)
		{
			case ABISCode.QryStatusCode.CHECK_HIT:	
			case ABISCode.QryStatusCode.RECHECK_HIT:
			case ABISCode.QryStatusCode.GACHECK_HIT:
			case ABISCode.QryStatusCode.AUDIT_HIT:
				var $linkLab = $("<a class=\"link\" target=\"_blank\"></a>");
				var url = WebVar.VarPath + "/hitloginfo/" + info.CARD_ID + "/" + data.taskId +  "/" + data.type;
				$linkLab.attr("href",url);
				$linkLab.html(data.statusText);
				$txt.append($linkLab);
				break;
			default:
				$txt.html(data.statusText);
				break;
		}
		$tr.append($lab);
		$tr.append($txt);
	}
	
	var $row = $("<div></div>");
	$row.attr("class","row_item");
	var info = row.data;
	var ext  = row.extData;
	var $rightArea  = $("<div class=\"row_right_area right_bg\"></div>");
	$row.append($rightArea);
	var $rightTbl = $("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" class=\"tbl\"></table>");
	$rightArea.append($rightTbl);
	
	var $r_tr1 		= $("<tr></tr>");
	var $r_tr2 		= $("<tr></tr>");
	var $r_tr3 		= $("<tr></tr>");
	var $r_tr4 		= $("<tr></tr>");
	var fingerTT 	= ext["FINGER_TT"];
	var fingerTL 	= ext["FINGER_TL"];
	var palmTT 		= ext["PALM_TT"];
	var palmTL 		= ext["PALM_TL"];
	var faceTT 		= ext["FACE_TT"];
	var faceTL 		= ext["FACE_TL"];
	var qual 		= ext["QUAL"];
	createQryTask($r_tr1,info,fingerTT);
	createQryTask($r_tr1,info,fingerTL);
	createQryTask($r_tr2,info,palmTT);
	createQryTask($r_tr2,info,palmTL);
	createQryTask($r_tr3,info,faceTT);
	createQryTask($r_tr3,info,faceTL);
	createQryTask($r_tr4,info,qual);
	$rightTbl.append($r_tr1);
	$rightTbl.append($r_tr2);
	$rightTbl.append($r_tr3);
	$rightTbl.append($r_tr4);
	
	var $leftArea  	= $("<div class=\"row_left_area left_bg\"></div>");
	$row.append($leftArea);
	var $leftTbl = $("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\" class=\"tbl\"></table>");
	$leftArea.append($leftTbl);
	var tr1 = $("<tr></tr>");
	var card_num_lab 	= $("<td id=\"card_num_lab\" 	class=\"lab\"></td>");
	var card_num_txt 	= $("<td id=\"card_num_txt\" 	class=\"txt1\"></td>");
	var name_lab 		= $("<td id=\"name_lab\" 		class=\"lab\"></td>");
	var name_txt 		= $("<td id=\"name_txt\"		class=\"txt2\"></td>");
	var person_type_lab = $("<td id=\"person_type_lab\" class=\"lab\"></td>");
	var person_type_txt = $("<td id=\"person_type_txt\" class=\"txt3 p_type\"></td>");
	
	card_num_lab.html(hTxt[TPCardInfoCol.CARD_NUM]+":");
	var cardNum = info[TPCardInfoCol.CARD_NUM];
	var $cardNumLink = $("<a target=\"_blank\" class=\"\"></a>");
	var cardUrl = WebVar.VarPath + "/tp/detail/" + info.CARD_ID;
	
	$cardNumLink.html(cardNum);
	$cardNumLink.attr("href",cardUrl);
	card_num_txt.append($cardNumLink);
	name_lab.html(hTxt[MisPersonBasicInfoCol.NAME]+":");
	name_txt.html(info[MisPersonBasicInfoCol.NAME]);
	person_type_lab.html(hTxt[MisPersonCol.PERSON_CLASS_CODE]+":");
	var pTypeTxt = this.convertValue(info[MisPersonCol.PERSON_CLASS_CODE]);
	person_type_txt.html(pTypeTxt);
	
	tr1.append(card_num_lab);
	tr1.append(card_num_txt);
	tr1.append(name_lab);
	tr1.append(name_txt);
	tr1.append(person_type_lab);
	tr1.append(person_type_txt);
	$leftTbl.append(tr1);
	
	var tr2 = $("<tr></tr>");
	var person_num_lab 	= $("<td id=\"person_num_lab\" 	class=\"lab\"></td>");
	var person_num_txt 	= $("<td id=\"person_num_txt\" 	class=\"txt1\"></td>");
	var sex_lab 		= $("<td id=\"sex_lab\" 		class=\"lab\"></td>");
	var sex_txt 		= $("<td id=\"sex_txt\" 		class=\"txt2\"></td>");
	var enroll_time_lab = $("<td id=\"enroll_time_lab\" class=\"lab\"></td>");
	var enroll_time_txt = $("<td id=\"enroll_time_txt\" class=\"txt3\"></td>");
	
	person_num_lab.html(hTxt[MisPersonCol.PERSON_NUM]+":");
	var personNum = info[MisPersonCol.PERSON_NUM];
	var $personNumLink = $("<DIV></DIV>");
	$personNumLink.html(personNum);
	//$personNumLink.attr("href","#");
	person_num_txt.append($personNumLink);
	sex_lab.html(hTxt[MisPersonBasicInfoCol.SEX_CODE]+":");
	var sexTxt = this.convertValue(info[MisPersonBasicInfoCol.SEX_CODE]);
	sex_txt.html(sexTxt);
	enroll_time_lab.html(hTxt[TPCardInfoCol.PRINT_DATE]+":");
	enroll_time_txt.html(info[TPCardInfoCol.PRINT_DATE]);
	tr2.append(person_num_lab);
	tr2.append(person_num_txt);
	tr2.append(sex_lab);
	tr2.append(sex_txt);
	tr2.append(enroll_time_lab);
	tr2.append(enroll_time_txt);
	$leftTbl.append(tr2);
	
	var tr3 = $("<tr></tr>");
	var shenfen_lab 	= $("<td id=\"shenfen_lab\" 	class=\"lab\"></td>");
	var shenfen_txt 	= $("<td id=\"shenfen_txt\" 	class=\"txt1\"></td>");
	var birthday_lab 	= $("<td id=\"birthday_lab\" 	class=\"lab\"></td>");
	var birthday_txt 	= $("<td id=\"birthday_txt\" 	class=\"txt2\"></td>");
	
	shenfen_lab.html(hTxt[MisPersonBasicInfoCol.SHENFEN_ID]+":");
	shenfen_txt.html(info[MisPersonBasicInfoCol.SHENFEN_ID]);
	birthday_lab.html(hTxt[MisPersonBasicInfoCol.BIRTH_DATE]+":");
	birthday_txt.html(info[MisPersonBasicInfoCol.BIRTH_DATE]);
	
	tr3.append(shenfen_lab);
	tr3.append(shenfen_txt);
	tr3.append(birthday_lab);
	tr3.append(birthday_txt);

	
	$leftTbl.append(tr3);
	
	
	$row.mouseover(function(){
		$leftArea.removeClass("left_bg");
		$leftArea.addClass("left_select_bg");
		$rightArea.removeClass("right_bg");
		$rightArea.addClass("right_select_bg");
	});
	
	$row.mouseout(function(){
		$leftArea.removeClass("left_select_bg");
		$leftArea.addClass("left_bg");
		$rightArea.removeClass("right_select_bg");
		$rightArea.addClass("right_bg");
	});
	return $row;
}

TPFeedBack.prototype.convertValue = function(value)
{
	if(WebUtil.isNull(value))return "";
	var arrs = value.split(WebTable.splitChar);
	return arrs.length == 2?arrs[1]:arrs[0];
}

TPFeedBack.prototype.clear = function(data)
{
	$("#"+this.id).empty();
}

TPFeedBack.prototype.tblCfg = function()
{
	
}



