import BaseField from './BaseField.js';

export default class CheckboxField extends BaseField {
  constructor(fieldNode) {
    super(fieldNode);
  }

  handleChange() {
    super.handleChange();

    this.handleFilled();
    this.validate();
  }
}
