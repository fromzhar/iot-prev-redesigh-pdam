(function(){
    // Auto-shift header dropdowns left if they overflow the right edge
    $(document).on('shown.bs.dropdown', '.pcoded-header .dropdown', function(){
        try{
            var $menu = $(this).find('.dropdown-menu').first();
            if(!$menu.length) return;
            if($menu.data('orig-transform') === undefined){
                $menu.data('orig-transform', $menu.css('transform'));
            }
            var rect = $menu[0].getBoundingClientRect();
            var overflow = rect.right - window.innerWidth;
            if(overflow > 0){
                var shift = overflow + 12; // breathing room
                $menu.css('transform', 'translateX(' + (-shift) + 'px)');
                $menu.attr('data-shifted', shift);
            }
        }catch(e){/* silent */}
    });

    $(document).on('hidden.bs.dropdown', '.pcoded-header .dropdown', function(){
        try{
            var $menu = $(this).find('.dropdown-menu').first();
            if(!$menu.length) return;
            var orig = $menu.data('orig-transform');
            if(orig !== undefined){
                $menu.css('transform', orig);
                $menu.removeData('orig-transform');
                $menu.removeAttr('data-shifted');
            } else {
                $menu.css('transform', '');
            }
        }catch(e){/* silent */}
    });
})();
