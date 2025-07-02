import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ModalConfirm = ({
  title,
  description,
  funtionOnConfirm,
  id = "info",
  buttonText = 'Ya',
}) => {
  return(
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id={id} className="modal">
        <div className="modal-box bg-white">
          <div className="flex items-center justify-center w-full flex-col">
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className="text-[#FECF18] text-[8rem]"
            />

            <h3 className="text-center text-2xl text-black">{title}</h3>
            <p className="text-center text-sm text-gray-700">{description}</p>
          </div>

          {/* Button Confirm */}
          <>
            <div className="flex justify-center items-center gap-2 px-1">
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
            </div>
          </>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Tidak</button>
        </form>
      </dialog>
    </>
  )
}
export default ModalConfirm