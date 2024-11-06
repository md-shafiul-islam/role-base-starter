import { Select } from "antd";
import React from "react";

const CstSelectMetaData = ({ onChangeAction }) => {
  return (
    <Select
      filterOption={(input, option) =>
        option.children.toLowerCase().includes(input.toLowerCase())
      }
      showSearch
      onChange={onChangeAction}
    >
      <Option value="author">Author</Option>
      <Option value="keywords">Keywords</Option>
      <Option value="description">Description</Option>

      <Option value="subject">Subject</Option>
      <Option value="copyright">Copyright</Option>
      <Option value="language">Language</Option>
      <Option value="robots">Robots</Option>
      <Option value="revised">Revised</Option>
      <Option value="abstract">Abstract</Option>
      <Option value="topic">Topic</Option>
      <Option value="summary">Summary</Option>
      <Option value="Classification">Classification</Option>
      <Option value="author">Author</Option>
      <Option value="designer">Designer</Option>
      <Option value="reply-to">Reply-to</Option>
      <Option value="owner">Owner</Option>
      <Option value="url">Url</Option>
      <Option value="identifier-URL">Identifier URL</Option>
      <Option value="directory">Directory</Option>
      <Option value="pagename">Page Name</Option>
      <Option value="category">Category</Option>
      <Option value="coverage">Coverage</Option>
      <Option value="distribution">Distribution</Option>
      <Option value="rating">Rating</Option>
      <Option value="revisit-after">Revisit After</Option>
      <Option value="subtitle">Subtitle</Option>
      <Option value="target">Target</Option>
      <Option value="HandheldFriendly">Handheld Friendly</Option>
      <Option value="MobileOptimized">MobileOptimized</Option>
      <Option value="date">Date</Option>
      <Option value="search_date">Search Date</Option>
      <Option value="DC.title">DC.title</Option>
      <Option value="ResourceLoaderDynamicStyles">
        ResourceLoaderDynamicStyles
      </Option>
      <Option value="medium">Medium</Option>
      <Option value="syndication-source">Syndication Source</Option>
      <Option value="original-source">Original Source</Option>
      <Option value="verify-v1">Verify v1</Option>
      <Option value="y_key">Y Key</Option>
      <Option value="pageKey">Page Key</Option>
    </Select>
  );
};

export default CstSelectMetaData;
