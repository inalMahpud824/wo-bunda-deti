import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { instance } from "../axios";
import useTokenValidation from "../hooks/useTokenValidation";
import { ModalError } from "../components/modal/ModalError";
import { Loading } from "../components/loading/Loading";
import logoPkk from "../assets/img/logo_pkk.png";
import logoGov from "../assets/img/logo_kab_bandung_barat.png";

const FormForgotPassword = () => {
  const [input, setInput] = useState();
  const [error, setError] = useState(null);
  const { login } = useTokenValidation();
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    e.preventDefault();
    try {
      await instance.post("api/auth/forgot-password", input);

      localStorage.setItem("email", input.email);
      window.location.href = "/forgot-password/verify";
      setIsLoading(false);
    } catch (e) {
      const errorMessage =
        typeof e.response?.data?.message === "string"
          ? e.response.data.message
          : "Internal Server Error";
      console.log(errorMessage);
      setError(errorMessage);
      setIsLoading(false);
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
            Email
          </label>
          <input
            type="text"
            placeholder="Masukan email"
            name="email"
            onChange={handelChange}
            className="w-full border px-4 py-2 outline-none bg-white rounded-full focus-within:border-black"
            required
          />
          <button
            className="py-2 bg-secondary text-white rounded-full px-[3rem] font-semibold hover:shadow-md hover:font-bold hover:cursor-pointer mt-7"
            type="submit"
          >
            Kirim Token
          </button>
          <p className="pt-1 text-center text-sm font-light">
            Sudah punya akun?{" "}
            <Link to={"/login"} className="text-secondary hover:font-bold">
              Masuk
            </Link>
          </p>
        </form>
      </section>
    </>
  );
};

export default FormForgotPassword;
