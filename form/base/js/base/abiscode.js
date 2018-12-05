var ABISCode=
{
	/** 读取身份证各项信息键名*/
	IDCardKey:
	{
		NAME		:	"NAME",
		SEXCODE		:	"SEXCODE",
		NATIONALITY	:	"NATIONALITY",
		BIRTHDATE	:	"BIRTHDATE",
		HUKOUPLACE	:	"HUKOUPLACE",
		SHENFENID	:	"SHENFENID",
		ISSUER		:	"ISSUER",
		STARTTIME	:	"STARTTIME",
		ENDTIME		:	"ENDTIME",
		ADDRESS		:	"ADDRESS",
		CMOSID		:	"CMOSID",
		PHOTOPATH	:	"PHOTOPATH"
	},
	BOOL_N:
	{
		YES : 1,
		NO	: 0
	},
	BOOL_C:
	{
		YES : "Y",
		NO	: "N"
	},
	DBDataType:
	{
		DB_INT		:	0,
		DB_FLOAT	:	1,
		DB_STRING	:	2,
		DB_DATE		:	3,
		DB_CLOB		:	4,
		DB_RAW		:	5,
		DB_OBJECT	:	6,
		DB_LIST		:	7,
		DB_BLOB		:	8
	},
	StorageDataType:
	{
		UNKNOWN		: 0,
		NUMBER		: 1,
		STRING		: 2,
		DATE		: 3,
		TIME		: 4,
		DATETIME	: 5,
		BOOL		: 6,
		BINARY		: 7
	},
	TPFeedBackType:
	{

		MATCH	: 	0,
		QUAL	:	1
	},
	TPFeedBackTaskType:
	{

		FINGER_TT	: "FINGER_TT",
		FINGER_TL	: "FINGER_TL",
		PALM_TT		: "PALM_TT",
		PALM_TL 	: "PALM_TL",
		FACE_TT 	: "FACE_TT",
		FACE_TL 	: "FACE_TL",
		QUAL 		: "QUAL"
	},
	QryType:
	{
		TT	: 1,
		TL	: 2,
		LT	: 3,
		LL	: 4
	},
	QryStatusCode:
	{
		WAITSEARCH			: 0,
		SEARCHING			: 1,
		SEARCHED			: 2,	
		ERRORDATA			: 3,
		WAITCENSOR			: 5,
		CHECKING			: 8,
		WAITRECHECK			: 9,
		RECHECKING			: 10,
		WAITCHECK			: 12,
		CENSORING			: 13,
		CENSORFIN			: 14,
		SEARCH_FIN_NO_CAND	: 15,
		WAITAUDIT			: 16,
		AUDITING			: 17,
		WAITGACHECK			: 20,
		GACHECKING			: 21,
		CHECK_HIT			: 30,
		CHECK_NOT_HIT		: 31,
		RECHECK_HIT			: 32,
		RECHECK_NOT_HIT		: 33,
		GACHECK_HIT			: 34,
		GACHECK_NOT_HIT		: 35,
		AUDIT_HIT			: 36,
		AUDIT_NOT_HIT		: 37,
		UNKNOWN				: 55
	},
	VerifyResultCode:
	{
		NOTCHECKED		: 0,
		NOTMATCH		: 1,
		MATCH			: 2,
		UNCERTAIN		: 3,
		APPLYRECHECK	: 4,
		APPLYAUDIT		: 5,
		APPLYGARECHECK	: 6
	},
	PrintTypeCode:
	{
		PRINT_UNKNOWN		: 0,
		PRINT_TP	 		: 1,
		PRINT_LP			: 2
	},
	TableTypeCode:
	{
		TPCARD			: 20,
		TPPERSON        : 27,
		TP_WANTED       : 28,
		LPCARD			: 48,
		LPCASE			: 49,
		QUERYQUETABLE	: 60,
		MATCHHITLOG		: 330
	},
	ImageShowType:
	{
		PriCpr		: 3,
		PriLoseLess	: 2,
		Cpr			: 1,
		LoseLess	: 0,
		Nothing		: -1
	},
	Bty:
	{
		BTY_UNKNOWN		: 0,
		BTY_FINGER		: 1,
		BTY_PALM		: 2,
		BTY_VOICE		: 3,
		BTY_FACE		: 4,
		BTY_DNA			: 5,
		BTY_FOOT		: 6,
		BTY_IRIS		: 7,
		BTY_RETINA		: 8,
		BTY_SIGNATURE	: 9,
		BTY_CARDIMAGE	: 10,
		BTY_FINGERORPALM: 12,
		BTY_EJI			: 13,
		BTY_MULTI		: 14,
		BTY_SHOES		: 15,
		BTY_SCAR		: 16,
		BTY_MARK		: 17,
		BTY_TATTOO		: 18,
		BTY_OTHER_BODY	: 19,
		BTY_DATA		: 20,
		BTY_HAND_WRITING: 21,
		BTY_SMT			: 22,
		BTY_VASCULAR	: 23
	},
	FingerVid:
	{
		ROLL	: 0,
		FLAT	: 1
	},
	ShoesPos:
	{
		UNKNOWN		: 0,	// wz 未知
		RIGHT_SHOE	: 1,	// yj 右脚
		LEFT_SHOE	: 2		// zj 左脚
	},
	FingerPos:
	{
		UNKNOWN		: 0,
		RTHUMB		: 1,
		RINDEX		: 2,
		RMIDDLE		: 3,
		RRING		: 4,
		RLITTLE		: 5,
		LTHUMB		: 6,
		LINDEX		: 7,
		LMIDDLE		: 8,
		LRING		: 9,
		LLITTLE		: 10,
		UNKNOWN_2	: 99
	},
	FaceVid:
	{
		UNKNOWN		: 0,
		FRONT		: 1,	
		RIGHT_SIDE	: 2,	
		LEFT_SIDE	: 3,	
		UNSPECIFIED	: 4,	
		TOP_DOWN	: 5,
		BOTTOM_UP	: 6
	},
	FacePos:
	{
		NORMAL		: 0
	},
	PalmPos:
	{
		UNKNOWN			: 0,	// wz 未知
		R_PALM_Q		: 1,	// yszw 右手掌纹（四分的掌纹部分）
		L_PALM_Q		: 2,	// zszw 左手掌纹（四分的掌纹部分）
		R_FOUR_Q		: 3,	// ysslz 右手四联指（四分的指纹部分）
		L_FOUR_Q		: 4,	// zsslz 左手四联指（四分的指纹部分）
		R_THUMBBOT_Q	: 5,	// ysmzxb 右手拇指下部（四分的拇指下部）
		R_THUMBTOP_Q	: 6,	// ysmzsb 右手拇指上部（四分的拇指上部）
		L_THUMBBOT_Q	: 7,	// zsmzxb 左手拇指下部（四分的拇指下部）
		L_THUMBTOP_Q	: 8,	// zsmzsb 左手拇指上部（四分的拇指上部）
		R_WHOLE			: 9,	// ysqz 右手全掌
		L_WHOLE			: 10,	// zsqz 左手全掌
		R_PALM			: 11,	// yszw 右手掌纹
		L_PALM			: 12,	// zszw 左手掌纹
		R_FOUR			: 13,	// ysslz 右手四联指
		L_FOUR			: 14,	// zsslz 左手四联指
		R_THUMB			: 15,	// yspmmz 右手平面拇指
		L_THUMB			: 16,	// zspmmz 左手平面拇指
		R_WRITER		: 17,	// yszc 右手掌侧
		L_WRITER		: 18,	// zszc 左手掌侧
		RL_THUMB		: 19	// ymhzm 右手拇指和左手拇指（同一幅图像
	},
	DBTypeCode:
	{
		TENRPINT_DB	: 1,	// 捺印库
		LATENT_DB	: 2,	// 现场库
		QUERY_DB	: 3,	// 查询库
		ADMIN_DB	: 4		// 管理库
	},
	DbIdCode:
	{
		DEFAULT_TPLIB 		: 1,
		DEFAULT_LPLIB 		: 2,
		DEFAULT_QUERYLIB 	: 20,
		DEFAULT_ADMINLIB 	: 21
	},
	Dbid:
	{
		DEFAULT_TPLIB 		: 1,	
		DEFAULT_LPLIB 		: 2,
		DEFAULT_QUERYLIB 	: 20,//hjx  2016年12月7日	
		DEFAULT_ADMINLIB 	: 8,	
		RMT_TPLIB			: 16,	
		RMT_LPLIB			: 32,
		TEMP_TPLIB			: 64,
		TEMP_LPLIB			: 128
	},
	DBPurposeCode:
	{
		NORMAL		: 0,
		TEMP		: 1,
		TEMP4QRY	: 2,
		TEMP4HITLOG	: 3,
		TEMP4RMT	: 4,
		RECYCLE_BIN	: 5	// 回收站。号码可以重复。
	},
	LobDataType:
	{
		IMG	: 1,
		MNT	: 2
	},
	FGPDataType:
	{
		ALL : 0,
		IMG : 1,
		MNT : 2
	},
	ImageGroupIdCode:
	{
		LOSELESS	: 0,
		CPR			: 1,
		ROI			: 2
	},
	EventObjcetIdCode: //事件对象ID
	{
		TENPRINT_PERSON			: 1,
		TENPRINT_CARD			: 2,
		TENPRINT_WANTED			: 3,
		LATENT_CASE				: 10,
		LATENT_CASE_GROUP		: 11,
		LATENT_CARD				: 12,
		LATENT_CARD_GROUP		: 13,
		QUERY_QUERY				: 21,
		HITLOG_HITLOG			: 31,
		WORK_TENPRINT			: 41,
		WORK_LATENT				: 42,
		REMOTE_COMMAND			: 51,
		REMOTE_QRY				: 52,
		SYSTEM_USER_MGR			: 71,
		SYSTEM_USER_ACCESS		: 72,
		SYSTEM_MATCH_PART		: 73,
		SYSTEM_DB_CATLOG		: 74,
		SYSTEM_REMOTE_PARAM		: 75,
		SYSTEM_LOCAL_PARAM		: 76,
		SYSTEM_WORKFLOW			: 77,
		SYSTEM_CODE_TABLE		: 78,
		SYSTEM_STATISTICS		: 79,
		SYSTEM_CODE_TABLE_ENTRY	: 80,
		SYSTEM_WANTED_INFO		: 81,
		SYSTEM_CAPTURED_INFO	: 82,
		DEVICE_COMPUTER			: 101,
		//SERVICE_SERVICE : 111,
		SERVICE_EXF_SVR			: 111,
		SERVICE_GMU				: 112,
		SERVICE_GDU				: 113,
		SERVICE_MMU				: 114,
		SERVICE_MDU				: 115,
		SERVICE_RMT_SVR			: 116,
		SERVICE_RMT_TERMINAL	: 117,
		SERVICE_APP_SVR			: 118,
		SERVICE_WEB_SVR			: 119,
		QUEUE_TP_EXF			: 131,
		QUEUE_LP_EXF			: 132,
		QUEUE_TP_EDIT			: 133,
		QUEUE_LP_EDIT			: 134,
		QUEUE_RMT_TP_UPLOAD		: 135,
		QUEUE_RMT_TP_DOWNLOAD	: 136,
		QUEUE_RMT_LP_UPLOAD		: 137,
		QUEUE_RMT_LP_DOWNLOAD	: 138
	},
	MatchTypeCode:
	{
		TT	:	1,
		TL	: 	2,
		LT	: 	3,
		LL	: 	4
	},
	LinkDataType:
	{
		UNKNOWN	 		: 0,
		MIS_PERSON	 	: 1,
		UNI_PERSON		: 2,
		LP_CASE	 		: 3,
		LP_CARD	 		: 4,
		WANTED_PERSON	: 5,
		CAPTURED_PERSON	: 6,
		LTL_HITLOG		: 7,
		TT_HITLOG		: 8,
		LL_HITLOG	 	: 9,
		GOODS_ITEM		: 10
	},
	WantedSuspectStatus:
	{
		WAIT_AUDIT			:	0,
		SAME_AS_WANTED		: 	1,
		NOT_SAME_AS_WANTED	: 	2
	},
	InstallType :
	{
		ZLYC	: 	"ZLYC",
		YSZJ	:	"YSZJ"
	},
	CaseLevelCodeV4:
	{
		A		: 1,
		BJ		: 2,
		BP		: 3,
		C		: 4,
		UNKNOWN	: 9
	},
	PriorityCode :
	{
		LOWEST		: 1,
		LOWER		: 2,
		LOW			: 3,
		NORMAL		: 4,
		ABOVENORMAL	: 5,
		HIGH		: 6,
		HIGHEST		: 7,
		REALTIME	: 9
	},
	LPEnrollType :
	{
		UNKNOWN			: 0,
		IMAGE_SLICER	: 1,
		LATENT_SCAN		: 2,
		VIDEO_INPUT		: 3,
		IMAGE_TRANSFORM	: 4,
		FPT_IMPORT		: 5,
		YPF_IMPORT		: 6,
		NIST_IMPORT		: 7,
		OTHER_IMPORT	: 9
	},
	TPEnrollType :
	{
		UNKNOWN		: 0,
		LIVE_SCAN	: 1,
		PRINT_SCAN	: 2,
		FPT_IMPORT	: 3,
		YPF_IMPORT	: 4,
		NIST_IMPORT	: 5,
		OTHER_IMPORT: 9
	},
	UserRoleTypeCode :
	{
		UNKNOWN	: 0,
		USER	: 1,
		ROLE	: 2
	},
	BtyFlagCode :
	{
		FINGER		: 0x1,
		PALM		: 0x2,
		FACE		: 0x4,
		VOICE		: 0x8,
		SIGNATURE	: 0x10,
		IRIS		: 0x20,
		SHOES		: 0x40,
		SCAR		: 0x80,
		MARK		: 0x100,
		TATTOO		: 0x200,
		RETINA		: 0x400,
		FOOT		: 0x800,
		FINGER_PALM	: this.FINGER | this.PALM,
		typeToFlag:function(bty)
		{
			switch(bty)
			{
				case	ABISCode.Bty.BTY_FINGER:	return	ABISCode.BtyFlagCode.FINGER;
				case	ABISCode.Bty.BTY_PALM:		return	ABISCode.BtyFlagCode.PALM;
				case	ABISCode.Bty.BTY_FACE:		return	ABISCode.BtyFlagCode.FACE;
				case	ABISCode.Bty.BTY_VOICE:		return	ABISCode.BtyFlagCode.VOICE;
				case	ABISCode.Bty.BTY_SIGNATURE:	return	ABISCode.BtyFlagCode.SIGNATURE;
				case	ABISCode.Bty.BTY_IRIS:		return	ABISCode.BtyFlagCode.IRIS;
				case	ABISCode.Bty.BTY_SHOES:		return	ABISCode.BtyFlagCode.SHOES;
				case	ABISCode.Bty.BTY_SCAR:		return	ABISCode.BtyFlagCode.SCAR;
				case	ABISCode.Bty.BTY_MARK:		return	ABISCode.BtyFlagCode.MARK;
				case	ABISCode.Bty.BTY_TATTOO:	return	ABISCode.BtyFlagCode.TATTOO;
			}
			return	0;
		},
		typeToFlag:function(btys)
		{
			var	flag = 0;
			for(var i in btys)
			{
				var b = btys[i];
				flag |= typeToFlag(b);
			}
			return	flag;
		},
		flagToBtys:function(flag)
		{
			if ( flag == 0 ) return null;
			var	btys = new Array();
			if ( (flag & ABISCode.BtyFlagCode.FINGER)!=0 ) 		btys.push(ABISCode.Bty.BTY_FINGER);
			if ( (flag & ABISCode.BtyFlagCode.PALM)!=0 ) 		btys.push(ABISCode.Bty.BTY_PALM);
			if ( (flag & ABISCode.BtyFlagCode.FACE)!=0 )	 	btys.push(ABISCode.Bty.BTY_FACE);
			if ( (flag & ABISCode.BtyFlagCode.VOICE)!=0 ) 		btys.push(ABISCode.Bty.BTY_VOICE);
			if ( (flag & ABISCode.BtyFlagCode.SIGNATURE)!=0 ) 	btys.push(ABISCode.Bty.BTY_SIGNATURE);
			if ( (flag & ABISCode.BtyFlagCode.IRIS)!=0 ) 		btys.push(ABISCode.Bty.BTY_IRIS);
			if ( (flag & ABISCode.BtyFlagCode.SHOES)!=0 ) 		btys.push(ABISCode.Bty.BTY_SHOES);
			if ( (flag & ABISCode.BtyFlagCode.SCAR)!=0 ) 		btys.push(ABISCode.Bty.BTY_SCAR);
			if ( (flag & ABISCode.BtyFlagCode.MARK)!=0 ) 		btys.push(ABISCode.Bty.BTY_MARK);
			if ( (flag & ABISCode.BtyFlagCode.TATTOO)!=0 ) 		btys.push(ABISCode.Bty.BTY_TATTOO);
			return	btys;
		},
		flagToType:function(flag)
		{
			var	btys = flagToBtys(flag);
			if ( btys == null || btys.length == 0 ) return ABISCode.Bty.BTY_UNKNOWN;
			return	btys.size() == 1 ? btys[0] : ABISCode.Bty.BTY_MULTI;
		}
	},
    InputType:
        {
            CODE: 0,//下拉选
            TEXT: 1,//文本框
            DATE: 2,//日期框
            MULTEXT: 3,//多行文本
            CHECKBNT: 4,//勾选框
            CODETEXT: 5,//下拉选字典组合框 ，有补充文本输入框（例如地址代码，地址代码名称）
            CODETEXT2: 6,//下拉选字典组合框，没有补充信息 （捺印单位，捺印单位名称）
            DATETIME: 7,//日期时间
            TABLE: 9,//表格控件
            MULTIPLECOMBO: 10,//多选控件
            CandFgps: 'CandFgps'//指位暂时特殊处理
        },
	ClientType :
	{
		C			:0,
        QT			:0,
		RCP			:1,
		CPLUS		:2
	},
	DBCodeName: "DBCodeName"
};
var tableJsonTemple = {
        "result": [],
        "dataType": {},
        "headerText": {},
        "header": []
};

