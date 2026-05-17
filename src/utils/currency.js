export const formatArs = (value) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(value);
};

export const getPercentage = (partialValue, totalValue) => {
  return ((partialValue / totalValue) * 100).toFixed(0);
};
