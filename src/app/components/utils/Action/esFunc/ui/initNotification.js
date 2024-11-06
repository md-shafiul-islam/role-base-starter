import { notification, Spin } from "antd";
import {
  QuestionCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

const getNotificationIcon = (type) => {
  if (type === "success") {
    return <CheckCircleOutlined style={{ color: "#52c41a" }} />;
  } else if (type === "info") {
    return <InfoCircleOutlined style={{ color: "#096dd9" }} />;
  } else if (type === "warning") {
    return <ExclamationCircleOutlined style={{ color: "#faad14" }} />;
  } else if (type === "login") {
    return <Spin />;
  } else if (type === "error") {
    return <CloseCircleOutlined style={{ color: "#f5222d" }} />;
  }  else {
    return <QuestionCircleOutlined style={{ color: "#531dab" }} />;
  }
};

/**
 *  success, info, warning, error
 * @param {String} type
 * @param {String} message
 * @param {String} description
 */
export const getNotificationWithIcon = (type, message, description) => {
  notification[type]({
    message: message,
    description: description,
  });
};

export const getUpdatedNotification = (type, key, message, description) => {
  notification.open({
    key,
    message: message,
    description: description,
    icon: getNotificationIcon(type),
  });
};
