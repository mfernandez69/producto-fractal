import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Material } from '../../../../models/material.model';
import { UploadService } from '../../../../core/services/upload.service';
import { TeacherService } from '../../../../core/services/teacher.service';

@Component({
  selector: 'app-subida-material',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './subida-material.component.html',
})
export class SubidaMaterialComponent {
  materialForm: FormGroup;
  selectedFile: File | null = null;
  isUploading = false;
  isSuccess = false;
  errorMessage = '';
  
  constructor(
    private fb: FormBuilder,
    private uploadService: UploadService,
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
      // Upload file to UploadThing
      this.uploadService.uploadPdf(this.selectedFile).subscribe(
        response => {
          // Create material entry in Firebase with the UploadThing fileId
          const newMaterial: Material = {
            title: this.materialForm.value.title,
            description: this.materialForm.value.description,
            fileId: response.fileId, // Assuming response has fileId
            fileType: 'pdf',
            fileName: this.selectedFile!.name,
            uploadDate: new Date(),
            cursoRef: this.materialForm.value.cursoRef
          };
          
          // Save reference to Firebase
          this.saveMaterialReference(newMaterial);
        },
        error => {
          this.isUploading = false;
          this.errorMessage = 'Error al subir el archivo: ' + error.message;
        }
      );
    } catch (error: any) {
      this.isUploading = false;
      this.errorMessage = 'Error: ' + error.message;
    }
  }
  
  private saveMaterialReference(material: Material) {
    // Save the material reference to Firebase
    this.teacherService.saveMaterial(material).then(
      () => {
        this.isUploading = false;
        this.isSuccess = true;
        this.materialForm.reset();
        this.selectedFile = null;
        setTimeout(() => this.isSuccess = false, 3000);
      },
      error => {
        this.isUploading = false;
        this.errorMessage = 'Error al guardar la referencia: ' + error.message;
      }
    );
  }
}
