$(document).ready(function() {
	
	$('.right-content .tabslide li').click(function(event) {
			var num=$(this).index();
			$(this).addClass('current').siblings('li').removeClass('current');
			$('.right-content .tab-content').eq(num).removeClass('hide');
			$('.right-content .tab-content').eq(num).siblings('.tab-content').addClass('hide');
			
			$('.right-content .nay .tab-content').eq(num).removeClass('hide');
			$('.right-content .nay .tab-content').eq(num).siblings('.tab-content').addClass('hide');
	});	
});