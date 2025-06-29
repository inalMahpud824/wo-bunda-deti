import { useEffect, useState } from "react"
import WrapperDashboard from "../../components/WrapperDashboard"
import { instance } from "../../axios"
import { formatPrice } from "../../utils/formatPrice"

const DashboardProduct = () => {
     const [product, setProduct] = useState([])
      useEffect(() => {
        async function fetchData() {
          const payload = await instance.get("/public/product")
          const data = payload.data
          setProduct(data)
        }
        fetchData()
      }, [])
  return (
    <WrapperDashboard tabActive={"product"}>
      <div className="w-full min-h-screen bg-white">
        <div className="w-full px-7 pt-4 pb-2 text-gray-700">
          <div className="overflow-x-auto">
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
                        <input type="checkbox" defaultChecked className="toggle checked:bg-secondary bg-gray-300" />
                      </td>
                      <td className="text-center ">
                        <div className="lg:flex lg:items-center">
                          <button
                            className="btn btn-secondary text-white hover:bg-gray-400 border-none my-1 lg:my-0 mx-3 btn-sm"
                            // onClick={() => {
                            //   setIdEdit(item.id);
                            //   setEditProductAndService(true);
                            // }}
                          >
                            Ubah
                          </button>
                          <button
                            className="btn btn-error text-white btn-sm"
                          //   onClick={() => handleDelete(item.id)}
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
  )
}

export default DashboardProduct