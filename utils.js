export const getEventName = context => `request-context-${context}`;

export const includes = (arr, item) => arr.indexOf(item) !== -1;

export const dedupingMixin = (() => {
  let dedupeId = 0;

  return (mixin) => {
    let mixinApplications = mixin.__mixinApplications;

    if (!mixinApplications) {
      mixinApplications = new WeakMap();
      // eslint-disable-next-line no-param-reassign
      mixin.__mixinApplications = mixinApplications;
    }

    const mixinDedupeId = dedupeId;

    dedupeId += 1;

    return (base) => {
      const baseSet = base.__mixinSet;

      if (baseSet && baseSet[mixinDedupeId]) {
        return base;
      }

      const map = mixinApplications;
      let extended = map.get(base);

      if (!extended) {
        extended = mixin(base);
        map.set(base, extended);
      }

      const mixinSet = Object.create(extended.__mixinSet || baseSet || null);

      mixinSet[mixinDedupeId] = true;

      extended.__mixinSet = mixinSet;

      return extended;
    };
  };
})();
