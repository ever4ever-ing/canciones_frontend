import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
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

  constructor(
    private cancionService: CancionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Recargar cada vez que se activa la ruta
    this.route.params.subscribe(() => {
      this.cargarCanciones();
    });
  }

  cargarCanciones(): void {
    this.cancionService.obtenerTodasLasCanciones().subscribe({
      next: (data) => this.canciones = data,
      error: (err) => console.error('Error:', err)
    });
  }

  eliminarCancion(id: number, titulo: string): void {
    if (confirm(`¿Estás seguro de eliminar "${titulo}"?`)) {
      this.cancionService.eliminarCancion(id).subscribe({
        next: () => this.cargarCanciones(),
        error: (err) => console.error('Error:', err)
      });
    }
  }
}
