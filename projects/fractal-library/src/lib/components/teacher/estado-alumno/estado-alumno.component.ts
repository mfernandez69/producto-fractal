import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { TeacherService } from '../../../services/teacher.service';
import { Student } from '../../../models/student.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-estado-alumno',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './estado-alumno.component.html',
  styles: ``
})
export class EstadoAlumnoComponent implements OnInit {
  students$: Observable<Student[]>;
  loading: boolean = true;
  showModal: boolean = false;
  studentForm: FormGroup;
  currentStudentId: string | undefined;
  
  constructor(
    private teacherService: TeacherService,
    private fb: FormBuilder
  ) {
    this.students$ = this.teacherService.getAllStudents();
    this.studentForm = this.createForm();
  }
  
  ngOnInit(): void {
    this.students$.subscribe(() => {
      this.loading = false;
    });
  }
  
  createForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      puntuacion: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
      cursoRef: ['', Validators.required],
      createdAt: ['', Validators.required],
      deAlta: [true]
    });
  }
  
  editStudent(student: Student): void {
    this.currentStudentId = student.id;
    
    // Format date to YYYY-MM-DD for date input
    const formattedDate = student.createdAt instanceof Date 
      ? student.createdAt.toISOString().split('T')[0] 
      : '';
    
    this.studentForm.setValue({
      email: student.email,
      puntuacion: student.puntuacion,
      cursoRef: student.cursoRef,
      createdAt: formattedDate,
      deAlta: student.deAlta !== undefined ? student.deAlta : true
    });
    
    this.showModal = true;
  }
  
  closeModal(): void {
    this.showModal = false;
    this.studentForm.reset();
    this.currentStudentId = undefined;
  }
  
  saveStudent(): void {
    if (this.studentForm.invalid) {
      return;
    }
    
    if (!this.currentStudentId) {
      return;
    }
    
    const updatedStudent = {
      ...this.studentForm.value,
      id: this.currentStudentId,
      role: 'student',
      createdAt: new Date(this.studentForm.value.createdAt)
    };
    
    // Here you would call a service method to update the student
    console.log('Saving student:', updatedStudent);
    this.teacherService.updateStudent(updatedStudent)
      .then(() => {
        this.closeModal();
        // Refresh student list
        this.students$ = this.teacherService.getAllStudents();
      })
      .catch(error => {
        console.error('Error updating student:', error);
        // You could add error handling here
      });
  }
  
  deleteStudent(student: Student): void {
    if (confirm(`¿Estás seguro de que deseas eliminar al alumno ${student.email}?`)) {
      if (!student.id) {
        console.error('Cannot delete student without ID');
        return;
      }
      
      this.loading = true;
      
      this.teacherService.deleteStudent(student.id)
        .then(() => {
          console.log(`Student ${student.email} successfully deleted`);
          // Refresh student list
          this.students$ = this.teacherService.getAllStudents();
        })
        .catch(error => {
          console.error('Error deleting student:', error);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
}
