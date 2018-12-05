function ExportExcelUtil(tablename,cols,where,type)
{
	this.tableName=tablename;
	this.cols=cols;
	this.where=where;
	this.type=type;
}
ExportExcelUtil.prototype.exportFile = function()
{	
    var form = $("<form>");
    form.attr('style', 'display:none');
    form.attr('target', '');
    form.attr('method', 'post');
    form.attr('action', WebVar.VarPath+"/export/excel/"+this.type);
    var input1 = $('<input>');
    input1.attr('type', 'hidden');
    input1.attr('name', 'tableName');
    input1.attr('value', this.tableName);
    var input2 = $('<input>');
    input2.attr('type', 'hidden');
    input2.attr('name', 'colList');
    input2.attr('value', this.cols);
    var input3 = $('<input>');
    input3.attr('type', 'hidden');
    input3.attr('name', 'where');
    input3.attr('value', this.where);
    $('body').append(form);
    form.append(input1);
    form.append(input2);
    form.append(input3);

    form.submit();
    form.remove();	
}