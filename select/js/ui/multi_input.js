

function ViewMulDiv(pid,id,val_id,val_text_id,DivClass,disable,width,height,total_num_show)
{
	this.pid 			= pid;
	this.id 			= id;
	this.val_id 		= val_id;
	this.val_text_id 	= val_text_id;
	this.DivClass 		= DivClass;
	this.disable 		= disable;
	this.enabled 		= true;
	this.isDown			= false;
	this.width			= width;
	this.height			= height;
	this.total_num_show	= total_num_show;
	this.init();
}


/**
 * objArr[{id:要提交到后台的ID，text：要显示的内容}]
 * @param objArr
 */
ViewMulDiv.prototype.setText = function(objArr)
{
	var pro_val_id = this.val_id;
	var pro_val_text_id = this.val_text_id;
	var pro_id = this.id;
	var total_num = 0;
	
	$("#"+pro_id).find("ul").html('');
	$("#"+pro_val_id).val("");
	$("#"+pro_val_text_id).val("");
	$("#"+pro_id+"_total").html(0);
	
	for(var i in objArr){
		var _obj = objArr[i];
		var _disabled;
		if(this.disable){
			_disabled = 'style="display:none;"';
		}
		this.$close = $('<a class="search-choice-close" '+_disabled+' data-option-array-index="'+_obj.id+'"></a>');
		this.$close.bind("click",function(n){
			var id = $(this).attr("data-option-array-index");
			var text = $(this).parent().find("span").html();
			$(this).parent().remove();
			$("#"+pro_val_id).val((","+$("#"+pro_val_id).val()+",").replace((','+id+','),',').replace(/,*$/g,"").replace(/^,*/g,""));
			$("#"+pro_val_text_id).val((","+$("#"+pro_val_text_id).val()+",").replace((','+text+','),',').replace(/,*$/g,"").replace(/^,*/g,""));
			$("#"+pro_id+"_total").html($("#"+pro_id+"_total").html()-1);
		});
		this.$li = $('<li class="mul-point"><span>'+_obj.text+'</span></li>');
		this.$li.append(this.$close);
		this.$div.find("ul").append(this.$li);
		$("#"+pro_val_id).val($("#"+pro_val_id).val()+_obj.id+",");
		$("#"+pro_val_text_id).val($("#"+pro_val_text_id).val()+_obj.text+",");
		total_num++;
	}
	$("#"+this.id+"_total").html(total_num);
}

ViewMulDiv.prototype.init = function()
{
	this.parent = $("#"+this.pid);
	this.$div = $("<div id='"+this.id+"' class=\"mul-div " + this.DivClass + "\" style=\"border: 1px solid #ccc;overflow: auto;height:"+this.height+";width:"+this.width+";\"><ul></ul></div>");
	this.$val_input = $("<input id="+this.val_id+" type=\"hidden\"></input>");
	this.$text_input = $("<input id="+this.val_text_id+" type=\"hidden\"></input>");
	var _show_total = " style = 'display:none;'";
	if(this.total_num_show){
		_show_total = " style = 'display:block;'";
	}
	this.$text_total = $("<div id='"+this.id+"_total_text' "+_show_total+">"+pageNumStr.TotalRecords+":<span id='"+this.id+"_total'>0</span></div>")
	this.parent.append(this.$div);
	this.parent.append(this.$val_input);
	this.parent.append(this.$text_input);
	this.parent.append(this.$text_total);
}

ViewMulDiv.prototype.setDisable = function(disable,disableClass){
	if(disable){
		$("#"+this.id).find(".search-choice-close").css("display","none");
		if(disableClass==undefined){
			$("#"+this.id).css("background-color","#ccc");
		}else{
			$("#"+this.id).addClass(disableClass);
		}
	}else{
		$("#"+this.id).find(".search-choice-close").css("display","block");
		if(disableClass==undefined){
			$("#"+this.id).css("background-color","#fff");
		}else{
			$("#"+this.id).removeClass(disableClass);
		}
	}
	
}