import React, { useState } from "react";

import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="px-6">
          <LeftSidebar />
        </div>

        <div className="col-span-2 border-x-2 border-t-slate-800 px-6">
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="Profile Picture"
            className="w-12 h-12 rounded-full"
          />
          <p className="font-bold my-1">Username</p>
          <p className="font-semibold my-2 w-full text-gray-600">
            Some description right here.{" "}
          </p>
          <hr className="my-2" />
          user tweets right here.
        </div>

        <div className="px-6">
          <RightSidebar />
        </div>
      </div>
    </>
  );
};

export default Profile;
