(() => {
  class Carousel {
    constructor() {
      const items = document.querySelectorAll('.Carousel__item');

      this.container = document.querySelector('.Carousel__container');
      this.carouselItems = document.querySelector('.Carousel__items');
      this.items = items;
      this.totalItems = items.length;
      this.nav = document.querySelector('.Carousel__nav');
      this.slideItems = 4;
    }

    init() {
      this.addNav();

      this.nav.addEventListener('click', (e) => {
        if (e.target && e.target.matches('li')) {
          this.moveTo(e.target);
        }
      });
    }

    addNav() {
      const navItems = Math.ceil(this.totalItems / this.slideItems);

      for (let i = 0; i < navItems; i++) {
        let li = document.createElement('li');
        let dot = document.createElement('span');
        li.setAttribute('data-slide-to', i);
        li.className =
          i === 0 ? 'Carousel__navItem active' : 'Carousel__navItem';
        li.appendChild(dot);
        this.nav.appendChild(li);
      }
    }

    moveTo(slideTo) {
      document
        .querySelector('.Carousel__navItem.active')
        .classList.remove('active');
      slideTo.classList.add('active');
      let slide = parseInt(slideTo.getAttribute('data-slide-to'));
      let transformTo = slide * this.container.offsetWidth;
      this.carouselItems.style.transform = `translateX(-${transformTo}px)`;
    }
  }

  let thumbCarousel = new Carousel();
  thumbCarousel.init();
})();
