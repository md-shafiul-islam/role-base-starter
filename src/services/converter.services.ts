import isNumber from "is-number";

class ConverterServices {
  getTotalAmountUsingPercent = (amount: any, rate: any) => {
    if (!isNumber(amount)) {
      amount = 0;
    }
    if (!isNumber(rate)) {
      rate = 0;
    }
    let num = (Number(amount) * Number(rate)) / 100;
    return isNumber(num) ? Number(Number(num).toFixed(2)) : 0;
  };

  getPercentUsingTotalAmount = (totalAmount: any, percentAmount: any) => {
    percentAmount = Number(percentAmount);
    totalAmount = Number(totalAmount);

    let percentage = (percentAmount / totalAmount) * 100;

    if (isNumber(percentage)) {
      return Number(Number(percentage).toFixed(2));
    }

    return 0;
  };

  subtractBtwTowVal = (val: any, val2: any) => {
    if (!isNumber(val)) {
      val = 0;
    }
    if (!isNumber(val2)) {
      val2 = 0;
    }
    let num = Number(val) - Number(val2);
    return isNumber(num) ? Number(Number(num).toFixed(2)) : 0;
  };

  additionBtwTowVal = (val: any, val2: any) => {
    if (!isNumber(val)) {
      val = 0;
    }
    if (!isNumber(val2)) {
      val2 = 0;
    }
    let num = Number(val) + Number(val2);
    return isNumber(num) ? Number(Number(num).toFixed(2)) : 0;
  };

  /**
   *
   * @param {Number} year
   * @param {Number} month
   * @default This Month Dayes
   * @returns Dayes
   */
  getMonthDayes = (year: number, month: number) => {
    const date = new Date();
    if (isNumber(year) && isNumber(month)) {
      return new Date(year, month, 0).getDate();
    }

    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
}

const converterServices = new ConverterServices();

export default converterServices;
