import './field.scss';
import * as utils from '@/utils/index.js';

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

    this.validatorArray = [];
    this.errorMessageArray = [];
    this.isFilled = false;
    this.isTouched = false;
    this.isValid = true;

    this.init();
  }

  init() {
    this.handleFilled();
    this.buildValidators();
    if (this.isFilled) {
      this.validate();
    }
    this.bindListeners();
  }

  bindListeners() {
    this.onFocus = this.handleFocus.bind(this);
    this.fieldOriginalNode.addEventListener('focus', this.onFocus, false);
    this.fieldOriginalNode.addEventListener('blur', this.onFocus, false);
    this.onChange = this.handleChange.bind(this);
    this.fieldOriginalNode.addEventListener('change', this.onChange, false);
  }

  buildValidators() {
    if (this.fieldNode.hasAttribute('data-field-required')) {
      this.validatorArray.push({
        validator: x => x.length !== 0,
        message: this.fieldNode.dataset.fieldRequiredMessage || 'Field is required',
      });
    }
  }

  handleFocus() {
    // can't be undone
    this.isTouched = true;
    utils.addClass(this.fieldNode, this.classnames.touched);

    if (this.fieldOriginalNode === document.activeElement) {
      utils.addClass(this.fieldNode, this.classnames.focus);
    } else {
      this.handleFilled();
      this.validate();
      utils.removeClass(this.fieldNode, this.classnames.focus);
    }
  }

  handleFilled() {
    if (this.fieldOriginalNode.value !== '') {
      this.isFilled = true;
      utils.addClass(this.fieldNode, this.classnames.filled);
    } else {
      this.isFilled = false;
      utils.removeClass(this.fieldNode, this.classnames.filled);
    }
  }

  handleChange() {
    const changedEvent = new CustomEvent('fieldChanged', { bubbles: true });
    this.fieldNode.dispatchEvent(changedEvent);
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
      utils.addClass(this.fieldNode, this.classnames.success);
      utils.removeClass(this.fieldNode, this.classnames.error);
    } else {
      utils.addClass(this.fieldNode, this.classnames.error);
      utils.removeClass(this.fieldNode, this.classnames.success);
    }

    this.renderErrors();
  }

  renderErrors() {
    this.fieldErrorsNode.innerHTML = '';
    for (let i = 0; i < this.errorMessageArray.length; i++) {
      const errorNode = document.createElement('div');
      utils.addClass(errorNode, this.classnames.errorMessage);
      errorNode.textContent = this.errorMessageArray[i];
      this.fieldErrorsNode.appendChild(errorNode);
    }
  }
}
