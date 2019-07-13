import BaseField from './BaseField.js';
import './select.scss';

export default class SelectField extends BaseField {
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
