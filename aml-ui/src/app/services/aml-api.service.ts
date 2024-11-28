import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Filters } from "../shared/filters";
import { GetMediaResponse } from "../shared/get-media-response";
import { MediaType } from "../shared/media-type";
import { Branch } from "../shared/branch";
import {TransferData} from '../shared/transferData';

@Injectable({
    providedIn: 'root',
})

export class AmlApiService {
  private readonly amlApi = "http://localhost:35014";

  constructor(private httpClient: HttpClient) {
  }

  getFilteredMedia(filters: Filters): Observable<GetMediaResponse> {
    const url = `${this.amlApi}/Search/GetMedia`;
    return this.httpClient.post<GetMediaResponse>(url, filters);
  }

  getMediaTypes(): Observable<MediaType[]> {
    const url = `${this.amlApi}/Search/GetMediaTypes`;
    return this.httpClient.get<MediaType[]>(url);
  }

  getBranches(): Observable<Branch[]> {
    const url = `${this.amlApi}/Search/GetBranches`;
    return this.httpClient.get<Branch[]>(url);
  }

  transferMedia(transferData: TransferData): Observable<any> {
    console.log("made it here with transfer data", transferData);
    const url = `${this.amlApi}/Inventory/TransferMedia`;
    console.log("url", url);
    return this.httpClient.post<TransferData[]>(url, transferData);
  }
}
