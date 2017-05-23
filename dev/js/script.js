$(document).ready(function(){

    $(window).on("load",function(){

        // vanilla JS
        var html = document.documentElement;
        var body = document.body;
        var minimalScrollOffsetFromTop = 5;

        var scrollTop = html.scrollTop || body && body.scrollTop || 0;
        scrollTop -= html.clientTop; // в IE7- <html> смещён относительно (0,0)

        if ( scrollTop >= minimalScrollOffsetFromTop) {
            scrollToZeroCoordinate();
        }

        // jQuery html
        var $html = $('.js-html');

        var sizesObject = {
            header: 70,
            mobileWidth: 991
        };

        var cssObj = {
            mobileCss: {
                'overflow': 'auto',
                'height': 'auto'
            },
            desktopCss: {
                'overflow': 'hidden'
            },
            activeStyles: {
                'visibility': 'visible',
                'opacity': '1'
            },
            heightValues: {
                oneHundredPercents: 100
            }
        };

        var defaultOptions = {
            scrollInertia: 0,
            live: 'on',
            mouseWheel: {
                scrollAmount: 80
            },
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

        $html
            .css(cssObj.activeStyles);

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
        var $secondaryContentScroll =  $('.js-secondary-content-scroll');
        var $primaryNavMenuScroll = $('.js-primary-nav-menu-container');
        var istuNavFooterSelector = '.js-nav-istu-footer';

        var $scrollBarsArray = [].concat(
            $primaryContentScroll.toArray(),
            $secondaryContentScroll.toArray(),
            $primaryNavMenuScroll.toArray()
        );

        initScrollBars($scrollBarsArray, defaultOptions);

        checkMobileAndUpdateCustomScrollbars();

        function initScrollBars($arrayScrolls, optionObj) {
            var result = [];

            return result = $arrayScrolls.map(function(item, index){

                if (!item) return;

                var $item = $(item);
                var $parent = $item.parent();
                var hasIstuFooterElem = Boolean($parent.find(istuNavFooterSelector).length);
                var $istuFooter = null;
                var istuFooterElemHeight = null;

                if (!hasIstuFooterElem) {
                    $item
                        .outerHeight($('html').outerHeight(true) - sizesObject.header)
                        .mCustomScrollbar(optionObj);

                    return;
                }

                $istuFooter = $parent.find(istuNavFooterSelector);

                istuFooterElemHeight = $istuFooter.outerHeight(true);

                $item
                    .outerHeight($('html').outerHeight(true) - istuFooterElemHeight)
                    .mCustomScrollbar(optionObj);
            });
        }

        $(window).on('resize', debounce(function () {

            initScrollBars($scrollBarsArray, defaultOptions);

            checkMobileAndUpdateCustomScrollbars();

        }, 200));

        function checkMobileAndUpdateCustomScrollbars() {
            var $mainPageContainer = $('.js-main-page');
            var $mainPrimaryContentContainer = $('#content1');
            var $mainSecondaryContentContainer = $('#content2');
            var $contentPrimaryBody = $('.js-primary-content-body');

            if ($(window).innerWidth() <= sizesObject.mobileWidth) {

                $html.css(cssObj.mobileCss);

                // disableCustomScrollBar($scrollBarsArray);
                // destroyCustomScrollbar($scrollBarsArray);

                $primaryContentScroll.mCustomScrollbar("destroy");
                $secondaryContentScroll.mCustomScrollbar("destroy");
                // $primaryNavMenuScroll.mCustomScrollbar("disable",true);

                // var $mainPageContainer = $('.js-main-page');
                // var $mainPrimaryContentContainer = $('#content1');
                // var $mainSecondaryContentContainer = $('#content2');
                // var $contentPrimaryBody = $('.js-primary-content-body');
                var resultHeader = null;
                var extraPadding = 1.5;

                // setTimeout(function(){
                //     disableCustomScrollBar($scrollBarsArray);
                // }, 200);

                $mainPrimaryContentContainer.outerHeight(  getHeightOfChildrenElem($contentPrimaryBody) );

                $mainSecondaryContentContainer.outerHeight( getHeightOfChildrenElem($mainSecondaryContentContainer));

                resultHeader = $mainPrimaryContentContainer.outerHeight(true) + $mainSecondaryContentContainer.outerHeight(true);

                $mainPageContainer.find(istuNavFooterSelector).height('auto');

                $primaryNavMenuScroll.css('height', cssObj.heightValues.oneHundredPercents + '%');

                $('html').outerHeight(resultHeader);

                resultHeader = 0;

            } else {

                $html.css(cssObj.desktopCss);

                scrollToZeroCoordinate();

                $mainPrimaryContentContainer.outerHeight(  $(window).height() - sizesObject.header );

                $mainSecondaryContentContainer.outerHeight( $(window).height() - sizesObject.header );

                $primaryNavMenuScroll.outerHeight($(window).height() - (sizesObject.header * 2));

                setTimeout(function(){
                    updateCustomScrollbar($scrollBarsArray);
                }, 200);

                // $('html').outerHeight();
            }
        }

        function scrollToZeroCoordinate(){
            window.scrollTo(0,0);
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

