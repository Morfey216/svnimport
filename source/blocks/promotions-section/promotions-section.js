/* global Swiper */

export default () => {
  const promoSection = document.querySelector('.promotions-section');
  if (!promoSection) return;

  const container = promoSection.querySelector('.promotions-section__slider-container');

  const wrapper = container.querySelector('.promotions-section__promo-list');
  const slides = container.querySelectorAll('.promotions-section__promo-item');
  let slider;

  function sliderInit() {
    container.classList.add('swiper-container');
    wrapper.classList.add('swiper-wrapper');
    slides.forEach((slide) => {
      slide.classList.add('swiper-slide');
    });

    const slider = new Swiper(container, {
      direction: 'horizontal',
      loop: true,
      preloadImages: true,
      loadPrevNext: true,
      loadPrevNextAmount: 2,
      slidesPerView: 1,
      spaceBetween: 10,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      speed: 2100,
      navigation: {
        nextEl: '.promotions-section__navigation-btn-next',
        prevEl: '.promotions-section__navigation-btn-prev',
      },
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
    });
  }

  sliderInit();
};
