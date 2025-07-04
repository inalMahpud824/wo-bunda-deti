
export const ModalError = ({error, setError}) => {

  const closeError = (e) => {
    e.target.parentElement.style.display = "none";
    setError(null);
  }
  return (
    <>
      {error && (
        <div className="toast toast-bottom lg:toast-start toast-center">
          <div className="alert alert-error text-white flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="truncate md:max-w-[40rem] sm:max-w-[20rem] lg:max-w-[70rem] max-w-[15rem] text-base">
              {error}
            </span>
            <button
              className="btn btn-xs btn-circle border-none absolute right-0 top-0 bg-red-900 text-white"
              onClick={closeError}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}