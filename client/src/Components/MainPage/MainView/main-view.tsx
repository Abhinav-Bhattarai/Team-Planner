import React from "react";
import "./main-view.scss";

const MainView: React.FC<{ blur: boolean }> = (props) => {
  const { children, blur } = props;
  const blur_value = blur ? "10px" : "0px";
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
