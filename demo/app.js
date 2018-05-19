import { createStore, combineReducers } from 'redux';
import inputReducer from './store/input-reducer.js';
import './components/controlled-input-container.js';

const iniitialState = {};
const store = createStore(
  combineReducers({ input: inputReducer }),
  iniitialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default class App extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    shadowRoot.innerHTML = `
      <store-provider>
        <controlled-input></controlled-input>
      </store-provider>
    `;

    this.storeProvider = shadowRoot.querySelector('store-provider');
  }

  connectedCallback() {
    this.storeProvider.value = store;
  }
}

customElements.define('my-app', App);
