$(document).ready(function(){
    var open_class = 'open';

    var $mobilePrimaryNavMenu = $('.js-mobile-primary-nav-menu');
    var $primaryNavMenu = $('.js-primary-nav-menu-module');
    var $hamburgerButton = $('.js-hamburger-button');

    $hamburgerButton.on('click', function(){
        var $this = $(this);

        $this.toggleClass(open_class);
        $primaryNavMenu.toggleClass(open_class);
    });


});
