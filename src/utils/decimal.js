import { Decimal } from 'decimal.js';
export function getCelNum(number) {
  const num = number || 0;
  return Decimal.isDecimal(num) ? new Decimal(0) : new Decimal(num);
}

// 加
export function plus(a, b) {
  return Decimal.add(getCelNum(a), getCelNum(b)).toNumber();
}

// 减
export function minus(a, b) {
  return getCelNum(a).minus(getCelNum(b)).toNumber();
}

// 乘
export function mul(a, b) {
  return getCelNum(a).mul(getCelNum(b)).toNumber();
}

// 除
export function div(a, b) {
  return Decimal.div(getCelNum(a), getCelNum(b)).toNumber();
}
