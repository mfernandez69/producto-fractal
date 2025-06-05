import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadisticasComponent } from '../components/estadisticas/estadisticas.component';
import { GraficoSimpleComponent } from '../components/grafico-simple/grafico-simple.component';
import { TablaDatosComponent } from '../components/tabla-datos/tabla-datos.component';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, GraficoSimpleComponent, TablaDatosComponent, EstadisticasComponent],
  templateUrl: './layout.component.html',
  styles: ``
})
export default class LayoutComponent {

}
