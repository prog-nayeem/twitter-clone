import { Box, Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { twitterModelClose } from '../../feature/modelSlice';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import BoxContentFunction from './BoxContentFunction';

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  -webkit-tap-highlight-color: transparent;
`;

const SidebarTwitteOption = () => {
  const { twitterModelOpen } = useSelector((state) => state.model);
  const dispatch = useDispatch();

  return (
    <>
      <Modal
        className="grid place-items-center"
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={twitterModelOpen}
        onClose={() => dispatch(twitterModelClose())}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box
          className=" sm:w-[650px] w-full outline-none bg-white shadow-xl rounded-lg -mt-48"
          style={{ maxHeight: '600px' }}
        >
          <div className="border-b-2  border-gray-100 h-14 flex items-center">
            <span
              onClick={() => dispatch(twitterModelClose())}
              className="icon ml-2 text-black"
            >
              <CloseIcon />
            </span>
          </div>
          {/* Box Content Component */}

          <BoxContentFunction />
        </Box>
      </Modal>
    </>
  );
};

export default SidebarTwitteOption;
