import BaseField from './BaseField.js';

export default class CheckboxField extends BaseField {
  constructor(fieldNode) {
    super(fieldNode);
  }

  bindListeners() {
    super.bindListeners();

    this.onChange = this.handleChange.bind(this);
    this.fieldOriginalNode.addEventListener('change', this.onChange, false);
  }

  handleChange() {
    this.handleFilled();
    this.validate();
  }
}
