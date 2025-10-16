const AppBar = () => {
  return (
    <div className="flex justify-between items-center h-[40px] w-full bg-red-500 text-white px-4">
      <h1 className="text-center font-bold">Binge Ops</h1>
      <div>
        {/* Future feature: Add search bar */}
        <button
          onClick={() => alert("Feature coming soon!")}
          className="absolute top-2 right-2 bg-white bg-opacity-70 hover:bg-opacity-100 text-black px-2 py-1 rounded"
        >
          🍿
        </button>
      </div>
    </div>
  );
};

export default AppBar;
