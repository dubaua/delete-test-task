import './field.scss';

export default class Field {
  constructor(fieldNode) {
    this.classnames = {
      focus: 'field--focus',
      filled: 'field--filled',
      touched: 'field--touched',
      error: 'field--error',
      success: 'field--success',
      errorMessage: 'field__error-message',
    };

    this.selectors = {
      original: '[data-field-original]',
      errors: '[data-field-errors]',
    };

    this.fieldNode = fieldNode;
    this.fieldOriginalNode = this.fieldNode.querySelector(this.selectors.original);
    this.fieldErrorsNode = this.fieldNode.querySelector(this.selectors.errors);

    // add validators
    this.validatorArray = [];
    this.errorMessageArray = [];
    this.buildValidators();

    // user has inputed something
    this.handleFilled();

    // user has touched field
    this.touched = false;

    this.isValid = true;

    this.init();
  }

  init() {
    this.onFocus = this.handleFocus.bind(this);
    this.fieldOriginalNode.addEventListener('focus', this.onFocus, false);
    this.fieldOriginalNode.addEventListener('blur', this.onFocus, false);
  }

  buildValidators() {
    if (this.fieldNode.hasAttribute('data-field-required')) {
      this.validatorArray.push({
        validator: x => x.length !== 0,
        message: this.fieldNode.dataset.fieldRequiredMessage || 'Field is required',
      });
    }

    if (this.fieldNode.hasAttribute('data-field-regex')) {
      const regexp = new RegExp(this.fieldNode.dataset.fieldRegex, 'g');
      this.validatorArray.push({
        validator: x => regexp.test(x),
        message: this.fieldNode.dataset.fieldRegexMessage || 'Invalid format',
      });
    }

    if (this.fieldNode.hasAttribute('data-field-min-length')) {
      const minLength = Number(this.fieldNode.dataset.fieldMinLength);
      if (!isNaN(minLength)) {
        this.validatorArray.push({
          validator: x => x.length >= minLength,
          message: this.fieldNode.dataset.fieldMinLengthMessage || `At least ${minLength} symbols`,
        });
      }
    }

    if (this.fieldNode.hasAttribute('data-field-max-length')) {
      const maxLength = Number(this.fieldNode.dataset.fieldMaxLength);
      if (!isNaN(maxLength)) {
        this.validatorArray.push({
          validator: x => x.length <= maxLength,
          message: this.fieldNode.dataset.fieldMaxLengthMessage || `Up to ${maxLength} symbols`,
        });
      }
    }
  }

  addClass(modifier) {
    this.fieldNode.classList.add(this.classnames[modifier]);
  }

  removeClass(modifier) {
    this.fieldNode.classList.remove(this.classnames[modifier]);
  }

  handleFocus() {
    // can't be undone
    this.touched = true;
    this.addClass('touched');

    if (this.fieldOriginalNode === document.activeElement) {
      this.addClass('focus');
    } else {
      this.handleFilled();
      this.validate();
      this.removeClass('focus');
    }
  }

  handleFilled() {
    if (this.fieldOriginalNode.value !== '') {
      this.filled = true;
      this.addClass('filled');
    } else {
      this.filled = false;
      this.removeClass('filled');
    }
  }

  validate() {
    const value = this.fieldOriginalNode.value;

    const validationResultArray = this.validatorArray.map(({ validator, message }) => ({
      result: validator(value),
      message,
    }));

    const errorsArray = validationResultArray.filter(({ result }) => !result);
    this.errorMessageArray = errorsArray.map(({ message }) => message);

    this.isValid = errorsArray.length === 0;

    if (this.isValid) {
      this.addClass('success');
      this.removeClass('error');
    } else {
      this.addClass('error');
      this.removeClass('success');
    }

    this.renderErrors();
  }

  renderErrors() {
    this.fieldErrorsNode.innerHTML = '';
    for (let i = 0; i < this.errorMessageArray.length; i++) {
      const errorNode = document.createElement('div');
      errorNode.classList.add(this.classnames.errorMessage);
      errorNode.textContent = this.errorMessageArray[i];
      this.fieldErrorsNode.appendChild(errorNode);
    }
  }
}

/*
TODO
Умеет аксессибилить

Поле селект
Умеет выбрасывать дропдаун и выбирать нативный селект по клику.

field type:
select
text
date

ELEMENTS

field dropdown

*/
