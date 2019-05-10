// Give the page currently viewed a class of "active"
window.onload = () => {
  const allLinks = document.querySelectorAll('.menu--main a');
  // .split splits string at the specified character and returns an array with split up
  // values of the string. in this case we want to retrieve [0] value of url, which is
  // everything before the # symbol
  const path = location.href.split('#')[0];

  allLinks.forEach((link) => {
    if (link.href === path) {
      link.classList.add('menu--active');
    }
  })
}
