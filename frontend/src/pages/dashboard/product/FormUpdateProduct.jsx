import { useEffect, useRef, useState } from "react"
import WrapperDashboard from "../../../components/WrapperDashboard"
import { Loading } from "../../../components/loading/Loading"
import { ModalSuccess } from "../../../components/modal/ModalSuccess"
import { Link, useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import { Editor } from "@tinymce/tinymce-react"
import { baseURL, instance } from "../../../axios"

const FormUpdateProduct = () => {
  const editorRef = useRef(null)
  const image = useRef()
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams();
  const [product, setProduct] = useState({})
  const [content, setContent] = useState("");
  useEffect(() => {
    async function fetchData(id) {
      const payload = await instance.get(`/product/${id}`)
      const data = payload.data
      setProduct(data)
      setContent(data.detailDescription);
    }
    if (id) {
      fetchData(id)
    }
  }, [id])
  console.log(product)
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault()
    const form = new FormData()
    form.append("name", product.productName)
    form.append("price", product.price)
    form.append("shortDescription", product.shortDescription)

    if(editorRef.current && editorRef.current.getContent() ) {
      form.append("detailDescription", editorRef.current.getContent())
    }else {
      form.append("detailDescription", product.detailDescription)
    }
    if(image.current) {
      form.append("photo", image.current.files[0])
    }
    console.log(form)
    try {
      await instance.put(`/product/${id}`, form, {
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
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };
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
          <label htmlFor="productName" className="label">
            <span className="label text-black font-semibold">Nama Layanan</span>
          </label>
          <div className="input input-bordered w-full bg-primary text-black flex items-center">
            <input
              type="text"
              placeholder="Masukkan nama layanan atau produk di sini"
              id="productName"
              defaultValue={product.productName}
              name="productName"
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
              defaultValue={product.price}
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
              defaultValue={product.shortDescription}
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
              initialValue={content}
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
              <img src={`${baseURL}/uploads/${product.photo}`} alt="" className="w-[20rem] rounded-2xl max-h-[27rem] object-cover" />
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
export default FormUpdateProduct