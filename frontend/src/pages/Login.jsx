import { Link } from "react-router-dom"
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { instance } from "../axios";
import useTokenValidation from "../hooks/useTokenValidation";
import { ModalError } from "../components/modal/ModalError";
import { Loading } from "../components/loading/Loading";
import logoPkk from "../assets/img/logo_pkk.png"
import logoGov from "../assets/img/logo_kab_bandung_barat.png"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState()
  const [error, setError] = useState(null)
  const { login } = useTokenValidation()
  const [isLoading, setIsLoading] = useState(false)

  const handelChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (login) {
      window.location.href = "/dashboard";
      return;
    }
  }, [login]);

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    try {
      const result = await instance.post("api/auth/login", input);

      if (result) {
        localStorage.setItem("token", result.data.token);
        window.location.href = "/dashboard";
      }
      setIsLoading(false)
    } catch (e) {
      const errorMessage =
        typeof e.response?.data?.message === "string"
          ? e.response.data.message
          : "Internal Server Error";
      console.log(errorMessage)
      setError(errorMessage);
      setIsLoading(false)
    }
  };
  return (
    <>
      {isLoading && <Loading />}
      <section className="w-full min-h-screen bg-white flex flex-col items-center justify-center relative">
      <ModalError error={error} setError={setError} />
        <form
          action=""
          onSubmit={handleSubmit}
          className="md:w-[37rem] h-screen md:h-fit w-full py-4 px-10 shadow-lg flex flex-col justify-center text-gray-700"
        >
          <Link to={"/"} className="flex justify-center items-center gap-2 ">
          <img src={logoGov} alt="logo" width={70} />
          <img src={logoPkk} alt="logo" width={70} />
          </Link>
          <h1 className="text-center text-gray-700 text-xl font-bold">Masuk</h1>
          <label htmlFor="email" className="py-2 font-semibold">
            username
          </label>
          <input
            type="text"
            placeholder="Masukan username"
            name="username"
            onChange={handelChange}
            className="w-full border px-4 py-2 outline-none bg-white rounded-full focus-within:border-black"
            required
          />
          <InputPassword
            label="Password"
            placeholder="Masukan Password"
            id="password"
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            handelChange={handelChange}
          />
          <button
            className="py-2 bg-secondary text-white rounded-full px-[3rem] font-semibold hover:shadow-md hover:font-bold hover:cursor-pointer mt-7"
            type="submit"
          >
            Login
          </button>
        </form>
        {/* {isLoading && (
          <div className="w-full min-h-screen absolute bg-slate-100 opacity-85 flex items-center justify-center">
            <span className="loading loading-spinner text-primary w-[4rem]"></span>
          </div>
        )}
          </section> */}
      </section>
      {/* {error && (
        <div className="toast toast-bottom lg:toast-start toast-center">
          <div className="alert alert-error text-white flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
            <button
              className="btn btn-sm btn-circle border-none absolute right-0 top-0 bg-red-900 text-white"
              onClick={closeError}
            >
              ✕
            </button>
          </div>
        </div>
      )} */}
    </>
  )
}


const InputPassword = ({
  label,
  placeholder,
  id,
  showPassword,
  handelChange,
  setShowPassword,
}) => {
  return (
    <>
      <label htmlFor={id} className="py-2 font-semibold">
        {label}
      </label>
      <div className="flex items-center gap-2 w-[100%] bg-white rounded-full border px-4 py-2 focus-within:border-black">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="w-full border-none outline-none bg-white"
          name={id}
          id={id}
          onChange={handelChange}
          required
        />
        <FontAwesomeIcon
          icon={showPassword ? faEye : faEyeSlash}
          onClick={() => setShowPassword(!showPassword)}
          className="cursor-pointer"
        />
      </div>
    </>
  );
}

export default Login