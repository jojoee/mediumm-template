(function($) {
  WebFont.load({
    google: {
      families: ['Open Sans']
    }
  });

  // menu
  $mobileMenuBtn = $('.mobile-menu-btn');
  $mobileMenu = $mobileMenuBtn.next();

  $mobileMenuBtn.click(function() {
    $mobileMenu.toggleClass('active');
  });
})(jQuery);
