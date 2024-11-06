"use client";
import React, { useEffect } from "react";
import CstImagePlane from "../../shop/CstImagePlane";

const CartItems = ({ items = [], onRemoveAction, onIncrement, onDecrement, ...props }) => {
  return (
    <React.Fragment>
      <div className="flex flex-col justify-center">
        <div className="flex flex-row-reverse gap-4  border-b border-gray-700 py-1 font-semibold items-start">
          <div className="w-20 ">Item Total</div>
          <div className="w-6">Qty</div>
        </div>
        {items &&
          items.map((item) => {
            return (
              <div className="flex flex-row gap-4  border-b border-gray-700 py-1">
                <div className="w-14 self-start">
                  <CstImagePlane
                    src={item?.image}
                    alt={item?.name}
                    height={50}
                    width={50}
                  />
                </div>
                <div className="w-full flex flex-col gap-1">
                  <div className="flex items-start border-b border-dashed border-gray-500">
                    <h4 className="text-sm font-bold"> {item?.title}</h4>
                  </div>
                  <div className="w-full flex flex-row items-center gap-2">
                    <div className="w-14">{item?.color}</div>
                    <div className="w-6">{item?.size}</div>
                    <div className="text-nowrap">
                      {item?.discountPrice > 0 ? (
                        <>
                          <span className="text-gray-950 font-bold">
                            <b> &#2547;</b>
                            {item?.discountPrice}
                          </span>

                          <span>
                            <sup className="strikediag font-semibold">
                              <b> &#2547;</b> {item?.price}
                            </sup>
                          </span>
                        </>
                      ) : (
                        <span className="text-gray-950 font-semibold">
                          <b> &#2547;</b> {item?.price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className=" flex flex-row items-center justify-between">
                  <div className="w-6 flex flex-col items-center justify-between font-semibold">
                    <span
                      onClick={() => {
                        if (item.stkQty > item?.qty) {
                          onIncrement(item);
                        }
                      }}
                      className={` ${
                        item?.qty >= item.stkQty
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-800 cursor-pointer hover:text-gray-950"
                      } `}
                    >
                      <i className="fa-solid fa-angle-up"></i>
                    </span>
                    <span>{item?.qty}</span>
                    <span
                      onClick={() => {
                        if (item.qty > 1) {
                          onDecrement(item);
                        }
                      }}
                      className={`${
                        item?.qty <= 1
                          ? "text-gray-300 cursor-not-allowed"
                          : "text-gray-800 hover:text-gray-950 cursor-pointer"
                      } `}
                    >
                      <i className="fa-solid fa-angle-down"></i>
                    </span>
                  </div>
                  <div className="w-16 text-center">{item?.subTotal}</div>
                  <div
                    className="w-4 cursor-pointer"
                    onClick={() => {
                      onRemoveAction(item);
                    }}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </React.Fragment>
  );
};

export default CartItems;
