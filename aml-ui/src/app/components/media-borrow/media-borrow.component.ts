import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AmlApiService } from '../../services/aml-api.service';
import { Media } from '../../shared/media';
import { Filters } from '../../shared/filters';
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { FilterMediaComponent } from "../filter-media/filter-media.component";
import { MediaEnquiryType } from '../../enums/media-enquiry-type.enum';
import { MatDialog } from '@angular/material/dialog';
import { MediaBorrowDialogComponent } from '../media-borrow-dialog/media-borrow-dialog.component';
import { BorrowMediaResponse } from '../../shared/borrow-media-response';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-media-borrow',
  standalone: true,
  imports: [MatTableModule, MatPaginator, FilterMediaComponent],
  templateUrl: './media-borrow.component.html',
  styleUrl: './media-borrow.component.scss'
})

export class MediaBorrowComponent implements OnInit{
  private _snackBar = inject(MatSnackBar);

  displayedColumns: string[] = ['Name', 'Author', 'Publication Year', 'Available', 'Media Type', 'Branch', 'Action'];
  dataSource = new MatTableDataSource<Media>();
  @ViewChild(MatPaginator, {static:false}) set paginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  mediaEnquiryType = MediaEnquiryType.borrow;
  readonly dialog = inject(MatDialog);

  pageNumber: number = 1;
  pageSize: number = 5;
  mediaCount: number;

  filters: Filters = {
    pageNumber: this.pageNumber,
    pageSize: this.pageSize,
    mediaEnquiryType: this.mediaEnquiryType
  };

  constructor(private amlApiService: AmlApiService){}

  ngOnInit() {
    this.GetData(this.filters);
    this.dataSource.paginator = this.paginator;
  }

  GetData(filters: Filters){
    this.amlApiService.getFilteredMedia(filters).subscribe({
      next: (success) => {
        this.dataSource = new MatTableDataSource<Media>(success.mediaResources);
        this.mediaCount = success.mediaCount;
      }
    });
  }

  pageChanged (pageEvent: PageEvent): void {
    this.filters.pageNumber = pageEvent.pageIndex + 1;
    this.filters.pageSize = pageEvent.pageSize;
    this.GetData(this.filters);
  }

  updateFilters(newFilters: Filters){
    newFilters.pageSize = this.filters.pageSize;
    this.filters = newFilters;
    this.GetData(this.filters);
  }

  borrowMedia(element:Media){
    const dialogRef = this.dialog.open(MediaBorrowDialogComponent, {
      data: {mediaKey: element.key, mediaName: element.name, mediaType: element.mediaType, userKey:4}
    });
    dialogRef.afterClosed().subscribe((result: BorrowMediaResponse) => {
      if (result.success) {
        this._snackBar.open(result.message, "OK", {
          verticalPosition: 'top',
          panelClass: 'success-snackbar',
          duration: 2000
        });
        if(this.filters){
          this.GetData(this.filters);
        }
      }
    });
}
}
