import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#333337] py-6">
      <div className="container mx-auto text-center text-sm text-gray-600 dark:text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} 돌려돌려 돌림판. All rights
          reserved.
        </p>
        <div className="flex justify-center space-x-4 mt-4">
          <NavLink to={"#"}>Privacy Policy</NavLink>
          <NavLink to={"#"}>Terms of Service</NavLink>
          <NavLink to={"#"}>Contact</NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
