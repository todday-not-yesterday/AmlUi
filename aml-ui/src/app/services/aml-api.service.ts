import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Filters } from "../shared/filters";
import { GetMediaResponse } from "../shared/get-media-response";
import { MediaType } from "../shared/media-type";
import { Branch } from "../shared/branch";
import { BorrowMediaResponse } from "../shared/borrow-media-response";

@Injectable({
    providedIn: 'root',
})

export class AmlApiService {
    private readonly amlApi = "http://localhost:35014";
    constructor(private httpClient: HttpClient){}
    
    getFilteredMedia(filters: Filters) : Observable<GetMediaResponse>{
        const url = `${this.amlApi}/Search/GetMedia`;
        return this.httpClient.post<GetMediaResponse>(url, filters);
    }

    getMediaTypes() : Observable<MediaType[]>{
        const url = `${this.amlApi}/Search/GetMediaTypes`;
        return this.httpClient.get<MediaType[]>(url);
    }

    getBranches() : Observable<Branch[]>{
        const url = `${this.amlApi}/Search/GetBranches`;
        return this.httpClient.get<Branch[]>(url);
    }

    borrowMedia(mediaKey: number, userKey: number) : Observable<BorrowMediaResponse>{
        const url = `${this.amlApi}/Media/BorrowMedia/${mediaKey}/${userKey}`;
        return this.httpClient.post<BorrowMediaResponse>(url, null);
    }
}