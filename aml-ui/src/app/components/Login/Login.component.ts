import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'Login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './Login.component.html',
  styleUrls: ['./Login.component.scss']
})
export class Login {
  username: string = '';
  password: string = '';

  @Output() switchToRegister = new EventEmitter<void>();

  constructor(private router: Router, private http: HttpClient) {}

  login() {
    this.loginApiRequest();
  }

  loginApiRequest() {
    const url = `http://localhost:35014/User/Login?username=${encodeURIComponent(this.username)}&password=${encodeURIComponent(this.password)}`;

    this.http.get<number>(url).pipe(
      catchError(err => {
        console.error('Login error:', err);
        alert('An error occurred while logging in.');
        return of(false);
      })
    ).subscribe(result => {
      if (result) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUserKey', `${result}`);
        this.router.navigate(['/']);
        location.reload();
      } else {
        localStorage.setItem('isLoggedIn', 'false');
        alert('Invalid login credentials');
      }
    });
  }
}
