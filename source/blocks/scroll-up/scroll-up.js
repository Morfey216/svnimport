export default () => {
  document.addEventListener('DOMContentLoaded', () => {
    const scrollUp = document.querySelector('.scroll-up');
    const scrollUpBtn = scrollUp.querySelector('.js-scroll-up');

    window.onscroll = () => {
      if (window.pageYOffset > 580) {
        scrollUp.classList.add('scroll-up--show');
      } else {
        scrollUp.classList.remove('scroll-up--show');
      }
    };

    // плавный скролл наверх
    scrollUpBtn.addEventListener('click', (evt) => {
      evt.preventDefault();

      window.scrollBy({
        top: -document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    });
  });
};
