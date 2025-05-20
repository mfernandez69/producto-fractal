import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData, query, where, orderBy } from '@angular/fire/firestore';
import { Observable, map, catchError, of, BehaviorSubject, combineLatest } from 'rxjs';

export interface Evento {
  titulo: string;
  descripcion: string;
  fecha: Date;
  ubicacion: string;
  organizador: string;
  cursoRef: string;
  createdAt: Date;
}

export interface EventDay {
[x: string]: any;
  date: Date;
  events: Evento[];
  hasEvents: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private _firestore = inject(Firestore);
  private currentMonthSubject = new BehaviorSubject<Date>(new Date());
  public currentMonth$ = this.currentMonthSubject.asObservable();

  constructor() { }

  // Navigate to previous month
  previousMonth(): void {
    const current = this.currentMonthSubject.value;
    const prevMonth = new Date(current.getFullYear(), current.getMonth() - 1, 1);
    this.currentMonthSubject.next(prevMonth);
  }

  // Navigate to next month
  nextMonth(): void {
    const current = this.currentMonthSubject.value;
    const nextMonth = new Date(current.getFullYear(), current.getMonth() + 1, 1);
    this.currentMonthSubject.next(nextMonth);
  }

  // Get all events for a specific course
  getEventsByCurso(cursoRef: string): Observable<Evento[]> {
    try {
      const eventsCollection = collection(this._firestore, 'Evento');
      const eventsQuery = query(
        eventsCollection,
        where('cursoRef', '==', cursoRef),
        orderBy('fecha', 'asc')
      );
      
      return (collectionData(eventsQuery, { idField: 'id' }) as Observable<Evento[]>)
        .pipe(
          map(events => events.map(event => ({
            ...event,
            fecha: event.fecha instanceof Date ? event.fecha : new Date(event.fecha),
            createdAt: event.createdAt instanceof Date ? event.createdAt : new Date(event.createdAt)
          }))),
          catchError(error => {
            console.error('Error fetching events:', error);
            return of([]);
          })
        );
    } catch (error) {
      console.error('Error setting up Firestore query:', error);
      return of([]);
    }
  }

  // Get events for a specific month and course
  getEventsForMonth(cursoRef: string, month: Date): Observable<Evento[]> {
    return this.getEventsByCurso(cursoRef).pipe(
      map(events => {
        const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
        const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);
        
        return events.filter(event => 
          event.fecha >= startOfMonth && 
          event.fecha <= endOfMonth
        );
      })
    );
  }

  // Get calendar days with events for the month
  getCalendarDaysForMonth(cursoRef: string, month: Date): Observable<EventDay[]> {
    return combineLatest([
      this.getEventsForMonth(cursoRef, month),
      of(month)
    ]).pipe(
      map(([events, monthDate]) => {
        const daysInMonth = new Date(
          monthDate.getFullYear(),
          monthDate.getMonth() + 1,
          0
        ).getDate();
        
        const days: EventDay[] = [];
        
        // Create calendar days
        for (let i = 1; i <= daysInMonth; i++) {
          const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), i);
          const dayEvents = events.filter(event => 
            event.fecha.getDate() === i && 
            event.fecha.getMonth() === date.getMonth() && 
            event.fecha.getFullYear() === date.getFullYear()
          );
          
          days.push({
            date,
            events: dayEvents,
            hasEvents: dayEvents.length > 0
          });
        }
        
        return days;
      })
    );
  }
}
