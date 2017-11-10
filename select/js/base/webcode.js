
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
		normal		: "normal",
		queue		: "queue",
		list		: "list",
        qual		: "qual"
	}
}
