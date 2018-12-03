var Resource = {
    "year": "年", "month": "月", day: "日"
}
var timeInterval = 3*1000;
var DateType = {
    "year": "year", "month": "month", day: "day"
};
//测试数据
var lpdata = {"year": [], "month": [], day: []};
lpdata.day = [];
lpdata.day.push({"unitCode": "", "unitName": "海淀", data: [{"name": "勘查现场数", "count": 3000}, {"name": "现场指掌纹采集数", "count": 3000}]})
lpdata.day.push({"unitCode": "", "unitName": "朝阳", data: [{"name": "勘查现场数", "count": 2555}, {"name": "现场指掌纹采集数", "count": 1500}]})
lpdata.day.push({"unitCode": "", "unitName": "丰台", data: [{"name": "勘查现场数", "count": 1000}, {"name": "现场指掌纹采集数", "count": 1500}]})
lpdata.day.push({"unitCode": "", "unitName": "房山", data: [{"name": "勘查现场数", "count": 1000}, {"name": "现场指掌纹采集数", "count": 1500}]})
lpdata.day.push({"unitCode": "", "unitName": "昌平", data: [{"name": "勘查现场数", "count": 2000}, {"name": "现场指掌纹采集数", "count": 1005}]})
lpdata.day.push({"unitCode": "", "unitName": "石景山", data: [{"name": "勘查现场数", "count": 1000}, {"name": "现场指掌纹采集数", "count": 1005}]})
lpdata.day.push({"unitCode": "", "unitName": "通州", data: [{"name": "勘查现场数", "count": 1000}, {"name": "现场指掌纹采集数", "count": 1005}]})
lpdata.day.push({"unitCode": "", "unitName": "亦庄", data: [{"name": "勘查现场数", "count": 1000}, {"name": "现场指掌纹采集数", "count": 1005}]})

lpdata.month = [];
lpdata.month.push({"unitCode": "", "unitName": "海淀", data: [{"name": "勘查现场数", "count": 100}, {"name": "现场指掌纹采集数", "count": 150}]})
lpdata.month.push({"unitCode": "", "unitName": "朝阳", data: [{"name": "勘查现场数", "count": 500}, {"name": "现场指掌纹采集数", "count": 150}]})
lpdata.month.push({"unitCode": "", "unitName": "丰台", data: [{"name": "勘查现场数", "count": 100}, {"name": "现场指掌纹采集数", "count": 150}]})
lpdata.month.push({"unitCode": "", "unitName": "房山", data: [{"name": "勘查现场数", "count": 100}, {"name": "现场指掌纹采集数", "count": 150}]})
lpdata.month.push({"unitCode": "", "unitName": "昌平", data: [{"name": "勘查现场数", "count": 200}, {"name": "现场指掌纹采集数", "count": 150}]})
lpdata.month.push({"unitCode": "", "unitName": "石景山", data: [{"name": "勘查现场数", "count": 100}, {"name": "现场指掌纹采集数", "count": 105}]})
lpdata.month.push({"unitCode": "", "unitName": "通州", data: [{"name": "勘查现场数", "count": 100}, {"name": "现场指掌纹采集数", "count": 105}]})
lpdata.month.push({"unitCode": "", "unitName": "亦庄", data: [{"name": "勘查现场数", "count": 100}, {"name": "现场指掌纹采集数", "count": 105}]})

lpdata.year = [];
lpdata.year.push({"unitCode": "", "unitName": "海淀", data: [{"name": "勘查现场数", "count": 10}, {"name": "现场指掌纹采集数", "count": 15}]})
lpdata.year.push({"unitCode": "", "unitName": "朝阳", data: [{"name": "勘查现场数", "count": 100}, {"name": "现场指掌纹采集数", "count": 150}]})
lpdata.year.push({"unitCode": "", "unitName": "丰台", data: [{"name": "勘查现场数", "count": 10}, {"name": "现场指掌纹采集数", "count": 15}]})
lpdata.year.push({"unitCode": "", "unitName": "房山", data: [{"name": "勘查现场数", "count": 10}, {"name": "现场指掌纹采集数", "count": 15}]})
lpdata.year.push({"unitCode": "", "unitName": "昌平", data: [{"name": "勘查现场数", "count": 20}, {"name": "现场指掌纹采集数", "count": 15}]})
lpdata.year.push({"unitCode": "", "unitName": "石景山", data: [{"name": "勘查现场数", "count": 10}, {"name": "现场指掌纹采集数", "count": 15}]})
lpdata.year.push({"unitCode": "", "unitName": "通州", data: [{"name": "勘查现场数", "count": 10}, {"name": "现场指掌纹采集数", "count": 15}]})
lpdata.year.push({"unitCode": "", "unitName": "亦庄", data: [{"name": "勘查现场数", "count": 10}, {"name": "现场指掌纹采集数", "count": 15}]})


var tpdata = {"year": [], "month": [], day: []};
tpdata.year = [];
tpdata.year.push({"unitCode": "", "unitName": "朝阳", data: [{"name": "人员采集数", "count": 20000}]});
tpdata.year.push({"unitCode": "", "unitName": "海淀", data: [{"name": "人员采集数", "count": 10900}]});
tpdata.year.push({"unitCode": "", "unitName": "丰台", data: [{"name": "人员采集数", "count": 10100}]});
tpdata.year.push({"unitCode": "", "unitName": "房山", data: [{"name": "人员采集数", "count": 5000}]});
tpdata.year.push({"unitCode": "", "unitName": "昌平", data: [{"name": "人员采集数", "count": 2000}]});
tpdata.year.push({"unitCode": "", "unitName": "石景山", data: [{"name": "人员采集数", "count": 1500}]});
tpdata.year.push({"unitCode": "", "unitName": "通州", data: [{"name": "人员采集数", "count": 1200}]});
tpdata.year.push({"unitCode": "", "unitName": "亦庄", data: [{"name": "人员采集数", "count": 1000}]});
tpdata.month = [];
tpdata.month.push({"unitCode": "", "unitName": "朝阳", data: [{"name": "人员采集数", "count": 1500}]});
tpdata.month.push({"unitCode": "", "unitName": "海淀", data: [{"name": "人员采集数", "count": 1090}]});
tpdata.month.push({"unitCode": "", "unitName": "丰台", data: [{"name": "人员采集数", "count": 1010}]});
tpdata.month.push({"unitCode": "", "unitName": "房山", data: [{"name": "人员采集数", "count": 500}]});
tpdata.month.push({"unitCode": "", "unitName": "昌平", data: [{"name": "人员采集数", "count": 200}]});
tpdata.month.push({"unitCode": "", "unitName": "石景山", data: [{"name": "人员采集数", "count": 150}]});
tpdata.month.push({"unitCode": "", "unitName": "通州", data: [{"name": "人员采集数", "count": 120}]});
tpdata.month.push({"unitCode": "", "unitName": "亦庄", data: [{"name": "人员采集数", "count": 100}]});
tpdata.day = [];
tpdata.day.push({"unitCode": "", "unitName": "海淀", data: [{"name": "人员采集数", "count": 109}]});
tpdata.day.push({"unitCode": "", "unitName": "丰台", data: [{"name": "人员采集数", "count": 101}]});
tpdata.day.push({"unitCode": "", "unitName": "朝阳", data: [{"name": "人员采集数", "count": 90}]});
tpdata.day.push({"unitCode": "", "unitName": "房山", data: [{"name": "人员采集数", "count": 50}]});
tpdata.day.push({"unitCode": "", "unitName": "昌平", data: [{"name": "人员采集数", "count": 20}]});
tpdata.day.push({"unitCode": "", "unitName": "石景山", data: [{"name": "人员采集数", "count": 15}]});
tpdata.day.push({"unitCode": "", "unitName": "通州", data: [{"name": "人员采集数", "count": 12}]});
tpdata.day.push({"unitCode": "", "unitName": "亦庄", data: [{"name": "人员采集数", "count": 10}]});


var hitdata = {"year": [], "month": [], day: []};
hitdata.year = [];
hitdata.year.push({
    "name": "比对任务",
    "data": [{"name": "查重", value: 7000},{"name": "倒查", value: 4000}, {"name": "正查", value: 3000},{
        "name": "串查",
        value: 1500
    }]
});
hitdata.year.push({
    "name": "比中信息",
    "data": [{"name": "查重", value: 1000}, {"name": "倒查", value: 2000}, {"name": "正查", value: 3000}, {
        "name": "串查",
        value: 4000
    }]
});
hitdata.month = [];
hitdata.month.push({
    "name": "比对任务",
    "data": [{"name": "查重", value: 7000},{"name": "倒查", value: 4000}, {"name": "正查", value: 3000},{
        "name": "串查",
        value: 1500
    }]
});
hitdata.month.push({
    "name": "比中信息",
    "data": [{"name": "查重", value: 22}, {"name": "倒查", value: 22}, {"name": "正查", value: 22}, {
        "name": "串查",
        value: 22
    }]
});
hitdata.day = [];
hitdata.day.push({
    "name": "比对任务",
    "data": [{"name": "查重", value: 7},{"name": "倒查", value: 9}, {"name": "正查", value: 8},{
        "name": "串查",
        value: 12
    }]
});
hitdata.day.push({
    "name": "比中信息",
    "data": [{"name": "查重", value: 10}, {"name": "倒查", value: 20}, {"name": "正查", value: 30}, {
        "name": "串查",
        value: 40
    }]
});






