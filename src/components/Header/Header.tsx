import React, { useState, useEffect } from "react";
import logo from "../Header/assests/LogoTodoMotos.svg";
import lupa from "./assests/lupa.svg"
import { Menus } from "./menuData";
import MobMenu from "./MobMenu";
import DesktopMenu from "./DesktopMenu";
import Modal from '../Modal/Modal'; 


const Header: React.FC = () => {

  const [isScrolled, setIscrolled] = useState(false);

  const [openModal, setOpenModal] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setIscrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
    <header className={`bg-black fixed top-0 right-0 left-0 z-[999] w-full over h-auto font-Inter text-white
      transition-all duration-300 whitespace-nowrap ${isScrolled ? 'h-20' : 'h-auto'}`}>

      <div className={`transition-all duration-300 items-center ${isScrolled ? 'flex py-3 justify-between px-8 h-auto'
        : 'flex justify-center pt-2'
        }`}>
        <a href="#" className={`${isScrolled ? 'h-18' : 'size-auto'}`}>
          <img src={logo} alt="Logo TodoMotos" className={`object-contain transition-all duration-300 ${isScrolled ? 'h-18' : 'h-36'}`} />
        </a>


        {isScrolled && (
          <nav className="flex items-center justify-center place-self-end w-auto lg:w-[65%] lg:justify-around">
            <ul className="lg:flex w-auto items-center gap-5 hidden">
              {Menus.map((menu) => (
                <DesktopMenu menu={menu} key={menu.name} />
              ))}
            </ul>

            <div className="flex lg:w-[18%] w-[30%] justify-center items-center gap-3">
              <ul className="flex md:gap-5   items-center w-auto">
                <li className="hidden md:block relative cursor-pointer after:content-[''] after:bg-[#3F444B] after:w-0 after:h-[3px] after:top-[81%] after:left-0 after:absolute after:rounded-xl after:duration-300 hover:after:w-full ">
                  <span className="py-[15px] mx-[13px] block" >Creá tu cuenta</span>
                </li>
                <li className="relative h-auto cursor-pointer after:content-[''] after:bg-[#3F444B] after:w-0 after:h-[3px] after:top-[81%] after:left-0 after:absolute after:rounded-xl after:duration-300 hover:after:w-full ">
                  <span className="py-[15px] mx-[13px] block" >Ingresá</span>
                </li>
              </ul>
              <div className="lg:hidden flex">
                <MobMenu Menus={Menus} scrolled={isScrolled}/>
              </div>
            </div>
          </nav>
        )}

      </div>

      {!isScrolled && (
        <nav className="flex w-full h-[40px] px-9 md:px-0 justify-between md:justify-around items-center py-[28px] text-base ">
          <div className="flex size-4 w-auto lg:w-[18%] items-center justify-center">
            <img src={lupa} alt="Icono lupa" className="cursor-pointer size-5" onClick={() => setOpenModal(true)}/>
          </div>
          <ul className="lg:flex w-auto items-center gap-5 hidden">
            {Menus.map((menu) => (
              <DesktopMenu menu={menu} key={menu.name} />
            ))}
          </ul>
          <div className="flex lg:w-[18%] w-[30%] justify-center gap-3">
            <ul className="flex md:gap-5 items-center w-auto">
              <li className="hidden md:block relative cursor-pointer after:content-[''] after:bg-[#3F444B] after:w-0 after:h-[3px] after:top-[81%] after:left-0 after:absolute after:rounded-xl after:duration-300 hover:after:w-full">
                <span className="py-[15px] mx-[13px] block">Creá tu cuenta</span>
              </li>
              <li className="relative cursor-pointer after:content-[''] after:bg-[#3F444B] after:w-0 after:h-[3px] after:top-[81%] after:left-0 after:absolute after:rounded-xl after:duration-300 hover:after:w-full">
                <span className="py-[15px] mx-[13px] block">Ingresá</span>
              </li>
            </ul>
            <div className="lg:hidden flex">
              <MobMenu Menus={Menus} scrolled={isScrolled} />
            </div>
          </div>
        </nav>
      )}
    </header>
    
    {openModal && <Modal onClose={() => setOpenModal(false)} />}
    </div>
  );
};

export default Header;
