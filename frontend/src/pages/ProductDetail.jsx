import { Link, useParams } from "react-router-dom";
import WrapperNavbar from "../components/WrapperNavbar";
import { useEffect, useState } from "react";
import { instance } from "../axios";
import { formatPrice } from "../utils/formatPrice";
import Footer from "../components/Footer";
import { useContact } from "../store/contactStore";
import ContactWA from "../components/ContactWA";
import useTokenValidation from "../hooks/useTokenValidation";
import { Loading } from "../components/loading/Loading";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const { phoneNumber } = useContact();
  const {login, userId} = useTokenValidation();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchData(id) {
      const payload = await instance.get(`/public/product/${id}`);
      const data = payload.data;
      setProduct(data);
    }
    if (id) {
      fetchData(id);
    }
  }, [id]);
  const handleAddToCart = async () => {
    setIsLoading(true);
    if(!login) {
      window.location.href = "/login";
      setIsLoading(false);
      return;
    }

    try {
      console.log(userId)
      await instance.post("/cart", {
        userId: userId,
        productId: product.id,
      });
      setIsLoading(false);
      alert("Produk berhasil ditambahkan ke keranjang!");
    } catch (error) {
      console.error("Error menambahkan produk ke keranjang:", error);
      setIsLoading(false);
      alert(error.response?.data?.message || "Gagal menambahkan produk ke keranjang.");
    }

    // const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // // Hindari duplikat ID
    // if (!existingCart.includes(product.id)) {
    //   existingCart.push(product.id);
    //   localStorage.setItem("cart", JSON.stringify(existingCart));
    //   alert("Produk berhasil ditambahkan ke keranjang!");
    // } else {
    //   alert("Produk sudah ada di keranjang!");
    // }
  };
  return (
    <WrapperNavbar>
      {isLoading && <Loading />}
      <div className="container mx-auto">
        <div className="flex md:flex-row flex-col md:gap-7 md:items-start md:px-24 bg-primary text-black p-7 relative">
          {product && (
            <>
              <div className="md:w-[70%] w-full">
                <img
                  src={`${product.photo}`}
                  alt=""
                  className="rounded-2xl max-h-[27rem] w-full object-cover"
                />
                <h2 className="text-4xl font-bold pt-5 pb-2 head-font">
                  {product.productName}
                </h2>
                <p>{product.shortDescription}</p>
                <div
                  dangerouslySetInnerHTML={{
                    __html: product.detailDescription,
                  }}
                />
              </div>

              <div className="md:w-[30%] w-full rounded-2xl shadow-xl md:border bg-accent sticky border-gray-300 px-4 py-6 md:top-0 bottom-0">
                <div className="flex justify-between items-center text-lg pb-4">
                  <p>Harga</p>
                  <p className="font-bold">Rp. {formatPrice(product.price)}</p>
                </div>
                <div className="flex md:flex-col flex-row justify-center md:items-center md:justify-around">
                  <div className="flex gap-3 justify-center items-center md:pt-7 md:w-full px-2">
                    <Link
                      onClick={() => {
                        if (!login) {
                          window.location.href = "/login";
                        } else {
                          window.location.href = `/service/${id}/order`;
                        }
                      }}
                      className="btn md:btn-md btn-sm btn-secondary md:w-1/2 text-white"
                    >
                      Beli Sekarang
                    </Link>
                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="btn md:btn-md btn-sm btn-accent md:w-1/2 text-black"
                    >
                      + Keranjang
                    </button>
                  </div>
                  <a
                    href={`https://wa.me/${phoneNumber}`}
                    target="_blank"
                    className="btn md:btn-md btn-sm btn-secondary text-white md:mt-4 md:w-full"
                  >
                    Chat Admin
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <ContactWA />
      <Footer />
    </WrapperNavbar>
  );
};
export default ProductDetail;
