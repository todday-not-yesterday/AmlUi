import {Component, EventEmitter, Output} from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'RegistrationComponent',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './Registration.component.html',
  styleUrl: './Registration.component.scss'
})
export class RegistrationComponent {

  @Output() switchToLogin = new EventEmitter<void>();
}
