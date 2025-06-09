import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grafico-simple',
  imports: [CommonModule],
  templateUrl: './grafico-simple.component.html',
  styles: ``
})
export class GraficoSimpleComponent {
  chartData = [
    { month: 'Ene', value: 65, percentage: 65 },
    { month: 'Feb', value: 78, percentage: 78 },
    { month: 'Mar', value: 52, percentage: 52 },
    { month: 'Apr', value: 94, percentage: 94 },
    { month: 'May', value: 85, percentage: 85 },
    { month: 'Jun', value: 71, percentage: 71 }
  ];
}
