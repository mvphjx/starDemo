//页面组件类型
var InputType =
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
        CandFgps: 'CandFgps',//指位暂时特殊处理
        Title: 'Title'//标题行特殊处理
    };
var WebVar = {
    VarPath: "http://192.168.129.148:7950/abisweb",
    ImgOcxBg: 0x8c8d8b,
    TimeOut: 10000
};
//元数据
var demoColumnConfigs = [];
demoColumnConfigs.push({
        'id': 'mainInfo_And_personNum',
        'inputType': '1',
        'validate': {notUpdata:true,isRequired:true,'maxlength': 23, minlength: 23},
        'columnName': 'TP_CARD_INFO|PERSON_NUM'
    }
);
demoColumnConfigs.push({
    'id': 'tpCardInfo_And_printUnitCode',
    'showText': false,
    'inputType': '0',
    'columnName': 'TP_CARD_INFO|PRINT_UNIT_CODE',
    'relatid': 'tpCardInfo_And_printUnitNamediv',
    'all': false,
    columnCatlog:{}
});
demoColumnConfigs.push({'id':'tpCardInfo_And_printUnitName','columnName': 'TP_CARD_INFO|PRINT_UNIT_NAME','inputType':'5'});
demoColumnConfigs.push({'id':'tpCardInfo_And_printDate','columnName': 'TP_CARD_INFO|PRINT_DATE','inputType':'2'});
//模板配置
var tpTextInfoConfig = {columnConfigs:[],columnCatlogs:""};
tpTextInfoConfig.columnConfigs.push({inputType: InputType.Title, title: "基本信息"});
tpTextInfoConfig.columnConfigs.push({
    'id': 'mainInfo_And_personNum',
    'inputType': '1',
    'validate': {notUpdata: true, isRequired: true, 'maxlength': 23, minlength: 23},
    'columnName': 'TP_CARD_INFO|PERSON_NUM'
});
var  columnCatlogs=[];
columnCatlogs.push({
    "codeDispStyle": 0,
    "codeFmt": null,
    "codeTableName": "",
    "colDispName": "人员编号",
    "colDispWidth": 100,
    "columnName": "PERSON_NUM",
    "cpCodeCol": null,
    "dataFmt": null,
    "dataType": 0,
    "description": "",
    "entityAttrType": null,
    "id": 46910,
    "inputCode": "",
    "macroType": 0,
    "storageFmt": 0,
    "tableName": "TP_CARD_INFO"
});
columnCatlogs.push({
    "codeDispStyle": 0,
    "codeFmt": null,
    "codeTableName": "",
    "colDispName": "捺印单位代码",
    "colDispWidth": 100,
    "columnName": "PRINT_UNIT_CODE",
    "cpCodeCol": null,
    "dataFmt": null,
    "dataType": 0,
    "description": "",
    "entityAttrType": null,
    "id": 46910,
    "inputCode": "",
    "macroType": 0,
    "storageFmt": 0,
    "tableName": "TP_CARD_INFO"
});
columnCatlogs.push({
    "codeDispStyle": 0,
    "codeFmt": null,
    "codeTableName": "",
    "colDispName": "捺印单位名称",
    "colDispWidth": 100,
    "columnName": "PRINT_UNIT_NAME",
    "cpCodeCol": null,
    "dataFmt": null,
    "dataType": 0,
    "description": "",
    "entityAttrType": null,
    "id": 46910,
    "inputCode": "",
    "macroType": 0,
    "storageFmt": 0,
    "tableName": "TP_CARD_INFO"
});
columnCatlogs.push({
    "codeDispStyle": 0,
    "codeFmt": null,
    "codeTableName": "",
    "colDispName": "捺印日期",
    "colDispWidth": 100,
    "columnName": "PRINT_DATE",
    "cpCodeCol": null,
    "dataFmt": null,
    "dataType": 0,
    "description": "",
    "entityAttrType": null,
    "id": 46910,
    "inputCode": "",
    "macroType": 0,
    "storageFmt": 0,
    "tableName": "TP_CARD_INFO"
});

