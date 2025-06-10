import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadisticasComponent, GraficoSimpleComponent, TablaDatosComponent } from '@mfernandez69/fractal-library';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, GraficoSimpleComponent, TablaDatosComponent, EstadisticasComponent],
  templateUrl: './layout.component.html',
  styles: ``
})
export default class LayoutComponent {

}
