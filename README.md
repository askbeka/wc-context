# wc-context (alpha)

Context creation library for `webcomponents` inspired by `React's context` (new and old APIs) and by the [talk](https://www.youtube.com/watch?v=6o5zaKHedTE) by Justin Fagnani about DI using custom events.

## Motivation

In component based apps, you may want to pass properties all the way down the hirarchy or decouple components from their dependencies for testability or reusability purposes, then this small library can help you.

## Concept
`provider`, is an element providing a context through value property to subscribed `consumers`.
`consumers` when connected to DOM subscribe to context through dispatching `CustomEvent` which then gets handled by closest `provider` up in the tree.
`providers` have to be static, connected only once. For dynamic context `value` has to be used. This is needed for performance and to save users of API from future mental overhead by restricting usage options.

## See Redux example in demo folder
```
npm i polymer-cli -g

polymer serve

// navigate to http://127.0.0.1:8081/components/wc-context/demo
```

### Usage example
```javascript
import createContext from 'wc-context';

// will create <acontext-provider> Element with default value property 'defaultContext'
// can be modified later
// and return consumer mixin for custom element class
const consumer = createContext('acontext', 'defaultValue');

const template = `
  <acontext-provider>
    <acontext-consumer></acontext-consumer>
  </acontext-provider>
`;

class AConsumer extends consumer(HTMLElement) {
  constructor() {
    super();
    
    this.shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = template;
  }
  _onContextChanged(theme) {
    ...
  }
  
  connectedCallback() {
    this.shadowRoot.querySelector('acontext-provider').value = 'newContext';
  }
};

customElements.define('acontext-consumer', AConsumer);
