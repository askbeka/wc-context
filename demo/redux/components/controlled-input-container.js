import connect from '../connect.js';
import redcuerInjector from '../reducer-injector.js';
import inputReducer from '../store/input-reducer.js';
import { changeInput } from '../store/input-actions.js';
import ControlledInput from './controlled-input.js';

const mapStateToProps = state => ({
  value: state.input,
});

const mapDispatchToProps = dispatch => ({
  onChange: value => dispatch(changeInput(value)),
});

customElements.define(
  'controlled-input',
  redcuerInjector({ input: inputReducer })(connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ControlledInput)),
);
