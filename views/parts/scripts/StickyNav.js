(() => {
  class StickyNav {
    constructor() {
      this.hero = document.querySelector('.js-scrollAfter');
      this.header = document.querySelector('.SiteHeader');
    }

    init() {
      window.onbeforeunload = () => {
        window.scrollTo(0, 0);
      };

      this.throttled(
        200,
        window.addEventListener('scroll', this.stickyElement.bind(this))
      );
    }

    stickyElement() {
      let heroHeight = this.hero.offsetHeight;
      let headerHeight = this.header.offsetHeight;
      let scrollValue = window.scrollY;

      if (scrollValue > headerHeight && scrollValue < heroHeight) {
        this.header.classList.add('is-hidden', 'theme--White');
        this.header.classList.remove('is-fixed', 'theme--Transparent');
      } else if (scrollValue > heroHeight) {
        this.header.classList.add('is-fixed');
        this.header.classList.remove('is-hidden');
      } else {
        this.header.classList.add('theme--Transparent');
        this.header.classList.remove('is-hidden', 'is-fixed', 'theme--White');
      }
    }

    throttled(delay, fn) {
      let lastCall = 0;
      return (...args) => {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
          return;
        }
        lastCall = now;
        return fn(...args);
      };
    }
  }
  let nav = new StickyNav();
  nav.init();
})();
