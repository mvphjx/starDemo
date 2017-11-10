var OCX =
{
		OcxType :
		{
			EDIT	: 0,
			TPSCAN 	: 1,
			LPSCAN 	: 2
		},
		OcxMouseMessage:
		{
			OCX_WM_MOUSEMOVE     : 1,
			OCX_WM_LBUTTONDOWN   : 2,
			OCX_WM_LBUTTONUP     : 3,
			OCX_WM_LBUTTONDBLCLK : 4,
			OCX_WM_RBUTTONDOWN   : 5,
			OCX_WM_RBUTTONUP     : 6,
			OCX_WM_RBUTTONDBLCLK : 7,
			OCX_WM_MBUTTONDOWN   : 8,
			OCX_WM_MBUTTONUP     : 9,
			OCX_WM_MBUTTONDBLCLK : 10,
			OCX_WM_MOUSEWHEEL    : 11
		},
		ImageProcessParam : 
		{
			UTIL_IMGENHANCE_NONE		: 0,		//!< 不使用图像增强
			UTIL_IMGENHANCE_ORIGINAL	: 1,		//!< 恢复回原始图像（包括亮度、对比度、颜色都复原），不需要其他额外参数
			UTIL_IMGENHANCE_COLOR		: 3,		//!< 调整图像颜色，{r:xxx,g:xxx,b:xxx}，这里xxx表示一个0-255的值
			UTIL_IMGENHANCE_REVERSE		: 4,		//!< 图像反像，不需要其他额外参数
			UTIL_IMGENHANCE_ADJUSTBC	: 5,		//!< 调整亮度、对比度，{b:xxx,c:xxx}
			UTIL_IMGENHANCE_EQUAL		: 6,		//!< 均衡化，{b:xxx,c:xxx,e:xxx}，这里b、c为亮度、对比度，e暂时先不提供
			UTIL_IMGENHANCE_HIST		: 7,		//!< 直方图拉伸，{b:xxx,c:xxx}

			/**
			 * GABOR1变换，允许在部分区域上人工描线辅助下进行图像增强
			 * {width:xxx,Gabor:xxx}
			 * width	纹线宽度，	4-16 (缺省值 10)设置为0时候使用缺省值
			 * Gabor	算法强度因子	0-255(缺省值 128)
			 */
			UTIL_IMGENHANCE_GABOR1		: 8,

			/**
			 * GABOR2变换，按照人工给定的纹线方向进行图像增强
			 * {width:xxx,Gabor:xxx,dir:xxx}
			 * width	纹线宽度，	4-16 (缺省值 100设置为0时候使用缺省值
			 * Gabor	算法强度因子	0-255(缺省值 128)
			 * dir		纹线方向,	0-179 (缺省值是0)
			 */
			UTIL_IMGENHANCE_GABOR2		: 9,
			
			UTIL_IMGENHANCE_SHARP		: 10
		},
		MouseButton:
		{
			BUTTON_LEFT		: 1,	//鼠标左键
			BUTTON_MIDDLE	: 2,	//鼠标中键
			BUTTON_RIGHT	: 3,	//鼠标右键
			BUTTON_WHEEL	: 4		//鼠标滚轮
		},
		MouseMode:
		{
			MOUSE_MODE_NONE 		: 0,	//没有对应的模式
			MOUSE_MODE_ZOOM 		: 1,	//缩放模式
			MOUSE_MODE_ROTATE 		: 2,	//旋转模式
			MOUSE_MODE_MOVE_IMAGE	: 3		//移动图像模式
		},
		Align:
		{
			CENTER	: 0,	//居中对齐
			LEFT	: 1,	//左对齐
			RIGHT	: 2,	//右对齐
			TOP		: 4,	//上对齐
			BOTTOM	: 5,	//下对齐
			HAND	: 9		//手动对齐
		},
		EditMode:
		{	
			EDIT	: 1,	//编辑模式
			CHECK	: 2,	//认定模式
			BORWSE	: 3		//浏览模式
		},
		ZoomMode:
		{
			VIEWPORT	: 0,	//适合窗口，图像的显示宽或者高都在窗口里面
			FIT_WIDTH	: 1,	//适合宽度，图像的宽度与窗口的宽度相同
			FIT_HEIGHT	: 2,	//适合高度，图像的高度与窗口的高度相同
			FILL_WINDOW	: 3,	//填满窗口，可能有图像显示不下
			ZOOM		: 4		//任意比例的缩放，但不能超过16倍
		},
		DataType:
		{
			SRC	: 0,	//源卡
			CAND: 1		//候选卡
		}
}