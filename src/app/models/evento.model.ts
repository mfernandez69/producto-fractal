import {Timestamp } from '@angular/fire/firestore';

export interface Evento {
  titulo: string;
  descripcion: string;
  fecha: Date | Timestamp;
  ubicacion: string;
  organizador: string;
  cursoRef: string;
  createdAt: Date | Timestamp;
  id?: string;
}