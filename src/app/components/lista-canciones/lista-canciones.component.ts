import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CancionService } from '../../services/cancion.service';
import { Cancion } from '../../models/cancion.model';

@Component({
  selector: 'app-lista-canciones',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lista-canciones.component.html',
  styleUrls: ['./lista-canciones.component.css']
})
export class ListaCancionesComponent implements OnInit {
  canciones: Cancion[] = [];

  constructor(private cancionService: CancionService) { }

  ngOnInit(): void {
    this.cargarCanciones();
  }

  cargarCanciones(): void {
    this.cancionService.obtenerTodasLasCanciones().subscribe({
      next: (data) => {
        console.log('Canciones cargadas:', data);
        this.canciones = data;
      },
      error: (err) => console.error('Error al cargar canciones:', err)
    });
  }

  eliminarCancion(id: number, titulo: string): void {
    if (confirm(`¿Estás seguro de eliminar "${titulo}"?`)) {
      this.cancionService.eliminarCancion(id).subscribe({
        next: () => {
          console.log('Canción eliminada exitosamente');
          window.location.reload();
        },
        error: (err) => console.error('Error al eliminar canción:', err)
      });
    }
  }
}
