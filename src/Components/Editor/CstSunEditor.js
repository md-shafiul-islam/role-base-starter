import { Col, Row } from "antd";
import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

import { Typography } from "antd";

const { Text } = Typography;

import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

const plugins = dynamic(() => import("suneditor/src/plugins"), {
  ssr: false,
});

const CstSunEditor = ({
  placeholder = "Start writing content here",
  onChange,
  height = 300,
  defaultValue = "",
  ...params
}) => {
  const editorRef = useRef();

  const initSunEditorIns = (inst) => {
    editorRef.current = inst;
  };

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.plugins = plugins;
    }
  }, [editorRef.current]);

  return (
    <React.Fragment>
      <Row>
        <Col span={24}>
          <Text warning>If You use image & content both side by side</Text>
          <pre>
            <Text code>{`<div class="image-with-text">
  <div class="text-container">
    <h2>Title</h2>
    <p>Text</p>
  </div>
  <div class="se-component se-image-container __se__float-center" contenteditable="false">
  image here...
  </div>
</div>`}</Text>
          </pre>
        </Col>
        <Col span={24}>
          <SunEditor
            placeholder={placeholder}
            getSunEditorInstance={initSunEditorIns}
            setOptions={{
              height: height,
              buttonList: [
                ["undo", "redo"],
                ["font", "fontSize", "formatBlock"],
                [
                  "bold",
                  "underline",
                  "italic",
                  "strike",
                  "subscript",
                  "superscript",
                ],
                ["removeFormat"],
                "/",
                ["fontColor", "hiliteColor"],
                ["outdent", "indent"],
                ["align", "horizontalRule", "list", "table"],
                ["link", "image", "video"],
                ["fullScreen", "showBlocks", "codeView"],
                ["preview", "print"],
                ["save", "template"],
              ],
            }}
            onChange={onChange}
            defaultValue={defaultValue}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default CstSunEditor;
