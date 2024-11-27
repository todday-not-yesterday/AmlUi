import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MediaBorrowComponent } from '../media-borrow/media-borrow.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AmlApiService } from '../../services/aml-api.service';

@Component({
  selector: 'app-media-borrow-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    FormsModule,
    MatCheckboxModule
  ],
  templateUrl: './media-borrow-dialog.component.html',
  styleUrl: './media-borrow-dialog.component.scss'
})
export class MediaBorrowDialogComponent {
  readonly dialogRef = inject(MatDialogRef<MediaBorrowComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
  readonly mediaKey = this.data.mediaKey;
  readonly mediaName = this.data.mediaName;
  readonly mediaType = this.data.mediaType;
  readonly userKey = this.data.userKey;

  constructor(private amlApiService: AmlApiService){}

  collection: boolean;
  delivery: boolean;
  confirmTypeRequired = false;
  borrow(){
    if(!this.collection && !this.delivery){
      this.confirmTypeRequired = true;
      return;
    }
    this.amlApiService.borrowMedia(this.mediaKey, this.userKey).subscribe({
      next: (success) => {
        this.dialogRef.close(success);
      }
    });
  }

  onNoClick(){
    this.dialogRef.close(false);
  }
}
