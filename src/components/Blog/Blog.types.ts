export interface Blog {
  id: number;
  titulo: string;
  contenido: string;
  fechaPublicacion: string; // ISO 8601 date string
  imagenUrl: string;
  autor: string;
  resumen: string | null;
};

type Comentario = []; // Vacío actualmente, pero podrías definirlo si sabes la estructura esperada

export interface ResponseDataBlog {
  blog: Blog;
  comentarios: Comentario;
};
