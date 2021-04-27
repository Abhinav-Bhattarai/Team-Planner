import React from "react";
import "./helperbar.scss";

const HelperBar: React.FC<{ blur: boolean }> = (props) => {
  const { blur, children } = props;
  const blur_value = blur ? "0px" : "10px";
  return (
    <React.Fragment>
      <main
        className="helper-bar-container"
        style={{
          filter: `blur(${blur_value})`,
        }}
      >
        {children}
      </main>
    </React.Fragment>
  );
};

export default HelperBar;
