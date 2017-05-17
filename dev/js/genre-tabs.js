$(document).ready(function() {

    var $genreTabsTitle = $('.js-genre-tab-title');
    var $genreTabsTitleText = $genreTabsTitle.find('.js-genre-tab-title-text');
    var $genreTabsList = $('.js-genre-tabs-list');
    var $genreTabsListItem = $genreTabsList.find('.js-genre-tabs-list-item');
    var $genreTabsLink = $genreTabsList.find('.js-genre-tab-link');

    var active_class = 'active';

    $genreTabsTitle.on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        var $this = $(this);
        var $parent = $this.parent();
        var $dropdown = $parent.find( '.js-genre-tabs-list' );

        if ( $dropdown && $dropdown.hasClass(active_class)) { return }

        toggleGenreListClass();

        $( document ).on( "click", closeGenreList );

        return;
    });


    $genreTabsLink.on('click', function(e){
        var $this = $(this);
        var $parent = $this.parent();

        $genreTabsListItem.map(function(index, item){
            var $item = $(item);
            if ($item.hasClass(active_class)) {
                $item.removeClass(active_class);
            }
        });

        $genreTabsTitleText.text($this.text());
        $parent.addClass(active_class);
    });


    function toggleGenreListClass(){
        $genreTabsList.toggleClass(active_class);
    }

    function closeGenreList(e) {
        var $genreTabsDropdown = $(e.currentTarget).find('.js-genre-tabs-list');

        if (!$genreTabsDropdown) return;

        if ($genreTabsDropdown.hasClass(active_class)) {
            $genreTabsDropdown.removeClass(active_class);
        }

        $( document ).off( "click", closeGenreList );

        return;
    }

});
