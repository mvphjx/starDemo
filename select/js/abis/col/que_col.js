
var  CardMexTaskCol = 
{
   ID : "ID",
   PRINT_TYPE : "PRINT_TYPE",
   CARD_ID : "CARD_ID",
   CREATE_TIME : "CREATE_TIME",
   CREATE_USER : "CREATE_USER",
   UPDATE_TIME : "UPDATE_TIME",
   STATUS : "STATUS",
   TASK_OPT : "TASK_OPT",
   BPM_ID : "BPM_ID",
   PRIORITY : "PRIORITY"
}

var  CardMexWorkingSvrCol = 
{
   ID : "ID",
   MEX_SVR_UUID : "MEX_SVR_UUID",
   HOST_NAME : "HOST_NAME",
   STARTUP_TIME : "STARTUP_TIME",
   UPDATE_TIME : "UPDATE_TIME",
   PID : "PID",
   CPU_COUNT : "CPU_COUNT"
}

var  CardMexWorkingTaskCol = 
{
   ID : "ID",
   PRIORITY : "PRIORITY",
   MEX_SVR_ID : "MEX_SVR_ID",
   START_WORKING_TIME : "START_WORKING_TIME"
}

var  LiveRescanTaskCol = 
{
   ID : "ID",
   CARD_ID : "CARD_ID",
   CREATE_TIME : "CREATE_TIME",
   STATUS : "STATUS",
   RESCAN_TEN_STRING : "RESCAN_TEN_STRING",
   BPM_ID : "BPM_ID",
   PRIORITY : "PRIORITY",
   UPDATE_TIME : "UPDATE_TIME",
   UPDATE_USER : "UPDATE_USER",
   UPDATE_UNIT_CODE : "UPDATE_UNIT_CODE"
}

var  LiveScanQualCheckTaskCol = 
{
   ID : "ID",
   CARD_ID : "CARD_ID",
   CREATE_TIME : "CREATE_TIME",
   STATUS : "STATUS",
   NEED_CHECK_TEN_STRING : "NEED_CHECK_TEN_STRING",
   LIVE_SCAN_COUNT : "LIVE_SCAN_COUNT",
   BPM_ID : "BPM_ID",
   PRIORITY : "PRIORITY",
   START_CHECK_TIME : "START_CHECK_TIME",
   FINISH_CHECK_TIME : "FINISH_CHECK_TIME",
   CHECKER : "CHECKER",
   CHECKER_UNIT_CODE : "CHECKER_UNIT_CODE",
   CHECK_RESULT : "CHECK_RESULT",
   MAIN_LOW_QUALITY_REASON : "MAIN_LOW_QUALITY_REASON",
   RESCAN_TEN_STRING : "RESCAN_TEN_STRING",
   UPDATE_TIME : "UPDATE_TIME",
   UPDATE_USER : "UPDATE_USER",
   UPDATE_UNIT_CODE : "UPDATE_UNIT_CODE",
   RESCAN_USER_NAME : "RESCAN_USER_NAME",
   RESCAN_UNIT_CODE : "RESCAN_UNIT_CODE",
   RESCAN_DATE_TIME : "RESCAN_DATE_TIME",
   RESCAN_RESULT : "RESCAN_RESULT",
   QUAL_CHECK_LOG_ID : "QUAL_CHECK_LOG_ID",
   RESCAN_LOG_ID : "RESCAN_LOG_ID",
   INSTANCE_ID : "INSTANCE_ID",
   IS_QUAL_CHECK_TIME_OUT : "IS_QUAL_CHECK_TIME_OUT",
   IS_RESCAN_TIME_OUT : "IS_RESCAN_TIME_OUT"
}

var  LiveScanQualCheckTaskQueCol = 
{
   CARD_ID : "CARD_ID",
   CREATE_TIME : "CREATE_TIME",
   STATUS : "STATUS",
   PRIORITY : "PRIORITY"
}

var  LPCardQualCheckTaskCol = 
{
   ID : "ID",
   CARD_ID : "CARD_ID",
   STATUS : "STATUS",
   BPM_ID : "BPM_ID",
   PRIORITY : "PRIORITY",
   CREATE_TIME : "CREATE_TIME",
   CREATE_USER : "CREATE_USER",
   START_CHECK_TIME : "START_CHECK_TIME"
}

var  LPEditTaskCol = 
{
   ID : "ID",
   CARD_ID : "CARD_ID",
   CREATE_TIME : "CREATE_TIME",
   CREATE_USER : "CREATE_USER",
   BPM_ID : "BPM_ID",
   PRIORITY : "PRIORITY",
   STATUS : "STATUS",
   EDIT_USER : "EDIT_USER",
   EDIT_UNIT_CODE : "EDIT_UNIT_CODE",
   START_EDIT_TIME : "START_EDIT_TIME"
}

var  QryVerifyQueTaskCol = 
{
   QRY_ID : "QRY_ID",
   TASK_TYPE : "TASK_TYPE",
   QRY_TYPE : "QRY_TYPE",
   VERIFY_PRIORITY : "VERIFY_PRIORITY",
   CREATE_TIME : "CREATE_TIME",
   QRY_STATUS : "QRY_STATUS",
   WORKING_TIME : "WORKING_TIME"
}

var  TPCardQualCheckTaskCol = 
{
   CARD_ID : "CARD_ID",
   STATUS : "STATUS",
   NEED_CHECK_TEN_STRING : "NEED_CHECK_TEN_STRING",
   BPM_ID : "BPM_ID",
   PRIORITY : "PRIORITY",
   CREATE_TIME : "CREATE_TIME",
   CREATE_USER : "CREATE_USER",
   START_CHECK_TIME : "START_CHECK_TIME"
}

var  TPEditTaskCol = 
{
   ID : "ID",
   CARD_ID : "CARD_ID",
   TEN_STRING : "TEN_STRING",
   CREATE_TIME : "CREATE_TIME",
   CREATE_USER : "CREATE_USER",
   BPM_ID : "BPM_ID",
   PRIORITY : "PRIORITY",
   STATUS : "STATUS",
   EDIT_USER : "EDIT_USER",
   EDIT_UNIT_CODE : "EDIT_UNIT_CODE",
   START_EDIT_TIME : "START_EDIT_TIME"
}

var  TPTextInputTaskCol = 
{
   ID : "ID",
   CARD_ID : "CARD_ID",
   PRIORITY : "PRIORITY",
   STATUS : "STATUS",
   CREATE_TIME : "CREATE_TIME",
   START_WORKING_TIME : "START_WORKING_TIME",
   WORKING_USER : "WORKING_USER",
   BPM_ID : "BPM_ID"
}
