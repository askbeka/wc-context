import { getEventName, dedupingMixin } from './utils.js';

export default (contextName) => {
  const eventName = getEventName(contextName);

  const consumerMixin = baseElement => class Consumer extends baseElement {
    constructor() {
      super();

      this._onContextChange = this._onContextChange.bind(this);
    }

    connectedCallback() {
      const event = new CustomEvent(eventName, {
        // we will get unscubribe function here
        detail: { callback: this._onContextChange },
        bubbles: true,
        cancelable: true,
        // Has to pass shadow dom boundaries
        composed: true,
      });

      this.dispatchEvent(event);

      this.__unsubscribeFromContext = event.detail.unsubscribe;

      if (!this.__unsubscribeFromContext) {
        throw new Error(`no provider found for ${contextName} consumer`, this);
      }

      if (super.connectedCallback) {
        super.connectedCallback();
      }
    }

    disconnectedCallback() {
      if (this.__unsubscribeFromContext) {
        this.__unsubscribeFromContext();
      }

      if (super.disconnectedCallback) {
        super.disconnectedCallback();
      }
    }
  };

  return dedupingMixin(consumerMixin);
};
