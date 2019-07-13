import BaseField from './BaseField.js';

export default class SelectField extends BaseField {
  constructor(fieldNode) {
    super(fieldNode);
  }

  handleChange() {
    super.handleChange();

    this.handleFilled();
    this.validate();
  }
}
