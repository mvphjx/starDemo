var setBty=
{
		setText:function (url,printType,bty,obj,megList,btyType,desmedType,configType){
			$.post(url,{printType:printType,bty:bty},
				      function(data)
				       {		
						$("#extMethod").html("");
						$("#imgId").html("");
						$("#existId").html("");
						$("#baseBty").html("");
						$("#nxBty").html("");
						$("#zdBty").html("");
						$("#extMethodTP").html("");
						$("#imgIdTP").html("");
						$("#existIdTP").html("");
						$("#baseBtyTP").html("");
						$("#nxBtyTP").html("");
						$("#zdBtyTP").html("");
						$("#selectsxBty").html("");
						if(data!=null&&data!=""){
							for (var i = 0; i < data.btyList.length; i++) {
								if(obj.extMethod!=""&&obj.extMethod==data.btyList[i].id){
									$("#extMethod").append("<option selected='selected' value="+data.btyList[i].id+">"+data.btyList[i].text+"</option>");
									$("#extMethodTP").append("<option selected='selected' value="+data.btyList[i].id+">"+data.btyList[i].text+"</option>");
								}else{
                                    if(desmedType==data.btyList[i].id){//生物特征跟提取方法匹配时，默认选中
											$("#extMethod").append("<option selected='selected' value="+data.btyList[i].id+">"+data.btyList[i].text+"</option>");
											$("#extMethodTP").append("<option selected='selected' value="+data.btyList[i].id+">"+data.btyList[i].text+"</option>");
                                    }else{
                                            $("#extMethod").append("<option value="+data.btyList[i].id+">"+data.btyList[i].text+"</option>");
                                            $("#extMethodTP").append("<option value="+data.btyList[i].id+">"+data.btyList[i].text+"</option>");
                                    }
								}
							}
							for (var i = 0; i < data.mexDs.length; i++) {
								if(obj.zdBty!=""&&obj.zdBty==data.mexDs[i].id){
									$("#zdBty").append("<option selected='selected' value="+data.mexDs[i].id+">"+data.mexDs[i].text+"</option>");
									$("#zdBtyTP").append("<option selected='selected' value="+data.mexDs[i].id+">"+data.mexDs[i].text+"</option>");
									$("#selectsxBty").append("<option selected='selected' value="+data.mexDs[i].id+">"+data.mexDs[i].text+"</option>");
								}else{
									$("#zdBty").append("<option value="+data.mexDs[i].id+">"+data.mexDs[i].text+"</option>");
									$("#zdBtyTP").append("<option value="+data.mexDs[i].id+">"+data.mexDs[i].text+"</option>");
									$("#selectsxBty").append("<option value="+data.mexDs[i].id+">"+data.mexDs[i].text+"</option>");
								}
							}
							//待和并特征赋值
							if(!WebUtil.isEmpty(obj.btyStrs)){
								var btyliStr="";
								var btyTeColList = obj.btyStrs.split(",");
								for (var i = 0; i < data.mexDs.length; i++) {
									for (var j = 0; j < btyTeColList.length; j++) {
										if(data.mexDs[i].id==btyTeColList[j]){
											btyliStr = btyliStr+"<li onclick='checkli(this)' id="+ data.mexDs[i].id +" >"+data.mexDs[i].text+"</li>";
										}
									}
								}
								$("#btyTest").html("");
								$("#btyNyTest").html("");
								$("#btyTest").append(btyliStr);
								$("#btyNyTest").append(btyliStr);
							}else{
								$("#btyTest").html("");
								$("#btyNyTest").html("");
							}
							for (var i = 0; i < data.imglist.length; i++) {
								if(obj.img!=""&&obj.img==data.imglist[i].id){
									$("#imgId").append("<option selected='selected' value="+data.imglist[i].id+">"+data.imglist[i].text+"</option>");
									$("#imgIdTP").append("<option selected='selected' value="+data.imglist[i].id+">"+data.imglist[i].text+"</option>");
								}else{
									$("#imgId").append("<option value="+data.imglist[i].id+">"+data.imglist[i].text+"</option>");
									$("#imgIdTP").append("<option value="+data.imglist[i].id+">"+data.imglist[i].text+"</option>");
								}
							}
							for (var i = 0; i < data.btyExiList.length; i++) {
								if(obj.exist!=""&&obj.exist==data.btyExiList[i].id){
									$("#existId").append("<option selected='selected' value="+data.btyExiList[i].id+">"+data.btyExiList[i].text+"</option>");
									$("#existIdTP").append("<option selected='selected' value="+data.btyExiList[i].id+">"+data.btyExiList[i].text+"</option>");
								}else{
									$("#existId").append("<option value="+data.btyExiList[i].id+">"+data.btyExiList[i].text+"</option>");
									$("#existIdTP").append("<option value="+data.btyExiList[i].id+">"+data.btyExiList[i].text+"</option>");
								}
								if(obj.exist==2){//如果特征和并为2(和并是)，和并参数设置可操作
									setDisabled.removeDisabled();
								}else{
									setDisabled.addDisabled();
								}
							}
							for (var i = 0; i < data.btyTypeList.length; i++) {
								if(obj.baseBty!=""&&obj.baseBty==data.btyTypeList[i].id){
									$("#baseBty").append("<option selected='selected' value="+data.btyTypeList[i].id+">"+data.btyTypeList[i].text+"</option>");
									$("#baseBtyTP").append("<option selected='selected' value="+data.btyTypeList[i].id+">"+data.btyTypeList[i].text+"</option>");
								}else{
									$("#baseBty").append("<option value="+data.btyTypeList[i].id+">"+data.btyTypeList[i].text+"</option>");
									$("#baseBtyTP").append("<option value="+data.btyTypeList[i].id+">"+data.btyTypeList[i].text+"</option>");
								}
							}
							for (var i = 0; i < data.combineTypeList.length; i++) {
								if(obj.nxBty!=""&&obj.nxBty==data.combineTypeList[i].id){
									$("#nxBty").append("<option selected='selected' value="+data.combineTypeList[i].id+">"+data.combineTypeList[i].text+"</option>");
									$("#nxBtyTP").append("<option selected='selected' value="+data.combineTypeList[i].id+">"+data.combineTypeList[i].text+"</option>");
								}else{
									$("#nxBty").append("<option value="+data.combineTypeList[i].id+">"+data.combineTypeList[i].text+"</option>");
									$("#nxBtyTP").append("<option value="+data.combineTypeList[i].id+">"+data.combineTypeList[i].text+"</option>");
								}
							}
							//压缩页面参数设置
							if(printType==1){
								//压缩方法
								$("#comMethod").html("");
								for (var i = 0; i < data.switcherTPList.length; i++) {
									if(obj.doCom==1&&obj.extMethod==data.switcherTPList[i].code){
										$("#comMethod").append("<option selected='selected' value="+data.switcherTPList[i].code+">"+data.switcherTPList[i].text+"</option>");
									}else{
										$("#comMethod").append("<option value="+data.switcherTPList[i].code+">"+data.switcherTPList[i].text+"</option>");
									}
									
								}
								//压缩倍率
								$("#imgComRatio").html("");
								for (var i = 0; i < data.comRatio.length; i++) {
									if(obj.doCom==1&&obj.comRatio==data.comRatio[i]){
										$("#imgComRatio").append("<option selected='selected' value="+data.comRatio[i]+">"+data.comRatio[i]+"</option>");
									}else{
										$("#imgComRatio").append("<option value="+data.comRatio[i]+">"+data.comRatio[i]+"</option>");
									}
								}
								//压缩图存在
								$("#existComId").html("");
								for (var i = 0; i < data.btyImgExiList.length; i++) {
									if(obj.doCom==1&&obj.exist==data.btyImgExiList[i].id){
										$("#existComId").append("<option selected='selected' value="+data.btyImgExiList[i].id+">"+data.btyImgExiList[i].text+"</option>");
									}else{
										$("#existComId").append("<option value="+data.btyImgExiList[i].id+">"+data.btyImgExiList[i].text+"</option>");
									}
								}
								//压缩格式
								$("#imgComFmtData").html("");
								for (var i = 0; i < data.createLobFmtData.length; i++) {
									if(obj.doCom==1&&obj.comFmtData==data.createLobFmtData[i].code){
										$("#imgComFmtData").append("<option selected='selected' value="+data.createLobFmtData[i].code+">"+data.createLobFmtData[i].text+"</option>");
									}else{
										$("#imgComFmtData").append("<option value="+data.createLobFmtData[i].code+">"+data.createLobFmtData[i].text+"</option>");
									}
									
								}
								//是否压缩
								if(obj.doCom==1&&obj.doCpr==1){
									$(":checkbox[name='compCheckbox']").prop("checked",true);
								}else{
									$(":checkbox[name='compCheckbox']").prop("checked",false);
								}
							}
						}
				       }
		    	);
			
			if(!WebUtil.isEmpty(obj.units)){
				var unliStr="";
				var unitTeColList = obj.units.split(",");
				for (var i = 0; i < unitTeColList.length; i++) {
					var unitTes = unitTeColList[i];
					var textVal1 = unitTes.split("_")[0];//和并內容
					var textVal0 = unitTes.split("_")[1];//合并方式
					var text1 ;
					var text0 ;
					if(textVal1==1){
						text0 = megList[0];
					}else if(textVal1==2){
						text0 = megList[1];
					}else if(textVal1==0){
						text0 = megList[2];
					}
					if(textVal0==1){
						text1 = megList[3];
					}else if(textVal0==2){
						text1 = megList[4];
					}
					unliStr = unliStr+"<li onclick='checkli(this)' id="+ unitTes+" >"+text0 +" "+text1+"</li>";
				}
				$("#unitTest").html("");
				$("#unitNyTest").html("");
				$("#unitTest").append(unliStr);
				$("#unitNyTest").append(unliStr);
			}else{
				$("#unitTest").html("");
				$("#unitNyTest").html("");
			}
			//指位赋值
			if(printType==2){
				if(btyType==1){//指纹
					name = "btyLP";
				}else if(btyType==2){//掌纹
					name = "plambtyLP";
				}
			}else if(printType==1){
                if(configType=="FingerCompressParam"||configType=="PalmPrintCompressParam"){//压缩操作
                    if(btyType==1){//指纹
                        name = "btyTP";
                    }else if(btyType==2){//掌纹
                        name = "plambtyTP";
                    }
                }else{
                    if(btyType==1){//指纹
                        name = "btyT";
                    }else if(btyType==2){//掌纹
                        name = "plambtyT";
                    }
                }
			}
			if(obj!=""){
                var btyStrList = null;
                var btyCheckedTypeList = null;
                if(!WebUtil.isEmpty(obj.bty)){
                    btyStrList = obj.bty.split(",");
                }
                if(!WebUtil.isEmpty(obj.btyCheckedType)){
                    btyCheckedTypeList = obj.btyCheckedType.split(",");
                }
				//设置第一份，平面，滚动
				setBty.setBtyCheckedType(btyCheckedTypeList,printType,obj.doCom,configType);
				//设置指位
				setBty.setBtyChecked(btyStrList,name);
			}else{
				setBty.setBtyCanlCheckedBox(printType,true,configType);
				setBty.setBtyNotChecked(name);
			}
		},
		//给第一份，平面，滚动赋值
		setBtyCheckedType:function (typelist,printType,doCom,configType){
			if(!WebUtil.isEmpty(typelist)){
				if(printType==2){
					setBty.setBtyCheckedBoxName(typelist,"firstCheckbox","scrollBytCheckbox","planeBytCheckbox");
				}else if(printType==1){
					if(doCom==1){//压缩
                        setBty.setBtyCheckedBoxName(typelist,"firstCheckboxTP","scrollBytCheckboxTP","planeBytCheckboxTP");
					}else{
                        setBty.setBtyCheckedBoxName(typelist,"firstCheckboxT","scrollBytCheckboxT","planeBytCheckboxT");
					}
				}
			}else{
				setBty.setBtyCanlCheckedBox(printType,false,configType);
			}
			
		},
		setBtyCheckedBoxName:function (typelist,firstCheckbox,scrollBytCheckbox,planeBytCheckbox){
			//先清除上次操作选中历史数据
			$(":checkbox[name="+firstCheckbox+"]").prop("checked", false);
			$(":checkbox[name="+scrollBytCheckbox+"]").prop("checked", false);
			$(":checkbox[name="+planeBytCheckbox+"]").prop("checked", false);
            if(!WebUtil.isEmpty(typelist)){
                for (var i = 0; i < typelist.length; i++) {
                    if(typelist[i]==0){
                        $(":checkbox[name="+firstCheckbox+"]").prop("checked", true);
                    }else if(typelist[i]==1){
                        $(":checkbox[name="+scrollBytCheckbox+"]").prop("checked", true);
                    }else if(typelist[i]==2){
                        $(":checkbox[name="+planeBytCheckbox+"]").prop("checked", true);
                    }
                }
			}
		},
		setBtyCanlCheckedBox:function (printType,chk,configType){
			if(printType==2){
				$(":checkbox[name='firstCheckbox']").prop("checked", chk);
				$(":checkbox[name='scrollBytCheckbox']").prop("checked", chk);
				$(":checkbox[name='planeBytCheckbox']").prop("checked", chk);
			}else if(printType==1){
                if(configType=="FingerCompressParam"||configType=="PalmPrintCompressParam"){//压缩操作
                    $(":checkbox[name='firstCheckboxTP']").prop("checked", chk);
                    $(":checkbox[name='scrollBytCheckboxTP']").prop("checked", chk);
                    $(":checkbox[name='planeBytCheckboxTP']").prop("checked", chk);
				}else{
                    $(":checkbox[name='firstCheckboxT']").prop("checked", chk);
                    $(":checkbox[name='scrollBytCheckboxT']").prop("checked", chk);
                    $(":checkbox[name='planeBytCheckboxT']").prop("checked", chk);
				}
			}
		},
		setBtyChecked:function (list,name){
			if(!WebUtil.isEmpty(list)){
				//先清除上次操作选中历史数据
				$("input[name="+name+"]").each(function(){ 
					$(this).prop("checked", false);
				});
				for (var i = 0; i < list.length; i++) {
					$("input[name="+name+"]").each(function(){ 
						if($(this).val()==list[i]){
							$(this).prop("checked", true);
						}
					});
				}
			}else{
				$("input[name="+name+"]").each(function(){ 
					$(this).prop("checked", false);
				});
			}
			
		},
		setBtyNotChecked:function (name){
			$("input[name="+name+"]").each(function(){
				$(this).prop("checked", true);
			});
		}
}
var setDisabled=
{
		removeDisabled:function (){
			$('#baseBty').removeAttr("disabled");
			$('#baseBtyTP').removeAttr("disabled");
        	$('#zdBty').removeAttr("disabled");
        	$('#zdBtyTP').removeAttr("disabled");
        	$('#nxBty').removeAttr("disabled");
        	$('#nxBtyTP').removeAttr("disabled");
        	$('#add1').removeAttr("disabled");
        	$('#add2').removeAttr("disabled");
        	$('#del1').removeAttr("disabled");
        	$('#del2').removeAttr("disabled");
        	$('#add11').removeAttr("disabled");
        	$('#add22').removeAttr("disabled");
        	$('#del11').removeAttr("disabled");
        	$('#del22').removeAttr("disabled");
		},
		addDisabled:function (){
			$('#baseBty').attr("disabled","disabled");
			$('#baseBtyTP').attr("disabled","disabled");
        	$('#zdBty').attr("disabled","disabled");
        	$('#zdBtyTP').attr("disabled","disabled");
        	$('#nxBty').attr("disabled","disabled");
        	$('#nxBtyTP').attr("disabled","disabled");
        	$('#add1').attr("disabled","disabled");
        	$('#add2').attr("disabled","disabled");
        	$('#del1').attr("disabled","disabled");
        	$('#del2').attr("disabled","disabled");
        	$('#add11').attr("disabled","disabled");
        	$('#add22').attr("disabled","disabled");
        	$('#del11').attr("disabled","disabled");
        	$('#del22').attr("disabled","disabled");
		}	

}
var changeView=
    {
        changeBtyView:function (btysconfigType){
//指纹
            if(btysconfigType.split(" ")[0]==SelectBtyCode.FingerNode||btysconfigType.split(" ")[0]==SelectBtyCode.FingerHSNode||btysconfigType.split(" ")[0]==SelectBtyCode.FingerSealNode)
            {
                $("#scrollBytParam").show();
                $("#scrollBytNyParam").show();
                $("#palmBytParam").hide();
                $("#palmBytNyParam").hide();
                $("#rightNy1").show();
                $("#rightNy2").hide();
                $("#right2").hide();
                $("#right1").show();
                $("#priorityShow").hide();
                $("#right3").hide();
                $("#select").show();
                $("#selectNy").show();
                $("#btyType").val(1);//特征为1指纹
                //btyval = 1;
            }
            //掌纹
            else if(btysconfigType.split(" ")[0]==SelectBtyCode.PalmPrintParamNode||btysconfigType.split(" ")[0]==SelectBtyCode.PalmPrintHSNode||btysconfigType.split(" ")[0]==SelectBtyCode.PalmPrintSealNode){
                $("#palmBytParam").show();
                $("#scrollBytParam").hide();
                $("#scrollBytNyParam").hide();
                $("#palmBytNyParam").show();
                $("#rightNy1").show();
                $("#right3").hide();
                $("#right2").hide();
                $("#right1").show();
                $("#priorityShow").hide();
                $("#select").show();
                $("#selectNy").show();
                $("#btyType").val(2);//特征为2掌纹
                //btyval = 2;
            }
            //压缩
            else if(btysconfigType==SelectBtyCode.FingerCompressNode){
                $("#rightNy2").hide();
                $("#rightNy1").hide();
                $("#right3").show();
                $("#select3").show();
                $("#palmBytComParam").hide();
                $("#scrollBytComParam").show();
                $("#btyType").val(1);//特征为1指纹
            }
            else if(btysconfigType==SelectBtyCode.PalmPrintCompressNode){
                $("#rightNy2").hide();
                $("#rightNy1").hide();
                $("#right3").show();
                $("#select3").show();
                $("#palmBytComParam").show();
                $("#scrollBytComParam").hide();
                $("#btyType").val(2);
            }
            //其他
            else if(btysconfigType==SelectBtyCode.OtherNode){
                $("#priorityShow").show();
                $("#scrollBytParam").hide();
                $("#palmBytParam").hide();
                $("#right1").hide();
                $("#rightNy1").hide();
                $("#right2").show();
                $("#rightNy2").show();
                $("#select").hide();
                $("#selectNy").hide();
            }
        }
    }