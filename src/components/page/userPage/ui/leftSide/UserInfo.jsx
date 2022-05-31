import React from "react";
import InfoCard from "./InfoCard";
import InfoMeetings from "./InfoMeetings";
import InfoQual from "./InfoQual";
import PropTypes from "prop-types";

const UserInfo = ({ user }) => {
    return (
            <div className="col-md-4 mb-3">
                <InfoCard user={user} />
                <InfoQual qualities={user.qualities}/>
                <InfoMeetings meetings={user.completedMeetings}/>
            </div>
    );
};
UserInfo.propTypes = {
    user: PropTypes.object
};

export default UserInfo;
