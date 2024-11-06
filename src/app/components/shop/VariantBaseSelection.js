"use client";

import React, { useEffect, useState } from "react";
import EsShopUtilAction from "./EsShopUtilAction";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  addCartItem,
  itemAddOrUpdateCart,
} from "@/src/redux/reducer/cartReducer";
import { isEmptyOrNull } from "../utils/Action/esFunc/gen-es/esCheckFunc";
import CstImagePlane from "./CstImagePlane";
import {
  addSelectItem,
  selectChangeImage,
} from "@/src/redux/reducer/productSelectReducer";
import { usePathname, useRouter } from "next/navigation";
import { altLocalStore } from "../utils/Action/localStoreAction";
import { notification } from "antd";
import { sendGTMEvent } from "@next/third-parties/google";
import GoogleTagEvenHandler from "../utils/EsUtils/Google/GoogleTagEvenHandler";

const VariantBaseSelection = ({
  product,
  variants,
  sizes,
  colors,
  standard,
  cartResp,
  id,
  ...props
}) => {
  const { variant } = product;

  const [quantity, setQuantity] = useState(1);
  const [isBuyDisable, setIsBuyDisable] = useState(false);
  const [isCartDisable, setIsCartDisable] = useState(false);
  const [itemColor, setItemColor] = useState(variant?.color);
  const [itemSize, setItemSize] = useState(variant?.size);
  const [isStock, setIsStock] = useState(true);

  const pathname = usePathname();

  const [selectedVariant, setSelectedVariant] = useState(variant);

  const router = useRouter();

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (title, description) => {
    api.open({
      key: "buy-now",
      message: title,
      description,
    });
  };

  useEffect(() => {
    esBackLogger.info("variant , ", variant);
    esBackLogger.info("pathname ", pathname);
  }, [pathname]);

  useEffect(() => {
    altLocalStore.setCart(cartResp);
  }, [cartResp]);

  useEffect(() => {
    props.addSelectItem({ id, variant: selectedVariant });
  }, [selectedVariant]);

  const onDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const onIncrement = () => {
    setQuantity(quantity + 1);
  };

  const onChangQty = (e) => {
    let qty = Number(e.target.value);
    if (!isNaN(qty)) {
      if (selectedVariant.qty >= qty) {
        setQuantity(qty > 1 ? qty : 1);
      } else {
        setQuantity(selectedVariant.qty);
      }
    }
  };

  const onAddToCartAction = () => {
    let cartItem = Object.assign({}, selectedVariant);
    let cartId = !isEmptyOrNull(cartResp?.id) ? cartResp?.id : null;

    if (!isEmptyOrNull(cartId)) {
      const localCart = altLocalStore.getLocalCart();

      //esBackLogger.info("Local Cart ", localCart);

      if (!isEmptyOrNull(localCart.id)) {
        cartId = localCart.id;
      }
    }
    cartItem.product = id;
    cartItem.qty = quantity;
    let subTotal = quantity * cartItem.price;

    props.itemAddOrUpdateCart({
      product: id,
      variant: cartItem.id,
      cart: cartId,
      price: cartItem.price,
      qty: quantity,
      subTotal,
    });
  };

  const onBuyNowAction = () => {
    openNotificationWithIcon("Please wait");
    onAddToCartAction();
    router.push(`/cart`);
  };

  const onSizeSelectAction = (sz) => {
    setItemSize(sz);
    changeVariantViaSize(sz);
  };

  const onColorSelectAction = (color) => {
    setItemColor(color);
    changeVariantViaColor(color);
    props.selectChangeImage({ id, url: color.imageUrl });
  };

  const onWishAction = () => {
    //esBackLogger.info("Select Item ", selectedVariant);
  };

  const changeVariantViaColor = (color) => {
    if (!isEmptyOrNull(selectedVariant) && !isEmptyOrNull(color)) {
      if (!isEmptyOrNull(selectedVariant.color)) {
        if (selectedVariant.color.value !== color.value) {
          let matchVariant = undefined;
          variants.forEach((variant) => {
            if (!isEmptyOrNull(variant.color) && !isEmptyOrNull(variant.size)) {
              if (variant.color.value === color.value) {
                if (variant.size.value === selectedVariant.size.value) {
                  matchVariant = variant;
                }
              }
            }
          });

          if (!isEmptyOrNull(matchVariant)) {
            setSelectedVariant(matchVariant);
            if (matchVariant.qty > 0) {
              setIsStock(true);
            } else {
              setIsStock(false);
            }
          } else {
            setSelectedVariant({ ...selectedVariant, color });
            setIsStock(false);
          }
        }
      }
    }
  };

  const changeVariantViaSize = (size) => {
    if (!isEmptyOrNull(selectedVariant) && !isEmptyOrNull(size)) {
      if (!isEmptyOrNull(selectedVariant.size)) {
        if (selectedVariant.size.value !== size.value) {
          let matchVariant = undefined;

          variants.forEach((variant) => {
            if (!isEmptyOrNull(variant.size)) {
              if (variant.size.value === size.value) {
                if (!isEmptyOrNull(selectedVariant.color)) {
                  if (selectedVariant.color.value === variant.color.value) {
                    matchVariant = variant;
                  }
                }
              }
            }
          });

          if (!isEmptyOrNull(matchVariant)) {
            setSelectedVariant(matchVariant);
            if (matchVariant.qty > 0) {
              setIsStock(true);
            } else {
              setIsStock(false);
            }
          } else {
            setIsStock(false);
            setSelectedVariant({ ...selectedVariant, size });
          }
        }
      }
    }
  };

  useEffect(() => {
    setIsBuyDisable(!isStock);
    setIsCartDisable(!isStock);
  }, [isStock]);

  return (
    <React.Fragment>
      {contextHolder}
      <div className="price w-full box-border">
        <div className="">
          <h2 className="text-3xl font-semibold">
            <b> &#2547;</b>{" "}
            {variant?.discountPrice > 0
              ? variant?.discountPrice
              : variant?.price}{" "}
            {variant?.discountPrice > 0 ? (
              <sup>
                <span className="strikediag text-xl text-gray-500">
                  <b> &#2547;</b> {variant?.price}
                </span>
              </sup>
            ) : (
              ""
            )}{" "}
          </h2>
        </div>
      </div>
      <div className="w-full box-border flex flex-col gap-3">
        <h5 className="text-lg font-medium">Colors:</h5>
        <ul className="flex flex-row items-center gap-5">
          {colors?.map((color) => {
            return (
              <li
                className="cursor-pointer gap-1"
                onClick={() => {
                  onColorSelectAction(color);
                }}
              >
                <div
                  className={`ring-2 ring-gray-500 p-1 ${
                    itemColor?.value === color?.value ? "ring-teal-400" : ""
                  }`}
                >
                  <CstImagePlane
                    src={color?.imageUrl}
                    alt={color?.name}
                    height={50}
                    width={50}
                  />
                </div>
                <div className="mt-1">{color?.name}</div>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="w-full box-border gap-3 flex flex-col">
        <h5 className="text-lg font-medium">Size: {standard?.name}</h5>
        <ul className="flex flex-row items-center gap-5 text-center font-bold ">
          {sizes?.map((size) => {
            return (
              <li
                onClick={() => {
                  onSizeSelectAction(size);
                }}
                className={`cursor-pointer ring-2 ring-gray-500 w-12 hover:ring-orange-600 hover:text-orange-600 ${
                  size.value === itemSize.value ? "ring-teal-400" : ""
                }`}
              >
                {size?.name}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="w-full box-border flex flex-row items-center gap-2">
        <h2 className="text-lg font-medium">Quantity</h2>
        <div className="text-gray-400 bg-gray-300 cursor-pointer">
          <button
            className="text-gray-400 bg-gray-300 px-3 py-1 disabled:cursor-not-allowed"
            onClick={onDecrement}
            disabled={!isStock}
          >
            <i className="fa-solid fa-minus"></i>
          </button>
        </div>
        <div className="w-10  bg-gray-300 px-3 py-1">
          <input
            className="w-full focus:outline-none text-center font-medium bg-gray-300 disabled:cursor-not-allowed"
            type="text"
            onChange={onChangQty}
            value={quantity}
            disabled={!isStock}
          />
        </div>
        <div className="text-gray-400 bg-gray-300">
          <button
            className=" px-3 py-1 disabled:cursor-not-allowed"
            onClick={onIncrement}
            disabled={!isStock}
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
      <EsShopUtilAction
        onAddCart={onAddToCartAction}
        onBuyNow={onBuyNowAction}
        onWish={onWishAction}
        isCartDisable={isCartDisable}
        isBuyDisable={isBuyDisable}
      />
      <GoogleTagEvenHandler
        eventType="select_item"
        product={product}
        selctItem={selectedVariant}
        quantity={quantity}
      />
      <GoogleTagEvenHandler eventType="onProductView" product={product} />
    </React.Fragment>
  );
};

VariantBaseSelection.propTypes = {
  cartResp: PropTypes.object,
  addCartItem: PropTypes.func.isRequired,
  itemAddOrUpdateCart: PropTypes.func.isRequired,
  addSelectItem: PropTypes.func.isRequired,
  selectChangeImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    cartResp: state.cart.cart,
  };
};

const mapDispatchToProps = {
  addCartItem,
  itemAddOrUpdateCart,
  addSelectItem,
  selectChangeImage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VariantBaseSelection);
