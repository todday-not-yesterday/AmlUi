import { Routes } from '@angular/router';
import {MediaReturnComponent} from './components/Media-Return/Media-Return.component';
import {MediaBorrowComponent} from './components/media-borrow/media-borrow.component';
import {Login} from './components/Login/Login.component';
import {RegistrationComponent} from './components/Registration/Registration.component';
import {ManageInventoryComponent} from './components/manage-inventory/manage-inventory.component';
import {NotificationHistoryComponent} from './components/notification-history/notification-history.component';

export const routes: Routes = [
    {path: 'Media-Return', component: MediaReturnComponent},
    {path: 'media-borrow', component: MediaBorrowComponent},
    {path: 'Registration', component: RegistrationComponent},
    {path: 'Login', component: Login},
    { path: '', redirectTo: '/Login', pathMatch: 'full' },
    //Add a page not found component maybe ?{ path: '**', component: PageNotFoundComponent },
    {path: 'manage-inventory', component: ManageInventoryComponent},
    {path: 'notification-history', component: NotificationHistoryComponent}
];
