import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CancionService } from '../../services/cancion.service';
import { Cancion } from '../../models/cancion.model';

@Component({
  selector: 'app-agregar-cancion',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './agregar-cancion.component.html',
  styleUrls: ['./agregar-cancion.component.css']
})
export class AgregarCancionComponent {
  private destroyRef = inject(DestroyRef);
  cancion: Cancion = {
    id: 0,
    titulo: '',
    artista: '',
    album: '',
    genero: '',
    idioma: ''
  };
  
  enviando = false;
  mensajeError = '';

  constructor(
    private cancionService: CancionService,
    private router: Router
  ) { }

  agregarCancion(): void {
    if (!this.cancion.titulo || !this.cancion.artista) {
      this.mensajeError = 'Título y artista son obligatorios';
      return;
    }
    
    this.enviando = true;
    this.mensajeError = '';
    
    // Crear objeto sin el id para evitar problemas
    const cancionData: any = {
      titulo: this.cancion.titulo,
      artista: this.cancion.artista,
      album: this.cancion.album || null,
      genero: this.cancion.genero || null,
      idioma: this.cancion.idioma || null
    };
    
    this.cancionService.agregarCancion(cancionData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.enviando = false;
          this.router.navigate(['/canciones']);
        },
        error: (err) => {
          console.error('Error al agregar canción:', err);
          this.mensajeError = 'Error al agregar la canción. Intenta nuevamente.';
          this.enviando = false;
        }
      });
  }
}
