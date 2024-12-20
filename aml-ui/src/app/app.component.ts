import { Component } from '@angular/core';
import { SideBarComponent } from "./components/side-bar/side-bar.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import {Login} from './components/Login/Login.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {RegistrationComponent} from './components/Registration/Registration.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SideBarComponent,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    Login,
    RegistrationComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  showLogin: boolean = true
  isLoggedIn: boolean = false;
  constructor(private router: Router) {}
  ngOnInit() {
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }
  login() {
    console.log(this.isLoggedIn);
    localStorage.setItem('isLoggedIn', 'true');
    this.router.navigate(['/media-return']);
  }
  toggleLogin() {
    this.showLogin = !this.showLogin;
  }

}
