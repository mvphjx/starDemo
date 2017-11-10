var ABISValidateUtil =
{
    gtLen:function(str,len)
    {
    	if(WebUtil.isNull(str))return false;
    	var l = WebUtil.getLength(str);
    	if(l >= len)return true;
    	return false;
    },
    equalLen:function(str,len)
    {
    	if(WebUtil.isNull(str))return false;
    	var l = WebUtil.getLength(str);
    	if(l == len)return true;
    	return false;
    },
    ltLen:function(str,len)
    {
    	if(WebUtil.isNull(str))return false;
    	var l = WebUtil.getLength(str);
    	if(l <= len)return true;
    	return false;
    },
    gtAndltLen:function(str,gtlen,ltlen)
    {
    	if(WebUtil.isNull(str))return false;
    	var l = WebUtil.getLength(str);
    	if(l <= gtlen && l >= ltlen)
    	{
    		return true;
    	}
    	return false;
    },
    isNumlgtLen:function(str,len)
    {
    	if(WebUtil.isNull(str))return false;
    	if(WebUtil.isNumber(str))return false;
    	if(str >= len) return true;
    	return false;
    },
    isDatelgtequal:function(str,len)
    {
    	if(WebUtil.isNull(str))return false;
    	if(WebUtil.isDate(str))return false;
    	if(str == len) return true;
    	return false;
    }
}
 
