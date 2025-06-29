import WrapperDashboard from "../../components/WrapperDashboard"

const Dashboard = () => {
  return(
    <WrapperDashboard>
      <div className="min-h-screen p-5">
        <div className="bg-gradient-to-br from-secondary to-[#755e13] w-full min-h-[50vh] rounded-2xl flex justify-center flex-col px-3">
          <h1 className="lg:text-5xl text-3xl text-white font-bold">
            Selamat Datang di Dashboard
          </h1>
        </div>
      </div>
    </WrapperDashboard>
  )
}
export default Dashboard