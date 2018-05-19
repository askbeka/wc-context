import connect from '../connect.js';
import { changeInput } from '../store/input-actions.js';
import ControlledInput from './controlled-input.js';

const mapStateToProps = state => ({
  value: state.input,
});

const mapDispatchToProps = dispatch => ({
  onChange: value => dispatch(changeInput(value)),
});

const InputContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ControlledInput);

customElements.define('controlled-input', InputContainer);
