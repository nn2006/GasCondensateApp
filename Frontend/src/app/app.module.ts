import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';  // Import LoginComponent
import { DashboardComponent } from './components/dashboard/dashboard.component';  // Import DashboardComponent
import { AppRoutingModule } from './app-routing.module';  // Import AppRoutingModule

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent  // Declare all components
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule  // Add AppRoutingModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
