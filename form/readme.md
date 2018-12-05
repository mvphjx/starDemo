#开发一个简单表单设计器

##背景：

*  文字信息模板需求变更：
    
    字段显示隐藏需要定制，如果模板硬编码，完全按照用户要求可能会引起不必要的矛盾；
    
    用户对布局有定制需求，例如：必填项需要突出显示
    
*  bs cs客户端模板不统一

*  有的项目有自定义字段的需求


##设计：
###web页面提供表单设计器

主要功能
*  配置字段布局 
*  配置字段显示隐藏
*  配置是否必填
*  配置是否支持更新
*  保存模板入库

###客户端使用同一模板
界面展示，基于数据库表单配置以及列描述，客户端需要
*  读取模板配置
*  解析模板配置，获取列描述





            {
            	"columnConfigs": [{
            		"inputType": "Title", //标题
            		"title": "基本信息",
            		"validate": {
            			"notUpdata": false,
            			"isRequired": false
            		}
            	}, {
            		"id": "mainInfo_And_personNum", //字段 人员编号
            		"inputType": "1",
            		"validate": {
            			"notUpdata": true,
            			"isRequired": true,
            			"maxlength": 23,
            			"minlength": 23
            		},
            		"columnName": "TP_CARD_INFO|PERSON_NUM",
            		"columnCatlog": {  //入库是否携带  绑定列描述？
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
            		}
            	}, {
            		"id": "tpCardInfo_And_printUnitCode",  //字段 捺印单位代码
            		"showText": false,
            		"inputType": "0",
            		"columnName": "TP_CARD_INFO|PRINT_UNIT_CODE",
            		"relatid": "tpCardInfo_And_printUnitNamediv",
            		"all": false,
            		"columnCatlog": {
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
            		},
            		"validate": {
            			"notUpdata": false,
            			"isRequired": false
            		}
            	}],
            	"columnCatlogs": "TP_CARD_INFO|PERSON_NUM,TP_CARD_INFO|PRINT_UNIT_CODE"
            }
    







