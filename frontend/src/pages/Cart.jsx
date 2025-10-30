import { useEffect, useRef, useState } from "react"
import { Loading } from "../components/loading/Loading"
import WrapperNavbar from "../components/WrapperNavbar"
import { baseURL, instance } from "../axios"
import { formatPrice } from "../utils/formatPrice"
import Footer from "../components/Footer"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCloudArrowUp, faStarOfLife, faTrash } from "@fortawesome/free-solid-svg-icons"
import ContactWA from "../components/ContactWA"
import { useContact } from "../store/contactStore"
import { ModalError } from "../components/modal/ModalError"
import { ModalSuccess } from "../components/modal/ModalSuccess"
import useTokenValidation from "../hooks/useTokenValidation"

const Cart = () => {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [dataOrder, setDataOrder] = useState()
  const image = useRef()
  const [error, setError] = useState(null)
  const [orderStatus, setOrderStatus] = useState([])
  const { login, userId } = useTokenValidation()
  const {
    phoneNumber,
    bankName,
    accountNumber,
    ownerAccountName } = useContact()
  useEffect(() => {
    setIsLoading(true)
    if(!login) {
      window.location.href = "/login";
      setIsLoading(false);
      return;
    }
    async function fetch() {
      try {

        const [productRes, orderStatus] = await Promise.all([
          instance.get(`/cart/${userId}`),
          instance.get(`/public/order-status`)
        ]
        );

        setOrderStatus(orderStatus.data)
        setProducts(productRes.data);
        setIsLoading(false)
      } catch (e) {
        console.error(e)
        setIsLoading(false)
      }
    }
    fetch()
  }, [login, userId])

  const handleRemoveFromCart = async (idToRemove) => {
    setIsLoading(true);
    try {
      await instance.delete(`/cart/${idToRemove}`)
      alert("Produk berhasil dihapus dari keranjang!");
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menghapus produk dari keranjang.");
      setIsLoading(false);
    }

    // Hapus produk dari state
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== idToRemove));
  };

  const handelChange = (e) => {
    setDataOrder({
      ...dataOrder,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault()
    if (products.length === 0) {
      setIsLoading(false);
      setError("Tidak ada product di keranjang")
      return;
    }
    const form = new FormData()
    const status = orderStatus.find(item => item.statusName == "MENUNGGU")
    form.append("eventDate", dataOrder.eventDate)
    form.append("customerName", dataOrder.customerName)
    form.append("phoneNumber", dataOrder.phoneNumber)
    form.append("address", dataOrder.address)
    form.append("orderStatusId", status.id)
    if (dataOrder.note) {
      form.append("note", dataOrder.note)
    }
    products.forEach((item) => {
      form.append("productId", item.id)
    })
    form.append("paymentProof", image.current.files[0])
    try {
      await instance.post("/public/order", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      document.getElementById("modal-success").showModal()
      localStorage.removeItem("cart");
      setProducts([])
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
      <WrapperNavbar>
        <ModalError error={error} setError={setError} />
        <ModalSuccess description={`Berhasil melakukan pemesanan, Jangan lupa untuk konfirmasi ke nomer WhatsApp admin ${phoneNumber} atau bisa klik icon whatsApp di pojok kanan bawah`} 
          title={"Berhasil"} textButton={"Tutup"} id="modal-success" />
        <div className="container mx-auto">

          <div className="w-full px-7 py-7 bg-[#fef9f5] text-black md:px-24">
            <h2 className="font-bold text-xl py-6">Layanan yang di pesan</h2>
            <div className="flex flex-col gap-4">
              {products.length > 0 ? products.map((item) => (
                <div className="flex items-center justify-between gap-4" key={item.id}>
                  <div className="flex items-center gap-4 bg-white rounded-2xl shadow-md p-5 w-full" >
                    <img
                      src={`${baseURL}/uploads/${item.photo}`}
                      alt=""
                      width={70}
                      className="rounded-xl"
                    />
                    <div className="">
                      <p>Nama : {item.productName}</p>
                      <p>Harga : Rp. {formatPrice(item.price)}</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => handleRemoveFromCart(item.id)} className="hover:cursor-pointer">
                    <FontAwesomeIcon icon={faTrash} className="text-2xl text-red-500 hover:text-red-700" />
                  </button>
                </div>
              )) : ""}
            </div>

            <div className="bg-white rounded-2xl shadow-md p-5 my-7">
              <h2 className="text-xl font-semibold py-1">Cara pembayaran</h2>
              <p>Sebelum mengisi form pastikan nama layanan yang dipesan sesuai. Selain itu minimal tanggal acara <strong> H +3 yaitu 3 hari setelah hari</strong></p>
              <p>
                Silahkan kirim sejumlah uang yang sesuai dengan harga layanan ke
                rekening berikut
              </p>
              <ul>
                <li>Bank: {bankName}</li>
                <li>Nomor Rekening: {accountNumber}</li>
                <li>Nama: {ownerAccountName}</li>
              </ul>
              <h2 className="text-xl font-semibold py-1">Konfirmasi Pembayaran</h2>
              <p>
                Setelah melakukan pembayaran dan mengisi formulir, silahkan
                konfirmasi ke nomor WhatsApp berikut: <strong>{phoneNumber}</strong>{" "}
                atau bisa juga konfirmasi ke icon whatsApp yang mengambang di
                website pojok kanan bawah. Pesanan anda akan diproses lebih lanjut
              </p>
            </div>

            <form
              action=""
              onSubmit={handleSubmit}
              className="w-full bg-white rounded-xl p-7 mt-6 mx-auto shadow-md"
            >
              <h2 className="text-center font-bold text-lg capitalize">
                Isi data diri
              </h2>
              <label htmlFor="customerName" className="font-semibold">
                Nama Pemesan <FontAwesomeIcon
                  icon={faStarOfLife}
                  className="text-red-500 text-[5px] pb-2"
                />
              </label>
              <input
                id="customerName"
                name="customerName"
                type="text"
                placeholder="masukan nama pemesan"
                className="input w-full bg-gray-100 my-4"
                required
                onChange={handelChange}
              />
              <label htmlFor="eventDate" className="font-semibold">
                Tanggal acara <FontAwesomeIcon
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
              <label htmlFor="phoneNumber" className="font-semibold">
                No WhatsApp <FontAwesomeIcon
                  icon={faStarOfLife}
                  className="text-red-500 text-[5px] pb-2"
                />
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                placeholder="Contoh: 08837123"
                className="input w-full bg-gray-100 my-4"
                required
                onChange={handelChange}
              />
              <label htmlFor="address" className="font-semibold">
                Alamat lengkap <FontAwesomeIcon
                  icon={faStarOfLife}
                  className="text-red-500 text-[5px] pb-2"
                />
              </label>
              <input
                id="address"
                name="address"
                type="text"
                placeholder="contoh: jl soekarno hatta rt/rw desa kecamatan kabupaten"
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
                  Bukti Pembayaran <FontAwesomeIcon
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
              <button type="submit" className="btn btn-secondary text-white w-full my-4">
                Kirim
              </button>
            </form>
          </div>
        </div>
        <ContactWA />
        <Footer />
      </WrapperNavbar>
    </>
  )
}

export default Cart