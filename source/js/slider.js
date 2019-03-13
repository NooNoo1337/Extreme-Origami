'use strict';

(() => {
  const slider = document.querySelector('.slider');
  const sliderScene = document.querySelector('.slider__scene');
  const sliderData = [
    {
      id: 1,
      name: 'Andrius Vaitkus',
      about: 'Experimental Physics student, UCL.',
      favouriteColor: '#B5DB40',
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
      favouriteColor: '#9B67B2',
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
      favouriteColor: '#1F6066',
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
      favouriteColor: '#F9C7D2',
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
      favouriteColor: '#cf090f',
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
      favouriteColor: '#1E90FF',
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
      favouriteColor: 'rgba(189, 195, 199, 1)',
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
      favouriteColor: '#6495ED',
      responsibilities: [
        'Research into applications of origami in Cosmology, Engineering, Genetics and Self Folding Cube',
        'Participation in self folding test',
        'Material gathering for self folding tests and organising lab space',
        'Chairman (for the most part)',
        'Dealing with Andrius'
      ]
    },
  ];

  const timelineContainer = document.getElementById('timeline');

  function getInitials(fullName) {
    return fullName.split(' ').map((n) => n[0]).join('');
  }

  function createPersonBlock(person) {
    const block = document.createElement('div');
    const blockHeader = document.createElement('div');
    const blockTitle = document.createElement('p');
    const blockContent = document.createElement('div');
    const personAbout = document.createElement('p');
    const responsibilitiesList = document.createElement('ul');
    const personInitials = document.createElement('div');
    const contentWrapper = document.createElement('div');
    const listPointIcon = `<svg class="list__marker" width="15" height="15"><use xlink:href="img/svg/sprite.svg#right-arrow"></use></svg>`;

    block.classList.add('timeline__content');
    contentWrapper.classList.add('timeline__person-block');
    blockHeader.classList.add('timeline__header');

    if(person.favouriteColor === undefined) {
      person.favouriteColor = '#2797EB';
    }

    contentWrapper.style.setProperty('--theme-color', person.favouriteColor);

    blockTitle.classList.add('title', 'title--h4');
    blockContent.classList.add('timeline__person-content');
    personInitials.classList.add('timeline__initials');
    responsibilitiesList.classList.add('list', 'list--vertical', 'timeline__list');


    personInitials.innerText = getInitials(person.name);
    blockTitle.innerText = person.name;
    personAbout.innerText = person.about;

    blockHeader.style.backgroundColor = person.favouriteColor;
    personInitials.style.backgroundColor = person.favouriteColor;

    person.responsibilities.forEach(responsibility => {
      const listItem = document.createElement('li');

      listItem.classList.add('list__item');
      listItem.innerHTML = `${listPointIcon} ${responsibility}`;

      responsibilitiesList.appendChild(listItem);
    });

    blockHeader.appendChild(blockTitle);
    block.appendChild(blockHeader);
    blockContent.appendChild(personAbout);
    blockContent.appendChild(responsibilitiesList);
    block.appendChild(blockContent);

    contentWrapper.appendChild(personInitials);
    contentWrapper.appendChild(block);

    return contentWrapper;
  }

  function renderPersons(collection) {
    collection.forEach(item => {
      const personBlock = createPersonBlock(item);

      timelineContainer.appendChild(personBlock);
    });
  }

  renderPersons(sliderData);

  const timelineBlocks = document.querySelectorAll('.timeline__person-block');

  timelineBlocks.forEach(block => {
    const targetPosition = {
      top: window.pageYOffset + block.getBoundingClientRect().top,
      left: window.pageXOffset + block.getBoundingClientRect().left,
      right: window.pageXOffset + block.getBoundingClientRect().right,
      bottom: window.pageYOffset + block.getBoundingClientRect().bottom
    };

    const windowPosition = {
      top: window.pageYOffset,
      left: window.pageXOffset,
      right: window.pageXOffset + document.documentElement.clientWidth,
      bottom: window.pageYOffset + document.documentElement.clientHeight
    };

    if (targetPosition.bottom > windowPosition.top &&
        targetPosition.top + block.clientHeight > windowPosition.bottom) {
      block.classList.add('is-hidden');
    }
  });

  window.addEventListener('scroll', () => {
    timelineBlocks.forEach(block => {
      showPersonBlock(block);
    });
  });

  function showPersonBlock(target) {
    const targetPosition = {
      top: window.pageYOffset + target.getBoundingClientRect().top,
      left: window.pageXOffset + target.getBoundingClientRect().left,
      right: window.pageXOffset + target.getBoundingClientRect().right,
      bottom: window.pageYOffset + target.getBoundingClientRect().bottom
    };

    const windowPosition = {
      top: window.pageYOffset,
      left: window.pageXOffset,
      right: window.pageXOffset + document.documentElement.clientWidth,
      bottom: window.pageYOffset + document.documentElement.clientHeight
    };

    if (targetPosition.bottom > windowPosition.top &&
      (targetPosition.top + target.clientHeight * 0.5) < windowPosition.bottom &&
      target.classList.contains('is-hidden')) {

      target.classList.remove('is-hidden');

      target.querySelector('.timeline__content').classList.remove('is-hidden');
      target.querySelector('.timeline__initials').classList.remove('is-hidden');

      target.querySelector('.timeline__content').classList.add('bounce-in');
      target.querySelector('.timeline__initials').classList.add('bounce-in');
    }
  }

})();