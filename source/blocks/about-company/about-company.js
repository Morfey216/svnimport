export default () => {
  const aboutCompany = document.querySelector('.about-company');
  if (!aboutCompany) return;

  const wrapper = aboutCompany.querySelector('.about-company__img-wrapper');

  const parallax = () => {
    const coords = aboutCompany.getBoundingClientRect();
    const windowHeight = document.documentElement.clientHeight;

    // верхний край элемента виден?
    const topVisible = coords.top > 0 && coords.top < windowHeight;

    // нижний край элемента виден?
    const bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

    const full = windowHeight - coords.top + coords.bottom;
    const delta = full / 100;
    const pos = coords.bottom / delta - 30;

    if (topVisible || bottomVisible) {
      wrapper.style.backgroundPositionY = `${pos}%`;
    }
  };

  parallax();
  document.addEventListener('scroll', parallax);
};
