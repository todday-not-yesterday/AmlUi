import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Filters } from "../shared/filters";
import { GetMediaResponse } from "../shared/get-media-response";

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
}