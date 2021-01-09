export default () => {
  const textareas = document.querySelectorAll('.js-form-textarea');

  if (textareas.length === 0) return;

  textareas.forEach((textarea) => {
    textarea.addEventListener('focus', () => {
      textarea.closest('.form-textarea').classList.remove('error');
    });
  });
};
