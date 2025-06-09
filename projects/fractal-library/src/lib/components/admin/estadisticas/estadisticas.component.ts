
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-estadisticas',
  imports: [CommonModule],
  templateUrl: './estadisticas.component.html',
  styles: ``
})
export class EstadisticasComponent {
  stats = [
    {
      title: 'Total Usuarios',
      value: '2,543',
      change: '+12%',
      changeType: 'positive',
      icon: 'users'
    },
    {
      title: 'Ventas Mensuales',
      value: '$45,231',
      change: '+8%',
      changeType: 'positive',
      icon: 'chart'
    },
    {
      title: 'Productos Activos',
      value: '1,847',
      change: '-3%',
      changeType: 'negative',
      icon: 'box'
    },
    {
      title: 'Tasa Conversión',
      value: '3.24%',
      change: '+15%',
      changeType: 'positive',
      icon: 'trending'
    }
  ];
}
