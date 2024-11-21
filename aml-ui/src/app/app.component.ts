import { Component } from '@angular/core';
import { SideBarComponent } from "./components/side-bar/side-bar.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SideBarComponent,
    MatSidenavModule,
    MatListModule,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'aml-ui';
}
