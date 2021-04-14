var nodes = null;
var edges = null;
var network = null;

// Called when the Visualization API is loaded.
function draw() {
    // create people.
    // value corresponds with the age of the person
    var DIR = "../image/";
    nodes = [
        {
            id: 1,
            shape: "circularImage",
            image: DIR + "1.png",
            physics: false,
            title: '人员编号：<a href="#" target="_blank" setting="{id:123}">R123456789</a></br>性别:男</br>身份证号:370304</br>捺印单位:XXXX'
        },
        {
            id: 2, shape: "circularImage", image: DIR + "2.png", physics: false,
            title: '人员编号：R223456789</br>性别:男</br>身份证号:370304</br>捺印单位:XXXX'
        },
        {
            id: 3, shape: "circularImage", image: DIR + "3.png", physics: false,
            title: '人员编号：R423456789</br>性别:女</br>身份证号:001</br>捺印单位:XXXX'
        },
        {
            id: 4,
            shape: "circularImage",
            image: DIR + "4.png", physics: false,
            title: '人员编号：R523456789</br>性别:男</br>身份证号:002</br>捺印单位:XXXX'
        },
        {
            id: 5, shape: "icon", image: DIR + "5.png",
            label: "A1123456789-盗窃案", icon: {code: 'A', color: "#2442f3"}, physics: false,
            title: '现勘号：R523456789</br>指纹系统案事件编号：R523456789</br>案件号：R523456789</br>案件类别:杀人案</br>发案单位:XXX</br>发案时间：2020年9月3日16:52:35'
        },
        {
            id: 6, shape: "icon",
            label: "A2123456789-杀人案", icon: {code: 'A', color: "#2442f3"}, physics: false,
            title: '现勘号：R523456789</br>指纹系统案事件编号：R523456789</br>案件号：R523456789</br>案件类别:杀人案</br>发案单位:XXX</br>发案时间：2020年9月3日16:52:35'
        },
        {
            id: 7, shape: "icon", image: DIR + "7.png",
            label: "A3123456789-抢劫案", icon: {code: 'A', color: "#2442f3"}, physics: false,
            title: '现勘号：R523456789</br>指纹系统案事件编号：R523456789</br>案件号：R523456789</br>案件类别:杀人案</br>发案单位:XXX</br>发案时间：2020年9月3日16:52:35'
        }
    ];

    // create connections between people
    // value corresponds with the amount of contact between two people
    edges = [
        {
            id: "1_2",
            label: '指纹TT比中',
            from: 1,
            to: 2,
            arrows: "to",
            title: "<span style='font-size: 20px;font-weight: bold'>比对任务信息</span></br>任务编号:4400002605002014060005</br>比对任务类型：查重(TT)</br>生物特征类型：指纹</br>提交时间:2020年9月3日17:05</br>认定时间:2020年9月3日17:05</br>认定人:张三"
        },
        {
            id: "1_3",
            label: '同行人员',
            from: 1,
            to: 3,
            arrows: "to",
            color: {
                color: '#2da34b',
                highlight: '#2da34b',
                hover: '#848484',
                inherit: 'from',
                opacity: 1.0
            },
            dashes:[5,5],
            style: "dashed",
            title: "<span style='font-size: 20px;font-weight: bold'>同行信息</span></br>出行方式:高铁-G123456</br>座位号:13#10F</br>出行时间:2020年9月3日17:05至2020年9月3日18:05"
        },
        {
            id: "2_4",
            label: '人像TT比中',
            from: 2,
            to: 4,
            arrows: "from",
            title: "<span style='font-size: 20px;font-weight: bold'>比对任务信息</span></br>任务编号:4400002605002014060005</br>比对任务类型：查重(TT)</br>生物特征类型：人像</br>提交时间:2020年9月3日17:05</br>认定时间:2020年9月3日17:05</br>认定人:张三"
        },
        {
            id: "1_5",
            label: '指纹LT比中',
            from: 1,
            to: 5,
            arrows: "from",
            title: "<span style='font-size: 20px;font-weight: bold'>比对任务信息</span></br>任务编号:4400002605002014060005</br>比对任务类型：正查(LT)</br>生物特征类型：指纹</br>提交时间:2020年9月3日17:05</br>认定时间:2020年9月3日17:05</br>认定人:张三"
        },
        {
            id: "5_6",
            label: '串并案',
            from: 5,
            to: 6,
            color: "#a76464",
            title: "<span style='font-size: 20px;font-weight: bold'>串并案信息</span></br>编号:4400002605002014060005</br>创建时间:2020年9月3日17:05</br>备注：因为作案手法、案发地点等因素，结合XXXX线索，将当前XXXX做XXXXX处理。"
        },
        {
            id: "2_7",
            label: '指纹TL比中',
            from: 2,
            to: 7,
            arrows: "to",
            title: "<span style='font-size: 20px;font-weight: bold'>比对任务信息</span></br>任务编号:4400002605002014060005</br>比对任务类型：倒查(TL)</br>生物特征类型：指纹</br>提交时间:2020年9月3日17:05</br>认定时间:2020年9月3日17:05</br>认定人:张三"
        },
    ];

    // create a network
    var container = document.getElementById("mynetwork");
    var data = {
        nodes: nodes,
        edges: edges,
    };
    var options = {
        nodes: {
            borderWidth: 4,
            size: 30,
            color: {
                border: "#222222",
                background: "#666666",
            },
            font: {color: "#2442f3"},
        },
        edges: {
            color: "#2442f3",
        }, interaction: {hover: true,tooltipDelay:500}
    };
    network = new vis.Network(container, data, options);
    //event 选中显示弹出框，取消选中隐藏
    network.on("showPopup", function (id) {
        var $tooltip = $(".vis-tooltip");
        var offsetData = $tooltip.offset();
    });
    network.on("hidePopup", function (id) {
        console.log("hidePopup",id);
        $(".vis-tooltip").show();
        $(".vis-tooltip")[0].style.visibility="visible";
    });
}

window.addEventListener("load", () => {
    draw();
    $(a).click(function (){
        var $this = $(this);
        console.log($this.attr("setting"))
    })
});


