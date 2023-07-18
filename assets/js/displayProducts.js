jQuery(document).ready(function ($) {
  $('#toggle_contents').on('click', '.toggle_items', function (e) {
    e.preventDefault();

    if ($(this).hasClass('active_element')) {
      return;
    } else {
      $('.toggle_items').removeClass('active_element');
      $(this).addClass('active_element');

      let category = $(this).attr('data-value');
      let container = document.getElementsByClassName('.product-carousel');

      if (category == 'all' && `${container}:empty`) {
        $('.carousel_container').fadeIn('slow').show();
      } else {
        $('.carousel_container').fadeOut('slow').hide();
        $('.carousel_container.' + category)
          .fadeIn('slow')
          .show();
      }
    }
  });
});
