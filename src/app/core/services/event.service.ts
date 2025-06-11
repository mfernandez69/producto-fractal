import { inject, Injectable } from '@angular/core';
import { collection, collectionData, query, where, Timestamp } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Observable, map, catchError, of } from 'rxjs';
import { Evento } from '../../models/evento.model';

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
            // Proper conversion of Firestore timestamps to JavaScript Date objects
            return events.map(event => ({
              ...event,
              fecha: this.convertTimestampToDate(event.fecha),
              createdAt: this.convertTimestampToDate(event.createdAt)
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
            // Proper conversion of Firestore timestamps to JavaScript Date objects
            return events.map(event => ({
              ...event,
              fecha: this.convertTimestampToDate(event.fecha),
              createdAt: this.convertTimestampToDate(event.createdAt)
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

  // Helper method to safely convert Firestore timestamp to Date
  private convertTimestampToDate(timestampOrDate: any): Date {
    if (!timestampOrDate) {
      return new Date(); // Default to current date if null/undefined
    }
    
    // Handle Firestore Timestamp objects
    if (timestampOrDate && typeof timestampOrDate.toDate === 'function') {
      return timestampOrDate.toDate();
    }
    
    // Handle Firestore server timestamp objects
    if (timestampOrDate && timestampOrDate.seconds !== undefined && timestampOrDate.nanoseconds !== undefined) {
      return new Date(timestampOrDate.seconds * 1000);
    }
    
    // Handle if it's already a Date object
    if (timestampOrDate instanceof Date) {
      return timestampOrDate;
    }
    
    // If it's a number or string representation
    try {
      const date = new Date(timestampOrDate);
      if (isNaN(date.getTime())) {
        console.error('Invalid date conversion:', timestampOrDate);
        return new Date(); // Default to current date if invalid
      }
      return date;
    } catch (e) {
      console.error('Error converting timestamp to date:', e);
      return new Date(); // Default to current date on error
    }
  }
}

// <-- CAMBIO APLICADO AQUÍ -->
export type { Evento };
