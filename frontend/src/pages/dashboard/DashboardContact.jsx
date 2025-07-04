import { useEffect, useState } from "react"
import ModalConfirm from "../../components/modal/ModalConfirm"
import WrapperDashboard from "../../components/WrapperDashboard"
import { instance } from "../../axios"
import { ModalError } from "../../components/modal/ModalError"
import { Loading } from "../../components/loading/Loading"
import { ModalSuccess } from "../../components/modal/ModalSuccess"

const DashboardContact = () => {

  const [dataContact, setDataContact] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const fetch = async () => {
    setIsLoading(true)
    try {
      const result = await instance.get("/contact")
      setDataContact(result.data[0])
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
      await instance.put(`/contact/${dataContact.id}`, dataContact)
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
    setDataContact({
      ...dataContact,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      {isLoading && <Loading />}
      <WrapperDashboard tabActive={"contact"}>
        <ModalSuccess description={"Sukses update data kontak"} textButton={"Tutup"} title={"Sukses"} id="modal-success" />
        <ModalError error={error} setError={setError} />
        <ModalConfirm id="modal-confirm" description={"Apakah anda yakin untuk mengubah informasi kontak"} title={"Konfirmasi"} buttonText="Ya" funtionOnConfirm={() => handleSubmit()} />
        <div className="min-h-screen p-5 text-black">
          <form action="" className="flex flex-col gap-4">
            <label htmlFor="phoneNumber" className="label">
              <span className="label text-black font-semibold">Nomor WhatsApp</span>
            </label>
            <div className="input input-bordered w-full bg-primary text-black flex items-center">
              <input
                type="text"
                placeholder="Masukkan nama layanan atau produk di sini"
                id="phoneNumber"
                defaultValue={dataContact.phoneNumber}
                name="phoneNumber"
                className="placeholder:text-black w-full"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded-2xl shadow-xs">
              <h2 className="capitalize font-bold">informasi pembayaran</h2>
              <label htmlFor="bankName" className="label">
                <span className="label text-black font-semibold">Nama Bank</span>
              </label>
              <div className="input input-bordered w-full bg-white text-black flex items-center">
                <input
                  type="text"
                  placeholder="contoh: Bank Central Asia"
                  defaultValue={dataContact.bankName}
                  id="bankName"
                  name="bankName"
                  className="placeholder:text-black w-full"
                  onChange={handleChange}
                />
              </div>
              <label htmlFor="accountNumber" className="label">
                <span className="label text-black font-semibold">Nomor Rekening</span>
              </label>
              <div className="input input-bordered w-full bg-white text-black flex items-center">
                <input
                  type="text"
                  placeholder="Masukkan nama layanan atau produk di sini"
                  id="accountNumber"
                  name="accountNumber"
                  defaultValue={dataContact.accountNumber}
                  className="placeholder:text-black w-full"
                  onChange={handleChange}
                />
              </div>
              <label htmlFor="ownerNameAccount" className="label">
                <span className="label text-black font-semibold">Nama Pemilik Rekening</span>
              </label>
              <div className="input input-bordered w-full bg-white text-black flex items-center">
                <input
                  type="text"
                  placeholder="Masukkan nama layanan atau produk di sini"
                  id="ownerNameAccount"
                  name="ownerNameAccount"
                  defaultValue={dataContact.ownerNameAccount}
                  className="placeholder:text-black w-full"
                  onChange={handleChange}
                />
              </div>
            </div>
            <button type="button" onClick={() => document.getElementById("modal-confirm").showModal()} className="btn btn-secondary w-full text-white">Simpan</button>
          </form>
        </div>
      </WrapperDashboard>
    </>
  )
}
export default DashboardContact