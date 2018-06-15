import pkg from './package.json';

const exportGlobal = 'wcContext';

export default [
  {
    input: 'wc-context.js',
    output: {
      name: exportGlobal,
      file: pkg.browser,
      format: 'iife',
      globals: {
        '@polymer/polymer/lib/utils/mixin.js': 'Polymer',
      },
    },
  },
  {
    input: 'create-provider.js',
    output: {
      name: `${exportGlobal}.createProvider`,
      file: 'dist/create-provider.global.js',
      format: 'iife',
    },
  },
  {
    input: 'create-consumer.js',
    output: {
      name: `${exportGlobal}.createConsumer`,
      file: 'dist/create-consumer.global.js',
      format: 'iife',
      globals: {
        '@polymer/polymer/lib/utils/mixin.js': 'Polymer',
      },
    },
  },
];
