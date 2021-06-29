export const dialogs = [
  {
    width: 260,
    height: 260,
    dialogColor: '#f4e55a',
    dragEdgeColor: '#ff4338',
    dragVertaxColor: '#ff4338',
    dragEdgeSize: 2,
    dragEdgeRadius: 8,
    followSpeed: 0.08,
  },
];

export const dialogOpt = {
  shadowOffsetX: 0,
  shadowOffsetY: 3,
  shadowBlur: 6,
  shadowColor: 'rgba(0, 0, 0, 0.1)',
};

const deepFreeze = (target) => {
  if (target && typeof target === 'object') {
    if (!Object.isFrozen(target)) Object.freeze(target);
    Object.values(target).forEach((value) => deepFreeze(value));
  }
};

[dialogs].forEach(deepFreeze);
