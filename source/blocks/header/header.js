import { disableBodyScroll, clearAllBodyScrollLocks } from '../../js/libs/bodyScrollLock.es6';

export default () => {
  const WindowBreakpoints = {
    DESKTOP_BIG: 1920,
    DESKTOP: 1024,
    TABLET: 1023,
    MOBILE: 320,
  };

  const header = document.querySelector('.header');
  const headerOpenedClass = 'header--menu-opened';

  if (!header) return;

  const burgerToggle = header.querySelector('.header__toggle');

  const dropdown = header.querySelector('.header__dropdown');
  const overlay = header.querySelector('.header__overlay');

  const mainNavContainer = header.querySelector('.header__main-nav-container');

  const mainNavWrap = header.querySelector('.header__main-nav-wrap');
  const mainNav = header.querySelector('.header__main-nav');
  const menuFragment = new DocumentFragment();

  const contactsWrap = header.querySelector('.header__contacts-wrap');
  const contactsButton = header.querySelector('.header__contacts-button');
  // const contactPhone = contactsWrap.querySelector('.header__contacts-phone');
  // const contactButton = contactsWrap.querySelector('.header__contacts-button');

  const createActualNav = () => {
    const actualNav = mainNav.cloneNode(true);
    menuFragment.appendChild(mainNav);

    const mainNavItems = actualNav.querySelectorAll('.menu-nav__item');
    const mainNavList = actualNav.querySelector('.menu-nav__list');

    mainNavList.innerHTML = '';

    mainNavItems.forEach((item) => {
      if (!item.classList.contains('menu-nav__item--more')) {
        mainNavList.appendChild(item);
      }
    });

    return actualNav;
  };

  const adjustDesktop = () => {
    clearAllBodyScrollLocks(dropdown);
    // mainNavWrap.prepend(mainNav);
    mainNavWrap.prepend(menuFragment);
    mainNavContainer.append(contactsWrap);
  };

  const adjustTablet = () => {
    if (header.classList.contains('header--menu-opened')) {
      disableBodyScroll(header);
    }

    const fragment = new DocumentFragment();
    fragment.appendChild(createActualNav());
    fragment.appendChild(contactsWrap);
    dropdown.innerHTML = '';
    dropdown.appendChild(fragment);
  };

  const adjustMobile = () => {
    if (header.classList.contains('header--menu-opened')) {
      disableBodyScroll(header);
    }

    const fragment = new DocumentFragment();
    fragment.appendChild(createActualNav());
    fragment.appendChild(contactsWrap);
    dropdown.innerHTML = '';
    dropdown.appendChild(fragment);
  };


  const checkWindowWidth = () => {
    if (window.matchMedia(`(min-width: ${WindowBreakpoints.DESKTOP_BIG}px)`).matches) {
      return WindowBreakpoints.DESKTOP_BIG;
    }
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
    overlay.style.maxHeight = `calc(100vh - ${rect.bottom}px)`;
    overlay.style.top = `${rect.bottom}px`;
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
        case WindowBreakpoints.DESKTOP:
          adjustDesktop();
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
    clearAllBodyScrollLocks(dropdown);
    contactsButton.removeEventListener('click', closeMenu);
  };

  const openMenu = () => {
    adjustDropdownMaxHeight();
    header.classList.add(headerOpenedClass);
    adjustMenu();
    disableBodyScroll(dropdown);
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

  function scrolled() {
    const scrollTop = window.scrollY;

    if (scrollTop >= window.outerHeight / 6) {
      header.classList.remove('header--primary-position');
    } else {
      header.classList.add('header--primary-position');
    }
  }

  window.addEventListener('resize', resizeThrottler, false);
  window.addEventListener('scroll', scrolled);
  contactsButton.addEventListener('click', closeMenu);

  adjustMenu();
  scrolled();
};
