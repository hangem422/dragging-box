export const dialogs = [
  {
    width: 344,
    height: 510,
    dialogColor: '#9FA8DA',
    dragEdgeColor: '#5C6BC0',
    dragVertaxColor: '#303F9F',
    dragEdgeSize: 2,
    dragEdgeRadius: 8,
    followSpeed: 0.08,
  },
  {
    width: 344,
    height: 148,
    dialogColor: '#81D4FA',
    dragEdgeColor: '#29B6F6',
    dragVertaxColor: '#0288D1',
    dragEdgeSize: 2,
    dragEdgeRadius: 8,
    followSpeed: 0.08,
  },
  {
    width: 344,
    height: 382,
    dialogColor: '#80CBC4',
    dragEdgeColor: '#26A69A',
    dragVertaxColor: '#00796B',
    dragEdgeSize: 2,
    dragEdgeRadius: 8,
    followSpeed: 0.08,
  },
  {
    width: 260,
    height: 160,
    dialogColor: '#C5E1A5',
    dragEdgeColor: '#9CCC65',
    dragVertaxColor: '#689F38',
    dragEdgeSize: 2,
    dragEdgeRadius: 8,
    followSpeed: 0.08,
  },
  {
    width: 260,
    height: 260,
    dialogColor: '#FFF59D',
    dragEdgeColor: '#FFEE58',
    dragVertaxColor: '#FBC02D',
    dragEdgeSize: 2,
    dragEdgeRadius: 8,
    followSpeed: 0.08,
  },
];

export const dialogOpt = {
  shadowOffsetX: 0,
  shadowOffsetY: 3,
  shadowBlur: 6,
  shadowColor: 'rgba(0, 0, 0, 0.38)',
};

const deepFreeze = (target) => {
  if (target && typeof target === 'object') {
    if (!Object.isFrozen(target)) Object.freeze(target);
    Object.values(target).forEach((value) => deepFreeze(value));
  }
};

[dialogs].forEach(deepFreeze);
