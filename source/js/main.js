/* eslint-disable */
import './general/polyfills';
import './general/intersection-observer';
// import utils from './general/utils';
/* eslint-enable */

// region Blocks

import formInput from '../blocks/form-input/form-input';
import formTextarea from '../blocks/form-textarea/form-textarea';
import header from '../blocks/header/header';
import promoSection from '../blocks/promotions-section/promotions-section';
// import advantages from '../blocks/advantages/advantages';
import contactForm from '../blocks/contact-form/contact-form';
import aboutCompany from '../blocks/about-company/about-company';
import footerContactForm from '../blocks/footer-contact-form/footer-contact-form';

// endregion

formInput();
formTextarea();
header();
promoSection();
// advantages();
contactForm();
footerContactForm();
aboutCompany();
