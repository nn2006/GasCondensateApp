import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  
import { Router } from '@angular/router';
import { GasCondensateService } from './services/gas-condensate.service';

@Component({
  selector: 'app-root',
  
  imports: [RouterModule],  // Import RouterModule
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';
  fields: any[] = [];
  error: string = '';

  constructor(private gasCondensateService: GasCondensateService, private router: Router) {}

  ngOnInit(): void {
    this.gasCondensateService.getFields().subscribe(
      data => {
        this.fields = data;
        console.log('Data fetched:', data);
      },
      error => {
        this.error = 'Error fetching data';
        console.error('API Error:', error);
      }
    );
    if (!localStorage.getItem('isLoggedIn')) {
      // Delay navigation to ensure routing works after app is initialized
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 0);
    }
  }
}
