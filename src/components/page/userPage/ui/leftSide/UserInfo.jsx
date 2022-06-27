import React from "react";
import InfoCard from "./InfoCard";
import InfoMeetings from "./InfoMeetings";
import InfoQual from "./InfoQual";
import PropTypes from "prop-types";

const UserInfo = ({ user }) => {
    return (
            <div className="col mb-3">
                {user ? <InfoCard user={user} /> : "Loading"}
                <InfoQual qualities={user.qualities}/>
                <InfoMeetings meetings={user.completedMeetings}/>
            </div>
    );
};
UserInfo.propTypes = {
    user: PropTypes.object
};

export default UserInfo;
