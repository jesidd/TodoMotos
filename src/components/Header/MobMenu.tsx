import { Menu, X } from "lucide-react";
import { useState } from "react"
import { motion } from "framer-motion";
import type { MenuItem } from "./menuData"

export default function MobMenu({ Menus }: { Menus: MenuItem[] }) {
  const [isOpen, setIsOpen] = useState(false);

  const toogleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex items-center">
      <button onClick={toogleDrawer} className="z-[999] cursor-pointer relative">
        {
          isOpen ? <X /> : <Menu/>
        }
      </button>

      <motion.div className="fixed left-0 right-0 top-54 w-full
      overflow-y-auto h-full backdrop-blur p-6 pb-20 text-white bg-black"
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}>
       
       <ul>
          {Menus.map(({ name }) => {
            return (
              <li key={name} className="box-border w-full">
                <span className="block relative hover:bg-white/5 w-full rounded-md p-4 cursor-pointer">
                  {name}
                </span>
              </li>
            );
          })}
        </ul>
      </motion.div>
    </div>
  )
}
