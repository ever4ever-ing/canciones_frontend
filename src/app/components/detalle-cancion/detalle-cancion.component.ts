import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CancionService } from '../../services/cancion.service';
import { Cancion } from '../../models/cancion.model';

@Component({
  selector: 'app-detalle-cancion',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalle-cancion.component.html',
  styleUrls: ['./detalle-cancion.component.css']
})
export class DetalleCancionComponent implements OnInit {
  cancion: Cancion | null = null;

  constructor(
    private route: ActivatedRoute,
    private cancionService: CancionService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.cancionService.obtenerCancionPorId(id).subscribe({
      next: (data) => this.cancion = data,
      error: (err) => console.error('Error al cargar la canción:', err)
    });
  }
}
