import { Routes } from '@angular/router';
import {MediaReturnComponent} from './components/Media-Return/Media-Return.component';
import {MediaBorrowComponent } from './components/media-borrow/media-borrow.component';

export const routes: Routes = [
    {path: 'Media-Return', component: MediaReturnComponent},
    {path: 'media-borrow', component: MediaBorrowComponent}
];
