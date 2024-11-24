import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {Media} from '../../shared/media';
import {Filters} from '../../shared/filters';
import {AmlApiService} from '../../services/aml-api.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {FilterMediaComponent} from '../filter-media/filter-media.component';
import {MediaEnquiryType} from '../../enums/media-enquiry-type.enum';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-manage-inventory',
  standalone: true,
  imports: [MatTableModule, MatPaginator, FilterMediaComponent],
  templateUrl: './manage-inventory.component.html',
  styleUrl: './manage-inventory.component.scss'
})
export class ManageInventoryComponent implements OnInit{
  @ViewChild(MatPaginator, {static:false}) set paginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  displayedColumns: string[] = ['Name', 'Author', 'Publication Year', 'Stock Level', 'Media Type', 'Branch'];
  dataSource = new MatTableDataSource<Media>();

  pageNumber: number = 1;
  pageSize: number = 8;
  mediaCount: number;
  mediaEnquiryType = MediaEnquiryType.manageInventory;

  readonly dialog = inject(MatDialog);

  filters: Filters = {
    pageNumber: this.pageNumber,
    pageSize: this.pageSize,
    mediaEnquiryType: this.mediaEnquiryType
  };

  constructor(private amlApiService: AmlApiService) { }

  ngOnInit() {
    console.log("filters oninit inventory", this.filters);
    this.GetData(this.filters);
    this.dataSource.paginator = this.paginator;
  }

  // GetData(){
  //   let filters: Filters = {
  //     pageNumber: this.pageNumber,
  //     pageSize: this.pageSize,
  //     mediaEnquiryType: MediaEnquiryType.manageInventory
  //   }
  //
  //   this.amlApiService.getFilteredMedia(filters).subscribe({
  //     next: (success) => {
  //       this.dataSource = new MatTableDataSource<Media>(success.mediaResources);
  //       this.mediaCount = success.mediaCount;
  //     }
  //   });
  // }

  GetData(filters: Filters){
    console.log("filters at inventory", filters);
    this.amlApiService.getFilteredMedia(filters).subscribe({
      next: (success) => {
        console.log("i got here");
        this.dataSource = new MatTableDataSource<Media>(success.mediaResources);
        this.mediaCount = success.mediaCount;
      }
    });
  }

  updateFilters(newFilters: Filters){
    newFilters.pageSize = this.filters.pageSize;
    this.filters = newFilters;
    console.log("Filters at inventory", this.filters);
    this.GetData(this.filters);
  }

  pageChanged (pageEvent: PageEvent): void {
    console.log("Filters at inventory", this.filters);
    this.pageNumber = pageEvent.pageIndex + 1;
    this.pageSize = pageEvent.pageSize;
    this.GetData(this.filters);
  }

}
