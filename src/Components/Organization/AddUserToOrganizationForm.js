import { isEmptyOrNull } from "@/src/app/components/utils/Action/esFunc/gen-es/esCheckFunc";
import { thunkAllUser } from "@/src/redux/reducer/userReducer";
import { Button, Card, Form, Select } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const { Option } = Select;

export const AddUserToOrganizationForm = ({
  title = "Add User to Organization",
  usersResp,
  selectUsers,
  btnText = "Add User",
  onSubmitAction,
  onFailedAction,
  ...props
}) => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (isEmptyOrNull(usersResp)) {
      props.thunkAllUser();
    }
  }, []);

  useEffect(() => {
    setUsers(usersResp);
  }, [usersResp]);

  useEffect(() => {
    if (!isEmptyOrNull(selectUsers)) {
      setUser(selectUsers[0]);
    }
  }, [selectUsers]);
  console.log("AddUserToOrganizationForm users, ", selectUsers);
  return (
    <React.Fragment>
      <Card
        title={title}
        extra={
          <span className="font-medium text-green-600">
            Name: {user?.name} {user?.phoneNo}
          </span>
        }
      >
        <Form
          initialValues={{ user: "" }}
          onFinish={onSubmitAction}
          onFinishFailed={onFailedAction}
        >
          <Form.Item
            label="User:"
            name="user"
            rules={[
              {
                required: true,
                message: "Select User ",
              },
            ]}
          >
            <Select
              placeholder="Select One User"
              showSearch={true}
              optionFilterProp="children"
              filterOption={(input, option) =>
                option?.children?.toLowerCase().indexOf(input.toLowerCase()) >=
                0
              }
            >
              {users &&
                users.map((item) => {
                  return (
                    <Option key={`use-${item.id}`} value={item.id}>
                      {`${item.name} ${item?.phoneNo}`}
                    </Option>
                  );
                })}
            </Select>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 8,
            }}
          >
            <Button type="primary" htmlType="submit">
              {btnText}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </React.Fragment>
  );
};

AddUserToOrganizationForm.propTypes = {
  usersResp: PropTypes.object,
  thunkAllUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    usersResp: state.user.users,
  };
};

const mapDispatchToProps = {
  thunkAllUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUserToOrganizationForm);
