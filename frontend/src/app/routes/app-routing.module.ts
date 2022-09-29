import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { comunesRoutes } from './comunes';
import { inventarioRoutes } from './inventario';
import { loginRoutes } from './login';
import { pagosRoutes } from './pagos';
import { reservasRoutes } from './reservas';
import { resumenRoutes } from './resumen';
import { salidasRoutes } from './salidas';

export const welcomeSection = 'inventario';

const routes = [
  
  { path: '', redirectTo: '/'+welcomeSection, pathMatch: 'full', data:null },

   ...comunesRoutes,
   ...reservasRoutes, 
   ...salidasRoutes, 
   ...pagosRoutes, 
   ...inventarioRoutes,
   ...resumenRoutes,
   ...loginRoutes
  
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes as Routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
