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
//元数据
var demoColumnConfigs = [];
demoColumnConfigs.push({
        'id': 'mainInfo_And_personNum',
        'inputType': '1',
        'validate': {notUpdata:true,isRequired:true,'maxlength': 23, minlength: 23},
        'columnName': 'TP_CARD_INFO|PERSON_NUM',
        columnCatlog:
            {
                "codeDispStyle": 0,
                "codeFmt": null,
                "codeTableName": "",
                "colDispName": "人员编号",
                "colDispWidth": 100,
                "columnName": "DIY_NUM",
                "cpCodeCol": null,
                "dataFmt": null,
                "dataType": 0,
                "description": "",
                "entityAttrType": null,
                "id": 46910,
                "inputCode": "",
                "macroType": 0,
                "storageFmt": 0,
                "tableName": "_BASE_8CDD25A0_TP_DIY_INFO"
            }
    }
);
demoColumnConfigs.push({
    'id': 'tpCardInfo_And_printUnitCode',
    'showText': false,
    'inputType': '0',
    'columnName': 'TP_CARD_INFO|PRINT_UNIT_CODE',
    'relatid': 'tpCardInfo_And_printUnitNamediv',
    'all': false,
    columnCatlog: {
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
        "tableName": "_BASE_8CDD25A0_TP_DIY_INFO"
    }
});
//模板配置
var tpTextInfoConfig = [];
tpTextInfoConfig.push({inputType: InputType.Title, title: "基本信息"});
tpTextInfoConfig.push({
    'id': 'mainInfo_And_personNum',
    'inputType': '1',
    'validate': {notUpdata: true, isRequired: true, 'maxlength': 23, minlength: 23},
    'columnName': 'TP_CARD_INFO|PERSON_NUM'
});

