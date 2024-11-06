import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addCartItem } from "../../../redux/reducer/cartReducer";

const EsShopUtilAction = ({
  onAddCart,
  onBuyNow,
  onWish,
  isCartDisable,
  isBuyDisable,
  ...props
}) => {
  return (
    <React.Fragment>
      <div className="flex flex-row items-center gap-3 box-border  font-extrabold sm:font-semibold xxs:font-medium xs:font-semibold  text-xl xs:text-lg text-white my-3">
        {!isBuyDisable ? (
          <button
            onClick={onBuyNow}
            className="w-2/4  p-2 bg-orange-700 hover:bg-orange-900 disabled:cursor-not-allowed disabled:opacity-30  transition-colors duration-300 ease-linear "
            disabled={isBuyDisable}
          >
            Buy Now
          </button>
        ) : (
          <button
            onClick={onWish}
            className="w-2/4  p-2 bg-gray-600 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-30  transition-colors duration-300 ease-linear "
          >
            <i className="fa-regular fa-heart"></i> Add to wish list
          </button>
        )}
        <button
          onClick={onAddCart}
          disabled={isCartDisable}
          className="w-2/4 p-2 ring-2 text-green-800 ring-green-800 hover:bg-green-800 hover:text-white transition-colors duration-300 ease-linear disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-green-800"
        >
          Add To Cart
        </button>
      </div>
    </React.Fragment>
  );
};

export default EsShopUtilAction;
