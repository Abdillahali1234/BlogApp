import { Link } from "react-router-dom";
import AdminSideBare from "./../AdminSideBare";
import "./UsersTable.css";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteProfile,
  getProfiles,
} from "../../../../redux/apicalls/profileCalls";
export default function UsersTable() {
  const handleDeleted = (profileId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProfile(profileId));
      }
    });
  };

  const dispatch = useDispatch();
  const { profiles, profileDeleted } = useSelector((state) => state.profile);
  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch, profileDeleted]);

  return (
    <div className="flex min-h-[calc(100vh-(78px+50px))] md:min-h-[calc(100vh-(70px+50px))] overflow-hidden">
      <div className="hidden flex-0 lg:block lg:flex-[2]">
        <AdminSideBare />
      </div>
      <div className="users-table flex-[12] lg:flex-[10]">
        <h2 className="users-table-tittle">Users</h2>
        <table className="table-wrapper">
          <thead>
            <tr>
              <th className="px-0 py-[10px] md:px-[10px]">Count</th>
              <th className="px-0 py-[10px] md:px-[10px]">Users</th>
              <th className="px-0 py-[10px] md:px-[10px]">Email</th>
              <th className="px-0 py-[10px] md:px-[10px]">Action</th>
            </tr>
          </thead>
          <tbody>
            {profiles?.map((profile, index) => {
              return (
                <tr key={profile?._id} className={``}>
                  <td className="p-[0] md:px-[10px] text-[18px] text-center">
                    <span>{index + 1}</span>
                  </td>
                  <td className=" text-black font-[600]">
                    <div className="flex flex-col lg:flex-row sm:gap-[5px] items-center gap-[5px] p-[10px]">
                      <img
                        className="w-[40px] h-[40px] rounded-[50%]"
                        src="../../../../../src/images/user-avatar.png"
                        alt=""
                      />
                      <span className="text-center">
                        {profile?.fName + " " + profile?.lName}
                      </span>
                    </div>
                  </td>
                  <td className=" lg:px-[10px]">
                    <span className="text-wrap text-ellipsis">
                      {profile?.email}
                    </span>
                  </td>
                  <td className="px-[10px]">
                    <div className="flex-col  lg:flex-row sm:gap-[5px] flex justify-around">
                      <button className="px-[10px] py-[5px] rounded-[5px] text-white  bg-[#27ae60]">
                        <Link to={`/profile/${profile?._id}`}>
                          view profile
                        </Link>
                      </button>
                      <button
                        onClick={() => {
                          handleDeleted(profile?._id);
                        }}
                        className="bg-[#d9534f] px-[10px] py-[5px] rounded-[5px] text-white ">
                        delete user
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
