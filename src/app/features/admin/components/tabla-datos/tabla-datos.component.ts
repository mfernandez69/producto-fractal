import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabla-datos',
  imports: [CommonModule],
  templateUrl: './tabla-datos.component.html',
  styles: ``
})
export class TablaDatosComponent {
  usuarios = [
    {
      id: 1,
      nombre: 'Juan Pérez',
      email: 'juan@example.com',
      rol: 'Admin',
      estado: 'Activo',
      fechaRegistro: '2024-01-15'
    },
    {
      id: 2,
      nombre: 'María García',
      email: 'maria@example.com',
      rol: 'Usuario',
      estado: 'Activo',
      fechaRegistro: '2024-01-10'
    },
    {
      id: 3,
      nombre: 'Carlos López',
      email: 'carlos@example.com',
      rol: 'Moderador',
      estado: 'Inactivo',
      fechaRegistro: '2024-01-05'
    },
    {
      id: 4,
      nombre: 'Ana Martínez',
      email: 'ana@example.com',
      rol: 'Usuario',
      estado: 'Activo',
      fechaRegistro: '2024-01-20'
    }
  ];

  eliminarUsuario(id: number) {
    this.usuarios = this.usuarios.filter(user => user.id !== id);
  }
}
