/*
 * 定义hitlog模块界面的列配置
 * 格式如下
 * {'id':'*_And_*','dataType':'1','validate':{'maxlength':100},'title':'','editable':false}	
 *'dataType': ABISCode.InputType
 *	id描述 ejb接口的json格式
 */

//正查倒查比中字段
var ltl = {
		//main
	log0:{'id':'mainInfo_And_id','dataType':'1','title':''},
	log1:{'id':'mainInfo_And_hitlogNum','dataType':'1','title':'比中号码'},
	log2:{'id':'mainInfo_And_status','dataType':'0','columnName':'LTL_HITLOG_MAIN|STATUS','title':'状态'},
	log3:{'id':'mainInfo_And_hitlogUUID','dataType':'1','title':''},
	log4:{'id':'mainInfo_And_qryId','dataType':'1','title':''},
	log5:{'id':'mainInfo_And_qryStatus','dataType':'0','columnName':'LTL_HITLOG_MAIN|RIDGE_PATTERN','title':''},
	log6:{'id':'mainInfo_And_qryType','dataType':'0','columnName':'LTL_HITLOG_MAIN|QRY_TYPE','title':'比对任务类型'},
	log7:{'id':'mainInfo_And_createUser','dataType':'1','validate':{'maxlength':16},'title':''},
	log8:{'id':'mainInfo_And_createUnitCode','dataType':'0','columnName':'LTL_HITLOG_MAIN|CREATE_UNIT_CODE','title':'','showText':'false'},
	log9:{'id':'mainInfo_And_updateUser','dataType':'1','validate':{'maxlength':16},'title':''},
	log10:{'id':'mainInfo_And_updateUnitCode','dataType':'0','columnName':'LTL_HITLOG_MAIN|CREATE_UNIT_CODE','title':'','showText':'false'},
	log11:{'id':'mainInfo_And_createTime','dataType':'7','title':''},
	log12:{'id':'mainInfo_And_updateTime','dataType':'7','title':''},
	log16:{'id':'mainInfo_And_enrollUnitCode','dataType':'0','columnName':'LTL_HITLOG_MAIN|ENROLL_UNIT_CODE','title':'','showText':false,'all':false,'editable':false},
	log17:{'id':'mainInfo_And_enrollTime','dataType':'7','title':'录入时间','editable':false},
	log26:{'id':'mainInfo_And_tpCardId','dataType':'1','validate':{'isdigital':true,'maxlength':15},'title':''},
	log27:{'id':'mainInfo_And_tpCardNum','dataType':'1','validate':{'maxlength':32},'title':'','editable':false},
	log33:{'id':'mainInfo_And_lpCardId','dataType':'1','validate':{'isdigital':true,'maxlength':15},'title':''},
	log34:{'id':'mainInfo_And_lpCardNum','dataType':'1','validate':{'maxlength':32},'title':''},
	log35:{'id':'mainInfo_And_lpCaseId','dataType':'1','validate':{'isdigital':true,'maxlength':15},'title':''},
	log36:{'id':'mainInfo_And_lpCaseNum','dataType':'1','validate':{'maxlength':23,'minlength':22},'title':'','editable':false},
	log43:{'id':'mainInfo_And_checkerId','dataType':'1','validate':{'maxlength':16},'title':''},
	log44:{'id':'mainInfo_And_checkTime','dataType':'7','title':''},
	log45:{'id':'mainInfo_And_checkerUnitCode','dataType':'0','all':false,'columnName':'LTL_HITLOG_MAIN|CHECKER_UNIT_CODE','relatid':'mainInfo_And_ltlHitlogInfo_And_CheckerUnitName','title':'','showText':false},
	//ltlHitlogInfo
	log13:{'id':'mainInfo_And_ltlHitlogInfo_And_Rank','dataType':'1','validate':{'isdigital':true,'maxlength':8},'title':''},
	log14:{'id':'mainInfo_And_ltlHitlogInfo_And_Score','dataType':'1','validate':{'isdigital':true,'maxlength':8},'title':''},
	log15:{'id':'mainInfo_And_ltlHitlogInfo_And_EnrollUser','dataType':'1','editable':false,'validate':{'maxlength':30},'title':'录入人'},
	log18:{'id':'mainInfo_And_ltlHitlogInfo_And_IsDirectCaptured','dataType':'0','columnName':'LTL_HITLOG_MAIN|IS_DIRECT_CAPTURED','title':'是否直接抓获'},
	log19:{'id':'mainInfo_And_ltlHitlogInfo_And_IsWantedHit','dataType':'0','columnName':'LTL_HITLOG_MAIN|IS_WANTED_HIT','title':''},
	log20:{'id':'mainInfo_And_ltlHitlogInfo_And_Comments','dataType':'3','validate':{'maxlength':100},'title':''},
	log21:{'id':'mainInfo_And_ltlHitlogInfo_And_ApprovedBy','dataType':'1','validate':{'maxlength':40},'title':''},
	log22:{'id':'mainInfo_And_ltlHitlogInfo_And_ApprovedUserId','dataType':'1','validate':{'maxlength':16},'title':''},
	log23:{'id':'mainInfo_And_ltlHitlogInfo_And_ApprovedDate','dataType':'2','title':''},
	log24:{'id':'mainInfo_And_ltlHitlogInfo_And_ApproveUnitCode','dataType':'0','columnName':'LTL_HITLOG_MAIN|APPROVE_UNIT_CODE','relatid':'mainInfo_And_ltlHitlogInfo_And_ApproveUnitName','all':false,'title':''},
	log25:{'id':'mainInfo_And_ltlHitlogInfo_And_ApproveUnitName','dataType':'5','validate':{'maxlength':100},'title':''},
	log28:{'id':'mainInfo_And_ltlHitlogInfo_And_TpName','dataType':'1','validate':{'maxlength':60},'title':'','editable':false},
	log29:{'id':'mainInfo_And_ltlHitlogInfo_And_TpPersonBirthDate','dataType':'2','title':'','editable':false},
	log30:{'id':'mainInfo_And_ltlHitlogInfo_And_TpPersonCertId','dataType':'1','validate':{'maxlength':20},'title':'','editable':false},
	log31:{'id':'mainInfo_And_ltlHitlogInfo_And_TpPersonCertType','dataType':'0','columnName':'LTL_HITLOG_MAIN|INI_ENROLL_TYPE','title':''},
	log32:{'id':'mainInfo_And_ltlHitlogInfo_And_TpPersonSexCode','dataType':'0','columnName':'LTL_HITLOG_MAIN|TP_PERSON_SEX_CODE','title':'','editable':false},
	log37:{'id':'mainInfo_And_ltlHitlogInfo_And_LpCaseClassCode1','dataType':'0','columnName':'LTL_HITLOG_MAIN|LP_CASE_CLASS_CODE_1','title':'','editable':false},
	log38:{'id':'mainInfo_And_ltlHitlogInfo_And_LpCaseClassCode2','dataType':'0','columnName':'LTL_HITLOG_MAIN|LP_CASE_CLASS_CODE_1','title':'','editable':false},
	log39:{'id':'mainInfo_And_ltlHitlogInfo_And_LpCaseClassCode3','dataType':'0','columnName':'LTL_HITLOG_MAIN|LP_CASE_CLASS_CODE_1','title':'','editable':false},
	log40:{'id':'mainInfo_And_ltlHitlogInfo_And_LpCaseOccurDate','dataType':'2','title':'','editable':false},
	log41:{'id':'mainInfo_And_ltlHitlogInfo_And_LpSuperviseLevel','dataType':'0','columnName':'LTL_HITLOG_MAIN|LP_SUPERVISE_LEVEL','title':'','editable':false},
	log42:{'id':'mainInfo_And_ltlHitlogInfo_And_Checker','dataType':'1','validate':{'maxlength':40},'title':''},
	log46:{'id':'mainInfo_And_ltlHitlogInfo_And_CheckerUnitName','dataType':'5','validate':{'maxlength':100},'title':''},
	log47:{'id':'mainInfo_And_ltlHitlogInfo_And_BtyFlag','dataType':'0','columnName':'LTL_HITLOG_MAIN|BTY_MASK','title':''},
	log48:{'id':'mainInfo_And_ltlHitlogInfo_And_Fgp','dataType':'1','columnName':'LTL_HITLOG_MAIN|INI_ENROLL_TYPE','title':''},
	log49:{'id':'mainInfo_And_ltlHitlogInfo_And_Vid','dataType':'1','columnName':'LTL_HITLOG_MAIN|INI_ENROLL_TYPE','title':''},
	log50:{'id':'mainInfo_And_ltlHitlogInfo_And_Cid','dataType':'1','columnName':'LTL_HITLOG_MAIN|INI_ENROLL_TYPE','title':''},
	log51:{'id':'mainInfo_And_ltlHitlogInfo_And_Gid','dataType':'1','columnName':'LTL_HITLOG_MAIN|INI_ENROLL_TYPE','title':''},
	log52:{'id':'mainInfo_And_ltlHitlogInfo_And_RidgePattern','dataType':'0','columnName':'LTL_HITLOG_MAIN|RIDGE_PATTERN','title':''},
	log53:{'id':'mainInfo_And_ltlHitlogInfo_And_wantedUnitCode','dataType':'0','columnName':'LTL_HITLOG_MAIN|INI_ENROLL_TYPE','relatid':'mainInfo_And_ltlHitlogInfo_And_wantedUnitName','title':''},
	log54:{'id':'mainInfo_And_ltlHitlogInfo_And_wantedUnitName','dataType':'5','validate':{'maxlength':100},'title':''},		
	log55:{'id':'mainInfo_And_ltlHitlogInfo_And_WantedDate','dataType':'2','title':''},
	//main
	log56:{'id':'mainInfo_And_tpPersonNum','dataType':'1','validate':{'maxlength':32},'title':'','editable':false},
	log57:{'id':'mainInfo_And_lpCardSeqNo','dataType':'1','validate':{'maxlength':3},'title':'','editable':false},
    log58:{'id':'mainInfo_And_lpAbisCeNum','dataType':'1','validate':{'maxlength':23,'minlength':22},'title':'','editable':false},


	//ltlHitlogQryInfo
	qry1:{'id':'mainInfo_And_ltlHitlogQryInfo_And_MatchPriority','dataType':'0','columnName':'LTL_HITLOG_QRY_INFO|MATCH_PRIORITY','title':''},
	qry2:{'id':'mainInfo_And_ltlHitlogQryInfo_And_VerifyResult','dataType':'0','columnName':'LTL_HITLOG_QRY_INFO|VERIFY_RESULT','title':''},
	qry3:{'id':'mainInfo_And_ltlHitlogQryInfo_And_SubmitUser','dataType':'1','validate':{'maxlength':16},'title':''},
	qry4:{'id':'mainInfo_And_ltlHitlogQryInfo_And_SubmitUnitCode','dataType':'0','showText':'false','columnName':'LTL_HITLOG_QRY_INFO|SUBMIT_UNIT_CODE','relatid':'mainInfo_And_ltlHitlogQryInfo_And_SubmitUnitName','title':''},
	qry5:{'id':'mainInfo_And_ltlHitlogQryInfo_And_SubmitTime','dataType':'7','title':''},
	qry6:{'id':'mainInfo_And_ltlHitlogQryInfo_And_SubmitUnitName','dataType':'5','validate':{'maxlength':100},'title':''},
	qry7:{'id':'mainInfo_And_ltlHitlogQryInfo_And_MatchUnitCode','dataType':'0','columnName':'LTL_HITLOG_QRY_INFO|MATCH_UNIT_CODE','relatid':'mainInfo_And_ltlHitlogQryInfo_And_MatchUnitName','title':''},
	qry8:{'id':'mainInfo_And_ltlHitlogQryInfo_And_MatchUnitName','dataType':'5','validate':{'maxlength':100},'title':''},
	qry9:{'id':'mainInfo_And_ltlHitlogQryInfo_And_MatchFinTime','dataType':'7','title':''},
	qry10:{'id':'mainInfo_And_ltlHitlogQryInfo_And_MatchSysName','dataType':'1','validate':{'maxlength':20},'title':''},
	qry11:{'id':'mainInfo_And_ltlHitlogQryInfo_And_Rechecker','dataType':'1','validate':{'maxlength':40},'title':''},
	qry12:{'id':'mainInfo_And_ltlHitlogQryInfo_And_RecheckerId','dataType':'1','validate':{'maxlength':16},'title':''},
	qry13:{'id':'mainInfo_And_ltlHitlogQryInfo_And_RecheckTime','dataType':'7','title':''},
	qry14:{'id':'mainInfo_And_ltlHitlogQryInfo_And_RecheckerUnitCode','dataType':'0','all':false,'showText':'false','columnName':'LTL_HITLOG_QRY_INFO|RECHECKER_UNIT_CODE','relatid':'mainInfo_And_ltlHitlogQryInfo_And_RecheckerUnitName','title':''},
	qry15:{'id':'mainInfo_And_ltlHitlogQryInfo_And_RecheckerUnitName','dataType':'5','validate':{'maxlength':100},'title':''},
	qry16:{'id':'mainInfo_And_ltlHitlogQryInfo_And_QryId','dataType':'1','validate':{'isdigital':true,'maxlength':15},'title':''},
	qry17:{'id':'mainInfo_And_ltlHitlogQryInfo_And_QryTaskUuid','dataType':'1','validate':{'maxlength':32},'title':''},
	qry18:{'id':'mainInfo_And_ltlHitlogQryInfo_And_RecSearched','dataType':'1','validate':{'isdigital':true,'maxlength':15},'title':''},
	//ltlHitlogTpInfo
	tp1:{'id':'mainInfo_And_ltlHitlogTpInfo_And_Nation','dataType':'0','columnName':'LTL_HITLOG_TP_INFO|NATION','title':''},
	tp2:{'id':'mainInfo_And_ltlHitlogTpInfo_And_PrinterName','dataType':'1','validate':{'maxlength':30},'title':'','editable':false},
	tp3:{'id':'mainInfo_And_ltlHitlogTpInfo_And_PrinterUnitCode','dataType':'0','columnName':'LTL_HITLOG_TP_INFO|PRINTER_UNIT_CODE','relatid':'mainInfo_And_ltlHitlogTpInfo_And_PrinterUnitName','title':''},
	tp4:{'id':'mainInfo_And_ltlHitlogTpInfo_And_PrintDate','dataType':'2','title':'','editable':false},
	tp5:{'id':'mainInfo_And_ltlHitlogTpInfo_And_PrinterUnitName','dataType':'5','validate':{'maxlength':100},'title':''},
	tp6:{'id':'mainInfo_And_ltlHitlogTpInfo_And_MinZu','dataType':'0','columnName':'LTL_HITLOG_TP_INFO|MIN_ZU','title':''},
	tp7:{'id':'mainInfo_And_ltlHitlogTpInfo_And_CertificateType','dataType':'0','columnName':'LTL_HITLOG_TP_INFO|CERTIFICATE_TYPE','title':''},	
	tp8:{'id':'mainInfo_And_ltlHitlogTpInfo_And_CertificateNum','dataType':'1','validate':{'maxlength':40},'title':''},
	tp9:{'id':'mainInfo_And_ltlHitlogTpInfo_And_HukouPlaceCode','showText':'false','dataType':'0','columnName':'LTL_HITLOG_TP_INFO|HUKOU_PLACE_CODE','relatid':'mainInfo_And_ltlHitlogTpInfo_And_HukouPlace','title':''},
	tp10:{'id':'mainInfo_And_ltlHitlogTpInfo_And_HukouPlace','dataType':'6','validate':{'maxlength':100},'title':''},
	tp11:{'id':'mainInfo_And_ltlHitlogTpInfo_And_AddressCode','showText':'false','dataType':'0','columnName':'LTL_HITLOG_TP_INFO|ADDRESS_CODE','relatid':'mainInfo_And_ltlHitlogTpInfo_And_Address','title':''},
	tp12:{'id':'mainInfo_And_ltlHitlogTpInfo_And_Address','dataType':'6','validate':{'maxlength':100},'title':''},
	tp13:{'id':'mainInfo_And_ltlHitlogTpInfo_And_CaseClassCode1','dataType':'0','columnName':'LTL_HITLOG_TP_INFO|CASE_CLASS_CODE_1','title':''},
	tp14:{'id':'mainInfo_And_ltlHitlogTpInfo_And_CaseClassCode2','dataType':'0','columnName':'LTL_HITLOG_TP_INFO|CASE_CLASS_CODE_1','title':''},
	tp15:{'id':'mainInfo_And_ltlHitlogTpInfo_And_CaseClassCode3','dataType':'0','columnName':'LTL_HITLOG_TP_INFO|CASE_CLASS_CODE_1','title':''},
	tp16:{'id':'mainInfo_And_ltlHitlogTpInfo_And_IsCriminal','dataType':'0','columnName':'LTL_HITLOG_TP_INFO|IS_CRIMINAL','title':''},
	tp17:{'id':'mainInfo_And_ltlHitlogTpInfo_And_PersonClassCode','dataType':'0','columnName':'LTL_HITLOG_TP_INFO|PERSON_CLASS_CODE','title':''},
	//ltlHitlogLpInfo
	lp1:{'id':'mainInfo_And_ltlHitlogLpInfo_And_CaseOccurPlaceCode','showText':'false','dataType':'0','columnName':'LTL_HITLOG_LP_INFO|CASE_OCCUR_PLACE_CODE','relatid':'mainInfo_And_ltlHitlogLpInfo_And_CaseOccurPlace','title':''},
	lp2:{'id':'mainInfo_And_ltlHitlogLpInfo_And_CaseOccurPlace','dataType':'6','validate':{'maxlength':70},'title':''},
	lp3:{'id':'mainInfo_And_ltlHitlogLpInfo_And_Comments','dataType':'3','columnName':'LTL_HITLOG_LP_INFO|INI_ENROLL_TYPE','title':''},
	lp4:{'id':'mainInfo_And_ltlHitlogLpInfo_And_HasPersonKilled','dataType':'0','columnName':'LTL_HITLOG_LP_INFO|HAS_PERSON_KILLED','title':''},
	lp5:{'id':'mainInfo_And_ltlHitlogLpInfo_And_PersonKilledCnt','dataType':'1','validate':{'maxlength':2,isdigital:true},'title':''},
	lp6:{'id':'mainInfo_And_ltlHitlogLpInfo_And_ExtractorUnitCode','showText':'false','dataType':'0','columnName':'LTL_HITLOG_LP_INFO|EXTRACTOR_UNIT_CODE','relatid':'mainInfo_And_ltlHitlogLpInfo_And_ExtractorUnitName','title':''},
	lp7:{'id':'mainInfo_And_ltlHitlogLpInfo_And_ExtractorUnitName','dataType':'5','validate':{'maxlength':70},'title':''},
	lp8:{'id':'mainInfo_And_ltlHitlogLpInfo_And_CaseLoss','dataType':'1','validate':{'maxlength':20,isdigital:true},'title':''},
	lp9:{'id':'mainInfo_And_ltlHitlogLpInfo_And_ExtractDate','dataType':'2','title':''},
	lp10:{'id':'mainInfo_And_ltlHitlogLpInfo_And_Extractor1','dataType':'1','validate':{'maxlength':40},'title':''},
	lp11:{'id':'mainInfo_And_ltlHitlogLpInfo_And_Extractor2','dataType':'1','validate':{'maxlength':40},'title':''},	
	lp12:{'id':'mainInfo_And_ltlHitlogLpInfo_And_Extractor3','dataType':'1','validate':{'maxlength':40},'title':''},
	lp13:{'id':'mainInfo_And_ltlHitlogLpInfo_And_CaseDesc','dataType':'3','title':''},
	lp14:{'id':'mainInfo_And_ltlHitlogLpInfo_And_RegisterUser','dataType':'1','validate':{'maxlength':40},'title':''},
	lp15:{'id':'mainInfo_And_ltlHitlogLpInfo_And_RegisterUnitCode','showText':'false','dataType':'0','columnName':'LTL_HITLOG_LP_INFO|REGISTER_UNIT_CODE','relatid':'mainInfo_And_ltlHitlogLpInfo_And_RegisterUnitName','title':''},
	lp16:{'id':'mainInfo_And_ltlHitlogLpInfo_And_RegisterUnitName','dataType':'5','validate':{'maxlength':70},'title':''},
	lp17:{'id':'mainInfo_And_ltlHitlogLpInfo_And_RegisterDate','dataType':'2','title':''},
	lp18:{'id':'mainInfo_And_ltlHitlogLpInfo_And_Premium','dataType':'1','validate':{'maxlength':20},'title':''},
	lp19:{'id':'mainInfo_And_ltlHitlogLpInfo_And_cardSeq','dataType':'1','validate':{'maxlength':3,isdigital:true},'title':''}	
}
//'columnName':'|',  ,'editable':false
var ll = {
	t1:{'id':'mainInfo_And_id','dataType':'1','validate':{'maxlength':15},'title':''},
	t2:{'id':'mainInfo_And_status','dataType':'0','columnName':'LL_HITLOG_MAIN|STATUS','title':''},
	t3:{'id':'mainInfo_And_hitlogUUID','dataType':'1','validate':{'maxlength':32},'title':''},
	t4:{'id':'mainInfo_And_hitlogNum','dataType':'1','validate':{'maxlength':32},'title':'','editable':false},
	t5:{'id':'mainInfo_And_qryId','dataType':'1','validate':{'maxlength':15},'title':''},
	t6:{'id':'mainInfo_And_qryStatus','dataType':'0','title':''},
	t7:{'id':'mainInfo_And_qryType','dataType':'0','validate':{'maxlength':15},'columnName':'LL_HITLOG_MAIN|QRY_TYPE','title':'','editable':false},	
	ll1:{'id':'mainInfo_And_createUser','dataType':'1','validate':{'maxlength':16},'title':''},
	ll2:{'id':'mainInfo_And_createUnitCode','columnName':'LL_HITLOG_MAIN|CREATE_UNIT_CODE','showText':'false','dataType':'1','validate':{'maxlength':16},'title':''},
	ll3:{'id':'mainInfo_And_updateUser','dataType':'1','validate':{'maxlength':16},'title':''},
	ll4:{'id':'mainInfo_And_updateUnitCode','columnName':'LL_HITLOG_MAIN|CREATE_UNIT_CODE','showText':'false','dataType':'0','validate':{'maxlength':16},'title':''},
	ll5:{'id':'mainInfo_And_createTime','dataType':'7','title':''},
	ll6:{'id':'mainInfo_And_updateTime','dataType':'7','title':''},
	ll10:{'id':'mainInfo_And_enrollUnitCode','dataType':'0','columnName':'LL_HITLOG_MAIN|ENROLL_UNIT_CODE',all:false,'showText':false,'validate':{'maxlength':16},'title':'','editable':false},
	ll11:{'id':'mainInfo_And_enrollTime','dataType':'7','title':'','editable':false},
	ll13:{'id':'mainInfo_And_srcCaseId','dataType':'1','validate':{'maxlength':15,isdigital:true},'title':''},
	ll14:{'id':'mainInfo_And_srcCaseNum','dataType':'1','validate':{'maxlength':32},'title':'','editable':false},
	ll15:{'id':'mainInfo_And_srcCardId','dataType':'1','validate':{'maxlength':15,isdigital:true},'title':''},
	ll16:{'id':'mainInfo_And_srcCardNum','dataType':'1','validate':{'maxlength':32},'title':''},
	ll22:{'id':'mainInfo_And_destCaseId','dataType':'1','validate':{'maxlength':15,isdigital:true},'title':''},
	ll23:{'id':'mainInfo_And_destCaseNum','dataType':'1','validate':{'maxlength':32},'title':'','editable':false},
	ll24:{'id':'mainInfo_And_destCardId','dataType':'1','validate':{'maxlength':15,isdigital:true},'title':''},
	ll25:{'id':'mainInfo_And_destCardNum','dataType':'1','validate':{'maxlength':32},'title':''},
	ll33:{'id':'mainInfo_And_checkTime','dataType':'7','title':''},
	ll34:{'id':'mainInfo_And_checkerUnitCode','showText':'false','columnName':'LL_HITLOG_MAIN|CHECKER_UNIT_CODE','dataType':'0','relatid':'mainInfo_And_llHitlogInfo_And_CheckerUnitName','title':''},
	//hitloginfo - json
	ll7:{'id':'mainInfo_And_llHitlogInfo_And_Rank','dataType':'1','validate':{'maxlength':8,isdigital:true},'title':''},
	ll8:{'id':'mainInfo_And_llHitlogInfo_And_Score','dataType':'1','validate':{'maxlength':8,isdigital:true},'title':''},
	ll9:{'id':'mainInfo_And_llHitlogInfo_And_EnrollUser','dataType':'1','validate':{'maxlength':30},'title':'','editable':false},
	ll12:{'id':'mainInfo_And_llHitlogInfo_And_Comments','dataType':'3','validate':{'maxlength':100},'title':''},
	ll17:{'id':'mainInfo_And_llHitlogInfo_And_SrcCaseClassCode1','dataType':'0','columnName':'LL_HITLOG_MAIN|SRC_CASE_CLASS_CODE_1','validate':{'maxlength':8},'title':'','editable':false},
	ll18:{'id':'mainInfo_And_llHitlogInfo_And_SrcCaseClassCode2','dataType':'0','columnName':'LL_HITLOG_MAIN|SRC_CASE_CLASS_CODE_1','validate':{'maxlength':8},'title':'','editable':false},
	ll19:{'id':'mainInfo_And_llHitlogInfo_And_SrcCaseClassCode3','dataType':'0','columnName':'LL_HITLOG_MAIN|SRC_CASE_CLASS_CODE_1','validate':{'maxlength':8},'title':'','editable':false},
	ll20:{'id':'mainInfo_And_llHitlogInfo_And_SrcCaseSuperviseLevel','columnName':'LL_HITLOG_MAIN|SRC_CASE_SUPERVISE_LEVEL','dataType':'0','title':'','editable':false},
	ll21:{'id':'mainInfo_And_llHitlogInfo_And_SrcCaseOccurDate','dataType':'2','title':'','editable':false},
	ll26:{'id':'mainInfo_And_llHitlogInfo_And_DestCaseClassCode1','columnName':'LL_HITLOG_MAIN|DEST_CASE_CLASS_CODE_1','dataType':'0','title':'','editable':false},
	ll27:{'id':'mainInfo_And_llHitlogInfo_And_DestCaseClassCode2','columnName':'LL_HITLOG_MAIN|DEST_CASE_CLASS_CODE_1','dataType':'0','title':'','editable':false},
	ll28:{'id':'mainInfo_And_llHitlogInfo_And_DestCaseClassCode3','columnName':'LL_HITLOG_MAIN|DEST_CASE_CLASS_CODE_1','dataType':'0','title':'','editable':false},
	ll29:{'id':'mainInfo_And_llHitlogInfo_And_DestCaseSuperviseLevel','dataType':'0','columnName':'LL_HITLOG_MAIN|DEST_CASE_SUPERVISE_LEVEL','title':'','editable':false},
	ll30:{'id':'mainInfo_And_llHitlogInfo_And_DestCaseOccurDate','dataType':'2','title':'','editable':false},
	ll31:{'id':'mainInfo_And_llHitlogInfo_And_BtyFlag','dataType':'0','columnName':'LL_HITLOG_MAIN|BTY_MASK','title':''},
	ll32:{'id':'mainInfo_And_llHitlogInfo_And_Checker','dataType':'1','validate':{'maxlength':40},'title':''},
	ll35:{'id':'mainInfo_And_llHitlogInfo_And_CheckerUnitName','dataType':'5','validate':{'maxlength':100},'title':''},	
	//main
	ll36:{'id':'mainInfo_And_srcCardSeqNo','dataType':'1','validate':{'maxlength':3,isdigital:true},'title':''},
	ll37:{'id':'mainInfo_And_destCardSeqNo','dataType':'1','validate':{'maxlength':3,isdigital:true},'title':''},	
	ll38:{'id':'mainInfo_And_checkerId','dataType':'1','validate':{'maxlength':16},'title':''},
    ll39:{'id':'mainInfo_And_srcAbisCeNum','dataType':'1','validate':{'maxlength':23,'minlength':22},'title':'','editable':false},
    ll40:{'id':'mainInfo_And_destAbisCeNum','dataType':'1','validate':{'maxlength':23,'minlength':22},'title':'','editable':false}
}
//ttHitlogInfo 'columnName':'|',
var tt = {
	t1:{'id':'mainInfo_And_id','dataType':'1','validate':{'maxlength':15},'title':''},
	t2:{'id':'mainInfo_And_status','dataType':'0','columnName':'TT_HITLOG_MAIN|STATUS','title':''},
	t3:{'id':'mainInfo_And_hitlogUUID','dataType':'1','validate':{'maxlength':32},'title':''},
	t4:{'id':'mainInfo_And_hitlogNum','dataType':'1','validate':{'maxlength':32},'title':'','editable':false},
	t5:{'id':'mainInfo_And_qryId','dataType':'1','validate':{'maxlength':15},'title':''},
	t6:{'id':'mainInfo_And_qryStatus','dataType':'0','title':''},
	t7:{'id':'mainInfo_And_qryType','dataType':'0','validate':{'maxlength':15},'columnName':'TT_HITLOG_MAIN|QRY_TYPE','title':'','editable':false},
	tt1:{'id':'mainInfo_And_createUser','dataType':'1','validate':{'maxlength':16},'title':''},
	tt2:{'id':'mainInfo_And_createUnitCode','showText':'false','columnName':'TT_HITLOG_MAIN|CREATE_UNIT_CODE','dataType':'0','title':''},
	tt3:{'id':'mainInfo_And_updateUser','dataType':'1','validate':{'maxlength':16},'title':''},
	tt4:{'id':'mainInfo_And_updateUnitCode','showText':'false','columnName':'TT_HITLOG_MAIN|CREATE_UNIT_CODE','dataType':'0','title':''},
	tt5:{'id':'mainInfo_And_createTime','dataType':'7','title':''},
	tt6:{'id':'mainInfo_And_updateTime','dataType':'7','title':''},
	tt10:{'id':'mainInfo_And_enrollTime','dataType':'7','title':'','editable':false},
	tt36:{'id':'mainInfo_And_enrollUnitCode','dataType':'0','columnName':'TT_HITLOG_MAIN|ENROLL_UNIT_CODE','title':'','editable':false,all:false,'showText':false},
	tt14:{'id':'mainInfo_And_srcCardId','dataType':'1','validate':{'maxlength':15,isdigital:true},'title':''},
	tt15:{'id':'mainInfo_And_srcCardNum','dataType':'1','validate':{'maxlength':32},'title':'','editable':false},	
	tt21:{'id':'mainInfo_And_destCardId','dataType':'1','validate':{'maxlength':15},'title':''},
	tt22:{'id':'mainInfo_And_destCardNum','dataType':'1','validate':{'maxlength':32},'title':'','editable':false},
	tt30:{'id':'mainInfo_And_checkTime','dataType':'7','title':''},
	tt31:{'id':'mainInfo_And_checkerUnitCode','showText':'false','columnName':'TT_HITLOG_MAIN|CHECKER_UNIT_CODE','dataType':'0','relatid':'mainInfo_And_ttHitlogInfo_And_CheckerUnitName','title':''},

	//tthitlog json
	tt7:{'id':'mainInfo_And_ttHitlogInfo_And_Rank','dataType':'1','validate':{'maxlength':8,isdigital:true},'title':''},
	tt8:{'id':'mainInfo_And_ttHitlogInfo_And_Score','dataType':'1','validate':{'maxlength':8,isdigital:true},'title':''},
	tt9:{'id':'mainInfo_And_ttHitlogInfo_And_EnrollUser','dataType':'1','validate':{'maxlength':30},'title':'','editable':false},
	tt11:{'id':'mainInfo_And_ttHitlogInfo_And_IsDirectCaptured','dataType':'0','columnName':'TT_HITLOG_MAIN|IS_DIRECT_CAPTURED','title':''},
	tt12:{'id':'mainInfo_And_ttHitlogInfo_And_IsWantedHit','dataType':'0','columnName':'TT_HITLOG_MAIN|IS_WANTED_HIT','title':''},
	tt13:{'id':'mainInfo_And_ttHitlogInfo_And_Comments','dataType':'3','validate':{'maxlength':100},'title':''},
	tt16:{'id':'mainInfo_And_ttHitlogInfo_And_SrcPersonName','dataType':'1','validate':{'maxlength':40},'title':'','editable':false},
	tt17:{'id':'mainInfo_And_ttHitlogInfo_And_SrcPersonSexCode','dataType':'0','columnName':'TT_HITLOG_MAIN|SRC_PERSON_SEX_CODE','title':'','editable':false},
	tt18:{'id':'mainInfo_And_ttHitlogInfo_And_SrcPersonBirthDate','dataType':'2','title':'','editable':false},
	tt19:{'id':'mainInfo_And_ttHitlogInfo_And_SrcPersonShenfenId','dataType':'1','validate':{'maxlength':20},'title':'','editable':false},
	tt20:{'id':'mainInfo_And_ttHitlogInfo_And_SrcPersonPrintDate','dataType':'2','title':'','editable':false},
	tt23:{'id':'mainInfo_And_ttHitlogInfo_And_DestPersonName','dataType':'1','validate':{'maxlength':40},'title':'','editable':false},
	tt24:{'id':'mainInfo_And_ttHitlogInfo_And_DestPersonSexCode','dataType':'0','columnName':'TT_HITLOG_MAIN|DEST_PERSON_SEX_CODE','title':'','editable':false},
	tt25:{'id':'mainInfo_And_ttHitlogInfo_And_DestPersonBirthDate','dataType':'2','title':'','editable':false},
	tt26:{'id':'mainInfo_And_ttHitlogInfo_And_DestPersonShenfenId','dataType':'1','validate':{'maxlength':20},'title':'','editable':false},
	tt27:{'id':'mainInfo_And_ttHitlogInfo_And_DestPersonPrintDate','dataType':'2','title':'','editable':false},
	tt28:{'id':'mainInfo_And_ttHitlogInfo_And_BtyFlag','dataType':'0','columnName':'TT_HITLOG_MAIN|BTY_MASK','title':''},
	tt29:{'id':'mainInfo_And_ttHitlogInfo_And_Checker','dataType':'1','validate':{'maxlength':40},'title':''},
	tt32:{'id':'mainInfo_And_ttHitlogInfo_And_CheckerUnitName','dataType':'5','validate':{'maxlength':100},'title':''},
	tt33:{'id':'mainInfo_And_ttHitlogInfo_And_wantedUnitCode','dataType':'0','validate':{'maxlength':8,isdigital:true},'title':''},
	tt34:{'id':'mainInfo_And_ttHitlogInfo_And_wantedUnitName','dataType':'1','validate':{'maxlength':100},'title':''},
	tt35:{'id':'mainInfo_And_ttHitlogInfo_And_WantedDate','dataType':'2','title':''},
	//main
	tt39:{'id':'mainInfo_And_checkerId','dataType':'1','validate':{'maxlength':16},'title':''},		
	tt38:{'id':'mainInfo_And_srcPersonNum','dataType':'1','validate':{'maxlength':32},'title':'','editable':false},
	tt37:{'id':'mainInfo_And_destPersonNum','dataType':'1','validate':{'maxlength':32},'title':'','editable':false}
}
/*比中字段 与 捺印 案件 比中任务映射关系
 * 
 * ltl 倒查正查 与 QryObject LP TP 等之间的映射关系
 */
var HitLogJsonCfg ={
	ltl:{},
	tt:{},
	ll:{}
} 
var checkcfg = {}
var recheckcfg = {}
var jsoncfg = {};
var qrycand = {};
//lpcase
jsoncfg[ltl.log35.id] = "mainInfo_And_id";
jsoncfg[ltl.log36.id] = "mainInfo_And_ceNum";
jsoncfg[ltl.log58.id] = "mainInfo_And_abisCeNum";
jsoncfg[ltl.lp3.id] = "caseTextInfo_And_BasicInfo_And_CEComments";
jsoncfg[ltl.lp6.id] = "caseTextInfo_And_ExtractInfo_And_ExtractUnitCode";
jsoncfg[ltl.lp7.id] = "caseTextInfo_And_ExtractInfo_And_ExtractUnitName";
jsoncfg[ltl.lp10.id] = "caseTextInfo_And_ExtractInfo_And_Extractor1";
jsoncfg[ltl.lp11.id] = "caseTextInfo_And_ExtractInfo_And_Extractor2";
jsoncfg[ltl.lp12.id] = "caseTextInfo_And_ExtractInfo_And_Extractor3";
jsoncfg[ltl.lp9.id] =  "caseTextInfo_And_ExtractInfo_And_ExtractDate";
jsoncfg[ltl.lp14.id] = "caseTextInfo_And_RegisterInfo_And_RegiApprover";
jsoncfg[ltl.lp17.id] = "caseTextInfo_And_RegisterInfo_And_RegiTime";
jsoncfg[ltl.lp15.id] = "caseTextInfo_And_RegisterInfo_And_RegiUnitCode";
jsoncfg[ltl.lp1.id] = "caseTextInfo_And_BasicInfo_And_CEOccurPlaceCode";
jsoncfg[ltl.lp18.id] = "caseTextInfo_And_BasicInfo_And_CEPremium";
jsoncfg[ltl.lp4.id] = "caseTextInfo_And_BasicInfo_And_HasPersonKilled";
jsoncfg[ltl.lp5.id] = "caseTextInfo_And_BasicInfo_And_PersonKilledCnt";
jsoncfg[ltl.lp8.id] = "caseTextInfo_And_BasicInfo_And_CaseLoss";
jsoncfg[ltl.log37.id] = "caseTextInfo_And_BasicInfo_And_CEClassCode1";
jsoncfg[ltl.log38.id] = "caseTextInfo_And_BasicInfo_And_CEClassCode2";
jsoncfg[ltl.log39.id] = "caseTextInfo_And_BasicInfo_And_CEClassCode3";
jsoncfg[ltl.log40.id] = "caseTextInfo_And_BasicInfo_And_CEOccurDate";
jsoncfg[ltl.log41.id] = "caseTextInfo_And_CoopInvestInfo_And_SuperviseLevel";
jsoncfg[ltl.lp2.id] = "caseTextInfo_And_BasicInfo_And_CEOccurPlace";
//lpcard
jsoncfg[ltl.log33.id] = "cardInfo_And_id";
jsoncfg[ltl.log34.id] = "cardInfo_And_cardNum";
jsoncfg[ltl.log57.id] = "cardInfo_And_seqNo";
//log57:{'id':'mainInfo_And_lpCardSeqNo','dataType':'1','validate':{'maxlength':3},'title':'','editable':false},
//tpcard
jsoncfg[ltl.log26.id] = "tpCardInfo_And_id";
jsoncfg[ltl.log27.id] = "tpCardInfo_And_cardNum";
jsoncfg[ltl.log1.id] = "tpCardInfo_And_cardNum";
jsoncfg[ltl.tp3.id] = "tpCardInfo_And_printUnitCode";
jsoncfg[ltl.tp2.id] = "tpCardInfo_And_printBy";
jsoncfg[ltl.tp4.id] = "tpCardInfo_And_printDate";
jsoncfg[ltl.log28.id] = "personTextInfo_And_Name";
jsoncfg[ltl.log29.id] = "personTextInfo_And_BirthDate";
jsoncfg[ltl.log30.id] = "personTextInfo_And_ShenfenId";
jsoncfg[ltl.tp1.id] = "personTextInfo_And_Nation";
jsoncfg[ltl.tp6.id] = "personTextInfo_And_MinZu";
jsoncfg[ltl.log32.id] = "personTextInfo_And_SexCode";
jsoncfg[ltl.tp17.id] = "personTextInfo_And_CaseInfo_And_PersonClassCode";
jsoncfg[ltl.tp13.id] = "personTextInfo_And_CaseInfo_And_CaseClassCode1";
jsoncfg[ltl.tp14.id] = "personTextInfo_And_CaseInfo_And_CaseClassCode2";
jsoncfg[ltl.tp15.id] = "personTextInfo_And_CaseInfo_And_CaseClassCode3";
jsoncfg[ltl.tp16.id] = "personTextInfo_And_CaseInfo_And_IsCriminal";
jsoncfg[ltl.tp7.id] = "certInfos.certType";
jsoncfg[ltl.tp8.id] = "certInfos.certNum";
jsoncfg[ltl.tp11.id] = "addrInfos[i].addressCode";
jsoncfg[ltl.tp9.id] = "addrInfos[i].addressCode";
jsoncfg[ltl.log51.id] = "lob.gid";
jsoncfg[ltl.log50.id] = "lob.cid";
jsoncfg[ltl.log49.id] = "lob.vid";
jsoncfg[ltl.log56.id] = "mainInfo_And_personNum";
//qryInfo  QryInfo
jsoncfg[ltl.log6.id] = "qryType";
jsoncfg[ltl.qry1.id] = "matchPriority";
jsoncfg[ltl.qry2.id] = "lastVerifyResult";
jsoncfg[ltl.qry4.id] = "submitUnitCode";
jsoncfg[ltl.qry3.id] = "submitUser";
jsoncfg[ltl.qry5.id] = "submitTime";
jsoncfg[ltl.log4.id] = "id";
jsoncfg[ltl.qry17.id] ="qryTaskUuid";
jsoncfg[ltl.qry6.id] = "submitUnitCodeText";
//match QryMatchInfo
jsoncfg[ltl.qry7.id] = "searchUnitCodeText";
jsoncfg[ltl.qry8.id] = "searchUnitCode";
jsoncfg[ltl.qry9.id] ="searchFinishTime";
jsoncfg[ltl.qry10.id] ="searchSysId";
jsoncfg[ltl.qry18.id] ="recSearched";
//checker 认定人
checkcfg = {}
checkcfg[ltl.log42.id] = "verifyUser";
checkcfg[ltl.log44.id] = "verifyTime";
checkcfg[ltl.log45.id] = "verifyUnitCode";
checkcfg[ltl.log46.id] = "verifyUnitCodeText";
jsoncfg['checkInfoCfg']=$.extend(true, {}, checkcfg);
//复核人 rechecker
recheckcfg = {}
recheckcfg[ltl.qry11.id] = "verifyUser";
recheckcfg[ltl.qry13.id] = "verifyTime";
recheckcfg[ltl.qry14.id] = "verifyUnitCode";
recheckcfg[ltl.qry15.id] = "verifyUnitCodeText";
jsoncfg['recheckInfoCfg']=recheckcfg;
//qrycand
qrycand = {}//候选卡信息
qrycand[ltl.log47.id] = "bty";
qrycand[ltl.log13.id] = "candRank";
qrycand[ltl.log14.id] = "score";
qrycand[ltl.log48.id] = "fgp";
jsoncfg['qrycandInfoCfg']=$.extend(true, {}, qrycand);
//ltl映射关系结束
HitLogJsonCfg.ltl = $.extend(true, {}, jsoncfg);

/**
 * tt映射关系
 * 
 * */
jsoncfg={};
//qryInfo  QryInfo
jsoncfg[tt.t7.id] = "qryType";
jsoncfg[tt.t5.id] = "id";
checkcfg = {}//checker 认定人
checkcfg[tt.tt39.id] = "verifyUser";
checkcfg[tt.tt30.id] = "verifyTime";
checkcfg[tt.tt31.id] = "verifyUnitCode";
checkcfg[tt.tt32.id] = "verifyUnitCodeText";
jsoncfg['checkInfoCfg']=$.extend(true, {}, checkcfg);

//qrycand
qrycand = {}//候选卡信息
qrycand[tt.tt28.id] = "bty";
qrycand[tt.tt7.id] = "candRank";
qrycand[tt.tt8.id] = "score";
jsoncfg['qrycandInfoCfg']=$.extend(true, {}, qrycand);
var jsoncfg1 = {};
jsoncfg1[tt.t4.id] = "tpCardInfo_And_cardNum";
//tpcard1
jsoncfg1[tt.tt14.id] = "tpCardInfo_And_id";
jsoncfg1[tt.tt15.id] = "tpCardInfo_And_cardNum";
jsoncfg1[tt.tt16.id] = "personTextInfo_And_Name";
jsoncfg1[tt.tt17.id] = "personTextInfo_And_SexCode";
jsoncfg1[tt.tt20.id] = "tpCardInfo_And_printDate";
jsoncfg1[tt.tt18.id] = "personTextInfo_And_BirthDate";
jsoncfg1[tt.tt19.id] = "personTextInfo_And_ShenfenId";
jsoncfg1[tt.tt38.id] = "mainInfo_And_personNum";
jsoncfg['tpcard1']=$.extend(true, {}, jsoncfg1);
//tpcard2
var jsoncfg2 = {};
jsoncfg2[tt.tt21.id] = "tpCardInfo_And_id";
jsoncfg2[tt.tt22.id] = "tpCardInfo_And_cardNum";
jsoncfg2[tt.tt23.id] = "personTextInfo_And_Name";
jsoncfg2[tt.tt24.id] = "personTextInfo_And_SexCode";
jsoncfg2[tt.tt27.id] = "tpCardInfo_And_printDate";
jsoncfg2[tt.tt25.id] = "personTextInfo_And_BirthDate";
jsoncfg2[tt.tt26.id] = "personTextInfo_And_ShenfenId";
jsoncfg2[tt.tt37.id] = "mainInfo_And_personNum";
jsoncfg['tpcard2']=$.extend(true, {}, jsoncfg2);
//tt映射关系结束
HitLogJsonCfg.tt = $.extend(true, {}, jsoncfg);



/**
 * ll映射关系
 * 
 * */
jsoncfg={};
//qryInfo  QryInfo
jsoncfg[ll.t7.id] = "qryType";
jsoncfg[ll.t5.id] = "id";
checkcfg = {}//checker 认定人
checkcfg[ll.ll38.id] = "verifyUser";
checkcfg[ll.ll33.id] = "verifyTime";
checkcfg[ll.ll34.id] = "verifyUnitCode";
checkcfg[ll.ll35.id] = "verifyUnitCodeText";
jsoncfg['checkInfoCfg']=$.extend(true, {}, checkcfg);
jsoncfg1 = {};//lpcase1
jsoncfg1[ll.t4.id] = "mainInfo_And_ceNum";
jsoncfg1[ll.ll13.id] = "mainInfo_And_id";
jsoncfg1[ll.ll14.id] = "mainInfo_And_ceNum";
jsoncfg1[ll.ll39.id] = "mainInfo_And_abisCeNum";
jsoncfg1[ll.ll17.id] = "caseTextInfo_And_BasicInfo_And_CEClassCode1";
jsoncfg1[ll.ll18.id] = "caseTextInfo_And_BasicInfo_And_CEClassCode2";
jsoncfg1[ll.ll19.id] = "caseTextInfo_And_BasicInfo_And_CEClassCode3";
jsoncfg1[ll.ll20.id] = "caseTextInfo_And_CoopInvestInfo_And_SuperviseLevel";
jsoncfg1[ll.ll21.id] = "caseTextInfo_And_BasicInfo_And_CEOccurDate";
jsoncfg['lpcase1']=$.extend(true, {}, jsoncfg1);
jsoncfg1 = {};//lpcard1s
jsoncfg1[ll.ll15.id] = "cardInfo_And_id";
jsoncfg1[ll.ll16.id] = "cardInfo_And_cardNum";
jsoncfg['lpcard1']=$.extend(true, {}, jsoncfg1);
jsoncfg2 = {};//lpcase2
jsoncfg2[ll.ll22.id] = "mainInfo_And_id";
jsoncfg2[ll.ll23.id] = "mainInfo_And_ceNum";
jsoncfg2[ll.ll40.id] = "mainInfo_And_abisCeNum";
jsoncfg2[ll.ll26.id] = "caseTextInfo_And_BasicInfo_And_CEClassCode1";
jsoncfg2[ll.ll27.id] = "caseTextInfo_And_BasicInfo_And_CEClassCode2";
jsoncfg2[ll.ll28.id] = "caseTextInfo_And_BasicInfo_And_CEClassCode3";
jsoncfg2[ll.ll29.id] = "caseTextInfo_And_CoopInvestInfo_And_SuperviseLevel";
jsoncfg2[ll.ll30.id] = "caseTextInfo_And_BasicInfo_And_CEOccurDate";
jsoncfg['lpcase2']=$.extend(true, {}, jsoncfg2);
jsoncfg2 = {};//lpcard2
jsoncfg2[ll.ll24.id] = "cardInfo_And_id";
jsoncfg2[ll.ll25.id] = "cardInfo_And_cardNum";
jsoncfg['lpcard2']=$.extend(true, {}, jsoncfg1);
//qrycand
qrycand = {}//候选卡信息
qrycand[ll.ll31.id] = "bty";
qrycand[ll.ll7.id] = "candRank";
qrycand[ll.ll8.id] = "score";
jsoncfg['qrycandInfoCfg']=$.extend(true, {}, qrycand);
//ll映射关系结束
HitLogJsonCfg.ll = $.extend(true, {}, jsoncfg);

