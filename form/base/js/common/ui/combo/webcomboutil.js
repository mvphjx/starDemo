var WebComboUtil =
    {
        getCodeTable: function (colNameList, invoke, colFilterRgxs) {
            if (colNameList != null && colNameList != "") {
                $.post(WebVar.VarPath + "/util/combo/data/" + colNameList, {colFilterRgxs: colFilterRgxs},
                    function (data) {
                        invoke(data || "[]");
                    }
                );
            }
            WebComboUtil.addClickListener();
            WebComboUtil.addScrollListener();
            WebComboUtil.addTextInputFocusListener();
        },
        /**
         * 翻译字典
         * @param columnName
         * @param code
         * @returns  promise(异步任务)
         */
        getCodeText: function (columnName, code) {
            var def = $.Deferred();
            var url = WebVar.VarPath + "/util/combo/find/" + columnName+"?searchContition="+code;
            var result = code;
            jQuery.ajax({
            	async: false,
            	type: 'POST',
            	contentType: 'application/json',
            	url: url,
            	data: null,
            	dataType: 'json',
            	success: function(data) {
            		if(data != null) {
            			if(typeof data =='string'){
            				data = eval('(' + data + ')');
            			}
            			if(data.length > 0) {
            				var entity = data[0];
            				result = entity.text
            			}
            		}
                    def.resolve(result);
            	}
            });
            return def.promise();
        },
        /**
         * 翻译数据库代码
         * @param dbType
         * @param code
         * @returns promise(异步任务)
         */
        getDBCodeText: function (dbType, code) {
            var def = $.Deferred();
            var url = WebVar.VarPath + "/db/mgr/dbinfo/" + dbType;
            var result = code;
            var ready ;
            jQuery.ajax({
                async: false,
                type: 'POST',
                contentType: 'application/json',
                url: url,
                data: {
                    filterRgx: ""
                },
                dataType: 'json',
                complete : function(){
                    ready = true;
                },
                success: function (resultMsg) {
                    if (resultMsg.status === WebCode.WebResultStatus.ok) {
                        var data = resultMsg.data;
                        if (data != null) {
                            if (typeof data == 'string') {
                                data = eval('(' + data + ')');
                            }
                            $.each(data, function (index, entity) {
                                if (entity.code == code) {
                                    result = entity.text
                                }
                            });
                        }
                    } else {
                        DialogUtil.openSimpleDialogForOcx(resultMsg.msg);
                    }
                    def.resolve(result);
                }
            });
            return def.promise();
        },
        addClickListener: function () {
            $(document).click(
                function (e) {
                    docClick(e);
                }
            );

        },
        addScrollListener: function () {
            $('#scroll').scroll(function () {

            })
        },
        addTextInputFocusListener: function () {
            $("input").filter(".FieldInput").focus(function () {
                $(".newMenu").css('display', 'none');
            });
        }
    }

function docClick(event) {
    var e = event || window.event;
    var t = e.srcElement || e.target;
    var id = t.id;
    var type = t.type;
    var ss = id.split("_");
    var list = "";
    if (ss.length == 2) {
        list = ss[1]
    }
    var tempbutton = id.substr(id.length - 6);
    var tempbuttonup = id.substr(id.length - 8);
    var tempbuttondown = id.substr(id.length - 10);
    if (list != 'searchlist' && list != 'checktextLabel' && list != 'checkcodeLabel' && type != 'checkbox' && tempbutton != 'button' && tempbuttonup != 'buttonup' && tempbuttondown != 'buttondown' && id.indexOf("textfield") == -1) {
        $(".newMenu").css('display', 'none');
    }
}
