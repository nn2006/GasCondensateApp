import { Component,Inject  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { GasCondensateField } from '../../models/gas-condensate-field.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-add-field-dialog',
  standalone: true,
  
  imports: [
     MatDialogModule,
     CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './add-field-dialog.component.html',
  styleUrls: ['./add-field-dialog.component.css']
})
export class AddFieldDialogComponent {
  fieldForm: FormGroup;
  isEditMode = false;

  constructor(
    public dialogRef: MatDialogRef<AddFieldDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: GasCondensateField
  ) {
    this.isEditMode = data.id ? true : false;
    
    this.fieldForm = this.fb.group({
      id: [data?.id || null], // Include id for editing
      fieldName: [data?.fieldName || '', Validators.required],
      latitude: [data?.latitude || '', Validators.required],
      longitude: [data?.longitude || '', Validators.required],
      productionRate: [data?.productionRate || '', Validators.required],
      cost: [data?.cost || '', Validators.required],
      yearOfExtraction: [data?.yearOfExtraction || '', Validators.required],
      maintenanceType: [data?.maintenanceType || '', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.fieldForm.valid) {
      this.dialogRef.close(this.fieldForm.value); // Ensure id is passed
    }
  }
  // onCancel(): void {
  //   this.dialogRef.close();
  // }

  // onSubmit(): void {
  //   if (this.fieldForm.valid) {
  //     this.dialogRef.close(this.fieldForm.value);
  //   }
 // }
}