# wc-context (aplha)

Context creation library for `webcomponents` inspired by `React's context` (new and old APIs) and by the [talk](https://www.youtube.com/watch?v=6o5zaKHedTE) by Justin Fagnani about DI using custom events.

## Motivation

In component based apps, you may want to pass properties all the way down the hirarchy or decouple components from their dependencies for testability or reusability purposes, then this small library can help you.

## See Redux exmaple in demo folder
```
npm i polymer-cli -g

polymer serve

// navigate to http://127.0.0.1:8081/components/wc-context/demo
```

### Usage example
```javascript
import createContext from 'wc-context';

// will create <theme-provider> Element with default value property orange
// can be modified later
// and return consumer mixin for custom element class
const consumer = createContext('theme', 'orange');

const template = `
  <theme-provider>
    <theme-consumer></theme-consumer>
  </theme-provider>
`;

class ThemeConsumer extends consumer(HTMLElement) {
  _onContextChanged(theme) {
    ...
  }
};
```
