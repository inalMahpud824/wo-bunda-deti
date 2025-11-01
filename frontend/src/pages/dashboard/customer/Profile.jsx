import { useEffect, useState } from "react";
import { Loading } from "../../../components/loading/Loading";
import ModalConfirm from "../../../components/modal/ModalConfirm";
import { ModalError } from "../../../components/modal/ModalError";
import WrapperDashboardCustomer from "../../../components/WrapperDashboardCustomer";
import { instance } from "../../../axios";
import useTokenValidation from "../../../hooks/useTokenValidation";
import { ModalSuccess } from "../../../components/modal/ModalSuccess";

const Profile = () => {
  const [dataUser, setDataUser] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const {userId} = useTokenValidation()
  const fetch = async () => {
    setIsLoading(true)
    try {
      const result = await instance.get("/api/user/" + userId)
      setDataUser(result.data)
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
  }

  useEffect(() => {
    fetch()
  }, [])


  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      await instance.put(`/api/user`, dataUser)
      document.getElementById("modal-success").showModal()
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
  }
  const handleChange = (e) => {
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      {isLoading && <Loading />}
      <WrapperDashboardCustomer tabActive={"profile"}>
        <ModalSuccess
          description={"Sukses update data profile"}
          textButton={"Tutup"}
          title={"Sukses"}
          id="modal-success"
        />
        <ModalError error={error} setError={setError} />
        <ModalConfirm
          id="modal-confirm"
          description={"Apakah anda yakin untuk mengubah informasi Profile ini?"}
          title={"Konfirmasi"}
          buttonText="Ya"
          funtionOnConfirm={() => handleSubmit()}
        />
        <div className="min-h-screen p-5 text-black">
          <form action="" className="flex flex-col gap-4">
            <label htmlFor="name" className="label">
              <span className="label text-black font-semibold">
                Nama Lengkap
              </span>
            </label>
            <div className="input input-bordered w-full bg-primary text-black flex items-center">
              <input
                type="text"
                placeholder="Masukkan nama layanan atau produk di sini"
                id="name"
                defaultValue={dataUser.name}
                name="name"
                className="placeholder:text-black w-full"
                onChange={handleChange}
              />
            </div>
            <label htmlFor="address" className="label">
              <span className="label text-black font-semibold">
                Alamat
              </span>
            </label>
            <div className="input input-bordered w-full bg-primary text-black flex items-center">
              <input
                type="text"
                placeholder="Masukkan alamat di sini"
                id="address"
                defaultValue={dataUser.address}
                name="address"
                className="placeholder:text-black w-full"
                onChange={handleChange}
              />
            </div>
            <label htmlFor="phoneNumber" className="label">
              <span className="label text-black font-semibold">
                Nomor WhatsApp
              </span>
            </label>
            <div className="input input-bordered w-full bg-primary text-black flex items-center">
              <input
                type="text"
                placeholder="Masukkan nomor telepon atau WhatsApp di sini"
                id="phoneNumber"
                defaultValue={dataUser.phoneNumber}
                name="phoneNumber"
                className="placeholder:text-black w-full"
                onChange={handleChange}
              />
            </div>
            <button
              type="button"
              onClick={() =>
                document.getElementById("modal-confirm").showModal()
              }
              className="btn btn-secondary w-full text-white"
            >
              Simpan
            </button>
          </form>
        </div>
      </WrapperDashboardCustomer>
    </>
  );
}
export default Profile