
// import { NavLink } from 'react-router-dom';
import './SideMenu.css';
import { SideMenuItem } from './SideMenuItem';
import { menuItems } from '../data/menu-items-data';
import { FcExport } from "react-icons/fc";
// import { useAuthStore } from '../../../stores';







export const SideMenu = () => {

  // const logoutUser = useAuthStore( state => state.logoutUser );
  // const userName = useAuthStore( state => state.user?.fullName || 'No user' );

  return (
    <div id="menu" className="bg-gray-900 min-h-screen z-10 text-slate-300 w-80 left-0 overflow-y-scroll">
      {/* Title */}
      <div id="logo" className="my-4 px-4">
        <a href="#" className="inline-flex space-x-6 items-center">
          <h1 className="text-lg md:text-3xl mt-2 font-bold text-white">
            ICUP-App
          </h1>
          <span>
            <img className="rounded-full w-10 h-10" src='../public/men.png' alt="" />
          </span>
        </a>
        <p className="text-slate-500 mt-2 text-md">Dashboard administrativo de la Iglesia.</p>
      </div>

      {/*  Profile */ }
      <div id="profile" className="px-6 py-8">
        <p className="text-slate-500 text-lg">Bienvenido,</p>
        <a href="#" className="inline-flex space-x-2 items-center">
          <span>
            <img className="rounded-full w-14 h-10" src='../public/men.png' alt="" />
          </span>
          
          <span className="text-sm md:text-base font-bold">
            Kevin Michael Baca Angeles
          </span>
        </a>
      </div>

      {/* Menu Items */ }
      <nav id="nav" className="w-full px-8">
        {
          menuItems.map( item =>(
            <SideMenuItem key={item.href} {...item} />
          ) )
        }

        {/* Logout */}
        <a /* onClick={ logoutUser } */ className="mt-12" >
          <div>
            <FcExport className='text-xl'/>
          </div>
          <div className="flex flex-col">
            <span className="text-lg text-slate-300 font-bold leading-5">Salir</span>
            <span className="text-sm text-slate-500 hidden md:block">Cerrar sesión</span>
          </div>
        </a>
      </nav>
    </div>
  );
};