var RequiredCheck =
{
	/**
	 * 验证必填项
	 */
	check : function(colNames,widgetMap,nTip)
	{
		/** 保存之前对必填项字段进行验证 */
		var s = true;
		if (WebHelper.isEmpty(colNames))
		{
			return s;
		}
		for(var colName in widgetMap)
		{
			widgetMap[colName].cancelRequiredTip();
		}
		for ( var i = 0; i < colNames.length; i++)
		{
			var colName = colNames[i].toUpperCase();
			var f = null;
			for(var col in widgetMap)
			{
				if(colName == col.toUpperCase())
				{
					f = widgetMap[col];
					break;
				}
			}
			if (WebHelper.isNull(f))
			{
				continue;
			}
			var v = f.getValue();
			if (WebHelper.isNull(v))
			{
				if(WebHelper.isNull(nTip) || !nTip )
				{
					f.requiredTip();
				}
				s = false;
			}
		}
		return s;
	}

}
