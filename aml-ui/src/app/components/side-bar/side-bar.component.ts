import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {RouterLink, RouterModule} from "@angular/router";
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatSidenavModule, RouterLink, RouterModule, MatIconModule, MatListModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

  logout() {
    localStorage.setItem('isLoggedIn', 'false');
    console.log('User logged out');
    location.reload();
  }
}
