import HeroSection from "../components/HeroSection";
import WrapperNavbar from "../components/WrapperNavbar";
import hero3 from "../assets/img/hero-3.jpg";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import { instance } from "../axios";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import ContactWA from "../components/ContactWA";

export const LandingPage = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const payload = await instance.get("/public/product");
      const data = payload.data;
      setProduct(data);
    }
    fetchData();
  }, []);
  return (
    <WrapperNavbar>
      <HeroSection />
      <div className="w-full container mx-auto px-7 py-7 bg-[#fef9f5] text-black md:px-24">
        <div className="hero-content text-center">
        <div className="flex lg:flex-row flex-col justify-between md:gap-12 items-center min-h-[100px]">
          <div className="flex flex-col justify-center items-center rounded-xl shadow-lg bg-white p-7">
            <h3 className="text-2xl head-font text-center pb-2">
              Sekarang saatnya anda tidak perlu repot lagi mempersiapkan
              pernikahan, Anda dapat menikah dengan biaya yang terjangkau
            </h3>
            <p className="lato-regular text-sm lg:text-base text-gray-500 text-center">
              Perkenalkan kami Bunda Deti service salah satu penyedia jasa
              pernikahan yang menjadi tempat dimana segala kebutuhan pernikahan
              calon perngantin tersedia disini. Dari mulai Tim Wedding organizer
              Bandung yang profesional dan komunikatif, menu catering yang lezat
              dan beraneka ragam, dekorasi yang elegan dan inovatif, tata rias &
              busana pengantin yang cantik, tim dokumentasi yang berpengalaman
              dan kreatif,serta tim hiburan dan upacara adat yang memberi
              tuntunan sekaligus tontonan semuanya lengkap dalam satu paket
              pernikahan bandung . Adapun jasa yang kami tawarkan dapat
              diperoleh secara satuan ataupun keseluruhan ( paket All in )
              tergantung kepada kebutuhan calon pengantin. Dengan moto ” nikah
              ga harus ribet, nikah ga harus mahal”. Kami berupaya membantu
              klien-klien kami untuk melaksanakan pernikahannya dengan terencana
              dan tentunya dengan biaya yang terjangkau.
            </p>
          </div>
          <img
            src={hero3}
            alt="wedding"
            className="lg:w-[20rem] pt-7 lg:p-0 rounded-tl-[100px] rounded-br-[100px] object-cover"
          />
        </div>
        </div>
        <div className="py-7">
          <h2 className="text-center pb-7 text-4xl head-font">Layanan Kami</h2>
          <div className="flex justify-around items-center md:flex-row flex-col gap-5">
            {product && product.length > 0
              ? product
                .slice(0, 3)
                .map((item, idx) => (
                  <Card
                    key={item.id || idx}
                    id={item.id}
                    description={item.shortDescription}
                    img={item.photo}
                    title={item.productName}
                  />
                ))
              : ""}
          </div>
          <div className="w-full flex justify-center items-center pt-8 pb-4">
            <Link
              to={"/service"}
              className="btn btn-secondary text-white rounded-2xl text-xl"
            >
              Lihat Selengkapnya
            </Link>
          </div>
          <section className="py-10 bg-[#fdf7f2]">
            <h2 className="text-3xl text-center font-bold mb-6 head-font">
              Galeri Pernikahan
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-7">
              <img
                src="https://placehold.co/400"
                className="rounded-xl shadow-md object-cover"
              />
              <img
                src="https://placehold.co/400"
                className="rounded-xl shadow-md object-cover"
              />
              <img
                src="https://placehold.co/400"
                className="rounded-xl shadow-md object-cover"
              />
            </div>
          </section>
          <div className="w-full flex justify-center items-center pt-8 pb-4">
            <button className="btn btn-secondary text-white rounded-2xl text-xl">
              Lihat Selengkapnya
            </button>
          </div>
          <section className="py-12 bg-accent text-center text-secondary rounded-2xl shadow-sm">
            <h2 className="text-3xl font-bold">
              Siap Mewujudkan Pernikahan Impianmu?
            </h2>
            <p className="text-lg mt-2">
              Hubungi kami sekarang untuk konsultasi gratis!
            </p>
            <button className="btn btn-secondary mt-5 text-white">
              Hubungi Kami
            </button>
          </section>
        </div>
      </div>
      <ContactWA />
      <Footer />
    </WrapperNavbar>
  );
};
