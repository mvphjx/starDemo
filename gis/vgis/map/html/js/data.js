globalconstant.tileUrl="../demo/tile"; //"http://192.168.0.41/map/mapabc/";// "./map/"
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



//简单的图层 点
var data = {'type': 'FeatureCollection','features': [{'type': 'Feature','properties': {'id':'123','name':'test', 'icon':'default0.png'},'geometry': {'type': 'Point','coordinates': [114.2578125,32.84267363195431]}}, {'type': 'Feature','properties': {'id':'123', 'name':'test', 'icon':'default.png'},'geometry': {'type': 'Point','coordinates': [94.921875,36.879]}} ]};
simplePointLayerPlugin.geojson(data);
//simpleLayerPlugin.clearAll();
var geojson = simplePointLayerPlugin.getGeojson();
//console.log(geojson);
//simplePointLayerPlugin.geojson(geojson);

data = [{id:"123",name:"32323", 'icon':'default0.png', lon:112.9,lat:30.34},{id:"456",name:"test1111", 'icon':'default0.png', lon:117.9,lat:34.34}];//{}
simplePointLayerPlugin.geojson(simplePointLayerPlugin.utilGeojson(data));

//简单的图层 线
var line = {'type': 'FeatureCollection','features': [{'type': 'Feature','properties': {'id':'123','name':'test', 'colour':'rgb(255,1,1,0.1)', 'width':5},'geometry': {'type': 'LineString','coordinates': [[84.2578125,32.84267363195431],[120.76,45.08]]}}]};
simpleLineStringLayerPlugin.geojson(line);

geojson = simpleLineStringLayerPlugin.getGeojson();
//console.log(geojson);

//简单的图层 多边型
var polygon = {'type': 'FeatureCollection','features': [{'type': 'Feature','properties': {'id':'123','name':'aa', 'colour':'red', 'width':2, 'fillcolor':'rgba(1,1,1,0.2)' },'geometry': {'type': 'Polygon','coordinates': [[[112.1044921875,39.095962936305476],[109.8193359375,35.782170703266075],[113.6865234375,34.125447565116126],[116.1474609375,36.94989178681327],[112.1044921875,39.095962936305476]]]}}]};
simplePolygonLayerPlugin.geojson(polygon);

var geojsonObject = { 'type': 'FeatureCollection', 'features': [{ 'type': 'Feature', 'properties': { 'name': 'EPSG:3857', 'id':'123', 'name':'aa', 'colour':'red', 'width':2,  'fillcolor':'rgba(1,1,1,0.2)' },  'geometry': { 'type': 'MultiPolygon',
            'coordinates': [
                [[[90.791015625,21.207458730482642],[122.16796875,21.207458730482642],[122.16796875,40.713955826286046],[90.791015625,40.713955826286046],[90.791015625,21.207458730482642]],
                    [[100.37109375,28.304380682962783],[112.8515625,28.304380682962783],[112.8515625,34.59704151614417],[100.37109375,34.59704151614417],[100.37109375,28.304380682962783]]
                ]]
        } }] };
/*simplePolygonLayerPlugin.geojson(geojsonObject);

geojson = simplePolygonLayerPlugin.getGeojson();*/
//console.log(geojson);


//
var test = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [
                    82.6171875,
                    34.016241889667015
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {'colour':'red'},
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [
                        74.970703125,
                        33.43144133557529
                    ],
                    [
                        88.41796875,
                        33.65120829920497
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {'colour':'red'},
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            77.607421875,
                            32.24997445586331
                        ],
                        [
                            77.607421875,
                            32.24997445586331
                        ],
                        [
                            77.607421875,
                            32.24997445586331
                        ],
                        [
                            77.607421875,
                            32.24997445586331
                        ]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {'colour':'red'},
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            79.27734374999999,
                            32.91648534731439
                        ],
                        [
                            76.81640625,
                            30.675715404167743
                        ],
                        [
                            81.5625,
                            27.605670826465445
                        ],
                        [
                            89.47265625,
                            28.38173504322308
                        ],
                        [
                            89.033203125,
                            31.50362930577303
                        ],
                        [
                            85.869140625,
                            32.47269502206151
                        ],
                        [
                            83.671875,
                            32.76880048488168
                        ],
                        [
                            79.27734374999999,
                            32.91648534731439
                        ]
                    ]
                ]
            }
        }
    ]
}
simpleLayerPlugin.geojson(test);


//动画
var path =  [ { "name": "", "lon": 108.9, "lat": 35.57 }, {  "name": "", "lon": 118, "lat": 34.04 }];
//pathPlugin.path(path);
// pathPlugin.customPath(path,null,false,'path.png','stop',function(self,status){
//     console.log(1)
// });

data={line:[[108.9,35.57], [118,34.04 ]],distance:0.1,showline:false,icon:'path.png',endStatus:'stop'}
//animation(data);
animation(data);
//动画
// var i=20;
// i++;
// var xml = '<?xml version="1.0" encoding="UTF-8"?>'+
// '<gpx xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.topografix.com/GPX/1/1" xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd"><trk xmlns=""><trkseg><trkpt lat="'+i+'" lon="102"/><trkpt lat="35" lon="108"/><trkpt lat="42" lon="113"/><trkpt lat="28" lon="115"/></trkseg></trk><trk xmlns=""><trkseg><trkpt lat="'+i+'" lon="115"/><trkpt lat="43" lon="119"/><trkpt lat="30" lon="117"/><trkpt lat="34" lon="116"/></trkseg></trk></gpx>';
// trackPlugin.path(xml);

// //
// appMap.boundaries("./zb.json");

