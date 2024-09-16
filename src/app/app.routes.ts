import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const appRoutes: Routes = [
  { path: '', component: DashboardComponent, title: 'Home' },
];