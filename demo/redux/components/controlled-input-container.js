import connect from '../vanilla-connect.js';
import redcuerInjector from '../reducer-injector.js';
import inputReducer from '../store/input-reducer.js';
import { changeInput } from '../store/input-actions.js';

import './controlled-vanilla-input.js';

const mapStateToProps = state => ({
  value: state.input,
});

const mapDispatchToProps = dispatch => ({
  onChange: value => dispatch(changeInput(value)),
});

customElements.define(
  'controlled-input-container',
  redcuerInjector({
    input: inputReducer,
  })(connect(
    mapStateToProps,
    mapDispatchToProps,
  )(customElements.get('controlled-input'))),
);
