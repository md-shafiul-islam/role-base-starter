import EsButton from "../../component/EsUtils/EsButton";
import { isEmptyOrNull } from "../gen-es/esCheckFunc";

export const esBakToTop = (obj) => {
  if (typeof obj !== "undefined" && typeof document !== "undefined") {
    document.body.scrollTop = 250;
    document.documentElement.scrollTop = 250;

    if (window.innerWidth <= 1000) {
      document.body.scrollTop = 400;
      document.documentElement.scrollTop = 400;
    }
  }
};

export const esPagingNextPrev = (_, type, originalElement) => {
  if (type === "prev") {
    return <EsButton type="success" text="Previous" />;
  }
  if (type === "next") {
    return <EsButton type="success" text="Next" />;
  }
  return originalElement;
};

export const esIsCompareChecked = (item, items) => {
  if (Array.isArray(items) && !isEmptyOrNull(item)) {
    if (items.includes(item.publicId)) {
      return true;
    }
  }
  return false;
};

