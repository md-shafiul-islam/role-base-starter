import { isBanglaSongkha, isEmptyOrNull } from "./esCheckFunc";
import isNumber from "is-number";
const { enToBnNum, bnToEnNum, enToBnWord, numToBDTWord } = require("bd_number");

export const getObjectKeyByValue = (object, value) => {
  if (!isEmptyOrNull(object) && !isEmptyOrNull(value)) {
    return Object.keys(object).find((key) => object[key] === value);
  }
};

export const getNumToString = (num) => {
  if (!isEmptyOrNull(num)) {
    return Number(num).toString();
  }
  return "0";
};

export const getDigitToBanglaSongkha = (dgits) => {
  if (!isEmptyOrNull(dgits) || dgits == 0) {
    return enToBnNum(dgits);
  }

  if(isEmptyOrNull(dgits)){
    return "০";
  }
  return dgits;
};

export const getDigitToBanglaSongkhaDec = (dgits) => {
  if (!isEmptyOrNull(dgits) || dgits == 0) {
    dgits = Number(dgits);
    if (dgits > 0) {
      dgits = dgits.toFixed(2);
    }
    return enToBnNum(dgits);
  }

  return dgits;
};

export const getSongkhaToDigit = (songkha) => {
  let digits = bnToEnNum(songkha);

  if (isNumber(digits)) {
    return digits;
  }
  return songkha;
};

export const getEsNumber = (textNum) => {
  if (!isEmptyOrNull(textNum)) {
    textNum = Number(textNum);

    if (isNumber(textNum)) {
      return textNum;
    }
  }
  return 0;
};

export const getEsAddNum = (val, val2) => {
  if (!isEmptyOrNull(val) && !isEmptyOrNull(val2)) {
    val = Number(val);
    val2 = Number(val2);
    if (isNumber(val) && isNumber(val2)) {
      return val + val2;
    }
  }
  return 0;
};

export const getCurrenyFormatSongkha = (digits = 0) => {
  if (!isEmptyOrNull(digits)) {
    if (isNumber(digits)) {
      return getCurencyFormat(digits);
    }
  }

  return "০ ৳";
};

export const getCurrenyFormatSongkhaNoStyle = (digits = 0) => {
  if (digits) {
    if (isNumber(digits)) {
      digits = digits.toFixed(2);
      return <b>{enToBnNum(digits)}&#2547;</b>;
    }
    return <b>০&#2547;</b>;
  }

  return "০ ৳";
};

export const getCurrenyFormatSongkhaNoDec = (digits = 0) => {
  if (digits) {
    if (isNumber(digits)) {
      return <b>{enToBnNum(digits)}&#2547;</b>;
    }
    return <b>০&#2547;</b>;
  }
};

export const getCurencyFormat = (amount = 0) => {
  //TODO: Change To Curency
  // //esBackLogger.info("getCurencyFormat amount, ", amount);
  if (isNumber(amount)) {
    amount = Number(amount);
    amount = amount.toFixed(2);
    return <b style={{ fontSize: 15 }}>{enToBnNum(amount)}&#2547;</b>;
  }
  return <b style={{ fontSize: 15 }}>০&#2547;</b>;
};

export const getEsDecFormat = (num, size = 2) => {
  if (num > 0) {
    num = num.toLocaleString("en-US", {
      maximumFractionDigits: size,
      minimumFractionDigits: size,
    });
  }
  return num;
};

export const getFirstLetterCap = (text) => {
  if (!isEmptyOrNull(text)) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  return text;
};

export const getShortText = (text, size = 30) => {
  if (!isEmptyOrNull(text)) {
    if (text.length > size) {
      return `${text.substring(0, size)} [...]`;
    }
  }
  return text;
};

export const getEsEnToBanglaWord = (digits) => {
  if (!isEmptyOrNull(digits)) {
    return (
      <p style={{ textAlign: "left", marginBottom: 5 }}>
        <b>
          মোট টাকা কথায়ঃ{" "}
          <span className="invoice-word">{enToBnWord(digits)} টাকা</span>
        </b>
      </p>
    );
  }
  return "";
};

export const getEsNumToBDWord = (digits) => {
  if (!isEmptyOrNull(digits)) {
    return (
      <p>
        Total amount in word:<span>{numToBDTWord(digits)}</span>
      </p>
    );
  }
  return "";
};

/**
 *
 * @param {Date} date
 * @param {String} spr "/"
 * @returns
 */
export const getEsDateToBangalSongkha = (date, spr = "/") => {
  if (!isEmptyOrNull(date)) {
    date = new Date(date);
    let d = 0,
      m = 0,
      y = 0;

    d = date?.getDate();
    m = date?.getMonth();
    y = date?.getFullYear();

    return (
      <span>
        {getDigitToBanglaSongkha(d)}
        {spr}
        {getDigitToBanglaSongkha(m + 1)}
        {spr}
        {getDigitToBanglaSongkha(y)} ইং.
      </span>
    );
  }
  return date;
};
