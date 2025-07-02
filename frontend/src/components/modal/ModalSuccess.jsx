import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const ModalSuccess = ({
  title,
  description,
  textButton,
  functionClick,
  id = "info",
}) => {
  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id={id} className="modal">
        <div className="modal-box bg-white">
          <div className="flex items-center justify-center w-full flex-col">
            <FontAwesomeIcon
              icon={faCircleCheck}
              className="text-[#4BAC87] text-[8rem]"
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
                className="btn btn-secondary text-white rounded-full px-[30px] font-semibold w-[80%] mt-4 relative"
              >
                <button
                  className="w-full h-full absolute hover:cursor-pointer"
                  onClick={functionClick}
                >
                  {textButton}
                </button>
              </form>
            </div>
          </>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};
