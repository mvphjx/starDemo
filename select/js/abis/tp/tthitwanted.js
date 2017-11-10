

function TTHitWanted(id,pageNumStr)
{
	this.id			= id;
	this.pageNumStr = pageNumStr;
	this.init();
	
}

TTHitWanted.prototype.init = function()
{
	var nThis = this;
	
	var cols = new Array();
	cols.push(NoticeNotifiedUserCol.ID);
	cols.push(NoticeLogMainCol.EVENT_OBJ_ID);
	cols.push(NoticeLogMainCol.EVENT_TYPE);
	cols.push(NoticeLogMainCol.EVENT_TIME);
	cols.push(NoticeLogMainCol.NOTICE_INFO);
	cols.push(NoticeNotifiedUserCol.STATUS);

	var p =
	{
		pageBarId	: "pagebar",
		tblName		: "NOTICE_USER_NOTICE_VIEW",
		cols		: cols,
		url			: WebVar.VarPath + "/tthitwanted/list/query",
		order		: "EVENT_TIME",
		sort		: {colName:"EVENT_TIME",order:WebTable.DES},
		multiSelect	: false,
		invoke		: invokeFunc,
		pageSize	: 15,
		language	: this.pageNumStr
	}
	this.tblMgr = new TableCustomizeMgr(p);
	
	function invokeFunc(data)
	{
		nThis.load(data);
	}
	
	function selectItem()
	{
		
	}
	
	
	var myDate = new Date();
	var timeStr = myDate.toLocaleString( );
	$("#refreshTime").text(timeStr);
	
	
	WebUI.createLinkButton("flag" , LinkButtonCfg.HaveRead, havaRead);
	
	function havaRead()
	{
		
		var ids = new Array();
		
		var cs = $("#table_rows > div");
		for(var i=0 ;i< cs.length;i++)
		{
			var obj = cs[i];
			var n = $(obj).attr("select");
			if(n == "1")
			{
				ids.push(parseInt($(obj).attr("id")));	
			}
		}
		
		var json = $.toJSON(ids);
			
		var url = WebVar.VarPath + "/tthitwanted/list/havaread/";
		jQuery.ajax( 
	    {
			type 		: 'POST',
			contentType : 'application/json',
			url 		: url,
			data 		: json,
			dataType 	: 'json',
			success 	: function(data) 
			{   
				if(data.status == "ok")
				{
					for(var n in data.data)
					{
						var b = data.data[n];
						if(b == null)continue;
						if(b)
						{
							var cs = $("#table_rows > div");
							for(var i=0;i< cs.length;i++)
							{
								var obj = cs[i];
								var id = parseInt($(obj).attr("id"));
								if(id == n)
								{
									$(obj).remove();
								}
							}
						}
					}
				}
				else
				{
					alert(data.msg);	
				}
			},   
			error : function(e) 
			{
				alert(AbisMessageResource.Alert['SearchError']);
			}   
		});
		
	}
}

TTHitWanted.prototype.load = function(data)
{
	this.clear();
	var tblData = data.tblData;
	var resData = tblData.result;
	var $rowtItems = $("#"+this.id);
	
	if(WebUtil.isNull(resData))
	{
		var $row = $("<div>" + AbisMessageResource["NoData"] + "</div>");
		$row.attr("class","nothing_item");
		$rowtItems.append($row);
		return;
	}
	
	for(var i=0;i<resData.length;i++)
	{
		var row = resData[i];
		var r = this.createRowItem(tblData.headerText,row);
		$rowtItems.append(r);
		r.show();
	}
}

TTHitWanted.prototype.createRowItem = function(hTxt,row,css)
{
	var info = row.info;
	
	var hitinfo = $("#hitinfo").clone(true);
	
	hitinfo.attr("id",row.data.ID);
	hitinfo.bind("selectstart",function(){return false});
	
	hitinfo.mousedown(function(e){

		if(!e.ctrlKey)
		{
			//取消其他选择的
			var cs = $("#table_rows > div");
			for(var i=0 ;i< cs.length;i++)
			{
				var obj = cs[i];
				$(obj).removeClass("select_bg");
				$(obj).attr("select","0");
			}
		}
		
		var n = $(this).attr("select");
		if(n == "1")
		{
			n = "0";
			$(this).removeClass("select_bg");
		}
		else
		{
			n = "1";
			$(this).addClass("select_bg");
		}
		$(this).attr("select",n);
		
	});
	
	if(info == null) 
	{
		hitinfo.find("#hitinfotxt").html(row.data.NOTICE_INFO);
		return hitinfo;
	}
	
	hitinfo.find("#hittime").html(info.hitTime);
	//var url = WebVar.VarPath + "";
//	hitinfo.find("#hitlink").attr("href",url);
	
	var tpcard_url = WebVar.VarPath + "/tp/detail/";
	
	if(info.srcTP != null)
	{
		hitinfo.find("#src_cardnum").html(info.srcTP.cardNum);
		hitinfo.find("#src_cardnum").attr("href",tpcard_url + info.srcTP.cardId);
		
		hitinfo.find("#src_shenfenid").html(info.srcTP.shenFenID);
		hitinfo.find("#src_sex").html(info.srcTP.sex);
		hitinfo.find("#src_birthday").html(info.srcTP.birthDate);
		
	}
	
	if(info.destTP != null)
	{
		hitinfo.find("#dest_cardnum").html(info.destTP.cardNum);
		hitinfo.find("#dest_cardnum").attr("href",tpcard_url + info.destTP.cardId);
		
		hitinfo.find("#dest_shenfenid").html(info.destTP.shenFenID);
		hitinfo.find("#dest_sex").html(info.destTP.sex);
		hitinfo.find("#dest_birthday").html(info.destTP.birthDate);
	}
	
	if(info.wantedInfo != null)
	{
		hitinfo.find("#wantedBy").html(info.wantedInfo.wantedBy);
		hitinfo.find("#wantedNo").html(info.wantedInfo.wantedNo);
		//hitinfo.find("#wantedNo").attr("href",url);
		
		hitinfo.find("#wantedDate").html(info.wantedInfo.wantedStartDate);
	}
	
	return hitinfo;
}

TTHitWanted.prototype.clear = function()
{
	$("#"+this.id).empty();
}