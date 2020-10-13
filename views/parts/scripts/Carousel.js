(() => {
  class Carousel {
    constructor() {
      const items = document.querySelectorAll('.Carousel__item');

      this.container = document.querySelector('.Carousel__container');
      this.carouselItems = document.querySelector('.Carousel__items');
      this.imgWidth = document.querySelector(
        '.Carousel__items img'
      ).offsetWidth;
      this.items = items;
      this.totalItems = items.length;
      this.nav = document.querySelector('.Carousel__nav');
      this.slideItems = 4;
    }

    init() {
      this.addNav();
      this.carouselItems.setAttribute('data-img-width', this.imgWidth);

      this.container.addEventListener('click', (e) => {
        if (e.target && e.target.matches('img')) {
          this.onClick(e.target.closest('div'));
        }
      });

      this.nav.addEventListener('click', (e) => {
        if (e.target && e.target.matches('li')) {
          this.moveTo(e.target);
        }

        if (e.target && e.target.matches('span')) {
          this.moveTo(e.target.parentElement);
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

    onClick(image) {
      let activeItem = document.querySelector('.Carousel__item.active');
      let activeItemNumber;
      let newItemNumber = image.getAttribute('data-slide');

      if (activeItem) {
        activeItem.classList.remove('active');
        activeItemNumber = activeItem.getAttribute('data-slide');
      }

      if (activeItemNumber !== newItemNumber) {
        image.classList.add('active');
        this.carouselItems.classList.add('active-item');
      } else {
        image.classList.remove('active');
        this.carouselItems.classList.remove('active-item');
      }
    }
  }

  let thumbCarousel = new Carousel();
  thumbCarousel.init();
})();
