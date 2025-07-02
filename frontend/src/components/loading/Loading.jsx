export const Loading = () => {
  return (
    <div className="w-full h-full absolute bg-gray-300 opacity-85 flex items-center justify-center z-[10000]">
      <span className="loading loading-spinner text-secondary w-[4rem]"></span>
    </div>
  );
}