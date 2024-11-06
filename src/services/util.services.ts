import cryptoRandomString from "crypto-random-string";
import { isEmptyOrNull } from "../app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { esBackLogger } from "@/src/utils/es-loger/es.back.logger";
import isNumber from "is-number";

const { enToBnNum, bnToEnNum, enToBnWord, numToBDTWord } = require("bd_number");

class UtilServices {
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  getRandomChar = (size = 5) => {
    return cryptoRandomString({ length: size, characters: this.characters });
  };

  getRandomNum = (size = 5) => {
    return cryptoRandomString({ length: size, type: "numeric" });
  };

  convertDocToObj = (doc: any) => {
    if (!isEmptyOrNull(doc)) {
      if (!isEmptyOrNull(doc._id)) {
        doc._id = doc._id.toString();
      }

      if (doc.createdAt) {
        doc.createdAt = doc.createdAt.toString();
      }

      if (doc.createdAt) {
        doc.updatedAt = doc.createdAt.toString();
      }
    }
    return doc;
  };

  isEqualObjId = (one: any, test: any) => {
    if (!isEmptyOrNull(one) && !isEmptyOrNull(test)) {
      one = one.toString();
      test = test.toString();

      if (one === test) {
        return true;
      }
    }

    return false;
  };

  isStringEqualFirstIsNotNull = (one: any, test: any) => {
    if (!isEmptyOrNull(one)) {
      one = one.toString();
      test = test.toString();

      if (one === test) {
        return true;
      }
    }

    return false;
  };

  str2bool = (value: string) => {
    if (value && typeof value === "string") {
      if (value.toLowerCase() === "true") return true;
      if (value.toLowerCase() === "false") return false;
    }
    return value;
  };

  lowReplaceAll(text: string, match = " ", repChar = "_"): any {
    if (!isEmptyOrNull(text)) {
      text = text.toLocaleLowerCase();
      text = text.replaceAll(match, repChar);
    }
    return text;
  }

  toAliasName(text: any): any {
    if (!isEmptyOrNull(text)) {
      text = this.lowReplaceAll(text, " ", "-");
      text = this.lowReplaceAll(text, "/", "-");
      text = this.lowReplaceAll(text, "\\", "-");
      text = this.lowReplaceAll(text, ":", "-");
      text = this.lowReplaceAll(text, ",", "-");

      return text;
    }
    return "";
  }

  getNumToString = (num: number) => {
    if (!isEmptyOrNull(num)) {
      return Number(num).toString();
    }
    return "0";
  };

  getDigitToBanglaSongkha = (dgits: number) => {
    if (!isEmptyOrNull(dgits) || dgits == 0) {
      return enToBnNum(dgits);
    }

    if (isEmptyOrNull(dgits)) {
      return "০";
    }
    return dgits;
  };

  getDigitToBanglaSongkhaDec = (dgits) => {
    if (!isEmptyOrNull(dgits) || dgits == 0) {
      dgits = Number(dgits);
      if (dgits > 0) {
        dgits = dgits.toFixed(2);
      }
      return enToBnNum(dgits);
    }

    return dgits;
  };

  getSongkhaToDigit = (songkha) => {
    let digits = bnToEnNum(songkha);

    if (isNumber(digits)) {
      return digits;
    }
    return songkha;
  };

  getEsNumber = (textNum) => {
    if (!isEmptyOrNull(textNum)) {
      textNum = Number(textNum);

      if (isNumber(textNum)) {
        return textNum;
      }
    }
    return 0;
  };

  getEsAddNum = (val, val2) => {
    if (!isEmptyOrNull(val) && !isEmptyOrNull(val2)) {
      val = Number(val);
      val2 = Number(val2);
      if (isNumber(val) && isNumber(val2)) {
        return val + val2;
      }
    }
    return 0;
  };


  getFirstLetterCap = (text) => {
    if (!isEmptyOrNull(text)) {
      return text.charAt(0).toUpperCase() + text.slice(1);
    }
    return text;
  };

  getShortText = (text, size = 30) => {
    if (!isEmptyOrNull(text)) {
      if (text.length > size) {
        return `${text.substring(0, size)} [...]`;
      }
    }
    return text;
  };

  getHiddenNo = ({ text, start = 3, end = 3 }) => {
    if (!isEmptyOrNull(text)) {
      text = text.toString();
      let firstSeg = text.substring(0, start);
      let lastSeg = text.substring(text.length - end);
      return `${firstSeg}*****${lastSeg}`;
    }
    return "";
  };
}

const utilServices = new UtilServices();

export default utilServices;
