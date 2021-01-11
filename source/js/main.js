/* eslint-disable */
import './general/polyfills';
import './general/intersection-observer';
// import utils from './general/utils';
/* eslint-enable */

// region Blocks

import formInput from '../blocks/form-input/form-input';
import formTextarea from '../blocks/form-textarea/form-textarea';
import header from '../blocks/header/header';
// import advantages from '../blocks/advantages/advantages';
import contactForm from '../blocks/contact-form/contact-form';

// endregion

formInput();
formTextarea();
header();
// advantages();
contactForm();
