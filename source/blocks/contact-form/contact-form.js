export default () => {
  const form = document.querySelector('.js-ccf');
  if (!form) return;

  const inputs = form.querySelectorAll('input');
  const desc = form.querySelector('textarea');
  const upload = form.querySelector('.contact-form__upload-message');

  function clearData() {
    inputs.forEach((it) => {
      // eslint-disable-next-line no-param-reassign
      it.value = '';
    });

    desc.value = '';

    $('.js-ccf-submit').prop('disabled', false);
  }

  function createMessage(mess) {
    upload.textContent = mess;

    setTimeout(() => {
      upload.textContent = '';
    }, 3000);
  }

  form.addEventListener('submit', (evt) => {
    const http = new XMLHttpRequest();
    evt.preventDefault();
    http.open('POST', 'mail/mail.php', true);
    http.onreadystatechange = () => {
      if (http.readyState === 4 && http.status === 200) {
        clearData();
        createMessage(http.responseText);
      }
    };

    http.onerror = () => {
      clearData();
      // eslint-disable-next-line no-alert
      alert('Ошибка, попробуйте еще раз');
    };

    $('.js-ccf-submit').prop('disabled', true);
    http.send(new FormData(form));
  }, false);
};
