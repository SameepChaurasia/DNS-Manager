import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
import Person3Icon from '@mui/icons-material/Person3';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import DescriptionIcon from '@mui/icons-material/Description';
import ClearIcon from '@mui/icons-material/Clear';
import NotificationsIcon from '@mui/icons-material/Notifications';


const Navbar = (props) => {
  const [show, setShow] = useState(false);
  const [icon, showIcon] = useState(true);
  const [notificationList, setNotificationList] = useState([]);
  const boxRef = useRef(null);
  const navigate = useNavigate()
  const [admin, setAdmin] = useState('user');

  const handleClickOutside = (event) => {
    if (boxRef.current && !boxRef.current.contains(event.target)) {
      setShow(false);
    }
  };

  const logoutFunction = () => {
    secureLocalStorage.removeItem('token');
    secureLocalStorage.removeItem('name');
    secureLocalStorage.removeItem('id');
    secureLocalStorage.removeItem('active')
    secureLocalStorage.removeItem('profilePic');
    navigate('/login');
  }
  useEffect(() => {
    // Attach the event listener when the component mounts
    document.addEventListener('mousedown', handleClickOutside);
    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* For Tablet and Desktop View */}
      <div className="hidden md:flex sm:flex-row bg-red-500 text-white">
        <div className="flex flex-row">
          <div className='font-[800] text-[25px] mt-2 ml-16 '>DNS MANAGER</div>
          <Link to='/'><div className="text-[16px] ml-5 mt-4 hover:text-[#5cffff]">Home</div></Link>
          <Link to='/'><div className=" text-[16px] ml-5 mt-4  hover:text-[#5cffff]">Dashboard</div></Link>
          {admin == 'admin' && <Link to='/admin'><div className="ml-5  mt-4 text-[16px] hover:text-[blue]" onClick={() => { navigate('/admin'); }}>Admin</div></Link>}
        </div>
        {/* <div className="text-xl font-bold ml-10 text-black mt-3">Hello, {name}</div> */}
        <div className="flex justify-end flex-grow">
          <div className="pr-2 flex flex-row ml-8 sm:float-right ">
            <button
              className="mt-3 mb-2  ml-5 rounded border-2 border-primary  text-sm text-primary transition duration-150 ease-in-out focus:outline-none focus:ring-0 motion-reduce:transition-none p-[6px]"
              type="button" id="button-addon3" onClick={() => { setShow(!show) }} ><NotificationsIcon /></button>
            <Person3Icon className="rounded-full border-2 ml-2 mt-3 cursor-pointer" style={{ height: "36px", width: "36px" }} />
            {show &&
              <div ref={boxRef} className="absolute right-0 z-10 mt-16 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 text-black ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
                {notificationList.length == 0 && <div className='flex text-center justify-center h-40 rounded-lg w-48 '>There is no notification.</div>}
                <div className='flex flex-col'>
                  {
                    notificationList.length > 0 && notificationList.map((item, key) => {
                      return (
                        <div className=''>{item}</div>
                      )
                    })
                  }
                </div>


              </div>
            }
          </div>
        </div>
      </div>
      {/* For Mobile View */}
      <div className='grid grid-cols-2 md:hidden bg-white'>
        {!icon && <div className="m-2 md:hidden cursor-pointer text-center justify-center pt-1 w-8 h-8 hover:rounded-full hover:bg-slate-400" ><MenuIcon onClick={() => { showIcon(!icon); }} /></div>}
        {icon && <div className="m-2 md:hidden cursor-pointer text-center justify-center pt-1 h-8 w-8 hover:rounded-full hover:bg-slate-400"><ClearIcon onClick={() => { showIcon(!icon); }} /></div>}

      </div>
      {icon &&
        <div className="md:hidden">
          <div className='grid grid-cols-1 mt-0 font-bold  text-xl md:hidden bg-white text-[#232323] w-full'>
            <Link to='/'><div className="hover:bg-blue-500 p-1 text-xl w-full"><HomeIcon />     Home</div></Link>
            <Link to='/'><div className="hover:bg-blue-500 p-1 text-xl"><ShoppingBasketIcon />    Dashboard</div></Link>
            <div className="hover:bg-blue-500 p-1 text-xl cursor-pointer" onClick={logoutFunction}><LogoutIcon />     Sign out</div>
          </div>
        </div>
      }
    </>
  )
}

export default Navbar