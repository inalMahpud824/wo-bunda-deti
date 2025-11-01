import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { instance } from "../axios";
import useTokenValidation from "../hooks/useTokenValidation";
import { ModalError } from "../components/modal/ModalError";
import { Loading } from "../components/loading/Loading";
import logoPkk from "../assets/img/logo_pkk.png";
import logoGov from "../assets/img/logo_kab_bandung_barat.png";
import { ModalSuccess } from "../components/modal/ModalSuccess";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const ChangePassword = () => {
  const [input, setInput] = useState();
  const [error, setError] = useState(null);
  const { login } = useTokenValidation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);

  const handelChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (login || localStorage.getItem("otp") == null) {
      window.location.href = "/dashboard";
      return;
    }
    if(!login && localStorage.getItem("otp") == null){
      window.location.href = "/forgot-password";
      return;
    }
  }, [login]);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (input.passwordNew !== input.passwordConfirm) {
      setError("Password baru dan konfirmasi password baru tidak sesuai");
      setIsLoading(false);
      return;
    }
    try {
      await instance.post("api/auth/change-password", {
        email: localStorage.getItem("email"),
        token: localStorage.getItem("otp"),
        passwordNew: input.passwordNew,
      });
      localStorage.clear();
      document.getElementById("success-change").showModal();
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
          description={"Berhasil Merubah Password"}
          textButton={"Login Sekarang"}
          title={"Berhasil"}
          functionClick={() => (window.location.href = "/login")}
          id="success-change"
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
          <h1 className="text-center text-gray-700 text-xl font-bold">Masuk</h1>
          <InputPassword
            label="Password Baru"
            placeholder="Masukan Password"
            id="passwordNew"
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            handelChange={handelChange}
          />
          <InputPassword
            label="Konfirmasi Password Baru"
            placeholder="Masukan Konfirmasi Password"
            id="passwordConfirm"
            showPassword={showPasswordNew}
            setShowPassword={setShowPasswordNew}
            handelChange={handelChange}
          />
          <button
            className="py-2 bg-secondary text-white rounded-full px-[3rem] font-semibold hover:shadow-md hover:font-bold hover:cursor-pointer mt-7"
            type="submit"
          >
            Buat Ulang Password
          </button>
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
}


export default ChangePassword;
