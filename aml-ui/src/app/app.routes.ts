import { Routes } from '@angular/router';
import { UserMediaComponent } from './components/user-media/user-media.component';
import {MediaReturnComponent} from './components/Media-Return/Media-Return.component';
import { MediaBorrowComponent } from './components/media-borrow/media-borrow.component';

export const routes: Routes = [
    {path: 'user-media', component: UserMediaComponent},
    {path: 'Media-Return', component: MediaReturnComponent}
    {path: 'media-borrow', component: MediaBorrowComponent}
];
