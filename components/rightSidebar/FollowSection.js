const FllowSection = ({ follow }) => {
  return (
    <>
      <div className="bg-gray-100 rounded-lg mt-3">
        <h2 className="text-black text-xl p-2 font-semibold">Who to follow</h2>
        {follow.map(({ userImg, username, tag }) => (
          <div
            key={tag}
            className="flex hover:bg-gray-200 items-center justify-between px-3 cursor-pointer hover:bg-gray-100 py-3"
          >
            <div className="flex items-center space-x-3">
              <img
                className="h-10 w-10 object-cover rounded-full"
                src={userImg}
                alt={tag}
              />
              <div>
                <p className="hover:underline cursor-pointer font-semibold text-base">
                  {username}
                </p>
                <p className="text-sm text-opacity-50">{tag}</p>
              </div>
            </div>
            <button className="bg-black rounded-full text-white font-semibold px-3 py-1 hover:bg-opacity-75">
              Follow
            </button>
          </div>
        ))}
        <p className="text-blue-500 cursor-pointer hover:bg-gray-200 p-3">
          Show more
        </p>
      </div>
    </>
  );
};

export default FllowSection;
