import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../helpers';


const routes: Routes = [{
  path: '',
  component: PagesComponent,canActivate:[AuthGuard],
  children: [
    {
      path: '',
      component: DashboardComponent,
      canActivate:[AuthGuard],
    },{
      path: 'dashboard',
      component: DashboardComponent,
      canActivate:[AuthGuard]
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
