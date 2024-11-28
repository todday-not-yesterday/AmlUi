import {Component, Inject, OnInit} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';
import {NgForOf} from '@angular/common';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {AmlApiService} from '../../services/aml-api.service';
import {TransferData} from '../../shared/transferData';
import {Branch} from '../../shared/branch';

@Component({
  selector: 'app-transfer-media-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    MatDialogTitle,
    MatDialogContent,
    MatButton,
    MatDialogActions,
    MatInput,
    NgMultiSelectDropDownModule,
    NgForOf
  ],
  templateUrl: './transfer-media-dialog.component.html',
  styleUrl: './transfer-media-dialog.component.scss'
})
export class TransferMediaDialogComponent implements OnInit{

  transferForm: FormGroup;
  branches: Branch[];

  constructor(
    private amlApiService: AmlApiService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<TransferMediaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.transferForm = this.formBuilder.group({
      quantityControl: new FormControl(),
      branchControl: new FormControl
    });
  }

  ngOnInit(): void {
    this.branches = this.data.branches.filter((x:Branch) => x.name !== this.data.Media.branchName);
  }

  submitTransfer() {
    let transferData: TransferData = {
      key: this.data.Media.key,
      branch: this.transferForm.value.branchControl,
      stockLevel: this.transferForm.value.quantityControl
    }

    console.log("Transfer Data", transferData);

    this.amlApiService.transferMedia(transferData).subscribe();

    this.dialogRef.close();
  }

  cancelTransfer() {
    this.dialogRef.close();
  }

}
