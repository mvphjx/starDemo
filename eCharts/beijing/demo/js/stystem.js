$(function(){
		var _index = 0;
		var timeout = null;
		$('.time span').click(function(){
			clearInterval(timeout)
			 _index = $(this).index();
			$(this).addClass('active').siblings().removeClass('active');
			if(_index>=2){
				_index = -1;
			};
			slider()
		})
		//图片轮播滚动
		slider();
		function slider(){
			timeout = setInterval(function(){ 
				_index++;
				$('.time span').eq(_index).addClass('active').siblings().removeClass('active');
				if(_index>=2){
					_index =-1
				}
			}, 3000);
		}
	})