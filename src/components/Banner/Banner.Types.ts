

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