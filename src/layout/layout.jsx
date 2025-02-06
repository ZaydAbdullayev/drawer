import { Outlet } from "react-router-dom";
import { Navbar } from "../components/navbar/navbar";
import "./layout.css";
import { Bg } from "../components/bg/bg";

export const Layout = () => {
  return (
    <div className="w100 df fdc aic app-container">
      <Navbar />
      <Outlet />
      <Bg />
    </div>
  );
};
