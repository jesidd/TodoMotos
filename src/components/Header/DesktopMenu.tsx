import type { MenuItem } from "./menuData";

export default function DesktopMenu({ menu }: { menu: MenuItem }) {
    return (
        <li className="relative after:content-[''] after:bg-[#3F444B] after:w-0 after:h-[3px] after:top-[81%]
         after:left-0 after:absolute after:rounded-xl after:duration-300 hover:after:w-full">
            <span className="cursor-pointer py-[15px] mx-[13px] block">{menu.name}</span>
        </li>
    );
}
