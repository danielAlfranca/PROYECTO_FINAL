import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { inventarioRoutes } from './inventario';
import { pagosRoutes } from './pagos';
import { reservasRoutes } from './reservas';
import { salidasRoutes } from './salidas';

export const welcomeSection = 'reservas';

const routes: Routes = [
  
  { path: '', redirectTo: '/'+welcomeSection, pathMatch: 'full' },
   ...reservasRoutes, 
   ...salidasRoutes, 
   ...pagosRoutes, 
   ...inventarioRoutes
  
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
