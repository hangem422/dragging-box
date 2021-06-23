export const dialogs = [{ width: 260, height: 260, color: '#f4e55a' }];

const deepFreeze = (target) => {
  if (target && typeof target === 'object') {
    if (!Object.isFrozen(target)) Object.freeze(target);
    Object.values(target).forEach((value) => deepFreeze(value));
  }
};

[dialogs].forEach(deepFreeze);
