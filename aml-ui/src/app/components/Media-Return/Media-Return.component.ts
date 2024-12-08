import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {Media} from '../../shared/media';
import {Filters} from '../../shared/filters';
import {AmlApiService} from '../../services/aml-api.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {FilterMediaComponent} from '../filter-media/filter-media.component';
import {MediaEnquiryType} from '../../enums/media-enquiry-type.enum';
import {MatDialog} from '@angular/material/dialog';
import {TransferMediaDialogComponent} from '../transfer-media-dialog/transfer-media-dialog.component';
import {Branch} from '../../shared/branch';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-Media-Return',
  standalone: true,
  imports: [MatTableModule, MatPaginator, FilterMediaComponent],
  templateUrl: './Media-Return.component.html',
  styleUrl: './Media-Return.component.scss'
})
export class MediaReturnComponent implements OnInit{
  @ViewChild(MatPaginator, {static:false}) set paginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  displayedColumns: string[] = ['Name', 'Author', 'Publication Year', 'Stock Level', 'Media Type', 'Branch', 'Action'];
  dataSource = new MatTableDataSource<Media>();

  pageNumber: number = 1;
  pageSize: number = 8;
  mediaCount: number;
  mediaEnquiryType = MediaEnquiryType.return;

  readonly dialog = inject(MatDialog);

  filters: Filters = {
    pageNumber: this.pageNumber,
    pageSize: this.pageSize,
    mediaEnquiryType: this.mediaEnquiryType,
    branches: [],
    mediaTypes: []
  };

  branches: Branch[];

  constructor(private amlApiService: AmlApiService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    console.log("filters oninit inventory", this.filters);
    this.GetData(this.filters);
    this.dataSource.paginator = this.paginator;

    this.amlApiService.getBranches().subscribe({
      next: (success) => {
        this.branches = success;
      }
    });
  }

  GetData(filters: Filters){
    this.amlApiService.getFilteredMedia(filters).subscribe({
      next: (success) => {
        this.dataSource = new MatTableDataSource<Media>(success.mediaResources);
        this.mediaCount = success.mediaCount;
      }
    });
  }

  TransferMedia(mediaData: Media) {
    const dialogRef = this.dialog.open(TransferMediaDialogComponent, {
      data: {
        Media: mediaData,
        branches: this.branches}});
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
      }
    });
  }

  onReturnClick(): void {
    this.snackBar.open('The book is now being transferred.', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  updateFilters(newFilters: Filters){
    newFilters.pageSize = this.filters.pageSize;
    this.filters = newFilters;
    this.GetData(this.filters);
  }

  pageChanged (pageEvent: PageEvent): void {
    this.pageNumber = pageEvent.pageIndex + 1;
    this.pageSize = pageEvent.pageSize;
    this.GetData(this.filters);
  }
}
