import { inject, Injectable } from '@angular/core';
import { collection, collectionData, deleteDoc, doc, query, updateDoc, where, addDoc, Timestamp } from '@angular/fire/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Observable, catchError, map, of } from 'rxjs';
import { Material } from '../../models/material.model';

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

  // Add deleteStudent method
  async deleteStudent(studentId: string): Promise<void> {
    if (!studentId) {
      throw new Error('Student ID is required for deletion');
    }
    
    const studentRef = doc(this._firestore, 'Usuario', studentId);
    return deleteDoc(studentRef);
  }

  // Method to save material reference to Firebase after uploading to UploadThing
  async saveMaterial(material: Material): Promise<string> {
    // Convert JavaScript Date to Firestore Timestamp
    const materialData = {
      ...material,
      uploadDate: Timestamp.fromDate(material.uploadDate)
    };
    
    const materialsCollection = collection(this._firestore, 'Recurso');
    const docRef = await addDoc(materialsCollection, materialData);
    return docRef.id;
  }

  // Method to get all materials for a specific course
  getMaterialsByCurso(cursoRef: string): Observable<Material[]> {
    try {
      const materialsCollection = collection(this._firestore, 'Materials');
      
      const materialsQuery = query(
        materialsCollection,
        where('cursoRef', '==', cursoRef)
      );
      
      return (collectionData(materialsQuery, { idField: 'id' }) as Observable<any[]>)
        .pipe(
          map(materials => materials.map(material => ({
            ...material,
            // Convert Firestore timestamp to JavaScript Date
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

  // Method to get all materials
  getAllMaterials(): Observable<Material[]> {
    try {
      const materialsCollection = collection(this._firestore, 'Materials');
      
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

  // Method to update material details
  async updateMaterial(material: Material): Promise<void> {
    if (!material.id) {
      throw new Error('Material ID is required for update');
    }
    
    const materialRef = doc(this._firestore, 'Materials', material.id);
    
    // Remove id from the data to be updated
    const { id, ...materialData } = material;
    const updateData = {
      ...materialData,
      uploadDate: Timestamp.fromDate(material.uploadDate)
    };
    
    return updateDoc(materialRef, updateData);
  }

  // Method to delete a material
  async deleteMaterial(materialId: string): Promise<void> {
    if (!materialId) {
      throw new Error('Material ID is required for deletion');
    }
    
    const materialRef = doc(this._firestore, 'Materials', materialId);
    return deleteDoc(materialRef);
  }
}