import { Skeleton } from "antd";
import React from "react";



const LoadingContent = ({ isActive = false, isBlock = false, ...props }) => {

    return (
        <React.Fragment>
            <Skeleton {...props} active={isActive} block={isBlock} />
        </React.Fragment>
    )
}

export default LoadingContent;