import React from "react";
import logoSrc from "../assets/logo.png";
import {
  Link,
  useLocation,
  useNavigate,
  useRouter,
} from "@tanstack/react-location";
import TopBarLoader from "../components/TopBarLoader";
import { FaExternalLinkAlt } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

type MainLayoutProps = {
  children: React.ReactNode;
};

function MainLayout(props: MainLayoutProps) {
  const router = useRouter();
  const location = useLocation();
  const auth = useAuth();
  const navigate = useNavigate();

  if (
    location.current.pathname.includes("login") ||
    location.current.pathname.includes("signup")
  ) {
    return <>{props.children}</>;
  }

  if (!auth.token) {
    navigate({
      to: "/login",
    });
  }

  return (
    <div>
      {router.pending ? <TopBarLoader /> : null}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-white px-4 drop-shadow-lg">
        <div>
          <Link to={"/"}>
            <img src={logoSrc} alt="Digital Lync Logo" />
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {location.current.pathname.includes("/admin") ? null : (
            <div>
              <Link
                // target={"_blank"}
                to={"admin"}
                className="link-primary  text-blue-500"
              >
                <span className="flex items-center">
                  Admin Portal <FaExternalLinkAlt className="pl-1" />
                </span>
              </Link>
            </div>
          )}
          <Link to='/logout' className="btn btn-sm btn-outline ease-linear transition-all duration-[0.5s] " onClick={auth.logout}>
            Logout
          </Link>
        </div>
      </div>
      <div className="min-h-screen">{props.children}</div>
    </div>
  );
}

export default MainLayout;
