import './form.scss';
import InputField from '@/components/form/InputField.js';
import SelectField from '@/components/form/SelectField.js';
import DateField from '@/components/form/DateField.js';
import CheckboxField from '@/components/form/CheckboxField.js';
import * as utils from '@/utils/index.js';
import * as api from '@/api/index.js';

export default class Form {
  constructor(formNode) {
    this.selectors = {
      submitButton: '[data-form-submit-button]',
      message: '[data-form-message]',
      field: '[data-form-field]',
    };
    this.classnames = {
      messageError: 'form__message--error',
      messageSuccess: 'form__message--success',
    };

    this.formNode = formNode;
    this.fields = [];
    this.submitButtonNode = this.formNode.querySelector(this.selectors.submitButton);
    this.messageNode = this.formNode.querySelector(this.selectors.message);

    this.validationErrorMessage = this.formNode.dataset.formValidationErrorMessage || "Some fields isn't valid";
    this.formUrl = this.formNode.dataset.formUrl;

    this.isValid = true;

    // this flag show if form was tried to send
    this.isTouched = false;

    this.init();
  }

  init() {
    this.initFields();
    this.bindListeners();
  }

  initFields() {
    const fieldNodeList = this.formNode.querySelectorAll(this.selectors.field);
    utils.forEachNode(fieldNodeList, fieldNode => {
      const fieldType = fieldNode.dataset.field;
      let field = null;
      switch (fieldType) {
        case 'input':
          field = new InputField(fieldNode);
          break;
        case 'select':
          field = new SelectField(fieldNode);
          break;
        case 'date':
          field = new DateField(fieldNode);
          break;
        case 'checkbox':
          field = new CheckboxField(fieldNode);
          break;
      }
      this.fields.push(field);
    });
  }

  bindListeners() {
    this.onSumbit = this.handleSubmit.bind(this);
    this.submitButtonNode.addEventListener('click', this.onSumbit, false);
    this.formNode.addEventListener('submit', this.onSumbit, false);
    this.onFieldChange = this.handleChange.bind(this);
    this.formNode.addEventListener('fieldChanged', this.onFieldChange, false);
  }

  handleChange() {
    if (this.isTouched) {
      this.validateForm();
    }
  }

  handleSubmit(event) {
    this.isTouched = true;

    this.validateForm();

    if (this.isValid) {
      api
        .fakeSubmit({ url: this.formUrl, formData: null })
        .then(({ success, message }) => {
          // render success message
          this.renderMessage(message, this.classnames.messageSuccess);
        })
        .catch(({ success, message }) => {
          // render backend error
          this.renderMessage(message, this.classnames.messageError);
        });
    }

    event.preventDefault();
  }

  validateForm() {
    this.fields.forEach(function(field) {
      field.validate();
    });

    this.isValid = this.fields.every(field => field.isValid);

    if (!this.isValid) {
      // render frontend validation error
      this.renderMessage(this.validationErrorMessage, this.classnames.messageError);
    } else {
      this.clearMessage();
    }
  }

  clearMessage() {
    utils.removeClass(this.messageNode, this.classnames.messageError);
    utils.removeClass(this.messageNode, this.classnames.messageSuccess);
    this.messageNode.innerHTML = '';
  }

  renderMessage(message, classname) {
    this.clearMessage();
    utils.addClass(this.messageNode, classname);
    this.messageNode.innerHTML = message;
  }
}

// TODO show progress animation
// TODO Date field
// TODO a11y
// TODO Write about text