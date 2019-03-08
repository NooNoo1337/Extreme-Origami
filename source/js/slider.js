'use strict';

(() => {
  const slider = document.querySelector('.slider');
  const sliderScene = document.querySelector('.slider__scene');
  const sliderData = [
    {
      id: 1,
      name: 'Andrius Vaitkus',
      about: 'Experimental Physics student, UCL.',
      responsibilities: [
        'Research of application of origami in Mathematics and Engineering',
        'Development of the "Angle Trisection" simulation',
        'Participation in the initial folding tests',
        'Report formatting',
        'Minute taking in most meetings'
      ]
    },

    {
      id: 2,
      name: 'Aishvarya Raj',
      about: 'Theoretical Physics Student , UCL.',
      responsibilities: [
        'Main editor of the report',
        'Research on Architecture and Computer Science',
        'Development of “Doubling the Cube” simulation ',
        'Participation in later folding tests',
      ]
    },

    {
      id: 3,
      name: 'Gurprit Kaur',
      about: 'Experimental Physics Student, UCL.',
      responsibilities: [
        'Research of application of origami in cosmology',
        'Part of research subgroup',
        'Participation in folding tests for light-dependent self-folding',
        'Co-editor of Project Report',
      ]
    },

    {
      id: 4,
      name: 'Jennifer Jung',
      about: 'Experimental Physics Student, UCL.',
      responsibilities: [
        'Communications Officer',
        'Research on science of folding in Genetics, DNA and Light Dependent Folding',
        'Part of research subgroup',
        'Participation in light dependent folding tests',
      ]
    },

    {
      id: 5,
      name: 'Daniel Sanz',
      about: 'Affiliate Physics Student at UCL, from Spain.',
      responsibilities: [
        'Research on Mathematics',
        'Understanding the Mathematica folding code',
        'Proving the math code formula',
        'Development of "Folding the Cube" and "Biggest Equilateral Triangle in a Square" simulations',
        'Participation in folding tests'
      ]
    },

    {
      id: 6,
      name: 'Haokai Jin',
      about: 'Experimental Physics Student, UCL.',
      responsibilities: [
        'Research on Engineering, genetics, DNA and Self Folding Cube',
        'Part of research subgroup',
        'Participation in Heat self folding cube and light dependent folding test',
      ]
    },

    {
      id: 7,
      name: 'Qingyue Hu',
      about: 'Experimental Physics Student, UCL.',
      responsibilities: [
        'Part of research subgroup',
        'Research on Biological and Medical Science applications of origami',
        'Participation in heat dependent self-folding',
        'Understanding equations of self-folding'
      ]
    },

    {
      id: 8,
      name: 'Kourosh Khodabakhsh',
      about: 'Experimental Physics Student, UCL.',
      responsibilities: [
        'Research into applications of origami in Cosmology, Engineering, Genetics and Self Folding Cube',
        'Participation in self folding test',
        'Material gathering for self folding tests and organising lab space',
        'Chairman (for the most part)',
        'Dealing with Andrius'
      ]
    },
  ];


  renderTabs(sliderData);
  changeSlide(document.querySelector('.slider__nav-button'));

  function renderTabs(collection) {
    const tabContainer = document.querySelector('.slider__nav');
    const secondTabContainer = document.querySelector('.slider__nav--second');
    let personsCounter = 1;

    tabContainer.innerHTML = '';
    secondTabContainer.innerHTML = '';

    for(const person of collection) {
      const listItem = document.createElement('li');
      const button = document.createElement('button');

      button.classList.add('slider__nav-button');
      button.setAttribute('type', 'button');

      button.innerHTML += `<span class="slider__counter">0${personsCounter}.</span> ${person.name}`;
      button.setAttribute('data-id', person.id);
      button.setAttribute('data-name', person.name);
      button.setAttribute('data-about', person.about);

      listItem.appendChild(button);

      if(personsCounter <= 4) {
        tabContainer.appendChild(listItem);
      } else {
        secondTabContainer.appendChild(listItem);
      }

      personsCounter++;
    }
  }

  function changeSlide(button) {
    const personName = button.getAttribute('data-name');
    const personAbout = button.getAttribute('data-about');
    const personID = button.getAttribute('data-id');

    if(+personID !== +sliderScene.getAttribute('data-slide-id')) {
      sliderScene.setAttribute('data-slide-id', personID);
      sliderScene.querySelector('.slider__title--name').innerText = personName;
      sliderScene.querySelector('.slider__person-about').innerText = personAbout;

      if(sliderScene.classList.contains('change-slide')) {
        sliderScene.classList.remove('change-slide');
        void sliderScene.offsetWidth;
        sliderScene.classList.add('change-slide');
      } else {
        sliderScene.classList.add('change-slide');
      }


      createList(button);
    }
  }

  function createList(button) {
    const respBlock = slider.querySelector('.slider__block--responsibilities');
    const respList = respBlock.querySelector('.list');
    const personResponsibilities = getResponsibilities(button, sliderData);

    respList.innerHTML = '';

    for(const listItem of personResponsibilities) {
      const listElement = document.createElement('li');

      listElement.classList.add('list__item');
      listElement.innerHTML += `<svg class="list__marker" width="15" height="15"><use xlink:href="img/svg/sprite.svg#right-arrow"></use></svg> ${listItem}`;

      respList.appendChild(listElement);
    }
  }

  function getResponsibilities(button, collection) {
    const personID = +button.getAttribute('data-id');
    let personResponsibilities;

    for(const person of collection) {
      if(person.id === personID) {
        personResponsibilities = person.responsibilities;
      }
    }

    return personResponsibilities;
  }

  slider.addEventListener('click', evt => {
    if(evt.target.classList.contains('slider__nav-button')) {
      changeSlide(evt.target);
    }
  });

})();