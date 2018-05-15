
/**
 * 信息发布实现
 */
(function ($) {
    $.fn.extend({
        /**
         * {
         * speed: 滚动速度,
         * stay: 停留时间,
         * url:数据来源url,
         * refresh:刷新间隔,
         * qryParam:查询参数{@link qryParam}
         * }
         * @param options
         */
        vscroller: function (options) {
            /**
             * 排序类型
             */
            var DES = 1;
            var ASC = 0;
            //字典列 分隔符重新定义
            var splitChar = "__:__";
            var settings = { speed: 1000, stay: 2000, url:WebVar.VarPath + "/locbase/table/"};
            settings.qryParam ={
                tblName		: "LTL_HITLOG_VIEW",
                cols: "*",
                curPage		: 1,
                initWhere	: null,
                where		: null,
                advWhere	: null,
                pageSize	: 4,
                order		: DES,
                orderCol	: "ID",
                qryCnt		: false
            };
            settings = $.extend(true,settings, options);
            return this.each(function () {
                var interval = null;
                var mouseIn = false;
                var totalElements;
                var isScrolling = false;
                var h;
                var t;
                var wrapper = $(this).addClass('news-wrapper');
                $.ajax({
                    url: settings.url,
                    type: 'POST',
                    dataType: 'json',
                    contentType : 'application/json',
                    data:$.toJSON(settings.qryParam),
                    success: function (jsonData) {
                        createDom(jsonData);
                    }
                });
                function createDom(jsonData) {
                    var contentWrapper = $('<div/>').addClass('news-contents-wrapper');
                    var newsHeader = $('<div/>').addClass('news-header');
                    var newsContents = $('<div/>').addClass('news-contents');
                    wrapper.append(contentWrapper);
                    contentWrapper.append(newsHeader);
                    contentWrapper.append(newsContents);
                    //数据解析与填充
                    var data =covertInfo(jsonData);
                    newsHeader.html(data.title);
                    totalElements = data.infos.length;
                    for(var i =0;i<totalElements;i++){
                        var info = data.infos[i];
                        var news = $('<div/>').addClass('news');
                        newsContents.append(news);
                        var history = $('<div/>').addClass('history');
                        var description = $('<div/>').addClass('description');
                        news.append(history);
                        news.append(description);
                        history.append(getCircle(info.category,info.date));
                        description.append($('<h1/>').html("<a href='" + info.url + "'target=\"_blank\">" + info.headline + "</a>"));
                        var newsText = info.detail;
                        description.append($('<div/>').addClass('detail').html(newsText));
                    }
                    i=0;
                    h = parseFloat($('.news:eq(0)').outerHeight());
                    $('.news', wrapper).each(function () {
                        $(this).css({ top: i++ * h });
                    });
                    t = (totalElements - 1) * h;
                    newsContents.mouseenter(function () {
                        mouseIn = true;
                        if (!isScrolling) {
                            $('.news').stop(true, false);
                            clearTimeout(interval);
                        }
                    });
                    newsContents.mouseleave(function () {
                        mouseIn = false;
                        interval = setTimeout(scroll, settings.stay);
                    });
                    interval = setTimeout(scroll, 1);
                }

                /**
                 * 业务相关数据转换
                 * 将通用表格查询数据  转换为  比中发布数据
                 */
                function covertInfo(jsonData){
                    var data = {};
                    data.title = "最新正查/倒查比中";
                    var infos = [];
                    var dataLength = jsonData.tblData.result.length;
                    var headerText = jsonData.tblData.headerText;
                    var cols = settings.qryParam.cols;
                    for(var i=0;i<dataLength;i++){
                        var rowData = jsonData.tblData.result[i].data;
                        var info = {};
                        var qryTypeCode = parseInt(rowData["QRY_TYPE"].split(splitChar)[0]) ;
                        var qryType = rowData["QRY_TYPE"].split(splitChar)[1];
                        switch (qryTypeCode){
                            case ABISCode.QryType.TL:
                                info.category = "red";
                                info.url = WebVar.VarPath +"/hitlog/detail/"+rowData["ID"];
                                break;
                            case ABISCode.QryType.LT:
                                info.category = "yellow";
                                info.url = WebVar.VarPath +"/hitlog/detail/"+rowData["ID"];
                                break;
                            default:
                                info.category = "green";
                        }
                        info.date = rowData["CHECK_TIME"];
                        info.headline = rowData["HITLOG_NUM"];
                        info.detail = "";
                        info.detail += headerText["CHECKER"]+"："+rowData["CHECKER"];
                        info.detail += "&nbsp;"+headerText["CHECK_TIME"]+"："+rowData["CHECK_TIME"];
                        info.detail += "&nbsp;"+headerText["CHECKER_UNIT_CODE"]+"："+rowData["CHECKER_UNIT_CODE"];
                        info.detail += "&nbsp;"+headerText["QRY_TYPE"]+"："+qryType;
                        info.detail += "&nbsp;"+headerText["TP_CARD_NUM"]+"："+rowData["TP_CARD_NUM"];
                        info.detail += "&nbsp;"+headerText["LP_CARD_NUM"]+"："+rowData["LP_CARD_NUM"];
                        info.detail += "&nbsp;"+headerText["LP_CASE_NUM"]+"："+rowData["LP_CASE_NUM"];
                        infos.push(info);
                    }
                    data.infos = infos;
                    return data;
                }
                //滚动
                function scroll() {
                    if (!mouseIn && !isScrolling) {
                        isScrolling = true;
                        $('.news:eq(0)').stop(true, false).animate({ top: -h }, settings.speed, function () {

                            clearTimeout(interval);
                            var current = $('.news:eq(0)').clone(true);
                            current.css({ top: t });
                            $('.news-contents').append(current);
                            $('.news:eq(0)').remove();
                            isScrolling = false;
                            interval = setTimeout(scroll, settings.stay);

                        });
                        $('.news:gt(0)').stop(true, false).animate({ top: '-=' + h }, settings.speed);
                    }
                }
                function getCircle(category, date) {
                    date = date.replace(/-/g, '/');
                    var d = new Date(date);
                    var day = '';
                    var month = '';
                    if(WebVar.Local==="en"){
                        switch (d.getDate()) {
                            case 1:
                            case 21:
                                day = d.getDate() + ' st';
                                break;
                            case 2:
                            case 22:
                                day = d.getDate() + 'nd';
                                break;
                            case 3:
                            case 23:
                                day = d.getDate() + 'rd';
                                break;
                            default:
                                day = d.getDate() + 'th';
                                break;
                        }
                        switch (d.getMonth()) {
                            case 0:
                                month = 'JAN';
                                break;
                            case 1:
                                month = 'FEB';
                                break;
                            case 2:
                                month = 'MAR';
                                break;
                            case 3:
                                month = 'APR';
                                break;
                            case 4:
                                month = 'MAY';
                                break;
                            case 5:
                                month = 'JUN';
                                break;
                            case 6:
                                month = 'JUL';
                                break;
                            case 7:
                                month = 'AUG';
                                break;
                            case 8:
                                month = 'SEP';
                                break;
                            case 9:
                                month = 'OCT';
                                break;
                            case 10:
                                month = 'NOV';
                                break;
                            case 11:
                                month = 'DEC';
                                break;

                        }
                    }else{
                        day = d.getDate()+"号";
                        switch (d.getMonth()) {
                            case 0:
                                month = '一月';
                                break;
                            case 1:
                                month = '二月';
                                break;
                            case 2:
                                month = '三月';
                                break;
                            case 3:
                                month = '四月';
                                break;
                            case 4:
                                month = '五月';
                                break;
                            case 5:
                                month = '六月';
                                break;
                            case 6:
                                month = '七月';
                                break;
                            case 7:
                                month = '八月';
                                break;
                            case 8:
                                month = '九月';
                                break;
                            case 9:
                                month = '十月';
                                break;
                            case 10:
                                month = '十一月';
                                break;
                            case 11:
                                month = '十二月';
                                break;

                        }
                    }

                    return $('<div/>').addClass('circle-outer').append($('<div/>').addClass('circle').addClass(category)
                        .append($('<span/>').addClass('day').html(day))
                        .append($('<span/>').html('').addClass('elipses'))
                        .append($('<span/>').addClass('month').html(month)));
                }

            });
        }
    });
})(jQuery);
