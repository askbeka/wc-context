import pkg from './package.json';

export default [
  {
    input: 'wc-context.js',
    output: {
      name: 'wcContext',
      file: pkg.browser,
      format: 'iife',
    },
  },
  {
    input: 'create-provider.js',
    output: {
      name: 'wcCreateProvider',
      file: 'dist/create-provider.global.js',
      format: 'iife',
    },
  },
  {
    input: 'create-consumer.js',
    output: {
      name: 'wcCreateConsumer',
      file: 'dist/create-consumer.global.js',
      format: 'iife',
    },
  },
];
