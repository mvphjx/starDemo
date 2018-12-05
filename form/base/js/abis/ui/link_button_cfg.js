
var LinkButtonCfg =
{
	Add				:	{normal:"Add",				hover:"Add_Large",				disable:"Add_Large",		txt:""},
	Action  		:	{normal:"Action",			hover:"Action_Large",			disable:"Action",			txt:""},
	Audit			:	{normal:"Audit",			hover:"Audit_Large",			disable:"Audit_Disable",	txt:""},
	AddPermit  		:	{normal:"AddPermit",		hover:"AddPermit_Large",		disable:"AddPermit",	    txt:""},
	AddForbid  		:	{normal:"AddForbid",		hover:"AddForbid_Large",		disable:"AddForbid",	    txt:""},
	BatchAdd  		:	{normal:"BatchAdd",	    	hover:"BatchAdd_Large",			disable:"BatchAdd",	        txt:""},
	Cfg				:	{normal:"Cfg",				hover:"Cfg_Large",				disable:"Cfg",				txt:""},
	Check			:	{normal:"Check",			hover:"Check_Large",			disable:"Check",			txt:""},
	ChangePriority	:	{normal:"ChangePriority",	hover:"ChangePriority_Large",	disable:"ChangePriority",	txt:""},
	Clean			:	{normal:"Clean",			hover:"Clean_Large",			disable:"Clean",			txt:""},
	Compare  		:	{normal:"Compare",			hover:"Compare_Large",  		disable:"Compare",			txt:""},
	Cancelled 	 	:	{normal:"Cancelled",		hover:"Cancelled_Large",  		disable:"Cancelled",		txt:""},
	Coll	 	 	:	{normal:"Coll",				hover:"Coll_Large",  			disable:"Coll",				txt:""},
	Del				:	{normal:"Del",				hover:"Del_Large",				disable:"Del_Disable",		txt:""},
	Disable			:	{normal:"Disable",			hover:"Disable_Large",			disable:"Disable",			txt:""},
	Download		:	{normal:"Download",			hover:"Download_Large",			disable:"Download",			txt:""},
	Editor			:	{normal:"Editor",			hover:"Editor_Large",			disable:"Editor",			txt:""},
	ExpYpf			:	{normal:"ExpYpf",			hover:"ExpYpf_Large",			disable:"ExpYpf",			txt:""},
	ExpFpt			:	{normal:"ExpFpt",			hover:"ExpFpt_Large",			disable:"ExpFpt",			txt:""},
	Exp				:	{normal:"Exp",				hover:"Exp_Large",				disable:"Exp",				txt:""},
	Enable			:	{normal:"Enable",			hover:"Enable_Large",			disable:"Enable",			txt:""},
	ExpExecl		:	{normal:"ExpExecl",			hover:"ExpExecl_Large",			disable:"ExpExecl",			txt:""},
	ExpExcel  		:	{normal:"ExpExcel",	    	hover:"ExpExcel_Large",			disable:"ExpExcel",	        txt:""},
	Forbid2Permit  	:	{normal:"Forbid2Permit",	hover:"Forbid2Permit_Large",	disable:"Forbid2Permit",	txt:""},
	HaveRead 	 	:	{normal:"Send",				hover:"Send_Large",  			disable:"Send",				txt:""},
	Look			:	{normal:"Look",				hover:"Look_Large",				disable:"Look",				txt:""},
	Printer			:	{normal:"Printer",			hover:"Printer_Large",			disable:"Printer",			txt:""},
	Permit2Forbid  	:	{normal:"Permit2Forbid",	hover:"Permit2Forbid_Large",	disable:"Permit2Forbid",	txt:""},
	Que				:	{normal:"Que",				hover:"Que_Large",				disable:"Que",				txt:""},
	Qry				:	{normal:"Qry",				hover:"Qry_Large",				disable:"Qry",				txt:""},
	Refresh			:	{normal:"Refresh",			hover:"Refresh_Large",			disable:"Refresh",			txt:""},
	SendMatch		:	{normal:"Send",				hover:"Send_Large",				disable:"Send",				txt:""},
	SupFix			:	{normal:"SupFix",			hover:"SupFix_Large",			disable:"SupFix",			txt:""},
	SelectAll  		:	{normal:"SelectAll",		hover:"SelectAll_Large",		disable:"SelectAll",		txt:""},
	SelectNone  	:	{normal:"SelectNone",		hover:"SelectNone_Large",		disable:"SelectNone",		txt:""},
	SelectInverse  	:	{normal:"SelectInverse",	hover:"SelectInverse_Large",	disable:"SelectInverse",	txt:""},
	StorageSucc	 	:	{normal:"StorageSucc",		hover:"StorageSucc_Large",  	disable:"StorageSucc",		txt:""},
	StorageFail	 	:	{normal:"StorageFail",		hover:"StorageFail_Large",  	disable:"StorageFail",		txt:""},
	StorageListSucc	:	{normal:"StorageListSucc",	hover:"StorageListSucc_Large",  disable:"StorageListSucc",	txt:""},
	UpLoad			:	{normal:"UpLoad",			hover:"UpLoad_Large",			disable:"UpLoad",			txt:""},
	UpDown			:	{normal:"UpDown",			hover:"UpDown_Large",			disable:"UpDown",			txt:""},
	UpdatePass 	 	:	{normal:"UpdatePass",		hover:"UpdatePass_Large",  		disable:"UpdatePass",		txt:""},
	Update			:	{normal:"Update",			hover:"Update_Large",			disable:"Update_Disable",	txt:""},
	Transfer	 	:	{normal:"Transfer",			hover:"Transfer_Large",  		disable:"Transfer",			txt:""},
	CollListSucc	:	{normal:"CollListSucc",		hover:"CollListSucc_Large",  	disable:"CollListSucc",		txt:""},
	ReAssignTask		:	{normal:"ReAssignTask",		hover:"ReAssignTask_Large",		disable:"ReAssignTask",		txt:""},

	setLanguage	: function(language)
	{
		this.Action.txt 		= language.Execute;
		this.Add.txt 			= language.Add;
		this.Audit.txt 			= language.Audit;
		this.AddPermit.txt 		= language.AddPermit;		
		this.AddForbid.txt 		= language.AddForbid;
		this.BatchAdd.txt 		= language.BatchAdd;
		this.Compare.txt 		= language.Compare;
		this.Cfg.txt 			= language.Configure;
		this.Clean.txt 			= language.Clear;
		this.Check.txt 			= language.Check;
		this.Coll.txt			= language.Coll;
		this.Cancelled.txt 		= language.Cancelled;
		this.ChangePriority.txt = language.ChangePriority;
		this.Del.txt 			= language.Delete;
		this.Disable.txt 		= language.Disable;
		this.Download.txt		= language.Download;
		this.Editor.txt 		= language.Edit;
		this.ExpYpf.txt 		= language.ExportYPF;
		this.ExpFpt.txt 		= language.ExportFPT;
		this.Exp.txt 			= language.Export;
		this.Enable.txt 		= language.Enable;
		this.ExpExecl.txt 		= language.ExportExcle;
		this.ExpExcel.txt 		= language.ExpExcel;
		this.Forbid2Permit.txt	= language.Forbid2Permit;
		this.HaveRead.txt		= language.HaveRead;
		this.Look.txt 			= language.Look;
		this.Printer.txt 		= language.Print;
		this.Permit2Forbid.txt	= language.Permit2Forbid;
		this.Que.txt 			= language.Queue;
		this.Qry.txt 			= language.Search;
		this.Refresh.txt 		= language.Refresh;
		this.SendMatch.txt 		= language.SendMatch;
		this.SupFix.txt 		= language.FloatOrFix;
		this.SelectAll.txt		= language.SelectAll;
		this.SelectNone.txt		= language.SelectNone;
		this.SelectInverse.txt  = language.SelectInverse;
		this.StorageSucc.txt	= language.StorageSucc;
		this.StorageFail.txt	= language.StorageFail;
		this.StorageListSucc.txt= language.StorageListSucc;
		this.Transfer.txt		= language.Transfer;
		this.Update.txt 		= language.Modify;
		this.UpLoad.txt 		= language.UPLoad;
		this.UpDown.txt 		= language.ExpandOrPack;
		this.UpdatePass.txt 	= language.UpdatePass;
		this.CollListSucc.txt	= language.CollListSucc;
		this.ReAssignTask.txt	= language.ReAssignTask;
	}
}