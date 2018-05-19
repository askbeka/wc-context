import storeConsumer from './store-consumer.js';

export default (mapStateToProps, mapDispatchToProps) =>
  baseElement => class extends storeConsumer(baseElement) {
    _onContextChange(newStore) {
      if (this.__storeUnsubscribe) {
        this.__storeUnsubscribe();
      }

      if (newStore) {
        this.__storeUnsubscribe = newStore.subscribe(() => this.stateChanged(newStore.getState()));

        this.stateChanged(newStore.getState());

        this.updateProps(mapDispatchToProps(newStore.dispatch));
      }
    }

    disconnectedCallback() {
      this.__storeUnsubscribe();

      super.disconnectedCallback();
    }

    updateProps(props) {
      Object.keys(props).forEach((propName) => {
        this[propName] = props[propName];
      });
    }

    stateChanged(state) {
      this.updateProps(mapStateToProps(state));
    }
  };
