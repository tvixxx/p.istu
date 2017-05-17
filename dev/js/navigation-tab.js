(function(window){

    (function(){

        var active_class = 'active';

        var $contactsAddress = $('.js-contacts');
        var $contactsContainer = $('.js-contacts-container');

        $contactsAddress.on('click', showAddress);

        function showAddress() {
            $contactsAddress.toggleClass(active_class);
            $contactsContainer.slideToggle();
        }
    })();

    (function(){

        var $mainListContainer = $('.js-addition-primary-list');
        var $itemOfListContainer = $('.js-addition-primary-list-item');
        var $itemOfListContainerSelector = '.js-addition-primary-list-item';

        var $mainNavLink = $('.js-main-nav-title');
        var innerListSelector = '.js-addition-inner-list';

        function checkInnerList(elem) {
            var $elem = $(elem);
            var $parent = $elem.parent();

            return Boolean($parent.find(innerListSelector).length);
        }


        $mainNavLink.on('click', function(e){

            //TODO
            var filteredLink = $itemOfListContainer
                .filter(function(item) {
                    var $item = $(item);

                    console.log($item);
                    if ($item.hasClass('active')) {
                        return true;
                    }
                });

            console.info(filteredLink);

            var $this = $(this);
            var $parent = $this.parent();
            var active_class = 'active';

            console.log(checkInnerList($this));
            if (!checkInnerList($this)) {
                return;
            }

            e.preventDefault();

            var $additionList = $this.next();

            $this.toggleClass(active_class);
            $parent.toggleClass(active_class);
            $additionList.slideToggle();
        });

        checkInnerList();


    })();

})(window);
