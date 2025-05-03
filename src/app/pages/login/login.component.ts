import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  isLoading = false;
  loginError = '';
  showLoginForm = true;

  constructor(private router: Router) {}

  login(): void {
    this.loginError = '';

    if (this.email.invalid || this.password.invalid) {
      this.loginError = 'Kérlek, tölts ki minden mezőt érvényesen!';
      return;
    }

    const email = this.email.value;
    const pw = this.password.value;

    if (email === 'test@gmail.com' && pw === 'testpw') {
      this.isLoading = true;
      this.showLoginForm = false;

      localStorage.setItem('isLoggedIn', 'true');

      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 2500);
    } else {
      this.loginError = 'Helytelen email vagy jelszó!';
    }
  }
}
