import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MediaEnquiryType } from '../../enums/media-enquiry-type.enum';
import { FormControl, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MediaType } from '../../shared/media-type';
import { AmlApiService } from '../../services/aml-api.service';
import { Branch } from '../../shared/branch';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { Filters } from '../../shared/filters';

@Component({
  selector: 'app-filter-media',
  standalone: true,
  imports: [FormsModule, FormsModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule, MatDatepickerModule, MatButtonModule, MatInputModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './filter-media.component.html',
  styleUrl: './filter-media.component.scss'
})

export class FilterMediaComponent {
  @Input( {required: true}) mediaEnquiryType!: MediaEnquiryType;
  @Output() filtersEvent = new EventEmitter<Filters>();

  filtersForm = this.formBuilder.group({
    searchItemControl: new FormControl(),
    mediaTypeFormControl: new FormControl(),
    branchFromControl: new FormControl()
  });

  searchItem: string;

  filters: Filters = {
    pageNumber: 1,
    pageSize: 0,
    mediaEnquiryType: MediaEnquiryType.borrow,
  };

  mediaTypes: MediaType[];
  branches: Branch[];

  readonly date = new FormControl(new Date);

  constructor(private amlApiService: AmlApiService, private formBuilder: FormBuilder){}

  ngOnInit(){
    this.amlApiService.getMediaTypes().subscribe({
      next: (success) => {
        this.mediaTypes = success;
      }
    });

    this.amlApiService.getBranches().subscribe({
      next: (success) => {
        this.branches = success;
      }
    });

    this.filtersForm.valueChanges.subscribe(value => this.onFiltersChange(value));
    this.filtersForm.controls.searchItemControl.valueChanges.subscribe(searchItem => this.searchChange(searchItem));
  }

  onFiltersChange(data : any){
    this.filters.SearchItem = data.searchItemControl;
    this.filters.branches = data.branchFromControl;
    this.filters.mediaTypes = data.mediaTypeFormControl
  }

  searchChange(searchItem : string){
    this.filters.SearchItem = searchItem;
    this.filtersEvent.emit(this.filters);
  }

  filter(){
    this.filtersEvent.emit(this.filters);
  }
}