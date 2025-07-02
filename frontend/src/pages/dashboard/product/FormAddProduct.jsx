import { faAngleLeft, faCloudArrowUp } from "@fortawesome/free-solid-svg-icons"
import WrapperDashboard from "../../../components/WrapperDashboard"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Editor } from '@tinymce/tinymce-react';
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { instance } from "../../../axios";
import { ModalSuccess } from "../../../components/modal/ModalSuccess";
import { Loading } from "../../../components/loading/Loading";

const FormAddProduct = () => {
  const editorRef = useRef(null);
  const image = useRef();
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault()
    const form = new FormData()
    form.append("name", data.name)
    form.append("price", data.price)
    form.append("shortDescription", data.shortDescription)
    form.append("detailDescription", editorRef.current ? editorRef.current.getContent() : "")
    form.append("photo", image.current.files[0])
    console.log(form)
    try {
      await instance.post("/product", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      document.getElementById("success-add").showModal();
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  }

  return (
    <>
      {isLoading && <Loading />}

      <WrapperDashboard tabActive={"product"}>
        <ModalSuccess description={"sukses menambahkan Layanan"} textButton={"Kembali"} title={"Sukses"} id="success-add" functionClick={() => window.location.href = "/dashboard/service"} />
        <Link
          to={"/dashboard/service"}
          className="text-lg text-black font-bold"
        >
          <FontAwesomeIcon icon={faAngleLeft} className="text-gray-700 mx-2" />
          Kembali
        </Link>
        <form onSubmit={handleSubmit} className="w-full p-7 min-h-screen flex flex-col gap-4">
          <label htmlFor="name" className="label">
            <span className="label text-black font-semibold">Nama Layanan</span>
          </label>
          <div className="input input-bordered w-full bg-primary text-black flex items-center">
            <input
              type="text"
              placeholder="Masukkan nama layanan atau produk di sini"
              id="name"
              name="name"
              className="placeholder:text-black w-full"
              onChange={handleChange}
            />
          </div>
          <label htmlFor="price" className="label">
            <span className="label text-black font-semibold">Harga</span>
          </label>
          <div className="input input-bordered w-full bg-primary text-black flex items-center">
            <input
              type="number"
              placeholder="Masukkan harga layanan atau produk"
              id="price"
              name="price"
              className="placeholder:text-black w-full"
              onChange={handleChange}
            />
          </div>
          <label htmlFor="shortDescription" className="label">
            <span className="label text-black font-semibold">Deskripsi singkat</span>
          </label>
          <div className="input input-bordered w-full bg-primary text-black flex items-center">
            <input
              type="text"
              placeholder="Masukkan deskripsi singkat terkait layanan atau produk"
              id="shortDescription"
              name="shortDescription"
              className="placeholder:text-black w-full"
              onChange={handleChange}
            />
          </div>

          <label htmlFor="productDescription" className="label">
            <span className="label text-black font-semibold">
              Deskripsi Lengkap
            </span>
          </label>
          <>
            <Editor
              apiKey='mps9xh9zkfs2eo0afd55hynu8vo9gsw7gtk56c4waxh83yui'
              onInit={(_evt, editor) => editorRef.current = editor}
              initialValue="<p>Masukan deskripsi detail terkait layanan atau produk disini</p>"
              init={{
                height: 500,
                menubar: false,
                plugins: [
                  'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                  'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                  'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                  'bold italic forecolor | alignleft aligncenter ' +
                  'alignright alignjustify | bullist numlist outdent indent | ' +
                  'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
              }}
            />
          </>
          {/* Image Product input */}
          <>
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
                className="file-input file-input-bordered w-full max-w-xs bg-white text-black file-input-secondary"
              />
            </div>
          </>
          <button
            type="submit"
            className="btn btn-secondary w-full text-white hover:bg-yellow-700 my-5"
          // onClick={() => setAddProductAndService(false)}
          >
            Simpan
          </button>
        </form>
      </WrapperDashboard>
    </>
  )
}

export default FormAddProduct