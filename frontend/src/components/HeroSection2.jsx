import bgImage from "../assets/img/hero1.jpg"
import { useContact } from "../store/contactStore"

const HeroSection2 = () => {
    const {phoneNumber} = useContact()
  return(
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url(${bgImage})`
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Pernikahan Impian Menunggu Anda!</h1>
          <p className="mb-5">
            Kami siap membantu Anda merancang momen spesial yang tak terlupakan. Mulai dari dekorasi hingga dokumentasi, semua ditangani dengan profesional dan sepenuh hati.
          </p>
          <a href={`https://wa.me/${phoneNumber}`}
            target="_blank" className="btn bg-[#D4AF37] border-none">Pesan Sekarang</a>
        </div>
      </div>
    </div>
  )
}

export default HeroSection2