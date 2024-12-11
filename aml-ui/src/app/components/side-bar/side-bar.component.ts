import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {RouterLink, RouterModule} from "@angular/router";
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { AmlApiService } from '../../services/aml-api.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatSidenavModule, RouterLink, RouterModule, MatIconModule, MatListModule, CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  userIsLibraryMember: boolean;
  userKey: number;

  constructor(private amlApiService: AmlApiService){}

  ngOnInit(){
    this.userKey = Number(localStorage.getItem("currentUserKey"));
    this.amlApiService.userIsLibraryMemeber(this.userKey).subscribe({
      next: (success) => {
        this.userIsLibraryMember = success;
      }
    });
  }

  logout() {
    localStorage.setItem('isLoggedIn', 'false');
    console.log('User logged out');
    location.reload();
  }
}
