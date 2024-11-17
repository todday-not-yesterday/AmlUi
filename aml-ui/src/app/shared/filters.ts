import { MediaEnquiryType } from "../enums/media-enquiry-type.enum";

export interface Filters{
    pageNumber: number;
    pageSize: number;
    userKey?: number;
    MinimumPublicationYear?: number;
    MaximumPublicationYear?: number;
    mediaTypes?: number[];
    branchNames?: string[];
    mediaEnquiryType: MediaEnquiryType;
}