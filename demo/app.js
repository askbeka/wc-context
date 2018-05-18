import { createStore } from 'redux';
import connect from './connect.js';
import inputReducer from './store/input-reducer.js';
import { changeInput } from './store/input-actions.js';
import ControlledInput from './components/controlled-input.js';

const iniitialState = '';
const store = createStore(
  inputReducer,
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
  }
}

const mapStateToProps = state => ({
  value: state,
});

const mapDispatchToProps = dispatch => ({
  onChange: value => dispatch(changeInput(value)),
});

const InputContainer = connect(mapStateToProps, mapDispatchToProps, store)(ControlledInput);

customElements.define('controlled-input', InputContainer);

customElements.define('my-app', App);
