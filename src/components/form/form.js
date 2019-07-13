import './form.scss';
import InputField from './InputField.js';
import SelectField from './SelectField.js';
import DateField from './DateField.js';
import * as utils from '@/utils';

const fieldNodeList = document.querySelectorAll('[data-field]');

utils.forEachNode(fieldNodeList, fieldNode => {
  const fieldType = fieldNode.dataset.field;
  switch (fieldType) {
    case 'input':
      return new InputField(fieldNode);
    case 'select':
      return new SelectField(fieldNode);
    case 'data':
      return new DateField(fieldNode);
  }
});
