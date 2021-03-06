import React, { useMemo } from "react";
import "./main-view.scss";

const MainView: React.FC<{ blur: boolean }> = (props) => {
  const { children, blur } = props;
  const blur_value = useMemo(() => blur ? "6px" : "0px", [blur]);
  return (
    <React.Fragment>
      <main
        className="main-view-container"
        style={{
          filter: `blur(${blur_value})`,
        }}
      >
        {children}
      </main>
    </React.Fragment>
  );
};

export default MainView;
