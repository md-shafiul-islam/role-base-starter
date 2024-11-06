import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Form } from "antd";

import BlogForm from "../../../component/Blog/BlogForm";
import { addBlogAction } from "../../../redux/action/brandAction";
import LoadingSpiner from "../../../component/EsUtils/LoadingSpiner";

export const addBlogPage = ({ addBlogResp, ...props }) => {
  const [form] = Form.useForm();

  const [readyStatus, setReadyStatus] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(false);

  useEffect(() => {
    setReadyStatus(true);
  }, []);

  const initialValues = {
    aliasName: "",
    title: "",
    content: "",
    company: "",
    category: "",
    metaDatas: [{ name: "", content: "" }],
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
  };

  const onSubmitAction = (values) => {
    esBackLogger.info("Blog onSubmitAction ", values);

    props.addBlogAction(values);
    setSubmitStatus(true);
  };

  const onSubmitFailed = (values) => {};

  if (!readyStatus) {
    return <LoadingSpiner />;
  }

  return (
    <React.Fragment>
      <BlogForm
        initForm={form}
        name={`addBlogs`}
        title={`Add Blogs`}
        initialValues={initialValues}
        onSubmitAction={onSubmitAction}
        onSubmitFailed={onSubmitFailed}
      />
    </React.Fragment>
  );
};

addBlogPage.propTypes = {
  addBlogResp: PropTypes.object,
  addBlogAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    addBlogResp: state.blog.blogAdd,
  };
};

const mapDispatchToProps = { addBlogAction };

export default connect(mapStateToProps, mapDispatchToProps)(addBlogPage);
