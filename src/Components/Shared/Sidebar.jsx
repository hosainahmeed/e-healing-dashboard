import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router';
import { SidebarLink } from '../../Utils/Sideber/SidebarLink.jsx';
import { IoSettings } from 'react-icons/io5';
import Button from './Button.jsx';
import { MdArrowForwardIos } from 'react-icons/md';
// import logo from "../../assets/logo.png";

const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  // const navigate = useNavigate();
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    if (ref.current.querySelector('.active')) {
      setOpen(true);
    }
  }, [ref, location.pathname]);

  return (
    <div className=" px-4 pb-10 flex justify-start flex-col gap-3 sidebar">
      {/* <p className='text-6xl text-center text-[var(--bg-white)] my-4 font-bold'>ilera</p> */}
      {SidebarLink?.map((item) => (
        <NavLink
          onClick={() => {
            setOpen(false);
          }}
          to={item?.path}
          style={{
            width: '100%',
            justifyContent: 'start',
            paddingLeft: '14px',
            paddingRight: '14px',
          }}
          className={`button-white w-full ${
            item?.path === location.pathname
              ? '!bg-[var(--bg-pink-high)] !text-[var(--text-light)]'
              : '!bg-[var(--text-light)] !text-[var(--text-dark)]'
          } whitespace-nowrap links`}
          key={item?.path}
        >
          {item?.path === location.pathname
            ? item?.icon?.active
            : item?.icon?.inactive}
          {item?.label}
        </NavLink>
      ))}
      <div
        ref={ref}
        className={`flex justify-start flex-col gap-1 transition-all rounded-md duration-300 overflow-hidden`}
        style={{
          height: open ? `${ref.current.scrollHeight}px` : '0',
        }}
      >
    
      </div>
    </div>
  );
};

export default Sidebar;
