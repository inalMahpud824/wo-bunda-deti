import { useEffect, useState } from "react"
import { Loading } from "../../components/loading/Loading"
import WrapperDashboard from "../../components/WrapperDashboard"
import { baseURL, instance } from "../../axios"
import { formatPrice } from "../../utils/formatPrice"
import ModalDetailProductOrder from "../../components/modal/ModalDetailProductOrder"
import ModalConfirm from "../../components/modal/ModalConfirm"
import { ModalError } from "../../components/modal/ModalError"
import formatDate from "../../utils/formatTimestamp"

const DashboardOrder = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [orders, setOrders] = useState([])
  const [orderStatus, setOrderStatus] = useState([])
  const [productOrder, setProductOrder] = useState()
  const [dataChange, setDataChange] = useState({})
  const [error, setError] = useState(null)

  const fetchOrder = async () => {
    try{
      const result = await instance.get("/orders")
      setOrders(result.data)
    }catch(e){
      console.error(e)
    }
  }

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true)
      const [orderRes, orderStatusRes] = await Promise.all([
        instance.get(`/orders`),
        instance.get(`/public/order-status`) // ganti sesuai kebutuhan
      ])
      setOrders(orderRes.data)
      setOrderStatus(orderStatusRes.data)
      setIsLoading(false)
    }
    fetch()
  }, [])
  const handleChangeStatus = async (dataChange) => {
    setIsLoading(true)
    try {
      await instance.post(`/orders/status/${dataChange.id}`, {
        orderStatusId: dataChange.statusId
      })
      fetchOrder()
      setIsLoading(false)
    } catch (e) {
      const errorMessage =
        typeof e.response?.data?.message === "string"
          ? e.response.data.message
          : "Internal Server Error";
      console.error(e)
      setError(errorMessage);
      setIsLoading(false)
    }
  }
  return (
    <>
      {isLoading && <Loading />}
      <WrapperDashboard tabActive={"order"}>
        <ModalError error={error} setError={setError} />
        <ModalDetailProductOrder id="modal-product" itemsOrder={productOrder} />
        <ModalConfirm id="modal-status" description={"Apakah anda yakin ingin mengubah status pesanan ini?"} title={"Konfirmasi"} buttonText="Yakin" 
        funtionOnConfirm={() => handleChangeStatus(dataChange)} />
        <div className="min-h-screen p-5 text-black">
          <table className="table">
            {/* head */}
            <thead className="bg-[#EDEDF0] text-black font-semibold">
              <tr className="text-center">
                <th className="rounded-tl-lg">ID</th>
                <th>Nama Cutomer</th>
                <th>Tanggal Acara</th>
                <th>Alamat Lengkap</th>
                <th>Nomer WhatsApp</th>
                <th>Catatan Tambahan</th>
                <th>Bukti pembayaran</th>
                <th>Status</th>
                <th>Total Harga</th>
                <th>Tanggal Order</th>
                <th>Tanggal diupdate</th>
                <th className="rounded-tr-lg">Layanan yang dipesan</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {orders?.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    <p
                      className="cursor-pointer underline underline-offset-1"
                    >
                      {item.customerName}
                    </p>
                  </td>
                  <td>
                    <p className="">{item.eventDate}</p>
                  </td>
                  <td>
                    <p className="max-h-15 overflow-y-scroll">{item.address}</p>
                  </td>
                  <td>
                    <p className="">{item.phoneNumber}</p>
                  </td>
                  <td>
                    <p className="">{item.note}</p>
                  </td>
                  <td>
                    <a href={`${baseURL}/uploads/${item.paymentProof}`} target="_blank" className="underline hover:text-blue-600">lihat bukti pembayaran</a>
                  </td>
                  <td>
                    <select
                      value={item.status.id}
                      onChange={(e) => {
                        setDataChange({ id: item.id, statusId: Number(e.target.value) })
                        document.getElementById("modal-status").showModal()
                      }}
                      className="select select-sm w-full min-w-36 bg-white text-black text-sm"
                    >
                      <option disabled value="">Pilih status</option>
                      {orderStatus.map((status) => (
                        <option key={status.id} value={status.id}>
                          {status.statusName}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <p className="">Rp. {formatPrice(item.totalPrice)}</p>
                  </td>
                  <td>
                    <p className="">{formatDate(item.orderDate)}</p>
                  </td>
                  <td>
                    <p className="">{formatDate(item.updateAt)}</p>
                  </td>
                  <td>
                    <div className="flex justify-center items-center gap-2">
                    <ul className="list-disc">
                      {item.itemsOrder.map((itemOrder) => (
                        <li key={itemOrder.id}>{itemOrder.productName}</li>
                      ))}
                    </ul>
                    <button type="button" 
                        onClick={() => {
                          setProductOrder(item.itemsOrder)
                          document.getElementById("modal-product").showModal()
                        } }
                    className="btn btn-secondary btn-xs text-white">Lihat detail</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </WrapperDashboard>
    </>
  )
}

export default DashboardOrder