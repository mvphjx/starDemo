/**
 * 这是各个图层及图层上元素自定义文件
 */
var custormStyle = {
    layer: {//这里自定义图层样式
        camera: function () {//这是自定义摄像头样式
            //获取摄像头图层默认样式
            var _old_style = globalconstant.layers['camera'].getStyle();
            //重新覆盖摄像头图层默认样式
            globalconstant.layers['camera'].setStyle(function (feature) {
                if (feature.get('features').length == 1) {
                    var _style = globalconstant.clusterStyleCache['single'];
                    if (!_style) {
                        _style = new ol.style.Style({image: new ol.style.Icon({src: globalconstant.imgUrl + 'spjk_shehuishipin.png'})});
                        globalconstant.clusterStyleCache['single'] = _style;
                    }
                    feature.set('type', 'camera');
                    return _style;
                } else {
                    return _old_style(feature);
                }
            })
        }
    },
    feature: {//这里自定义元素样式

    },
    tip: {//这里自定义泡泡内容
        cameraControl: function(feature, tip){//全局摄像头操作盘
             var  btns='<li><a name="realplay" href="javascript:void(0)"><p>实时预览</p></a></li>' +
            '           <li><a name="playback" href="javascript:void(0)"><p>历史视频</p></a></li>' +
            '           <li><a name="" href="javascript:void(0)"><p> </p></a></li>' +
            '           <li><a name="" href="javascript:void(0)"><p> </p></a></li>';
            var  pro=feature.getProperties();
                delete  pro.geometry; 
            controlDisk.create(tip.getElement(),btns,pro);
        },
        cameraDetail: function(feature, tip){//摄像头详情
            var elment = tip.getElement();
            var ulContent='<li>名称:3</li><li>身份证:3</li><li>问题种类:</li><li>检查部门:</li><li>检查地点:</li><li>检查人姓名:</li><li>检查人警号:</li><li>更新时间:2018-01-01T01:44:49Z</li>';
            featureDetail.creatContent(elment,ulContent);
            tip.changed();
        },
        caseControl: function(feature, tip){//案件操作盘
            var  btns='<li><a name="detail" href="javascript:void(0)"><p>详情</p></a></li>' +
            '           <li><a name="select" href="javascript:void(0)"><p>侦查圈</p></a></li>' +
            '           <li><a name="others" href="javascript:void(0)"><p>其他</p></a></li>' +
            '           <li><a name="edit" href="javascript:void(0)"><p>编辑</p></a></li>' ;
            var  pro=feature.getProperties();
                delete  pro.geometry; 
            controlDisk.create(tip.getElement(),btns,pro);
        },
        caseCameraControl: function(feature, tip){//案件摄像头操作盘
            var  btns='<li><a name="realplay" href="javascript:void(0)"><p>实时预览</p></a></li>' +
            '           <li><a name="playback" href="javascript:void(0)"><p>历史视频</p></a></li>' +
            '           <li><a name="censor" href="javascript:void(0)"><p>审看</p></a></li>' +
            '           <li><a name="search" href="javascript:void(0)"><p>检索</p></a></li>' +
            '           <li><a name="delete" href="javascript:void(0)"><p>删除</p></a></li>' +
            '           <li><a name="detail" href="javascript:void(0)"><p>详情</p></a></li>' ;
            var  pro=feature.getProperties();
                delete  pro.geometry; 
            controlDisk.create(tip.getElement(),btns,pro);
        },
        selfCaseCameraControl:function(feature, tip){//自建摄像头操作盘
            var  btns='<li><a name="import" href="javascript:void(0)"><p>导入视频</p></a></li>' +
            '           <li><a name="censor" href="javascript:void(0)"><p>审看</p></a></li>' +
            '           <li><a name="search" href="javascript:void(0)"><p>检索</p></a></li>' +
            '           <li><a name="delete" href="javascript:void(0)"><p>删除</p></a></li>' +
            '           <li><a name="detail" href="javascript:void(0)"><p>详情</p></a></li>' ;
            var  pro=feature.getProperties();
                delete  pro.geometry; 
            controlDisk.create(tip.getElement(),btns,pro);
        },
        videoControl: function(feature, tip){//视频操作盘
            var  btns='<li><a name="censor" href="javascript:void(0)"><p>审看</p></a></li>' +
            '           <li><a name="detail" href="javascript:void(0)"><p>详情</p></a></li>' +
            '           <li><a name="edit" href="javascript:void(0)"><p>编辑</p></a></li>' +
            '           <li><a name="timecheck" href="javascript:void(0)"><p>时间校正</p></a></li>' +
            '           <li><a name="delete" href="javascript:void(0)"><p>删除</p></a></li>' ;
            var  pro=feature.getProperties();
                delete  pro.geometry; 
            controlDisk.create(tip.getElement(),btns,pro);
        } ,
        caseObjectControl: function(feature, tip){//案件目标操作盘
            var  btns='<li><a name="collect" href="javascript:void(0)"><p>收藏</p></a></li>' +
            '           <li><a name="compare" href="javascript:void(0)"><p>比对</p></a></li>' +
            '           <li><a name="edit" href="javascript:void(0)"><p>编辑</p></a></li>' +
            '           <li><a name="delete" href="javascript:void(0)"><p>删除</p></a></li>';
            var  pro=feature.getProperties();
                delete  pro.geometry; 
            controlDisk.create(tip.getElement(),btns,pro);
        },
        caseObjectDetail: function(feature, tip){//案件目标详情
            var elment = tip.getElement();
            var  overlay=feature.get("overlay");
            var title=feature.get("title");
            if(title!=null && title !=undefined && title.length>10){
                title=title.substr(0,10)+"...";
                elment.title=feature.get("title");
            }
            elment.innerHTML ='<div class="gjImg">'+
                                '<img src="'+overlay.img+'"/>'+
                                '<div class="title">'+title+'</div>'+
                              '</div>';
            tip.changed();
        },
        
    }
}
