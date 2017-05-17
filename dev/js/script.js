$(document).ready(function(){

    $(window).on("load",function(){
        var $html = $('.js-html');
        var hidden_html = 'hidden-html';
        var active_html = 'active-html';

        $html
            .removeClass(hidden_html)
            .addClass(active_html);

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
        $primaryContentScroll.mCustomScrollbar({
            advanced:{
                updateOnContentResize: true,
                autoUpdateTimeout: 200
            },
            callbacks:{
                onUpdate:function(){
                    console.log("Scrollbars updated");
                }
            }
        });

        var $secondaryContentScroll =  $('.js-secondary-content-scroll');
        $secondaryContentScroll.height($('html').height() - 100);
        $secondaryContentScroll.mCustomScrollbar({
            advanced:{
                updateOnContentResize: true,
                autoUpdateTimeout: 200
            }
        });

        var $primaryNavMenuScroll = $('.js-primary-nav-menu-container');
        $primaryNavMenuScroll.height($('html').innerHeight() - 100);
        $primaryNavMenuScroll.mCustomScrollbar({
            advanced:{
                updateOnContentResize: true,
                autoUpdateTimeout: 200
            }
        });

        function recalculateAndCheckDeviceWidth() {
            if ($(window).innerWidth() <= mobileWidth) {

                $html.css('overflow', 'auto');
                disableCustomScrollBar();
                // setHeightComputedByContent();

                var $mainPrimaryContentContainer = $('#content1');
                var $contentPrimaryBody = $('.js-primary-content-body');

                var $mainSecondaryContentContainer = $('#content2');
                //TODO; use cycle for children in the container and calculate them height
                var $cardIstuTime = $('.js-istu-time');
                var $cardInfoNews = $('.js-card-info-news');
                var $cardInfoMeetup = $('.js-card-info-meetup');

                $mainPrimaryContentContainer.height($contentPrimaryBody.height());

                $mainSecondaryContentContainer.height( $cardIstuTime.height() + $cardInfoNews.height() + $cardInfoMeetup.height() );

                $(window).height($('html').height());
        }

        recalculateAndCheckDeviceWidth();

        $(window).on('resize', debounce(function () {
            var $html = $('.js-html');
            var mobileWidth = 768;

            $(window).height($('html').height());

            // setHeightOnContainersWithScrollbar();

            // updateCustomScrollbar();

            if ($(window).innerWidth() <= mobileWidth) {

                $html.css('overflow', 'auto');
                disableCustomScrollBar();
                // setHeightComputedByContent();

                var $mainPrimaryContentContainer = $('#content1');
                var $contentPrimaryBody = $('.js-primary-content-body');

                var $mainSecondaryContentContainer = $('#content2');
                //TODO; use cycle for children in the container and calculate them height
                var $cardIstuTime = $('.js-istu-time');
                var $cardInfoNews = $('.js-card-info-news');
                var $cardInfoMeetup = $('.js-card-info-meetup');

                $mainPrimaryContentContainer.height($contentPrimaryBody.height());

                $mainSecondaryContentContainer.height( $cardIstuTime.height() + $cardInfoNews.height() + $cardInfoMeetup.height() );

                $(window).height($('html').height());
                // destroyCustomScrollbar();
            } else {

                $html.css('overflow', 'hidden');
                // reinitCustomScrollbar();
                updateCustomScrollbar();
                setHeightOnContainersWithScrollbar();
            }

        }, 200));

        function updateCustomScrollbar() {
            $primaryContentScroll.mCustomScrollbar('update');
            $secondaryContentScroll.mCustomScrollbar('update');
            $primaryNavMenuScroll.mCustomScrollbar('update');
        }

        function reinitCustomScrollbar() {
            $primaryContentScroll.mCustomScrollbar();
            $secondaryContentScroll.mCustomScrollbar();
            $primaryNavMenuScroll.mCustomScrollbar();
        }


        function destroyCustomScrollbar() {
            $primaryContentScroll.mCustomScrollbar('destroy');
            $secondaryContentScroll.mCustomScrollbar('destroy');
            $primaryNavMenuScroll.mCustomScrollbar('destroy');
        }

        function disableCustomScrollBar() {
            $primaryContentScroll.mCustomScrollbar("disable",true);
            $secondaryContentScroll.mCustomScrollbar("disable",true);
            $primaryNavMenuScroll.mCustomScrollbar("disable",true);
        }

        function setHeightOnContainersWithScrollbar() {
            $primaryContentScroll.height($('html').height() - 100);
            $secondaryContentScroll.height($('html').height() - 100);
            $primaryNavMenuScroll.height($('html').height() - 100);
        }
    });
});

