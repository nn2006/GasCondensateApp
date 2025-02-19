import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';  // Ensure LoginComponent is imported
import { DashboardComponent } from './components/dashboard/dashboard.component';

// const routes: Routes = [
//   { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
//   { path: 'login', component: LoginComponent },  // Login route
//   { path: 'dashboard', component: DashboardComponent },  // Dashboard route
//   { path: '**', redirectTo: '/login' }  // Wildcard route for unknown paths
// ];
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Optional default route
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Import RouterModule with routes
  exports: [RouterModule]
})
export class AppRoutingModule {}
