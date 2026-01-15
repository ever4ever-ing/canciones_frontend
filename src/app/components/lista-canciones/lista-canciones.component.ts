import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
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
    private router: Router
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.router.url === '/canciones') {
          this.cargarCanciones();
        }
      });
  }

  ngOnInit(): void {
    this.cargarCanciones();
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
