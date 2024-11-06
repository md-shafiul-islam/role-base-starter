// @src/hooks/useVideoPlayer.js

import React from "react";
import "./ShortVideo.module.css";

const ShortVideo = ({ src, ...params }) => {
  return (
    <div
      className="video-content"
      dangerouslySetInnerHTML={{ __html: src }}
    ></div>
  );
};

export default ShortVideo;
