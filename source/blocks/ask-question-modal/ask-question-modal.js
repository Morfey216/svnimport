/* global Parsley */
/* global Cleave */
import { disableBodyScroll, enableBodyScroll } from '../../js/libs/bodyScrollLock.es6';

export default () => {
  const askQuestionPopup = document.querySelector('.ask-question-modal');
  if (!askQuestionPopup) return;

  const askQuestionPopupOpenControls = document.querySelectorAll('.js-ask-question-open');
  if (!askQuestionPopupOpenControls) return;

  const form = askQuestionPopup.querySelector('.js-aqmf');
  if (!form) return;

  const phoneInput = form.querySelector('.js-aqmf-phone input');

  const nameInput = form.querySelector('.js-aqmf-name input');
  const questionInput = form.querySelector('.js-aqmf-textarea textarea');
  const validInput = form.querySelector('.js-aqmf-validate');
  const button = form.querySelector('.js-aqmf-submit');
  if (!questionInput) return;

  let parsleyForm;
  let cleave;
  const parsleyOptions = {
    uiEnabled: false,
    focus: 'none',
  };

  if (phoneInput) {
    cleave = new Cleave(phoneInput, {
      numericOnly: true,
      prefix: '+375',
      noImmediatePrefix: true,
      delimiters: [' ( ', ' ) ', ' - ', ' - '],
      // blocks: [2, 3, 3, 2, 2],
      blocks: [4, 2, 3, 2, 2],
    });

    // +7 ( 337 ) 777 - 77 - 77
    // +375 ( 29 ) 777 - 77 - 77   => length = '25';
    phoneInput.dataset.parsleyMinlength = '25';
  }

  function inputKeyCheck(evt) {
    if (!evt.key) return;
    const en = new RegExp('^[a-zA-Z ]+$');
    const ru = new RegExp('^[а-яА-Я ]+$');
    if (!en.test(evt.key) && !ru.test(evt.key)) {
      evt.preventDefault();
    }
  }

  if (nameInput) {
    nameInput.addEventListener('keypress', inputKeyCheck);
  }

  function submitButtonListener(evt) {
    evt.preventDefault();
    parsleyForm.validate();
  }

  function onSuccess() {
    // console.log('success');
  }

  if (button) {
    button.addEventListener('click', submitButtonListener);
  }

  if (validInput) {
    parsleyForm = new Parsley.Factory(form, parsleyOptions);

    parsleyForm.on('form:success', onSuccess);

    parsleyForm.on('field:error', (evt) => {
      evt.element.closest('.js-aqmf-validate').classList.add('error');
    });

    parsleyForm.on('field:success', (evt) => {
      evt.element.closest('.js-aqmf-validate').classList.remove('error');
    });
  }

  function clearInputFields() {
    phoneInput.value = '';
    nameInput.value = '';
    questionInput.value = '';
  }

  const closePopup = () => {
    clearInputFields();
    enableBodyScroll(askQuestionPopup, { reserveScrollBarGap: true });
  };

  askQuestionPopupOpenControls.forEach((currentControl) => {
    currentControl.addEventListener('click', (evt) => {
      evt.preventDefault();
      window.openPopup('ask-question-modal', closePopup);
      disableBodyScroll(askQuestionPopup, { reserveScrollBarGap: true });
    });
  });
};
