import createContext from '../createContext.js';

export default (mapStateToProps, mapDispatchToProps, store) =>
  baseElement => class extends createContext('store', store)(baseElement) {
    _onContextChange(newStore) {
      if (this.__storeUnsubscribe) {
        this.__storeUnsubscribe();
      }

      this.__storeUnsubscribe = newStore.subscribe(() => this.stateChanged(store.getState()));

      this.stateChanged(store.getState());

      this.updateProps(mapDispatchToProps(store.dispatch));
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
