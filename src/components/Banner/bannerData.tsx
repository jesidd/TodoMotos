import banner1 from "../Banner/assests/banner1.jpg";


// interfaz para slide del carrusel
export interface Slide {
    readonly id: number;
    readonly title: string;
    readonly subtitle: string;
    readonly imageUrl: string;
    readonly priority?: boolean;
}


// Props que acepta el componente Banner
export interface BannerProps {
    readonly slides?: readonly Slide[];
    readonly autoPlayInterval?: number;
    readonly showArrows?: boolean;
    readonly className?: string;
    readonly onSlideChange?: (slideIndex: number) => void;
    readonly preloadNext?: boolean;
}

// Datos 
export const SLIDES: readonly Slide[] = [
    {
        id: 1,
        title: "La comunidad de los que viven sobre dos ruedas",
        subtitle: "Miles de motociclistas, una sola comunidad\nOpina, califica y descubre la moto ideal para vos.",
        imageUrl: banner1,
        priority: true
    },
    {
        id: 2,
        title: "Conecta con apasionados moteros",
        subtitle: "Encuentra tu tribu, comparte experiencias únicas",
        imageUrl: "https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    },
    {
        id: 3,
        title: "El arte de rodar",
        subtitle: "Vive la libertad en cada kilómetro recorrido",
        imageUrl: "https://i.ytimg.com/vi/iIvG4lYG2Cs/maxresdefault.jpg",
    },
    {
        id: 4,
        title: "Aventuras sin límites",
        subtitle: "Cada ruta es una nueva historia por contar",
        imageUrl: "https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",

    },
    {
        id: 5,
        title: "Síguenos en redes sociales",
        subtitle: "Mantente conectado con nuestra comunidad",
        imageUrl: "https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    }
];