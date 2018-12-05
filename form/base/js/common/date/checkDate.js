//判断输入的内容是否为日期格式

function checkDateFormate(Field) 
{
    var inputDateValue = Field.value;
    if(inputDateValue == null || inputDateValue == '') {

       return false;
    }
    //获取输入字符串的长度

    var inputValueLength = inputDateValue.length;

    //如果满足下面判断的所有条件才算合法的日期，否则不合法

    if(checkNumeric(inputDateValue) && checkLegth(inputValueLength) && checkSpecialChar(inputDateValue) ) {

       return true;

    }else {

	   alert("请输入合法的日期"+"\n类型为日期，格式为YYYY-MM-DD");
       Field.focus();
       return false;
    } 

}

//日期只能是8~10位

function checkLegth(length) {

    if(length < 8 || length > 10) {

       return false;

    }

    return true;

}

//如果输入的内容中包含‘-’，则按照‘-’分割来去年月日，否则直接按照位数取

function checkSpecialChar(inputDateValue) {

    var index = inputDateValue.indexOf('-');

    var year = 0;

    var month = 0;

    var day = 0;

    if(index > -1) {

       var lastIndex = inputDateValue.lastIndexOf('-');

       //只能是YYYY-M-DD或者YYYY-MM-DD的形式

       if(lastIndex - index < 1 || lastIndex - index > 3) {

           return false;
       }

       var arrDate = inputDateValue.split('-');

           year = arrDate[0];

           month = arrDate[1];

           day = arrDate[2];

       } 
       else 
       {
			return false;
       }

       if(Number(month) > 12 || Number(day) > 31 ||Number(month)<1

                           || Number(day)<1 ||  year.length != 4) {

           return false;

    } else  if(day > getLastDayOfMonth(Number(year),Number(month))) {

           return false;

    }

    return true;

}

//判断输入的内容将‘-’替换成为数字1后，是否全部为数字

function checkNumeric(inputDateValue) {

    var replacedValue = inputDateValue.replace(/-/g,'1');

    return isNumeric(replacedValue);

}

//判断是否为数字

function isNumeric(strValue)

{

  var result = regExpTest(strValue,/\d*[.]?\d*/g);

  return result;

}

 

function regExpTest(source,re)

{

  var result = false;

 

  if(source==null || source=="")

    return false;

 

  if(source==re.exec(source))

    result = true;

 

  return result;

}

 

//获得一个月中的最后一天

function getLastDayOfMonth(year,month){

    var days=0;

    switch(month){

    case 1: case 3: case 5: case 7: case 8: case 10: case 12: days=31;break;

    case 4: case 6: case 9: case 11: days=30;break;

    case 2: if(isLeapYear(year)) days=29;else days=28;break;

    }

    return days;

}

//判断是否为闰年

function isLeapYear(year){

    if((year %4==0 && year %100!=0) || (year %400==0)) return true;

    else return false;

}

