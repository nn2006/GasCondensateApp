import { bootstrapApplication } from '@angular/platform-browser';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';  // Import RouterModule
import { routes } from './app/app.routes';  // Import routes

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimationsAsync(),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(RouterModule.forRoot(routes))  // Provide RouterModule with routes
  ],
}).catch(err => console.error(err));
