const monthNames = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];
const weekDays = [
  "রবিবার",
  "সোমবার",
  "মঙ্গলবার",
  "বুধবার",
  "বৃহস্পতিবার",
  "শুক্রবার",
  "শনিবার",
];

const digits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

let banglas;

const createBanglas = () => {
  banglas = digits.reduce((o, c, i) => {
    o[c] = i;
    return o;
  }, {});
};

export const digitToBangla = (number) =>
  String(number).replace(/\d/g, (digit) => digits[digit]);

export const banglaToDigit = (bangla) => {
  if (!banglas) createBanglas(); // memoize
  const month = monthNames.indexOf(bangla);
  const str =
    month !== -1
      ? month + 1
      : String(bangla).replace(/./g, (bangla) => {
          const r = banglas[bangla];
          return r !== undefined ? r : bangla;
        });
  return Number(str);
};

export const weekDay = (day) => weekDays[day];

export const monthName = (month) => monthNames[month - 1];

/**
 *
 * @param {Date | null} date
 */
export const getEsDateToBangalSongkhaDayTime = (date = null) => {
  if (date != null) {
    date = new Date(date);
  }
  if (date != null) {
    let day = "",
      month = "",
      d = 0,
      h = 0,
      mint = 0,
      y = 0;
    day = weekDay(date.getDay());
    month = monthName(date.getMonth());
    d = digitToBangla(date.getDate());
    h = digitToBangla(date.getHours());
    mint = digitToBangla(date.getMinutes());
    y = digitToBangla(date.getFullYear());

    return <span>{`সময়ঃ ${h}:${mint}, ${day}, ${d} ${month} ${y}`}</span>;
  }

  return date;
};

/**
 *
 * @param {Date | null} date
 */
export const getEsDateToBangalSongkhaDay = (date = null) => {
  if (date != null) {
    date = new Date(date);
  }
  if (date != null) {
    let day = "",
      month = "",
      d = 0,
      h = 0,
      mint = 0,
      y = 0;
    day = weekDay(date.getDay());
    month = monthName(date.getMonth());
    d = digitToBangla(date.getDate());
    h = digitToBangla(date.getHours());
    mint = digitToBangla(date.getMinutes());
    y = digitToBangla(date.getFullYear());

    return <span>{`${day}, ${d} ${month} ${y} ইং.`}</span>;
  }

  return date;
};
