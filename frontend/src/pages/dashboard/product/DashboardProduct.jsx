import { useEffect, useState } from "react"
import { instance } from "../../../axios"
import { formatPrice } from "../../../utils/formatPrice"
import WrapperDashboard from "../../../components/WrapperDashboard"
import { Link } from "react-router-dom"
import ModalConfirm from "../../../components/modal/ModalConfirm"
import { ModalSuccess } from "../../../components/modal/ModalSuccess"
import { Loading } from "../../../components/loading/Loading"

const DashboardProduct = () => {
  const [product, setProduct] = useState([])
  const [idDelete, setIdDelete] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  async function fetchData() {
    const payload = await instance.get("/product")
    const data = payload.data
    setProduct(data)
  }
  useEffect(() => {
    fetchData()
  }, [])
  const handleDelete = async (id) => {
    console.log(id)
    try {
      const result = await instance.delete(`/product/${id}`)
      console.log(result)
      alert("hapus data sukses")
      fetchData()
      setIdDelete(null)
    } catch (error) {
      console.error(error)
    }
  }
  const handleStatusActive = async (id, status) => {
    setIsLoading(true)
    try {
      await instance.patch(`/product/status/${id}`, status, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      document.getElementById("success-status").showModal();
      fetchData()
      setIsLoading(false)
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    }
  }
  return (
    <>
      {isLoading && <Loading /> }
      <WrapperDashboard tabActive={"product"}>
        <ModalSuccess description={"Berhasil mengubah status"} textButton={"Tutup"} title={"Berhasil"} id="success-status" />
        <ModalConfirm description={"apakah anda yankin untuk menghapus Layanan ini?"}
          title={"Konfirmasi"} id="modal-confirm" funtionOnConfirm={() => handleDelete(idDelete)} />
        <div className="w-full min-h-screen bg-white">
          <div className="w-full px-7 pt-4 pb-2 text-gray-700">
            <div className="overflow-x-auto">
              <Link to={"form"} className="btn btn-secondary text-white mb-5">+ Tambah</Link>
              <table className="table">
                {/* head */}
                <thead className="bg-[#EDEDF0] text-black font-semibold text-base ">
                  <tr className="text-center">
                    <th>ID</th>
                    <th>Nama Layanan</th>
                    <th>Deskripsi</th>
                    <th>Harga</th>
                    <th>Status Aktif</th>
                    <th className="rounded-tr-lg">Aksi</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {product &&
                    product?.map((item) => (
                      <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>
                          <p
                            // onClick={() => {
                            //   setIdDetail(item.id);
                            //   setDetailProductAndService(true);
                            // }}
                            className="cursor-pointer underline underline-offset-1"
                          >
                            {item.productName}
                          </p>
                        </td>
                        <td>
                          <p className="max-h-15 overflow-y-scroll text-xs">{item.shortDescription}</p>
                        </td>
                        <td>
                          <p className="text-xs">Rp. {formatPrice(item.price)}</p>
                        </td>
                        <td>
                          <input type="checkbox" checked={item.activeStatus}
                            onChange={(e) => handleStatusActive(item.id, e.target.checked)} className="toggle checked:bg-secondary bg-gray-300" />
                        </td>
                        <td className="text-center ">
                          <div className="lg:flex lg:items-center">
                            <Link
                              className="btn btn-secondary text-white hover:bg-gray-400 border-none my-1 lg:my-0 mx-3 btn-sm"
                              to={`form/${item.id}`}
                            >
                              Ubah
                            </Link>
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

export default DashboardProduct