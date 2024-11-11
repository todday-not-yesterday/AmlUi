import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { AmlApiService } from '../../services/aml-api.service';
import { Media } from '../../shared/media';
import { Filters } from '../../shared/filters';
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-user-media',
  standalone: true,
  imports: [MatTableModule, MatPaginator],
  templateUrl: './user-media.component.html',
  styleUrl: './user-media.component.scss'
})

export class UserMediaComponent implements OnInit{
  displayedColumns: string[] = ['Name', 'Author', 'Publication Year', 'Available', 'Media Type', 'Branch'];
  dataSource = new MatTableDataSource<Media>();
  @ViewChild(MatPaginator, {static:false}) set paginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
}

  pageNumber: number = 1;
  pageSize: number = 5;
  mediaCount: number = 0;

  constructor(private amlApiService: AmlApiService){}

  ngOnInit() {
    this.GetData();
    this.dataSource.paginator = this.paginator;
  }

  GetData(){
    let filters: Filters = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize
    }

    this.amlApiService.getFilteredMedia(filters).subscribe({
      next: (success) => {
        this.dataSource = new MatTableDataSource<Media>(success.mediaResources);
        this.mediaCount = success.mediaCount;
      }
    });
  }

  pageChanged (pageEvent: PageEvent): void {
    this.pageNumber = pageEvent.pageIndex + 1;
    this.pageSize = pageEvent.pageSize;
    this.GetData();
  }
}
