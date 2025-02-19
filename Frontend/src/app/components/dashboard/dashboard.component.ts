import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GasCondensateService } from '../../services/gas-condensate.service';
import { GasCondensateField } from '../../models/gas-condensate-field.model';
import { Router } from '@angular/router';
import { MapComponent } from '../map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddFieldDialogComponent } from '../add-field-dialog/add-field-dialog.component';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MapComponent,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [GasCondensateService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  fields: GasCondensateField[] = [];
  displayedColumns: string[] = ['fieldName', 'productionRate', 'cost', 'yearOfExtraction', 'maintenanceType', 'actions'];

  filterCriteria: Partial<GasCondensateField> = {};  // Define filterCriteria

  constructor(
    private gasCondensateService: GasCondensateService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadFields();
  }

  // Add filter logic to apply filters dynamically
  filterFields(): void {
    this.gasCondensateService.getFields().subscribe(
      (data) => {
        this.fields = data.filter((field: GasCondensateField) => 
          (!this.filterCriteria.fieldName || field.fieldName.includes(this.filterCriteria.fieldName)) &&
          (!this.filterCriteria.productionRate || field.productionRate >= this.filterCriteria.productionRate) &&
          (!this.filterCriteria.cost || field.cost <= this.filterCriteria.cost) &&
          (!this.filterCriteria.yearOfExtraction || field.yearOfExtraction === this.filterCriteria.yearOfExtraction) &&
          (!this.filterCriteria.maintenanceType || field.maintenanceType.includes(this.filterCriteria.maintenanceType))
        );
      },
      (error) => {
        console.error('Error filtering fields:', error);
      }
    );
  }
  
  editField(field: GasCondensateField): void {
    const dialogRef = this.dialog.open(AddFieldDialogComponent, {
      width: '400px',
      data: field // Pass existing field data to the dialog
    });

    dialogRef.afterClosed().subscribe(updatedField => {
      if (updatedField) {
        this.gasCondensateService.updateField(field.id, updatedField).subscribe(
          () => {
            this.loadFields();
          },
          (error) => {
            console.error('Error updating field:', error);
          }
        );
      }
    });
  }

  deleteField(field: GasCondensateField): void {
    if (confirm(`Are you sure you want to delete ${field.fieldName}?`)) {
      this.gasCondensateService.deleteField(field.id).subscribe(
        () => {
          this.loadFields(); // Refresh the list after deletion
        },
        (error) => {
          console.error('Error deleting field:', error);
        }
      );
    }
  }

  loadFields(): void {
    this.gasCondensateService.getFields().subscribe(
      (data) => {
        this.fields = data;
      },
      (error) => {
        console.error('Error loading fields:', error);
      }
    );
  }

  openAddFieldDialog(): void {
    const dialogRef = this.dialog.open(AddFieldDialogComponent, {
      width: '400px',
      data: {} // Pass an empty object to avoid undefined errors
    });

    dialogRef.afterClosed().subscribe(newField => {
      if (newField) {
        delete newField.id; // Ensure id is not sent for new records
        this.gasCondensateService.addField(newField).subscribe(
          () => this.loadFields(),
          (error) => console.error('Error adding field:', error)
        );
      }
    });
  }

  logout(): void {
    this.router.navigate(['/login']);
  }
}
