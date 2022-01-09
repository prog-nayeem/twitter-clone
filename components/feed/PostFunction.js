import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import GifBoxOutlinedIcon from '@mui/icons-material/GifBoxOutlined';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import MoodIOutlinedIcon from '@mui/icons-material/MoodOutlined';
import EventNoteOutlinedIcon from '@mui/icons-material/EventNoteOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRef } from 'react';
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { ref, getDownloadURL, uploadString } from 'firebase/storage';

const PostFunction = () => {
  const [post, setPost] = useState('');
  const [file, setFile] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [lodding, setLodding] = useState(false);
  const targetFile = useRef();
  const { data: session } = useSession();

  // File targating functonality

  const handleFile = (event) => {
    const reader = new FileReader();
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setFile(readerEvent.target.result);
    };
  };
  //   Add emoji functionality

  const addEmoji = (e) => {
    let sym = e.unified.split('-');
    let codesArray = [];
    sym.forEach((el) => codesArray.push('0x' + el));
    let emoji = String.fromCodePoint(...codesArray);
    setPost(post + emoji);
  };

  //   Uploading data on firebase functionality

  const onSubmit = async () => {
    if (lodding) return;
    setLodding(true);
    try {
      const docRef = await addDoc(collection(db, 'post'), {
        userName: session.user.name,
        userImage: session.user.image,
        userTag: session.user.tag,
        userId: session.user.id,
        postTitle: post,
        timestamp: serverTimestamp(),
      });
      const imageRef = ref(storage, `post/${docRef.id}/image`);
      if (file) {
        await uploadString(imageRef, file, 'data_url').then(async () => {
          const downloadURL = await getDownloadURL(imageRef);
          await updateDoc(doc(db, 'post', docRef.id), {
            image: downloadURL,
          });
        });
      }
      setPost('');
      setFile(null);
    } catch (e) {
      alert(e.message);
    }
    setLodding(false);
    setShowEmojiPicker(false);
  };
  return (
    <>
      <div className="border-b-2 border-gray-50 px-3">
        
        {/* Input Section  */}

        <div className={`${lodding && 'opacity-40'}`}>
          <div className="flex space-x-3 mt-2">
            <img
              className="w-12 h-12 rounded-full object-cover"
              src={session?.user?.image}
              alt="image"
            />
            <textarea
              value={post}
              onChange={(e) => setPost(e.target.value)}
              placeholder="what's happening?"
              rows="3"
              style={{ resize: 'none' }}
              className="tracking-wide outline-none scrollbar-hide mt-2 text-xl placeholder-gray-300 w-full focus:border-b-2 border-gray-50"
            />
          </div>

          {/* slected image show here jsx */}

          {file && (
            <div className="relative w-full">
              <CancelIcon
                style={{ fontSize: '32px' }}
                onClick={() => setFile(null)}
                className="absolute cursor-pointer top-1 left-1 hover:text-red-600"
              />
              <img
                className="w-full object-cover rounded-xl"
                src={file}
                alt="image"
              />
            </div>
          )}
        </div>

        {/* input file option here */}

        {!lodding && (
          <div className=" flex items-center justify-between space-x-2 h-14">
            <div className="">
              <span className="icon group-hover:bg-gray-100 ">
                <input
                  hidden
                  type="file"
                  onChange={handleFile}
                  ref={targetFile}
                />
                <ImageOutlinedIcon onClick={() => targetFile.current.click()} />
              </span>
              <span className="icon">
                <GifBoxOutlinedIcon />
              </span>
              <span className="icon">
                <PollOutlinedIcon />
              </span>
              <span className="icon relative">

                {/* eomji section here */}

                {showEmojiPicker && (
                  <Picker
                    onSelect={addEmoji}
                    style={{
                      position: 'absolute',
                      boxShadow: '0px 10px 15px -3px rgb(0 0 0 / 40%)',
                      borderRedius: '10px',
                      top: '50px',
                      left: '-110px',
                    }}
                    showSkinTones={false}
                    showPreview={false}
                  />
                )}
                <MoodIOutlinedIcon
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                />
              </span>
              <span className="icon">
                <EventNoteOutlinedIcon />
              </span>
            </div>
            <button
              onClick={onSubmit}
              disabled={!post.trim() && !file}
              type="button"
              className="disabled:opacity-60 bg-blue-600 text-white font-medium px-5 py-2 rounded-full"
            >
              Twitte
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default PostFunction;
