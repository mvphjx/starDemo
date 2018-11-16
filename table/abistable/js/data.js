// 存放测试数据
// 与上下文、环境变量
var WebCode =
    {

        Order:
            {
                ASC: 0,
                DESC: 1
            }
    }
var queryParam = {
    "tblName": "LP_CASE_VIEW",
    "colList": ["ID", "DBID", "CE_TYPE", "CE_STATUS", "CE_NUM", "ABIS_CE_NUM", "CE_NAME", "HAS_PERSON_KILLED", "SUPERVISE_LEVEL", "REGI_UNIT_CODE", "REGI_UNIT_NAME", "REGI_TIME"],
    "curPage": 1,
    "advWhere": null,
    "pageSize": 30,
    "order": 1,
    "orderCol": "ID",
    "qryCnt": true,
    "checkedColName": "ID",
    "cfgTypeCode": 62,
    "uiModuleId": 241,
    "requireColList": ["ABIS_CE_NUM", "HAS_TP_MATCH"],
    "hideColList": ["ID"],
    freezeCols	: ["ID"],
    "rowStyles": [{
        "name": "color",
        "value": "#d44642",
        "xmlFilter": "<SimpFilter><Group><ColNode Col=\"HAS_TP_MATCH\" Op=\"in\" Dt=\"s\"><Arg Dt=\"s\" Lt=\"const\">Y</Arg></ColNode></Group></SimpFilter>"
    }, {
        "name": "background",
        "value": "#47d424",
        "xmlFilter": "<SimpFilter><Group><ColNode Col=\"HAS_TP_MATCH\" Op=\"in\" Dt=\"s\"><Arg Dt=\"s\" Lt=\"const\">Y</Arg></ColNode></Group></SimpFilter>"
    }, {
        "name": "background",
        "value": "#126934",
        "xmlFilter": "<SimpFilter><Group><ColNode Col=\"CE_STATUS\" Op=\"in\" Dt=\"n\"><Arg Dt=\"n\" Lt=\"const\">2</Arg><Arg Dt=\"n\" Lt=\"const\">3</Arg></ColNode></Group></SimpFilter>"
    }, {
        "name": "color",
        "value": "#1c1c1c",
        "xmlFilter": "<SimpFilter><Group><ColNode Col=\"CE_STATUS\" Op=\"in\" Dt=\"n\"><Arg Dt=\"n\" Lt=\"const\">2</Arg><Arg Dt=\"n\" Lt=\"const\">3</Arg></ColNode></Group></SimpFilter>"
    }]
};

var result = {
    "pageCount": 76,
    "curPage": 1,
    "recordCount": 2253,
    freezeCols	: ["ID"],
    "tblData": {
        "result": [{
            "data": {
                "CE_STATUS": "0__:__未知",
                "CE_TYPE": "0__:__未知",
                "CE_NAME": "盗窃案",
                "ID": "2802",
                "CREATE_TIME": "2018-11-15 19:15:38",
                "HAS_TP_MATCH": "N__:__否",
                "ABIS_CE_NUM": "A1101080000002018111509"
            }, "style": {"HAS_TP_MATCH": {"color": "#11b0fa"}}, "styleRow": {}
        }, {
            "data": {
                "CE_STATUS": "0__:__未知",
                "CE_TYPE": "0__:__未知",
                "CE_NAME": "",
                "ID": "2801",
                "CREATE_TIME": "2018-11-15 17:31:32",
                "HAS_TP_MATCH": "N__:__否",
                "ABIS_CE_NUM": "A1000000000002018111508"
            }, "style": {"HAS_TP_MATCH": {"color": "#11b0fa"}}, "styleRow": {}
        }, {
            "data": {
                "CE_STATUS": "0__:__未知",
                "CE_TYPE": "0__:__未知",
                "CE_NAME": "放火案",
                "ID": "2800",
                "CREATE_TIME": "2018-11-15 17:21:13",
                "HAS_TP_MATCH": "N__:__否",
                "ABIS_CE_NUM": "A1101080000002018111501"
            }, "style": {"HAS_TP_MATCH": {"color": "#11b0fa"}}, "styleRow": {}
        }, {
            "data": {
                "CE_STATUS": "0__:__未知",
                "CE_TYPE": "0__:__未知",
                "CE_NAME": "测试数据rcp",
                "ID": "2799",
                "CREATE_TIME": "2018-11-15 16:00:31",
                "HAS_TP_MATCH": "N__:__否",
                "ABIS_CE_NUM": "A1000000000002018111502"
            }, "style": {"HAS_TP_MATCH": {"color": "#11b0fa"}}, "styleRow": {}
        }, {
            "data": {
                "CE_STATUS": "0__:__未知",
                "CE_TYPE": "0__:__未知",
                "CE_NAME": "嘎嘎嘎",
                "ID": "2798",
                "CREATE_TIME": "2018-11-10 11:29:26",
                "HAS_TP_MATCH": "N__:__否",
                "ABIS_CE_NUM": "A1111114444485824221200"
            }, "style": {"HAS_TP_MATCH": {"color": "#11b0fa"}}, "styleRow": {}
        }, {
            "data": {
                "CE_STATUS": "0__:__未知",
                "CE_TYPE": "0__:__未知",
                "CE_NAME": "",
                "ID": "2797",
                "CREATE_TIME": "2018-11-03 17:19:06",
                "HAS_TP_MATCH": "N__:__否",
                "ABIS_CE_NUM": "A1100000000002018110006"
            }, "style": {"HAS_TP_MATCH": {"color": "#11b0fa"}}, "styleRow": {}
        }, {
            "data": {
                "CE_STATUS": "0__:__未知",
                "CE_TYPE": "0__:__未知",
                "CE_NAME": "发过火",
                "ID": "2796",
                "CREATE_TIME": "2018-11-03 17:16:43",
                "HAS_TP_MATCH": "N__:__否",
                "ABIS_CE_NUM": "A1100000000002018110005"
            }, "style": {"HAS_TP_MATCH": {"color": "#11b0fa"}}, "styleRow": {}
        }, {
            "data": {
                "CE_STATUS": "0__:__未知",
                "CE_TYPE": "0__:__未知",
                "CE_NAME": "A1000000000002018100008",
                "ID": "2795",
                "CREATE_TIME": "2018-11-03 16:59:53",
                "HAS_TP_MATCH": "Y__:__是",
                "ABIS_CE_NUM": "A1000000000002018100008"
            }, "style": {}, "styleRow": {"color": "#d44642", "background": "#47d424"}
        }, {
            "data": {
                "CE_STATUS": "0__:__未知",
                "CE_TYPE": "0__:__未知",
                "CE_NAME": "盗窃案",
                "ID": "2791",
                "CREATE_TIME": "2018-11-03 14:42:35",
                "HAS_TP_MATCH": "N__:__否",
                "ABIS_CE_NUM": "A1000000000002018110301"
            }, "style": {"HAS_TP_MATCH": {"color": "#11b0fa"}}, "styleRow": {}
        }, {
            "data": {
                "CE_STATUS": "0__:__未知",
                "CE_TYPE": "1__:__案件",
                "CE_NAME": "A2202000008382005060283",
                "ID": "2790",
                "CREATE_TIME": "2018-11-02 17:37:55",
                "HAS_TP_MATCH": "Y__:__是",
                "ABIS_CE_NUM": "A1100000000002200000001"
            }, "style": {}, "styleRow": {"color": "#d44642", "background": "#47d424"}
        }, {
            "data": {
                "CE_STATUS": "0__:__未知",
                "CE_TYPE": "1__:__案件",
                "CE_NAME": "A2202000008382005060283",
                "ID": "2789",
                "CREATE_TIME": "2018-11-02 17:36:17",
                "HAS_TP_MATCH": "N__:__否",
                "ABIS_CE_NUM": "A1100000000002100000001"
            }, "style": {"HAS_TP_MATCH": {"color": "#11b0fa"}}, "styleRow": {}
        }, {
            "data": {
                "CE_STATUS": "0__:__未知",
                "CE_TYPE": "1__:__案件",
                "CE_NAME": "A2202000008382005060283",
                "ID": "2788",
                "CREATE_TIME": "2018-11-02 16:34:32",
                "HAS_TP_MATCH": "N__:__否",
                "ABIS_CE_NUM": "A1100000000002000000001"
            }, "style": {"HAS_TP_MATCH": {"color": "#11b0fa"}}, "styleRow": {}
        }, {
            "data": {
                "CE_STATUS": "0__:__未知",
                "CE_TYPE": "1__:__案件",
                "CE_NAME": "A2202000008382005060283",
                "ID": "2787",
                "CREATE_TIME": "2018-11-02 15:47:32",
                "HAS_TP_MATCH": "N__:__否",
                "ABIS_CE_NUM": "A1000000000001900000001"
            }, "style": {"HAS_TP_MATCH": {"color": "#11b0fa"}}, "styleRow": {}
        }, {
            "data": {
                "CE_STATUS": "0__:__未知",
                "CE_TYPE": "1__:__案件",
                "CE_NAME": "A2202000008382005060283",
                "ID": "2786",
                "CREATE_TIME": "2018-11-02 15:41:26",
                "HAS_TP_MATCH": "N__:__否",
                "ABIS_CE_NUM": "A1100000000001800000002"
            }, "style": {"HAS_TP_MATCH": {"color": "#11b0fa"}}, "styleRow": {}
        }, {
            "data": {
                "CE_STATUS": "0__:__未知",
                "CE_TYPE": "1__:__案件",
                "CE_NAME": "A2202000008382005060283",
                "ID": "2785",
                "CREATE_TIME": "2018-11-02 15:00:08",
                "HAS_TP_MATCH": "Y__:__是",
                "ABIS_CE_NUM": "A1100000000001800000001"
            }, "style": {}, "styleRow": {"color": "#d44642", "background": "#47d424"}
        }, {
            "data": {
                "CE_STATUS": "0__:__未知",
                "CE_TYPE": "1__:__案件",
                "CE_NAME": "A2202000008382005060283",
                "ID": "2784",
                "CREATE_TIME": "2018-11-02 14:49:21",
                "HAS_TP_MATCH": "N__:__否",
                "ABIS_CE_NUM": "A2202000008382005060283"
            }, "style": {"HAS_TP_MATCH": {"color": "#11b0fa"}}, "styleRow": {}
        }, {
            "data": {
                "CE_STATUS": "0__:__未知",
                "CE_TYPE": "0__:__未知",
                "CE_NAME": "",
                "ID": "2783",
                "CREATE_TIME": "2018-10-30 14:12:32",
                "HAS_TP_MATCH": "N__:__否",
                "ABIS_CE_NUM": "A1000000000002018101519"
            }, "style": {"HAS_TP_MATCH": {"color": "#11b0fa"}}, "styleRow": {}
        }, {
            "data": {
                "CE_STATUS": "0__:__未知",
                "CE_TYPE": "0__:__未知",
                "CE_NAME": "测试案件录入",
                "ID": "2782",
                "CREATE_TIME": "2018-10-29 14:31:37",
                "HAS_TP_MATCH": "N__:__否",
                "ABIS_CE_NUM": "A1000000000002018101518"
            }, "style": {"HAS_TP_MATCH": {"color": "#11b0fa"}}, "styleRow": {}
        }, {
            "data": {
                "CE_STATUS": "0__:__未知",
                "CE_TYPE": "1__:__案件",
                "CE_NAME": "LA459994509020804001707",
                "ID": "2781",
                "CREATE_TIME": "2018-10-25 11:03:22",
                "HAS_TP_MATCH": "N__:__否",
                "ABIS_CE_NUM": "LA459994509020804001707"
            }, "style": {"HAS_TP_MATCH": {"color": "#11b0fa"}}, "styleRow": {}
        }, {
            "data": {
                "CE_STATUS": "0__:__未知",
                "CE_TYPE": "1__:__案件",
                "CE_NAME": "A4501023100002018010076",
                "ID": "2780",
                "CREATE_TIME": "2018-10-24 13:47:25",
                "HAS_TP_MATCH": "N__:__否",
                "ABIS_CE_NUM": "A4501023100002018010076"
            }, "style": {"HAS_TP_MATCH": {"color": "#11b0fa"}}, "styleRow": {}
        }, {
            "data": {
                "CE_STATUS": "0__:__未知",
                "CE_TYPE": "0__:__未知",
                "CE_NAME": "",
                "ID": "2779",
                "CREATE_TIME": "2018-10-24 13:33:30",
                "HAS_TP_MATCH": "N__:__否",
                "ABIS_CE_NUM": "A1101090000002018100002"
            }, "style": {"HAS_TP_MATCH": {"color": "#11b0fa"}}, "styleRow": {}
        }, {
            "data": {
                "CE_STATUS": "1__:__在侦",
                "CE_TYPE": "1__:__案件",
                "CE_NAME": "挤牙膏的案件测试",
                "ID": "2777",
                "CREATE_TIME": "2018-10-23 15:25:26",
                "HAS_TP_MATCH": "N__:__否",
                "ABIS_CE_NUM": "A1101090000002018100003"
            }, "style": {"HAS_TP_MATCH": {"color": "#11b0fa"}}, "styleRow": {}
        }, {
            "data": {
                "CE_STATUS": "1__:__在侦",
                "CE_TYPE": "0__:__未知",
                "CE_NAME": "",
                "ID": "2776",
                "CREATE_TIME": "2018-10-22 10:22:19",
                "HAS_TP_MATCH": "Y__:__是",
                "ABIS_CE_NUM": "A1000000000002018101517"
            }, "style": {}, "styleRow": {"color": "#d44642", "background": "#47d424"}
        }, {
            "data": {
                "CE_STATUS": "1__:__在侦",
                "CE_TYPE": "1__:__案件",
                "CE_NAME": "",
                "ID": "2775",
                "CREATE_TIME": "2018-10-22 10:18:38",
                "HAS_TP_MATCH": "Y__:__是",
                "ABIS_CE_NUM": "A1000000000002018101516"
            }, "style": {}, "styleRow": {"color": "#d44642", "background": "#47d424"}
        }, {
            "data": {
                "CE_STATUS": "0__:__未知",
                "CE_TYPE": "0__:__未知",
                "CE_NAME": "",
                "ID": "2774",
                "CREATE_TIME": "2018-10-19 17:13:50",
                "HAS_TP_MATCH": "N__:__否",
                "ABIS_CE_NUM": "A1000000000002018101514"
            }, "style": {"HAS_TP_MATCH": {"color": "#11b0fa"}}, "styleRow": {}
        }, {
            "data": {
                "CE_STATUS": "1__:__在侦",
                "CE_TYPE": "1__:__案件",
                "CE_NAME": "Big Big DDa case",
                "ID": "2772",
                "CREATE_TIME": "2018-10-19 16:13:44",
                "HAS_TP_MATCH": "N__:__否",
                "ABIS_CE_NUM": "A1101090000002018100001"
            }, "style": {"HAS_TP_MATCH": {"color": "#11b0fa"}}, "styleRow": {}
        }, {
            "data": {
                "CE_STATUS": "1__:__在侦",
                "CE_TYPE": "1__:__案件",
                "CE_NAME": "big da case",
                "ID": "2771",
                "CREATE_TIME": "2018-10-19 16:11:54",
                "HAS_TP_MATCH": "N__:__否",
                "ABIS_CE_NUM": "A1000000000002018101515"
            }, "style": {"HAS_TP_MATCH": {"color": "#11b0fa"}}, "styleRow": {}
        }, {
            "data": {
                "CE_STATUS": "0__:__未知",
                "CE_TYPE": "0__:__未知",
                "CE_NAME": "A1101043000002007072201",
                "ID": "2769",
                "CREATE_TIME": "2018-10-18 16:39:12",
                "HAS_TP_MATCH": "N__:__否",
                "ABIS_CE_NUM": "A1101043000002007072201"
            }, "style": {"HAS_TP_MATCH": {"color": "#11b0fa"}}, "styleRow": {}
        }, {
            "data": {
                "CE_STATUS": "0__:__未知",
                "CE_TYPE": "1__:__案件",
                "CE_NAME": "A5200002288201100000004",
                "ID": "2766",
                "CREATE_TIME": "2018-10-18 15:47:38",
                "HAS_TP_MATCH": "N__:__否",
                "ABIS_CE_NUM": "A5200002288201100000004"
            }, "style": {"HAS_TP_MATCH": {"color": "#11b0fa"}}, "styleRow": {}
        }, {
            "data": {
                "CE_STATUS": "0__:__未知",
                "CE_TYPE": "0__:__未知",
                "CE_NAME": "",
                "ID": "2765",
                "CREATE_TIME": "2018-10-18 15:15:03",
                "HAS_TP_MATCH": "N__:__否",
                "ABIS_CE_NUM": "A1000000000002018101513"
            }, "style": {"HAS_TP_MATCH": {"color": "#11b0fa"}}, "styleRow": {}
        }],
        "headerText": {
            "CE_STATUS": "案件状态",
            "CE_TYPE": "案事件类型",
            "CE_NAME": "案事件名称",
            "ID": "ID",
            "CREATE_TIME": "创建时间",
            "HAS_TP_MATCH": "是否捺印比中",
            "ABIS_CE_NUM": "指掌纹系统案件编号"
        },
        "dataType": {
            "CE_STATUS": 0,
            "CE_TYPE": 0,
            "CE_NAME": 2,
            "ID": 0,
            "CREATE_TIME": 3,
            "HAS_TP_MATCH": 2,
            "ABIS_CE_NUM": 2
        },
        "hideColList": [],
        "header": ["ID", "ABIS_CE_NUM", "CE_STATUS", "CE_NAME", "CE_TYPE", "CREATE_TIME", "HAS_TP_MATCH"]
    },
    "pageSize": 30,
    "freezeCols": [],
    "status": "ok"
};

var ABISCode = {};
ABISCode.DBDataType =
    {
        DB_INT: 0,
        DB_FLOAT: 1,
        DB_STRING: 2,
        DB_DATE: 3,
        DB_CLOB: 4,
        DB_RAW: 5,
        DB_OBJECT: 6,
        DB_LIST: 7,
        DB_BLOB: 8
    };
var pageNumLan ={"FirstPage":"首页","TotalPage":"(共 {0} 页)","PreviousPage":"上一页","RecordsPage":"条\/页","TotalRecords":"总数","Page":"页","To":"到","webpage_jump":"跳转","NextPage":"下一页","LastPage":"末页"};