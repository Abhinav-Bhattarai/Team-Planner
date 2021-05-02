import React from "react";
import "./reusables.scss";

interface MainViewNavbarComponentProps {
  Click: (type: "left" | "right") => void;
  type: "left" | "right";
  name: string;
}

export const MainViewHeader: React.FC<{
  Profile: string | undefined;
  name: string | undefined;
}> = (props) => {
  const { Profile, name } = props;
  return (
    <React.Fragment>
      <main id="main-view-header">
        <img
          src={Profile}
          draggable="false"
          alt="profile"
          id="main-view-profile"
        />
        <div>{name}</div>
      </main>
    </React.Fragment>
  );
};

export const MainViewNavbarIndicator: React.FC<{ reference: any }> = (
  props
) => {
  return <div className="main-view-nav-indicator" ref={(props.reference) && props.reference}></div>;
};

export const MainViewNavbarContainer: React.FC<{}> = ({ children }) => {
  return <main className="main-view-navbar-component-container">{children}</main>;
};

export const MainViewNavbarComponents: React.FC<MainViewNavbarComponentProps> = (
  props
) => {
  const { Click, type, name } = props;
  return (
    <main
      className="main-view-navbar-component"
      onClick={Click.bind(this, type)}
    >
      { name }
    </main>
  );
};

export const MainViewNavbar: React.FC<{}> = (props) => {
  const { children } = props;
  return (
    <React.Fragment>
      <main className="main-view-navbar">{children}</main>
    </React.Fragment>
  );
};
