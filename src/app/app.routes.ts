import { Routes } from '@angular/router';
import { ListaCancionesComponent } from './components/lista-canciones/lista-canciones.component';
import { DetalleCancionComponent } from './components/detalle-cancion/detalle-cancion.component';
import { AgregarCancionComponent } from './components/agregar-cancion/agregar-cancion.component';

export const routes: Routes = [
  { path: '', redirectTo: '/canciones', pathMatch: 'full' },
  { path: 'canciones', component: ListaCancionesComponent },
  { path: 'canciones/agregar', component: AgregarCancionComponent },
  { path: 'canciones/:id', component: DetalleCancionComponent }
];
