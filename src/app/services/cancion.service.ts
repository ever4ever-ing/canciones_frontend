import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cancion } from '../models/cancion.model';

@Injectable({
  providedIn: 'root'
})
export class CancionService {
  private apiUrl = 'http://34.176.216.198/canciones';

  constructor(private http: HttpClient) { }

  obtenerTodasLasCanciones(): Observable<Cancion[]> {
    return this.http.get<Cancion[]>(this.apiUrl);
  }

  obtenerCancionPorId(id: number): Observable<Cancion> {
    return this.http.get<Cancion>(`${this.apiUrl}/detalle/${id}`);
  }

  agregarCancion(cancion: Cancion): Observable<Cancion> {
    return this.http.post<Cancion>(`${this.apiUrl}/procesa/agregar`, cancion);
  }

  eliminarCancion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
