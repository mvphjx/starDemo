var Resource = {
    "year": "年", "month": "月", day: "日"
}
//测试数据
var lpdata = {"year": [], "month": [], day: []};
lpdata.day = [{
    "unitCode": "",
    "unitName": "海淀",
    data: [{"name": "勘查现场数", "count": 10}, {"name": "现场指掌纹采集数", "count": 15}]
}, {"unitCode": "", "unitName": "丰台", data: [{"name": "勘查现场数", "count": 10}, {"name": "现场指掌纹采集数", "count": 15}]}];
lpdata.month = [{
    "unitCode": "",
    "unitName": "海淀",
    data: [{"name": "勘查现场数", "count": 100}, {"name": "现场指掌纹采集数", "count": 150}]
}, {"unitCode": "", "unitName": "丰台", data: [{"name": "勘查现场数", "count": 10}, {"name": "现场指掌纹采集数", "count": 15}]}];
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
tpdata.year.push({"unitCode": "", "unitName": "朝阳", data: [{"name": "人员采集数", "count": 1000}]});
tpdata.year.push({"unitCode": "", "unitName": "海淀", data: [{"name": "人员采集数", "count": 109}]});
tpdata.year.push({"unitCode": "", "unitName": "丰台", data: [{"name": "人员采集数", "count": 101}]});
tpdata.year.push({"unitCode": "", "unitName": "房山", data: [{"name": "人员采集数", "count": 50}]});
tpdata.year.push({"unitCode": "", "unitName": "昌平", data: [{"name": "人员采集数", "count": 20}]});
tpdata.year.push({"unitCode": "", "unitName": "石景山", data: [{"name": "人员采集数", "count": 15}]});
tpdata.year.push({"unitCode": "", "unitName": "通州", data: [{"name": "人员采集数", "count": 12}]});
tpdata.year.push({"unitCode": "", "unitName": "亦庄", data: [{"name": "人员采集数", "count": 10}]});


var hitdata = {"year": [], "month": [], day: []};
hitdata.year = [];
hitdata.year.push({
    "name": "比对任务",
    "count": 2587,
    "data": [{"name": "查重", value: 70},{
        "name": "串查",
        value: 15
    }, {"name": "倒查", value: 40}, {"name": "正查", value: 30} ]
});
hitdata.year.push({
    "name": "比中信息",
    "count": 1223,
    "data": [{"name": "查重", value: 10}, {"name": "倒查", value: 20}, {"name": "正查", value: 30}, {
        "name": "串查",
        value: 40
    }]
});






