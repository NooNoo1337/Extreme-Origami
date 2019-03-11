'use strict';

(function () {
  const header = document.querySelector('.header');
  const dropNavItem = document.querySelectorAll('.header__nav-item--drop');
  const dropList = document.querySelector('.drop-block');
  const arrowIcon = document.querySelector('.header__arrow-icon');


  dropNavItem.forEach(dropItem => {
    dropItem.addEventListener('mouseover', evt => {
      dropItem.querySelector('.drop-block').classList.add('visible');
      dropItem.querySelector('.header__arrow-icon').classList.add('reversed');
      // dropList.classList.add('visible');
      // arrowIcon.classList.add('reversed');
    });
  });

  dropNavItem.forEach(dropItem => {
    dropItem.addEventListener('mouseout', evt => {
      // dropList.classList.remove('visible');
      // arrowIcon.classList.remove('reversed');

      dropItem.querySelector('.drop-block').classList.remove('visible');
      dropItem.querySelector('.header__arrow-icon').classList.remove('reversed');
    });
  })
})();