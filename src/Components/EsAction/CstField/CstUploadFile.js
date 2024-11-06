import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      return resolve(reader.result);
    };

    reader.onerror = (error) => {
      return reject(error);
    };
  });

const CstUploadFile = ({ onChangeAction, imgLoc = "images", ...props }) => {
  const [previewVisible, setPreviewVisible] = useState(false);

  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [upFile, setUpFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = (fileProps) => {
    if (fileProps?.file) {
      if (fileProps.file.status === "done") {
        if (fileProps.file.response?.status) {
          setImageUrl(fileProps.file.response?.response);
          setUpFile(fileProps.file);
          onChangeAction(fileProps.file.response?.response);
        }
      }
    }
    //setUpFile(newFile)
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <>
      <Upload
        action={`/api/upload/${imgLoc}`}
        listType="picture-card"
        file={upFile}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {upFile !== null ? null : uploadButton}
      </Upload>
      <Modal
        open={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};

export default CstUploadFile;
