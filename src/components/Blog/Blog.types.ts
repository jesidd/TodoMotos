export interface Blog {
  id: number;
  titulo: string;
  contenido: string;
  fechaPublicacion: string;
  imagenUrl: string;
  autor: string;
  resumen: string | null;
};

type Comentario = []; 

export interface ResponseDataBlog {
  blog: Blog;
  comentarios: Comentario;
};