import heroImg from '../assets/img/hero-2.png'
import { useContact } from '../store/contactStore'
const HeroSection = () => {
  const {phoneNumber} = useContact()

  return (
    <div className="hero min-h-screen bg-[#FFF3EF] text-black md:-mt-16">
      <div className="hero-content flex-col lg:flex-row-reverse pt-7">
        <img
          src={heroImg}
          alt="Wedding event"
          width={350}
          className="rounded-lg"
        />
        <div className='max-w-2xl'>
          <h1 className="text-7xl font-bold head-font">Pernikahan Impian Menunggu Anda!</h1>
          <p className="py-6 lato-regular">
            Kami siap membantu Anda merancang momen spesial yang tak terlupakan. Mulai dari dekorasi hingga dokumentasi, semua ditangani dengan profesional dan sepenuh hati.
          </p>
          <a href={`https://wa.me/${phoneNumber}`}
            target="_blank" className="btn bg-[#D4AF37] border-none">Pesan Sekarang</a>
        </div>
      </div>
    </div>
  )
}
export default HeroSection