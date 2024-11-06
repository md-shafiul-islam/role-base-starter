import { isEmptyOrNull } from "../Action/esFunc/gen-es/esCheckFunc";

class AltLocalStore {
  setCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  getLocalCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));

    if (!isEmptyOrNull(cart)) {
      return cart;
    }
    return null;
  };
}

export const altLocalStore = new AltLocalStore();
