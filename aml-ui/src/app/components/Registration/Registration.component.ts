import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'RegistrationComponent',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './Registration.component.html',
  styleUrls: ['./Registration.component.scss']
})
export class RegistrationComponent {

  firstName: string = '';
  secondName: string = '';
  address: string = '';
  postcode: string = '';
  email: string = '';
  confirmEmail: string = '';
  birthDate: string = '';
  contactNumber: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  exclusiveInsights: boolean = false;
  termsConditions: boolean = false;

  @Output() switchToLogin = new EventEmitter<void>();

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    if (this.email !== this.confirmEmail && this.password !== this.confirmPassword) {
      alert('Emails and Passwords do not match!');
      return;
    }
    else if (this.email !== this.confirmEmail) {
      alert('Emails do not match!');
      return;
    }
    else if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    else if (!this.termsConditions) {
      alert('Please Consent to our terms and Conditions');
      return;
    }

    const requestBody = {
      FirstName: this.firstName,
      LastName: this.secondName,
      Address: this.address,
      PostCode: this.postcode,
      Email: this.email,
      DateOfBirth: this.birthDate,
      ContactNumber: this.contactNumber,
      UserName: this.username,
      Password: this.password,
      Consent: this.termsConditions
    };

    const jsonRequestBody = JSON.stringify(requestBody);

    console.log('Request Body as JSON:', jsonRequestBody);

    this.http.post<HttpResponse<any>>('http://localhost:35014/User/Register', jsonRequestBody, {
      headers: {
        'Content-Type': 'application/json'
      },
      observe: 'response'
    }).pipe(
      catchError(err => {
        console.error('Registration error:', err);

        if (err.error && err.error.error === "The user already exists.") {
          alert('The username already exists. Please choose a different one.');
        } else {
          alert('An error occurred during registration.');
        }

        return of(null);
      })
    ).subscribe(response => {
      if (response) {
        console.log('API Status Code:', response.status);
        if (response.status === 200) {
          alert('Registration successful');
          location.reload();
        } else {
          alert('Registration failed!');
        }
      } else {
        console.log('API Status Code: Response is null');
        alert('Registration failed!');
      }
    });
  }
}
