import { useEffect, useState } from "react"
import WrapperNavbar from "../components/WrapperNavbar"
import { instance } from "../axios"
import Card from "../components/Card"
import Footer from "../components/Footer"
import ContactWA from "../components/ContactWA"

const Product = () => {
   const [product, setProduct] = useState([])
    useEffect(() => {
      async function fetchData() {
        const payload = await instance.get("/public/product")
        const data = payload.data
        setProduct(data)
      }
      fetchData()
    }, [])
  return(
    <WrapperNavbar>
      <div className="container mx-auto">
      <h2 className="text-center pb-7 text-4xl head-font">Layanan Kami</h2>
      
      <div className="flex justify-around items-center md:flex-row flex-col gap-5 md:px-25">
        {product && product.length > 0 ? (
          product.map((item, idx) => (
            <Card key={item.id || idx}
              id={item.id}
              description={item.shortDescription}
              img={item.photo}
              title={item.productName}
            />
          ))
        ) : (""
        )}
      </div>
      </div>
      <ContactWA />
      <Footer />
    </WrapperNavbar>
  )
}

export default Product