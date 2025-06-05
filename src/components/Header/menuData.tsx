
export interface subMenuItem{
    name: string;
    desc: string;
}


export interface MenuItem{
    name: string;
    subMenuHeading?: string[];
    subMenu?: subMenuItem[];
    gridCols?: number;
}


export const Menus: MenuItem[] = [
  {
    name: "inicio"
  },
  {
    name: "contacto"
  },
  {
    name: "Ranking de Motos"
  },
  {
    name: "Blog"
  }
];