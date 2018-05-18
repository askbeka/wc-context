const includes = (arr, item) => arr.indexOf(item) !== -1;

const contexts = new WeakMap();

class BaseProvider extends HTMLElement {
  constructor() {
    super();

    const { defaultValue, eventName } = this.constructor;

    this.__listeners = [];
    this.value = defaultValue;

    this.addEventListener(eventName, (event) => {
      // eslint-disable-next-line no-param-reassign
      event.detail.unsubscribe = this.subscribe(event.detail.callback);
      event.stopPropagation();
    });
  }

  connectedCallback() {
    if (this.connectedBefore) {
      throw new Error('provider has to be static, change the value property for dynamic behavior');
    }

    this.connectedBefore = true;
  }

  subscribe(callback) {
    if (includes(this.__listeners)) {
      this.__listeners.push(callback);
    }

    callback(this.value);

    return () => this.__listeners.splice(this.__listeners.indexOf(callback), 1);
  }

  set value(context) {
    this.__listeners.forEach((callback) => {
      callback(context);
    });

    contexts.set(this, context);
  }

  get value() {
    return contexts.get(this);
  }
}


export default function createContext(contextName, defaultValue) {
  const eventName = `request-context-${contextName}`;

  class Provider extends BaseProvider {
    static get defaultValue() {
      return defaultValue;
    }

    static get eventName() {
      return eventName;
    }
  }

  customElements.define(`${contextName}-provider`, Provider);

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

    _onContextChange(context) {
      throw new Error(`${contextName} _onContextChange has not been implemented`, context, this);
    }
  };

  return consumer;
}
