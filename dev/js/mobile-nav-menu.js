$(document).ready(function(){
    var open_class = 'open';

    var $mobilePrimaryNavMenu = $('.js-mobile-primary-nav-menu');
    var $hamburgerButton = $('.js-hamburger-button');

    $hamburgerButton.on('click', function(){
        var $this = $(this);

        $this.toggleClass(open_class);
    });
});
