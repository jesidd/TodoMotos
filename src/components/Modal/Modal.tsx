import React, { useEffect, useRef, useState } from "react";
import lupa from "../Header/assests/lupa.svg";


interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null); //Para detectar click fuera del modal y cerrarlo
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
  document.body.classList.add("overflow-hidden"); //Bloquea el scroll cuando se activa el modal

  const raf = requestAnimationFrame(() => setShow(true)); // activación transicion

  return () => {
    cancelAnimationFrame(raf);
    document.body.classList.remove("overflow-hidden");
  };
}, [onClose]);


  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden"
      onClick={handleClickOutside}>

      {/* Fondo y animación*/}
        <div
        className={`
            absolute inset-0 bg-black/90
            transition-[opacity,clip-path] duration-700 ease-in-out
            ${show
            ? "[clip-path:circle(180%_at_50%_100%)] opacity-100"
            : "[clip-path:circle(0%_at_50%_100%)] opacity-0"}
        `}
        ></div>

        {/* Modal de busqueda*/}
        <div ref={modalRef} className={`relative z-10 w-[90%] max-w-4xl flex items-center px-10 py-6 rounded-full
            border-2 border-white transition-all duration-500 ease-out
            ${show ? "translate-y-0 opacity-100 delay-300" : "-translate-y-10 opacity-0"}
            ${inputValue ? "bg-white text-black" : "bg-black/30 text-white"}`}>

            <div className="relative flex-1">
                <input type="text" placeholder="Buscar..." value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                className={`
                    w-full bg-transparent outline-none text-lg px-2 pr-10 rounded-full
                    transition-colors duration-300
                    ${inputValue ? "text-black placeholder-gray-500" : "text-white placeholder-white"}
                `}/>
                
                <img src={lupa} 
                className={`absolute right-2 top-1/2 -translate-y-1/2 size-5 cursor-pointer hover:scale-110 transition-transform duration-300
                    ${inputValue ? "invert" : "invert-0"}
                `}
                onClick={onClose} />

            </div>
        </div>

    </div>
  );
};

export default Modal;
