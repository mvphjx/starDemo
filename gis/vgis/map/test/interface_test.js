globalconstant.mapUrl="../demo/tile"; //"http://192.168.0.41/map/mapabc/";// "./map/"
globalconstant.imgUrl="../images/";
//地图默认点心点位置，级别
globalconstant.defaultLon = 108.9;
globalconstant.defaultLat = 34.34;
globalconstant.defaultlevel = 5;
globalconstant.minlevel = 1;
globalconstant.maxlevel = 18;
var options={
    tileUrl:globalconstant.tileUrl,
    imgUrl:globalconstant.imgUrl,
    defaultLon:globalconstant.defaultLon,
    defaultLat:globalconstant.defaultLat,
    defaultlevel:globalconstant.defaultlevel,
    minlevel:globalconstant.minlevel,
    maxlevel:globalconstant.maxlevel
}
mapInit(options);

createLayer('camera');
//console.log(globalconstant.layers)
var data=[{id:'1',icon:'default.png', lon:119.93,lat:25.99,overlay:{img:'http://vicp.visystem.com.cn:8282/pic/china/roadmap/5/26/14.png',type:'dddd'},type:'caseObject'}];
showPoint(data,'camera');
//removeFeature('1','camera');
globalconstant.layers['camera'].setStyle(new ol.style.Style({stroke:new ol.style.Stroke({color:'red',width:3})}));
data=[{id:'1', coordinates:[[118.33,35.99],[119.93,35.99]]}];
showLine(data,'camera');
createLayer('person');
globalconstant.layers['person'].setStyle(new ol.style.Style({stroke:new ol.style.Stroke({color:'red',width:3})}));
data=[{id:'1',gType:'point',icon:'default.png', lon:114.93,lat:35.99},{id:'1', gType:'line',coordinates:[[117.33,35.99],[119.93,34.99]]}];
showData(data,'person');

mapTool.importData(geojsonObject,'person');
//console.log(mapTool.exportData('person'));

//mapTool.clear('camera');
//mapTool.removeFeature('1','person');
//mapTool.setCenter(118.33,35.99)

createLayer('line',"modify");
showLine([{id:'1', coordinates:[[117.33,33.99],[132.93,33.99]]}],'line');  

createLayer('cluster','cluster');
data=[{id:'1', lon:117.93,lat:35.99},{id:'2', lon:118.63,lat:35.69}];
showPoint(data,'cluster');

createLayer('heat','heat');
data=[{id:'1', lon:116.93,lat:33.99,weight:1},{id:'2',lon:116.63,lat:33.69,weight:1}];
mapTool.showPoint(data,'heat');


data={line:[[108.9,35.57], [118,34.04 ]],distance:0.1,showline:false,icon:'path.png',endStatus:'stop'}
//animation(data);
animation(data);
setTimeout(function(){
    animationStop();
},1000)
//data=[{"id": "dc15d83d-b043-4a76-8933-6f9f954a5b52##c819d4b8-ace7-4b81-bc25-b26388991cdb","coordinates": [[124.237, 41.1755], [121.486,39.6148]]}];
data=[
    {
        "coordinates": [
            [132.93,33.99],
            [
                121.486,
                39.6148
            ]
        ],
        modify:true,
        "id": "dc15d83d-b043-4a76-8933-6f9f954a5b52##c819d4b8-ace7-4b81-bc25-b26388991cdb"
    }
]
showLine(data,'line');
var leng=getLineLength([
    [132.93,33.99],
    [
        121.486,
        39.6148
    ]
]);
//console.log(leng);

data=[
    {
        "icon": "Camera_Select.png",
        "id": "60174d0a|f579|45f1|b25f|d12720479ea7",
        "lat": 30.7698,
        "lon": 102.794,
        "title": "������������",
        "type": "caseCamera"
    }
]
showPoint(data,'camera');


var radius = 1000;
var options = {steps: 64, units: 'kilometers', properties: {foo: 'bar'}};
var circle = turf.circle([108.343, 34.984], radius, options);
var ff=mapTool.geoJsonToFeature(circle);
globalconstant.layers['camera'].getSource().addFeature(ff);


var point = turf.point([108.343, 34.984]);
var buffered = turf.buffer(point, 500, {units: 'miles'});