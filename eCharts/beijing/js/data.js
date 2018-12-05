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
lpdata.day.push({"unitCode": "", "unitName": "海淀", data: 	 [{"name": "勘查现场数", "count": 300}, {"name": "现场指掌纹采集数", "count": 190}]});
lpdata.day.push({"unitCode": "", "unitName": "朝阳", data: 	 [{"name": "勘查现场数", "count": 255}, {"name": "现场指掌纹采集数", "count": 150}]});
lpdata.day.push({"unitCode": "", "unitName": "丰台", data: 	 [{"name": "勘查现场数", "count": 150}, {"name": "现场指掌纹采集数", "count": 150}]});
lpdata.day.push({"unitCode": "", "unitName": "房山", data: 	 [{"name": "勘查现场数", "count": 130}, {"name": "现场指掌纹采集数", "count": 150}]});
lpdata.day.push({"unitCode": "", "unitName": "昌平", data: 	 [{"name": "勘查现场数", "count": 130}, {"name": "现场指掌纹采集数", "count": 105}]});
lpdata.day.push({"unitCode": "", "unitName": "石景山", data: [{"name": "勘查现场数", "count": 120}, {"name": "现场指掌纹采集数", "count": 105}]});
lpdata.day.push({"unitCode": "", "unitName": "通州", data:   [{"name": "勘查现场数", "count": 120}, {"name": "现场指掌纹采集数", "count": 105}]});
lpdata.day.push({"unitCode": "", "unitName": "大兴", data:   [{"name": "勘查现场数", "count": 120}, {"name": "现场指掌纹采集数", "count": 100}]});
lpdata.day.push({"unitCode": "", "unitName": "门头沟", data: [{"name": "勘查现场数", "count": 100}, {"name": "现场指掌纹采集数", "count": 95}]});
lpdata.day.push({"unitCode": "", "unitName": "东城", data:   [{"name": "勘查现场数", "count": 90}, {"name": "现场指掌纹采集数", "count": 88}]});
lpdata.day.push({"unitCode": "", "unitName": "西城", data:   [{"name": "勘查现场数", "count": 89}, {"name": "现场指掌纹采集数", "count": 83}]});
lpdata.day.push({"unitCode": "", "unitName": "密云", data:   [{"name": "勘查现场数", "count": 86}, {"name": "现场指掌纹采集数", "count": 82}]});
lpdata.day.push({"unitCode": "", "unitName": "怀柔", data:   [{"name": "勘查现场数", "count": 85}, {"name": "现场指掌纹采集数", "count": 80}]});
lpdata.day.push({"unitCode": "", "unitName": "顺义", data:   [{"name": "勘查现场数", "count": 75}, {"name": "现场指掌纹采集数", "count": 72}]});
lpdata.day.push({"unitCode": "", "unitName": "延庆", data:   [{"name": "勘查现场数", "count": 65}, {"name": "现场指掌纹采集数", "count": 60}]});
lpdata.day.push({"unitCode": "", "unitName": "平谷", data:   [{"name": "勘查现场数", "count": 45}, {"name": "现场指掌纹采集数", "count": 40}]});

lpdata.month = [];
lpdata.month.push({"unitCode": "", "unitName": "海淀", data: [{"name": "勘查现场数", "count": 650}, {"name": "现场指掌纹采集数", "count": 588}]});
lpdata.month.push({"unitCode": "", "unitName": "朝阳", data: [{"name": "勘查现场数", "count": 630}, {"name": "现场指掌纹采集数", "count": 512}]});
lpdata.month.push({"unitCode": "", "unitName": "丰台", data: [{"name": "勘查现场数", "count": 620}, {"name": "现场指掌纹采集数", "count": 510}]});
lpdata.month.push({"unitCode": "", "unitName": "房山", data: [{"name": "勘查现场数", "count": 620}, {"name": "现场指掌纹采集数", "count": 490}]});
lpdata.month.push({"unitCode": "", "unitName": "昌平", data: [{"name": "勘查现场数", "count": 600}, {"name": "现场指掌纹采集数", "count": 480}]});
lpdata.month.push({"unitCode": "", "unitName": "石景山", data: [{"name": "勘查现场数", "count": 580}, {"name": "现场指掌纹采集数", "count": 465}]});
lpdata.month.push({"unitCode": "", "unitName": "通州", data: [{"name": "勘查现场数", "count": 560}, {"name": "现场指掌纹采集数", "count": 455}]});
lpdata.month.push({"unitCode": "", "unitName": "大兴", data: [{"name": "勘查现场数", "count": 550}, {"name": "现场指掌纹采集数", "count": 415}]});
lpdata.month.push({"unitCode": "", "unitName": "门头沟", data: [{"name": "勘查现场数", "count": 500}, {"name": "现场指掌纹采集数", "count": 365}]});
lpdata.month.push({"unitCode": "", "unitName": "东城", data: [{"name": "勘查现场数", "count": 450}, {"name": "现场指掌纹采集数", "count": 345}]});
lpdata.month.push({"unitCode": "", "unitName": "西城", data: [{"name": "勘查现场数", "count": 420}, {"name": "现场指掌纹采集数", "count": 325}]});
lpdata.month.push({"unitCode": "", "unitName": "密云", data: [{"name": "勘查现场数", "count": 400}, {"name": "现场指掌纹采集数", "count": 255}]});
lpdata.month.push({"unitCode": "", "unitName": "怀柔", data: [{"name": "勘查现场数", "count": 350}, {"name": "现场指掌纹采集数", "count": 235}]});
lpdata.month.push({"unitCode": "", "unitName": "顺义", data: [{"name": "勘查现场数", "count": 320}, {"name": "现场指掌纹采集数", "count": 215}]});
lpdata.month.push({"unitCode": "", "unitName": "延庆", data: [{"name": "勘查现场数", "count": 300}, {"name": "现场指掌纹采集数", "count": 151}]});
lpdata.month.push({"unitCode": "", "unitName": "平谷", data: [{"name": "勘查现场数", "count": 200}, {"name": "现场指掌纹采集数", "count": 105}]});

lpdata.year = [];
lpdata.year.push({"unitCode": "", "unitName": "海淀", data: [{"name": "勘查现场数", "count": 3000}, {"name": "现场指掌纹采集数", "count": 3000}]});
lpdata.year.push({"unitCode": "", "unitName": "朝阳", data: [{"name": "勘查现场数", "count": 2555}, {"name": "现场指掌纹采集数", "count": 1500}]});
lpdata.year.push({"unitCode": "", "unitName": "丰台", data: [{"name": "勘查现场数", "count": 1450}, {"name": "现场指掌纹采集数", "count": 1500}]});
lpdata.year.push({"unitCode": "", "unitName": "房山", data: [{"name": "勘查现场数", "count": 1350}, {"name": "现场指掌纹采集数", "count": 1500}]});
lpdata.year.push({"unitCode": "", "unitName": "昌平", data: [{"name": "勘查现场数", "count": 1300}, {"name": "现场指掌纹采集数", "count": 1005}]});
lpdata.year.push({"unitCode": "", "unitName": "石景山", data: [{"name": "勘查现场数", "count": 1250}, {"name": "现场指掌纹采集数", "count": 1005}]})
lpdata.year.push({"unitCode": "", "unitName": "通州", data: [{"name": "勘查现场数", "count": 1220}, {"name": "现场指掌纹采集数", "count": 1005}]});
lpdata.year.push({"unitCode": "", "unitName": "大兴", data: [{"name": "勘查现场数", "count": 1220}, {"name": "现场指掌纹采集数", "count": 1000}]});
lpdata.year.push({"unitCode": "", "unitName": "门头沟", data: [{"name": "勘查现场数", "count": 1000}, {"name": "现场指掌纹采集数", "count": 950}]});
lpdata.year.push({"unitCode": "", "unitName": "东城", data: [{"name": "勘查现场数", "count": 900}, {"name": "现场指掌纹采集数", "count": 880}]});  
lpdata.year.push({"unitCode": "", "unitName": "西城", data: [{"name": "勘查现场数", "count": 890}, {"name": "现场指掌纹采集数", "count": 830}]});  
lpdata.year.push({"unitCode": "", "unitName": "密云", data: [{"name": "勘查现场数", "count": 860}, {"name": "现场指掌纹采集数", "count": 820}]});  
lpdata.year.push({"unitCode": "", "unitName": "怀柔", data: [{"name": "勘查现场数", "count": 850}, {"name": "现场指掌纹采集数", "count": 800}]});  
lpdata.year.push({"unitCode": "", "unitName": "顺义", data: [{"name": "勘查现场数", "count": 750}, {"name": "现场指掌纹采集数", "count": 720}]});  
lpdata.year.push({"unitCode": "", "unitName": "延庆", data: [{"name": "勘查现场数", "count": 650}, {"name": "现场指掌纹采集数", "count": 600}]});  
lpdata.year.push({"unitCode": "", "unitName": "平谷", data: [{"name": "勘查现场数", "count": 450}, {"name": "现场指掌纹采集数", "count": 400}]});  


var tpdata = {"year": [], "month": [], day: []};
tpdata.year = [];
tpdata.year.push({"unitCode": "", "unitName": "朝阳", data: [{"name": "人员采集数", "count": 5000}]});
tpdata.year.push({"unitCode": "", "unitName": "海淀", data: [{"name": "人员采集数", "count": 4900}]});
tpdata.year.push({"unitCode": "", "unitName": "丰台", data: [{"name": "人员采集数", "count": 4100}]});
tpdata.year.push({"unitCode": "", "unitName": "房山", data: [{"name": "人员采集数", "count": 4000}]});
tpdata.year.push({"unitCode": "", "unitName": "昌平", data: [{"name": "人员采集数", "count": 2500}]});
tpdata.year.push({"unitCode": "", "unitName": "石景山", data: [{"name": "人员采集数", "count": 2200}]});
tpdata.year.push({"unitCode": "", "unitName": "通州", data: [{"name": "人员采集数", "count": 2100}]});
tpdata.year.push({"unitCode": "", "unitName": "大兴", data: [{"name": "人员采集数", "count": 2000}]});
tpdata.year.push({"unitCode": "", "unitName": "门头沟", data: [{"name": "人员采集数", "count": 1900}]});
tpdata.year.push({"unitCode": "", "unitName": "东城", data: [{"name": "人员采集数", "count": 1800}]});
tpdata.year.push({"unitCode": "", "unitName": "西城", data: [{"name": "人员采集数", "count": 1700}]});
tpdata.year.push({"unitCode": "", "unitName": "密云", data: [{"name": "人员采集数", "count": 1600}]});
tpdata.year.push({"unitCode": "", "unitName": "怀柔", data: [{"name": "人员采集数", "count": 1500}]});
tpdata.year.push({"unitCode": "", "unitName": "顺义", data: [{"name": "人员采集数", "count": 1400}]});
tpdata.year.push({"unitCode": "", "unitName": "延庆", data: [{"name": "人员采集数", "count": 1300}]});
tpdata.year.push({"unitCode": "", "unitName": "平谷", data: [{"name": "人员采集数", "count": 1200}]});

tpdata.month = [];
tpdata.month.push({"unitCode": "", "unitName": "朝阳", data: [{"name": "人员采集数", "count": 1500}]});
tpdata.month.push({"unitCode": "", "unitName": "海淀", data: [{"name": "人员采集数", "count": 1090}]});
tpdata.month.push({"unitCode": "", "unitName": "丰台", data: [{"name": "人员采集数", "count": 1010}]});
tpdata.month.push({"unitCode": "", "unitName": "房山", data: [{"name": "人员采集数", "count": 1000}]});
tpdata.month.push({"unitCode": "", "unitName": "昌平", data: [{"name": "人员采集数", "count": 900}]});
tpdata.month.push({"unitCode": "", "unitName": "石景山", data: [{"name": "人员采集数", "count": 850}]});
tpdata.month.push({"unitCode": "", "unitName": "通州", data: [{"name": "人员采集数", "count": 840}]});
tpdata.month.push({"unitCode": "", "unitName": "大兴", data: [{"name": "人员采集数", "count": 830}]});
tpdata.month.push({"unitCode": "", "unitName": "门头沟", data: [{"name": "人员采集数", "count": 800}]});
tpdata.month.push({"unitCode": "", "unitName": "东城", data: [{"name": "人员采集数", "count": 790}]});
tpdata.month.push({"unitCode": "", "unitName": "西城", data: [{"name": "人员采集数", "count": 760}]});
tpdata.month.push({"unitCode": "", "unitName": "密云", data: [{"name": "人员采集数", "count": 740}]});
tpdata.month.push({"unitCode": "", "unitName": "怀柔", data: [{"name": "人员采集数", "count": 730}]});
tpdata.month.push({"unitCode": "", "unitName": "顺义", data: [{"name": "人员采集数", "count": 720}]});
tpdata.month.push({"unitCode": "", "unitName": "延庆", data: [{"name": "人员采集数", "count": 650}]});
tpdata.month.push({"unitCode": "", "unitName": "平谷", data: [{"name": "人员采集数", "count": 600}]});
tpdata.day = [];
tpdata.day.push({"unitCode": "", "unitName": "海淀", data: [{"name": "人员采集数", "count": 109}]});
tpdata.day.push({"unitCode": "", "unitName": "丰台", data: [{"name": "人员采集数", "count": 101}]});
tpdata.day.push({"unitCode": "", "unitName": "朝阳", data: [{"name": "人员采集数", "count": 90}]});
tpdata.day.push({"unitCode": "", "unitName": "房山", data: [{"name": "人员采集数", "count": 60}]});
tpdata.day.push({"unitCode": "", "unitName": "昌平", data: [{"name": "人员采集数", "count": 50}]});
tpdata.day.push({"unitCode": "", "unitName": "石景山", data: [{"name": "人员采集数", "count": 45}]});
tpdata.day.push({"unitCode": "", "unitName": "通州", data: [{"name": "人员采集数", "count": 32}]});
tpdata.day.push({"unitCode": "", "unitName": "大兴", data: [{"name": "人员采集数", "count": 30}]});
tpdata.day.push({"unitCode": "", "unitName": "门头沟", data: [{"name": "人员采集数", "count": 22}]});
tpdata.day.push({"unitCode": "", "unitName": "东城", data: [{"name": "人员采集数", "count": 18}]});
tpdata.day.push({"unitCode": "", "unitName": "西城", data: [{"name": "人员采集数", "count": 16}]});
tpdata.day.push({"unitCode": "", "unitName": "密云", data: [{"name": "人员采集数", "count": 15}]});
tpdata.day.push({"unitCode": "", "unitName": "怀柔", data: [{"name": "人员采集数", "count": 12}]});
tpdata.day.push({"unitCode": "", "unitName": "顺义", data: [{"name": "人员采集数", "count": 12}]});
tpdata.day.push({"unitCode": "", "unitName": "延庆", data: [{"name": "人员采集数", "count": 10}]});
tpdata.day.push({"unitCode": "", "unitName": "平谷", data: [{"name": "人员采集数", "count": 8}]});


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






