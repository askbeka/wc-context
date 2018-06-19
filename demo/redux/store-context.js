import { createConsumerMixin, createProvider } from '../../wc-context.js';

export const consumerMixin = createConsumerMixin('store');
export const Provider = createProvider('store');
