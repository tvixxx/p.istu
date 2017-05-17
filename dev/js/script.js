//
// (function(window) {
//
//     let html = $('html');
//     let htmlHeight = html.height();
//
//     // html.css({'height': htmlHeight + 'px'});
//
//     // $('.js-primary-content-scroll').mCustomScrollbar();
//     // $('.js-secondary-content-scroll').mCustomScrollbar();
//
//     // $('.js-primary-content-scroll').scrollbar();
//
//
//     // (function($){
//     //     $(window).on("load",function() {
//     //         $('.primary-content__body').mCustomScrollbar({
//     //             theme: "light",
//     //         });
//     //     });
//     // })(jQuery);
// })(window);
//
// $(document).ready(function(){
//     // $('.articles-module').perfectScrollbar();
//     // $('.articles-module__list').mCustomScrollbar();
// });

$(document).ready(function(){

    // var html = $('html');
    //
    // var htmlHeight = html.height();
    // var navMenuHeight = $('.secondary-nav-menu').height();
    // var htmlHeightForWrapperFromContainer = htmlHeight;
    //
    // var $primaryContentContainer = $('#content1');
    // var $content = $primaryContentContainer.find('.primary-content__content');
    //
    // $('.list-content__section--row').height($('.list-content__section--row').height() - 300);
    //
    // // var $parent = $primaryContent.parent();
    // // var parentHeight = $parent.height();
    //
    // var primaryContentHeight = $primaryContentContainer.height(htmlHeightForWrapperFromContainer);
    //
    // $primaryContentContainer.perfectScrollbar();
    // $('.primary-content__body').perfectScrollbar();
    // $('.js-secondary-content-scroll').perfectScrollbar();
    // $('.js-primary-content-scroll').mCustomScrollbar();

    // $('.js-primary-content-scroll').nicescroll();

    $(window).on("load",function(){

        function debounce(func, wait, immediate) {
            var timeout;
            return function() {
                var context = this, args = arguments;
                var later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };
        }

        var $primaryContentScroll = $('.js-primary-content-scroll');
        $primaryContentScroll.height($('html').innerHeight() - 100);
        $primaryContentScroll.mCustomScrollbar({ advanced:{updateOnContentResize:true} });

        var $secondaryContentScroll =  $('.js-secondary-content-scroll');
        $secondaryContentScroll.height($('html').height() - 100);
        $secondaryContentScroll.mCustomScrollbar({ advanced:{updateOnContentResize:true} });


        $(window).on('resize', debounce(function () {
            $(window).height($('html').height());

            $primaryContentScroll.height($('html').height() - 100);
            $secondaryContentScroll.height($('html').height() - 100);


            $primaryContentScroll.mCustomScrollbar('update');
            $secondaryContentScroll.mCustomScrollbar('update');
        }, 200));
    });
});

