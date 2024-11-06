export const isEmptyOrNull = (obj) => {
  if ((obj === undefined && obj === null) || obj === `null`) {
    return true;
  }

  if (typeof obj === "undefined" || obj == `null`) {
    return true;
  }

  if (obj === undefined || obj === "undefined") {
    return true;
  }
  if (
    obj === null ||
    obj === undefined ||
    typeof obj === "undefined" ||
    obj === "" ||
    obj == `null`
  ) {
    return true;
  }

  if (Object.keys(obj).length === 0 && obj.constructor === Object) {
    return true;
  }

  if (Array.isArray(obj)) {
    if (obj.length > 0) {
      return false;
    }

    return true;
  }

  if (obj) {
    return false;
  }
  return true;
};

export const esIsArray = (list) => {
  if (!isEmptyOrNull(list)) {
    return Array.isArray(list);
  }
  return false;
};

export const esHelperOnlyDate = (date) => {
  if (date) {
    date = new Date(date);

    return date.toDateString();
  }
  return "";
};

/**
 *
 * @param {*} date
 * @returns Date as String Thu, 25 Nov 2021
 */
export const esUtilGetDate = (date = new Date()) => {
  let strDate = date.toUTCString().substring(0, 17);

  return strDate;
};

export const isBanglaSongkha = (songkha) => {
  const regEx = /^[০-৯]+(?:\.[০-৯]+)?$/gm;

  return regEx.test(songkha);
};

/**
 *
 * @param {tokenDate} expiresDate
 * @returns true is Expires
 */
export const isTokenExpires = (expiresDate) => {
  const dateOne = new Date(expiresDate);
  const dateSc = new Date();

  if (dateOne < dateSc) {
    return true;
  }
  return false;
};
