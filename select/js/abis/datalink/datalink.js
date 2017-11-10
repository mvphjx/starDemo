
var tblMgr;
function DataLink(divId,data,pageNumStr,dataType,dataId)
{
	this.divId = divId;
	this.data = data;
	this.pageNumStr = pageNumStr;
	this.dataType = dataType;
	this.dataId = dataId;
	this.initTable();
}

DataLink.prototype.initTable = function()
{
	var url = WebVar.VarPath + "/dataLink/"+ this.dataType + "/" + this.dataId;
 	var nThis = this;
 	jQuery.ajax( 
		        {
					type : 'POST',
					contentType : 'application/json',
					url : url,
					data : null,
					dataType : 'json',
					success : function(data) 
					{   
						var tableDiv = "";
						var linkInfo = eval('('+ data +')');
						if(!WebUtil.isNull(linkInfo))
						{
							for(var i = 0;i < linkInfo.length;i++)
							{
								var type = linkInfo[i].type;
								var title = linkInfo[i].title;
								var info = linkInfo[i].info;
								var tableD = "";
								if(!WebUtil.isNull(info))
								{
									var header = info.headerText;
									if(!WebUtil.isNull(info.list))
									{
										for(var v = 0;v < info.list.length;v++)
										{
											var listdata = info.list[v];
											var ldata = "";
											if(type == ABISCode.LinkDataType.MIS_PERSON || type == ABISCode.LinkDataType.UNI_PERSON)
											{
												var td = "<td>"+title+"</td>";
													td += "<td>"+listdata.NAME+"</td>";
													td += "<td><a href=\"#\" onclick=\"toTPCard("+listdata.ID+");\">"+listdata.PERSON_NUM+"</a></td>";
													td += "<td>"+listdata.PERSON_TYPE+"</td>";
													td += "<td>"+listdata.SEX_CODE+"</td>";
													if(!WebUtil.isNull(listdata.SHENFEN_ID))
													{
														td += "<td>"+header.SHENFEN_ID + listdata.SHENFEN_ID+"</td>";
													}
												tableD = "<tr> " + td + " </tr>";
											}
//											if(type == ABISCode.LinkDataType.UNI_PERSON)
//											{
//												var td = "<td>"+title+"</td>";
//													td += "<td>"+listdata.NAME+"</td>";
//													td += "<td><a href=\"#\" onclick=\"toTPCard("+listdata.ID+");\">"+listdata.PERSON_NUM+"</a></td>";
//													td += "<td>"+listdata.PERSON_TYPE+"</td>";
//													td += "<td>"+listdata.SEX_CODE+"</td>";
//													if(!WebUtil.isNull(listdata.SHENFEN_ID))
//													{
//														td += "<td>"+header.SHENFEN_ID + listdata.SHENFEN_ID+"</td>";
//													}
//												tableD = "<tr> " + td + " </tr>";
//											}
											if(type == ABISCode.LinkDataType.LP_CASE)
											{
												var td = "<td>"+title+"</td>";
													td += "<td><a href=\"#\" onclick=\"toLPCase("+listdata.ID+");\">"+listdata.CE_NUM+"</a></td>";
													td += "<td>"+listdata.CE_TYPE+"</td>";
													if(!WebUtil.isNull(listdata.CE_STATUS))
													{
														td += "<td>"+header.CE_STATUS+listdata.CE_STATUS+"</td>";
													}
													if(!WebUtil.isNull(listdata.HAS_PERSON_KILLED))
													{
														td += "<td>"+listdata.HAS_PERSON_KILLED+ AbisMessageResource['HomicideCase']+"</td>";
													}
													if(!WebUtil.isNull(listdata.SUPERVISE_LEVEL))
													{
														td += "<td>"+header.SUPERVISE_LEVEL+listdata.SUPERVISE_LEVEL+"</td>";
													}
													if(!WebUtil.isNull(listdata.REGI_UNIT_CODE))
													{
														td += "<td>"+header.REGI_UNIT_CODE+listdata.REGI_UNIT_CODE+"</td>";
													}
													if(!WebUtil.isNull(listdata.REGI_UNIT_NAME))
													{
														td += "<td>"+header.REGI_UNIT_NAME+listdata.REGI_UNIT_NAME+"</td>";
													}
													if(!WebUtil.isNull(listdata.REGI_TIME))
													{
														td += "<td>"+header.REGI_TIME+listdata.REGI_TIME+"</td>";
													}
												tableD = "<tr> " + td + " </tr>";
											}
											if(type == ABISCode.LinkDataType.LP_CARD)
											{
												var td = "<td>"+title+"</td>";
													td += "<td>"+header.CARD_NUM+"</td>";
													td += "<td><a href=\"#\" onclick=\"toLPCard("+listdata.ID+");\">"+listdata.CARD_NUM+"</a></td>";
													if(!WebUtil.isNull(listdata.BTY))
													{	
														td += "<td>"+header.BTY+listdata.BTY+"</td>";
													}
													if(!WebUtil.isNull(listdata.CE_NUM))
													{
														td += "<td>"+header.CE_NUM+listdata.CE_NUM+"</td>";
													}
//													if(!WebUtil.isNull(listdata.HAS_TP_MATCH))
//													{
//														td += "<td>"+header.HAS_TP_MATCH+listdata.HAS_TP_MATCH+"</td>";
//													}
													if(!WebUtil.isNull(listdata.REGI_UNIT_CODE))
													{
														td += "<td>"+header.REGI_UNIT_CODE+listdata.REGI_UNIT_CODE+"</td>";
													}
													if(!WebUtil.isNull(listdata.REGI_UNIT_NAME))
													{
														td += "<td>"+header.REGI_UNIT_NAME+listdata.REGI_UNIT_NAME+"</td>";
													}
													if(!WebUtil.isNull(listdata.REGI_TIME))
													{
														td += "<td>"+header.REGI_TIME+listdata.REGI_TIME+"</td>";
													}
												tableD = "<tr> " + td + " </tr>";
											}
											if(type == ABISCode.LinkDataType.WANTED_PERSON)
											{
												var td = "<td>"+title+"</td>";
													td += "<td><a href=\"#\" onclick=\"toWanted("+listdata.ID+");\">"+listdata.WANTED_NO+"</a></td>";
													if(!WebUtil.isNull(listdata.WANTED_STATUS))
													{
														td += "<td>"+header.WANTED_STATUS+listdata.WANTED_STATUS+"</td>";
													}
													if(!WebUtil.isNull(listdata.WANTED_TYPE))
													{
														td += "<td>"+header.WANTED_TYPE+listdata.WANTED_TYPE+"</td>";
													}
													if(!WebUtil.isNull(listdata.WANTED_BY))
													{
														td += "<td>"+header.WANTED_BY+listdata.WANTED_BY+"</td>";
													}
													if(!WebUtil.isNull(listdata.WANTED_LEVEL))
													{
														td += "<td>"+header.WANTED_LEVEL+listdata.WANTED_LEVEL+"</td>";
													}
													if(!WebUtil.isNull(listdata.ARREST_LEVEL))
													{
														td += "<td>"+header.ARREST_LEVEL+listdata.ARREST_LEVEL+"</td>";
													}
												tableD = "<tr> " + td + " </tr>";
											}
											if(type == ABISCode.LinkDataType.CAPTURED_PERSON)
											{
												var td = "<td>"+title+"</td>";
													td += "<td><a href=\"#\" onclick=\"toCaptured("+listdata.ID+");\">"+listdata.GAB_ZT_CARD_NO+"</a></td>";
													if(!WebUtil.isNull(listdata.STATUS))
													{
														td += "<td>"+header.STATUS+listdata.STATUS+"</td>";
													}
													if(!WebUtil.isNull(listdata.CAPTURE_METHOD))
													{
														td += "<td>"+header.CAPTURE_METHOD+listdata.CAPTURE_METHOD+"</td>";
													}
//													if(!WebUtil.isNull(listdata.CAPTURE_UNIT_CODE))
//													{
//														td += "<td>"+header.CAPTURE_UNIT_CODE+listdata.CAPTURE_UNIT_CODE+"</td>";
//													}
													if(!WebUtil.isNull(listdata.REQ_UNIT_NAME))
													{
														td += "<td>"+header.REQ_UNIT_NAME+listdata.REQ_UNIT_NAME+"</td>";
													}
//													if(!WebUtil.isNull(listdata.REQ_APPROVED_BY))
//													{
//														td += "<td>"+header.REQ_APPROVED_BY+listdata.REQ_APPROVED_BY+"</td>";
//													}
													if(!WebUtil.isNull(listdata.CAPTURE_DATE))
													{
														td += "<td>"+header.CAPTURE_DATE+listdata.CAPTURE_DATE+"</td>";
													}
												tableD = "<tr> " + td + " </tr>";
											}
											if(type == ABISCode.LinkDataType.LTL_HITLOG)
											{
												var td = "<td>"+title+"</td>";
													td += "<td><a href=\"#\" onclick=\"toTPCard("+listdata.TP_CARD_ID+");\">"+listdata.TP_CARD_NUM+"</a></td>";
													if(!WebUtil.isNull(listdata.STATUS))
													{
														td += "<td>"+header.STATUS+listdata.STATUS+"</td>";
													}
//														td += "<td>"+header.QRY_TYPE+"</td>";
//														td += "<td>"+listdata.QRY_TYPE+"</td>";
													if(!WebUtil.isNull(listdata.TP_NAME))
													{
														td += "<td>"+header.TP_NAME+listdata.TP_NAME+"</td>";
													}
													if(!WebUtil.isNull(listdata.LP_CARD_NUM))
													{
														td += "<td>"+header.LP_CARD_NUM+"</td>";
														td += "<td><a href=\"#\" onclick=\"toLPCard("+listdata.LP_CARD_ID+");\">"+listdata.LP_CARD_NUM+"</a></td>";
//															td += "<td>"+header.LP_CARD_NUM+listdata.LP_CARD_NUM+"</td>";
													}
//														if(!WebUtil.isNull(listdata.LP_CASE_NUM))
//														{
//															td += "<td>"+header.LP_CASE_NUM+listdata.LP_CASE_NUM+"</td>";
//														}
													if(!WebUtil.isNull(listdata.LP_CASE_CLASS_CODE_1))
													{
														td += "<td>"+header.LP_CASE_CLASS_CODE_1+listdata.LP_CASE_CLASS_CODE_1+"</td>";
													}
												tableD = "<tr> " + td + " </tr>";
											}
											if(type == ABISCode.LinkDataType.TT_HITLOG)
											{
												var td = "<td>"+title+"</td>";
													td += "<td>"+header.SRC_CARD_NUM+"</td>";
													td += "<td><a href=\"#\" onclick=\"toTPCard("+listdata.SRC_CARD_ID+");\">"+listdata.SRC_CARD_NUM+"</a></td>";
													if(!WebUtil.isNull(listdata.STATUS))
													{
														td += "<td>"+header.STATUS+listdata.STATUS+"</td>";
													}
													if(!WebUtil.isNull(listdata.DEST_CARD_NUM))
													{
														td += "<td>"+header.DEST_CARD_NUM+"</td>";
														td += "<td><a href=\"#\" onclick=\"toTPCard("+listdata.DEST_CARD_ID+");\">"+listdata.DEST_CARD_NUM+"</a></td>";
													}
//													td += "<td>"+header.QRY_TYPE+"</td>";
//													td += "<td>"+listdata.QRY_TYPE+"</td>";
//													if(!WebUtil.isNull(listdata.IS_DIRECT_CAPTURED))
//													{
//														td += "<td>"+header.IS_DIRECT_CAPTURED+listdata.IS_DIRECT_CAPTURED+"</td>";
//													}
//													if(!WebUtil.isNull(listdata.IS_WANTED_HIT))
//													{
//														td += "<td>"+header.IS_WANTED_HIT+listdata.IS_WANTED_HIT+"</td>";
//													}
													if(!WebUtil.isNull(listdata.SRC_PERSON_SEX_CODE))
													{
														td += "<td>"+header.SRC_PERSON_SEX_CODE+listdata.SRC_PERSON_SEX_CODE+"</td>";
													}
//													if(!WebUtil.isNull(listdata.SRC_PERSON_NAME))
//													{
//														td += "<td>"+header.SRC_PERSON_NAME+listdata.SRC_PERSON_NAME+"</td>";
//													}
													if(!WebUtil.isNull(listdata.BTY_MASK))
													{
														td += "<td>"+header.BTY_MASK+listdata.BTY_MASK+"</td>";
													}
												tableD = "<tr> " + td + " </tr>";
											}
											if(type == ABISCode.LinkDataType.LL_HITLOG)
											{
												var td = "<td>"+title+"</td>";
													td += "<td>"+header.SRC_CARD_NUM+"</td>";
													td += "<td><a href=\"#\" onclick=\"toLPCard("+listdata.SRC_CARD_ID+");\">"+listdata.SRC_CARD_NUM+"</a></td>";
													if(!WebUtil.isNull(listdata.STATUS))
													{
														td += "<td>"+header.STATUS+listdata.STATUS+"</td>";
													}
													if(!WebUtil.isNull(listdata.DEST_CARD_NUM))
													{
														td += "<td>"+header.DEST_CARD_NUM+"</td>";
														td += "<td><a href=\"#\" onclick=\"toLPCard("+listdata.DEST_CARD_ID+");\">"+listdata.DEST_CARD_NUM+"</a></td>";
													}
//													td += "<td>"+header.QRY_TYPE+"</td>";
//													td += "<td>"+listdata.QRY_TYPE+"</td>";
//													if(!WebUtil.isNull(listdata.SRC_CASE_NUM))
//													{
//														td += "<td>"+header.SRC_CASE_NUM+listdata.SRC_CASE_NUM+"</td>";
//													}
													if(!WebUtil.isNull(listdata.BTY_MASK))
													{
														td += "<td>"+header.BTY_MASK+listdata.BTY_MASK+"</td>";
													}
													if(!WebUtil.isNull(listdata.SRC_CASE_SUPERVISE_LEVEL))
													{
														td += "<td>"+header.SRC_CASE_SUPERVISE_LEVEL+listdata.SRC_CASE_SUPERVISE_LEVEL+"</td>";
													}
//													if(!WebUtil.isNull(listdata.SRC_CASE_CLASS_CODE_1))
//													{
//														td += "<td>"+header.SRC_CASE_CLASS_CODE_1+listdata.SRC_CASE_CLASS_CODE_1+"</td>";
//													}
												tableD = "<tr> " + td + " </tr>";
											}
											if(type == ABISCode.LinkDataType.GOODS_ITEM)
											{
												var td = "<td>"+title+"</td>";
													td += "<td>"+header.ITEM_NUM+listdata.ITEM_NUM+"</td>";
													if(!WebUtil.isNull(listdata.ITEM_TYPE))
													{
														td += "<td>"+header.ITEM_TYPE+listdata.ITEM_TYPE+"</td>";
													}
													if(!WebUtil.isNull(listdata.ITEM_NAME))
													{
														td += "<td>"+header.ITEM_NAME+listdata.ITEM_NAME+"</td>";
													}
													if(!WebUtil.isNull(listdata.ITEM_COUNT))
													{
														td += "<td>"+header.ITEM_COUNT+listdata.ITEM_COUNT+"</td>";
													}
													if(!WebUtil.isNull(listdata.ITEM_FEATURE))
													{
														td += "<td>"+header.ITEM_FEATURE+listdata.ITEM_FEATURE+"</td>";
													}
												tableD = "<tr> " + td + " </tr>";
											}
										}
									}
								}
								tableDiv += "<div  style=\"margin-top: 5px;background-color:#edf4fa;border:0px solid #272d33;margin-bottom: 10px;\"><table style=\"margin-left: 20px;height: 35px;\">"+tableD+"</table></div>";
							}
							$("#" + nThis.divId).html(tableDiv);
						}
					},   
					error : function(e) 
					{   
						alert(AbisMessageResource.Alert['SearchError']);
					}   
				});
	
}

function toTPCard(id)
{
	if(!WebUtil.isNull(id))
	{
		window.open(WebVar.VarPath+"/tp/detail/"+id,"_blank");
	}
}

function toLPCase(id)
{
	if(!WebUtil.isNull(id))
	{
		window.open(WebVar.VarPath+"/lp/case/"+id,"_blank");
	}
}

function toLPCard(id)
{
	if(!WebUtil.isNull(id))
	{
		window.open(WebVar.VarPath+"/lp/detail/"+id,"_blank");
	}
}

function toTTHitlog(id)
{
	if(!WebUtil.isNull(id))
	{
		window.open(WebVar.VarPath+"/hitlog/ttlist/"+id,"_blank");
	}
}

function toLLHitlog(id)
{
	if(!WebUtil.isNull(id))
	{
		window.open(WebVar.VarPath+"/hitlog/lllist/"+id,"_blank");
	}
}

function toLTLHitlog(id)
{
	if(!WebUtil.isNull(id))
	{
		window.open(WebVar.VarPath+"/hitlog/detail/"+id,"_blank");
	}
}

function toWanted(id)
{
	if(!WebUtil.isNull(id))
	{
		window.open(WebVar.VarPath+"/tp/wanteddetail/"+id,"_blank");
	}
	
}

function toCaptured(id)
{
	if(!WebUtil.isNull(id))
	{
		window.open(WebVar.VarPath+"/tp/captureddetail/"+id,"_blank");
	}
}

