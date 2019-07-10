import './form.scss';
import Field from './field.js';
import * as utils from '@/utils';

const fieldNodeList = document.querySelectorAll('[data-field]');

utils.forEachNode(fieldNodeList, fieldNode => {
  new Field(fieldNode)
});
