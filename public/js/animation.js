
const aboutSection = document.getElementById('about-section');

function checkScrollAbout() {
  const aboutSectionPosition = aboutSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (aboutSectionPosition < windowHeight * 0.75) {
    aboutSection.querySelector('.img-container img').style.animation = 'backInLeft .9s';
    aboutSection.querySelector('.details-container').style.animation = 'backInRight .9s';
    
  }
}

window.addEventListener('scroll', checkScrollAbout);

const workSection = document.getElementById('work-section');

function checkScrollWork() {
  const workSectionPosition = workSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (workSectionPosition < windowHeight * 0.75) {
    workSection.querySelector('.animation').style.animation =  'backInUp .7s';
    workSection.querySelector('.animation1').style.animation = 'backInUp .9s';
    workSection.querySelector('.animation2').style.animation = 'backInUp 1.1s';
    workSection.querySelector('.animation3').style.animation = 'backInUp 1.3s';
    workSection.querySelector('.animation4').style.animation = 'backInUp 1.5s';
    workSection.querySelector('.animation5').style.animation = 'backInUp 1.7s';
    workSection.querySelector('.animation6').style.animation = 'backInUp 1.9s';
    
  }
}

window.addEventListener('scroll', checkScrollWork);


const goalSection = document.getElementById('goal-section');

function checkScrollGoal() {
  const goalSectionPosition = goalSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (goalSectionPosition < windowHeight * 0.75) {
    goalSection.querySelector('.goal1').style.animation = 'backInLeft .9s';
    goalSection.querySelector('.goal2').style.animation = 'backInUp .9s';
    goalSection.querySelector('.goal3').style.animation = 'backInRight .9s';
    
  }
}

window.addEventListener('scroll', checkScrollGoal);