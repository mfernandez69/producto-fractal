import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubidaMaterialComponent } from '../subida-material/subida-material.component';
import { TeacherService } from '../../../../core/services/teacher.service';
import { Material } from '../../../../models/material.model';

@Component({
  selector: 'app-listado-recursos',
  standalone: true,
  imports: [CommonModule, SubidaMaterialComponent],
  templateUrl: './listado-recursos.component.html',
  styles: `
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `
})
export class ListadoRecursosComponent implements OnInit {
  materials: Material[] = [];
  isLoading = true;
  showModal = false;

  constructor(private teacherService: TeacherService) {}

  ngOnInit() {
    this.loadMaterials();
  }

  loadMaterials() {
    this.isLoading = true;
    this.teacherService.getAllsaveRecursos().subscribe({
      next: (materials) => {
        this.materials = materials;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading materials:', error);
        this.isLoading = false;
      }
    });
  }

  openAddResourceModal() {
    this.showModal = true;
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  }

  closeModal(event?: Event) {
    this.showModal = false;
    document.body.style.overflow = 'auto'; // Restore scroll
  }

  onMaterialUploaded() {
    this.loadMaterials(); // Reload the materials list
    this.closeModal(); // Close the modal
  }
}