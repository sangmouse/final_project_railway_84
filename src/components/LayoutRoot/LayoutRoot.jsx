import { Outlet } from "react-router-dom";
import Header from "../Header/Header";

export default function LayoutRoot() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
