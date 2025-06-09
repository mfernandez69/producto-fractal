export interface Student {
  id?: string;
  email: string;
  displayName?: string;
  puntuacion: number;
  role: string;
  createdAt: Date;
  cursoRef: string;
  deAlta?: boolean;
}