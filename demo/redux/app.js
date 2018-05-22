import { createStore, compose as origCompose, combineReducers } from 'redux';
import { lazyReducerEnhancer } from 'pwa-helpers/lazy-reducer-enhancer.js';
import { Provider } from './store-context.js';

const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || origCompose;

const iniitialState = {};
const store = createStore(
  state => state,
  iniitialState,
  compose(lazyReducerEnhancer(combineReducers)),
);

export default class App extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.storeProvider = document.createElement('store-provider');
    this.storeProvider.value = store;
    this.shadowRoot.appendChild(this.storeProvider);
  }

  async connectedCallback() {
    await import('./components/controlled-input-container.js');

    this.storeProvider.appendChild(document.createElement('controlled-input'));
  }
}

customElements.define('store-provider', Provider);

customElements.define('my-app', App);
