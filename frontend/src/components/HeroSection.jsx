import heroImg from '../assets/img/hero-2.png'
const HeroSection = () => {

  return (
    <div className="hero min-h-screen bg-[#FFF3EF] text-black -mt-16">
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus numquam nobis harum voluptas dolorem optio quas modi pariatur ullam ea, laborum exercitationem iure tempora, consequuntur itaque nesciunt a, ipsum animi!
          </p>
          <button className="btn bg-[#D4AF37] border-none">Get Started</button>
        </div>
      </div>
    </div>
  )
}
export default HeroSection