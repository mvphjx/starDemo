
var  MbssDataSyncLogCol = 
{
   TRANS_ID : "TRANS_ID",
   PART_ID : "PART_ID",
   CARD_ID : "CARD_ID",
   OP_TIME : "OP_TIME",
   OP_TYPE : "OP_TYPE",
   OP_STAGE : "OP_STAGE",
   OP_RESULT : "OP_RESULT",
   ERROR_MSG : "ERROR_MSG"
}

var  MbssDataSyncStatusCol = 
{
   CARD_ID : "CARD_ID",
   PART_ID : "PART_ID",
   OP_TIME : "OP_TIME",
   STATUS : "STATUS",
   TRANS_ID : "TRANS_ID",
   OP_TYPE : "OP_TYPE"
}

var  MbssMatchPartCol = 
{
   ID : "ID",
   PART_UUID : "PART_UUID",
   SYNC_STATUS : "SYNC_STATUS",
   DBID_MASK : "DBID_MASK",
   MATCH_ELEMENTS : "MATCH_ELEMENTS",
//   BTY : "BTY",
//   FGP : "FGP",
//   VID : "VID",
//   CID : "CID",
//   GID : "GID",
   MATCH_MNT_FMT : "MATCH_MNT_FMT",
   PRINT_TYPE : "PRINT_TYPE",
   IS_DISABLED : "IS_DISABLED",
   SRC_TP_MATCH_METHOD_ID : "SRC_TP_MATCH_METHOD_ID",
   SRC_LP_MATCH_METHOD_ID : "SRC_LP_MATCH_METHOD_ID",
   DESCRIPTION : "DESCRIPTION",
   PART_TYPE : "PART_TYPE",
   SERVER_PID : "SERVER_PID",
   PID_MASK : "PID_MASK",
   BTY_MASK : "BTY_MASK"
}

var  MbssMexTaskSyncLogCol = 
{
   TRANS_ID : "TRANS_ID",
   MEX_TASK_ID : "MEX_TASK_ID",
   OP_TIME : "OP_TIME",
   OP_TYPE : "OP_TYPE",
   OP_STAGE : "OP_STAGE",
   OP_RESULT : "OP_RESULT",
   ERROR_MSG : "ERROR_MSG"
}

var  MbssMexTaskSyncStatusCol = 
{
   MEX_TASK_ID : "MEX_TASK_ID",
   SENT_TIME : "SENT_TIME",
   OP_TYPE : "OP_TYPE",
   STATUS : "STATUS",
   TRANS_ID : "TRANS_ID",
   CARD_ID : "CARD_ID",
   PRINT_TYPE : "PRINT_TYPE"
}

var  MbssPartIniDownStatusCol = 
{
   ID : "ID",
   STATUS : "STATUS",
   LAST_SYNC_TIME : "LAST_SYNC_TIME",
   LAST_CARD_ID : "LAST_CARD_ID",
   START_SYNC_SCN : "START_SYNC_SCN"
}

var  MbssPartSyncStatusCol = 
{
   ID : "ID",
   STATUS : "STATUS",
   LAST_SYNC_TIME : "LAST_SYNC_TIME",
   LAST_SYNC_SCN : "LAST_SYNC_SCN"
}

var  MbssQryTaskSyncLogCol = 
{
   TRANS_ID : "TRANS_ID",
   QRY_ID : "QRY_ID",
   OP_TIME : "OP_TIME",
   OP_TYPE : "OP_TYPE",
   OP_STAGE : "OP_STAGE",
   OP_RESULT : "OP_RESULT",
   ERROR_MSG : "ERROR_MSG"

}

var  MbssQryTaskSyncStatusCol = 
{
   QRY_ID : "QRY_ID",
   SENT_TIME : "SENT_TIME",
   STATUS : "STATUS",
   TRANS_ID : "TRANS_ID",
   OP_TYPE : "OP_TYPE"
}

