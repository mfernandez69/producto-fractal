import { inject, Injectable } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, query, updateDoc, where, addDoc, Timestamp } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Observable, catchError, map, of } from 'rxjs';
import { Material } from '../models/material.model';
import { Student } from '../models/student.model';



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

  // Add deleteStudent method
  async deleteStudent(studentId: string): Promise<void> {
    if (!studentId) {
      throw new Error('Student ID is required for deletion');
    }
    
    const studentRef = doc(this._firestore, 'Usuario', studentId);
    return deleteDoc(studentRef);
  }

  // Method to save material reference to Firebase after uploading to UploadThing
  async saveRecurso(material: Material): Promise<string> {
    // Convert JavaScript Date to Firestore Timestamp
    const materialData = {
      ...material,
      uploadDate: Timestamp.fromDate(material.uploadDate)
    };
    
    const materialsCollection = collection(this._firestore, 'Recurso');
    const docRef = await addDoc(materialsCollection, materialData);
    return docRef.id;
  }
  // Method to get all materials
  getAllsaveRecursos(): Observable<Material[]> {
    try {
      const materialsCollection = collection(this._firestore, 'Recurso');
      
      return (collectionData(materialsCollection, { idField: 'id' }) as Observable<any[]>)
        .pipe(
          map(materials => materials.map(material => ({
            ...material,
            uploadDate: material.uploadDate ? material.uploadDate.toDate() : new Date()
          }))),
          catchError(error => {
            console.error('Error fetching materials:', error);
            return of([]);
          })
        );
    } catch (error) {
      console.error('Error setting up materials query:', error);
      return of([]);
    }
  }
}