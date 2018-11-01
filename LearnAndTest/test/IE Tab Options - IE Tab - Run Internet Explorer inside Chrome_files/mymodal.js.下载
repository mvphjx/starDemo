// A customized version of leanModal

(function($){

    $.fn.extend({

        leanModal: function(options) {

            var defaults = {
                top: 100,
                overlay: 0.5,
                closeButton: null
            }

            var overlay = $("<div id='lean_overlay'></div>");

            $("body").append(overlay);

            options =  $.extend(defaults, options);

            var o = options;

            var elModal = this[0];

            $("#lean_overlay").click(function() {
                close_modal(elModal);
            });

            $(o.closeButton).click(function() {
                close_modal(modal_id);
            });

            var modal_height = $(elModal).outerHeight();
            var modal_width = $(elModal).outerWidth();

            $('#lean_overlay').css({ 'display' : 'block', opacity : 0 });

            $('#lean_overlay').fadeTo(200,o.overlay);

            $(elModal).css({

                'display' : 'block',
                'position' : 'fixed',
                'opacity' : 0,
                'z-index': 11000,
                'left' : 50 + '%',
                'margin-left' : -(modal_width/2) + "px",
                'top' : o.top + "px"

            });

            $(elModal).fadeTo(200,1);

            function close_modal(elModal){

                $("#lean_overlay").fadeOut(200);

                $(elModal).css({ 'display' : 'none' });

            }

        }
    });

})(jQuery);