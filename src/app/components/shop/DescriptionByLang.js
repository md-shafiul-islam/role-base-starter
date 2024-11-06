import { Card } from "antd";
import React from "react";

const DescriptionByLang = ({
  lang = "eng",
  descriptions,
  title = "",
  ...porps
}) => {
  let content = <div></div>;

  descriptions &&
    descriptions.forEach((description) => {
      if (description.lang === lang) {
        content = (
          <div dangerouslySetInnerHTML={{ __html: description.content }}></div>
        );
      }
    });

  return (
    <React.Fragment>
      <Card>
        <div className="py-2 px-4">
          <div>
            <h3 className="text-xl sm:text-lg xs:text-base xxs:text-xs md:text-xl font-semibold">
              {title}
            </h3>
          </div>
          <div className="text-base">{content}</div>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default DescriptionByLang;
