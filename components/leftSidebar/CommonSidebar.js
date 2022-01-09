import { useRouter } from 'next/router';

const CommonSidebar = ({ icon, name, isActive, isColored, isClicked }) => {
  const router = useRouter();
  const handleClick = () => {
    if (isClicked) {
      router.push('/');
    }
  };
  return (
    <>
      <div className="">
        <div
          onClick={handleClick}
          className={`space-x-2 text-xl cursor-pointer hover:bg-gray-100 transition-all duration-100 inline-block rounded-full p-3 ${
            isActive && 'font-bold'
          } ${isColored && 'text-blue-600'}`}
        >
          {icon}
          <span className="lg:inline-block hidden"> {name} </span>
        </div>
      </div>
    </>
  );
};

export default CommonSidebar;
