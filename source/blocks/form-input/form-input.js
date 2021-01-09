export default () => {
  const inputs = document.querySelectorAll('.js-form-input');

  if (inputs.length === 0) return;

  inputs.forEach((input) => {
    input.addEventListener('focus', () => {
      input.closest('.form-input').classList.remove('error');
    });
  });
};
