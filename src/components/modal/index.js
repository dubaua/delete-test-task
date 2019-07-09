import './index.scss';
import * as utils from '@/utils';

const toggleButtonNodeList = document.querySelectorAll('[data-modal-toggle-button]');
const modalNode = document.querySelector('[data-modal]');
const modalActiveClassname = 'modal--active';

utils.forEachNode(toggleButtonNodeList, toggleButtonNode =>
  toggleButtonNode.addEventListener(
    'click',
    function() {
      modalNode.classList.toggle(modalActiveClassname);
    },
    false
  )
);
