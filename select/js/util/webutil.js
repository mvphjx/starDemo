if(!window.console){
        window.console = {};
}
if(!window.console.log){
        window.console.log = function(msg){};
}
var WebUtil =
{
	/*
	  判断  对象是否为null （变量声明未赋值）
	 */
    isNull : function(obj)
    {
	    if (obj == undefined || obj == "undefined" || obj == null || typeof obj==="undefined")
		    return true;
	    return false;
    },
	/*
	  判断  对象是否赋值为空
	  		数值0；空串；数组长度为0；
	 */
    isEmpty : function(obj)
    {
	    if (obj == undefined || obj == "undefined" || obj == null)
		    return true;
	    if (obj instanceof Array && obj.length===0){
            return true;
        }
	    if (obj.length > 0)
		    return false;
	    if(obj===''){
	    	return true;//兼容ie8
	    }
	    for ( var str in obj)
	    {
		    return false;
	    }
	    return false;
    },
	//检测对象是否是空对象(不包含任何可读属性)。
    isOwnEmpty : function(obj){
        for(var name in obj)
        {
            if(obj.hasOwnProperty(name))
            {
                return false;//返回false，不为空对象
            }
        }
        return true;//返回true，为空对象
	},
    isFunction:function(func)
    {
    	if(func != undefined && func != null)
    	{
    		try
    		{
    			eval(func);
    			return true;
    		}
    		catch(e)
    		{
    			return false;
    		}
    	}
    	return false;
    },
    isNumber : function(str)
    {
	    if (/^-?\d+$/.test(str)) { return true; }
	    return false;
    },
    getNumberFromOx : function(str)//将16进制字符串，转换为数值
    {
        var number = 0;
    	if(this.isEmpty(str)){
    		return number;
		}
		if(str.indexOf("0x")===0){
            str=str.replace("0x","");
        }
        if (/^-?\d+$/.test(str)) { number = parseInt(str,16); }
        return number;
    },
    isFloat : function(str)
    {
	    if (/^(-?\d+)(\.\d+)?$/.test(str)) { return true; }
	    return false;
    },
    isChinese : function(str)
    {
	    var str = str.replace(/(^\s*)|(\s*$)/g, '');
	    if (!(/^[\u4E00-\uFA29]*$/.test(str) && (!/^[\uE7C7-\uE7F3]*$/.test(str)))) { return false; }
	    return true;
    },
    getLength : function(str)
    {
    	//\u4E00-\u9FA5
	    return str.replace(/[\u00FF-\uFFFF]/g, "  ").length;
    },
    isEmail : function(str)
    {
	    if (/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str)) { return true }
	    return false;
    },
    isDate : function(str)
    {
	    var reg = /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/;
	    if (reg.test(str)) { return true; }
	    return false;
    },
    ltrim : function(str)
    {
	    if (str.length == 0)
	    {
		    return (str);
	    }
	    else
	    {
		    var idx = 0;
		    while (str.charAt(idx).search(/\s/) == 0)
			    idx++;
		    return (str.substr(idx));
	    }
    },
    rtrim : function(str)
    {
	    if (str.length == 0)
	    {
		    return (str);
	    }
	    else
	    {
		    var idx = str.length - 1;
		    while (str.charAt(idx).search(/\s/) == 0)
			    idx--;
		    return (str.substring(0, idx + 1));
	    }
    },
    trim : function(str)
    {
	    return (this.rtrim(this.ltrim(str)));
    },
    urlEncode : function(str)
    {
	    if (this.isNull(str))
		    return "";
	    return encodeURIComponent(str);
    },
    version : function(){
		if($.browser.msie){
			//ie 7.0 8.0....
			return $.browser.version
		}	
	},//浏览器版本号
    initVersion : function()
    {
	    var ua = navigator.userAgent.toLowerCase();
	    var s;
	    (s = ua.match(/msie ([\d.]+)/)) ? this.version.ie = s[1] 
	    : (s = ua.match(/firefox\/([\d.]+)/)) ? this.version.firefox = s[1]
	    : (s = ua.match(/chrome\/([\d.]+)/)) ? this.version.chrome = s[1]
	    : (s = ua.match(/opera.([\d.]+)/)) ? this.version.opera = s[1]
	    : (s = ua.match(/version\/([\d.]+).*safari/)) ? this.version.safari = s[1] : 0;

    },
    getContentHeight : function()
    {
	    var bodyHeight = document.documentElement.clientHeight;
	    return bodyHeight - LayoutParam.headerH - LayoutParam.footerH;
    },
    getClientHeight:function()
	{
		var clientHeight = $(document.documentElement).height();
		return clientHeight;
	},
    getClientWidth:function()
	{
		var clientWidth = $(document.documentElement).width();
		return clientWidth;
	},
   	ValidataIDNum :function(_18idnum)
    {
		if (_18idnum.length != 18)
		{
			return false;
		}
		var sum = 0;
		var j = 0;
		var w = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
		var a = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
		for ( var i = 0; i < 17; i++)
		{
			j = w[i] * parseInt(_18idnum.substring(i, i + 1));
			sum = sum + j;
		}
		sum = sum % 11;
		var code = a[sum];
		var lastChar = _18idnum.substring(_18idnum.length-1);
		if(lastChar != code)return false;
		return true;
	},
    IDNum15To18 : function(_15idnum)
    {
    	/*升位后18位身份证号码*/
	    var _18idnum = "";
		var sum = 0;
		var j = 0;
		/*加权因子*/
		var w = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1);
		/*验证码*/
		var a = new Array("1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2");
		if (_15idnum.length != 15)
		{
			/*如果身份证号码不是15位，返回原来值。*/
			return _15idnum;
		}
		else
		{
			/*补充年份80－－>1980*/
			_18idnum = _15idnum.substring(0, 6) + "19" + _15idnum.substring(6);
		}
		/*求和*/
		for ( var i = 0; i < 17; i++)
		{
			j = w[i] * parseInt(_18idnum.substring(i, i + 1));
			sum = sum + j;
		}
		//取余数
		sum = sum % 11;
		/*添加验证码*/
		_18idnum = _18idnum + a[sum];
		/*返回18位身份证号码*/
		return _18idnum;
	},
	IDNum18To15 : function(_18idnum)
	{
		var _15idnum = "";
		if (_18idnum.length != 18)
		{
			/*如果身份证号码不是18位，返回原来值。*/
			return _18idnum;
		}
		else
		{
			_15idnum = _18idnum.substring(0, 6) + _18idnum.substring(8, 17);
		}
		return _15idnum;
	},
	formatTxt	: function format()
	{
		var arr = arguments;
		if(arr == null || arr.length < 1) return null;
		var rex = "\\{[0-9]+\\}";
		var formatStr = arr[0];
		var findStr;
		var txt = "";
		var lastIndex = 0;
		var str = formatStr;
		while((findStr = str.match(rex)) != null)
		{
			findStr += "";
			var start = str.indexOf(findStr);
			var index = start + findStr.length;
			lastIndex += index;
			txt += str.substring(0,index);
			var t = findStr;
			var reg = new RegExp("[\{\}]*","gm")
			var i = t.replace(reg,"");
			i++;
			t = arr[i];
			txt = txt.replace(findStr,t);
			str = str.substring(index,str.length);
		}
		txt += formatStr.substring(lastIndex,formatStr.length);
		return txt;
	},
	Wait:function()
	{
		var body = $("body");
		body.css({"cursor":"wait"});
	},
	NoWait:function()
	{
		var body = $("body");
		body.css({"cursor":"default"});
	},
	toString:function(obj)
	{
		if(this.isNull(obj))return "";
		return obj;
	},
	isArray:function(o) 
	{
	    return Object.prototype.toString.call(o) === '[object Array]';
	},
	equals:function(o1,o2)
	{
		if(o1 == null && o2 == null)return true;
		if(o1 != null && o2 != null)
		{
			var b1 = this.isArray(o1);
			var b2 = this.isArray(o2);
			if(b1 && b2)
			{
				var l1 = o1.length;
				var l2 = o2.length;
				if(l1 == l2)
				{
					for(var i = 0;i< l1;i++)
					{
						var v1 = o1[i] + "";
						var v2 = o2[i] + "";
						if(v1 != v2) return false;
					}
					return true;
				}
				else
				{
					return false;
				}
			}
			else if(!b1 && !b2)
			{
				if(typeof o1 ==='object'&& typeof o2 ==='object'){
					return JSON.stringify(o1) === JSON.stringify(o2)
				}else{
					return o1 + "" == o2 + "";
				}
			}
			else
			{
				return false;
			}
		}
		return false;
	},
    unique:function(arr){
    	if(!this.isArray(arr)){
    		return arr;
		}
        var res = [];
        var json = {};
        for(var i = 0; i < arr.length; i++){
            if(!json[arr[i]]){
                res.push(arr[i]);
                json[arr[i]] = 1;
            }
        }
        return res;
    },
    contains:function(o1,o2){//判断两个json对象是否有包含关系
        if(o1 === null && o2 === null){
        	return false;
        }
        if(typeof o1 ==='object'&& typeof o2 ==='object'){
			return JSON.stringify(o1).indexOf(JSON.stringify(o2))>=0
        }else if (typeof o1 ==='string'&& typeof o2 ==='string'){
            return o.indexOf(o2)>=0
		}else{
        	return false;
		}

	},
	formatNum:function(num,fixed)
	{
		return parseFloat(num.toFixed(fixed));
	},
	removeFilePath:function(file)
	{
		file.outerHTML.replace(/(value=\").+\"/i,"$1\"");
	},
	getComputerInfoByActiveX:function()
	{//通过内部ActiveX 获取pc信息  只支持 windows ie
		 var locator = new ActiveXObject ("WbemScripting.SWbemLocator"); 
		 var service = locator.ConnectServer("."); 
		 //CPU信息 
		 var cpu = new Enumerator (service.ExecQuery("SELECT * FROM Win32_Processor")).item(); 
		 var cpuType=cpu.Name,hostName=cpu.SystemName; 
		 //内存信息 
		 var memory = new Enumerator (service.ExecQuery("SELECT * FROM Win32_PhysicalMemory")); 
		 for (var mem=[],i=0; !memory.atEnd(); memory.moveNext()) mem[i++]={cap:memory.item().Capacity/1024/1024,speed:memory.item().Speed} 
		 //系统信息 
		 var system=new Enumerator (service.ExecQuery("SELECT * FROM Win32_ComputerSystem")).item(); 
		 var physicMenCap=Math.ceil(system.TotalPhysicalMemory/1024/1024),curUser=system.UserName,cpuCount=system.NumberOfProcessors
		  
		 return {cpuType:cpuType,cpuCount:cpuCount,hostName:hostName,curUser:curUser,memCap:physicMenCap,mem:mem}
	},
	/*
	 {
	 "ComputerName" : "PC215",
	 "IP" : [ "192.168.128.48" ],
	 "MAC" : [ "F8:B1:56:B4:23:86" ],
	 "OS" : "Microsoft Windows 7 旗舰版 Service Pack 16.1.7601",
	 "UserName" : "guoqz"
	 }
	 */
    getComputerInfo:function()
    {
		var ocx = document.getElementById("ComputerInfoOcx");//需要引用 ocx插件
		var info = {};
        try {
            if(ocx&&ocx.HS_OCX_GetComputerInfo){
                info = ocx.HS_OCX_GetComputerInfo();
            }
		}catch (e){}
        return info;
    },
	getNowFormatDateTime : function()
	{//获取当前时间  格式 yyyy-MM-dd HH:MM:SS
	    var date = new Date();
	    var seperator1 = "-";
	    var seperator2 = ":";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    //格式 yyyy-MM-dd HH:MM:SS
	    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
	            + " " + date.getHours() + seperator2 + date.getMinutes()
	            + seperator2 + date.getSeconds();
	    //格式 yyyyMMddHHMMSS
	    var strHours = date.getHours();
	    var strMinutes = date.getMinutes();
	    var strSeconds = date.getSeconds();
	    if (strHours >= 0 && strHours <= 9) {
	    	strHours = "0" + strHours;
	    }
	    if (strMinutes >= 0 && strMinutes <= 9) {
	    	strMinutes = "0" + strMinutes;
	    }
	    if (strSeconds >= 0 && strSeconds <= 9) {
	    	strSeconds = "0" + strSeconds;
	    }
	    var currentdate2 = date.getFullYear()  + month  + strDate
        + strHours  + strMinutes
         + strSeconds;
	    return currentdate;
	},
	getNowFormatDate: function()
	{//获取当前时间  格式 yyyyMMdd
	    var date = new Date();
	    var seperator1 = "-";
	    var seperator2 = ":";
	    var month = date.getMonth() + 1;
	    var strDate = date.getDate();
	    if (month >= 1 && month <= 9) {
	        month = "0" + month;
	    }
	    if (strDate >= 0 && strDate <= 9) {
	        strDate = "0" + strDate;
	    }
	    //格式 yyyyMMdd
	    var strHours = date.getHours();
	    var strMinutes = date.getMinutes();
	    var strSeconds = date.getSeconds();
	    if (strHours >= 0 && strHours <= 9) {
	    	strHours = "0" + strHours;
	    }
	    if (strMinutes >= 0 && strMinutes <= 9) {
	    	strMinutes = "0" + strMinutes;
	    }
	    if (strSeconds >= 0 && strSeconds <= 9) {
	    	strSeconds = "0" + strSeconds;
	    }
	    var currentdate2 = date.getFullYear()  + month  + strDate;
	    return currentdate2;
	},
	//将字符串转化成为json，失败返回空
	string2Json:function(string){
		var obj = {};
		if(! (typeof string==='string')){
		    return string
        }
		if(this.isEmpty(string)||this.isOwnEmpty(string)){
			return obj;
		}
		try{
			obj = JSON.parse(string); 
		}catch(e){
			console&&console.log(e); 
		}
		return obj
	},
    //日期格式 转换 2017-07-25 00:00:00 2017-7-25 00:00:00  ->20170725
    dateTime2Date:function(string){
        //日期格式转换
        if(string.indexOf("-") > -1) {
            string = string.replace(/(\d{4}).(\d{1,2}).(\d{1,2}).+/mg, function($0, $1, $2, $3) {
                if($2.length === 1) {
                    $2 = '0' + $2
                }
                if($3.length === 1) {
                    $3 = '0' + $3
                }
                return $1 + $2 + $3
            });
        }
        return string;
    },
    //日期格式 转换 2017-07-25 00:00:00 2017-7-25 00:00:00  ->20170725000000
    dateTime2DateTime:function(string){
        //日期格式转换
        if(string.indexOf("-") > -1) {
            string = string.replace(/(\d{4}).(\d{1,2}).(\d{1,2}).(\d{1,2}).(\d{1,2}).(\d{1,2})+/mg, function($0, $1, $2, $3,$4,$5,$6) {
                if($2.length === 1) {
                    $2 = '0' + $2
                }
                if($3.length === 1) {
                    $3 = '0' + $3
                }
                if($4.length === 1) {
                    $4 = '0' + $4
                }
                if($5.length === 1) {
                    $5 = '0' + $5
                }
                if($6.length === 1) {
                    $6 = '0' + $6
                }
                return $1 + $2 + $3+ $4+ $5+ $6
            });
        }
        return string;
    },
    //日期格式 转换 2017-07-25 00:00:00 2017-7-25 00:00:00  ->000000
    time2Time:function(string){
        if(string.indexOf(":") > -1) {
            string = string.replace(/(\d{1,2}).(\d{1,2}).(\d{1,2}).+/mg, function($0, $1, $2, $3) {
                if($1.length === 1) {
                    $1 = '0' + $1
                }
                if($2.length === 1) {
                    $2 = '0' + $2
                }
                if($3.length === 1) {
                    $3 = '0' + $3
                }
                return $1+ $2+ $3
            });
        }
        return string;
    },
    //20171103164434 ->"2016-09-28 17:18:23"
    string2DateString:function(string){
        if(this.isEmpty(string)||string.length!==14){
            return string;
        }
        var pattern = /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/;
        string = string.replace(pattern, '$1-$2-$3 $4:$5:$6');
        return string;
    }

};
 
