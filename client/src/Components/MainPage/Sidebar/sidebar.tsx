import React from "react";
import SearchIcon from "../../UI/Icons/search-icon";
import "./sidebar.scss";

interface PersonalInformationHeaderProps {
  source: string;
  username: string | any;
}

interface ActivityContainerProps {
  CreateTeamHandler: () => void;
  JoinTeamHandler: () => void;
}

export const PersonalInformationHeader: React.FC<PersonalInformationHeaderProps> = (
  props
) => {
  const { source, username } = props;
  return (
    <header
      className="personal-info-header"
      style={{ backgroundColor: "#292B2F" }}
    >
      <img src={source} alt="profile" width="30px" height="30px" />
      <div>{username}</div>
    </header>
  );
};

export const SearchBar: React.FC<{
  value: string;
  ChangeValue: (e: any) => void;
}> = (props) => {
  const { value, ChangeValue } = props;
  return (
    <article className="search-bar-rel-container">
      <input
        type="text"
        name="search"
        id="sidebar-search"
        placeholder="Search for teams ...."
        value={value}
        onChange={ChangeValue}
      />
      <SearchIcon />
    </article>
  );
};

export const TeamContainer: React.FC<{}> = (props) => {
  const { children } = props;
  return <main id="team-list-container">{children}</main>;
};

export const ActivityContainer: React.FC<ActivityContainerProps> = (props) => {
  const { CreateTeamHandler, JoinTeamHandler } = props;
  return (
    <article className="activity-container">
      <button id="ac-btn-1" onClick={JoinTeamHandler}>
        Join Team
      </button>
      <button id="ac-btn-2" onClick={CreateTeamHandler}>
        Create Team
      </button>
    </article>
  );
};

const SideBar: React.FC<{ blur: boolean }> = (props) => {
  const { children, blur } = props;
  const blur_value = blur ? "10px" : "0px";
  return (
    <React.Fragment>
      <main
        className="sidebar-container"
        style={{
          filter: `blur(${blur_value})`,
        }}
      >
        {children}
      </main>
    </React.Fragment>
  );
};

export default SideBar;
