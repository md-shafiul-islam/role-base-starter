import React, { useState } from "react";
import { Comment, Avatar, List, Form, Button, Input } from "antd";
import moment from "moment";
import { esFrontLogger } from "@/src/utils/es-loger/esFrontLogger";



const CommentComp = ({ children }) => {
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const CommentList = ({ comments }) => (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
      itemLayout="horizontal"
      renderItem={(props) => <Comment {...props} />}
    />
  );

  const handleSubmit = (e) => {
    esFrontLogger.info("Handel Submit,", e);
  };
  const handleChange = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };
  const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ comment: "" }}
      onFinish={onSubmit}
    >
      <Form.Item name="comment" label="" >
      <Input.TextArea placeholder="Enter your name and query/Opinions" />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
        >
          Add Comment
        </Button>
      </Form.Item>
    </Form>
      
    </>
  );
  return (
    <>
      <Comment
        avatar={
          <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={comment}
            
          />
        }
      >{ children }
      </Comment>
    </>
  );
};

export default CommentComp;
