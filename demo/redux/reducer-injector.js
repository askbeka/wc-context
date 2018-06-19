import { consumerMixin } from './store-context.js';

export default reducersMap =>
  baseElement => class extends consumerMixin(baseElement) {
    _onContextChange(newStore) {
      if (newStore) {
        newStore.addReducers(reducersMap);
      }

      if (super._onContextChange) {
        super._onContextChange(newStore);
      }
    }
  };
