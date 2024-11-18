import { Routes } from '@angular/router';
import { UserMediaComponent } from './components/user-media/user-media.component';
import {MediaReturnComponent} from './components/Media-Return/Media-Return.component';

export const routes: Routes = [
    {path: 'user-media', component: UserMediaComponent},
    {path: 'Media-Return', component: MediaReturnComponent}
];
