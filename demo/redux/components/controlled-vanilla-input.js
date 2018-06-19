class ControlledInput extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const input = document.createElement('input');

    input.addEventListener('input', (e) => {
      const { target: { value } } = e;

      if ((value !== this.value)) {
        if (this.onChange) {
          this.onChange(value);
        }

        if (value !== this.value) {
          input.value = this.value;
        }
      }
    });

    shadowRoot.appendChild(input);
    this.input = input;
  }

  set value(value) {
    this.setAttribute('value', value);
  }

  get value() {
    return this.getAttribute('value');
  }

  static get observedAttributes() {
    return ['value'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.input.value = newValue;
  }

  set onChange(handler) {
    this.__onChange = handler;
  }

  get onChange() {
    return this.__onChange;
  }
}

customElements.define('controlled-input', ControlledInput);
