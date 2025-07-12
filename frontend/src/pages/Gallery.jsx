import { useEffect, useState } from "react";
import Footer from "../components/Footer"
import WrapperNavbar from "../components/WrapperNavbar"
import { baseURL, instance } from "../axios";
import { Loading } from "../components/loading/Loading";

const Gallery = () => {
  const [gallery, setGallery] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      const [gallerRes] = await Promise.all([
        instance.get(`/public/gallery`)
      ])
      setGallery(gallerRes.data)
      setIsLoading(false)
    }
    fetchData();
  }, []);
  return (
    <>
    {isLoading && <Loading />}
      <WrapperNavbar>
        <div className="w-full container mx-auto px-7 py-7 bg-[#fef9f5] text-black md:px-24 min-h-screen">
          <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
            {gallery.length > 0 && gallery.map((item, i) => (
              <div key={i} className="mb-4 break-inside-avoid">
                <img
                  loading="lazy"
                  src={`${baseURL}/uploads/${item.photo}`}
                  className="rounded-xl w-full block"
                />
              </div>
            ))}
          </div>

        </div>
        <Footer />
      </WrapperNavbar>
    </>
  )
}

export default Gallery