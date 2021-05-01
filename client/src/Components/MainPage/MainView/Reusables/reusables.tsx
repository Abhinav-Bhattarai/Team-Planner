import React from "react";
import "./reusables.scss";

export const MainViewHeader: React.FC<{
  Profile: string | undefined;
  name: string | undefined;
}> = (props) => {
  const { Profile, name } = props;
  return (
    <React.Fragment>
      <main id="main-view-header">
        <img src={Profile} alt="profile" id="main-view-profile" />
        <div>{name}</div>
      </main>
    </React.Fragment>
  );
};

export const MainViewNavbarIndicator: React.FC<{reference: any}> = (props) => {
  return <div className='main-view-nav-indicator' ref={props.reference}></div>;
};

export const MainViewNavbarComponents: React.FC<{Click: (type: 'left' | 'right') => void, type: 'left' | 'right'}> = (props) => {
  const { Click, type } = props;
  return (
    <main className='main-view-navbar-component' onClick={Click.bind(this, type)}>

    </main>
  )
}

export const MainViewNavbar: React.FC<{}> = (props) => {
  const { children } = props;
  return (
    <React.Fragment>
      <main className="main-view-navbar">{children}</main>
    </React.Fragment>
  );
};