import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { User } from '../../Entities/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public isPasswordVisible: boolean = false;

  loginForm: FormGroup;
  loginError: string = '';
  signupForm: FormGroup;
  signupError: string = '';
  currentUser!: User;

  constructor(private router: Router, private fb: FormBuilder, private auth: AuthService) {
    this.loginForm = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      motDePasse: ['']
    });

    this.signupForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      numCin: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8), this.cinValidator]],
      dateDeNaissance: ['', Validators.required],
      paysDeNaissance: ['', Validators.required],
      nationalite: ['', Validators.required],
      adress: ['', Validators.required],
      codePostal: ['', Validators.required],
      contact: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      motDePasse: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  private cinValidator(control: AbstractControl): { [key: string]: any } | null {
    const valid = /^\d{8}$/.test(control.value);
    return valid ? null : { invalidCin: true };
  }
  isLoginFormActive: boolean = true; // Set the default form (Login or Signup)

  toggleForms(isLogin: boolean) {
    this.isLoginFormActive = isLogin;
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  signupSubmit() {
    if (this.signupForm.valid) {
      this.signupError = '';

      this.auth.signup(this.signupForm.value).subscribe({
        next: () => {
          this.isLoginFormActive = true;
        },
        error: () => {
          this.signupError = "Erreur d'authentification";
        },
      });
    } else {
      this.signupError = 'Please enter valid credentials';
    }
  }

  loginSubmit() {
    const emailControl = this.loginForm.get('mail');
    const motDePasseControl = this.loginForm.get('motDePasse');

    if (emailControl?.valid && motDePasseControl?.valid) {
      this.loginError = '';

      const credentials = {
        mail: emailControl.value,
        motDePasse: motDePasseControl.value
      };

      this.auth.login(credentials).subscribe({
        next: (result) => {
          this.auth.setToken(result.access_token);
          this.router.navigate(['/dashboard']); // Redirect after successful login
        },
        error: () => {
          this.loginError = "Erreur d'authentification";
        },
      });
    } else {
      this.loginError = 'Please enter valid credentials';
    }
  }
}
