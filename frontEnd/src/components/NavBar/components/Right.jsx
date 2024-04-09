/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/apicalls/authCalls";
// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },
];

export default function Rigth({ user }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logoutUser());
  };
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto">
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src={`${user?.profilePhoto?.url}`}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }) => {
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${"hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"}`}>
              {React.createElement(icon, {
                className: `h-4 w-4 ${""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="div"
                variant="small"
                className="font-normal"
                color={"inherit"}>
                <Link to={`/profile/${user.id}`}>{label}</Link>
              </Typography>
            </MenuItem>
          );
        })}

        <MenuItem
          onClick={closeMenu}
          className={`flex items-center gap-2 rounded ${"hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"}`}>
          {React.createElement(PowerIcon, {
            className: `h-4 w-4 ${"text-red-500"}`,
            strokeWidth: 2,
          })}
          <Typography
            as="div"
            variant="small"
            className="font-normal"
            color={"red"}>
            <span onClick={handleLogOut}>log out</span>
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
