import SearchIcon from '@mui/icons-material/Search';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FollowSection from './FollowSection';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';

const RightSide = ({ follow, tranding }) => {
  return (
    <>
      <div className="ml-4 flex-1 md:inline-block hidden">
        <div className="sticky top-0 z-50 bg-white">
          <div className="relative">
            <input
              className="bg-gray-100 w-full rounded-full pl-9 focus:bg-transparent focus:border z-50  focus:border-blue-400 h-10 mt-1 mb-1 outline-none "
              placeholder="Search twitte"
              type="text"
            />
            <SearchIcon className="absolute top-4 left-2 z-50 text-blue-300" />
          </div>
        </div>
        <div className="bg-gray-100 rounded-lg  mt-3">
          <div className="flex items-center justify-between p-2">
            <h3 className="text-xl font-semibold"> Trends for you</h3>
            <span className="p-2 hover:bg-gray-50 rounded-full transition-all duration-150">
              <SettingsOutlinedIcon />
            </span>
          </div>
          {tranding?.map(({ heading, discription, tags }, index) => (
            <div key={index} className="hover:bg-gray-200 cursor-pointer p-2">
              <div className="flex items-center justify-between">
                <p className="text-sm opacity-70">{heading}</p>
                <span className="p-2 hover:bg-blue-100 text-blue-600 text-sm cursor-pointer transition-all duration-100 rounded-full">
                  <MoreHorizOutlinedIcon />
                </span>
              </div>
              <p>{discription}</p>
              <p className="font-semibold">{tags}</p>
            </div>
          ))}
          <p className="text-blue-400 hover:bg-gray-200 p-2 w-full cursor-pointer">
            Show more
          </p>
        </div>
        {/* follow component here */}

        <FollowSection follow={follow} />
        <div>
          <p className="opacity-50 text-sm mt-4">
            Terms of Service Privacy Policy Cookie Policy Ads info More © 2021
            Twitter, Inc.
          </p>
        </div>
      </div>
    </>
  );
};

export default RightSide;
