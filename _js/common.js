// ====================================================================
// Common - js
// 
// Scripts for the entire app
// ====================================================================

(function() {

  // ============================================
  // Document ready
  // ============================================
  $(function() {

    // Highlight the active route
    activeNavLink();

  });// end document ready

  // ============================================
  // Window on load - hide page loader animation
  // ============================================
  $(window).on('load', function(){
    setTimeout(function() {
      $( ".page-loader-cover" ).fadeOut(500, function() {
        $( ".page-loader-cover" ).remove();
      });  
    }, 2000);
  });

  // ============================================
  // Use body ID to match to active nav link
  // ============================================
  function activeNavLink() {
    var bodyClass = $('body').attr("id");
    
    $( "nav .menu li" ).each(function() {
      if ($(this).attr('data-page') === bodyClass) {
        $(this).addClass('active');
      }
    });
  }

})();