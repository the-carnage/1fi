export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatNumber = (num) => {
  return new Intl.NumberFormat('en-IN').format(num);
};

export const calculateDiscount = (mrp, price) => {
  if (mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
};

export const calculateTotalEmi = (monthlyAmount, tenure) => {
  return monthlyAmount * tenure;
};
