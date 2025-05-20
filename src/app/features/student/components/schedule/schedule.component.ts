import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../../../../auth/services/auth.service';
import { EventDay, Evento, EventService } from '../../../../core/services/event.service';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';

interface Usuario {
  email: string;
  puntuacion: number;
  role: string;
  createdAt: Date;
  cursoRef: string;
}

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedule.component.html',
  styles: ``
})
export class ScheduleComponent implements OnInit {
  private eventService = inject(EventService);
  private authService = inject(AuthService);
  private firestore = inject(Firestore);
  
  calendarDays$!: Observable<EventDay[]>;
  currentMonth$!: Observable<Date>;
  events$!: Observable<Evento[]>;
  
  weekdays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  userCursoRef: string = '';
  
  async ngOnInit(): Promise<void> {
    this.currentMonth$ = this.eventService.currentMonth$;
    
    // Get current user data
    await this.fetchCurrentUserData();
    
    // Setup calendar and event observables
    this.setupObservables();
  }
  
  /**
   * Fetches the current user's data from Firestore
   */
  async fetchCurrentUserData(): Promise<void> {
    const user = this.authService.currentUser;
    if (user) {
      try {
        const userDoc = await getDoc(doc(this.firestore, "Usuario", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data() as Usuario;
          this.userCursoRef = userData.cursoRef || '';
          console.log('User course reference:', this.userCursoRef);
        } else {
          console.error('User document does not exist');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    } else {
      console.warn('No authenticated user');
    }
  }
  
  /**
   * Setup calendar and event observables
   */
  setupObservables(): void {
    this.calendarDays$ = this.currentMonth$.pipe(
      switchMap(month => {
        if (this.userCursoRef) {
          return this.eventService.getCalendarDaysForMonth(this.userCursoRef, month);
        }
        return of([]);
      })
    );
    
    this.events$ = this.currentMonth$.pipe(
      switchMap(month => {
        if (this.userCursoRef) {
          return this.eventService.getEventsForMonth(this.userCursoRef, month);
        }
        return of([]);
      })
    );
  }
  
  previousMonth(): void {
    this.eventService.previousMonth();
  }
  
  nextMonth(): void {
    this.eventService.nextMonth();
  }
  
  getMonthDisplay(date: Date): string {
    return `${this.monthNames[date.getMonth()]} ${date.getFullYear()}`;
  }
  
  getFirstDayOffset(days: EventDay[]): number[] {
    if (!days || days.length === 0) return [];
    const firstDay = days[0].date.getDay();
    return Array(firstDay).fill(0);
  }
}
