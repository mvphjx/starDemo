/*! Wukong - v3.4.2 - 2018-07-26-18:42
* http://www.wkzf.com
* Copyright (c) 2018 wkzf.com; Licensed *
*━━━━━━━━
*/
define("lib/ui/cookie", [], function () {
    var a = function (a) {
        var b = {"\r": "\\r", "\n": "\\n", "\t": "\\t"};
        return a.replace(/([\.\\\/\+\*\?\[\]\{\}\(\)\^\$\|])/g, "\\$1").replace(/[\r\t\n]/g, function (a) {
            return b[a]
        })
    }, b = {
        set: function (a, b, c) {
            c = c || {}, null === b && (b = "", c.expires = -1);
            var d = "";
            if (c.expires && ("number" == typeof c.expires || c.expires.toUTCString)) {
                var e;
                "number" == typeof c.expires ? (e = new Date, e.setTime(e.getTime() + 24 * c.expires * 60 * 60 * 1e3)) : e = c.expires, d = "; expires=" + e.toUTCString()
            }
            var f = c.path ? "; path=" + c.path : "", g = c.domain ? "; domain=" + c.domain : "",
                h = c.secure ? "; secure" : "";
            document.cookie = [encodeURIComponent(a), "=", encodeURIComponent(b), d, f, g, h].join("")
        }, get: function (b) {
            var c = document.cookie.match(new RegExp("(?:^|;)\\s*" + a(encodeURIComponent(b)) + "=([^;]+)"));
            return c ? decodeURIComponent(c[1]) : null
        }, del: function (a, b) {
            b = b || {};
            var c = b.path ? "; path=" + b.path : "", d = b.domain ? "; domain=" + b.domain : "", e = new Date;
            e.setTime(e.getTime() - 1), document.cookie = encodeURIComponent(a) + "=" + (d ? "; domain=" + d : "") + "; path=" + (c || "/") + "; expires=" + e.toGMTString()
        }
    };
    return b
}), define("lib/ui/class", [], function () {
    var a = function () {
        function b() {
        }

        function c(a) {
            return "[object Function]" == Object.prototype.toString.call(a)
        }

        function d() {
            var a = arguments, b = 1 == a.length ? NM : a[0], c = a.length > 1 ? a[1] : a[0];
            if (null == c) return b;
            try {
                for (var d in c) !b.hasOwnProperty(c[d]) && (b[d] = c[d]);
                return b
            } catch (a) {
            }
        }

        function e() {
            function e() {
                this.init.apply(this, arguments)
            }

            var g = null, i = arguments;
            c(i[0]) && (g = i.shift()), d(e, a.Methods), h(e, {
                extend: h,
                setOptions: f
            }), e.superclass = g, e.subclasses = [], g && (b.prototype = g.prototype, e.prototype = new b, g.subclasses.push(e));
            for (var j = 0, k = i.length; j < k; j++) e.addMethods(i[j]);
            return e.prototype.init || (e.prototype.init = function () {
            }), e.prototype.constructor = e, e
        }

        function f(a) {
            this.extend(this.options, a), this.extend(this, this.options)
        }

        function g(a) {
            var b = Object.prototype.hasOwnProperty, c = [];
            for (var d in a) b.call(a, d) && c.push(d);
            for (var e = 0, f = c.length; e < f; e++) {
                var d = c[e], g = a[d];
                this.prototype[d] = g
            }
            return this
        }

        var h = function () {
            var a = arguments, b = 1 == a.length ? NM : a[0], c = a.length > 1 ? a[1] : a[0];
            if (null == c) return b;
            try {
                for (var d in c) !b.hasOwnProperty(c[d]) && ("object" == typeof b && (b[d] = c[d]) || "function" == typeof b && (b.prototype[d] = c[d]));
                return b
            } catch (a) {
            }
        };
        return {create: e, Methods: {addMethods: g}}
    }();
    return a
}), define("service/map/status", ["jQuery", "lib/ui/class", "lib/ui/cookie"], function (a, b, c) {
    var d = b.create({
        setOptions: function (b) {
            var c = {
                getCityAreas: "/houseMap/getCityAreasInfo.rest",
                getCitySubWayLines: "/houseMap/getCitySubwayLines.rest",
                getMapPoint: "/houseMap/querySellListOnMap.rest",
                mapSearch: "/houseMap/mapSearch.rest",
                getMapPointBySubway: "/houseMap/querySellListOnMapBySubWayLine.rest",
                getStrokeGps: "/houseMap/getStrokeGps.rest",
                searchByKeyword: "/houseMap/searchByKeyword.rest",
                searchKeywords: "/houseMap/searchKeywords.rest",
                BigDataPageName: ""
            };
            a.extend(!0, this.options = {}, c, b)
        }
    }, {
        init: function (a) {
            this.setOptions(a), this.RequestUrl = {
                getCityAreas: this.options.getCityAreas,
                getCitySubWayLines: this.options.getCitySubWayLines,
                getMapPoint: this.options.getMapPoint,
                mapSearch: this.options.mapSearch,
                getMapPointBySubway: this.options.getMapPointBySubway,
                getStrokeGps: this.options.getStrokeGps,
                searchByKeyword: this.options.searchByKeyword,
                searchKeywords: this.options.searchKeywords
            }, this.WKBigData = {
                pageName: this.options.BigDataPageName,
                pageParam: {},
                eventName: "",
                eventParam: {},
                nextPageName: "",
                nextPageParam: {},
                city: c.get("cityId")
            }, this.MAP_LEVELS = {DISTRICT: 12, BLOCK: 14, STATION: 17, ESTATE: 17}, this.POSITION_TYPES = {
                DISTRICT: 1,
                BLOCK: 2,
                SUBWAY: 3,
                STATION: 4,
                ESTATE: 5
            }, this.HOUSE_TYPES = {OLD: 1, NEW: 2}, this.CityData = {
                cityId: c.get("cityId") || "43",
                cityName: c.get("cityName") || "上海",
                houseType: this.options.houseType
            }, this.PositionData = {
                type: "",
                districtId: "",
                townId: "",
                subWayLineId: "",
                subWayLineStationId: "",
                subEstateId: "",
                name: "",
                key: ""
            }, this.FilterData = {s: "", m: "", h: "", t: "", x: ""}, this.MapData = {level: "", lat: "", lon: ""}
        }, setValue: function (b, c) {
            "PositionData" == c ? this.PositionData = b : a.extend(this[c], b || {})
        }, getValue: function (a) {
            switch (a) {
                case"mapSearch":
                    return this.mapSearch();
                case"getMapPoint":
                    return this.getMapPoint();
                case"getCityAreas":
                    return this.getCityAreas();
                case"getSubwayLine":
                    return this.getSubwayLine();
                case"searchByKeyword":
                    return this.searchByKeyword();
                case"searchKeywords":
                    return this.searchKeywords();
                case"getMapGoodAgent":
                    return this.getMapGoodAgent();
                default:
                    return {}
            }
        }, getData: function (a, b) {
            return this[b][a]
        }, getAllData: function (a) {
            var b = this[a], c = {};
            for (var d in b) b[d] && (c[d] = b[d]);
            return c
        }, getCityId: function () {
            return {cityId: this.CityData.cityId, houseType: this.CityData.houseType}
        }, getAgentData: function () {
            return {
                cityId: this.CityData.cityId,
                districtId: this.PositionData.districtId || "",
                townId: this.PositionData.townId || ""
            }
        }, mapSearch: function () {
            return a.extend({}, this.getCityId(), this.getAllData("FilterData"), this.getAllData("PositionData"))
        }, getMapPoint: function () {
            return a.extend({}, this.getAllData("CityData"), this.getAllData("FilterData"), this.getAllData("MapData"))
        }, getSubwayLine: function () {
            return a.extend({}, this.getAllData("CityData"), this.getAllData("FilterData"), this.getAllData("PositionData"))
        }, getPositionData: function () {
            return a.extend({}, this.getAllData("CityData"), this.getAllData("FilterData"), this.getAllData("PositionData"))
        }, searchByKeyword: function () {
            return a.extend({}, this.getCityId(), this.getAllData("FilterData"), this.getAllData("PositionData"))
        }, searchKeywords: function () {
            return a.extend({}, this.getCityId())
        }, getMapGoodAgent: function () {
            return a.extend({}, this.getAgentData())
        }
    });
    return d
}), define("lib/ui/json", ["require"], function (a) {
    function b(a) {
        return /["\\\x00-\x1f]/.test(a) && (a = a.replace(/["\\\x00-\x1f]/g, function (a) {
            var b = h[a];
            return b ? b : (b = a.charCodeAt(), "\\u00" + Math.floor(b / 16).toString(16) + (b % 16).toString(16))
        })), '"' + a + '"'
    }

    function c(a) {
        var b, c, d, e = ["["], g = a.length;
        for (c = 0; c < g; c++) switch (d = a[c], typeof d) {
            case"undefined":
            case"function":
            case"unknown":
                break;
            default:
                b && e.push(","), e.push(f(d)), b = 1
        }
        return e.push("]"), e.join("")
    }

    function d(a) {
        return a < 10 ? "0" + a : a
    }

    function e(a) {
        return '"' + a.getFullYear() + "-" + d(a.getMonth() + 1) + "-" + d(a.getDate()) + "T" + d(a.getHours()) + ":" + d(a.getMinutes()) + ":" + d(a.getSeconds()) + '"'
    }

    function f(a) {
        switch (typeof a) {
            case"undefined":
                return "undefined";
            case"number":
                return isFinite(a) ? String(a) : "null";
            case"string":
                return b(a);
            case"boolean":
                return String(a);
            default:
                if (null === a) return "null";
                if (a instanceof Array) return c(a);
                if (a instanceof Date) return e(a);
                var d, g, h = ["{"], i = f;
                for (var j in a) if (Object.prototype.hasOwnProperty.call(a, j)) switch (g = a[j], typeof g) {
                    case"undefined":
                    case"unknown":
                    case"function":
                        break;
                    default:
                        d && h.push(","), d = 1, h.push(i(j) + ":" + i(g))
                }
                return h.push("}"), h.join("")
        }
    }

    function g(a) {
        return new Function("return (" + a + ")")()
    }

    var h = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"};
    return {parse: g, stringify: f, decode: g, encode: f}
}), define("service/map/map", ["jQuery", "lib/ui/class", "./status", "lib/ui/json"], function (a, b, c, d) {
    var e = {LIST: 0, POSITION: 1};
    a.ajaxSetup({dataType: "json", type: "get", cache: !1});
    var f = b.create({
        setOptions: function (b) {
            var c = {
                ele: "Map",
                status: null,
                time: 300,
                bounds: .3,
                styles: {
                    circle: {
                        distance: 1e3,
                        strokeColor: "#ffa200",
                        strokeWeight: 2,
                        strokeOpacity: 1,
                        fillColor: "#ffa200",
                        fillOpacity: .05,
                        enableClicking: !1
                    },
                    line: {strokeColor: "#ffa200", strokeWeight: 6, strokeOpacity: .85},
                    stroke: {
                        strokeWeight: 4,
                        strokeColor: "#ffa200",
                        fillColor: "#333",
                        fillOpacity: .05,
                        strokeOpacity: .85,
                        enableClicking: !1
                    }
                },
                onMapRendered: null
            };
            a.extend(!0, this.options = {}, c, b)
        }
    }, {
        init: function (a) {
            this.setOptions(a), this.cityData = this.options.status.CityData, this.MAP_LEVELS = this.options.status.MAP_LEVELS, this.POSITION_TYPES = this.options.status.POSITION_TYPES, this.HOUSE_TYPES = this.options.status.HOUSE_TYPES, this.onMapRendered = this.options.onMapRendered, this.loadingMap = !1, this.data = {}, this.houseListData = {}, this.subway = {}, this.hover = []
        }, run: function () {
            var b = this;
            b.setHeight(), a(window).on("resize", function () {
                b.setHeight()
            }), b.map = new BMap.Map(b.options.ele, {enableMapClick: !1}), b.map.centerAndZoom(b.cityData.cityName, b.MAP_LEVELS.DISTRICT), b.map.addEventListener("load", function () {
                b.map.setMinZoom(9), b.map.enableScrollWheelZoom(), b.map.disableDoubleClickZoom(), b.map.disableInertialDragging(), b.map.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT})), b.map.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT})), b.map.addEventListener("zoomstart", function () {
                    b.loadingMap = !0
                }), b.map.addEventListener("zoomend", function () {
                    b.options.status.setValue({level: b.map.getZoom()}, "MapData"), b.loadingMap && setTimeout(function () {
                        b.renderMap()
                    }, b.options.time)
                }), b.map.addEventListener("dragend", function (c) {
                    var c = c.domEvent, d = c.srcElement ? c.srcElement : c.target;
                    b.loadingMap = !0, b.isDragend = !(!a(d).is("p") && !a(d).parent().is("p")), setTimeout(function () {
                        b.renderMap()
                    }, b.options.time)
                }), b.renderMap()
            })
        }, render: function (a) {
            var b = this, c = b.options.status.getPositionData(), d = b.options.status.getMapPoint();
            b.isEstateLocation = a, c.subWayLineId && c.subWayLineStationId ? (b.renderSubway({
                lineId: c.subWayLineId,
                stationId: c.subWayLineStationId
            }), b.renderMap({
                zoomLv: d.level,
                lon: d.lon,
                lat: d.lat
            })) : c.subWayLineId ? b.renderSubway({
                lineId: c.subWayLineId,
                stationId: c.subWayLineStationId
            }) : b.renderMap({zoomLv: d.level, lon: d.lon, lat: d.lat, subEstateId: c.subEstateId})
        }, renderMap: function (b) {
            var c, d, f, g, h, i, j = this, k = j.options.status.getMapPoint(),
                l = j.options.status.getData("getMapPoint", "RequestUrl"), m = j.options.status.FilterData, b = b || {},
                n = b.zoomLv, o = b.lon, p = b.lat;
            return o && p ? (j.loadingMap = !1, n = n || j.map.getZoom(), j.isEstateLocation && j.clear(), j.map.centerAndZoom(new BMap.Point(o, p), n), void setTimeout(function () {
                j.renderMap()
            }, j.options.time)) : (c = j.getLevel(n), d = j.bounds(), c == j.data.level && d.minLon > j.data.minLon && j.data.maxLon > d.maxLon && d.minLat > j.data.minLat && j.data.maxLat > d.maxLat && JSON.stringify(m) == JSON.stringify(j.data.filterData) ? (h = j.options.status.getPositionData(), void j.highlight(h.subEstateId)) : (j.clear(), j.tips("正在加载房源...", 1), k.level = c, delete k.cityId, delete k.cityName, delete k.lon, delete k.lat, a.extend(!0, k, j.bounds(.3)), void a.ajax({
                url: l,
                data: k,
                success: function (b) {
                    if (b.data) {
                        if (h = j.options.status.getPositionData(), f = b.data.cityId, g = b.data.records, i = j.map.getOverlays(), j.data.cityId && f && f != j.data.cityId && (j.options.status.setValue({
                            cityId: f,
                            cityName: b.data.cityName
                        }, "CityData"), j.onMapRendered && j.onMapRendered({type: e.POSITION})), j.data = a.parseJSON(JSON.stringify(k)), j.data.filterData = a.parseJSON(JSON.stringify(m)), j.data.cityId = f, !g || 0 == g.length) return a.each(i, function (a, b) {
                            j.map.removeOverlay(b)
                        }), void j.tips("可视区域没有找到楼盘，移动或放大地图试试!");
                        j.tips(), j.delNotExistLabel(g), a.each(g, function (a, b) {
                            j.cityData.houseType == j.HOUSE_TYPES.NEW && 2 == c && (b.avgPrice || (b.avgPrice = "价格待定")), i.length ? j.canRender(b, c) && j.renderLabel(c, b) : j.renderLabel(c, b)
                        }), j.highlight(h.subEstateId), j.isEstateLocation && j.options.status.setValue({subEstateId: ""}, "PositionData")
                    }
                }
            })))
        }, canRender: function (b, c) {
            var d, e = this, f = e.map.getOverlays(), g = e.cityData.houseType;
            return a.each(f, function (a, f) {
                if (f.key && f.name && (pi = f.getPosition(), pi.lat == b.lat && pi.lng == b.lon)) if (g == e.HOUSE_TYPES.NEW && 2 == c) {
                    if (f.key != b.key || f.avgPrice != b.avgPrice) return d = f, !1
                } else if (f.key != b.key || f.count != b.count) return d = f, !1
            }), d ? (e.map.removeOverlay(d), !0) : void 0 == d
        }, delNotExistLabel: function (b) {
            var c, d = this, e = d.map.getOverlays(), f = 0, g = [];
            e && e.length && (a.each(e, function (d, e) {
                e.key && e.name && (f = 0, c = e.getPosition(), a.each(b, function (a, b) {
                    c.lat == b.lat && c.lng != b.lon || f++
                }), f == b.length && g.push(e))
            }), g && g.length && a.each(g, function (a, b) {
                d.map.removeOverlay(b)
            }))
        }, renderLabel: function (b, c) {
            var d, e = this, f = e.cityData.houseType,
                g = a.parseJSON(window.JSON.stringify(e.options.status.WKBigData)), h = "", i = "";
            f == e.HOUSE_TYPES.OLD ? 0 === b ? (h = c.count > 9999 ? '<p class="WKBigDataBtn lv0" data-params="#BIGDATA#" >' + c.value + "<i>" + Math.round(c.count / 1e3) / 10 + "万</i></p>" : '<p class="WKBigDataBtn lv0" data-params="#BIGDATA#" >' + c.value + "<i>" + c.count + "</i></p>", g.eventName = "1037038", g.eventParam.region_id = c.key) : 1 === b ? (h = '<p class="WKBigDataBtn lv1" data-params="#BIGDATA#"><b>' + c.count + '</b><i class="l"></i><i>' + c.value + '</i><i class="r"></i></p>', g.eventName = "1037010", g.eventParam.town_id = c.key) : 2 === b && (h = '<p class="lv2 WKBigDataBtn', h += '" data-params="#BIGDATA#" ><i class="l"></i><i>' + c.count + '</i><i class="r"></i><i class="h">' + c.value + '</i><i class="v"></i></p>', g.eventName = "1037012", g.eventParam.estate_id = c.key) : f == e.HOUSE_TYPES.NEW && (0 == b ? (h = c.count > 9999 ? '<p class="WKBigDataBtn lv0" data-params="#BIGDATA#" >' + c.value + "<i>" + Math.round(c.count / 1e3) / 10 + "万</i></p>" : '<p class="WKBigDataBtn lv0" data-params="#BIGDATA#" >' + c.value + "<i>" + c.count + "</i></p>", g.eventName = "1036027", g.eventParam.region_id = c.key) : 2 == b && (h = "价格待定" !== c.avgPrice ? '<div class="WKBigDataBtn lv4" data-params="#BIGDATA#" ><p class="name">' + c.value + "</p><p>" + c.avgPrice + " 元/㎡</p></div>" : '<div class="WKBigDataBtn lv4" data-params="#BIGDATA#" ><p class="name">' + c.value + "</p><p>价格待定</p></div>", g.eventName = "1036024", g.eventParam.new_house_id = c.key)), i = h.replace("#BIGDATA#", window.JSON.stringify(g).replace(/\"/g, "'")), d = new BMap.Label(i, {position: new BMap.Point(c.lon, c.lat)}), d.key = c.key, d.name = c.value, d.count = c.count, d.setStyle({
                border: 0,
                background: "",
                padding: 0
            }), d.setZIndex(2), f == e.HOUSE_TYPES.NEW && 2 == b && (d.avgPrice = c.avgPrice), e.map.addOverlay(d), e.addListenerToLabel(b, d)
        }, addListenerToLabel: function (b, c) {
            var d, f = this, g = f.cityData.houseType;
            c.addEventListener("mouseover", function () {
                /(class=\"lv\d over)/i.test(this.getContent()) || this.setStyle({zIndex: 8}), g != f.HOUSE_TYPES.NEW || 2 != b ? f.setHover(this) : this.setStyle({zIndex: 7})
            }), c.addEventListener("mouseout", function () {
                if (g == f.HOUSE_TYPES.OLD) {
                    /(class=\"lv2 over)/i.test(this.getContent()) || this.setStyle({zIndex: 2});
                    for (var a = f.hover.length - 1; a >= 0; a--) f.map.removeOverlay(f.hover[a])
                } else if (g == f.HOUSE_TYPES.NEW) if (0 == b) {
                    this.setStyle({zIndex: 2});
                    for (var a = f.hover.length - 1; a >= 0; a--) f.map.removeOverlay(f.hover[a])
                } else 2 == b && (this.setStyle({zIndex: 2}), f.highlight(f.options.status.getPositionData().subEstateId))
            }), c.addEventListener("click", function () {
                if (!f.isDragend) if (f.loadingMap = !1, 2 == b) {
                    var c = a(this.V).children();
                    c.addClass("over vis"), this.setStyle({zIndex: 7}), f.options.status.setValue({level: f.MAP_LEVELS.ESTATE}, "MapData"), f.options.status.setValue({
                        subEstateId: this.key,
                        type: f.POSITION_TYPES.ESTATE,
                        name: this.name
                    }, "PositionData"), f.highlight(this.key), f.onMapRendered && f.onMapRendered({type: e.LIST})
                } else g == f.HOUSE_TYPES.OLD ? (0 == b ? (d = f.MAP_LEVELS.BLOCK, f.options.status.setValue({
                    districtId: this.key,
                    type: f.POSITION_TYPES.DISTRICT,
                    name: this.name
                }, "PositionData")) : 1 == b && (f.options.status.setValue({
                    townId: this.key,
                    type: f.POSITION_TYPES.BLOCK,
                    name: this.name
                }, "PositionData"), d = f.MAP_LEVELS.ESTATE), f.options.status.setValue({level: d}, "MapData"), f.map.centerAndZoom(this.getPosition(), d)) : g == f.HOUSE_TYPES.NEW && (f.options.status.setValue({
                    districtId: this.key,
                    type: f.POSITION_TYPES.DISTRICT,
                    name: this.name
                }, "PositionData"), f.options.status.setValue({level: f.MAP_LEVELS.BLOCK}, "MapData"), f.map.centerAndZoom(this.getPosition(), f.MAP_LEVELS.BLOCK)), setTimeout(function () {
                    f.renderMap()
                }, f.options.time), f.onMapRendered && f.onMapRendered({type: e.LIST})
            })
        }, highlight: function (b) {
            var c = this;
            if (b) for (var d = c.map.getOverlays(), e = d.length - 1; e >= 0; e--) {
                var f = d[e], g = a(f.V).children();
                f.key && (f.key == b ? (g.addClass("over vis"), f.setStyle({zIndex: 7})) : (g.removeClass("over"), f.setStyle({zIndex: 2})))
            }
        }, setHeight: function () {
            var b = this, c = a("#" + b.options.ele),
                d = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight,
                e = d - c.offset().top;
            c.height(e)
        }, getLevel: function (a) {
            var b = this;
            return a = a || b.map.getZoom(), b.cityData.houseType == b.HOUSE_TYPES.OLD ? a < b.MAP_LEVELS.BLOCK ? 0 : a < b.MAP_LEVELS.STATION - 1 ? 1 : 2 : b.cityData.houseType == b.HOUSE_TYPES.NEW ? a < b.MAP_LEVELS.BLOCK ? 0 : 2 : void 0
        }, setHover: function (b) {
            var c = this, d = c.options.status.getData("getStrokeGps", "RequestUrl");
            if (0 != b.hover) if (b.hover) c.map.addOverlay(b.hover); else {
                var e = c.getLevel(), f = 4;
                2 == e ? f = 6 : 1 == e && (f = 5), a.ajax({
                    url: d,
                    cache: !0,
                    data: {key: b.key, grade: f},
                    success: function (a) {
                        var d = a.data;
                        if (d && 0 != d.length) {
                            for (var e = [], f = d.length - 1; f >= 0; f--) e.push(new BMap.Point(d[f].lon, d[f].lat));
                            e.length > 0 ? (b.hover = new BMap.Polygon(e, c.options.styles.stroke), c.map.addOverlay(b.hover), c.hover.push(b.hover)) : b.hover = !1
                        }
                    }
                })
            }
        }, setCircle: function (b, c, d) {
            var e = this, f = e.options.styles.circle.distance, g = parseFloat(f / 1e3).toString() + "公里",
                h = a.parseJSON(JSON.stringify(e.options.styles.circle));
            delete h.distance, e.map.removeOverlay(e.subway.circle), e.map.removeOverlay(e.subway.remark), e.subway.circle = new BMap.Circle(new BMap.Point(c, d), f, h), e.subway.circle.lid = b, e.map.addOverlay(e.subway.circle), e.subway.remark = new BMap.Label('<p class="remark">' + g + "</p>", {position: new BMap.Point(c, parseFloat(d) + .0095)}), e.subway.remark.setStyle({
                border: 0,
                background: ""
            }), e.subway.remark.lid = b, e.map.addOverlay(e.subway.remark)
        }, renderSubway: function (b) {
            var c, d = this, e = b.lineId, f = b.stationId, g = b.lon, h = b.lat, i = [],
                j = d.options.status.getSubwayLine(), k = d.options.status.getData("getMapPointBySubway", "RequestUrl");
            d.clear(), delete j.cityName, delete j.type, a.ajax({
                url: k, data: j, success: function (a) {
                    if (d.subway.stations ? d.removeOverlays(d.subway.stations) : d.subway.stations = [], e != d.subway.id) {
                        d.subway.line && d.map.removeOverlay(d.subway.line);
                        for (var b = a.data.tracePoints.length - 1; b >= 0; b--) i.push(new BMap.Point(a.data.tracePoints[b].lon, a.data.tracePoints[b].lat));
                        c = new BMap.Polyline(i, d.options.styles.line), c.lid = e, d.subway.line = c, d.subway.view = i, d.subway.id = e, d.map.addOverlay(c)
                    }
                    d.renderSubwayStations(e, f, a.data), f || (d.loadingMap = !1, d.map.removeOverlay(d.subway.circle), d.map.removeOverlay(d.subway.remark), d.map.setViewport(d.subway.view), setTimeout(function () {
                        d.renderMap()
                    }, d.options.time))
                }
            }), g && h && d.renderMap({zoomLv: d.MAP_LEVELS.ESTATE, lon: g, lat: h})
        }, renderSubwayStations: function (a, b, c) {
            for (var d, f, g = this, h = c.stationList.length - 1; h >= 0; h--) {
                if (f = c.stationList[h], d = new BMap.Label('<p class="lv3"><i class="l"></i><i>' + f.value + " " + f.count + '套</i><i class="r"></i>', {position: new BMap.Point(f.lon, f.lat)}), d.setStyle({
                    border: 0,
                    background: "",
                    padding: 0
                }), d.setZIndex(4), d.lid = a, d.key = f.key, d.addEventListener("mouseover", function () {
                    this.setStyle({zIndex: 8})
                }), d.addEventListener("mouseout", function () {
                    /(class=\"lv2 over)/i.test(this.getContent()) || this.setStyle({zIndex: 4})
                }), d.addEventListener("click", function () {
                    for (var b = g.subway.stations.length - 1; b >= 0; b--) g.subway.stations[b].setContent(g.subway.stations[b].getContent().replace(/(class=\"lv3) over\"/i, '$1"'));
                    this.setContent(this.getContent().replace(/(class=\"lv3)\"/i, '$1 over"')), this.setStyle({zIndex: 7});
                    var c = this.getPosition().lng, d = this.getPosition().lat;
                    g.setCircle(a, c, d), g.options.status.setValue({
                        subWayLineId: this.lid,
                        type: g.POSITION_TYPES.STATION,
                        subWayLineStationId: this.key
                    }, "PositionData"), g.onMapRendered && g.onMapRendered({type: e.LIST}), g.options.status.setValue({
                        level: g.MAP_LEVELS.STATION,
                        lon: c,
                        lat: d
                    }, "MapData"), g.renderMap({zoomLv: g.MAP_LEVELS.STATION, lon: c, lat: d})
                }), b && f.key === b) {
                    for (var i = g.subway.stations.length - 1; i >= 0; i--) g.subway.stations[i].setContent(g.subway.stations[i].getContent().replace(/(class=\"lv3) over\"/i, '$1"'));
                    d.setContent(d.getContent().replace(/(class=\"lv3)\"/i, '$1 over"')), g.setCircle(a, f.lon, f.lat)
                }
                g.subway.stations.push(d), g.map.addOverlay(d)
            }
        }, search: function (a) {
            var b = this, c = b.options.status.CityData.cityName, d = new BMap.LocalSearch(c, {
                onSearchComplete: function (c) {
                    c.getNumPois() > 0 ? (b.mark = c.getPoi(0).point, b.loadingMap = !1, b.map.centerAndZoom(b.mark, b.MAP_LEVELS.ESTATE), b.mark = new BMap.Marker(b.mark), b.map.addOverlay(b.mark), b.options.status.setValue({
                        type: 0,
                        key: a
                    }, "PositionData"), b.onMapRendered && b.onMapRendered({type: e.LIST}), setTimeout(function () {
                        b.renderMap()
                    }, b.options.time)) : b.tips("可视区域没有找到楼盘，移动或放大地图试试!")
                }
            });
            d.search(a)
        }, clear: function () {
            for (var a = this, b = a.options.status.getPositionData(), c = a.getLevel(), d = a.map.getOverlays(), e = b.subWayLineId, f = a.bounds(1), g = d.length - 1; g >= 0; g--) if (!d[g].lid || d[g].lid != e) if (d[g].key && (d[g].count || d[g].avgPrice) && c === a.data.level) {
                var h = d[g].getPosition().lng, i = d[g].getPosition().lat;
                (h > f.maxLon || h < f.minLon || i > f.maxLat || i < f.minLat) && a.map.removeOverlay(d[g])
            } else d[g] != a.mark && a.map.removeOverlay(d[g]);
            c < 2 && (a.map.removeOverlay(a.subway.circle), a.map.removeOverlay(a.subway.remark))
        }, removeOverlays: function (a) {
            for (var b = this, c = a.length - 1; c >= 0; c--) b.map.removeOverlay(a[c])
        }, bounds: function (a) {
            var b = this;
            a = a || 0;
            var c = b.map.getBounds(), d = c.getSouthWest(), e = c.getNorthEast();
            return {
                minLon: d.lng - (e.lng - d.lng) * a,
                maxLon: e.lng + (e.lng - d.lng) * a,
                minLat: d.lat - (e.lat - d.lat) * a,
                maxLat: e.lat + (e.lat - d.lat) * a
            }
        }, tips: function (b, c) {
            var d = this, e = a("#Tips"), f = a(window).width();
            return 0 == e.length && (e = a('<p id="Tips"></p>'), e.appendTo("body")), b ? (c ? e.addClass("loading") : e.removeClass("loading"), e.html(b).show().css("left", Math.ceil(f - e.width()) / 2 / f * 100 + "%"), d.tim && clearTimeout(d.tim), void(d.tim = setTimeout(function () {
                e.fadeOut()
            }, 3e3))) : void e.fadeOut()
        }
    });
    return f
}), define("lib/ui/template", [], function () {
    function a(a, c) {
        return c || (c = {}), b(a, c)
    }

    function b(a, d) {
        var e = /\W/.test(a) ? new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + a.replace(/[\r\t\n]/g, " ").replace(/'(?=[^%]*%>)/g, "\t").split("'").join("\\'").split("\t").join("'").replace(/<%=(.+?)%>/g, "',$1,'").split("<%").join("');").split("%>").join("p.push('") + "');}return p.join('');") : c[a] = c[a] || b(document.getElementById(a).innerHTML);
        return d ? e(d) : e
    }

    var c = {};
    return a
}), define("service/map/search", ["jQuery", "lib/ui/template", "lib/ui/class"], function (a, b, c) {
    var d = c.create({
        setOptions: function (b) {
            var c = {status: null, searchElement: "", searchByKeywordUrl: ""};
            a.extend(!0, this.options = {}, c, b)
        }
    }, {
        init: function (b) {
            this.setOptions(b), this.formElement = a(".Pre").eq(0), this.POSITION_TYPES = this.options.status.POSITION_TYPES, this.MAP_LEVELS = this.options.status.MAP_LEVELS, this.HOUSE_TYPES = this.options.status.HOUSE_TYPES, this.houseType = this.options.status.CityData.houseType, this.searchEventName = this.options.searchEventName, this.listEventName = this.options.listEventName, "2" == this.options.status.options.houseType.toString() ? this.options.localStorageKey = "newHouseSearchKey" : this.options.localStorageKey = "oldHouseSearchKey", this.bindEvent()
        }, getLocalStorage: function () {
            if (!window.localStorage) return [];
            var a = this, b = a.options.localStorageKey, c = localStorage.getItem(b);
            return null == c || "" == c ? [] : c.split(",")
        }, setLocalStorage: function (a) {
            if (window.localStorage) {
                var b = this;
                if ("" != a) {
                    var c = b.options.localStorageKey;
                    null == localStorage.getItem(c) && localStorage.setItem(c, ""), "" == localStorage.getItem(c) ? localStorage.setItem(c, a) : localStorage.getItem(c).split(",").indexOf(a) == -1 && localStorage.setItem(c, localStorage.getItem(c) + "," + a)
                }
            }
        }, bindEvent: function () {
            var b = this, c = this.options, d = null, e = b.formElement, f = b.formElement.find("input:text"),
                g = a('<ul class="searchResList"></ul>').hide();
            f.after(g), f.on("focusin", function () {
                if (d = c.status.getValue("searchByKeyword"), "" == a(this).val()) {
                    for (var e = b.getLocalStorage(), f = [], h = e.length - 1; h > -1; h--) f.push(e[h]);
                    g.html(b.createSearchList(f))
                }
                g.show()
            }), f.on("focusout", function () {
                setTimeout(function () {
                    g.hide()
                }, 200)
            }), f.on("input porpertychange", function () {
                var e = a(this).val();
                "" != e && b.getServerData(c.status.RequestUrl.searchKeywords, {
                    key: e,
                    houseType: d.houseType,
                    cityId: d.cityId
                }, function (a) {
                    g.html(b.createSearchList(a))
                })
            }), g.on("click", "li", function () {
                var c = a(this).text();
                f.val(c), b.getMapData(c), g.hide()
            }), g.on("mouseover", "li", function () {
                a(this).siblings().removeClass("hover"), a(this).addClass("hover")
            }), g.on("mouseout", function () {
                a(this).find("li").removeClass("hover")
            }), e.submit(function (a) {
                a.preventDefault();
                var d = f.val();
                b.getMapData(d);
                var e = c.status.WKBigData;
                return e.eventName = b.searchEventName, e.eventParam = {SearchContent: d}, lifang.sendWKBigData(e), !1
            });
            var h = 0;
            a(window).keydown(function (a) {
                var b = e.find("li"), c = e.find(".hover").length;
                switch (0 == c ? h = -1 : 1 == c && (h = e.find(".hover").index()), a.keyCode) {
                    case 38:
                    case 33:
                        h > 0 && h--, b.removeClass("hover"), b.eq(h).addClass("hover"), f.val(b.eq(h).text());
                        break;
                    case 40:
                    case 34:
                        h < b.length - 1 && h++, b.removeClass("hover"), b.eq(h).addClass("hover"), f.val(b.eq(h).text())
                }
            })
        }, createSearchList: function (a) {
            var b = this, c = b.options.status.CityData.cityId, d = b.options.status.WKBigData.pageName,
                e = b.listEventName;
            a = a || [];
            for (var f = "", g = 0; g < a.length && 10 != g; g++) f += '<li class="WKBigDataBtn" data-params="{pageName:\'' + d + "',pageParam:{},eventName:'" + e + "',eventParam:{choice_content:'" + a[g] + "'},nextPageName:'',nextPageParam:{},city:'" + c + "'}\">" + a[g] + "</li>";
            return f
        }, getServerData: function (b, c, d) {
            a.ajax({
                url: b, type: "POST", async: !0, data: c, timeout: 5e3, dataType: "json", beforeSend: function (a) {
                }, success: function (a, b, c) {
                    1 == a.status && d(a.data)
                }, error: function (a, b) {
                }, complete: function () {
                }
            })
        }, reset: function () {
            a(this.options.searchElement).val("")
        }, getMapData: function (a) {
            var b = this;
            if ("" != a && null != a && void 0 != a) {
                var c = b.options, d = c.status.getValue("searchByKeyword");
                b.setLocalStorage(a), b.getServerData(c.status.RequestUrl.searchByKeyword, {
                    cityId: d.cityId,
                    houseType: d.houseType,
                    key: a
                }, function (d) {
                    "" != d && null != d && void 0 != d ? (b.houseType == b.HOUSE_TYPES.OLD ? (d.type == b.POSITION_TYPES.BLOCK || d.type == b.POSITION_TYPES.STATION || d.type == b.POSITION_TYPES.ESTATE ? c.status.setValue({
                        level: b.MAP_LEVELS.ESTATE,
                        lon: d.lon,
                        lat: d.lat
                    }, "MapData") : c.status.setValue({
                        level: b.MAP_LEVELS.BLOCK,
                        lon: d.lon,
                        lat: d.lat
                    }, "MapData"), c.status.setValue({
                        subEstateId: d.id,
                        type: d.type,
                        name: a
                    }, "PositionData")) : b.houseType == c.status.HOUSE_TYPES.NEW && (c.status.setValue({
                        level: b.MAP_LEVELS.ESTATE,
                        lon: d.lon,
                        lat: d.lat
                    }, "MapData"), c.status.setValue({
                        subEstateId: d.id,
                        type: d.type,
                        name: a
                    }, "PositionData")), c.renderCallback(d)) : c.endCallback(a)
                })
            }
        }
    });
    return d
}), define("service/map/area", ["jQuery", "lib/ui/class", "lib/ui/json"], function (a, b, c) {
    var d = b.create({
        setOptions: function (b) {
            var c = {
                area: a("#Area"),
                cityId: 43,
                houseType: 1,
                status: null,
                urlKey: "RequestUrl",
                areaUrlKey: "getCityAreas",
                cityDataKey: "CityData",
                positionDataKey: "PositionData",
                mapDataKey: "MapData",
                requestUrl: null,
                requestData: null,
                callback: null
            };
            a.extend(!0, this.options = {}, c, b)
        }
    }, {
        init: function (a) {
            this.setOptions(a), this.options.requestUrl = this.options.status.getData(this.options.areaUrlKey, this.options.urlKey), this.options.requestData = this.getRequestData()
        }, getRequestData: function () {
            var a = this.options.status.getAllData("CityData");
            return this.options.cityId = a.cityId, this.options.houseType = a.houseType, a
        }, setHeight: function () {
            var b = this, c = b.options.area.find(".Dn").first(), d = b.options.area.find(".DnR"),
                e = a(window).height() - b.options.area.offset().top - b.options.area.height() - 18;
            c.css("max-height", e + "px"), a.each(d, function (b, d) {
                a(d).height() < c.height() ? a(d).css("min-height", c.height() + "px") : a(d).css("max-height", e + "px")
            })
        }, setActive: function () {
            if (this.options.status.PositionData.type != this.options.status.POSITION_TYPES.ESTATE) return !1;
            var a, b, c, d, e, f = this;
            a = f.options.status.PositionData.districtId, b = f.options.status.PositionData.townId, c = f.options.area.find("dt .Selected"), a && (d = f.options.area.find(".Dn [data-id=" + a + "]"), d.addClass("act").siblings().removeClass("act"), c.attr("data-html", "区域找房").html(d.attr("data-name")), b && (e = f.options.area.find(".DnR [data-areaid=" + a + "]").find("i[data-id=" + b + "]"), f.options.area.find(".DnR [data-areaid=" + a + "]").siblings().find("i").removeClass("act"), e.addClass("act").siblings().removeClass("act"), e.parent().siblings().children("i").removeClass("act"), c.attr("data-html", "区域找房").html(e.attr("data-name"))))
        }, render: function () {
            var b = this;
            a.ajax({
                url: b.options.requestUrl,
                type: "GET",
                dataType: "json",
                cache: !0,
                data: b.getRequestData()
            }).done(function (c) {
                if (1 == c.status && c.data && c.data.length > 0) {
                    var d = b.options.cityId,
                        e = "<div class=\"js-area\"><b class=\"Fl\" data-params=\"{pageName:'Map',pageParam:{},eventName:'ZoneRange',eventParam:{ZoneRange:'0'},nextPageName:'',nextPageParam:{},city:" + d + '}">全部</b><b  class="Fr">' + (c.count || 0) + "套</b></div>",
                        f = a('<dd class="DnR" id="AreaRight"></dd>'), g = "";
                    c = c.data;
                    for (var h = 0; h < c.length; h++) {
                        e += "<div class=\"js-area\" data-params=\"{pageName:'',pageParam:{},eventName:'" + b.options.eventNameZoneRange + "',eventParam:{region_id:'" + c[h].id + "'},nextPageName:'',nextPageParam:{},city:" + d + '}" data-id="' + c[h].id + '" data-name="' + c[h].name + '" data-lat="' + c[h].lat + '" data-lon="' + c[h].lon + '"><b class="Fl">' + c[h].name + '</b><b class="Fr">' + (c[h].count || 0) + "套</b></div>", g += '<p data-areaid="' + c[h].id + '">', f.attr("data-cityid", b.options.cityId);
                        for (var i = 0; i < c[h].subList.length; i++) {
                            g += "<span><b>" + c[h].subList[i].letter + "</b>";
                            for (var j = 0; j < c[h].subList[i].towns.length; j++) g += "<i class=\"js-block\" data-params=\"{pageName:'',pageParam:{},eventName:'" + b.options.eventNameZoneBlock + "',eventParam:{town_id:'" + c[h].subList[i].towns[j].id + "'},nextPageName:'',nextPageParam:{},city:" + d + '}" data-id="' + c[h].subList[i].towns[j].id + '" data-name="' + c[h].subList[i].towns[j].name + '" data-lat="' + c[h].subList[i].towns[j].lat + '" data-lon="' + c[h].subList[i].towns[j].lon + '">' + c[h].subList[i].towns[j].name + "</i>";
                            g += "</span>"
                        }
                        g += "</p>"
                    }
                    f.append(g), b.options.area.find(".Dn").empty(), b.options.area.find(".DnR").remove(), b.options.area.append(f), b.options.area.find(".Dn").append(e), b.setHeight(), b.bindEvent()
                } else b.error()
            }).fail(function () {
                b.error()
            })
        }, bindEvent: function () {
            var b = this;
            a(window).resize(function (a) {
                b.setHeight()
            }), b.options.area.on({
                mouseover: function (c) {
                    this.t && clearTimeout(this.t), b.setHeight();
                    var d = a(this).find(".Dn");
                    a(this).children("dt").addClass("hover").children(".iconfont").addClass("icon-jiantou1").removeClass("icon-jiantou2"), "" != d.html() && d.show()
                }, mouseout: function (c) {
                    this.t && clearTimeout(this.t), b.setHeight();
                    var d = a(this).find(".Dn,.DnR"), e = a(this).children("dt");
                    this.t = setTimeout(function () {
                        e.removeClass("hover").children(".iconfont").addClass("icon-jiantou2").removeClass("icon-jiantou1"), d.hide(), d.children("div").removeClass("hover")
                    }, 200)
                }
            }), b.options.area.find(".Dn").find(".js-area").on({
                mouseover: function () {
                    var c = a(this), d = c.attr("data-id"),
                        e = c.parents(".Dn").siblings(".DnR[data-cityid=" + b.options.cityId + "]").show().find('p[data-areaid="' + d + '"]');
                    return c.addClass("hover").siblings().removeClass("hover"), d ? void e.show().siblings("p").hide() : void c.parents(".Dn").siblings(".DnR").hide()
                }, mouseout: function () {
                }, click: function (c) {
                    var d = a(this);
                    if (d.addClass("act").siblings().removeClass("act"), c.stopPropagation(), c = (c.target || c.srcElement).tagName, "B" != c && "DIV" != c) return !1;
                    var e = d.parent(".Dn").siblings("dt").find(".Selected");
                    e.attr("data-html") || e.attr("data-html", e.html()), d.attr("data-id") ? (e.addClass("act"), e.html(d.find(".Fl").html())) : (e.removeClass("act"), e.html(e.attr("data-html")), window.location.reload()), b.options.area.find(".DnR i.js-block").removeClass("act"), b.options.area.find("dd").hide();
                    var f = b.options.status.MAP_LEVELS.BLOCK;
                    b.options.status.setValue({
                        level: f,
                        lat: d.attr("data-lat") || "",
                        lon: d.attr("data-lon") || ""
                    }, b.options.mapDataKey), b.options.status.setValue({
                        type: b.options.status.POSITION_TYPES.DISTRICT,
                        districtId: d.attr("data-id") || "",
                        name: d.attr("data-name")
                    }, b.options.positionDataKey), b.options.callback && b.options.callback(), b.WKBigData(d)
                }
            }), b.options.area.find(".DnR .js-block").on("click", function (c) {
                c.stopPropagation();
                var d = a(this), e = d.parents("p").attr("data-areaid"),
                    f = d.parents(".DnR").siblings("dt").find(".Selected"),
                    g = b.options.status.HOUSE_TYPES.OLD.toString() === b.options.houseType.toString() ? b.options.status.MAP_LEVELS.ESTATE : b.options.status.MAP_LEVELS.BLOCK;
                b.options.area.find(".DnR i.js-block").removeClass("act"), d.addClass("act"), d.parents(".DnR").siblings(".Dn").find('div[data-id="' + e + '"]').addClass("act").removeClass("hover").siblings().removeClass("act"), f.attr("data-html") || f.attr("data-html", f.html()), f.addClass("act"), f.text(d.text()), b.options.area.find("dd").hide(), b.options.status.setValue({
                    level: g,
                    lat: d.attr("data-lat") || "",
                    lon: d.attr("data-lon") || ""
                }, b.options.mapDataKey), b.options.status.setValue({
                    type: b.options.status.POSITION_TYPES.BLOCK,
                    townId: d.attr("data-id") || "",
                    name: d.attr("data-name")
                }, b.options.positionDataKey), b.options.callback && b.options.callback(), b.WKBigData(d)
            })
        }, reset: function () {
            var a = this, b = a.options.area.find("dt .Selected");
            b.removeClass("act"), b.html(b.attr("data-html"))
        }, WKBigData: function (a) {
            var b = this, d = c.decode(a.attr("data-params"));
            d.pageName = b.options.status.WKBigData.pageName, d.city = b.options.status.WKBigData.city, lifang.sendWKBigData(d)
        }, error: function () {
            console.log("服务端数据异常!")
        }
    });
    return d
}), define("service/map/line", ["jQuery", "lib/ui/class", "lib/ui/json"], function (a, b, c) {
    var d = b.create({
        setOptions: function (b) {
            var c = {
                line: a("#Line"),
                cityId: 43,
                status: null,
                urlKey: "RequestUrl",
                areaUrlKey: "getCitySubWayLines",
                cityDataKey: "CityData",
                positionDataKey: "PositionData",
                mapDataKey: "MapData",
                requestUrl: null,
                requestData: null,
                callback: null
            };
            a.extend(!0, this.options = {}, c, b)
        }
    }, {
        init: function (a) {
            this.setOptions(a), this.options.requestUrl = this.options.status.getData(this.options.areaUrlKey, this.options.urlKey), this.options.requestData = this.getRequestData()
        }, getRequestData: function () {
            var a = this.options.status.getAllData("CityData");
            return this.options.cityId = a.cityId, this.options.houseType = a.houseType, a
        }, len: function (a) {
            var b = 0;
            if (a) for (var c = 0; c < a.length; c++, b++) (a.charCodeAt(c) < 0 || a.charCodeAt(c) > 255) && b++;
            return b
        }, cut: function (a, b, c) {
            if (!(this.len(a) > b)) return a;
            c || (c = "");
            for (var d = 0, e = 1, f = ""; d < a.length; d++, e++) {
                if ((a.charCodeAt(d) < 0 || a.charCodeAt(d) > 255) && e++, e > b) return f + c;
                if (e == b) return f + a.substr(d, 1) + c;
                f += a.substr(d, 1)
            }
        }, setHeight: function () {
            var b = this, c = b.options.line.find(".Dn").first(), d = b.options.line.find(".DnR"),
                e = a(window).height() - b.options.line.offset().top - b.options.line.height() - 18;
            c.css("max-height", e + "px"), a.each(d, function (b, d) {
                a(d).height() < c.height() ? a(d).css("min-height", c.height() + "px") : a(d).css("max-height", e + "px")
            })
        }, render: function () {
            var b = this;
            a.ajax({
                url: b.options.requestUrl,
                type: "GET",
                dataType: "json",
                cache: !0,
                data: b.getRequestData()
            }).done(function (c) {
                if (1 == c.status && c.data && c.data.length > 0) {
                    a("#LineRight").size() > 0 && a("#LineRight").remove();
                    var d = b.options.cityId, e = "", f = "", g = a('<dd class="DnR" id="LineRight"></dd>');
                    c = c.data;
                    for (var h = 0; h < c.length; h++) {
                        e += "<div class=\"js-line\" data-params=\"{pageName:'',pageParam:{},eventName:'" + b.options.eventNameSubway + "',eventParam:{subway_id:'" + c[h].id + "/" + c[h].name + "'},nextPageName:'',nextPageParam:{},city:" + d + '}" data-id="' + c[h].id + '" data-name="' + c[h].name + '"><b class="Fl"><span class="Pr"><i class="iconfont" style="color:#' + c[h].color + '">&#xe611;</i><i style="color:#' + c[h].color + '">' + b.cut(c[h].name, 2) + "</i></span><i>" + b.cut(c[h].name, 12, "…") + '</i></b><b  class="Fr">' + (c[h].count || 0) + "套</b></div>", f += '<p data-lineid="' + c[h].id + '">', g.attr("data-cityId", b.options.cityId);
                        for (var i = 0; i < c[h].subList.length; i++) f += "<span>", f += '<i class="js-station', 0 == i ? f += " first" : i == c[h].subList.length - 1 && (f += " last"), f += "\" data-params=\"{pageName:'',pageParam:{},eventName:'" + b.options.eventNameStation + "',eventParam:{station_id:'" + c[h].subList[i].name + "'},nextPageName:'',nextPageParam:{},city:" + d + '}" data-lineid="' + c[h].id + '" data-sid="' + c[h].subList[i].id + '" data-lat="' + c[h].subList[i].lat + '" data-lon="' + c[h].subList[i].lon + '">' + b.cut(c[h].subList[i].name, 16, "…") + "</i>", f += "</span>";
                        f += "</p>"
                    }
                    b.options.line.find("dt .Selected").html("地铁找房").css("cursor", ""), b.options.line.find(".iconfont").show(), g.append(f), b.options.line.find(".Dn").empty(), b.options.line.find(".DnR").remove(), b.options.line.append(g), b.options.line.find(".Dn").append(e), b.setHeight(), b.bindEvent()
                } else b.options.line.find(".Selected").html("没有地铁").css("cursor", "default"), b.options.line.find(".iconfont").hide(), b.options.line.find(".Dn").html("")
            }).fail(function () {
                b.error()
            })
        }, bindEvent: function () {
            var b = this;
            a(window).resize(function (a) {
                b.setHeight()
            }), b.options.line.on({
                mouseover: function (c) {
                    this.t && clearTimeout(this.t), b.setHeight();
                    var d = a(this).find(".Dn");
                    a(this).children("dt").addClass("hover").children(".iconfont").addClass("icon-jiantou1").removeClass("icon-jiantou2"), "" != d.html() && d.show()
                }, mouseout: function (c) {
                    this.t && clearTimeout(this.t), b.setHeight();
                    var d = a(this).find(".Dn,.DnR"), e = a(this).children("dt");
                    this.t = setTimeout(function () {
                        e.removeClass("hover").children(".iconfont").addClass("icon-jiantou2").removeClass("icon-jiantou1"), d.hide(), d.children("div").removeClass("hover")
                    }, 200)
                }
            }), b.options.line.find(".Dn").find(".js-line").on({
                mouseover: function () {
                    var c = a(this), d = c.attr("data-id"),
                        e = c.parents(".Dn").siblings('.DnR[data-cityId="' + b.options.cityId + '"]').show().find('p[data-lineId="' + d + '"]');
                    return c.addClass("hover").siblings().removeClass("hover"), d ? void e.show().siblings("p").hide() : void c.parents(".Dn").siblings(".DnR").hide()
                }, mouseout: function () {
                }, click: function (c) {
                    var d = a(this);
                    if (d.addClass("act").siblings().removeClass("act"), c.stopPropagation(), c = (c.target || c.srcElement).tagName, "B" != c && "DIV" != c && "I" != c) return !1;
                    var e = d.parent().siblings("dt").find(".Selected");
                    e.attr("data-html") || e.attr("data-html", e.html()), d.attr("data-id") ? (e.addClass("act"), e.html(d.find(".Fl>i").html())) : (e.removeClass("act"), e.html(e.attr("data-html")), window.location.reload()), b.options.line.find(".DnR i.js-station").removeClass("act"), b.options.line.find("dd").hide(), b.options.status.setValue({
                        level: b.options.status.MAP_LEVELS.DISTRICT,
                        lat: d.attr("data-lat") || "",
                        lon: d.attr("data-lon") || ""
                    }, b.options.mapDataKey), b.options.status.setValue({
                        type: b.options.status.POSITION_TYPES.SUBWAY,
                        subWayLineId: d.attr("data-id") || "",
                        name: ""
                    }, b.options.positionDataKey), b.options.callback && b.options.callback(), b.WKBigData(d)
                }
            }), b.options.line.find(".DnR .js-station").on("click", function (c) {
                c.stopPropagation();
                var d = a(this), e = d.parents("p").attr("data-lineId"),
                    f = d.parents(".DnR").siblings("dt").find(".Selected"),
                    g = d.parents(".DnR").siblings(".Dn").find('div[data-id="' + e + '"]'),
                    h = b.options.status.MAP_LEVELS.STATION;
                b.options.line.find(".DnR i.js-station").removeClass("act"), d.addClass("act"), g.addClass("act").removeClass("hover").siblings().removeClass("act"), f.attr("data-html") || f.attr("data-html", f.html()), f.addClass("act"), f.text(d.text()), b.options.line.find("dd").hide(), b.options.status.setValue({
                    level: h,
                    lat: d.attr("data-lat") || "",
                    lon: d.attr("data-lon") || ""
                }, b.options.mapDataKey), b.options.status.setValue({
                    type: b.options.status.POSITION_TYPES.STATION,
                    subWayLineId: d.attr("data-lineid") || "",
                    subWayLineStationId: d.attr("data-sid") || "",
                    name: ""
                }, b.options.positionDataKey), b.options.callback && b.options.callback(), b.WKBigData(d)
            })
        }, reset: function () {
            var a = this, b = a.options.line.find("dt .Selected");
            b.removeClass("act"), b.html(b.attr("data-html"))
        }, WKBigData: function (a) {
            var b = this, d = c.decode(a.attr("data-params"));
            d.pageName = b.options.status.WKBigData.pageName, d.city = b.options.status.WKBigData.city, lifang.sendWKBigData(d)
        }, error: function () {
            console.log("服务端数据异常!")
        }
    });
    return d
}), define("service/map/select", ["jQuery", "lib/ui/class", "lib/ui/json"], function (a, b, c) {
    var d = b.create({
        setOptions: function (b) {
            var c = {
                filter: a("dl.Select"),
                cityId: 43,
                status: null,
                moreValue: [],
                moreSelectValue: [],
                houseType: [],
                houseTypeName: [],
                feature: [],
                decoration: [],
                newHouseProperty: [],
                urlKey: "requestUrl",
                areaUrlKey: "getCitySubWayLines",
                cityDataKey: "CityData",
                filterDataKey: "FilterData",
                callback: null
            };
            a.extend(!0, this.options = {}, c, b)
        }
    }, {
        init: function (a) {
            this.setOptions(a), this.bindEvent()
        }, bindEvent: function () {
            var b = this;
            b.options.filter.on({
                mouseover: function (b) {
                    this.t && clearTimeout(this.t);
                    var c = a(this).find(".Dn");
                    a(this).children("dt").addClass("hover").children(".iconfont").addClass("icon-jiantou1").removeClass("icon-jiantou2"), "" != c.html() && c.show()
                }, mouseout: function (b) {
                    this.t && clearTimeout(this.t);
                    var c = a(this).find(".Dn,.DnR"), d = a(this).children("dt");
                    this.t = setTimeout(function () {
                        d.removeClass("hover").children(".iconfont").addClass("icon-jiantou2").removeClass("icon-jiantou1"), c.hide(), c.children("div").removeClass("hover")
                    }, 200)
                }
            }), b.options.filter.find(".Dn>i").click(function () {
                var c = a(this), d = c.parent(), e = d.siblings("dt").find(".Selected"), f = e.attr("id");
                c.addClass("act").siblings().removeClass("act"), e.attr("data-html") || e.attr("data-html", e.html()), c.attr("data-value") && "0" != c.attr("data-value") ? (e.html(c.html()), e.addClass("act")) : (e.removeClass("act"), e.html(e.attr("data-html"))), e.attr({
                    "data-value": c.attr("data-value"),
                    "data-text": c.html()
                }), d.hide(), "sj" === f ? b.options.status.setValue({s: "" | c.attr("data-value")}, b.options.filterDataKey) : "mj" === f && b.options.status.setValue({m: "" | c.attr("data-value")}, b.options.filterDataKey), b.options.callback && b.options.callback(), b.WKBigData(e)
            }), b.options.filter.find(".room").children("a").click(function () {
                var c = a(this), d = c.attr("data-value"), e = c.text(),
                    f = c.parent().siblings("dt").children(".Selected");
                c.hasClass("act") ? (c.removeClass("act").children("em").removeClass("icon-kuang2"), b.options.houseType.remove(d), b.options.houseTypeName.remove(e)) : (c.addClass("act").children("em").addClass("icon-kuang2"), b.options.houseType.push(d), b.options.houseTypeName.push(e)), f.attr("data-value", b.options.houseType.join(",")), b.options.status.setValue({h: b.options.houseType.join(",")}, b.options.filterDataKey), b.options.callback && b.options.callback(), b.WKBigData(f)
            }), b.options.filter.find(".fourPart dd").children("a").click(function () {
                var c = a(this), d = c.attr("data-value"), e = c.attr("data-eventParam"), f = c.parents("dl"),
                    g = f.attr("id");
                c.hasClass("act") ? (c.removeClass("act").children("em").removeClass("icon-kuang2"), b.options.moreValue.remove(d), "ts" === g ? b.options.feature.remove(e) : "zx" === g ? b.options.decoration.remove(e) : "xfwylx" === g && b.options.newHouseProperty.remove(e)) : (c.addClass("act").children("em").addClass("icon-kuang2"), b.options.moreValue.push(d), "ts" === g ? b.options.feature.push(e) : "zx" === g ? b.options.decoration.push(e) : "xfwylx" === g && b.options.newHouseProperty.push(e)), c.parents("#moreSelect").attr("data-CheckValue", b.options.moreValue.join(",")), b.options.status.setValue({t: b.options.moreValue.join(",")}, b.options.filterDataKey), b.options.callback && b.options.callback(), b.WKBigData(f)
            }), b.options.filter.find(".selectedBox").on({
                mouseover: function () {
                    a(this).find(".options").show()
                }, mouseout: function () {
                    a(this).find(".options").hide()
                }
            }).find("a").click(function (c) {
                var d = a(this), e = d.parents(".options"), f = d.attr("data-value"),
                    g = (d.text(), d.parents(".selectItem"));
                b.options.moreSelectValue = [], e.hide(), e.siblings(".text").text(d.text()), g.attr({
                    "data-value": f,
                    "data-text": d.text()
                }), a(".selectItem").each(function (c, d) {
                    b.options.moreSelectValue.push(a(d).attr("data-value"))
                }), d.parents("#moreSelect").attr("data-SelectValue", b.options.moreSelectValue.join(",")), b.options.status.setValue({x: b.options.moreSelectValue.join(",")}, b.options.filterDataKey), b.options.callback && b.options.callback(), b.WKBigData(g)
            })
        }, reset: function () {
        }, WKBigData: function (a) {
            var b = this, d = a.attr("id"), e = a.attr("data-text"), f = c.decode(a.attr("data-params")),
                g = 1 === b.options.status.options.houseType;
            "sj" === d ? (f.eventName = g ? "1037051" : "1036039", f.eventParam = {price_range: e}) : "mj" === d ? (f.eventName = g ? "1037047" : "1036035", f.eventParam = {area_range: e}) : "hx" === d ? (f.eventName = g ? "1037046" : "1036033", f.eventParam = {room: b.options.houseTypeName}) : "ts" === d ? (f.eventName = g ? "1037052" : "1036040", f.eventParam = {feature: b.options.feature}) : "zx" === d ? (f.eventName = g ? "1037054" : "1036042", f.eventParam = {fitment: b.options.decoration}) : "fwlx" === d ? (f.eventName = "1037045", f.eventParam = {house_type: e}) : "fl" === d ? (f.eventName = "1037044", f.eventParam = {houseage: e}) : "wylx" === d ? (f.eventName = "1037053", f.eventParam = {estate_types: e}) : "xfwylx" === d && (f.eventName = "1036041", f.eventParam = {estate_types: b.options.newHouseProperty}), f.pageName = b.options.status.WKBigData.pageName, f.city = b.options.status.WKBigData.city, lifang.sendWKBigData(f)
        }, error: function () {
            console.log("服务端数据异常!")
        }
    });
    return d
}), define("lib/ui/lazyload", ["jQuery", "lib/ui/class"], function (a, b) {
    var c = b.create({
        setOptions: function (b) {
            var c = {
                container: window,
                lazy: a("img"),
                direction: "vertical",
                delay: 100,
                expect: 0,
                placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC",
                effect: "fadeIn",
                effectTime: 400,
                original: "data-original",
                callback: function () {
                }
            };
            a.extend(this, c, b)
        }, init: function (b) {
            if (this.setOptions(b), this.lazy && !(this.lazy.size() <= 0)) {
                var c = this;
                this.$container = a(void 0 === this.container || this.container === window ? window : this.container), this.lazy.each(function () {
                    var b = this, d = a(this);
                    void 0 !== d.attr("src") && d.attr("src") !== !1 && "" != d.attr("src") || d.is("img") && d.attr("src", c.placeholder).addClass("ui-lazyload"), d.one("appear", function () {
                        this.loaded || a("<img />").bind("load", function () {
                            var e = d.attr(c.original);
                            if (e) {
                                d.hide(), d.is("img") ? d.attr("src", e) : d.css("background-image", "url('" + e + "')"), d[c.effect](c.effectTime), b.loaded = !0;
                                var f = a.grep(c.lazy, function (a) {
                                    return !a.loaded
                                });
                                c.lazy = a(f)
                            }
                        }).bind("error", function () {
                            console.log("懒加载失败"), d.attr("src", c.placeholder).addClass("ui-lazyerror")
                        }).attr("src", d.attr(c.original))
                    })
                }), this.callback.call(this), this.bindEvent()
            }
        }, run: function () {
            var b = this;
            b.lazy.each(function () {
                b[b.direction](this) && a(this).trigger("appear")
            })
        }, vertical: function (b) {
            var c = document.documentElement, d = document.body, e = c.scrollTop || d.scrollTop;
            return a(b).offset().top < e + this.$container.height() + this.expect
        }, bindEvent: function () {
            var b = this;
            a(document).ready(function () {
                b.run()
            }), a(window).on("resize", function () {
                b.run()
            }), this.$container.on("scroll", function () {
                return b.run()
            })
        }
    });
    return c
}), define("lib/ui/pc/placeholder", ["jQuery", "lib/ui/class"], function (a, b) {
    var c = b.create({
        setOptions: function (b) {
            var c = {element: null, tipsNode: "data-placeholder", selClass: "input-sel", selClassText: ""};
            a.extend(!0, this, c, b)
        }
    }, {
        init: function (b) {
            this.setOptions(b);
            var c = this, d = this.element;
            this.focusFlag = !1, d && d.size() > 0 && (d.each(function () {
                c._showTips(a(this))
            }), this.bindEvent())
        }, _showTips: function (a) {
            this.focusFlag = !0, this._checkValue(a) ? (a.addClass(this.selClass).val(a.attr(this.tipsNode)), a.get(0).style.cssText += this.selClassText) : (this.selClass && a.removeClass(this.selClass), a[0].style.cssText = a[0].style.cssText.replace(this.selClassText, "", "g"))
        }, _hideTips: function (a) {
            if (this.focusFlag = !1, this._checkValue(a)) {
                var b = this.selClass, c = this.selClassText;
                b && a.removeClass(b), a[0].style.cssText = a[0].style.cssText.replace(c, "", "g"), a[0].value = "", a[0].select()
            }
        }, _checkValue: function (b) {
            return "" == a.trim(b.val()) || b.val() == b.attr(this.tipsNode)
        }, isEmpty: function (a) {
            return this._checkValue(a)
        }, clear: function () {
            var b = this;
            this.element.each(function () {
                b._checkValue(a(this)) && (this.value = "")
            })
        }, bindEvent: function () {
            var b = this;
            this.element.bind("focus", function () {
                b._hideTips(a(this))
            }), this.element.bind("blur", function () {
                b._showTips(a(this))
            })
        }
    });
    return c
}), define("lib/ui/drag", ["jQuery"], function (a) {
    var b = function (b, c) {
        c = a.extend({
            current: null, callback: function () {
            }, upCallback: function () {
            }, downCallback: function () {
            }, moveCallback: function () {
            }
        }, c || {});
        var d = c.current ? c.current : b;
        d instanceof Array && d.length > 1 || (c.callback.call(d), b.css("cursor", "move"), b.on("mousedown", function (b) {
            document.all || b.preventDefault();
            var e = d.offset(), f = {x: b.pageX, y: b.pageY}, g = !0;
            c.downCallback.call(d), a(document).on({
                mouseup: function () {
                    g = !1, a(document).off("mouseup"), a(document).off("mousemove"), c.upCallback.call(d)
                }, mousemove: function (a) {
                    if (g) {
                        var b = {x: a.pageX, y: a.pageY};
                        d.css({left: b.x - f.x + e.left + "px", top: b.y - f.y + e.top + "px"}), c.moveCallback.call(d)
                    }
                    return !1
                }
            })
        }))
    };
    return b
}), define("lib/ui/dialog", ["jQuery", "lib/ui/class", "lib/ui/drag", "lib/ui/template"], function (a, b, c, d) {
    var e = b.create({
        setOptions: function (b) {
            var c = {
                template: '\t\t\t\t\t<div class="ui-dialog  <%=customClassName%>">\t\t\t\t\t\t<div class="title <%if(isDrag){%>ui-drag<%}%>">\t\t\t\t\t\t\t<%if(isClose){%>\t\t\t\t\t\t\t<a class="dialog-close" href="javascript:void(0);"><i class="wk_iconfont icon-duibiguanbifangyuan"></i></a>\t\t\t\t\t\t\t<%}%>\t\t\t\t\t\t\t<h3><%=title%></h3>\t\t\t\t\t\t</div>\t\t\t\t\t\t<div class="wrap">\t\t\t\t\t\t\t<div class="content">\t\t\t\t\t\t\t\t<%=message%>\t\t\t\t\t\t\t</div>\t\t\t\t\t\t</div>\t\t\t\t\t\t<%if(confirm || cancel){%>\t\t\t\t\t\t<div class="buttons <%if(confirm && !cancel){%>only<%}%> clearfix">\t\t\t\t\t\t\t<%if(cancel){%>\t\t\t\t\t\t\t\t<div class="dialog-cancel clearfix"><%=cancel%></div>\t\t\t\t\t\t\t<%}%>\t\t\t\t\t\t\t<%if(confirm){%>\t\t\t\t\t\t\t\t<div class="dialog-ok clearfix"><%=confirm%></div>\t\t\t\t\t\t\t<%}%>\t\t\t\t\t\t</div>\t\t\t\t\t\t<%}%>\t\t\t\t\t</div>\t\t\t\t',
                element: null,
                container: null,
                name: "",
                isMask: !0,
                loading: "",
                customClassName: "",
                message: "这是您新创建的窗口",
                newclass: "",
                isDrag: !1,
                isClose: !0,
                title: "温馨提示",
                icon: "ico_info_l",
                confirm: "确 定",
                cancel: "取 消",
                duration: 200,
                beforeCallback: function () {
                    return this
                },
                resizeCallback: function () {
                },
                cancelCallback: function () {
                    this.hide()
                },
                successCallback: function () {
                    this.hide()
                },
                closeCallback: function () {
                    this.hide()
                }
            };
            a.extend(!0, this, c, b)
        }
    }, {
        init: function (b) {
            this.setOptions(b), this.element = a(this.element), this.template = "object" == typeof this.template ? this.template.html() : this.template, this.create(), this.bindEvent()
        }, createMask: function () {
            var b = "ui-iframe-container";
            if (a("#" + b).size() <= 0) {
                var c = document.createElement("div");
                c.id = b, a(c).css({
                    opacity: .6,
                    display: "none",
                    backgroundColor: "#000000",
                    zIndex: 7e3,
                    position: "absolute",
                    left: 0,
                    top: 0
                }), a(document.body).append(c)
            }
            return this.iframeContainer = a("#" + b), this.isMask = this.iframeContainer.length > 0, this.iframeContainer
        }, create: function () {
            var b = {};
            if (this.isMask && this.createMask(), !this.container && (!this.element || this.element.size() <= 0)) {
                var e = document.createElement("div");
                e.id = "ui-dialog-" + lifang.uid(), e.className = this.newclass, a(document.body).append(e), this.name = e.id, this.container = a(e), this._remove = !0
            }
            if (this.element && this.element.size() > 0 ? (b.width = this.element.width(), b.height = this.element.height(), this.container = this.element) : this.container.html(d(this.template, this)), this.container.css(a.extend({
                position: "fixed",
                display: "none",
                zIndex: "7001"
            }, b)), this.isDrag) {
                var f = this.container.find(".ui-drag");
                c(f.size() <= 0 ? this.container : f, {
                    current: this.container, downCallback: function () {
                        "fixed" == a(this).css("position") && a(this).css({
                            position: "absolute",
                            top: 1 * document.documentElement.scrollTop + 1 * document.body.scrollTop + parseFloat(this.css("top"))
                        })
                    }
                })
            }
            this.setCenter()
        }, show: function () {
            this.iframeContainer && this.iframeContainer.fadeIn(this.duration), this.container.fadeIn(this.duration), this.display = "hide"
        }, hide: function (a) {
            var b = this;
            this.iframeContainer && this.iframeContainer.fadeOut(this.duration), this.container.fadeOut(this.duration, function () {
                b.dispose()
            }), this.display = "show"
        }, toggle: function () {
            this[this.display]()
        }, dispose: function () {
            this.element || this.container.remove()
        }, setCenter: function () {
            var a = {
                left: Math.max(0, (document.documentElement.clientWidth - 1 * this.container.width()) / 2),
                top: Math.max(0, (document.documentElement.clientHeight - 1 * this.container.height()) / 2)
            }, b = {
                width: Math.max(document.documentElement.clientWidth, document.documentElement.scrollWidth, document.body.clientWidth, document.body.scrollWidth),
                height: Math.max(document.documentElement.clientHeight, document.documentElement.scrollHeight, document.body.clientHeight, document.body.scrollHeight)
            };
            this.isMask && this.iframeContainer.css({
                width: b.width,
                height: b.height
            }), this.container.css({position: "fixed", left: a.left, top: a.top})
        }, resetHeight: function (a) {
            this.container.css(a, "auto"), this.resizeHandler()
        }, resizeHandler: function () {
            this.setCenter(), this.resizeCallback()
        }, bindEvent: function () {
            var b = this.isDrag ? "mousedown" : "click";
            this.container.off(), this.container.on(b, ".dialog-close", this.closeCallback.bind(this)), this.container.on(b, ".dialog-ok", this.successCallback.bind(this)), this.container.on(b, ".dialog-cancel", this.cancelCallback.bind(this)), a(window).on("resize scroll", this.resizeHandler.bind(this))
        }
    });
    return a.extend(e, {
        alert: function (b, c) {
            c = a.extend({title: "提示", cancel: "", type: "alert"}, c || {}), c.message = b ? b : c.message;
            var d = new e(c);
            return d.show(), d
        }, confirm: function (b, c) {
            c = a.extend({}, c || {}), c.message = b ? b : c.message;
            var d = new e(c);
            return d.show(), d
        }, mask: function (b, c) {
            c = a.extend({isMask: !0, element: b || "", type: "mask"}, c || {});
            var d = new e(c);
            return d.show(), d
        }
    }), e
}), define("util/login", ["jQuery", "lib/ui/pc/placeholder", "lib/ui/dialog", "lib/ui/cookie", "lib/ui/class"], function (a, b, c, d, e) {
    function f(a) {
        a.loginMask = c.mask(a.form, {
            isDrag: !1, closeCallback: function () {
                this.hide()
            }
        })
    }

    var g = e.create({
        setOptions: function (b) {
            this.options = {
                template: '                    <div class="loginWindow" method="post">                        <div class="wk_iconfont icon-duibiguanbifangyuan closeLogin"></div>                        <div id="login_logo"></div>                        <div class="loginInput" id="loginPhone">                            <div class="loginTypeName" id="login_phone_title"><span>手机号码</span><span class="wrongTips wrongTel"></span></div>                            <input placeholder="请输入手机号码" type="text" name="mobile" maxlength="11" autocomplete="off"/>                            <span class="sendCode">获取动态密码</span>                        </div>                        <div class="loginInput" id="loginSecurityImg">                            <div class="loginTypeName" id="login_verify_title"><span>验证码</span><span class="wrongTips wrongImgNum"></span></div>                            <input name="imgCode" type="text" placeholder="请输入右侧验证码" class="checkinput" maxlength="4"/>                            <span class="vertifyImg">                                <img title="点击换一张" src="img/source/img_detail_default.png">                            </span>                        </div>                        <div class="loginInput" id="loginSecurity" checkType="numberCheck">                            <div class="loginTypeName" id="login_password_title"><span>动态密码</span><span class="wrongTips wrongPassword"></span></div>                            <input placeholder="请输入动态密码" type="text" name="code" maxlength="6"/>                        </div>                        <div id="loginButton" class="sendCodeBottom" name="submit">获取动态密码</div>                        <div id="voice_verify">                            <div class="sendVoiceCode">收不到短信验证码？试试 <span id="voice_verify_button">语音验证</span></div>                            <div class="VoiceTip">电话拨打中，请留意号码 <span>12590-9888304</span> 来电</div>                        </div>                    </div>                ',
                codeUrl: lifang.getAjaxUrl("/member/checkAndGenerateIdentifyCode.rest"),
                isLoginUrl: lifang.getAjaxUrl("/member/isLogin.rest"),
                submitUrl: lifang.getAjaxUrl("/member/loginFromMobilePhone.rest"),
                loginoutUrl: lifang.getAjaxUrl("/member/logout.do"),
                checkUrl: lifang.getAjaxUrl("/member/getVertifyCode.rest"),
                mobileInput: null,
                codeInput: null,
                submitInput: null,
                codeObj: null,
                checkInput: null,
                form: null,
                checkbut: null
            }, a.extend(!0, this.options, b)
        }
    }, {
        init: function (c) {
            this.setOptions(c), this.form = this.options.form || a(".loginWindow"), this.form.size() <= 0 && a(document.body).append(a(this.options.template)), this.mobileInput = this.options.mobileInput || this.form.find("[name='mobile']"), this.codeInput = this.options.codeInput || this.form.find("[name='code']"), this.checkInput = this.options.checkInput || this.form.find("[name='imgCode']"), this.cityId = a("#cityId").val() || "", this.pageName = this.options.pageName || a("#pageNameBigData").val() || "", this.pageParam = {} || this.options.pageParam, this.submitInput = this.options.submitInput || this.form.find("[name='submit']"), this.codeObj = this.options.codeObj || this.form.find(".sendCode"), this.sendCodeBottom = this.options.sendCodeBottom || this.form.find(".sendCodeBottom"), this.sendVoiceCodeButton = this.options.sendVoiceCodeButton || this.form.find("#voice_verify_button"), this.wrongTel = a(".wrongTel"), this.wrongImgNum = a(".wrongImgNum"), this.wrongPassword = a(".wrongPassword"), this.disabledClass = this.options.disabledClass || "disabled", this.submitInput.addClass(this.disabledClass), this.placeholder = new b({
                element: this.form.find("input"),
                tipsNode: "placeholder"
            }), this.loginMask = null, this.bindEvent()
        }, addOptions: function (b) {
            a.extend(!0, this.addOption = {}, b), this.pageName = this.addOption.pageName || a("#pageNameBigData").val() || "", this.pageParam = this.addOption.pageParam || {}, this.pageParamStr = JSON.stringify(this.pageParam)
        }, codeBtnTiming: function (b) {
            var c = this;
            if (b) {
                clearTimeout(this.timeoutCodeObj);
                var d = 60;
                b.addClass(this.disabledClass).attr("disabled", !0);
                var e = function () {
                    d > 0 ? (b.css({cursor: "auto"}).unbind("click"), b.html("还有" + d + "秒"), this.timeoutCodeObj = setTimeout(e, 1e3), --d) : (b.css({cursor: "pointer"}).on("click", function () {
                        var b = a(".checkinput").val() ? a(".checkinput").val() : "";
                        c.sendCode(a(this), b)
                    }), b.html("重发动态码").attr("disabled", !1), this.mobileInput.attr("readonly", !1))
                }.bind(this);
                e()
            }
        }, validateMobile: function () {
            return this.placeholder.isEmpty(this.mobileInput) ? (this.wrongTel.html("手机号码不能为空，请重新输入").fadeIn(200), setTimeout("$('.wrongTel').fadeOut(200)", 3e3), this.mobileInput.focus(), !1) : /^1[3|4|5|7|8]\d{9}$/.test(this.mobileInput.val()) ? !(this.placeholder.isEmpty(a(".checkinput")) && a(".checkinput").length > 0) || (this.wrongImgNum.html("验证码错误，请重新输入").fadeIn(200), setTimeout("$('.wrongImgNum').fadeOut(200)", 3e3), a(".checkinput").focus(), !1) : (this.wrongTel.html("手机号码错误，请重新输入").fadeIn(200), setTimeout("$('.wrongTel').fadeOut(200)", 3e3), this.mobileInput.focus(), !1)
        }, submitFn: function (b, c) {
            var d = this;
            return d.beforeFn && d.beforeFn(), data = {
                phone: this.mobileInput.val(),
                identifyCode: this.codeInput.val()
            }, a.ajax({
                type: this.form.attr("method"),
                url: this.options.submitUrl,
                cache: !1,
                dataType: "json",
                data: data,
                error: function () {
                    lifang.sendWKBigData({
                        city: d.cityId,
                        pageName: d.pageName,
                        pageParam: d.pageParam,
                        eventName: "1034004",
                        eventParam: {phone: this.mobileInput.val()},
                        nextPageName: d.pageName,
                        nextPageParam: {}
                    })
                },
                success: function (c) {
                    if (this.codeObj.attr("disabled") || this.mobileInput.attr("readonly", !1), this.codeInput.attr("readonly", !1), 1 == c.status) {
                        b.attr("disabled", !1).removeClass(this.disabledClass);
                        var e = data.phone.slice(0, 3), f = data.phone.slice(7), g = e + "****" + f;
                        a(".publicHead").find(".loginStatus").html('                        <a class="wk_iconfont icon-denglu WKBigDataBtn" data-params="{pageName:\'' + d.pageName + "',pageParam:" + d.pageParamStr + ",eventName:'UserIcon',eventParam:{},nextPageName:'SHRecords',nextPageParam:{},city:" + d.cityId + '}" data-href="/getOldSeeRecord.html"></a>                        <a class="userTel WKBigDataBtn" data-params="{pageName:\'' + d.pageName + "',pageParam:" + d.pageParamStr + ",eventName:'PhoneNumber',eventParam:{},nextPageName:'SHRecords',nextPageParam:{},city:" + d.cityId + '}" data-href="/getOldSeeRecord.html">' + g + '</a>                        <a class="quitButtonNei WKBigDataBtn" data-params="{pageName:\'' + d.pageName + "',pageParam:" + d.pageParamStr + ",eventName:'Exit',eventParam:{},nextPageName:'Home',nextPageParam:{},city:" + d.cityId + '}" data-href="/member/logout.do" >退出</a>                        '), a("#ui-iframe-container").hide(), a(".loginWindow").hide(), this.__isLogin = !0, d.options.WLsuccessCallBack && d.options.WLsuccessCallBack(), lifang.sendWKBigData({
                            city: d.cityId,
                            pageName: d.pageName,
                            pageParam: d.pageParam,
                            eventName: "1034004",
                            eventParam: {phone: this.mobileInput.val()},
                            nextPageName: d.pageName,
                            nextPageParam: {}
                        }, function () {
                            d.callback && d.callback()
                        })
                    } else lifang.sendWKBigData({
                        city: d.cityId,
                        pageName: d.pageName,
                        pageParam: d.pageParam,
                        eventName: "1034004",
                        eventParam: {phone: this.mobileInput.val()},
                        nextPageName: d.pageName,
                        nextPageParam: {}
                    }), this.codeInput.val(""), this.codeInput.get(0).focus(), this.wrongPassword.html("动态密码错误，请重新输入").fadeIn(200), setTimeout("$('.wrongPassword').fadeOut(200)", 3e3)
                }.bind(this)
            }), !1
        }, sendCodeFirst: function (b, c) {
            var d = this, e = a.trim(this.mobileInput.val());
            this.validateMobile() && a.ajax({
                type: "post",
                dataType: "json",
                url: this.options.codeUrl,
                data: {phone: e, verifyCode: c},
                success: function (c) {
                    1 == c.status ? (c = c.data, this.mobileInput.attr("readonly", "readonly"), this.codeObj.fadeIn(), this.codeBtnTiming(this.codeObj), a("#loginSecurityImg").hide(), a("#loginSecurity").fadeIn(), a(".sendVoiceCode").addClass("voiceShow"), d.loginMask.resetHeight("height"), window.ga && window.ga("send", "event", "button-code", "click", "verifyCode"), b.unbind("click"), b.html("登 录"), b.on("click", function () {
                        d.submitFn(a(this))
                    })) : (this.wrongImgNum.html(c.message).fadeIn(200), setTimeout("$('.wrongImgNum').fadeOut(200)", 3e3))
                }.bind(this)
            }), lifang.sendWKBigData({
                city: d.cityId,
                pageName: d.pageName,
                pageParam: d.pageParam,
                eventName: "1034001",
                eventParam: {},
                nextPageName: "",
                nextPageParam: {}
            })
        }, sendCode: function (b, c) {
            var d = a.trim(this.mobileInput.val());
            this.validateMobile() && a.ajax({
                type: "post",
                dataType: "json",
                url: this.options.codeUrl,
                data: {phone: d, verifyCode: c},
                success: function (a) {
                    1 == a.status ? (a = a.data, this.mobileInput.attr("readonly", "readonly"), this.codeBtnTiming(b), ga("send", "event", "button-code", "click", "verifyCode")) : (this.wrongImgNum.html(a.message).fadeIn(200), setTimeout("$('.wrongImgNum').fadeOut(200)", 3e3))
                }.bind(this)
            })
        }, sendVoiceCode: function (b, c) {
            var d = a.trim(this.mobileInput.val());
            this.validateMobile() && a.ajax({
                type: "post",
                dataType: "json",
                url: this.options.codeUrl,
                data: {phone: d, verifyCode: c, codeType: 2},
                success: function (b) {
                    1 == b.status ? (b = b.data, this.mobileInput.attr("readonly", "readonly"), a(".VoiceTip").fadeIn(300), setTimeout('$(".VoiceTip").fadeOut(300)', 3e3), ga("send", "event", "button-code", "click", "verifyCode")) : (this.wrongImgNum.html(b.message).fadeIn(200), setTimeout("$('.wrongImgNum').fadeOut(200)", 3e3))
                }.bind(this)
            })
        }, isLogin: function (b, c) {
            return this.__isLogin ? (c && c(), b(), this) : (a.ajax({
                type: "post",
                dataType: "json",
                url: this.options.isLoginUrl,
                error: function () {
                    f(this), this.callback = b
                }.bind(this),
                success: function (a) {
                    1 == a.status ? (this.__isLogin = !0, c && c(), b()) : (f(this), this.beforeFn = c, this.callback = b)
                }.bind(this)
            }), this)
        }, isLogout: function (a) {
            this.outCallback = a
        }, loginOut: function () {
            this.outCallback && this.outCallback(), window.location.href = this.options.loginoutUrl
        }, bindEvent: function () {
            var b = this;
            a(".publicHead").on("click", ".quitButtonNei,.quitButton", function () {
                b.loginOut()
            }), this.codeObj.on("click", function () {
                window.ga && window.ga("send", "event", "resendclick", "click", "resend");
                var c = a(".checkinput").val() ? a(".checkinput").val() : "";
                b.sendCode(a(this), c), ga("send", "event", "button-code", "click", "verifyCode")
            }), this.sendCodeBottom.on("click", function () {
                var c = a(".checkinput").val() ? a(".checkinput").val() : "";
                b.sendCodeFirst(a(this), c)
            }), a(".vertifyImg img").on("click", function () {
                var c = a(this);
                c.attr("src", b.options.checkUrl + "?v=" + (new Date).getTime()), lifang.sendWKBigData({
                    city: b.cityId,
                    pageName: b.pageName,
                    pageParam: b.pageParam,
                    eventName: "1034008",
                    eventParam: {},
                    nextPageName: "",
                    nextPageParam: {}
                })
            }), this.sendVoiceCodeButton.on("click", function () {
                var c = a(".checkinput").val() ? a(".checkinput").val() : "";
                b.sendVoiceCode(a(this), c), window.ga && ga("send", "event", "button-code", "click", "verifyCode"), lifang.sendWKBigData({
                    city: b.cityId,
                    pageName: b.pageName,
                    pageParam: b.pageParam,
                    eventName: "1034002",
                    eventParam: {},
                    nextPageName: "",
                    nextPageParam: {}
                })
            }), a(".closeLogin").on("click", function () {
                b.mobileInput.val("").attr("readonly", !1), b.checkInput.val(""), b.codeInput.val(""), a("#loginSecurityImg").show(), a("#loginSecurity").hide(), b.codeObj.hide(), b.sendCodeBottom.unbind("click"), b.sendCodeBottom.html("获取动态密码"), b.sendCodeBottom.on("click", function () {
                    var c = a(".checkinput").val() ? a(".checkinput").val() : "";
                    b.sendCodeFirst(a(this), c)
                }), a("#ui-iframe-container").fadeOut(300), a(".ui-tips-container").fadeOut(), a(".loginWindow").fadeOut(300), a(".sendVoiceCode").removeClass("voiceShow")
            }), this.mobileInput.on("focus", function (a) {
                lifang.sendWKBigData({
                    city: b.cityId,
                    pageName: b.pageName,
                    pageParam: b.pageParam,
                    eventName: "1034005",
                    eventParam: {},
                    nextPageName: "",
                    nextPageParam: {}
                })
            }), this.checkInput.on("focus", function (a) {
                lifang.sendWKBigData({
                    city: b.cityId,
                    pageName: b.pageName,
                    pageParam: b.pageParam,
                    eventName: "1034007",
                    eventParam: {},
                    nextPageName: "",
                    nextPageParam: {}
                })
            }), this.codeInput.on("focus", function (a) {
                lifang.sendWKBigData({
                    city: b.cityId, pageName: b.pageName, pageParam: b.pageParam, eventName: "1034010", eventParam: {},
                    nextPageName: "", nextPageParam: {}
                })
            }), this.checkInput.on("keyup", function (a) {
                13 == a.keyCode && b.sendCodeBottom.click()
            }), this.codeInput.on("keyup", function (a) {
                13 == a.keyCode && b.sendCodeBottom.click()
            })
        }
    }), h = null, i = a(".vertifyImg img");
    return {
        getInstance: function (b, c) {
            return 1 === arguments.length && (c = b), h || (h = new g(c || {})), 2 === arguments.length && b && (b = a(b), b.on("click", function () {
                f(h)
            })), {
                show: function () {
                    f(h)
                }, isLogin: function (a, b) {
                    return i.attr("src", "/member/getVertifyCode.rest?v=" + (new Date).getTime()), h.isLogin(a, b)
                }, isLogout: function (a) {
                    return h.isLogout(a)
                }, isLoginBool: function () {
                    return h.__isLogin
                }, setOptions: function (a) {
                    return h.addOptions(a)
                }
            }
        }
    }
}), define("service/public/feedback", ["jQuery", "lib/ui/cookie"], function (a, b) {
    function c(a) {
        this.Callback = function () {
        }, a = a || {}, this.showCallback = a.showCallback || this.Callback, this.hideCallback = a.hideCallback || this.Callback
    }

    return c.prototype.show = function () {
        var c = this, d = b.get("cookieUsername"), e = null != d ? d.substring(0, 11) : "",
            f = '\t\t<div class="feedbackBox" id="feedbackBox">\t\t    <div class="feedback">\t\t        <a class="feedbackBox-close" id="feedbackBox-close" href="javascript:void(0);"><i class="wk_iconfont icon-duibiguanbifangyuan"></i></a>\t\t        <div class="feedback-content">\t\t            <p class="title">提交反馈</p>\t\t            <div class="formBox">\t\t                <p class="title">1. 您的建议或遇到的问题<span class="star">*</span><span class="feedbackErrarTitle"></span></p>\t\t                <textarea class="opinion" placeholder="请输入您的建议或遇到的问题"></textarea>\t\t                <p class="title">2. 您的联系方式（我们将尽快给您回复）</p>\t\t                <input type="tel" class="contact" value="' + e + '" id="feedbackPhone" placeholder="请输入您的联系方式">\t\t                <input type="button" value="提交" class="submit" id="feedbackSubmit">\t\t            </div>\t\t        </div>\t\t    </div>\t\t</div>';
        a(document.body).append(f), c.showCallback(), c.feedbackBox = a("#feedbackBox"), c.feedbackBox.on("click", "#feedbackBox-close", function () {
            c.hide()
        }), c.submit()
    }, c.prototype.hide = function () {
        var a = this;
        a.feedbackBox.detach(), a.hideCallback()
    }, c.prototype.success = function () {
        var a = this,
            b = '<div class="successStatic"></div>\t\t\t\t\t<p class="staticTitle">提交成功</p>\t\t\t\t\t<p class="staticTitle">感谢您的反馈，悟空找房会努力做得更好</p>';
        a.feedbackBox.find(".feedback-content").empty().append(b)
    }, c.prototype.fail = function (a) {
        var b = this;
        a = a || "抱歉，提交失败";
        var c = '<div class="failStatic"></div>\t\t\t\t\t<p class="staticTitle">' + a + '</p>\t\t\t\t\t<p class="staticTitle">感谢您的反馈，悟空找房会努力做得更好</p>';
        b.feedbackBox.find(".feedback-content").empty().append(c)
    }, c.prototype.submit = function () {
        var b = this;
        b.feedbackBox.find("#feedbackSubmit").on("click", function () {
            var c = b.feedbackBox.find("textarea").val(), d = b.feedbackBox.find("#feedbackPhone").val();
            if ("" == c) return void b.feedbackBox.find(".feedbackErrarTitle").html("请输入内容");
            if (c.length > 1e3) return void b.feedbackBox.find(".feedbackErrarTitle").html("请输入1000以内的字符");
            var e = /^1\d{10}$|^(0\d{2,3}-?|\(0\d{2,3}\))?[1-9]\d{4,7}(-\d{1,8})?$/;
            return "" == d || e.test(d) ? void a.ajax({
                url: "/feedback/submitFeedback.rest",
                type: "POST",
                async: !0,
                contentType: "application/json",
                data: JSON.stringify({info: c, phone: d}),
                timeout: 5e3,
                dataType: "json",
                beforeSend: function (a) {
                },
                success: function (a, c, d) {
                    "1" == a.status.toString() ? (b.success(), setTimeout(function () {
                        b.hide()
                    }, 2e3)) : b.fail(a.message)
                },
                error: function (a, c) {
                    b.fail()
                },
                complete: function () {
                }
            }) : void b.feedbackBox.find(".feedbackErrarTitle").html("请输入合法的手机或电话号码")
        })
    }, c
}), define("service/public/ie", ["jQuery", "lib/ui/dialog", "lib/ui/cookie"], function (a, b, c) {
    var d = navigator.appName, e = navigator.appVersion, f = e.split(";"), g = c.get("IETEST") || "";
    if ("Microsoft Internet Explorer" == d) {
        var h = f[1].replace(/[ ]/g, ""), i = parseInt(h.replace(/msie\s?/i, ""));
        i <= 8 && "" == g && b.alert('\t\t\t\t<div class="ieImg"></div>\t\t\t\t<p>尊敬的用户，您好</p>\t\t\t\t<p>建议您升级到 IE8 以上获得最佳网页浏览体验</p>\t\t\t', {
            isClose: !0,
            isDrag: !1,
            title: "升级浏览器",
            customClassName: "ui-UpdateIE",
            element: ".p-updateie",
            newclass: "p-updateie",
            cancel: !1,
            confirm: !1,
            closeCallback: function () {
                c.set("IETEST", 1), this.hide()
            }
        })
    }
}), define("service/public/header_footer", ["jQuery", "./feedback", "./ie"], function (a, b) {
    a(function () {
        var c = a(".cityGetName"), d = a(".cityList"), e = a("#City b");
        c.hover(function (b) {
            a(".headerSanJiao").addClass("headerSanJiao_hover"), d.stop().fadeIn(300), a(".ui-suggestion").css("display", "none")
        }, function (b) {
            a(".headerSanJiao").removeClass("headerSanJiao_hover"), d.stop().fadeOut(300)
        }), a(".areaSelect span").hover(function () {
            a(this).addClass("select"), a(this).siblings().removeClass("select");
            var b = a(this).attr("city-class");
            a(".cityDetail").each(function () {
                var c = a(this).attr("city-detail-num");
                b == c ? a(this).stop().show() : a(this).stop().hide()
            })
        }), a(".cityContent li a").on("click", function () {
            var b = a(this).text();
            e.text(b), d.fadeOut(300)
        }), a(".houseMessageModel span:nth-child(1)").addClass("houseSelect"), a(".houseMessageModel span").hover(function () {
            a(this).addClass("houseSelect"), a(this).siblings().removeClass("houseSelect");
            var b = a(this).attr("model-num");
            a(".houseMessageDetail").each(function () {
                b == a(this).attr("detail-num") ? a(this).stop().show() : a(this).stop().hide()
            })
        });
        var f = a("#right_fixed_phone");
        a(window).scrollTop() > 500 ? a(".scrollUp").fadeIn(300) : a(".scrollUp").fadeOut(300), a(window).scroll(function () {
            a(this).scrollTop() > 500 ? a(".scrollUp").fadeIn(300) : a(".scrollUp").fadeOut(300)
        }), a(".scrollUp").on("click", function (b) {
            b = b || window.event, a("html,body").animate({scrollTop: 0}, 500)
        }), a(".rightFloatPart .connectUs .phone").hover(function () {
            f.css("display", "block"), setTimeout('$("#right_fixed_phone").addClass("animate")', 10)
        }, function () {
            f.hasClass("animate") && (f.removeClass("animate"), setTimeout('$("#right_fixed_phone").css("display","none")', 300))
        }), a(".loginInput input").on("keydown", function () {
            a(this).siblings(".placeHolderText").fadeOut(0)
        }), a(".placeHolderText").click(function (b) {
            a(this).fadeOut(0), a(this).siblings("input").focus()
        }), a(".loginInput input").blur(function () {
            "" === a(this).val() && a(this).siblings(".placeHolderText").fadeIn(0)
        }), a(".rightFloatPart .connectUs .service").on("click", function () {
            ga("send", "event", "qq", "click", "onlineConsultation")
        });
        var g = a(".menu");
        a(".cooperation").hover(function () {
            g.addClass("menuShow")
        }, function () {
            g.removeClass("menuShow")
        });
        var h = new b;
        a(".feedback").on("click", function () {
            h.show()
        })
    })
}), define("service/base", ["jQuery", "lib/ui/lazyload", "util/login", "lib/ui/pc/placeholder", "lib/ui/json", "lib/ui/cookie", "service/public/header_footer"], function (a, b, c, d, e, f) {
    a(function () {
        lifang._baseService || (new b({placeholder: lifang.getResourceUrl("wkweb_fe/img/source/null.png")}), a(".headerLoginButton") && a(".headerLoginButton").on("click", function () {
            window.ga && window.ga("send", "event", "login-click", "click", "loginclick"), c.getInstance().isLogin(function () {
                window.location.reload()
            })
        }), lifang._baseService = !0, lifang.sendWKBigData = function (b, c, d) {
            b = JSON.stringify(b), a.ajax({
                url: lifang.getAjaxUrl("/buriedPoint/sendData.rest"),
                type: "POST",
                dataType: "json",
                contentType: "application/json",
                data: b,
                success: function (a) {
                    c && c(), d && (window.location.href = d)
                },
                error: function () {
                    c && c(), d && (window.location.href = d)
                }
            })
        }, a("body").on("click", ".WKBigDataBtn", function () {
            var b = e.decode(a(this).attr("data-params")), c = a(this).attr("data-href");
            lifang.sendWKBigData(b, null, c)
        }))
    })
}), define("service/map/list", ["jQuery", "lib/ui/template", "lib/ui/class", "lib/ui/json", "service/base"], function (a, b, c, d) {
    var e = c.create({
        setOptions: function (b) {
            var c = {
                orderTemplate: '                    <h3 class="Fl"><%=cityName%></h3>                    <div class="Fr">                        <b class="order act" data-value="0" data-BigDataParam="{eventName:\'<%=BigDataEventNameDefaultSort%>\'}">默认</b>                        <div class="orderSelectBox clearfix" data-default="价格">                            <span class="text">价格</span>                            <i class="iconfont icon-jiantou2"></i>                            <ul class="selectList price">                                <%if(houseType=="esf"){%>                                <li data-value="1" data-BigDataParam="{eventName:\'<%=BigDataEventNamePriceSort%>\',eventParam:{sort_type:\'3\'}}">总价从低到高</li>                                <li data-value="2" data-BigDataParam="{eventName:\'<%=BigDataEventNamePriceSort%>\',eventParam:{sort_type:\'4\'}}">总价从高到低</li>                                <%}%>                                <li data-value="7" data-BigDataParam="{eventName:\'<%=BigDataEventNamePriceSort%>\',eventParam:{sort_type:\'1\'}}">单价从低到高</li>                                <li data-value="8" data-BigDataParam="{eventName:\'<%=BigDataEventNamePriceSort%>\',eventParam:{sort_type:\'2\'}}">单价从高到低</li>                            </ul>                        </div>                        <%if(houseType=="esf"){%>                            <div class="orderSelectBox clearfix" data-default="面积">                                <span class="text">面积</span>                                <i class="iconfont icon-jiantou2"></i>                                <ul class="selectList area">                                    <li data-value="3" data-BigDataParam="{eventName:\'1037035\',eventParam:{sort_type:\'1\'}}">面积从小到大</li>                                    <li data-value="4" data-BigDataParam="{eventName:\'1037035\',eventParam:{sort_type:\'2\'}}">面积从大到小</li>                                </ul>                            </div>                        <%}%>                        <b class="order last-child" data-value="5" data-BigDataParam="{eventName:\'<%=BigDataEventNameLatestSort%>\'}">最新<i>↑</i></b>                    </div>                ',
                template: '                    <%if(status=="nodata"){%>                        <div class="w-item noFindData" id="noFind">                            很抱歉,没有找到相匹配的房源,请重新搜索~                            <span class="resetFilterBtn" id="resetFilterBtn">                                <i class="wk_iconfont icon-iconhuishouzhan"></i>清除条件                            </span>                        </div>                        <div class="list-recommend" id="list-recommend"><%=recommend%></div>                    <%}else{%>                        <%if(count<=0){%>                            <div class="w-item" id="noData" style="height:22px;padding:10px 0;text-align:center;margin-bottom:0;">已经没有更多的数据了</div>                        <%}else{%>                            <%for(var i=0,len=list.length;i<len;i++){%>                                <div class="w-item">                                    <%if(houseType=="xf"){%>                                        <a class="WKBigDataBtn" data-params="{pageName:\'<%=BigDataPageName%>\',pageParam:{},eventName:\'<%=BigDataPageEventName%>\',eventParam:{new_house_id:\'<%=list[i].subEstateId%>\'},nextPageName:\'1045\',nextPageParam:{new_house_id:\'<%=list[i].subEstateId%>\'},city:\'<%=cityId%>\'}" href="<%=list[i].newHouseUrl%>" target="_blank">                                            <div class="houselist-img">                                                <img src="<%=list[i].imageUrl%>">                                                <%if(list[i].estateVideoResponse){%>                                                    <i class="video"></i>                                                <%}%>                                            </div>                                            <div class="houselist-con">                                                <h2 class="clearfix">                                                    <p class="totalPrice">                                                    <%if(list[i].avgPrice){%>                                                        <b><%=list[i].avgPrice%></b> 元/㎡</p>                                                    <%}else{%>                                                        <b>价格待定</b></p>                                                    <%}%>                                                    <p class="title"><%=list[i].estateName%></p>                                                </h2>                                                <div class="houselist-data clearfix">                                                    <%if(!isShowPosition){%>                                                        <p class="position"                                                            data-positionParam="{subEstateId:\'<%=list[i].subEstateId%>\',type:\'<%=houseMapType%>\'}"                                                            data-mapParam="{lat:\'<%=list[i].latitude%>\',lon:\'<%=list[i].longitude%>\',level:\'<%=houseMapLeavel%>\'}"><i class="wk_iconfont icon-dibudizhi"></i>定位</p>                                                    <%}%>                                                    <p class="houseArea clearfix">                                                        <%if(list[i].startSpace){%>                                                            <span><%=list[i].startSpace%>m²-<%=list[i].endSpace%>m²</span>                                                        <%}%>                                                    </p>                                                </div>                                                <p class="houseTag clearfix">                                                    <%if(list[i].activitys.length>0){%>                                                        <span class="tags"><%=list[i].activitys[0].title%></span>                                                    <%}%>                                                    <%if(list[i].openTime && !list[i].open){%>                                                        <span >在售楼盘</span>                                                    <%}else{%>                                                        <span >即将开盘</span>                                                    <%}%>                                                    <%if(list[i].subwayList){%>                                                        <span >地铁房</span>                                                    <%}%>                                                    <%if(list[i].estateVideoResponse){%>                                                        <span >有视频</span>                                                    <%}%>                                                </p>                                            </div>                                        </a>                                    <%}else if(houseType=="esf"){%>                                        <%var HouseBelong,Boutique;%>                                        <%list[i].selfSupport?HouseBelong=1:HouseBelong=0;%>                                        <%list[i].isTopHouse>1?Boutique=1:Boutique=0;%>                                        <a class="WKBigDataBtn" data-params="{pageName:\'<%=BigDataPageName%>\',pageParam:{},eventName:\'<%=BigDataPageEventName%>\',eventParam:{house_id:\'<%=list[i].houseId%>\'},nextPageName:\'1067\',nextPageParam:{house_id:\'<%=list[i].houseId%>\'},city:\'<%=cityId%>\'}" href="<%=list[i].houseIdUrl%>" target="_blank">                                            <div class="houselist-img">                                                <img src="<%=list[i].mimageUrl%>">                                                <%if(list[i].houseVideoResponse){%>                                                    <i class="video"></i>                                                <%}%>                                            </div>                                            <div class="houselist-con">                                                <h2 class="clearfix">                                                    <p class="totalPrice"><b><%=list[i].totalPrice%></b>万</p>                                                    <p class="title"><%=list[i].houseChild%></p>                                                </h2>                                                <div class="houselist-data clearfix">                                                    <%if(!isShowPosition){%>                                                        <p class="position"                                                            data-positionParam="{subEstateId:\'<%=list[i].subEstateId%>\',type:\'<%=houseMapType%>\'}"                                                            data-mapParam="{lat:\'<%=list[i].latitude%>\',lon:\'<%=list[i].longitude%>\',level:\'<%=houseMapLeavel%>\'}"><i class="wk_iconfont icon-dibudizhi"></i>定位</p>                                                    <%}%>                                                    <p class="houseArea clearfix">                                                        <%if(list[i].area){%>                                                            <span><%=list[i].area%>m²</span>                                                        <%}%>                                                        <%if(list[i].floorDesc){%>                                                            <span><%=list[i].floorDesc %></span>                                                        <%}%>                                                        <%if(list[i].subwayDesc){%>                                                            <span><%=list[i].subwayDesc %></span>                                                        <%}%>                                                    </p>                                                </div>                                                <p class="houseTag clearfix">                                                    <% if(list[i].isStorePush==1){%>                                                        <span class="tag">店长推荐</span>                                                    <%}else if(list[i].commAgent>0){%>                                                        <span class="tag">急售</span>                                                    <%}%>                                                    <%if(list[i].fullYears>=1&&list[i].onlyOne==1){%>                                                        <span >满五唯一</span>                                                    <%}else if(list[i].fullYears>=1){%>                                                        <span >满二</span>                                                    <%}%>                                                    <%if(list[i].industrySole){%>                                                        <span >独家</span>                                                    <%}%>                                                    <%if(list[i].subwayList){%>                                                        <span >地铁房</span>                                                    <%}%>                                                    <%if(list[i].schoolList){%>                                                        <span >近学校</span>                                                    <%}%>                                                    <%if(list[i].isNewOnStore == 1){%>                                                        <span >新上</span>                                                    <%}%>                                                    <%if(list[i].orientation == 9){%>                                                        <span >南北通透</span>                                                    <%}%>                                                </p>                                            </div>                                        </a>                                    <%}%>                                </div>                                <%if(i==len-1 && count<20){%>                                    <div class="w-item" id="noData" style="height:22px;padding:10px 0;text-align:center; margin-bottom:0;">已经没有更多的数据了</div>                                <%}%>                            <%}%>                        <%}%>                    <%}%>                ',
                container: window,
                loadMoreUrl: "",
                houlistUrl: "",
                houseType: "",
                resetCallback: function () {
                },
                filterCallback: function () {
                }
            };
            a.extend(!0, this.options = {}, c, b)
        }
    }, {
        init: function (b) {
            this.setOptions(b), this.container = a(this.options.container) || a(window), this.getListUrl = this.options.getListUrl || "", this.recommend = this.options.recommend || "", this.recommendType = this.options.recommendType || "", this.listTemplate = null, this.houseList = null, this.houseOrder = a(this.options.houseOrder) || null, this.houseMapType = this.options.houseMapType || 5, this.houseMapLeavel = this.options.houseMapLeavel || 17, this.initBigData(), this.initOrderRender(), this.initRenderList(), this.bindEvent()
        }, initBigData: function () {
            this.WKBigData = this.options.status.WKBigData, "esf" == this.options.houseType ? (this.BigDataPageName = "1037", this.BigDataPageEventName = "1037034", this.BigDataEventNamePosition = "1037032", this.BigDataEventNameDefaultSort = "1037048", this.BigDataEventNamePriceSort = "1037033", this.BigDataEventNameLatestSort = "1037055") : (this.BigDataPageName = "1036", this.BigDataPageEventName = "1036023", this.BigDataEventNamePosition = "1036022", this.BigDataEventNameDefaultSort = "1036036", this.BigDataEventNamePriceSort = "1036034", this.BigDataEventNameLatestSort = "1036043")
        }, initOrderRender: function () {
            var a = this, c = b(this.options.orderTemplate, {
                houseType: a.options.houseType,
                cityName: a.options.status.CityData.cityName,
                BigDataPageName: a.BigDataPageName,
                BigDataPageEventName: a.BigDataPageEventName,
                BigDataEventNameDefaultSort: a.BigDataEventNameDefaultSort,
                BigDataEventNamePriceSort: a.BigDataEventNamePriceSort,
                BigDataEventNameLatestSort: a.BigDataEventNameLatestSort
            });
            this.houseOrder.html(c)
        }, initRenderList: function () {
            this.render(function () {
            })
        }, setSubEstateName: function (b) {
            this.houseOrder.find(".Fl").text(a.trim(b))
        }, render: function (c, d) {
            var e = this, f = this.options.status.getValue("mapSearch");
            1 == arguments.length && "function" != typeof c && (d = c), d && a.extend(!0, f, {offset: e.houseList.children(".w-item").length}), f.name && this.setSubEstateName(f.name), clearTimeout(this.timeout), this.timeout = setTimeout(function () {
                a.ajax({
                    url: lifang.getAjaxUrl(e.getListUrl),
                    type: "GET",
                    data: f,
                    dataType: "json",
                    success: function (g) {
                        if ("1" == g.status) {
                            if (g.data) {
                                var h = b(e.options.template, {
                                    list: g.data,
                                    count: g.data.length,
                                    houseType: e.options.houseType,
                                    BigDataPageName: e.BigDataPageName,
                                    BigDataPageEventName: e.BigDataPageEventName,
                                    isShowPosition: f.type == e.houseMapType,
                                    houseMapType: e.houseMapType,
                                    houseMapLeavel: e.houseMapLeavel,
                                    cityId: f.cityId || ""
                                });
                                e.options.status.PositionData.type == e.options.status.POSITION_TYPES.ESTATE && e.options.status.setValue(a.extend({}, e.options.status.PositionData, {
                                    townId: g.data[0].townId,
                                    districtId: g.data[0].districtId
                                }), "PositionData"), e.houseOrder.show()
                            } else {
                                var h = b(e.options.template, {
                                    status: "nodata",
                                    recommend: e.recommend || "",
                                    houseType: e.options.houseType,
                                    BigDataPageName: e.BigDataPageName,
                                    BigDataPageEventName: e.BigDataPageEventName,
                                    cityId: f.cityId || ""
                                });
                                e.houseOrder.hide()
                            }
                            d || (listTemplate = a(null == g.data ? '<div class="w-nodata-group" id="houseList"></div>' : 20 == g.data.length ? '<div class="w-houselist-group" id="houseList"></div><div class="w-houselist-btn" id="loadBtn">查看更多</div>' : '<div class="w-houselist-group" id="houseList"></div>'), e.container.html(listTemplate), e.houseList = a("#houseList")), e.houseList && e.houseList[d ? "append" : "html"](h), d && g.data.length < 20 && a("#loadBtn").hide(), !d && e.setListHeight(), c && c(!0)
                        } else d ? c && c(!1) : e.errorList()
                    },
                    error: function (a, b) {
                        d ? c && c(!1) : e.errorList()
                    }
                })
            }.bind(this), 200)
        }, errorList: function () {
            console.log("失败了")
        }, setListHeight: function (b) {
            var c,
                d = this.container.children(".w-houselist-group").height() + this.container.children(".w-houselist-btn").height() + this.container.children(".w-nodata-group").height(),
                e = parseInt(a(window).height() - this.container.offset().top - 10);
            c = d > e ? e : d, this.container.height(c), this.container.scrollTop(0)
        }, setOrder: function (b, c) {
            if (0 === b) c.siblings(".orderSelectBox").each(function () {
                var b = a(this);
                b.children(".text").text(b.attr("data-default")), b.removeClass("active").find("li").removeClass("active")
            }); else {
                var d = c.parents(".orderSelectBox").siblings(".orderSelectBox"), e = d.attr("data-default");
                c.parents(".orderSelectBox").addClass("active"), d.removeClass("active").children("span").text(e), d.find("li").removeClass("active"), c.parents(".orderSelectBox").siblings("b").removeClass("act")
            }
        }, bindEvent: function () {
            var b = this;
            a(window).resize(function (a) {
                b.setListHeight()
            }), a("body").on("click", "#loadBtn", function () {
                a(this).text("正在加载中……"), b.render(function (b) {
                    b ? a(this).text("查看更多") : a(this).text("网络异常，点击重试")
                }.bind(this), !0)
            }), a("body").on("click", ".position", function (c) {
                c.stopPropagation(), c.preventDefault(), a(".position").removeClass("active");
                var e = d.decode(a(this).attr("data-positionParam")), f = d.decode(a(this).attr("data-mapParam")),
                    g = {eventName: b.BigDataEventNamePosition};
                a(this).addClass("active"), b.options.status.setValue(e, "PositionData"), b.options.status.setValue(f, "MapData"), b.options.positionCallback.call(b), g = a.extend(!0, {}, b.WKBigData, g), lifang.sendWKBigData(g)
            }), a("body").on("click", "#resetFilterBtn", function () {
                window.location.reload()
            }), this.houseOrder.find(".orderSelectBox").hover(function () {
                var b = a(this);
                b.children(".selectList").show()
            }, function () {
                a(this).children(".selectList").hide()
            }), this.houseOrder.find(".orderSelectBox>.selectList>li").click(function (c) {
                var e = a(this), f = e.attr("data-value"), g = d.decode(a(this).attr("data-BigDataParam"));
                if (g = a.extend(!0, {}, b.WKBigData, g), !e.hasClass("active")) return e.addClass("active").siblings("li").removeClass("active"), e.parents(".orderSelectBox").children(".text").text(e.text()), e.parents(".selectList").hide(), b.options.status.setValue({orderType: f}, "FilterData"), b.setOrder(1, e), b.render(), lifang.sendWKBigData(g), !1
            }), this.houseOrder.find(">.Fr>b").click(function () {
                var c = a(this), e = c.contents("i"), f = c.attr("data-value"),
                    g = d.decode(a(this).attr("data-BigDataParam"));
                return g = a.extend(!0, {}, b.WKBigData, g), c.siblings(".order.act").removeClass("act").contents("i").html("&uarr;"), 0 != e.length && ("&uarr;" == e.html() || "↑" == e.html() ? (e.html("&darr;"), f = parseInt(f) + 1) : e.html("&darr;")), c.addClass("act"), b.options.status.setValue({orderType: f}, "FilterData"), b.setOrder(0, c), b.render(), lifang.sendWKBigData(g), !1
            })
        }
    });
    return e
}), define("service/map/agent", ["jQuery", "lib/ui/template", "lib/ui/class", "lib/ui/json", "service/base"], function (a, b, c, d) {
    var e = c.create({
        setOptions: function (b) {
            var c = {
                template: '\t\t\t\t<div class="agentTitle">找对人 买好房<i class="wk_iconfont icon-xiangyou"></i></div>\t\t\t\t<div class="agentInfo clear">\t\t\t\t\t<div class="pic">\t\t\t\t\t\t<div class="img">                            <%if(data.headImg){%>                                <img src="<%=data.headImg%>">                            <%}else{%>                                <img src="<%=data.initImg%>"/>                            <%}%>                        </div>\t\t\t\t\t\t<%if(data.goodStatus == "1"){%>                            <div class="tag"></div>                        <%}%>\t\t\t\t\t</div>\t\t\t\t\t<div class="con">\t\t\t\t\t\t<p class="name"><span class="label"><%=data.name%></span>                            <%if(data.companyName){%>                                <span><%=data.companyName%></span>                            <%}%>                        </p>\t\t\t\t\t\t<div class="agentEva">                        <%var star="",voteScore = parseInt(data.voteScore);%>                        <%if(voteScore == 0){%>                            <%star = "star-0";%>                        <%}else if(voteScore >0 && voteScore <1){%>                            <%star = "star-0-5";%>                        <%}else if(voteScore ==1){%>                            <%star = "star-1";%>                        <%}else if(voteScore >1 && voteScore <2){%>                            <%star = "star-1-5";%>                        <%}else if(voteScore ==2){%>                            <%star = "star-2";%>                        <%}else if(voteScore >2 && voteScore <3){%>                            <%star = "star-2-5";%>                        <%}else if(voteScore ==3){%>                            <%star = "star-3";%>                        <%}else if(voteScore >3 && voteScore <4){%>                            <%star = "star-3-5";%>                        <%}else if(voteScore ==4){%>                            <%star = "star-4";%>                        <%}else if(voteScore >4 && voteScore <5){%>                            <%star = "star-4-5";%>                        <%}else if(voteScore ==5){%>                            <%star = "star-5";%>                        <%}%>\t\t\t\t\t\t\t<div class="agentStartBg list-star <%=star%>"></div><span><%=data.voteScore%>分</span><span><%=data.voteNo%>条评论</span>\t\t\t\t\t\t</div>\t\t\t\t\t</div>\t\t\t\t</div>                <a data-href="<%=data.url%>" class=" WKBigDataBtn" data-params="{pageName:\'<%=bigData.pageName%>\',pageParam:{},eventName:\'<%=bigData.eventName%>\',eventParam:{},nextPageName:\'1004\',nextPageParam:{},city:\'<%=bigData.cityId%>\'}"></a>                ',
                getAgentUrl: "/agent/map/getMapGoodAgent.rest"
            };
            a.extend(!0, this.options = {}, c, b)
        }
    }, {
        init: function (a) {
            this.setOptions(a), this.getAgentUrl = this.options.getAgentUrl, this.initRenderAgent(), this.bindEvent()
        }, initRenderAgent: function () {
            this.render()
        }, render: function (c) {
            var e = this, f = this.options.status.getValue("getMapGoodAgent");
            return (e.districtId != f.districtId || e.townId != f.townId) && (clearTimeout(this.timeout), void(this.timeout = setTimeout(function () {
                a.ajax({
                    url: lifang.getAjaxUrl(e.getAgentUrl),
                    type: "POST",
                    data: d.encode(f),
                    dataType: "json",
                    contentType: "application/json",
                    success: function (d) {
                        if ("1" == d.status) {
                            if (d.data) {
                                var g = b(e.options.template, {
                                    data: d.data || {},
                                    initImg: lifang.getResourceUrl("wkweb_fe/img/source/agent/agent_man.png"),
                                    bigData: {
                                        cityId: f.cityId || "",
                                        pageName: e.options.status.options.BigDataPageName || "",
                                        eventName: 1 == e.options.status.options.houseType ? "1037058" : "1036046"
                                    }
                                });
                                e.districtId = f.districtId, e.townId = f.townId, e.agentTemp || (e.agentTemp = a('<div class="agentFixed animate-show" id="agentFixed"></div>'), a("body").append(e.agentTemp)), e.agentTemp.html(g), e.timeHide = setTimeout(function () {
                                    e.agentTemp.removeClass("animate-show").addClass("animate-hide")
                                }, 5e3)
                            }
                            c && c(!0)
                        }
                    },
                    error: function (a, b) {
                        return !!e.agentTemp && (e.agentTemp.remove(), void(e.agentTemp = null))
                    }
                })
            }.bind(this), 200)))
        }, bindEvent: function () {
            var b = this;
            a("body").on("mouseenter", ".agentFixed", function () {
                clearTimeout(b.timeHide), a(this).addClass("animate-show").removeClass("animate-hide"), lifang.sendWKBigData(a.extend(!0, {}, b.options.status.WKBigData, {eventName: 1 == b.options.status.options.houseType ? "1037057" : "1036045"}))
            }), a("body").on("mouseleave", ".agentFixed", function () {
                a(this).addClass("animate-hide").removeClass("animate-show"), lifang.sendWKBigData(a.extend(!0, {}, b.options.status.WKBigData, {eventName: 1 == b.options.status.options.houseType ? "1037056" : "1036044"}))
            })
        }
    });
    return e
}), define("service/public/geolocation", ["jQuery", "lib/ui/cookie"], function (a, b) {
    function c() {
        var a = b.get("allowGetPosition"), c = b.get("location_latitude");
        b.get("location_longitude");
        if (navigator.geolocation && "0" != a && null == c) navigator.geolocation.getCurrentPosition(d, e, {
            timeout: 5e3,
            enableHighAccuracy: !0
        }); else try {
            console.log("浏览器不支持定位")
        } catch (a) {
        }
    }

    function d(a) {
        b.set("location_longitude", a.coords.longitude, {expires: 7}), b.set("location_latitude", a.coords.latitude, {expires: 7})
    }

    function e(a) {
        switch (a.code) {
            case 1:
                b.set("allowGetPosition", "0", {expires: 1})
        }
    }

    c()
}), require(["jQuery", "lib/ui/cookie", "service/map/map", "service/map/search", "service/map/area", "service/map/line", "service/map/select", "service/map/list", "service/map/status", "service/map/agent", "service/public/geolocation", "service/base"], function (a, b, c, d, e, f, g, h, i, j) {
    var k = new i({houseType: 2, BigDataPageName: "1036"}), l = new j({status: k}), m = new c({
        status: k, ele: "Map", onMapRendered: function (c) {
            "1" == c.type ? (b.set("cityId", k.CityData.cityId), a("#City").find("b").html(k.CityData.cityName), n.render(), o.render(), q.initRenderList(), l.initRenderAgent()) : "0" == c.type && q.render(function () {
                n.setActive(), l.render()
            })
        }
    }), n = new e({
        status: k, eventNameZoneBlock: "1036038", eventNameZoneRange: "1036037", callback: function () {
            o.reset(), p.reset(), m.render(), q.render(function () {
                l.render()
            })
        }
    }), o = new f({
        status: k, eventNameSubway: "1036031", eventNameStation: "1036032", callback: function () {
            n.reset(), p.reset(), m.render(), q.render()
        }
    }), p = (new g({
        status: k, callback: function () {
            q.render(), m.render()
        }
    }), new d({
        status: k, searchEventName: "1036009", listEventName: "1036028", endCallback: function (a) {
            n.reset(), o.reset(), m.search(a), q.render(function () {
                l.render()
            })
        }, renderCallback: function (a) {
            n.reset(), o.reset(), m.render(), q.render(function () {
                l.render()
            })
        }
    })), q = new h({
        status: k,
        getListUrl: k.RequestUrl.mapSearch,
        container: "#List",
        houseOrder: "#Order",
        houseType: "xf",
        houseMapType: k.POSITION_TYPES.ESTATE,
        houseMapLeavel: k.MAP_LEVELS.ESTATE,
        loadingCallback: function (a, b) {
            k.setValue(a, "ListData"), this.render()
        },
        positionCallback: function (a) {
            m.render(!0)
        }
    });
    m.run(), n.render(), o.render(), a(".switch").on({
        click: function () {
            var b = a(this);
            if (b.hasClass("switch-on")) {
                a(".main").hide(), b.removeClass("switch-on").addClass("switch-off"), b.find(".tips").text("展开侧边面板");
                var c = {
                    pageName: k.WKBigData.pageName,
                    pageParam: {},
                    eventName: "1036029",
                    eventParam: {},
                    nextPageName: "",
                    nextPageParam: {},
                    city: k.WKBigData.city
                };
                lifang.sendWKBigData(c)
            } else if (b.hasClass("switch-off")) {
                a(".main").show(), b.removeClass("switch-off").addClass("switch-on"), b.find(".tips").text("收起侧边面板");
                var c = {
                    pageName: k.WKBigData.pageName,
                    pageParam: {},
                    eventName: "1036030",
                    eventParam: {},
                    nextPageName: "",
                    nextPageParam: {},
                    city: k.WKBigData.city
                };
                lifang.sendWKBigData(c)
            }
        }, mouseover: function () {
            var b = a(this);
            b.find(".tips").show()
        }, mouseout: function () {
            var b = a(this);
            b.find(".tips").hide()
        }
    }), a(".cityModel a").click(function () {
        var c = a(this).attr("data-cityid");
        b.set("cityId", c), window.location.reload()
    }), a(".agentFixed").hover(function () {
        a(this).addClass("animate-show").removeClass("animate-hide")
    }, function () {
        a(this).addClass("animate-hide").removeClass("animate-show")
    })
}), define("action/map_new", function () {
}), function () {
    function a(a) {
        return d + a
    }

    function b() {
        var a = arguments, b = 1 == a.length ? lifang : a[0], c = a.length > 1 ? a[1] : a[0];
        if (null == c) return b;
        try {
            for (var d in c) !b.hasOwnProperty(c[d]) && (b[d] = c[d]);
            return b
        } catch (a) {
        }
    }

    var c = document.getElementById("requirejs"),
        d = c && c.getAttribute("data-url") ? c.getAttribute("data-url") : "/", e = d.match(/[a-zA-Z]\d/), f = 0;
    if (e && e.length > 0 && (e = e[0], d = d.match(/https?:\/\/[\w\.]*\//)[0]), "object" != typeof window.lifang && (window.lifang = {}), b({
        getResourceUrl: function (a) {
            var b = d;
            return b + a
        }, cacheJs: {}, isDebug: function () {
            return location.search.match(/debug=true/)
        }, config: {ajaxBaseUrl: ""}, uid: function () {
            return (new Date).getTime() + (1e10 * Math.random()).toFixed(0)
        }, loadCss: function (a, b) {
            b = $.extend({type: "text/css", rel: "stylesheet"}, b || {});
            var c = document.createElement("link");
            $.extend(c, b), c.href = a;
            var d = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
            return d.firstChild ? d.insertBefore(c, d.lastChild) : d.appendChild(c), c
        }, loadJs: function (a, b) {
            var c = lifang.cacheJs;
            if (b = $.extend({
                type: "text/javascript", charset: "utf-8", async: !1, group: "", onload: function () {
                }, onerror: function () {
                }
            }, b || {}), c[a]) return void b.onload();
            var d = document.createElement("script"), e = b.onload;
            b.onload = function () {
                e.apply(d, arguments), d.onload = d.onreadystatechange = function () {
                }
            }, $.extend(d, b), d.onreadystatechange = function () {
                switch (d.readyState) {
                    case"loaded":
                    case"complete":
                        b.onload.apply(d, arguments)
                }
            }, d.src = a, c[a] = !0;
            var f = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
            return f.firstChild ? f.insertBefore(d, f.lastChild) : f.appendChild(d), d
        }
    }), lifang.config.tplBaseUrl = lifang.isDebug() ? "wap/lifang/view/" : "/wap/lifang/app/view/", "object" == typeof defaultConfig) for (var g in defaultConfig) lifang.config[g] = defaultConfig[g];
    lifang.getAjaxUrl = function (a) {
        return lifang.config.ajaxBaseUrl + a
    }, lifang.getTplUrl = function (a) {
        return lifang.config.tplBaseUrl + a
    }, Function.prototype.bind = function (a) {
        var b = this, c = Array.prototype.slice.call(arguments, 1);
        return function () {
            return b.apply(a, c.concat(Array.prototype.slice.call(arguments, 0)))
        }
    }, Array.prototype.indexOf = function (a) {
        for (var b = 0; b < this.length; b++) if (this[b] == a) return b;
        return -1
    }, Array.prototype.remove = function (a) {
        var b = this.indexOf(a);
        b > -1 && this.splice(b, 1)
    };
    var h = {
        paths: {
            jQuery: [a("fe_public_library/lib/jquery-1.11.2.min")],
            highcharts: [a("fe_public_library/lib/highcharts")],
            Easemob: [a("fe_public_library/lib/easemob.im-1.0.7")],
            swiper3: [a("fe_public_library/lib/ui/swiper3")]
        },
        shim: {
            jQuery: {deps: [], exports: "$"},
            highcharts: {deps: ["jQuery"], exports: "highcharts"},
            Easemob: {deps: ["jQuery"], exports: "Easemob"},
            swiper3: {deps: ["jQuery"], exports: "swiper3"}
        }
    };
    if (require.config(h), c) {
        f = parseInt(c.getAttribute("debug"), 10) || 0;
        var i = c.getAttribute("data-page");
        f && "string" == typeof i && "" != i && require([i.indexOf("/") < 0 ? "action/" + i : i])
    }
}();