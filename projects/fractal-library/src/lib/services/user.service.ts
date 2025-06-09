import { inject, Injectable } from '@angular/core';
import { collection, collectionData, limit, orderBy, query, where } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Observable, map, catchError, of } from 'rxjs';
import { Usuario } from '../models/usuario.model'; // Adjust the import path as necessary

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Using inject() pattern to match AuthService implementation
  private _firestore = inject(Firestore);

  // Get all students sorted by score in descending order
  getStudentsRanking(limitCount: number = 20): Observable<Usuario[]> {
    try {
      // Using "Usuario" to match the collection name in AuthService
      const usersCollection = collection(this._firestore, 'Usuario');
      
      console.log('Fetching student ranking from Usuario collection');
      
      // Create a query to get students with role 'student' and sort by score
      const studentsQuery = query(
        usersCollection,
        where('role', '==', 'student'),
        orderBy('puntuacion', 'desc'),
        limit(limitCount)
      );
      
      return (collectionData(studentsQuery, { idField: 'id' }) as Observable<Usuario[]>)
        .pipe(
          catchError(error => {
            console.error('Firestore query error:', error);
            return of([]);
          })
        );
    } catch (error) {
      console.error('Error setting up Firestore query:', error);
      return of([]);
    }
  }
  
  // Get top 3 students for podium display
  getTopThreeStudents(): Observable<Usuario[]> {
    return this.getStudentsRanking(3);
  }
  
  // Get user's current rank
  getUserRankPosition(userId: string): Observable<number> {
    return this.getStudentsRanking(100).pipe(
      map(students => {
        const index = students.findIndex(student => student.email === userId);
        return index !== -1 ? index + 1 : -1;
      })
    );
  }
}
