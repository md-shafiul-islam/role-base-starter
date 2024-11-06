import React, { useEffect } from "react";
import { LeftSquareOutlined, RightSquareOutlined } from "@ant-design/icons";
import CstImage from "../CstView/CstImage";
import { isEmptyOrNull } from "../../utils/gen-es/esCheckFunc";

const SinglePageEasyCarousel = ({
  items = [],
  auto = false,
  intervelTime = 5000,
  ...params
}) => {
  let carouselInterval = null;
  useEffect(() => {
    if (typeof document !== "undefined") {
      const sliderItems = document.querySelectorAll(
        ".easy-carousel-items .easy-carousel-item"
      );
      const btnPrev = document.querySelector(
        ".easy-carousel-btn-container #prev"
      );
      const btnNext = document.querySelector(
        ".easy-carousel-btn-container #next"
      );

      btnNext.addEventListener("click", () => {
        easyCarouselNextAction(sliderItems);
      });

      btnPrev.addEventListener("click", () => {
        easyCarouselPrevAction(sliderItems);
      });

      const sliderSelectors = document.querySelector(
        ".easy-carousel-selector-container .easy-carousel-selector-items"
      );
      createSelectorItems(sliderSelectors, sliderItems.length);

      if (auto) {
        carouselInterval = setInterval(() => {
          easyCarouselNextAction(sliderItems);
        }, intervelTime);
      }
    }
  }, []);

  const createSelectorItems = (selectorContainers, size) => {
    if (!isEmptyOrNull(selectorContainers) && size > 0) {
      for (let index = 0; index < size; index++) {
        const item = document.createElement("div");
        item.innerHTML = "&nbsp;";
        item.classList.add("slider-selector-item");

        item?.addEventListener("click", () => {
          setVisibleSliderItemByPosition(index);
        });
        selectorContainers.appendChild(item);
      }
    }
  };

  const setVisibleSliderItemByPosition = (idx) => {
    const sliderItems = document.querySelectorAll(
      ".easy-carousel-items .easy-carousel-item"
    );

    if (sliderItems[idx]) {
      sliderItems.forEach((item) => {
        item.classList.remove("current");
      });
      sliderItems[idx].classList.add("current");
    }
  };

  const easyCarouselPrevAction = (items) => {
    let curentIdx = 0;
    items.forEach((item, idx) => {
      if (item.classList.contains("current")) {
        if (idx === 0) {
          curentIdx = items.length - 1;
        } else {
          curentIdx = idx - 1;
        }
      }
      item.classList.remove("current");
    });
    items[curentIdx].classList.add("current");
    if (auto) {
      clearInterval(carouselInterval);
      carouselInterval = setInterval(() => {
        easyCarouselNextAction(items);
      }, intervelTime);
    }
  };

  const easyCarouselNextAction = (sliderItems) => {
    let curentIdx = 0;
    sliderItems.forEach((item, idx) => {
      if (item.classList.contains("current")) {
        if (idx === sliderItems.length - 1) {
          curentIdx = 0;
        } else {
          curentIdx = idx + 1;
        }
      }
      item.classList.remove("current");
    });
    sliderItems[curentIdx]?.classList?.add("current");
    if (auto) {
      clearInterval(carouselInterval);
      carouselInterval = setInterval(() => {
        easyCarouselNextAction(sliderItems);
      }, intervelTime);
    }
  };

  return (
    <React.Fragment>
      <div className="easy-carousel-container">
        <div className="easy-carousel-items ">
          {items?.map((item, idx) => {
            if (!isEmptyOrNull(item)) {
              return (
                <div
                  className={`easy-carousel-item ${idx === 0 ? "current" : ""}`}
                  key={`easy-carousel-${idx}`}
                >
                  <div className="slider-content-area">
                    <div className="slider-content">
                      {item.title ? item.title : item.name}
                    </div>
                    <CstImage
                      altTag={item?.altTag}
                      title={item?.title}
                      to={item?.location}
                      className="single-page-carousel"
                    />
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="easy-carousel-btn-container">
          <div className="easy-carousel-btn" id="prev">
            <LeftSquareOutlined />
          </div>
          <div className="easy-carousel-btn" id="next">
            <RightSquareOutlined />
          </div>
        </div>
        <div className="easy-carousel-selector-container">
          <div className="easy-carousel-selector-items"></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SinglePageEasyCarousel;
