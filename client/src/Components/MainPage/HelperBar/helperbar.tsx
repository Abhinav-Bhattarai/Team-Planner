import React, { useMemo } from "react";
import "./helperbar.scss";

const HelperBar: React.FC<{ blur: boolean }> = (props) => {
  const { blur, children } = props;
  const blur_value = useMemo(() => blur ? "6px" : "0px", [blur]);
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