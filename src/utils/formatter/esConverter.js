import CstActionLink from "@/src/app/components/utils/Action/CstActionLink";
import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import isNumber from "is-number";

export const getStingToArray = (arrayString, sprt) => {
  if (!isEmptyOrNull(arrayString)) {
    const strArray = arrayString.split(sprt);

    return strArray;
  }
  return [];
};

export const responseFormater = (response, message, status = false) => {
  const data = { response, message, status };
  return JSON.stringify(data, null, 2);
};

export const readMoreStr = (text, size, action) => {
  let shortText = "";
  if (!isEmptyOrNull(text)) {
    if (text.length > size) {
      shortText = text.substring(0, size);
      shortText = `${shortText}... `;
    } else {
      shortText = text.length > 0 ? `${text}... ` : text;
    }
  }

  return (
    <>
      <span>{shortText}</span>
      <span>
        <CstActionLink
          icon={<i className="fa-regular fa-circle-arrow-right"></i>}
          name={shortText.length > 0 ? `more` : `Details`}
          to={action}
        />
      </span>
    </>
  );
};

export const getTextShorter = (text, size = 0) => {
  if (!isEmptyOrNull(text)) {
    if (text.length > size) {
      return `${text.substring(0, size)} ...`;
    }
  }
  return text;
};

export const getAliasName = (text) => {
  if (!isEmptyOrNull(text)) {
    return text.replaceAll(" ", "-");
  }
  return "";
};

export const getLowerCase = (text) => {
  if (!isEmptyOrNull(text)) {
    return text.toLowerCase();
  }
  return "";
};

export const getReplaceStr = (text, test, value) => {
  if (!isEmptyOrNull(text)) {
    return text.replaceAll(test, value);
  }

  return text;
};

export const esGetNumber = (value) => {
  if (!isEmptyOrNull(value)) {
    let num = Number(value);

    num = isNumber(num) ? num : 0;
    return num;
  }
};

export const prePopulateCompareItem = (compareItems = [], specKeys) => {
  const itemsCol = [
      {
        key: `title`,
        title: `Specifications`,
      },
    ],
    itemsRows = [];
  if (!isEmptyOrNull(compareItems)) {
    let itemRow = { title: `Price` },
      itemRowImage = { title: `Image` };

    compareItems.forEach((item, idx) => {
      itemsCol.push({
        key: `compItem_${idx}`,
        title: item.title,
      });
      itemRow[`compItem_${idx}`] = item.price;
      itemRowImage[`compItem_${idx}`] = item.imageUrl;
    });
    itemsRows.push(itemRowImage);
    itemsRows.push(itemRow);

    if (Array.isArray(specKeys)) {
      if (specKeys.length > 0) {
        specKeys.forEach((spcKey) => {
          if (!isEmptyOrNull(spcKey)) {
            const itemRow = {};
            itemRow.title = spcKey.name;
            compareItems.forEach((item, cmpId) => {
              itemRow[`compItem_${cmpId}`] = "";
              if (!isEmptyOrNull(item)) {
                item.specifications?.forEach((itemSpec, sId) => {
                  if (spcKey.value === itemSpec?.key?.value) {
                    itemRow[`compItem_${cmpId}`] = itemSpec.value;
                    itemRow[`spcKey`] = itemSpec?.key?.type;
                  }
                });
              }
            });

            itemsRows.push(itemRow);
          }
        });
      }
    }
  }

  return { itemsCol, itemsRows };
};
