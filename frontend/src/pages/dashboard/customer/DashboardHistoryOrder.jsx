import { useEffect, useState } from "react";
import { instance } from "../../../axios";
import useTokenValidation from "../../../hooks/useTokenValidation";
import WrapperDashboardCustomer from "../../../components/WrapperDashboardCustomer";
import { Loading } from "../../../components/loading/Loading";
import ModalDetailProductOrder from "../../../components/modal/ModalDetailProductOrder";
import formatDate from "../../../utils/formatTimestamp";
import { formatPrice } from "../../../utils/formatPrice";
import { ModalError } from "../../../components/modal/ModalError";

const DashboardHistoryOrder = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [productOrder, setProductOrder] = useState();
    // const [dataChange, setDataChange] = useState({});
    const [error, setError] = useState(null);
    const {userId} = useTokenValidation();

    useEffect(() => {
      const fetch = async () => {
        setIsLoading(true);
        const [orderRes] = await Promise.all([
          instance.get(`/orders/customer/${userId}`),
        ]);
        setOrders(orderRes.data);
        setIsLoading(false);
      };
      fetch();
    }, [userId]);
    return (
      <>
        {isLoading && <Loading />}
        <WrapperDashboardCustomer tabActive={"history"}>
          <ModalError error={error} setError={setError} />
          <ModalDetailProductOrder
            id="modal-product"
            itemsOrder={productOrder}
          />
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
                      <p>{item.customerName}</p>
                    </td>
                    <td>
                      <p className="">{formatDate(item.eventDate)}</p>
                    </td>
                    <td>
                      <p className="max-h-15 overflow-y-scroll">
                        {item.address}
                      </p>
                    </td>
                    <td>
                      <p className="">{item.phoneNumber}</p>
                    </td>
                    <td>
                      <p className="">{item.note}</p>
                    </td>
                    <td>
                      <a
                        href={`${item.paymentProof}`}
                        target="_blank"
                        className="underline hover:text-blue-600"
                      >
                        lihat bukti pembayaran
                      </a>
                    </td>
                    <td>
                      <p>{item.status.statusName}</p>
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
                        <button
                          type="button"
                          onClick={() => {
                            setProductOrder(item.itemsOrder);
                            document
                              .getElementById("modal-product")
                              .showModal();
                          }}
                          className="btn btn-secondary btn-xs text-white"
                        >
                          Lihat detail
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </WrapperDashboardCustomer>
      </>
    );
}

export default DashboardHistoryOrder;