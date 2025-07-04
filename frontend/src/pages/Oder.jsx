import { useRef } from "react";
import WrapperNavbar from "../components/WrapperNavbar";
import { faCloudArrowUp, faStarOfLife } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContactWA from "../components/ContactWA";
import Footer from "../components/Footer";

const Order = () => {
  const image = useRef();
  return (
    <WrapperNavbar>
      <div className="w-full px-7 py-7 bg-[#fef9f5] text-black md:px-24">
        {/* <h1 className="font-bold text-2xl">Pesan Langsung</h1> */}
        <h2 className="font-bold text-xl py-6">Layanan yang di pesan</h2>
        <div className="flex items-center gap-4 bg-white rounded-2xl shadow-md p-5">
          <img
            src="https://placehold.co/400"
            alt=""
            width={70}
            className="rounded-xl"
          />
          <div className="">
            <p>Nama layanan yang dipesan</p>
            <p>harga : Rp 923312</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-5 my-7">
          <h2 className="text-xl font-semibold py-1">Cara pembayaran</h2>
          <p>Sebelum mengisi form pastikan nama layanan yang dipesan sesuai.</p>
          <p>
            Silahkan kirim sejumlah uang yang sesuai dengan harga layanan ke
            rekening berikut
          </p>
          <ul>
            <li>Bank: Mandiri</li>
            <li>Nomor Rekening: 909318231</li>
            <li>Nama: mahpud</li>
          </ul>
          <h2 className="text-xl font-semibold py-1">Konfirmasi Pembayaran</h2>
          <p>
            Setelah melakukan pembayaran dan mengisi formulir, silahkan
            konfirmasi ke nomor WhatsApp berikut: <strong>088901348151</strong>{" "}
            atau bisa juga konfirmasi ke icon whatsApp yang mengambang di
            website pojok kanan bawah. Pesanan anda akan diproses lebih lanjut
          </p>
        </div>
        <form
          action=""
          className="w-full bg-white rounded-xl p-7 mt-6 mx-auto shadow-md"
        >
          <h2 className="text-center font-bold text-lg capitalize">
            Isi data diri
          </h2>
          <label htmlFor="nama-pemesan" className="font-semibold">
            Nama Pemesan <FontAwesomeIcon
              icon={faStarOfLife}
              className="text-red-500 text-[5px] pb-2"
            />
          </label>
          <input
            id="nama-pemesan"
            type="text"
            placeholder="masukan nama pemesan"
            className="input w-full bg-gray-100 my-4"
            required
          />
          <label htmlFor="event-date" className="font-semibold">
            Tanggal acara <FontAwesomeIcon
              icon={faStarOfLife}
              className="text-red-500 text-[5px] pb-2"
            />
          </label>
          <input
            id="event-date"
            type="date"
            className="input w-full bg-gray-100 my-4"
            required
          />
          <label htmlFor="nama-pemesan" className="font-semibold">
            No WhatsApp <FontAwesomeIcon
              icon={faStarOfLife}
              className="text-red-500 text-[5px] pb-2"
            />
          </label>
          <input
            id="nama-pemesan"
            type="text"
            placeholder="Contoh: 08837123"
            className="input w-full bg-gray-100 my-4"
            required
          />
          <label htmlFor="nama-pemesan" className="font-semibold">
            Alamat lengkap <FontAwesomeIcon
              icon={faStarOfLife}
              className="text-red-500 text-[5px] pb-2"
            />
          </label>
          <input
            id="nama-pemesan"
            type="text"
            placeholder="contoh: jl soekarno hatta rt/rw desa kecamatan kabupaten"
            className="input w-full bg-gray-100 my-4"
            required
          />
          <label htmlFor="nama-pemesan" className="font-semibold">
            Catatan tambahan (optional)
          </label>
          <input
            id="nama-pemesan"
            type="text"
            placeholder="Catatan tambahan yang ingin diberikan untuk admin"
            className="input w-full bg-gray-100 my-4"
          />
          <label htmlFor="photo" className="label">
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
              name="photo"
              ref={image}
              className="file-input file-input-bordered w-full max-w-xs bg-white text-black file-input-secondary"
              required
            />
          </div>
          <button type="submit" className="btn btn-secondary text-white w-full my-4">
            Kirim
          </button>
        </form>
      </div>
      <ContactWA />
      <Footer />
    </WrapperNavbar>
  );
};

export default Order;
