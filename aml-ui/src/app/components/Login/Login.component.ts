import {Component, EventEmitter, Output} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'Login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './Login.component.html',
  styleUrl: './Login.component.scss'
})
export class Login {
  username: string = '';
  password: string = '';

  @Output() switchToRegister = new EventEmitter<void>();

  constructor(private router: Router) {}

  login() {
    if (this.username === 'user' && this.password === 'password') {
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/']);

      location.reload();
    } else {
      localStorage.setItem('isLoggedIn', 'false');
      alert('Invalid login credentials');
    }
  }
}
