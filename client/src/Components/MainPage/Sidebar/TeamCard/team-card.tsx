import React from "react";

interface TeamCardProps {
  TeamProfile: string;
  TeamName: string;
  TeamID: string;
  PressHandler: (id: string) => void;
}

const TeamCard: React.FC<TeamCardProps> = (props) => {
  const { TeamProfile, TeamName, TeamID, PressHandler } = props;
  return (
    <React.Fragment>
      <main className="team-card-container" onClick={PressHandler.bind(this, TeamID)}>
        <img
          id="team-card-profile"
          width="50px"
          height="50px"
          src={TeamProfile}
          alt="profile-card"
        />
        <h2>{TeamName}</h2>
      </main>
    </React.Fragment>
  );
};

export default TeamCard;