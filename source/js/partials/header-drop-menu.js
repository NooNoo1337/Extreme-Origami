'use strict';

(function () {
  var header = document.querySelector('.header');
  var dropNavItem = document.querySelector('.header__nav-item--drop');
  var dropList = document.querySelector('.drop-block');
  var arrowIcon = document.querySelector('.header__arrow-icon');

  dropNavItem.addEventListener('mouseover', evt => {
    dropList.classList.add('visible');
    arrowIcon.classList.add('reversed');
  });

  dropNavItem.addEventListener('mouseout', evt => {
    dropList.classList.remove('visible');
    arrowIcon.classList.remove('reversed');
  });
})();