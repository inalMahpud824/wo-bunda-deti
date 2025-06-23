import HeroSection from "../components/HeroSection";
import WrapperNavbar from "../components/WrapperNavbar";
import hero3 from "../assets/img/hero-3.jpg";

export const LandingPage = () => {
  return (
    <WrapperNavbar>
      <HeroSection />
      <div className="flex md:flex-row flex-col justify-between md:gap-12 items-center bg-[#fef9f5] text-black md:px-25 px-7 min-h-[100px] py-7">
        <div className="flex flex-col justify-center items-center max-w-xl rounded-xl shadow-lg bg-white p-7">
          <h2>Bunda deti</h2>
          <h3 className="md:text-2xl head-font text-center pb-2">Sekarang saatnya anda tidak perlu repot lagi mempersiapkan pernikahan, Anda dapat menikah dengan biaya yang terjangkau</h3>
          <p className="lato-regular text-gray-500 text-md text-center">
            Perkenalkan kami Mawar wedding service salah satu penyedia jasa
            pernikahan yang menjadi tempat dimana segala kebutuhan pernikahan
            calon perngantin tersedia disini. Dari mulai Tim Wedding organizer
            Bandung yang profesional dan komunikatif, menu catering yang lezat
            dan beraneka ragam, dekorasi yang elegan dan inovatif, tata rias &
            busana pengantin yang cantik, tim dokumentasi yang berpengalaman dan
            kreatif,serta tim hiburan dan upacara adat yang memberi tuntunan
            sekaligus tontonan semuanya lengkap dalam satu paket pernikahan
            bandung . Adapun jasa yang kami tawarkan dapat diperoleh secara
            satuan ataupun keseluruhan ( paket All in ) tergantung kepada
            kebutuhan calon pengantin. Dengan moto ” nikah ga harus ribet, nikah
            ga harus mahal”. Kami berupaya membantu klien-klien kami untuk
            melaksanakan pernikahannya dengan terencana dan tentunya dengan
            biaya yang terjangkau.
          </p>
        </div>
        <img
          src={hero3}
          alt="wedding"
          className="max-w-md rounded-tl-[100px] rounded-br-[100px] object-cover"
        />
      </div>
    </WrapperNavbar>
  );
};
