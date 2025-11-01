import logoPkk from "../assets/img/logo_pkk.png";
import logoGov from "../assets/img/logo_kab_bandung_barat.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuildingUser,
  faImages,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const WrapperDashboardCustomer = ({ children, tabActive }) => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
  return (
    <div className="bg-white max-h-screen flex ">
      {/* Sidebar */}
      <div className="min-w-[17rem] min-h-screen md:block text-gray-700 border bg-primary overflow-y-auto hidden">
        <div className=" text-center py-1">
          <Link to={"/"} className="flex justify-center items-center gap-2">
            <img src={logoGov} alt="logo" width={70} />
            <img src={logoPkk} alt="logo" width={70} />
          </Link>
        </div>
        <div className="text-lg">
          <h2 className="text-xl font-bold pt-4 pl-3">Home</h2>
          <>
            <>
              <ListMenuDashboard
                text={"Profile"}
                icon={faBuildingUser}
                href={"/dashboard/profile"}
                active={tabActive == "profile" ? true : false}
              />
              <ListMenuDashboard
                text={"Riwayat Pembelian"}
                icon={faImages}
                href={"/dashboard/order/history"}
                active={tabActive == "history" ? true : false}
              />
            </>

            <>
              <div
                onClick={handleLogout}
                className={`flex items-center justify-start py-4 pl-3 hover:bg-secondary cursor-pointer hover:text-white `}
              >
                <FontAwesomeIcon icon={faPowerOff} />
                <p className="pl-3">Logout</p>
              </div>
            </>
          </>
        </div>
      </div>

      <div className="drawer drawer-end font-[Public Sans] sticky top-0 z-[1000]">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col max-h-screen">
          {/* Navbar */}
          <div className="navbar bg-white w-full flex justify-between items-center md:px-7 border-b">
            <div className="navbar-start flex-1 md:navbar-end">
              <div className=" flex-row-reverse md:flex-row flex gap-2">
                <div className="flex flex-col">
                  <h1 className="text-lg font-bold md:text-right text-black">
                    {name}
                  </h1>
                  {/* <p className="text-sm md:text-right">{role}</p> */}
                </div>
              </div>
            </div>

            {/* Burger button untuk tampilan mobile */}
            <div className="navbar-end flex-1 md:hidden">
              <label
                htmlFor="my-drawer-3"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current text-black"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
          </div>

          <div className="bg-white max-h-screen overflow-y-auto">
            {children}
          </div>
          {/* Page content here */}
        </div>

        <div className="drawer-side">
          <label
            htmlFor="my-drawer-3"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="min-w-[17rem] min-h-screen block text-gray-700 border bg-gray-50 overflow-y-auto">
            <div className=" text-center py-1">
              <div className=" text-center py-1">
                <Link
                  to={"/"}
                  className="mx-2 lg:flex-1 px-2 text-4xl font-logo"
                >
                  Bunda Deti
                </Link>
              </div>
            </div>
            <div className="text-lg">
              <>
                <>
                  <ListMenuDashboard
                    text={"Profile"}
                    icon={faBuildingUser}
                    href={"/dashboard/profile"}
                    active={tabActive == "profile" ? true : false}
                  />
                  <ListMenuDashboard
                    text={"Riwayat Pembelian"}
                    icon={faImages}
                    href={"/dashboard/order/history"}
                    active={tabActive == "history" ? true : false}
                  />
                </>

                <>
                  <div
                    onClick={handleLogout}
                    className={`flex items-center justify-start py-4 pl-3 hover:bg-secondary cursor-pointer hover:text-white `}
                  >
                    <FontAwesomeIcon icon={faPowerOff} />
                    <p className="pl-3">Logout</p>
                  </div>
                </>
              </>
            </div>
          </div>
        </div>
      </div>
      {/* {isLoading ? <Loading /> : ""} */}
    </div>
  );
};

const ListMenuDashboard = ({ text, icon, href, active = false }) => {
  return (
    <>
      <Link to={href}>
        <div
          className={`flex items-center justify-start py-4 pl-3 hover:bg-secondary hover:text-white ${
            active ? "bg-secondary text-white" : ""
          }`}
        >
          <FontAwesomeIcon icon={icon} />
          <p className="pl-3">{text}</p>
        </div>
      </Link>
    </>
  );
};

export default WrapperDashboardCustomer;
