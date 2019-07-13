import BaseField from './BaseField.js';
import * as utils from '@/utils';

export default class InputField extends BaseField {
  constructor(fieldNode) {
    super(fieldNode);
  }

  buildValidators() {
    super.buildValidators();

    if (this.fieldNode.hasAttribute('data-field-regex')) {
      const regexp = new RegExp(this.fieldNode.dataset.fieldRegex);
      this.validatorArray.push({
        validator: x => regexp.test(x),
        message: this.fieldNode.dataset.fieldRegexMessage || 'Invalid format',
      });
    }

    if (this.fieldNode.hasAttribute('data-field-min-length')) {
      const minLength = Number(this.fieldNode.dataset.fieldMinLength);
      if (utils.isNatural(minLength)) {
        this.validatorArray.push({
          validator: x => x.length >= minLength,
          message: this.fieldNode.dataset.fieldMinLengthMessage || `At least ${minLength} symbols`,
        });
      } else {
        console.warn(`[InputField]: min length should be a natural number, got ${minLength}. Valitator wasn't bound.`);
        
      }
    }

    if (this.fieldNode.hasAttribute('data-field-max-length')) {
      const maxLength = Number(this.fieldNode.dataset.fieldMaxLength);
      if (utils.isNatural(maxLength)) {
        this.validatorArray.push({
          validator: x => x.length <= maxLength,
          message: this.fieldNode.dataset.fieldMaxLengthMessage || `Up to ${maxLength} symbols`,
        });
      } else {
        console.warn(`[InputField]: max length should be a natural number, got ${maxLength}. Valitator wasn't bound.`);
      }
    }
  }
}
