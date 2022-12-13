import "./App.css";
import { Outlet, ReactLocation, Router } from "@tanstack/react-location";
import { LocationGenerics, routes } from "./routes";
import MainLayout from "./layouts/MainLayout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import AuthProvider from "./contexts/AuthProvider";

const location = new ReactLocation<LocationGenerics>();

function App() {
  return (
    <>
      <Router location={location} routes={routes}>
        <AuthProvider>
          <MainLayout>
            <Outlet />
          </MainLayout>
          <ToastContainer position="top-center" />
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
