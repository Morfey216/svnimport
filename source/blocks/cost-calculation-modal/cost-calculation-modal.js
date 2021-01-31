/* global Cleave */
import { disableBodyScroll, enableBodyScroll } from '../../js/libs/bodyScrollLock.es6';

const PHONE_NUMBER_LENGHT = 24;
const MIN_QUANTITY_VALUE = 1;
const QUANTITY_VALUE_STEP = 1;

let quantityValue = MIN_QUANTITY_VALUE;

export default () => {
  const costCalculationPopup = document.querySelector('.cost-calculation-modal');
  if (!costCalculationPopup) return;

  const costCalculationOpenControl = document.querySelector('.js-cost-calculation-open');
  const costCalculationForm = costCalculationPopup.querySelector('.cost-calculation-modal__form');
  const phoneInput = costCalculationPopup.querySelector('.client-phone__value');
  const warning = costCalculationPopup.querySelector('.client-phone__value-svg');
  const quantityValueIndicator = costCalculationForm.querySelector('.quantity__control--value');
  const quantityControlSmaller = costCalculationForm.querySelector('.quantity__control--smaller');
  const quantityControlBigger = costCalculationForm.querySelector('.quantity__control--bigger');

  const scrollBarOptions = {
    reserveScrollBarGap: true,
  };

  const cleave = new Cleave(phoneInput, {
    numericOnly: true,
    prefix: '+7',
    noImmediatePrefix: true,
    delimiters: [' ( ', ' ) ', ' - ', ' - '],
    blocks: [2, 3, 3, 2, 2],
  });

  const setQuantityValue = (value) => {
    quantityValueIndicator.value = `${value} шт`;
  };

  const onQuantityControlSmallerClick = () => {
    quantityValue -= QUANTITY_VALUE_STEP;

    if (quantityValue < MIN_QUANTITY_VALUE) {
      quantityValue = MIN_QUANTITY_VALUE;
    }

    setQuantityValue(quantityValue);
  };

  const onQuantityControlBiggerClick = () => {
    quantityValue += QUANTITY_VALUE_STEP;
    setQuantityValue(quantityValue);
  };

  const setFocus = (element) => {
    element.focus();
  };

  const getValidationErrors = (inputValue) => {
    let errorMessage = '';
    const errors = {
      isShort: false,
      isEmpty: false,
    };

    const errorNameToErrorMessage = {
      isShort: 'Неверный номер',
      isEmpty: 'Введите номер телефона',
    };

    errors.isShort = errors.isShort || (inputValue.length < PHONE_NUMBER_LENGHT);
    errors.isEmpty = errors.isEmpty || (inputValue.length === 0);

    Object.keys(errors).forEach((errorName) => {
      if (errors[errorName]) {
        errorMessage = errorNameToErrorMessage[errorName];
      }
    });

    return errorMessage;
  };

  const checkPhoneValidation = () => {
    const validationErrors = getValidationErrors(phoneInput.value);

    if (validationErrors) {
      phoneInput.classList.add('client-phone__value--error');
      warning.style.opacity = 1;
    } else {
      phoneInput.classList.remove('client-phone__value--error');
      warning.style.opacity = 0;
    }

    phoneInput.setCustomValidity(validationErrors);
  };

  const onPhoneInputChange = () => {
    checkPhoneValidation();
  };

  const setCostCalculationPopapListeners = () => {
    costCalculationForm.addEventListener('submit', onFormSubmit);
    phoneInput.addEventListener('input', onPhoneInputChange);
    quantityControlSmaller.addEventListener('click', onQuantityControlSmallerClick);
    quantityControlBigger.addEventListener('click', onQuantityControlBiggerClick);
  };

  const removeCostCalculationPopapListeners = () => {
    costCalculationForm.removeEventListener('submit', onFormSubmit);
    phoneInput.removeEventListener('input', onPhoneInputChange);
    quantityControlSmaller.removeEventListener('click', onQuantityControlSmallerClick);
    quantityControlBigger.removeEventListener('click', onQuantityControlBiggerClick);
  };

  const closePopup = () => {
    phoneInput.setCustomValidity('');
    warning.style.opacity = 0;
    phoneInput.classList.remove('client-phone__value--error');

    phoneInput.value = '';
    quantityValue = MIN_QUANTITY_VALUE;
    removeCostCalculationPopapListeners();
    enableBodyScroll(costCalculationPopup, scrollBarOptions);
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    if (!phoneInput.value.length) {
      phoneInput.setCustomValidity('Введите номер телефона');
      checkPhoneValidation();
    } else {
      // отправка формы
      console.log('send form ', quantityValueIndicator.value, phoneInput.value);
      closePopup();
    }
  };

  costCalculationOpenControl.addEventListener('click', () => {
    window.openPopup('cost-calculation', closePopup);
    setCostCalculationPopapListeners();
    setQuantityValue(MIN_QUANTITY_VALUE);
    setFocus(phoneInput);
    disableBodyScroll(costCalculationPopup, scrollBarOptions);
  });
};
