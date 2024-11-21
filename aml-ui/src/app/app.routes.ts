import { Routes } from '@angular/router';
import {MediaReturnComponent} from './components/Media-Return/Media-Return.component';
import {MediaBorrowComponent} from './components/media-borrow/media-borrow.component';
import {Login} from './components/Login/Login.component';

export const routes: Routes = [
    {path: 'Media-Return', component: MediaReturnComponent},
    {path: 'media-borrow', component: MediaBorrowComponent},
    {path: 'Login', component: Login}
];
