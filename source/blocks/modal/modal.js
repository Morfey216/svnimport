export default () => {
  const classEnabled = 'enabled';
  const classScrolled = 'scrolled';
  const overlay = document.querySelector('.js-modal-overlay');
  let timer;
  let isScroll = false;
  let deltaWidth = 0;

  function scrollReInit(modal, initHeight, initWidth) {
    if (document.body.clientHeight < modal.clientHeight || document.body.clientHeight < initHeight) {
      modal.classList.add(classScrolled);
      deltaWidth = initWidth - modal.clientWidth;
      isScroll = true;
    } else {
      modal.classList.remove(classScrolled);
      isScroll = false;
      deltaWidth = 0;
    }

    if (isScroll) {
      modal.style.width = `${initWidth + deltaWidth}px`;
    } else {
      modal.style.width = '';
    }
  }

  function openPopup(id, callback) {
    const modal = document.getElementById(id);
    const close = modal.querySelector('.js-modal-close');
    let initWidth = 0;
    let initHeight = 0;

    function onResize() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        modal.style.width = '';
        initWidth = modal.clientWidth + deltaWidth;
        scrollReInit(modal, initHeight, initWidth);
      }, 300);
    }

    const closeModal = () => {
      callback();
      modal.classList.remove(classScrolled);
      modal.style.width = '';
      modal.classList.remove(classEnabled);
      overlay.classList.remove(classEnabled);
      document.removeEventListener('keydown', onPopupKeydown);
      overlay.removeEventListener('click', closeModal);
      close.removeEventListener('click', closeModal);
      window.removeEventListener('resize', onResize);
    };

    const onPopupKeydown = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closeModal();
      }
    };

    modal.classList.add(classEnabled);
    overlay.classList.add(classEnabled);

    initHeight = modal.clientHeight;
    initWidth = modal.clientWidth;

    scrollReInit(modal, initHeight, initWidth);
    close.addEventListener('click', closeModal);
    document.addEventListener('keydown', onPopupKeydown);
    setTimeout(() => {
      overlay.addEventListener('click', closeModal);
    }, 1000);

    window.addEventListener('resize', onResize);
  }

  window.openPopup = openPopup;
};
