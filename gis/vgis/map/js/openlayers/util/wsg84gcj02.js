function transformlat(lng, lat) {
    var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng
            * lat + 0.2 * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * Math.PI) + 20.0 * Math.sin(2.0 * lng * Math.PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lat * Math.PI) + 40.0 * Math.sin(lat / 3.0 * Math.PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(lat / 12.0 * Math.PI) + 320 * Math.sin(lat * Math.PI / 30.0)) * 2.0 / 3.0;
    return ret;
}
function transformlng(lng, lat) {
    var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1
            * Math.sqrt(Math.abs(lng));
    ret += (20.0 * Math.sin(6.0 * lng * Math.PI) + 20.0 * Math.sin(2.0 * lng * Math.PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(lng * Math.PI) + 40.0 * Math.sin(lng / 3.0 * Math.PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(lng / 12.0 * Math.PI) + 300.0 * Math.sin(lng / 30.0
            * Math.PI)) * 2.0 / 3.0;
    return ret;
}
/**
 * 判断是否在国内，不在国内则不做偏移
 * 
 * @param lng
 * @param lat
 * @returns {boolean}
 */
function out_of_china(lng, lat) {
    return (lng < 72.004 || lng > 137.8347)|| ((lat < 0.8293 || lat > 55.8271) || false);
}

function gcj02towgs84(lng, lat) {
    if (out_of_china(lng, lat)) {
        return new Array(lng, lat);
    } else {
        var dlat = transformlat(lng - 105.0, lat - 35.0);
        var dlng = transformlng(lng - 105.0, lat - 35.0);
        var radlat = lat / 180.0 * Math.PI;
        var magic = Math.sin(radlat);
        magic = 1 - 0.00669342162296594323 * magic * magic;
        var sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((6378245.0 * (1 - 0.00669342162296594323)) / (magic * sqrtmagic) * Math.PI);
        dlng = (dlng * 180.0) / (6378245.0 / sqrtmagic * Math.cos(radlat) * Math.PI);
        var  mglat = lat + dlat;
        var  mglng = lng + dlng;
        return new Array( lng * 2 - mglng, lat * 2 - mglat );
    }
}

function wgs84togcj02(lng, lat) {
    if (out_of_china(lng, lat)) {
        return new Array(lng, lat);
    } else {
    	var dlat = transformlat(lng - 105.0, lat - 35.0);
    	var dlng = transformlng(lng - 105.0, lat - 35.0);
    	var radlat = lat / 180.0 * Math.PI;
    	var magic = Math.sin(radlat);
        magic = 1 - 0.00669342162296594323 * magic * magic;
        var sqrtmagic = Math.sqrt(magic);
        dlat = (dlat * 180.0) / ((6378245.0 * (1 - 0.00669342162296594323)) / (magic * sqrtmagic) * Math.PI);
        dlng = (dlng * 180.0) / (6378245.0 / sqrtmagic * Math.cos(radlat) * Math.PI);
        var mglat = lat + dlat;
        var mglng = lng + dlng;
        return new Array(mglng, mglat);
    }
}
//transformlng(11,22);
//console.log(gcj02towgs84(114.1079098611, 39.4801348013));
//console.log(wgs84togcj02(114.10122219072896, 39.47885509293268));
//alert(Math.PI);