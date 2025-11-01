import { useEffect, useRef, useState } from "react";
import WrapperNavbar from "../components/WrapperNavbar";
import { faCloudArrowUp, faStarOfLife } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContactWA from "../components/ContactWA";
import Footer from "../components/Footer";
import { useContact } from "../store/contactStore";
import { instance } from "../axios";
import { useParams } from "react-router-dom";
import { Loading } from "../components/loading/Loading";
import { formatPrice } from "../utils/formatPrice";
import { ModalError } from "../components/modal/ModalError";
import { ModalSuccess } from "../components/modal/ModalSuccess";
import useTokenValidation from "../hooks/useTokenValidation";

const Order = () => {
  const image = useRef();
  const [product, setProduct] = useState()
  const [orderStatus, setOrderStatus] = useState([])
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [dataOrder, setDataOrder] = useState()
  const [error, setError] = useState(null)
  const {login, userId} = useTokenValidation()
  const {
    phoneNumber,
    bankName,
    accountNumber,
    ownerAccountName } = useContact()

  useEffect(() => { 
    if(!login) {
      window.location.href = "/login"
      return
    }
    const fetch = async () => {
      setIsLoading(true)
      try {
        const [productRes, orderStatus] = await Promise.all([
          instance.get(`/public/product/${id}`),
          instance.get(`/public/order-status`) // ganti sesuai kebutuhan
        ])
        setProduct(productRes.data)
        setOrderStatus(orderStatus.data)
        setIsLoading(false)
      } catch (e) {
        console.error(e)
        setIsLoading(false)
      }
    }
    if (id) {
      fetch()
    }
  }, [id])

  const handelChange = (e) => {
    setDataOrder({
      ...dataOrder,
      [e.target.name]: e.target.value,
    });
  };
const handleSubmit = async (e) => {
  e.preventDefault()
    setIsLoading(true)
    const form = new FormData()
    const status = orderStatus.find(item => item.statusName == "MENUNGGU")
    form.append("eventDate", dataOrder.eventDate)
    form.append("orderStatusId", status.id)
    form.append("userId", userId)
    if (dataOrder.note) {
      form.append("note", dataOrder.note)
    }
    form.append("productId", id)
    form.append("paymentProof", image.current.files[0])
    try {
      await instance.post("/order", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      document.getElementById("modal-success").showModal()
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
      <WrapperNavbar>
      {isLoading && <Loading />}
        <ModalSuccess
          description={`Berhasil melakukan pemesanan, Jangan lupa untuk konfirmasi ke nomer WhatsApp admin ${phoneNumber} atau bisa klik icon whatsApp di pojok kanan bawah`}
          title={"Berhasil"}
          textButton={"Tutup"}
          id="modal-success"
        />
        <ModalError error={error} setError={setError} />
        <div className="container mx-auto w-full px-7 py-7 bg-[#fef9f5] text-black md:px-24">
          <h2 className="font-bold text-xl py-6">Layanan yang di pesan</h2>
          {product && (
            <div className="flex items-center gap-4 bg-white rounded-2xl shadow-md p-5">
              <img
                src={`${product.photo}`}
                alt=""
                width={70}
                className="rounded-xl"
              />
              <div className="">
                <p>Nama : {product.productName}</p>
                <p>Harga : Rp. {formatPrice(product.price)}</p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl shadow-md p-5 my-7">
            <h2 className="text-xl font-semibold py-1">Cara pembayaran</h2>
            <p>
              Sebelum mengisi form pastikan data pada profile dan nama layanan
              yang dipesan sesuai. Selain itu minimal tanggal acara{" "}
              <strong> H +3 yaitu 3 hari setelah hari </strong>
              Silahkan kirim sejumlah uang yang sesuai dengan harga layanan ke
              rekening berikut
            </p>
            <ul>
              <li>Bank: {bankName}</li>
              <li>Nomor Rekening: {accountNumber}</li>
              <li>Nama: {ownerAccountName}</li>
            </ul>
            <h2 className="text-xl font-semibold py-1">
              Konfirmasi Pembayaran
            </h2>
            <p>
              Setelah melakukan pembayaran dan mengisi formulir, silahkan
              konfirmasi ke nomor WhatsApp berikut:{" "}
              <strong>{phoneNumber}</strong> atau bisa juga konfirmasi ke icon
              whatsApp yang mengambang di website pojok kanan bawah. Pesanan
              anda akan diproses lebih lanjut
            </p>
          </div>

          <form
            action=""
            onSubmit={handleSubmit}
            className="w-full bg-white rounded-xl p-7 mt-6 mx-auto shadow-md"
          >
            <h2 className="text-center font-bold text-lg capitalize">
              Isi data pemesanan
            </h2>
            <label htmlFor="eventDate" className="font-semibold">
              Tanggal acara{" "}
              <FontAwesomeIcon
                icon={faStarOfLife}
                className="text-red-500 text-[5px] pb-2"
              />
            </label>
            <input
              id="eventDate"
              name="eventDate"
              type="datetime-local"
              className="input w-full bg-gray-100 my-4"
              required
              onChange={handelChange}
            />
            <label htmlFor="note" className="font-semibold">
              Catatan tambahan (optional)
            </label>
            <input
              id="note"
              name="note"
              type="text"
              placeholder="Catatan tambahan yang ingin diberikan untuk admin"
              className="input w-full bg-gray-100 my-4"
              onChange={handelChange}
            />
            <label htmlFor="paymentProof" className="label">
              <span className="label text-black font-semibold">
                Bukti Pembayaran{" "}
                <FontAwesomeIcon
                  icon={faStarOfLife}
                  className="text-red-500 text-[5px] pb-2"
                />
              </span>
            </label>
            <div className="border-dashed border-2 px-4 py-6 mb-2 flex flex-col items-center justify-between rounded-xl gap-2 w-full mt-2">
              <FontAwesomeIcon
                icon={faCloudArrowUp}
                className="text-[2.5rem] text-secondary"
              />
              <p className="font-semibold text-black pb-2">Pilih file disini</p>
              <p className="fontlight text-sm text-gray-400">
                Format JPEG, PNG, dan JPG, up to 2 MB
              </p>
              <input
                type="file"
                name="paymentProof"
                ref={image}
                accept="image/jpeg, image/png, image/jpg"
                className="file-input file-input-bordered w-full max-w-xs bg-white text-black file-input-secondary"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-secondary text-white w-full my-4"
            >
              Kirim
            </button>
          </form>
        </div>
        <ContactWA />
        <Footer />
      </WrapperNavbar>
    </>
  );
};

export default Order;
