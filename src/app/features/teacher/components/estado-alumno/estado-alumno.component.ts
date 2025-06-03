import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Student, TeacherService } from '../../../../core/services/teacher.service';

@Component({
  selector: 'app-estado-alumno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estado-alumno.component.html',
  styles: ``
})
export class EstadoAlumnoComponent implements OnInit {
  students$: Observable<Student[]>;
  loading: boolean = true;
  
  constructor(private teacherService: TeacherService) {
    this.students$ = this.teacherService.getAllStudents();
  }
  
  ngOnInit(): void {
    this.students$.subscribe(() => {
      this.loading = false;
    });
  }
  
  editStudent(student: Student): void {
    console.log('Edit student:', student);
    // Functionality to be implemented later
  }
  
  deleteStudent(student: Student): void {
    console.log('Delete student:', student);
    // Functionality to be implemented later
  }
}
