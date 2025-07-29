import { useEffect, useState } from "react"
import WrapperDashboard from "../../../components/WrapperDashboard"
import { Loading } from "../../../components/loading/Loading"
import { ModalSuccess } from "../../../components/modal/ModalSuccess"
import ModalConfirm from "../../../components/modal/ModalConfirm"
import { Link } from "react-router-dom"
import { baseURL, instance } from "../../../axios"
import formatDate from "../../../utils/formatTimestamp"

const DashboardGallery = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [idDelete, setIdDelete] = useState()
  const [gallery, setGallery] = useState([])
  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true)
      try {
        const result = await instance.get("/public/gallery")
        setGallery(result.data)
        setIsLoading(false)
      } catch (e) {
        console.error(e)
        setIsLoading(false)
      }
    }
    fetch()
  }, [])
  const handleDelete = async (id) => {
    setIsLoading(true)
    try {
      await instance.delete(`/gallery/${id}`)
      setGallery((prevGallery) => prevGallery.filter((item) => item.id !== id));
      alert("Hapus data sukses")
      setIsLoading(false)
      setIdDelete(null)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }
  return (
    <>
      {isLoading && <Loading />}
      <WrapperDashboard tabActive={"gallery"}>
        <ModalSuccess description={"Berhasil mengubah status"} textButton={"Tutup"} title={"Berhasil"} id="success-status" />
        <ModalConfirm description={"apakah anda yankin untuk photo ini?"}
          title={"Konfirmasi"} id="modal-confirm" funtionOnConfirm={() => handleDelete(idDelete)} />
        <div className="w-full min-h-screen bg-white">
          <div className="w-full px-7 pt-4 pb-2 text-gray-700">
            <div className="overflow-x-auto">
              <Link to={"add"} className="btn btn-secondary text-white mb-5">+ Tambah</Link>
              <table className="table">
                {/* head */}
                <thead className="bg-[#EDEDF0] text-black font-semibold text-base ">
                  <tr className="text-center">
                    <th>ID</th>
                    <th>Photo</th>
                    <th>Tanggal dibuat</th>
                    <th className="rounded-tr-lg">Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {
                    gallery?.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>
                          <img src={`${baseURL}/uploads/${item.photo}`} alt="" width={70}
                            className="mx-auto"
                          />
                        </td>
                        <td>
                          <p className="text-sm">{formatDate(item.createdAt)}</p>
                        </td>
                        <td className="text-center ">
                          <div className="lg:flex justify-center lg:items-center">
                            <button
                              className="btn btn-error text-white btn-sm"
                              onClick={() => {
                                setIdDelete(item.id)
                                document.getElementById("modal-confirm").showModal();
                              }}
                            >
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </WrapperDashboard>
    </>
  )
}

export default DashboardGallery