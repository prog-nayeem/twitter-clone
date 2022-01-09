import TwitterIcon from '@mui/icons-material/Twitter';
import CommonSidebar from './CommonSidebar';
import CameraIndoorOutlinedIcon from '@mui/icons-material/CameraIndoorOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import FeaturedPlayListOutlinedIcon from '@mui/icons-material/FeaturedPlayListOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Tag } from '@mui/icons-material';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { signOut, useSession } from 'next-auth/react';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { twitterModelOpen } from '../../feature/modelSlice';
import { useDispatch } from 'react-redux';
import SidebarTwitteOption from './SidebarTwitteOption';
import GrassIcon from '@mui/icons-material/Grass';

const Header = () => {
  const { data: session } = useSession();
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();

  const hendelMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="sticky mr-2 xs:inline-flex lg:flex-1 -top-0 flex justify-between hidden max-h-screen flex-col">
        <div>
          <CommonSidebar
            icon={<TwitterIcon style={{ fontSize: '30px' }} />}
            isColored
            isClicked
          />
          <CommonSidebar
            icon={<CameraIndoorOutlinedIcon />}
            name="Home"
            isActive
            isClicked
          />
          <CommonSidebar icon={<Tag />} name="Explore" />
          <CommonSidebar
            icon={<NotificationsNoneOutlinedIcon />}
            name="Notifactions"
          />
          <CommonSidebar icon={<EmailOutlinedIcon />} name="Message" />
          <CommonSidebar
            icon={<BookmarkBorderOutlinedIcon />}
            name="Bookmarks"
          />
          <CommonSidebar icon={<FeaturedPlayListOutlinedIcon />} name="List" />
          <CommonSidebar icon={<PersonOutlinedIcon />} name="Profile" />
          <CommonSidebar icon={<ExpandMoreIcon />} name="More" />
          <button
            onClick={() => dispatch(twitterModelOpen())}
            className="bg-blue-500 hidden lg:inline-block text-white font-medium py-4 mt-3 rounded-full ml-3 px-20 hover:bg-blue-500 transition-all duration-100"
          >
            Twitte
          </button>
          <button
            className="p-3 rounded-full lg:hidden bg-blue-700 text-white mt-1"
            onClick={() => dispatch(twitterModelOpen())}
          >
            <GrassIcon />
          </button>

          {/* Twitte Function component */}

          <SidebarTwitteOption />
        </div>
        <div
          className="lg:hidden cursor-pointer hover:bg-gray-100 rounded-full w-16 h-16 grid place-items-center"
          onClick={hendelMenu}
        >
          <img
            className="w-10 h-10 rounded-full object-cover"
            src={session?.user?.image}
            alt="image"
          />
        </div>
        <div
          onClick={hendelMenu}
          className="flex mb-3 hidden lg:inline-flex items-center cursor-pointer px-4 py-2 hover:bg-gray-200 rounded-full justify-between transition-all duration-100"
        >
          <div className="flex items-center space-x-2">
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={session?.user?.image}
              alt="image"
            />
            <div>
              <p className="font-semibold">{session?.user.name}</p>
              <p className="text-sm opacity-60">@{session?.user?.tag}</p>
            </div>
          </div>
          <MoreHorizOutlinedIcon />
        </div>
      </div>
      {/* loghout menu section here */}

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
        }}
        transformOrigin={{
          vertical: 'top',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: 270,
          },
        }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b-2 border-gray-50">
          <div className="flex items-center space-x-2">
            <img
              className="w-10 h-10 rounded-full object-cover"
              src={session?.user?.image}
              alt="image"
            />
            <div>
              <p className="font-semibold">{session?.user.name}</p>
              <p className="text-sm opacity-60">@{session?.user?.tag}</p>
            </div>
          </div>
          <CheckIcon className="text-blue-600" />
        </div>

        <MenuItem className="hover:bg-gray-50 transition-all duration-100 px-5 py-3 cursor-pointer ">
          Add an existing account
        </MenuItem>
        <MenuItem
          onClick={(handleClose, signOut)}
          className="hover:bg-gray-50 transition-all duration-100 px-5 py-3 cursor-pointer"
        >
          Log out{' '}
          <span className="opacity-70 ml-1 text-sm">@{session?.user?.tag}</span>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Header;
