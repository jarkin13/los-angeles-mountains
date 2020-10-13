(() => {
  const nav = document.querySelector('.SiteHeaderNav__list');

  function scrollTo(navItem) {
    let navItemTarget = navItem.getAttribute('data-target');
    let headerShow = document.querySelector('.SiteHeaderNav.show');
    let scrollToTarget = document
      .getElementById(navItemTarget)
      .getBoundingClientRect();
    let scrollTop = scrollToTarget.top + window.scrollY;
    window.scrollTo({
      top: scrollTop,
      left: 0,
      behavior: 'smooth',
    });

    if (headerShow)
      document.querySelector('.SiteHeaderNav').classList.remove('show');
  }

  if (nav) {
    nav.addEventListener('click', (e) => {
      if (e.target && e.target.matches('li')) {
        scrollTo(e.target.querySelector('.SiteHeaderNavItem__link'));
      }

      if (e.target && e.target.matches('span')) {
        scrollTo(e.target);
      }
    });
  }
})();
