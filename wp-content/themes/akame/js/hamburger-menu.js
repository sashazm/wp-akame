// To Target The Hamburger Main Toggle
const navToggle = document.querySelector('.js-main-nav-toggle');
const menu = document.querySelector('.header-main__nav');
const menuToggle = document.querySelector('.js-menu-toggle');

// Class names.
const classMainActive = 'header-main__nav--active';
const classToggleActive = 'nav-toggle--active';

// Event listener to change toggle state icon
navToggle.addEventListener('click', toggleStatus);
menuToggle.addEventListener('click', hideMenu)

// // function to switch between toggle states
function toggleStatus () {
  toggleNavClass()
  toggleMenu()
}

function toggleNavClass () {
  if (navToggle.className.includes(classToggleActive)) {
    navToggle.classList.remove(classToggleActive);
  } else {
    navToggle.classList.add(classToggleActive);
  }
}

// to slide the side menu open and closed
function toggleMenu () {
  if (menu.className.includes(classMainActive)) {
    menu.classList.remove(classMainActive);
  } else {
    menu.classList.add(classMainActive);
  }
}

// Slides menu to the left out of the view
function hideMenu() {
  menu.classList.remove(classMainActive);
  navToggle.classList.remove(classToggleActive);
}
