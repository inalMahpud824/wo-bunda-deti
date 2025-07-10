import { Link } from "react-router-dom"
import { ModalSuccess } from "../../../components/modal/ModalSuccess"
import WrapperDashboard from "../../../components/WrapperDashboard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons"
import { useRef, useState } from "react"
import { Loading } from "../../../components/loading/Loading"
import { instance } from "../../../axios"

const FormAddGallery = () => {
  const image = useRef()
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault()
    const form = new FormData()
    const files = image.current.files
    for (let i = 0; i < files.length; i++) {
      form.append("images", files[i]);
    }

    try {
      await instance.post("/gallery", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      document.getElementById("success-add").showModal();
      setIsLoading(false)
    } catch (e) {
      console.error(e)
      setIsLoading(false)
    }
  }
  return (
    <>
      {isLoading && <Loading />}
      <WrapperDashboard tabActive={"gallery"}>
        <ModalSuccess description={"sukses menambahkan Gambar"} textButton={"Kembali"} title={"Sukses"} id="success-add" functionClick={() => window.location.href = "/dashboard/gallery"} />
        <Link
          to={"/dashboard/gallery"}
          className="text-lg text-black font-bold"
        >
          <FontAwesomeIcon icon={faAngleLeft} className="text-gray-700 mx-2" />
          Kembali
        </Link>
        <form onSubmit={handleSubmit} className="w-full p-7 min-h-screen flex flex-col gap-4 text-black">
          <label className="label">
            <span className="label text-black font-semibold">Foto Product</span>
          </label>
          <div className="border-dashed border-2 px-4 py-6 mb-2 flex flex-col items-center justify-between rounded-xl gap-2 w-full">
            <FontAwesomeIcon icon={faCloudArrowUp} className="text-[2.5rem] text-secondary" />
            <p className="font-semibold text-black pb-2">Pilih file disini</p>
            <p className="fontlight text-sm text-gray-400">
              Format JPEG, PNG, dan JPG, up to 2 MB
            </p>
            <input
              type="file"
              name="photo"
              ref={image}
              multiple
              accept="image/jpeg, image/png, image/jpg"
              className="file-input file-input-bordered w-full max-w-xs bg-white text-black file-input-secondary"
            />
          </div>
          <button
            type="submit"
            className="btn btn-secondary w-full text-white hover:bg-yellow-700 my-5"
          >
            Simpan
          </button>
        </form>
      </WrapperDashboard>
    </>
  )
}
export default FormAddGallery