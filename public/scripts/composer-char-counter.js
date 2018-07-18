//jshint esversion: 6

$(document).ready(function() {
  // 'input' eliminates counter lag from 'keyup'
  $('section.new-tweet textarea').on('input', function(event) {
    let count = 140 - this.value.length;
    // $variable distinguishes jQuery objects from other variables
    let $counter = $(this).siblings('.counter');

    if (count >= 0) {
      $counter.text(count).removeClass('neg-count');
    } else {
      $counter.text(count).addClass('neg-count');
    }
  });
});