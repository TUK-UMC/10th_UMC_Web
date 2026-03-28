import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      홈페이지
    </>
  );
};

export default HomePage;
