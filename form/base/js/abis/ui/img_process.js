
//控件变量
var $brightNess 	= null;
var $ridgeWidth		= null;
var $ridgeStrength 	= null;
var $ridgeDir 		= null;
var $contrast 		= null;
var $redColor 		= null;
var $greenColor 	= null;
var $blueColor 		= null;
var curToolId		= null;
var	imgToolIds		= new Array();

var ImgProParam = 
{
		BrightnessDefault 	: 128,
		ContrastDefault 	: 128,
		RidgeWidth			: 10,
		RidgeStrength		: 128,
		RidgeDir			: 0
		
}

//图像工具ID
var ImgToolId =
{
    Origintal 			: "Origintal",
    BC					: "BC",
    Equalization 		: "Equalization",
    Sharp 				: "Sharp",
    Histogram			: "Histogram",
    G1					: "G1",
	G2					: "G2",
    Invert 				: "Invert",
    ImageColor			: "ImageColor"
}

$(document).ready(function()
{
	/*亮度对比度滑块*/
    $brightNess 	= new Slider("Brightness", 0, 255, ImgProParam.BrightnessDefault, moveToSlider);
    $contrast 		= new Slider("Contrast", 0, 255, ImgProParam.ContrastDefault, moveToSlider);
    
    $ridgeWidth 	= new Slider("RidgeWidth", 4, 16, ImgProParam.RidgeWidth, moveToSlider);
    $ridgeStrength 	= new Slider("RidgeStrength", 0, 255, ImgProParam.RidgeStrength, moveToSlider);
    $ridgeDir 		= new Slider("RidgeDir", 0, 179, ImgProParam.RidgeDir, moveToSlider);
    
    //颜色滑块
    $redColor	= new Slider("RedColor", 0, 255, 255, moveToSlider);
    $greenColor = new Slider("GreenColor", 0, 255, 255, moveToSlider);
    $blueColor 	= new Slider("BlueColor", 0, 255, 255, moveToSlider);

    /*禁止文本选中,影响界面操作*/
//    $("#ImgProcess").bind("selectstart", function()
//    {
//	    return false;
//    });
    
    // 初始化工具
    imgToolIds.push(ImgToolId.Origintal);
    imgToolIds.push(ImgToolId.Equalization);
    imgToolIds.push(ImgToolId.Sharp);
    imgToolIds.push(ImgToolId.Histogram);
    imgToolIds.push(ImgToolId.G1);
    imgToolIds.push(ImgToolId.G2);
    imgToolIds.push(ImgToolId.Invert);
    
    // 注册工具事件
    for(var key in imgToolIds)
    {
    	registerButton(imgToolIds[key], imgProcessBnt);
    }
    
    switchTool(ImgToolId.Origintal);
    
    var initData 	= {BaseTool_Li:"BaseTool",ColorTool_Li:"ColorTool"};
    var setting		= {onClick:switchTab};
	var tab = new WebTab(initData,setting);
	updateSliderLocation();
	function switchTab(id)
	{
		updateSliderLocation(); 
	}
});


function switchTool(toolId)
{
	curToolId = toolId;

	for(var key in imgToolIds)
	{
		var id = imgToolIds[key];
		var bnt = $("#" + id);
		if(id == ImgToolId.Invert) 
		{
			if(toolId != ImgToolId.Origintal)continue;
		}
		if(id != toolId)
		{
			bnt.removeClass("BntDown");
			bnt.removeClass("BntHover");
			bnt.attr("check","false");
		}
		else
		{
			if(toolId != ImgToolId.Origintal)
			{
				bnt.removeClass("BntHover");
				bnt.addClass("BntDown");
				bnt.attr("check","true");
			}
		}
	}
	
	switch(toolId)
	{
		case ImgToolId.Origintal:
		case ImgToolId.Equalization:
		case ImgToolId.Sharp:
		case ImgToolId.Histogram:
			$brightNess.setValue(ImgProParam.BrightnessDefault);
			$contrast.setValue(ImgProParam.ContrastDefault);
			$("#Brightness_Row").show();
			$("#Contrast_Row").show();
			$("#RidgeWidth_Row").hide();
			$("#RidgeStrength_Row").hide();
			$("#RidgeDir_Row").hide();
			break;
		case ImgToolId.G1:
			$ridgeWidth.setValue(ImgProParam.RidgeWidth);
			$ridgeStrength.setValue(ImgProParam.RidgeStrength);
			$("#Brightness_Row").hide();
			$("#Contrast_Row").hide();
			$("#RidgeWidth_Row").show();
			$("#RidgeStrength_Row").show();
			$("#RidgeDir_Row").hide();
			break;
		case ImgToolId.G2:
			$ridgeWidth.setValue(ImgProParam.RidgeWidth);
			$ridgeStrength.setValue(ImgProParam.RidgeStrength);
			$ridgeDir.setValue(ImgProParam.RidgeDir);
			$("#Brightness_Row").hide();
			$("#Contrast_Row").hide();
			$("#RidgeWidth_Row").show();
			$("#RidgeStrength_Row").show();
			$("#RidgeDir_Row").show();
			break;
		case ImgToolId.Invert:
			break;
	}
	
	updateSliderLocation();
	
}

/**注册图像处理按钮事件
 */
function registerButton(bntId, invoke)
{
	var $bnt = $("#" + bntId);

	var $txt = $bnt.find("div:eq(1)");
	$txt.bind("selectstart", function()
	{
		return false
	});

	$bnt.mouseover(function()
	{
		var id = $(this).attr("id");
		if(id != ImgToolId.Origintal)
		{
			var down = $(this).attr("check")
			if(down == "true")return;
		}
		$(this).addClass("BntHover");
	});

	$bnt.mouseout(function()
	{
		var id = $(this).attr("id");
		if(id != ImgToolId.Origintal)
		{
			var down = $(this).attr("check")
			if(down == "true")return;
		}
		//$(this).attr("class", "Bnt");
		$(this).removeClass("BntHover");
	});

	$bnt.mousedown(function()
	{
		var id = $(this).attr("id");
		if(id != ImgToolId.Origintal)
		{
			var down = $(this).attr("check")
			if(down == "true")return;
		}
		
		$(this).removeClass("BntHover");
		$(this).addClass("BntDown");
	});

	$bnt.mouseup(function()
	{
		var id = $(this).attr("id");
		switch(id )
		{
			case ImgToolId.Origintal:
				$(this).addClass("BntHover");
				switchTool(id);
				break;
			case ImgToolId.Invert:
				var down = $(this).attr("check");
				if(down == "true")
				{
					$(this).attr("check","false")
					$(this).addClass("BntHover");
					$(this).removeClass("BntDown");
				}
				else
				{
					$(this).attr("check","true");
					$(this).removeClass("BntHover");
					$(this).addClass("BntDown");
				}
				break;
			default:
				var down = $(this).attr("check")
				if(down == "true")return;
				switchTool(id);
				break;
		}
		
	    if (invoke != null)
	    {
	    	invoke(bntId);
	    }
    });
}


/**
 * 图像处理工具处理函数
 */
function imgProcessBnt(id)
{
	curToolId = id;
	
	try
	{
		var bv = $brightNess.getValue();
		var cv = $contrast.getValue();
		
		switch (id)
		{
			case ImgToolId.Origintal:
			case ImgToolId.Equalization:
			case ImgToolId.Sharp:
			case ImgToolId.Histogram:
				$brightNess.setValue(ImgProParam.BrightnessDefault);
				$contrast.setValue(ImgProParam.ContrastDefault);
				imageProcess(id,{b:bv,c:cv});
				break;
			case ImgToolId.G1:
				imageProcess(id,{b:bv,c:cv});
				break;
			case ImgToolId.G2:
				imageProcess(id,{b:bv,c:cv});
				break;
			case ImgToolId.Invert:
				imageProcess(id);
				break;
		}
	}
	catch(e)
	{
		alert(e);
	}
}

function imageProcess(id,param)
{
	var jsonStr = JSON.stringify(param);
	if(imgOcx == null)return;
	switch(id)
	{
		
		case ImgToolId.Origintal:
			imgOcx.HS_OCX_ApplyImageEnhance(OCX.ImageProcessParam.UTIL_IMGENHANCE_ORIGINAL, "", 0);
			break;
		case ImgToolId.BC:
			imgOcx.HS_OCX_ApplyImageEnhance(OCX.ImageProcessParam.UTIL_IMGENHANCE_ADJUSTBC, jsonStr, 0);
			break;
		case ImgToolId.Equalization:
			imgOcx.HS_OCX_ApplyImageEnhance(OCX.ImageProcessParam.UTIL_IMGENHANCE_EQUAL, jsonStr, 0);
			break;
		case ImgToolId.Sharp:
			imgOcx.HS_OCX_ApplyImageEnhance(OCX.ImageProcessParam.UTIL_IMGENHANCE_SHARP, jsonStr, 0);
			break;
		case ImgToolId.Histogram:
			imgOcx.HS_OCX_ApplyImageEnhance(OCX.ImageProcessParam.UTIL_IMGENHANCE_HIST, jsonStr, 0);
			break;
		case ImgToolId.G1:
			imgOcx.HS_OCX_ApplyImageEnhance(OCX.ImageProcessParam.UTIL_IMGENHANCE_GABOR1, jsonStr, 0);
			break;
		case ImgToolId.G2:
			imgOcx.HS_OCX_ApplyImageEnhance(OCX.ImageProcessParam.UTIL_IMGENHANCE_GABOR2, jsonStr, 0);
			break;
		case ImgToolId.Invert:
			imgOcx.HS_OCX_ApplyImageEnhance(OCX.ImageProcessParam.UTIL_IMGENHANCE_REVERSE, "", 0);
			break;
		case ImgToolId.ImageColor:
			imgOcx.HS_OCX_ApplyImageEnhance(OCX.ImageProcessParam.UTIL_IMGENHANCE_COLOR, jsonStr, 0);
			break;
	}
}

function hiddenSlider()
{
	$brightNess.hide();
	$contrast.hide();
	$ridgeWidth.hide();
	$ridgeStrength.hide();
	$ridgeDir.hide();
	$redColor.hide();
	$greenColor.hide();
	$blueColor.hide();
}

function showSlider()
{
	if(curToolId == null)return;
	
	switch(curToolId)
	{
		case ImgToolId.Origintal:		
		case ImgToolId.Equalization:	
		case ImgToolId.Sharp:			
		case ImgToolId.Histogram:		
		case ImgToolId.Invert:
			$brightNess.show();
			$contrast.show();
			$ridgeWidth.hide();
			$ridgeStrength.hide();
			$ridgeDir.hide();
			break;
		case ImgToolId.G1:
			$brightNess.hide();
			$contrast.hide();
			$ridgeDir.hide();
			$ridgeWidth.show();
			$ridgeStrength.show();
			break;
		case ImgToolId.G2:
			$brightNess.hide();
			$contrast.hide();
			$ridgeDir.show();
			$ridgeWidth.show();
			$ridgeStrength.show();
			break;
	}
	
	$redColor.show();
	$greenColor.show();
	$blueColor.show();
	
}

/**
 * 更新每个滑块的位置
 */
function updateSliderLocation()
{
	showSlider();
	$brightNess.updateLocation();
	$contrast.updateLocation();
	$ridgeWidth.updateLocation();
	$ridgeStrength.updateLocation();
	$ridgeDir.updateLocation();
	$redColor.updateLocation();
	$greenColor.updateLocation();
	$blueColor.updateLocation();
}


/**
 * 滑块移动处理函数
 */
function moveToSlider(id, value)
{
	try
	{
		switch (id)
		{
			case "Brightness":
			case "Contrast":
				var brithNess = $brightNess.getValue();
				var contrast = $contrast.getValue();
				var curId  = curToolId;
				if(curId == ImgToolId.Origintal)
				{
					curId = ImgToolId.BC;
				}
				imageProcess(curId,{b:brithNess,c:contrast});
				break;
			case "RidgeWidth":
			case "RidgeStrength":
				var w = $ridgeWidth.getValue();
				var s = $ridgeStrength.getValue();
				imageProcess(curToolId,{width:w,Gabor:s});
				break;
			case "RidgeDir":
				var w = $ridgeWidth.getValue();
				var s = $ridgeStrength.getValue();
				var d = $ridgeDir.getValue();
				imageProcess(curToolId,{width:w,Gabor:s,dir:d});
				break;
			case "RedColor":
			case "GreenColor":
			case "BlueColor":
				var red = $redColor.getValue();
				var green = $greenColor.getValue();
				var blue = $blueColor.getValue();
				imageProcess(ImgToolId.ImageColor,{r:red,g:green,b:blue});
				break;
		}
	}
	catch(e)
	{
		alert(e);
	}
}

