import { Outlet, useMatch } from "react-router-dom";
import Navbar from "../components/Navbar";

const HomePage = () => {
  const match = useMatch("/");

  return (
    <>
      <Navbar />
      <Outlet />
      {match && <div>홈페이지</div>}
    </>
  );
};

export default HomePage;
