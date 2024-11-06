export const getGenaretedRangeItems = (start = 0, rangeEnd = 350000) => {
  const ranges = [];
  let index = start;
  let status = true;

  while (status) {
    let range = { start: index, end: 0 };
    if (index < 25000) {
      if (index === 0) {
        range.start = index;
      } else {
        range.start = index + 1;
      }
      range.end = index + 5000;
      index = index + 5000;
    } else if (index >= 25000 && index < 55000) {
      range.start = index + 1;
      range.end = index + 10000;
      index = index + 10000;
    } else if (index >= 55000 && index < 95000) {
      range.start = index + 1;
      range.end = index + 20000;
      index = index + 20000;
    } else if (index >= 95000 && index <= rangeEnd) {
      range.start = index + 1;
      range.end = index + 30000;
      index = index + 30000;
    } else if (30000 + rangeEnd >= index) {
      range.start = index + 1;
      range.end = index + 30000;
      index = index + 30000;
    }

    ranges.push(range);
    if (index >= rangeEnd) {
      status = false;
    }
  }

  return ranges;
};
