import isNumber from "is-number";
import { isEmptyOrNull } from "../gen-es/esCheckFunc";

export const getCalculatePercentageOfAmount = (amount, percentage) => {
  if (!isNumber(amount)) {
    amount = 0;
  }
  if (!isNumber(percentage)) {
    percentage = 0;
  }
  let percentageAmount = 0;
  percentageAmount = getTotalAmountUsingPercent(amount, percentage);
  percentageAmount = Number(percentageAmount).toFixed(2);
  return isNumber(percentageAmount) ? percentageAmount : 0;
};

export const getCalculatedDiscount = (amount, rate) => {
  if (!isNumber(amount)) {
    amount = 0;
  }
  if (!isNumber(rate)) {
    rate = 0;
  }
  let discount = 0;
  discount = getTotalAmountUsingPercent(amount, rate);
  discount = Number(discount).toFixed(2);
  return isNumber(discount) ? discount : 0;
};

export const getCalculatedDiscountRate = (amount, discount) => {
  return getPercentUsingTotalAmount(amount, discount);
};

export const getTotalAmountUsingPercent = (amount, rate) => {
  if (!isNumber(amount)) {
    amount = 0;
  }
  if (!isNumber(rate)) {
    rate = 0;
  }
  let num = (Number(amount) * Number(rate)) / 100;
  return isNumber(num) ? Number(num).toFixed(2) : 0;
};

export const getPercentUsingTotalAmount = (amount, discount) => {
  discount = Number(discount);
  amount = Number(amount);

  let percentage = (discount / amount) * 100;

  if (isNumber(percentage)) {
    return Number(percentage).toFixed(2);
  }

  return 0;
};

export const subtractBtwTowVal = (val, val2) => {
  if (!isNumber(val)) {
    val = 0;
  }
  if (!isNumber(val2)) {
    val2 = 0;
  }
  let num = Number(val) - Number(val2);
  return isNumber(num) ? Number(num).toFixed(2) : 0;
};

export const additionBtwTowVal = (val, val2) => {
  if (!isNumber(val)) {
    val = 0;
  }
  if (!isNumber(val2)) {
    val2 = 0;
  }
  let num = Number(val) + Number(val2);
  return isNumber(num) ? Number(num).toFixed(2) : 0;
};

/**
 *
 * @param {Number} year
 * @param {Number} month
 * @default This Month Dayes
 * @returns Dayes
 */
export const getMonthDayes = (year, month) => {
  const date = new Date();
  if (isNumber(year) && isNumber(month)) {
    return new Date(year, month, 0).getDate();
  }

  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};
