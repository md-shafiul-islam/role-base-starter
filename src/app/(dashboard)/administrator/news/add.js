import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Form } from "antd";
import LoadingSpiner from "../../../component/EsUtils/LoadingSpiner";

import NewsForm from "../../../component/News/NewsForm";
import { addNewsAction } from "../../../redux/action/newsAction";

export const addNewsPage = ({ addGenericResp, ...props }) => {
  const [form] = Form.useForm();

  const [readyStatus, setReadyStatus] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(false);

  useEffect(() => {
    setReadyStatus(true);
  }, []);

  const initialValues = {
    newsAlias: "",
    title: "",
    user: null,
    metaDatas: [{ name: "", content: "" }],
    content: "",
    shortContent: "",
    images: [
      {
        name: "",
        altTag: "",
        title: "",
        location: "",
        imageUrl: "",
        imageFile: null,
      },
    ],
    company: "",
    category: "",
  };

  const onSubmitAction = (values) => {
    esBackLogger.info("New onSubmitAction ", values);

    props.addNewsAction(values);
    setSubmitStatus(true);
  };

  const onSubmitFailed = (values) => {};

  if (!readyStatus) {
    return <LoadingSpiner />;
  }

  return (
    <React.Fragment>
      <NewsForm
        initForm={form}
        name={`addNews`}
        title={`Add News`}
        initialValues={initialValues}
        onSubmitAction={onSubmitAction}
        onSubmitFailed={onSubmitFailed}
      />
    </React.Fragment>
  );
};

addNewsPage.propTypes = {
  addNewsResp: PropTypes.object,
  addNewsAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    // addNewsResp: state.news.newsAdd,
  };
};

const mapDispatchToProps = { addNewsAction };

export default connect(mapStateToProps, mapDispatchToProps)(addNewsPage);
