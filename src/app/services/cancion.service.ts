import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Cancion } from '../models/cancion.model';

@Injectable({
  providedIn: 'root'
})
export class CancionService {
  private apiUrl = 'http://34.176.216.198/canciones';
  
  // Subject para notificar cuando se agrega una canción
  private cancionAgregadaSubject = new Subject<void>();
  
  // Observable público para que los componentes se suscriban
  cancionAgregada$ = this.cancionAgregadaSubject.asObservable();

  constructor(private http: HttpClient) { }

  obtenerTodasLasCanciones(): Observable<Cancion[]> {
    return this.http.get<Cancion[]>(this.apiUrl);
  }

  obtenerCancionPorId(id: number): Observable<Cancion> {
    return this.http.get<Cancion>(`${this.apiUrl}/detalle/${id}`);
  }

  agregarCancion(cancion: Cancion): Observable<Cancion> {
    return this.http.post<Cancion>(`${this.apiUrl}/procesa/agregar`, cancion).pipe(
      tap(() => this.cancionAgregadaSubject.next()) // Emitir evento cuando se agrega exitosamente
    );
  }

  eliminarCancion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
