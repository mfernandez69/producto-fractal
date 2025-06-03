import { inject, Injectable } from '@angular/core';
import { collection, collectionData, doc, query, updateDoc, where } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Observable, catchError, map, of } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private _firestore = inject(Firestore);
  
  getAllStudents(): Observable<Student[]> {
    try {
      const usersCollection = collection(this._firestore, 'Usuario');
      
      // Query to get all users with role 'student'
      const studentsQuery = query(
        usersCollection,
        where('role', '==', 'student')
      );
      
      return (collectionData(studentsQuery, { idField: 'id' }) as Observable<any[]>)
        .pipe(
          map(students => students.map(student => ({
            ...student,
            // Convert Firestore timestamp to JavaScript Date
            createdAt: student.createdAt ? student.createdAt.toDate() : new Date()
          }))),
          catchError(error => {
            console.error('Error fetching students:', error);
            return of([]);
          })
        );
    } catch (error) {
      console.error('Error setting up students query:', error);
      return of([]);
    }
  }

  // Add updateStudent method
  async updateStudent(student: Student): Promise<void> {
    if (!student.id) {
      throw new Error('Student ID is required for update');
    }
    
    const studentRef = doc(this._firestore, 'Usuario', student.id);
    
    // Remove id from the data to be updated
    const { id, ...studentData } = student;
    
    return updateDoc(studentRef, studentData);
  }
}