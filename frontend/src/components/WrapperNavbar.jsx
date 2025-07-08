import { Link } from "react-router-dom";
import useTokenValidation from "../hooks/useTokenValidation";

// import logo from "../assets/img/logo.png"
const WrapperNavbar = ({ children }) => {
  const { login } = useTokenValidation()
  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col bg-primary text-black relative">
        {/* Navbar */}
        <div className="bg-[#fef9f5] w-full text-black z-10 md:px-25 sticky top-0">
          <div className="container mx-auto navbar flex justify-between">
          <Link to={"/"} className="mx-2 lg:flex-1 px-2 text-4xl font-logo">Bunda Deti</Link>
          <div className="lg:hidden">
            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
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
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal ">
              {/* Navbar menu content here */}
              <li><Link to={"/service"}>Daftar Layanan</Link></li>
              <li><Link to={"/galery"} >Galery</Link></li>
                <li><Link to={"/cart"}>Keranjang saya</Link></li>
              {login ? (
                <li><Link to={"/dashboard"}>Dashboard</Link></li>  
              ) : (
              <li><Link to={"/login"}>Login Admin</Link></li>
              )}
            </ul>
          </div>

          </div>
        </div>
        {/* Page content here */}
        {children}
      </div>
      <div className="drawer-side ">
        <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu text-black min-h-full w-80 p-4 bg-primary pt-24 ">
          {/* Sidebar content here */}
          <li><Link to={"/service"}>Daftar Layanan</Link></li>
          <li><Link to={"/galery"} >Galery</Link></li>
          <li><Link to={"/cart"}>Keranjang saya</Link></li>
          {login ? (
            <li><Link to={"/dashboard"}>Dashboard</Link></li>
          ) : (
            <li><Link to={"/login"}>Login Admin</Link></li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default WrapperNavbar;