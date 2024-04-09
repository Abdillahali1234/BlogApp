import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  IconButton,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

export default function NotificationsMenu() {
  let [theme, setTheme] = useState(null);
  const [moon, SetMoon] = useState("");
  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme(localStorage.getItem("theme"));
    } else {
      setTheme(localStorage.getItem("theme"));
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleSwitch = () => {
    if (theme === "dark") {
      theme = "light";
      SetMoon("light");
      localStorage.setItem("theme", "light");
      setTheme(theme);
    } else {
      theme = "dark";
      SetMoon("dark");

      localStorage.setItem("theme", "dark");
      setTheme(theme);
    }
  };

  return (
    <Menu>
      <MenuHandler>
        <IconButton
          variant="text"
          className="w-9 h-9 rounded-[50%] bg-[#E3E3E3] Dark:bg-[#383838] ">
          {moon === "dark" ? (
            <MoonIcon className="h-5 w-5 text-black cursor-pointer" />
          ) : (
            <SunIcon className="h-6 w-6 text-black cursor-pointer" />
          )}
          {/* border-black border-[1px] */}
        </IconButton>
      </MenuHandler>
      <MenuList className="flex flex-col gap-2">
        <MenuItem
          className="flex items-center gap-4 py-2 pl-2 pr-8"
          onClick={() => {
            if (theme !== "dark") {
              handleSwitch();
            }
          }}>
          <div className="flex items-center gap-2 justify-center">
            <MoonIcon className="h-5 w-5 text-gray-500 cursor-pointer inline-block" />
            <span className="">Dark</span>
          </div>
        </MenuItem>
        <MenuItem
          className="flex items-center gap-4 py-2 pl-2 pr-8"
          onClick={() => {
            if (theme !== "light") {
              handleSwitch();
            }
          }}>
          <div className="flex items-center gap-2 justify-center">
            <SunIcon className="h-5 w-5 text-gray-500 cursor-pointer inline-block" />
            <span className="">Light</span>
          </div>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
