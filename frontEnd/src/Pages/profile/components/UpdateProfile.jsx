/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Button,
} from "@material-tailwind/react";
import { UpdateUser } from "../../../redux/apicalls/profileCalls";
import { toast } from "react-toastify";

export default function UpdateProfile({ id }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleOpen = () => {
    setOpen(!open);
  };

  //edit comment
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateUser = {};
    if (name.length > 0) {
      updateUser.fName = name.split(" ")[0];
      updateUser.lName = name.split(" ")[1];
    }
    if (bio.length > 0) {
      updateUser.bio = bio;
    }

    if (password) {
      updateUser.password = password;
    }

    if (Object.keys(updateUser).length > 0) {
      dispatch(UpdateUser(id, updateUser));
      setOpen(false);
    } else {
      toast.error("please enter data");
    }
  };
  return (
    <>
      <button
        className="w-fit bg-[#27ae60] px-[10px] py-[5px] my-[5px] rounded-[5px] text-white"
        onClick={handleOpen}>
        <i className="bi bi-person-badge"></i>
        <span className="px-[3px]">Update Profile</span>
      </button>

      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="text-[#16a085] w-[100%] text-center">
          <span className="w-[100%]">Edit Your Profile</span>
          <i
            onClick={handleOpen}
            className="bi bi-x-circle mr-1 text-[#ba3a35] cursor-pointer"></i>
        </DialogHeader>
        <DialogBody>
          <div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center items-center py-[20px] text-[black]">
              <input
                type="text"
                placeholder="Name"
                className="input-title"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Bio"
                className="input-title"
                value={bio}
                onChange={(e) => {
                  setBio(e.target.value);
                }}
              />
              <input
                type="password"
                placeholder="Password"
                className="input-title"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Button type="submit" className="bg-[#16a085] w-[100%]">
                <span>Update Post</span>
              </Button>
            </form>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}
