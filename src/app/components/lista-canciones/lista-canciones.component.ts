import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
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
  private destroyRef = inject(DestroyRef);

  constructor(private cancionService: CancionService) { }

  ngOnInit(): void {
    this.cargarCanciones();
    
    // Suscribirse a cambios y limpiar automáticamente al destruir el componente
    this.cancionService.cancionAgregada$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.cargarCanciones();
      });
  }

  cargarCanciones(): void {
    this.cancionService.obtenerTodasLasCanciones()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.canciones = data;
        },
        error: (err) => console.error('Error al cargar canciones:', err)
      });
  }

  eliminarCancion(id: number, titulo: string): void {
    if (confirm(`¿Estás seguro de eliminar "${titulo}"?`)) {
      this.cancionService.eliminarCancion(id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.cargarCanciones();
          },
          error: (err) => console.error('Error al eliminar canción:', err)
        });
    }
  }
}
