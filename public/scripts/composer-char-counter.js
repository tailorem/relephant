$(document).ready(function() {
  // 'input' eliminates counter lag from 'keyup'
  $('section.new-tweet textarea').on('input', function(event) {
    var count = 140 - this.value.length;
    // $variable distinguishes jQuery objects from other variables
    var $counter = $(this).siblings('.counter');

    if (count >= 0) {
      $counter.text(count).removeClass('neg-count');
    } else {
      $counter.text(count).addClass('neg-count');
    }
  });
});