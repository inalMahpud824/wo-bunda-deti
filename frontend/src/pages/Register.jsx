import { useEffect, useState } from "react";
import useTokenValidation from "../hooks/useTokenValidation";
import { instance } from "../axios";
import logoPkk from "../assets/img/logo_pkk.png";
import logoGov from "../assets/img/logo_kab_bandung_barat.png";
import { ModalError } from "../components/modal/ModalError";
import { Link } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalSuccess } from "../components/modal/ModalSuccess";
import { Loading } from "../components/loading/Loading";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
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
      await instance.post("api/auth/register", input);

      document.getElementById("success-register").showModal();
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
        <ModalSuccess
          description={"Berhasil daftar akun"}
          textButton={"Login sekarang"}
          title={"Berhasil"}
          functionClick={() => (window.location.href = "/login")}
          id="success-register"
        />
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
          <h1 className="text-center text-gray-700 text-xl font-bold">
            Daftar
          </h1>
          <label htmlFor="name" className="py-2 font-semibold">
            Nama
          </label>
          <input
            type="text"
            placeholder="Masukan nama"
            name="name"
            onChange={handelChange}
            className="w-full border px-4 py-2 outline-none bg-white rounded-full focus-within:border-black"
            required
          />
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
          <InputPassword
            label="Password"
            placeholder="Masukan Password"
            id="password"
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            handelChange={handelChange}
          />
          <label htmlFor="phoneNumber" className="py-2 font-semibold">
            Nomer Whatsapp
          </label>
          <input
            type="text"
            placeholder="Masukan Nomer Whatsapp"
            name="phoneNumber"
            onChange={handelChange}
            className="w-full border px-4 py-2 outline-none bg-white rounded-full focus-within:border-black"
            required
          />
          <label htmlFor="address" className="py-2 font-semibold">
            Alamat lengkap
          </label>
          <input
            type="text"
            placeholder="Masukan alamat lengkap"
            name="address"
            onChange={handelChange}
            className="w-full border px-4 py-2 outline-none bg-white rounded-full focus-within:border-black"
            required
          />

          <button
            className="py-2 bg-secondary text-white rounded-full px-[3rem] font-semibold hover:shadow-md hover:font-bold hover:cursor-pointer mt-7"
            type="submit"
          >
            Register
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
};

export default Register;
