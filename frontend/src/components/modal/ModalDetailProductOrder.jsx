import { formatPrice } from "../../utils/formatPrice"

const ModalDetailProductOrder = ({
  itemsOrder = [],
  id = "info",
}) => {
  console.log(itemsOrder)
  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id={id} className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-white">
          <div className="flex items-center justify-center w-full flex-col">
            <table className="table">
              {/* head */}
              <thead className="bg-[#EDEDF0] text-black font-semibold text-base ">
                <tr className="text-center">
                  <th>Nama Layanan</th>
                  <th>Harga saat dipesan</th>
                </tr>
              </thead>
              <tbody className="text-center text-black">
                {itemsOrder?.map((item) => (
                  <tr key={item.idProduct}>
                      <td>
                        <p
                          className="cursor-pointer underline underline-offset-1"
                        >
                          {item.productName}
                        </p>
                      </td>
                      <td>
                      <p className="text-xs">Rp. {formatPrice(item.priceAtOrder)}</p>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Button Confirm */}

          {/* <div className="flex justify-center items-center gap-2 px-1">
            <form
              method="dialog"
              action=""
              className="btn bg-white text-black border-secondary border-2 w-1/2  hover:bg-gray-300 hover:border-none my-5 rounded-full relative"
            >
              <button className="w-full h-full absolute">Tidak</button>
            </form>
            <form
              method="dialog"
              action=""
              className="btn bg-gradient-to-br bg-secondary text-white rounded-full px-[30px] font-semibold hover:bg-yellow-700 w-1/2 relative"
            >
              <button
                type="submit"
                className="w-full h-full absolute"
                onClick={funtionOnConfirm}
              >
                {buttonText}
              </button>
            </form>
          </div> */}
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>Tidak</button>
        </form>
      </dialog>
    </>
  )
}

export default ModalDetailProductOrder