(() => {
  const menuButton = document.querySelector('.MenuButton');

  if (menuButton) {
    menuButton.addEventListener('click', (e) => {
      e.preventDefault();
      let header = document.querySelector('.SiteHeaderNav');
      let headerShow = document.querySelector('.SiteHeaderNav.show');
      if (!headerShow) {
        header.classList.add('show');
      } else {
        header.classList.remove('show');
      }
    });
  }
})();
