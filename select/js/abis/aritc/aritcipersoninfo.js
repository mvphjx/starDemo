var ArticPersonTableMgr =
{
		aritcPersonTableMgr:function(type,id,pageNumStr)
		{
			if(type == "wbImId")
			{
				$("#table").html(AbisMessageResource["InstantMessageTips"]);
				$("#SubPage").html("");
			}
			else
			{
				$("#table").html("");
				$("#SubPage").html("");
			}
			if(type == "zhanghaoId")
			{
				var path = WebVar.VarPath + "/artic/person/query";
				var cols = ["ID","IM_TYPE","BIRTH_DATE","SEX_CODE","CARD_NUM","NAME","SHENFEN_ID","CASE_CLASS_CODE_1"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"GI_ZLYC_IM_NOS_VIEW",
					cols:cols,
					url:path,
					orderCol:"ID",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"ID",order:WebTable.DES},
					multiSelect:true,
					link:{cols:["ID"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			if(type == "gruopId")
			{
				var path = WebVar.VarPath + "/artic/person/query";
				var cols = ["IM_ID","IM_TYPE","GROUP_NO","GROUP_NAME","SEX_CODE","CARD_NUM","NAME"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"GI_ZLYC_IM_GROUPS_VIEW",
					cols:cols,
					url:path,
					orderCol:"IM_ID",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"IM_ID",order:WebTable.DES},
					multiSelect:true,
					link:{cols:["IM_ID"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			if(type == "gruopMesId")
			{
				var path = WebVar.VarPath + "/artic/person/query";
				var cols = ["IM_ID","IM_TYPE","GROUP_NO","SEX_CODE","E_MAIL","GROUP_NAME","CARD_NUM"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"GI_ZLYC_IM_GROUP_MEMBERS_VIEW",
					cols:cols,
					url:path,
					orderCol:"IM_ID",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"IM_ID",order:WebTable.DES},
					multiSelect:true,
					link:{cols:["IM_ID"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			if(type == "atmeId")
			{
				var path = WebVar.VarPath + "/artic/person/query";
				var cols = ["ID","IM_TYPE","AUTHOR","NICK_NAME","SEX_CODE","PHONE_NO","CARD_NUM"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"GI_ZLYC_IM_AT_ME_VIEW",
					cols:cols,
					url:path,
					orderCol:"ID",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"ID",order:WebTable.DES},
					multiSelect:true,
//					link:{cols:["CARD_NUM"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			if(type == "friendId")
			{
				var path = WebVar.VarPath + "/artic/person/query";
				var cols = ["IM_ID","IM_TYPE","FRIEND_NAME","FRIEND_GROUP","FRIEND_SEX","FRIEND_AGE","FRIEND_PHONE_NO","CARD_NUM"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"GI_ZLYC_IM_FRIENDS_VIEW",
					cols:cols,
					url:path,
					orderCol:"IM_ID",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"IM_ID",order:WebTable.DES},
					multiSelect:true,
					link:{cols:["IM_ID"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			if(type == "publicInfoId")
			{
				var path = WebVar.VarPath + "/artic/person/query";
				var cols = ["IM_ID","IM_TYPE","POSTER_NO","ATTACHMENT","ATTACHMENT_TYPE","PHONE_NO","E_MAIL","QQ_NO","CASE_NUM"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"GI_ZLYC_IM_PUBLIC_INFO_VIEW",
					cols:cols,
					url:path,
					orderCol:"IM_ID",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"IM_ID",order:WebTable.DES},
					multiSelect:true,
//					link:{cols:["CARD_NUM"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			if(type == "emailId")
			{
				var path = WebVar.VarPath + "/artic/person/query";
				var cols = ["ID","GI_ID","EMAIL","EMAIL_NAME","CREATE_TIME","CREATE_USER","SEX_CODE","CASE_NUM"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"GI_ZLYC_EMAIL_ACCOUNTS_VIEW",
					cols:cols,
					url:path,
					orderCol:"GI_ID",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"GI_ID",order:WebTable.DES},
					multiSelect:true,
//					link:{cols:["CASE_NUM"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			
			if(type == "emailcontacterId")
			{
				var path = WebVar.VarPath + "/artic/person/query";
				var cols = ["GI_ID","EMAIL","CONTACTER_NAME","CONTACTER_PHONE_NO","EMAIL_NAME","SEX_CODE","CASE_NUM"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"GI_ZLYC_EMAIL_CONTACTERS_VIEW",
					cols:cols,
					url:path,
					orderCol:"GI_ID",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"GI_ID",order:WebTable.DES},
					multiSelect:true,
//					link:{cols:["CASE_NUM"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			if(type == "emailLogId")
			{
				var path = WebVar.VarPath + "/artic/person/query";
				var cols = ["ID","TITLE","SENDER","RECEIVER","ITEM_NUM","ITEM_TYPE","CASE_NUM"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"GI_ZLYC_MAILS_VIEW",
					cols:cols,
					url:path,
					orderCol:"ID",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"ID",order:WebTable.DES},
					multiSelect:true,
//					link:{cols:["CASE_NUM"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			if(type == "historyId")
			{
				var path = WebVar.VarPath + "/artic/person/query";
				var cols = ["ID","TITLE","ACCESS_TIME","ACCESS_COUNT","ITEM_NUM","ITEM_TYPE","CASE_NUM"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"GI_ZLYC_WEB_HISTORY_VIEW",
					cols:cols,
					url:path,
					orderCol:"ID",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"ID",order:WebTable.DES},
					multiSelect:true,
//					link:{cols:["CASE_NUM"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			if(type == "bookMarksId")
			{
				var path = WebVar.VarPath + "/artic/person/query";
				var cols = ["ID","BROWSER_NAME","TITLE","ITEM_NUM","ITEM_TYPE","SEX_CODE","CASE_NUM"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"GI_ZLYC_WEB_BOOKMARKS_VIEW",
					cols:cols,
					url:path,
					orderCol:"ID",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"ID",order:WebTable.DES},
					multiSelect:true,
//					link:{cols:["CASE_NUM"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			if(type == "phonesId")
			{
				var path = WebVar.VarPath + "/artic/person/query";
				var cols = ["ID","ITEM_NUM","ITEM_TYPE","CREATE_TIME","CREATE_USER","SEX_CODE","CARD_NUM"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"GI_PHONES_VIEW",
					cols:cols,
					url:path,
					orderCol:"ID",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"ID",order:WebTable.DES},
					multiSelect:true,
//					link:{cols:["CARD_NUM"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			if(type == "phoneContacterId")
			{
				var path = WebVar.VarPath + "/artic/person/query";
				var cols = ["ID","NAME","PHONE_NUM","PHONE_NUM_TYPE","NATION","SEX_CODE","CARD_NUM"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"GI_ZLYC_PHONE_CONTACTER_VIEW",
					cols:cols,
					url:path,
					orderCol:"ID",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"ID",order:WebTable.DES},
					multiSelect:true,
					link:{cols:["ID"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			if(type == "phoneMsgId")
			{
				var path = WebVar.VarPath + "/artic/person/query";
				var cols = ["ID","SENDER_PHONE_NUM","RECEIVER_PHONE_NUM","MSG","SENT_TIME","SMS_CENTER_NO","CASE_NUM"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"GI_ZLYC_PHONE_MSG_VIEW",
					cols:cols,
					url:path,
					orderCol:"ID",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"ID",order:WebTable.DES},
					multiSelect:true,
					link:{cols:["ID"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			if(type == "phoneCallRecId")
			{
				var path = WebVar.VarPath + "/artic/person/query";
				var cols = ["ID","CALLER_PHONE_NUM","CALLED_PHONE_NUM","START_TIME","END_TIME","SEX_CODE","CASE_NUM"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"GI_ZLYC_PHONE_CALL_REC_VIEW",
					cols:cols,
					url:path,
					orderCol:"ID",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"ID",order:WebTable.DES},
					multiSelect:true,
					link:{cols:["ID"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			if(type == "simCardsId")
			{
				var path = WebVar.VarPath + "/artic/person/query";
				var cols = ["ID","PHONE_NUM","ITEM_NUM","ITEM_TYPE","NAME","SEX_CODE","CASE_NUM"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"GI_SIM_CARDS_VIEW",
					cols:cols,
					url:path,
					orderCol:"ID",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"ID",order:WebTable.DES},
					multiSelect:true,
//					link:{cols:["CASE_NUM"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			if(type == "wifiInfoId")
			{
				var path = WebVar.VarPath + "/artic/person/query";
				var cols = ["ID","WIFI_INFO","ITEM_NUM","ITEM_TYPE","NAME","SEX_CODE","CASE_NUM"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"GI_ZLYC_WIFI_INFO_VIEW",
					cols:cols,
					url:path,
					orderCol:"ID",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"ID",order:WebTable.DES},
					multiSelect:true,
//					link:{cols:["CASE_NUM"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			if(type == "aritcInfoId")
			{
				var path = WebVar.VarPath + "/artic/person/query";
				var cols = ["ID","ITEM_NUM","ITEM_TYPE","SHENFEN_ID","NAME","SEX_CODE","CARD_NUM"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"GI_PERSON_VIEW",
					cols:cols,
					url:path,
					orderCol:"ID",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"ID",order:WebTable.DES},
					multiSelect:true,
					link:{cols:["ID"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			if(type == "root")
			{
				var path = WebVar.VarPath + "/artic/person/query";
				var cols = ["ID","ITEM_TYPE","ITEM_NUM","CE_NUM","CE_NAME","PERSON_NAME","PERSON_SHEN_FEN_ID"];
	    		var tblParam =
				{
					tblId:id,
					tblName:"GI_ZLYC_GI_ENROLL_INFO_VIEW",
					cols:cols,
					url:path,
					orderCol:"ID",
					pageBarId:"SubPage",
					callBack:{onClick:selectItem},
					sort:{colName:"ID",order:WebTable.DES},
					multiSelect:true,
//					link:{cols:["ID"],callBack:clickLink},
					language:pageNumStr
				}
				var tblMgr = new TableControlMgr(tblParam);	
	    		return tblMgr;
			}
			
			function clickLink(row,name)
			{
				if(type == "zhanghaoId")
				{
					var id = row["ID"];
					window.open(WebVar.VarPath + "/artic/personinfo/zhangh/" + id,"_blank"); 
				}
				if(type == "phoneContacterId")
				{
					var id = row["ID"];
					window.open(WebVar.VarPath + "/artic/personinfo/phoneContacter/" + id,"_blank"); 
				}
				if(type == "phoneMsgId")
				{
					var id = row["ID"];
					window.open(WebVar.VarPath + "/artic/personinfo/phoneMsg/" + id,"_blank");
				}
				if(type == "phoneCallRecId")
				{
					var id = row["ID"];
					window.open(WebVar.VarPath + "/artic/personinfo/phoneCall/" + id,"_blank");
				}
				if(type == "aritcInfoId")
				{
					var id = row["ID"];
					window.open(WebVar.VarPath + "/artic/personinfo/articinfo/" + id,"_blank");
				}
				if(type == "gruopId")
				{
					var id = row["IM_ID"];
					window.open(WebVar.VarPath + "/artic/personinfo/group/" + id,"_blank");
				}
				if(type == "gruopMesId")
				{
					var id = row["IM_ID"];
					window.open(WebVar.VarPath + "/artic/personinfo/groupMes/" + id,"_blank");
				}
				if(type == "friendId")
				{
					var id = row["IM_ID"];
					window.open(WebVar.VarPath + "/artic/personinfo/friend/" + id,"_blank");
				}
				
			}
		},
		webSearchMgr:function(type,id,tarr,searchStr)
		{
			if(type == "zhanghaoId")
			{
				var tarr = 
	        		[
	        			{colName:"IM_TYPE",dispName:tarr.IM_TYPE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"ZLYC_IM_GROUPS|IM_TYPE"},
//	        			{colName:"BIRTH_DATE",dispName:tarr.BIRTH_DATE,dataType:ABISCode.StorageDataType.DATE,codeName:null},
	        			{colName:"SEX_CODE",dispName:tarr.SEX_CODE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"MIS_PERSON_BASIC_INFO|SEX_CODE"},
	        			{colName:"CARD_NUM",dispName:tarr.CARD_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"NAME",dispName:tarr.NAME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"SHENFEN_ID",dispName:tarr.SHENFEN_ID,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"NATION",dispName:tarr.NATION,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"MIS_PERSON_BASIC_INFO|NATION"}
	        		];        		
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"GI_ZLYC_IM_NOS_VIEW",null,searchStr);
	        		return searchMgr;
			}
			if(type == "gruopId")
			{
				var tarr = 
	        		[
//	        			{colName:"IM_ID",dispName:tarr.IM_ID,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"IM_TYPE",dispName:tarr.IM_TYPE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"ZLYC_IM_GROUPS|IM_TYPE"},
	        			{colName:"GROUP_NO",dispName:tarr.GROUP_NO,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"GROUP_NAME",dispName:tarr.GROUP_NAME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"SEX_CODE",dispName:tarr.SEX_CODE,dataType:ABISCode.StorageDataType.STRING,codeName:"MIS_PERSON_BASIC_INFO|SEX_CODE"},
	        			{colName:"CARD_NUM",dispName:tarr.CARD_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"NAME",dispName:tarr.NAME,dataType:ABISCode.StorageDataType.STRING,codeName:null}
	        		];        		
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"GI_ZLYC_IM_GROUPS_VIEW",null,searchStr);
	        		return searchMgr;
			}
			if(type == "gruopMesId")
			{
				var tarr = 
	        		[
	        			{colName:"IM_TYPE",dispName:tarr.IM_ID,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"ZLYC_IM_GROUPS|IM_TYPE"},
	        			{colName:"GROUP_NO",dispName:tarr.GROUP_NO,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"SEX_CODE",dispName:tarr.SEX_CODE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"MIS_PERSON_BASIC_INFO|SEX_CODE"},
	        			{colName:"E_MAIL",dispName:tarr.E_MAIL,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"GROUP_NAME",dispName:tarr.GROUP_NAME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"CARD_NUM",dispName:tarr.CARD_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null}
	        		];        		
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"GI_ZLYC_IM_GROUP_MEMBERS_VIEW",null,searchStr);
	        		return searchMgr;
			}
			if(type == "atmeId")
			{
				var tarr = 
	        		[
	        			{colName:"IM_TYPE",dispName:tarr.IM_TYPE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"ZLYC_IM_GROUPS|IM_TYPE"},
	        			{colName:"AUTHOR",dispName:tarr.AUTHOR,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"NICK_NAME",dispName:tarr.NICK_NAME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"SEX_CODE",dispName:tarr.SEX_CODE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"MIS_PERSON_BASIC_INFO|SEX_CODE"},
	        			{colName:"PHONE_NO",dispName:tarr.PHONE_NO,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"CARD_NUM",dispName:tarr.CARD_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null}
	        		];        		
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"GI_ZLYC_IM_AT_ME_VIEW",null,searchStr);
	        		return searchMgr;
			}
			if(type == "friendId")
			{
				var tarr = 
	        		[
//	        			{colName:"IM_ID",dispName:tarr.IM_ID,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"FRIEND_NAME",dispName:tarr.FRIEND_NAME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"IM_TYPE",dispName:tarr.IM_TYPE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"ZLYC_IM_GROUPS|IM_TYPE"},
	        			{colName:"FRIEND_SEX",dispName:tarr.FRIEND_SEX,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"MIS_PERSON_BASIC_INFO|SEX_CODE"},
	        			{colName:"FRIEND_AGE",dispName:tarr.FRIEND_AGE,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"FRIEND_PHONE_NO",dispName:tarr.FRIEND_PHONE_NO,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"CARD_NUM",dispName:tarr.CARD_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null}
	        		];
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"GI_ZLYC_IM_FRIENDS_VIEW",null,searchStr);
	        		return searchMgr;
			}
			if(type == "publicInfoId")
			{
				var tarr = 
	        		[
//	        			{colName:"IM_ID",dispName:tarr.IM_ID,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"IM_TYPE",dispName:tarr.IM_TYPE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"ZLYC_IM_GROUPS|IM_TYPE"},
	        			{colName:"ATTACHMENT",dispName:tarr.ATTACHMENT,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"ATTACHMENT_TYPE",dispName:tarr.ATTACHMENT_TYPE,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"PHONE_NO",dispName:tarr.PHONE_NO,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"E_MAIL",dispName:tarr.E_MAIL,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"CARD_NUM",dispName:tarr.CARD_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null}
	        		];
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"GI_ZLYC_IM_PUBLIC_INFO_VIEW",null,searchStr);
	        		return searchMgr;
			}
			if(type == "emailId")
			{
				var tarr = 
	        		[
//	        			{colName:"IM_ID",dispName:tarr.IM_ID,dataType:ABISCode.StorageDataType.STRING,codeName:null},
						//{colName:"IM_TYPE",dispName:tarr.IM_TYPE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"ZLYC_IM_GROUPS|IM_TYPE"},
	        			{colName:"EMAIL",dispName:tarr.EMAIL,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"EMAIL_NAME",dispName:tarr.EMAIL_NAME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"CREATE_TIME",dispName:tarr.CREATE_TIME,dataType:ABISCode.StorageDataType.DATETIME,codeName:null},
	        			{colName:"SEX_CODE",dispName:tarr.SEX_CODE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"MIS_PERSON_BASIC_INFO|SEX_CODE"},
	        			{colName:"CASE_NUM",dispName:tarr.CASE_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null}
	        		];
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"GI_ZLYC_EMAIL_ACCOUNTS_VIEW",null,searchStr);
	        		return searchMgr;
			}
			if(type == "emailcontacterId")
			{
				var tarr = 
	        		[
//	        			{colName:"GI_ID",dispName:tarr.GI_ID,dataType:ABISCode.StorageDataType.STRING,codeName:null},
						{colName:"IM_TYPE",dispName:tarr.IM_TYPE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"ZLYC_IM_GROUPS|IM_TYPE"},
	        			{colName:"EMAIL",dispName:tarr.EMAIL,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"CONTACTER_NAME",dispName:tarr.CONTACTER_NAME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"CONTACTER_PHONE_NO",dispName:tarr.CONTACTER_PHONE_NO,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"SEX_CODE",dispName:tarr.SEX_CODE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"MIS_PERSON_BASIC_INFO|SEX_CODE"},
	        			{colName:"CASE_NUM",dispName:tarr.CASE_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null}
	        		];
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"GI_ZLYC_EMAIL_CONTACTERS_VIEW",null,searchStr);
	        		return searchMgr;
			}
			if(type == "emailLogId")
			{
				var tarr = 
	        		[
//	        			{colName:"ID",dispName:tarr.IM_ID,dataType:ABISCode.StorageDataType.STRING,codeName:null},
						{colName:"IM_TYPE",dispName:tarr.IM_TYPE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"ZLYC_IM_GROUPS|IM_TYPE"},
	        			{colName:"TITLE",dispName:tarr.TITLE,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"RECEIVER",dispName:tarr.RECEIVER,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"ITEM_NUM",dispName:tarr.ITEM_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"ITEM_TYPE",dispName:tarr.ITEM_TYPE,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"CASE_NUM",dispName:tarr.CASE_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null}
	        		];
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"GI_ZLYC_MAILS_VIEW",null,searchStr);
	        		return searchMgr;
			}
			if(type == "historyId")
			{
				var tarr = 
	        		[
//	        			{colName:"ID",dispName:tarr.ID,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"TITLE",dispName:tarr.TITLE,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"ACCESS_TIME",dispName:tarr.ACCESS_TIME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"ACCESS_COUNT",dispName:tarr.ACCESS_COUNT,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"ITEM_NUM",dispName:tarr.ITEM_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"ITEM_TYPE",dispName:tarr.ITEM_TYPE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"GOODS_ITEMS|ITEM_TYPE"},
	        			{colName:"CASE_NUM",dispName:tarr.CASE_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null}
	        		];
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"GI_ZLYC_WEB_HISTORY_VIEW",null,searchStr);
	        		return searchMgr;
			}
			if(type == "bookMarksId")
			{
				var cols = ["ID","BROWSER_NAME","TITLE","ITEM_NUM","ITEM_TYPE","SEX_CODE","CASE_NUM"];
				var tarr = 
	        		[
//	        			{colName:"ID",dispName:tarr.ID,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"BROWSER_NAME",dispName:tarr.BROWSER_NAME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"TITLE",dispName:tarr.TITLE,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"ITEM_NUM",dispName:tarr.ITEM_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"ITEM_TYPE",dispName:tarr.ITEM_TYPE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"GOODS_ITEMS|ITEM_TYPE"},
	        			{colName:"SEX_CODE",dispName:tarr.SEX_CODE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"MIS_PERSON_BASIC_INFO|SEX_CODE"},
	        			{colName:"CASE_NUM",dispName:tarr.CASE_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null}
	        		];
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"GI_ZLYC_WEB_BOOKMARKS_VIEW",null,searchStr);
	        		return searchMgr;
			}
			if(type == "phonesId")
			{
				var cols = ["ID","ITEM_NUM","ITEM_TYPE","CREATE_TIME","CREATE_USER","SEX_CODE","CARD_NUM"];
				var tarr = 
	        		[
//	        			{colName:"ID",dispName:tarr.ID,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"ITEM_NUM",dispName:tarr.ITEM_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"ITEM_TYPE",dispName:tarr.ITEM_TYPE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"GOODS_ITEMS|ITEM_TYPE"},
	        			{colName:"CREATE_TIME",dispName:tarr.CREATE_TIME,dataType:ABISCode.StorageDataType.DATETIME,codeName:null},
	        			{colName:"CREATE_USER",dispName:tarr.CREATE_USER,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"SEX_CODE",dispName:tarr.SEX_CODE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"MIS_PERSON_BASIC_INFO|SEX_CODE"},
	        			{colName:"CARD_NUM",dispName:tarr.CARD_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null}
	        		];
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"GI_PHONES_VIEW",null,searchStr);
	        		return searchMgr;
			}
			if(type == "phoneContacterId")
			{
				var cols = ["ID","NAME","PHONE_NUM","PHONE_NUM_TYPE","NATION","SEX_CODE","CARD_NUM"];
				var tarr = 
	        		[
//	        			{colName:"ID",dispName:tarr.ID,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"NAME",dispName:tarr.NAME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"PHONE_NUM",dispName:tarr.PHONE_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"PHONE_NUM_TYPE",dispName:tarr.PHONE_NUM_TYPE,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"NATION",dispName:tarr.NATION,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"SEX_CODE",dispName:tarr.SEX_CODE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"MIS_PERSON_BASIC_INFO|SEX_CODE"},
	        			{colName:"CARD_NUM",dispName:tarr.CARD_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null}
	        		];
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"GI_ZLYC_PHONE_CONTACTER_VIEW",null,searchStr);
	        		return searchMgr;
			}
			if(type == "phoneMsgId")
			{
				var cols = ["ID","SENDER_PHONE_NUM","RECEIVER_PHONE_NUM","MSG","SENT_TIME","SMS_CENTER_NO","CASE_NUM"];
				var tarr = 
	        		[
//	        			{colName:"ID",dispName:tarr.ID,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"SENDER_PHONE_NUM",dispName:tarr.SENDER_PHONE_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"RECEIVER_PHONE_NUM",dispName:tarr.RECEIVER_PHONE_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"MSG",dispName:tarr.MSG,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"SENT_TIME",dispName:tarr.SENT_TIME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"SMS_CENTER_NO",dispName:tarr.SMS_CENTER_NO,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"CASE_NUM",dispName:tarr.CASE_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null}
	        		];
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"GI_ZLYC_PHONE_MSG_VIEW",null,searchStr);
	        		return searchMgr;
			}
			if(type == "phoneCallRecId")
			{
				var cols = ["ID","CALLER_PHONE_NUM","CALLED_PHONE_NUM","START_TIME","END_TIME","SEX_CODE","CASE_NUM"];
				var tarr = 
	        		[
//	        			{colName:"ID",dispName:tarr.ID,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"CALLER_PHONE_NUM",dispName:tarr.CALLER_PHONE_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"CALLED_PHONE_NUM",dispName:tarr.CALLED_PHONE_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"START_TIME",dispName:tarr.START_TIME,dataType:ABISCode.StorageDataType.DATETIME,codeName:null},
	        			{colName:"END_TIME",dispName:tarr.END_TIME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"SEX_CODE",dispName:tarr.SEX_CODE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"MIS_PERSON_BASIC_INFO|SEX_CODE"},
	        			{colName:"CASE_NUM",dispName:tarr.CASE_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null}
	        		];
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"GI_ZLYC_PHONE_CALL_REC_VIEW",null,searchStr);
	        		return searchMgr;
			}
			if(type == "simCardsId")
			{
				var cols = ["ID","PHONE_NUM","ITEM_NUM","ITEM_TYPE","NAME","SEX_CODE","CASE_NUM"];
				var tarr = 
	        		[
//	        			{colName:"ID",dispName:tarr.ID,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"PHONE_NUM",dispName:tarr.PHONE_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"ITEM_NUM",dispName:tarr.ITEM_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"ITEM_TYPE",dispName:tarr.ITEM_TYPE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"GOODS_ITEMS|ITEM_TYPE"},
	        			{colName:"NAME",dispName:tarr.NAME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"SEX_CODE",dispName:tarr.SEX_CODE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"MIS_PERSON_BASIC_INFO|SEX_CODE"},
	        			{colName:"CASE_NUM",dispName:tarr.CASE_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null}
	        		];
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"GI_SIM_CARDS_VIEW",null,searchStr);
	        		return searchMgr;
			}
			if(type == "wifiInfoId")
			{
				var tarr = 
	        		[
//	        			{colName:"ID",dispName:tarr.ID,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"WIFI_INFO",dispName:tarr.WIFI_INFO,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"ITEM_NUM",dispName:tarr.ITEM_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"ITEM_TYPE",dispName:tarr.ITEM_TYPE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"GOODS_ITEMS|ITEM_TYPE"},
	        			{colName:"NAME",dispName:tarr.NAME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"SEX_CODE",dispName:tarr.SEX_CODE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"MIS_PERSON_BASIC_INFO|SEX_CODE"},
	        			{colName:"CASE_NUM",dispName:tarr.CASE_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null}
	        		];
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"GI_ZLYC_WIFI_INFO_VIEW",null,searchStr);
	        		return searchMgr;
			}
			if(type == "aritcInfoId")
			{
				var tarr = 
	        		[
//	        			{colName:"ID",dispName:tarr.ID,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"ITEM_NUM",dispName:tarr.ITEM_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"ITEM_TYPE",dispName:tarr.ITEM_TYPE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"GOODS_ITEMS|ITEM_TYPE"},
	        			{colName:"SHENFEN_ID",dispName:tarr.SHENFEN_ID,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"NAME",dispName:tarr.NAME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"SEX_CODE",dispName:tarr.SEX_CODE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"MIS_PERSON_BASIC_INFO|SEX_CODE"},
	        			{colName:"CASE_NUM",dispName:tarr.CASE_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null}
	        		];
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"GI_PERSON_VIEW",null,searchStr);
	        		return searchMgr;
			}
			if(type == "root")
			{
				var tarr = 
	        		[
//	        			{colName:"ID",dispName:tarr.ID,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"ITEM_TYPE",dispName:tarr.ITEM_TYPE,dataType:ABISCode.StorageDataType.UNKNOWN,codeName:"GOODS_ITEMS|ITEM_TYPE"},
	        			{colName:"ITEM_NUM",dispName:tarr.ITEM_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"CE_NUM",dispName:tarr.CE_NUM,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"CE_NAME",dispName:tarr.CE_NAME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"PERSON_NAME",dispName:tarr.PERSON_NAME,dataType:ABISCode.StorageDataType.STRING,codeName:null},
	        			{colName:"PERSON_SHEN_FEN_ID",dispName:tarr.PERSON_SHEN_FEN_ID,dataType:ABISCode.StorageDataType.STRING,codeName:null}
	        		];
	        		var searchMgr = new WebSearchMgr(id,tarr,3,"GI_ZLYC_GI_ENROLL_INFO_VIEW",null,searchStr);
	        		return searchMgr;
			}
		}
}