import Ember from 'ember';
import { componentNodes } from 'ember-animated/ember-internals';

export default Ember.Component.extend({
  tagName: '',

  animator: Ember.computed(function() {
    let pointer = this.parentView;
    while (pointer) {
      if (pointer._isAnimator) {
        return pointer;
      }
      pointer = pointer.parentView;
    }
  }),

  didInsertElement() {
    this.get("animator").registerSpriteMarker(this);
  },
  willDestroyElement() {
    this.get("animator").unregisterSpriteMarker(this);
  },

  * ownElements() {
    let { firstNode, lastNode } = componentNodes(this);
    let node = firstNode;
    while (node) {
      if (node.nodeType === Node.ELEMENT_NODE) {
        yield node;
      }
      if (node === lastNode){ break; }
      node = node.nextSibling;
    }
  }

}).reopenClass({
  positionalParams: ['item']
});