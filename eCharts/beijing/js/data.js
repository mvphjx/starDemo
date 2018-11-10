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
hitdata.year.push({"name":"倒查案件数","count":2587});
hitdata.year.push({"name":"正查指纹数","count":1765});






