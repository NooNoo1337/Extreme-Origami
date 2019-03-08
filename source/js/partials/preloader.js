'use strict';

(function () {
  document.body.onload = function() {

    setTimeout(function () {
      var preloader = document.querySelector('.preloader');

      if ( !preloader.classList.contains('page-loaded') ) {
        preloader.classList.add('page-loaded');
      }
    }, 1000);
  };
})();