import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { Usuario } from '../../../models/usuario.model';

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ranking.component.html',
  styles: ``
})
export class RankingComponent implements OnInit {
  rankedStudents: Usuario[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadRanking();
  }

  loadRanking(): void {
    this.loading = true;
    this.errorMessage = '';
    
    console.log('Starting to load ranking data...');
    
    this.userService.getStudentsRanking()
      .subscribe({
        next: (students) => {
          console.log('Received students data:', students);
          this.rankedStudents = students;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading student ranking:', error);
          this.errorMessage = 'Error al cargar el ranking. Inténtalo de nuevo más tarde.';
          this.loading = false;
        },
        complete: () => {
          console.log('Ranking data stream completed');
          this.loading = false;
        }
      });
  }
}
