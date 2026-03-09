import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-center gap-8 bg-blue-600 p-4 shadow-md text-white text-lg">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `px-3 py-1 rounded-md transition-colors ${
            isActive ? "bg-blue-800 font-bold" : "hover:bg-blue-500"
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/pastes"
        className={({ isActive }) =>
          `px-3 py-1 rounded-md transition-colors ${
            isActive ? "bg-blue-800 font-bold" : "hover:bg-blue-500"
          }`
        }
      >
        Paste
      </NavLink>
    </div>
  );
};

export default Navbar;
