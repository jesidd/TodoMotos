
export interface Blog {
    id: number;
    titulo: string;
    resumen: string;
    contenido: string;
    fechaPublicacion: string;
    imagenUrl: string;
    autor: string;
    categoria: string;
    etiquetas: string;
}

export interface ClassBlog{
    blog: Blog;
    comentarios: [];
}
