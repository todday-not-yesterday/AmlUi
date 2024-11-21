import { MediaEnquiryType } from "../enums/media-enquiry-type.enum";

export interface Filters{
    pageNumber: number;
    pageSize: number;
    SearchItem?: string;
    userKey?: number;
    mediaTypes?: number[];
    branches?: number[];
    mediaEnquiryType?: MediaEnquiryType;
}
