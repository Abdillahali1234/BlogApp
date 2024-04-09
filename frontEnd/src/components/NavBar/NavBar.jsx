/* eslint-disable react/prop-types */
import {
  Navbar,
  Typography,
  Button,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { Bars2Icon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import NotificationsMenu from "./components/NotificationsMenu";
import NavList from "./components/NavList";
import React from "react";
import Rigth from "./components/Right";
import { useSelector } from "react-redux";

export default function NavBar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const { user } = useSelector((state) => state.auth);
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    );
  }, []);

  return (
    <Navbar className={`mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6 `}>
      <div className="relative mx-auto flex items-center justify-between  text-blue-gray-900">
        <Typography className="mr-4 ml-2 cursor-pointer py-1.5 font-medium">
          <span>
            <img
              className="w-10 h-10 rounded-[50%]"
              src="https://images.unsplash.com/photo-1546074177-ffdda98d214f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </span>
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden">
          <Bars2Icon className="h-6 w-6" />
        </IconButton>

        <div className="flex items-center gap-[3px]">
          <NotificationsMenu />
          {user != null ? (
            <Rigth user={user} />
          ) : (
            <>
              <Button size="sm" variant="text" className="bg-gray-400">
                <Link to={"/auth/login"}>
                  <span>Log In</span>
                </Link>
              </Button>
              <Button size="sm" variant="text" className="bg-blue-500">
                <Link to={"/auth/register"}>
                  <span>Sign in</span>
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
      <Collapse open={isNavOpen} className="overflow-clip">
        <NavList />
      </Collapse>
    </Navbar>
  );
}
