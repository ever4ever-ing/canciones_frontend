export interface Cancion {
  id: number;
  titulo: string;
  artista: string;
  album?: string;
  genero?: string;
  idioma?: string;
  fechaCreacion?: string;
  fechaActualizacion?: string;
}
