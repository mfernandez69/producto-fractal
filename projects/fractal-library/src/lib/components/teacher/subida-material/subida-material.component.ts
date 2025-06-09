import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Material } from '../../../models/material.model';
import { TeacherService } from '../../../services/teacher.service';

@Component({
  selector: 'app-subida-material',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './subida-material.component.html',
})
export class SubidaMaterialComponent {
  @Output() materialUploaded = new EventEmitter<void>();
  
  materialForm: FormGroup;
  selectedFile: File | null = null;
  isUploading = false;
  isSuccess = false;
  errorMessage = '';
  
  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService
  ) {
    this.materialForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      cursoRef: ['', [Validators.required]],
      file: [null, [Validators.required]]
    });
  }
  
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      
      // Check if file is a PDF
      if (file.type !== 'application/pdf') {
        this.errorMessage = 'Solo se permiten archivos PDF';
        this.selectedFile = null;
        this.materialForm.get('file')?.setValue(null);
        return;
      }
      
      this.selectedFile = file;
      this.materialForm.get('file')?.setValue(file);
      this.errorMessage = '';
    }
  }
  
  async onSubmit() {
    if (this.materialForm.invalid || !this.selectedFile) {
      this.errorMessage = 'Por favor completa todos los campos correctamente';
      return;
    }
    
    this.isUploading = true;
    this.errorMessage = '';
    
    try {
      // Create material entry with just the file name
      const newMaterial: Material = {
        title: this.materialForm.value.title,
        description: this.materialForm.value.description,
        fileType: 'pdf',
        fileName: this.selectedFile!.name, // Store just the file name
        uploadDate: new Date(),
        cursoRef: this.materialForm.value.cursoRef
      };
      
      // Save reference to Firebase (without uploading the actual file)
      this.saveMaterialReference(newMaterial);
    } catch (error: any) {
      this.isUploading = false;
      this.errorMessage = 'Error: ' + error.message;
    }
  }
  
  private saveMaterialReference(material: Material) {
    this.teacherService.saveRecurso(material)
      .then(id => {
        this.isUploading = false;
        this.isSuccess = true;
        this.materialForm.reset();
        this.selectedFile = null;
        
        // Emit event to parent component
        setTimeout(() => {
          this.isSuccess = false;
          this.materialUploaded.emit();
        }, 1500);
      })
      .catch(error => {
        this.isUploading = false;
        this.errorMessage = 'Error al guardar la referencia: ' + error.message;
      });
  }
}