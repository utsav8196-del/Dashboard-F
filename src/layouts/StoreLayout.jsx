import { Outlet } from "react-router-dom";
import Header from "../components/store/Header.jsx";

export default function StoreLayout() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pb-12">
        <Outlet />
      </main>
    </div>
  );
}
