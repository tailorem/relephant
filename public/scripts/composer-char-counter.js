$(document).ready(function() {
  $('section.new-tweet textarea').on('keyup', function(event) {
    let current = $(this).val().length;
    return 140 - current;
  });
});