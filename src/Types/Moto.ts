export interface Moto {
  id: number;
  marca: string;
  modelo: string;
  año: number;
  tipo: string;
  cilindrajeCC: number;
  potenciaHP: number;
  torqueNm: number;
  motor: string;
  refrigeracion: string;
  medidaNeumaticoDelantero: number;
  medidaNeumaticoTrasero: number;
  transmision: string;
  pesoKg: number;
  capacidadCombustibleL: number;
  imagenUrl: string;
  descripcion: string;
}

export interface ClassMoto {
  avgRating: number;
  bike: Moto;
}