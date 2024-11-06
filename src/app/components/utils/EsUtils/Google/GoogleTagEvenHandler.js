"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { useEffect } from "react";
import { sendGTMEvent } from "@next/third-parties/google";
import { isEmptyOrNull } from "../../Action/esFunc/gen-es/esCheckFunc";

const GoogleTagEvenHandler = ({
  eventType = "",
  product,
  selctItem,
  quantity,
  ...props
}) => {
  const pathname = usePathname();

  useEffect(() => {
    if (!isEmptyOrNull(product)) {
      const { variant, category, brand, images, materials } = product;
      sendGTMEvent({
        event: eventType,
        page_title: product?.title,
        page_location:pathname,
        ecommerce: {
          currency: "BDT",
          value: variant?.price,

          items: [
            {
              item_id: variant?.sku,

              item_name: product?.title,

              item_category: category?.name,
              item_variant: variant?.color?.name,
              price: variant?.price,

              size: variant?.size?.name,
            },
          ],
        },
      });
    }
  }, [product, pathname]);

  useEffect(() => {
    if ("select_item" === eventType) {
      if (!isEmptyOrNull(selctItem)) {
        // esBackLogger.info("selctItem, ", selctItem);
        const { variant, category, brand, images, materials } = product;
        sendGTMEvent({
          event: eventType,
          ecommerce: {
            item_id: variant?.sku,
            currency: "BDT",
            item_name: product?.title,
            quantity: quantity,
            index: 0,
            item_category: category?.name,
            item_variant: variant?.color?.name,
            price: variant?.price,

            size: variant?.size?.name,
          },
        });
      }
    }
  }, [selctItem]);
  return <React.Fragment>&nbsp;</React.Fragment>;
};

export default GoogleTagEvenHandler;
