import { inject, Injectable } from '@angular/core';
import { collection, collectionData, query, where } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Observable, map, catchError, of } from 'rxjs';

export interface Evento {
  titulo: string;
  descripcion: string;
  fecha: Date;
  ubicacion: string;
  organizador: string;
  cursoRef: string;
  createdAt: Date;
  id?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private _firestore = inject(Firestore);

  // Get events for a specific month and year
  getEventsByMonth(year: number, month: number): Observable<Evento[]> {
    try {
      const eventosCollection = collection(this._firestore, 'Evento');
      
      // Create start and end date for the month
      const startDate = new Date(year, month, 1);
      const endDate = new Date(year, month + 1, 0); // Last day of the month
      
      const eventsQuery = query(
        eventosCollection,
        where('fecha', '>=', startDate),
        where('fecha', '<=', endDate)
      );
      
      return (collectionData(eventsQuery, { idField: 'id' }) as Observable<Evento[]>)
        .pipe(
          map(events => {
            // Convert Firestore timestamps to JavaScript Date objects
            return events.map(event => ({
              ...event,
              fecha: event.fecha instanceof Date ? event.fecha : new Date(event.fecha),
              createdAt: event.createdAt instanceof Date ? event.createdAt : new Date(event.createdAt)
            }));
          }),
          catchError(error => {
            console.error('Error fetching events:', error);
            return of([]);
          })
        );
    } catch (error) {
      console.error('Error setting up Firestore query for events:', error);
      return of([]);
    }
  }

  // Get all events
  getAllEvents(): Observable<Evento[]> {
    try {
      const eventosCollection = collection(this._firestore, 'Evento');
      
      return (collectionData(eventosCollection, { idField: 'id' }) as Observable<Evento[]>)
        .pipe(
          map(events => {
            // Convert Firestore timestamps to JavaScript Date objects
            return events.map(event => ({
              ...event,
              fecha: event.fecha instanceof Date ? event.fecha : new Date(event.fecha),
              createdAt: event.createdAt instanceof Date ? event.createdAt : new Date(event.createdAt)
            }));
          }),
          catchError(error => {
            console.error('Error fetching all events:', error);
            return of([]);
          })
        );
    } catch (error) {
      console.error('Error setting up Firestore query for all events:', error);
      return of([]);
    }
  }
}
