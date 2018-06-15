import { getEventName, includes } from './utils.js';

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
    if (!includes(this.__listeners, callback)) {
      this.__listeners.push(callback);
    } else {
      throw new Error(`consumer ${callback} already subscribed`, this);
    }

    callback(this.value);

    return () => this.__listeners.splice(this.__listeners.indexOf(callback), 1);
  }

  set value(context) {
    this.__listeners.forEach((callback) => {
      callback(context);
    });

    this.__context = context;
  }

  get value() {
    return this.__context;
  }
}


export default (contextName, defaultValue) =>
  class Provider extends BaseProvider {
    static get defaultValue() {
      return defaultValue;
    }

    static get eventName() {
      return getEventName(contextName);
    }
  };
