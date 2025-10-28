import WrapperDashboard from "../../../components/WrapperDashboard"
import WrapperDashboardCustomer from "../../../components/WrapperDashboardCustomer"

const Dashboard = () => {
  return(
    <WrapperDashboardCustomer>
      <div className="min-h-screen p-5">
        <div className="bg-gradient-to-br from-secondary to-[#755e13] w-full min-h-[50vh] rounded-2xl flex justify-center flex-col px-3">
          <h1 className="lg:text-5xl text-3xl text-white font-bold">
            Selamat Datang di Dashboard Customer
          </h1>
        </div>
      </div>
    </WrapperDashboardCustomer>
  )
}
export default Dashboard