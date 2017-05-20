$(document).ready(function(){

    $(window).on("load",function(){
        var $html = $('.js-html');
        var hidden_html = 'hidden-html';
        var active_html = 'active-html';
        var activeCssStylesObj = {
            'visibility': 'visible',
            'opacity': '1'
        };
        var cssObj = {
            mobileCss: {
                'overflow': 'auto',
                'height': 'auto'
            },
            desktopCss: {
                'overflow': 'hidden'
            }

        };


        $html
            .css(activeCssStylesObj);

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

        var defaultOptions = {
            advanced:{
                updateOnContentResize: true,
                    autoUpdateTimeout: 200
            },
            callbacks:{
                onUpdate:function(){
                    // console.log("Scrollbars updated");
                }
            }
        };

        var $primaryContentScroll = $('.js-primary-content-scroll');
        var $secondaryContentScroll =  $('.js-secondary-content-scroll');
        var $primaryNavMenuScroll = $('.js-primary-nav-menu-container');
        var $istuNavFooter = $('.js-nav-istu-footer');

        var istuNavFooterSelector = '.js-nav-istu-footer';

        var $scrollBarsArray = [].concat($primaryContentScroll.toArray(), $secondaryContentScroll.toArray(), $primaryNavMenuScroll.toArray());

        initScrollBars($scrollBarsArray, defaultOptions);

        function initScrollBars($arrayScrolls, optionObj) {
            var result = [];
            var headerHeight = 70;

            return result = $arrayScrolls.map(function(item, index){

                if (!item) return;

                var $item = $(item);
                var $parent = $item.parent();
                var hasIstuFooterElem = Boolean($parent.find(istuNavFooterSelector).length);

                var istuFooterElemHeight = null;

                if (!hasIstuFooterElem) {
                    $item
                        .outerHeight($('html').outerHeight(true) - headerHeight)
                        .mCustomScrollbar(optionObj);

                    return;
                }

                var $istuFooter = $parent.find(istuNavFooterSelector);

                istuFooterElemHeight = $istuFooter.outerHeight(true);

                $item
                    .outerHeight($('html').outerHeight(true) - istuFooterElemHeight)
                    .mCustomScrollbar(optionObj);
            });
        }

        // function recalculateAndCheckDeviceWidth() {
        //     var $html = $('.js-html');
        //     var mobileWidth = 991;
        //
        //     if ($(window).innerWidth() <= mobileWidth) {
        //
        //         $html.css({
        //             'overflow': 'auto', 'height': 'auto'
        //         });
        //
        //         destroyCustomScrollbar();
        //
        //         var $mainPrimaryContentContainer = $('#content1');
        //         var $contentPrimaryBody = $('.js-primary-content-body');
        //
        //         var $mainSecondaryContentContainer = $('#content2');
        //
        //         $mainPrimaryContentContainer.outerHeight($contentPrimaryBody.outerHeight(true));
        //
        //         $mainSecondaryContentContainer.outerHeight($cardIstuTime.outerHeight(true) + $cardInfoNews.outerHeight(true) + $cardInfoMeetup.outerHeight(true));
        //
        //         $(window).height($('html').height());
        //     }
        // }
        //
        // recalculateAndCheckDeviceWidth();

        $(window).on('resize', debounce(function () {
            var $html = $('.js-html');
            var mobileWidth = 991;

            $(window).height($('html').height());

            if ($(window).innerWidth() <= mobileWidth) {

                initScrollBars($scrollBarsArray, defaultOptions);
                checkMobileAndUpdateCustomScrollbars();
            } else {

                $html.css(cssObj.desktopCss);

                reinitCustomScrollbar($scrollBarsArray);
                updateCustomScrollbar($scrollBarsArray);
                initScrollBars($scrollBarsArray, defaultOptions);

                // ($scrollBarsArray);
            }

        }, 200));

        checkMobileAndUpdateCustomScrollbars();

        function checkMobileAndUpdateCustomScrollbars() {
            $html.css(cssObj.mobileCss);

            destroyCustomScrollbar();
            disableCustomScrollBar();
            debugger;

            var $mainPrimaryContentContainer = $('#content1');
            var $mainSecondaryContentContainer = $('#content2');
            var $contentPrimaryBody = $('.js-primary-content-body');
            var headerHeight = 70;

            $mainPrimaryContentContainer.outerHeight(  getHeightOfChildrenElem($contentPrimaryBody) - headerHeight );

            $mainSecondaryContentContainer.outerHeight( getHeightOfChildrenElem($mainSecondaryContentContainer) - headerHeight );

            $(window).height($('html').height());
        }

        function getHeightOfChildrenElem($target) {

            if (!$target) return;

            var result = null; // final result
            var $childrenElemsContent = []; // temp array for children elements of parent elem

            $childrenElemsContent = $target.children().toArray(); // to.Array() because at the beginning children return HTML collection

            var $childrenArrSecondaryContent = $childrenElemsContent.map(function(item, index){
                var $item = $(item);

                return $item.outerHeight(true);
            });

            var $childrenHeight = $childrenArrSecondaryContent.reduce(function(sum, current){

                return sum + current;
            });

            result = $childrenHeight;

            return result;
        }

        function updateCustomScrollbar($arrayScrollbars) {

            var result = [];

            return result = $arrayScrollbars.map(function(item, index){

                if (!item) return;

                var $item = $(item);

                $item.mCustomScrollbar('update');
            });
        }

        function reinitCustomScrollbar($arrayScrollbars) {

            var result = [];

            return result = $arrayScrollbars.map(function(item, index){

                if (!item) return;

                var $item = $(item);

                $item.mCustomScrollbar();
            });
        }


        function destroyCustomScrollbar($arrayScrollbars) {

            var result = [];

            return result = $arrayScrollbars.map(function(item, index){

                if (!item) return;

                var $item = $(item);

                $item.mCustomScrollbar('destroy');
            });
        }

        function disableCustomScrollBar($arrayScrollbars) {

            var result = [];

            return result = $arrayScrollbars.map(function(item, index){

                if (!item) return;

                var $item = $(item);

                $item.mCustomScrollbar("disable",true);
            });
        }

        function setHeightOnContainersWithScrollbar($arrayScrollbars) {

            var result = [];

            return result = $arrayScrollbars.map(function(item, index){

                if (!item) return;

                var $item = $(item);

                $item.outerHeight($('html').outerHeight(true));
            });
        }
    });
});

