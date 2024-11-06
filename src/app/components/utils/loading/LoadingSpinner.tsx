import { Skeleton, Spin } from "antd";
import React from "react";



const LoadingSpinner = ({ isActive = false, isBlock = false, className = "", content = <></>, ...props }) => {

    return (
        <React.Fragment>
            <div className={className}>
                <Spin tip="Loading" size="small" className="min-h-60" >
                    <div className="py-4 mt-6 w-full h-full">
                        {content}
                    </div>
                </Spin>
            </div>
        </React.Fragment>
    )
}

export default LoadingSpinner;