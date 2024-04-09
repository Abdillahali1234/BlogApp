/* eslint-disable no-const-assign */
import { MenuItem, Typography } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

let navListItems = [
  {
    label: "Home",
    url: "",
  },
  {
    label: "Posts",
    url: "posts",
  },
  {
    label: "Articles",
    url: "articles",
  },
];

export default function NavList() {
  const { user } = useSelector((state) => state.auth);

  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {navListItems.map(({ label, url }) => (
        <Typography
          key={label}
          variant="small"
          color="gray"
          className="font-medium text-blue-gray-500">
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            <Link to={`/${url}`} className="text-gray-900">
              {label}
            </Link>
          </MenuItem>
        </Typography>
      ))}
      {user && (
        <>
          <Typography
            variant="small"
            color="gray"
            className="font-medium text-blue-gray-500">
            <MenuItem className="flex items-center gap-2 lg:rounded-full">
              <Link to={`/create-post`} className="text-gray-900">
                Create Post
              </Link>
            </MenuItem>
          </Typography>
        </>
      )}
      {user?.isAdmin && (
        <Typography
          variant="small"
          color="gray"
          className="font-medium text-blue-gray-500">
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            <Link to={`/admin-dashboard`} className="text-gray-900">
              Admin Dashboard
            </Link>
          </MenuItem>
        </Typography>
      )}
    </ul>
  );
}
