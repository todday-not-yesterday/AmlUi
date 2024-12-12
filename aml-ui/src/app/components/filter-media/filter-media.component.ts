import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
import {NgForOf, NgIf} from '@angular/common';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {MatCheckbox} from '@angular/material/checkbox';

@Component({
  selector: 'app-filter-media',
  standalone: true,
  imports: [FormsModule, FormsModule, ReactiveFormsModule, MatSelectModule, MatFormFieldModule, MatDatepickerModule, MatButtonModule, MatInputModule, NgIf, MatRadioButton, MatRadioGroup, NgForOf, NgMultiSelectDropDownModule, MatCheckbox],
  providers: [provideNativeDateAdapter()],
  templateUrl: './filter-media.component.html',
  styleUrl: './filter-media.component.scss'
})

export class FilterMediaComponent implements OnInit{
  @Input( {required: true}) mediaEnquiryType!: MediaEnquiryType;
  @Output() filtersEvent = new EventEmitter<Filters>();

  filtersForm = this.formBuilder.group({
    searchItemControl: new FormControl(),
    mediaTypeFormControl: new FormControl(),
    branchFromControl: new FormControl(),
    publicationYearControl: new FormControl(),
    availableControl: new FormControl
  });

  filters: Filters;
  mediaTypes: MediaType[];
  branches: Branch[];
  settings = {};
  selectedMediaTypes: number[] = [];
  selectedBranches: number[] = [];

  constructor(private amlApiService: AmlApiService, private formBuilder: FormBuilder){}

  ngOnInit(){
    this.filters = {
      pageNumber: 1,
      pageSize: 0,
      mediaEnquiryType: this.mediaEnquiryType,
    }

    this.settings = {
      singleSelection: false,
      idField: 'key',
      textField: 'name',
      enableCheckAll: true,
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      itemsShowLimit: 1,
    };

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
  }

  public onItemSelect(item: any, type: any) {
    if (type === 'mediaType'){
      this.selectedMediaTypes.push(item.key);
    }
    else if (type === 'branches'){
      this.selectedBranches.push(item.key)
    }
  }

  public onDeSelect(item: any, type: any) {
    if (type === 'mediaType'){
      this.selectedMediaTypes = this.selectedMediaTypes.filter(x => x !== item.key);
    }
    else if (type === 'branches'){
      this.selectedBranches = this.selectedBranches.filter(x => x !== item.key);
    }
  }

  public onSelectAll(type: any) {
    if (type === 'mediaType'){
      this.selectedMediaTypes = this.mediaTypes.map(x => x.key)
    }
    else if (type === 'branches'){
      this.selectedBranches = this.branches.map(x => x.key);
    }
  }

  public onDeSelectAll(type: any) {
    if (type === 'mediaType'){
      this.selectedMediaTypes = [];
    }
    else if (type === 'branches'){
      this.selectedBranches = [];
    }
  }

  filter(){
    this.filters.SearchItem = this.filtersForm.controls.searchItemControl.value;
    this.filters.publicationYear = this.filtersForm.controls.publicationYearControl.value;
    this.filters.available = this.filtersForm.controls.availableControl.value;
    this.filters.mediaTypes = this.selectedMediaTypes;
    this.filters.branches = this.selectedBranches;
    this.filters.userKey = Number(localStorage.getItem("currentUserKey"));
    console.log("filters at filter:", this.filters);
    this.filtersEvent.emit(this.filters);
  }
}
