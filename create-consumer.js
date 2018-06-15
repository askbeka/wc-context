import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { getEventName } from './utils.js';

export default (contextName) => {
  const eventName = getEventName(contextName);

  const consumer = baseElement => class Consumer extends baseElement {
    constructor() {
      super();

      this._onContextChange = this._onContextChange.bind(this);
    }

    connectedCallback() {
      const event = new CustomEvent(eventName, {
        // we will provide provider here
        detail: { callback: this._onContextChange },
        bubbles: true,
        cancelable: true,
        // Has to pass shadow dom boundaries
        // for browsers not supporting shadowDom and less mental overhead in usage
        composed: true,
      });

      this.dispatchEvent(event);

      this.__unsubscribeContext = event.detail.unsubscribe;

      if (!this.__unsubscribeContext) {
        throw new Error(`no provider found for ${contextName} consumer`, this);
      }

      if (super.connectedCallback) {
        super.connectedCallback();
      }
    }

    disconnectedCallback() {
      if (this.__unsubscribeContext) {
        this.__unsubscribeContext();
      }

      if (super.disconnectedCallback) {
        super.disconnectedCallback();
      }
    }
  };

  return dedupingMixin(consumer);
};
