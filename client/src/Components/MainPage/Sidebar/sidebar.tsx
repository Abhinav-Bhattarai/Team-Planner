import React from "react";
import "./sidebar.scss";

interface PersonalInformationHeaderProps {
  source: string;
  username: string;
};

export const PersonalInformationHeader: React.FC<PersonalInformationHeaderProps> = (
  props
) => {
  const { source, username } = props;
  return (
    <header className="personal-info-header">
      <img src={source} alt="profile" />
      <h2>{username}</h2>
    </header>
  );
};

export const SearchBar: React.FC<{}> = () => {
  return (
    <article className="search-bar-rel-container">
      <input
        type="text"
        name="search"
        id="sidebar-search"
        placeholder="Search for teams ...."
      />
    </article>
  );
};

export const TeamContainer: React.FC<{}> = (props) => {
  const { children } = props;
  return <main id="team-list-container">{children}</main>;
};

const SideBar: React.FC<{}> = (props) => {
  const { children } = props;
  return (
    <React.Fragment>
      <main className="sidebar-container">{children}</main>
    </React.Fragment>
  );
};

export default SideBar;
