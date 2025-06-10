import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../../../core/services/event.service';
import { Observable, Subscription, map, tap, shareReplay } from 'rxjs';
import { Evento } from '../../../../models/evento.model';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedule.component.html',
  styles: ``
})
export class ScheduleComponent implements OnInit, OnDestroy {
  currentMonth: Date = new Date(); // Current month being displayed
  calendarDays: Date[] = []; // Array of days to display in the calendar
  monthEvents$: Observable<Evento[]>; // Events for the current month
  selectedDate: Date | null = null; // Currently selected date
  
  // Store events by date for efficient lookup
  eventsByDate: Map<string, Evento[]> = new Map();
  private subscription: Subscription = new Subscription();
  
  // Day names for calendar header
  weekDays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  
  // Month names for display
  monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  constructor(private eventService: EventService) { 
    // Initialize the observable but don't subscribe yet
    this.monthEvents$ = this.getMonthEvents().pipe(
      tap(events => this.processEvents(events)),
      shareReplay(1) // Cache the result
    );
  }

  ngOnInit(): void {
    this.generateCalendarDays();
    // Subscribe to events
    this.loadEvents();
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.subscription.unsubscribe();
  }

  // Load events for the current month
  loadEvents(): void {
    // Clear previous subscription
    this.subscription.unsubscribe();
    this.subscription = new Subscription();
    
    // Subscribe to the events
    this.subscription.add(
      this.monthEvents$.subscribe()
    );
  }

  // Process events into a map for efficient lookup
  processEvents(events: Evento[]): void {
    // Clear previous events
    this.eventsByDate.clear();
    
    // Group events by date string
    events.forEach(event => {
      if (event.fecha) {
        // Ensure fecha is a valid Date
        let eventDate: Date;
        if (event.fecha instanceof Date) {
          eventDate = event.fecha;
        } else if (typeof event.fecha.toDate === 'function') {
          // Handle Firestore Timestamp object
          eventDate = event.fecha.toDate();
        } else if (typeof event.fecha === 'object' && event.fecha.seconds !== undefined) {
          // Handle serialized Firestore timestamp
          eventDate = new Date(event.fecha.seconds * 1000);
        } else {
          // Fallback for string or number
          eventDate = new Date(event.fecha as any);
        }
        if (!isNaN(eventDate.getTime())) {
          const dateStr = this.getDateKey(eventDate);
          if (!this.eventsByDate.has(dateStr)) {
            this.eventsByDate.set(dateStr, []);
          }
          this.eventsByDate.get(dateStr)!.push({
            ...event,
            fecha: eventDate  // Replace with valid Date
          });
        } else {
          console.error('Invalid event date:', event.fecha, 'for event:', event);
        }
      }
    });
  }

  // Get a string key for a date (YYYY-MM-DD)
  getDateKey(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  }

  // Generate an array of Date objects for the calendar
  generateCalendarDays(): void {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    
    // Get first day of the month
    const firstDayOfMonth = new Date(year, month, 1);
    // Get the day of week the month starts on (0 = Sunday, 6 = Saturday)
    const startDay = firstDayOfMonth.getDay();
    
    // Get the last day of the month
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();
    
    // Clear previous days
    this.calendarDays = [];
    
    // Add empty slots for days from previous month
    for (let i = 0; i < startDay; i++) {
      const prevMonthDay = new Date(year, month, -startDay + i + 1);
      this.calendarDays.push(prevMonthDay);
    }
    
    // Add days for current month
    for (let i = 1; i <= lastDayOfMonth; i++) {
      this.calendarDays.push(new Date(year, month, i));
    }
    
    // Calculate how many days from next month to add to complete the grid (typically 35 or 42 cells)
    const remainingDays = (Math.ceil((startDay + lastDayOfMonth) / 7) * 7) - (startDay + lastDayOfMonth);
    
    // Add days from next month
    for (let i = 1; i <= remainingDays; i++) {
      this.calendarDays.push(new Date(year, month + 1, i));
    }
  }

  // Navigate to previous month
  previousMonth(): void {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() - 1,
      1
    );
    this.generateCalendarDays();
    this.monthEvents$ = this.getMonthEvents().pipe(
      tap(events => this.processEvents(events)),
      shareReplay(1)
    );
    this.loadEvents();
  }

  // Navigate to next month
  nextMonth(): void {
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + 1,
      1
    );
    this.generateCalendarDays();
    this.monthEvents$ = this.getMonthEvents().pipe(
      tap(events => this.processEvents(events)),
      shareReplay(1)
    );
    this.loadEvents();
  }

  // Select a specific date
  selectDate(date: Date): void {
    this.selectedDate = date;
  }

  // Check if a date has events - synchronous version
  hasEvents(date: Date): boolean {
    const dateKey = this.getDateKey(date);
    return this.eventsByDate.has(dateKey) && this.eventsByDate.get(dateKey)!.length > 0;
  }

  // Get events for the selected month
  getMonthEvents(): Observable<Evento[]> {
    return this.eventService.getEventsByMonth(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth()
    );
  }

  // Get events for a specific date
  getEventsForDate(date: Date): Evento[] {
    const dateKey = this.getDateKey(date);
    return this.eventsByDate.get(dateKey) || [];
  }

  // Check if a date is today
  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  }

  // Check if a date belongs to the current displayed month
  isCurrentMonth(date: Date): boolean {
    return date.getMonth() === this.currentMonth.getMonth();
  }

  // Format date for display in the event list with safety checks
  formatDate(date: any): string {
    if (!date) {
      return 'Fecha no disponible';
    }
    
    let validDate: Date;
    
    // Handle different date formats
    if (date instanceof Date) {
      validDate = date;
    } else if (typeof date === 'object' && date.seconds !== undefined) {
      // Handle Firestore timestamp
      validDate = new Date(date.seconds * 1000);
    } else if (typeof date.toDate === 'function') {
      // Handle Firestore Timestamp object
      validDate = date.toDate();
    } else {
      try {
        validDate = new Date(date);
      } catch (e) {
        console.error('Error formatting date:', e);
        return 'Fecha inválida';
      }
    }
    
    // Check if the date is valid before formatting
    if (isNaN(validDate.getTime())) {
      console.error('Invalid date for formatting:', date);
      return 'Fecha inválida';
    }
    
    try {
      return validDate.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      console.error('Error formatting date with toLocaleDateString:', e);
      // Fallback formatting
      return `${validDate.getDate()}/${validDate.getMonth() + 1}/${validDate.getFullYear()} ${validDate.getHours()}:${validDate.getMinutes()}`;
    }
  }
}
