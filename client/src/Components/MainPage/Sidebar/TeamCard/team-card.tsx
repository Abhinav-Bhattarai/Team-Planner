import React from "react";
import './team-card.scss';

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
          draggable='false'
          id="team-card-profile"
          width="50px"
          height="50px"
          src={TeamProfile}
          alt="profile-card"
        />
        <div>{TeamName}</div>
      </main>
    </React.Fragment>
  );
};

export default TeamCard;