import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { comunesRoutes } from './comunes';
import { inventarioRoutes } from './inventario';
import { pagosRoutes } from './pagos';
import { reservasRoutes } from './reservas';
import { salidasRoutes } from './salidas';

export const welcomeSection = 'reservas';

const routes = [
  
  { path: '', redirectTo: '/'+welcomeSection, pathMatch: 'full', data:null },

   ...comunesRoutes,
   ...reservasRoutes, 
   ...salidasRoutes, 
   ...pagosRoutes, 
   ...inventarioRoutes
  
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes as Routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
