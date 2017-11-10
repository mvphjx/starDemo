function FillItemPart(id,obj,checkedlist,bizCheckedlist,type)
{
	this.id 	= id;
	this.obj=obj;	
	this.checkedlist=checkedlist;
	this.bizCheckedlist=bizCheckedlist;
	this.type=type;
	this.create();
}
FillItemPart.prototype.create = function()
{
	this.parent=$("#"+this.id);	
	this.body=$("<div></div>");
	this.body.attr("id",this.obj[0][0].id);
	this.body.attr("class","bodyPanel");	
	//标题	
	this.title = $("<div></div>");
	this.title.attr("id",this.personId);
	this.title.attr("class","title");	
	this.title.html(this.obj[0][0].title);	
	this.body.append(this.title);
	
	//创建表格
	this.table  = $("<table width='100%' class='table'></table>");
	for(var i=1;i<this.obj.length;i++)
	{
		var trobj=this.obj[i];
		var tr=$("<tr style='height:25px;'></tr>");
		for(var j=0;j<trobj.length;j++)
		{
			var tdobj=trobj[j];
			var td=$("<td width='25%'></td>");
			var checkbox=$("<input></input>");
			checkbox.attr("type","checkbox");
			checkbox.attr("class","checkInput");
			checkbox.attr("name","requiredItem");
			var value=tdobj.tablename+"|"+tdobj.attrname;
			checkbox.attr("value",value);
			if(this.checkedlist!=null||this.checkedlist!=undefined)
			{
				for(var a=0;a<this.checkedlist.length;a++)
				{
					if(this.checkedlist[a].replace(/[ ]/g,"")==value)
					{
						checkbox.prop("checked","true");
						break;
					}						
				}
			}
			if(this.bizCheckedlist!=null&&this.bizCheckedlist[tdobj.tablename]!=null)
			{
				var bizlist=this.bizCheckedlist[tdobj.tablename];
				for(var a=0;a<bizlist.length;a++)
				{
					if(bizlist[a]==tdobj.attrname)
					{
						if(this.type==CfgTypeCode.TPCARD_REQURIED) 
						{
							checkbox.prop("checked","true");
						}else if(this.type==CfgTypeCode.LPCASE_REQURIED){
							checkbox.prop("checked","true");
						}
						//TT_HITLOG_UPDATE
						else if(this.type==CfgTypeCode.TT_HITLOG_UPDATE){
							checkbox.prop("checked","true");
						}
						//TPCARD_UPDATE
						else if(this.type==CfgTypeCode.TPCARD_UPDATE){
							checkbox.prop("checked","true");
						}
						checkbox.prop("disabled","disabled");
					}
						
				}
			}
			var checktext=$("<label></label>");
			checktext.html(tdobj.dispname);
			td.append(checkbox).append(checktext);
			tr.append(td);
		}
		this.table.append(tr);
	}
	this.body.append(this.table);
	this.parent.append(this.body);
}