import { disableBodyScroll, clearAllBodyScrollLocks } from '../../js/libs/bodyScrollLock.es6';

export default () => {
  const WindowBreakpoints = {
    DESKTOP: 1024,
    TABLET: 1023,
    MOBILE: 320,
  };

  const header = document.querySelector('.header');
  const headerOpenedClass = 'header--menu-opened';

  if (!header) return;

  const burgerToggle = header.querySelector('.header__toggle');

  const dropdown = header.querySelector('.header__dropdown');

  const mainNavWrap = header.querySelector('.header__main-nav-wrap');
  const mainNav = header.querySelector('.header__main-nav');

  const adjustDesktop = () => {
    clearAllBodyScrollLocks(dropdown);
    mainNavWrap.prepend(mainNav);
  };


  const adjustTablet = () => {
    if (header.classList.contains('header--menu-opened')) {
      disableBodyScroll(header);
    }

    const fragment = new DocumentFragment();
    fragment.appendChild(mainNav);
    dropdown.appendChild(fragment);
  };

  const adjustMobile = () => {
    if (header.classList.contains('header--menu-opened')) {
      disableBodyScroll(header);
    }

    const fragment = new DocumentFragment();

    fragment.appendChild(mainNav);

    dropdown.appendChild(fragment);
  };


  const checkWindowWidth = () => {
    if (window.matchMedia(`(min-width: ${WindowBreakpoints.DESKTOP}px)`).matches) {
      return WindowBreakpoints.DESKTOP;
    }
    if (window.matchMedia(`(min-width: ${WindowBreakpoints.TABLET}px)`).matches) {
      return WindowBreakpoints.TABLET;
    }
    return WindowBreakpoints.MOBILE;
  };


  const adjustDropdownMaxHeight = () => {
    const rect = header.getBoundingClientRect();

    dropdown.style.maxHeight = `calc(100vh - ${rect.bottom}px)`;
  };

  let lastWindowMode = -1;
  const adjustMenu = () => {
    const currentWindowMode = checkWindowWidth();
    if (lastWindowMode !== currentWindowMode) {
      switch (currentWindowMode) {
        case WindowBreakpoints.MOBILE:
          adjustMobile();
          break;
        case WindowBreakpoints.TABLET:
          adjustTablet();
          break;
        default:
          adjustDesktop();
          break;
      }
      lastWindowMode = currentWindowMode;
    }
  };

  const closeMenu = () => {
    header.classList.remove(headerOpenedClass);
    // clearAllBodyScrollLocks(dropdown);
  };

  const openMenu = () => {
    adjustDropdownMaxHeight();
    header.classList.add(headerOpenedClass);
    adjustMenu();
    // disableBodyScroll(dropdown);
  };

  burgerToggle.addEventListener('click', () => {
    if (header.classList.contains(headerOpenedClass)) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  let resizeTimeout;

  function resizeThrottler() {
    // ignore resize events as long as an actualResizeHandler execution is in the queue
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(() => {
        resizeTimeout = null;
        adjustMenu();
        adjustDropdownMaxHeight();

        // The actualResizeHandler will execute at a rate of 15fps
      }, 10);
    }
  }

  window.addEventListener('resize', resizeThrottler, false);
  adjustMenu();
};
