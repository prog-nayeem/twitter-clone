import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import PushPinIcon from '@mui/icons-material/PushPin';
import BlockIcon from '@mui/icons-material/Block';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Menu, MenuItem } from '@mui/material';
import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import { useState } from 'react';
import { deleteDoc, doc } from '@firebase/firestore';
import { db } from '../../firebase';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const MenuSection = ({ postId, post, commentId, comment }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { data: session } = useSession();
  const { query } = useRouter();

  const singlePostId = query.postId;
  
  // menu open and close function

  const handleMenu = (event) => {
    event.stopPropagation();

    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e) => {
    e.stopPropagation();
    setAnchorEl(null);
  };
  // deleting hole post function

  const handleDelet = async () => {
    await deleteDoc(doc(db, 'post', postId));
  };

  const handleDeleteComment = async (commentId) => {
    await deleteDoc(
      doc(db, 'post', singlePostId, 'comments', commentId)
    );
  };
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <div onClick={handleMenu} className="icon text-black hover:bg-blue-200">
        <MoreHorizIcon />
      </div>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: 270,
          },
        }}
      >
        {session?.user?.id === comment?.userId && (
          <MenuItem
            onClick={() => handleDeleteComment(commentId)}
            className="icon_text text-red-500"
          >
            <DeleteForeverOutlinedIcon /> <span>Delete</span>
          </MenuItem>
        )}
        {session?.user?.id === post?.userId && (
          <MenuItem onClick={handleDelet} className="icon_text text-red-500">
            <DeleteForeverOutlinedIcon /> <span>Delete</span>
          </MenuItem>
        )}
        <MenuItem className="icon_text">
          <PushPinIcon /> <span>Pin to your profile</span>
        </MenuItem>
        <MenuItem className="icon_text">
          <BlockIcon /> <span>Block</span>
        </MenuItem>
        <MenuItem className="icon_text">
          <AspectRatioIcon /> <span>Embed Tweet</span>
        </MenuItem>
        <MenuItem className="icon_text">
          <AlignVerticalBottomIcon /> <span>View Tweet activity</span>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MenuSection;
