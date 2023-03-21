import React from "react";
import { useTheme } from "next-themes";
import { SunIcon } from "@heroicons/react/outline";
import { MoonIcon } from "@heroicons/react/solid";

export const NavItem: React.FC<{
  value: any;
  handlerFilterCategory: (category: any) => void;
  active: string;
}> = ({ value, handlerFilterCategory, active }) => {
  let className =
    "capitalize cursor-pointer hover:text-orange dark:text-subtext dark:hover:text-orange";
  if (active === value) className += " text-orange";

  return (
    <li className={className} onClick={() => handlerFilterCategory(value)}>
      {value}
    </li>
  );
};

export const BlogNavbar: React.FC<{
  handlerFilterCategory: (category: any) => void;
  active: string;
}> = (props) => {
  const { theme, setTheme } = useTheme();
  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  return (
    <div className="min-h-full ">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold dark:text-subtext">Blogs</h1>
        <div className="dark:text-black">
          {theme === "light" ? (
            <SunIcon className="h-8" />
          ) : (
            <MoonIcon className="h-8" />
          )}
        </div>
      </div>
      <div className="flex flex-col mt-10 space-x-3 space-y-6 overflow-x-auto list-none">
        <NavItem value="test" {...props} />
        <NavItem value="sample" {...props} />
        <NavItem value="react" {...props} />
      </div>
      <button
        type="button"
        onClick={changeTheme}
        className="py-2 px-4 my-4 text-white bg-black rounded-full cursor-pointer bg-gradient-to-r from-orange to-purple dark:from-subtext dark:to-darkblue focus:outline-none hover:scale-105"
        suppressHydrationWarning={true}
      >
        {theme === "light" ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
};
