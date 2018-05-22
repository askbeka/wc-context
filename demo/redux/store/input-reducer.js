import { CHANGE_INPUT } from './input-actions.js';

export default (state = '', action) => {
  switch (action.type) {
    case CHANGE_INPUT:
      return action.payload;
    default:
      return state;
  }
};
