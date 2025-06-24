import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
  FormGroup
} from '@angular/forms';
import { AuthService } from '../../data-access/auth.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { ContraValidator } from '../../../src/validators/contra.validator';
import { CommonModule } from '@angular/common';

import {
  getAuth,
  RecaptchaVerifier
} from 'firebase/auth';

// Import SweetAlert2
import Swal from 'sweetalert2';

interface SignInFormValue {
  email: string;
  password: string;
}

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, NgIf, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export default class SignInComponent implements OnInit {

  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private auth = getAuth();

  form: FormGroup = this._formBuilder.group({
    email: this._formBuilder.control<string>('', [Validators.required, Validators.email]),
    nombre: this._formBuilder.control<string>('', [Validators.required]),
    password: this._formBuilder.control<string>('', [Validators.required, ContraValidator])
  });

  captchaResuelto: boolean = false;
  recaptchaVerifier!: RecaptchaVerifier;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initRecaptcha();
  }

  initRecaptcha() {
    if (this.recaptchaVerifier) {
      this.recaptchaVerifier.clear();
    }

    this.recaptchaVerifier = new RecaptchaVerifier(
      this.auth,
      'recaptcha-container',
      {
        size: 'normal',
        callback: (response: any) => {
          console.log('reCAPTCHA resuelto:', response);
          this.captchaResuelto = true;
        },
        'expired-callback': () => {
          console.warn('reCAPTCHA expirado');
          this.captchaResuelto = false;
          Swal.fire({
            icon: 'warning',
            title: 'reCAPTCHA expirado',
            text: 'El reCAPTCHA ha expirado, por favor complétalo nuevamente.',
          });
        }
      }
    );

    this.recaptchaVerifier.render().then((widgetId) => {
      console.log('reCAPTCHA renderizado con ID:', widgetId);
    });
  }

  async submit() {
    if (this.form.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Formulario inválido',
        text: 'Por favor, completa todos los campos correctamente.'
      });
      return;
    }

    const { email, password } = this.form.value as SignInFormValue;
    if (!email.trim() || !password.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Campos vacíos',
        text: 'Por favor, completa todos los campos.'
      });
      return;
    }

    if (!this.captchaResuelto) {
      Swal.fire({
        icon: 'warning',
        title: 'Captcha requerido',
        text: 'Por favor, completa el reCAPTCHA.'
      });
      return;
    }

    try {
      await this._authService.signIn({ email, password });
      Swal.fire({
        icon: 'success',
        title: '¡Bienvenido!',
        text: 'Inicio de sesión exitoso.',
        timer: 1500,
        showConfirmButton: false
      });
      this.router.navigate(['/home']);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error de autenticación',
        text: 'Credenciales incorrectas o error en autenticación.'
      });

      this.recaptchaVerifier.clear();
      this.initRecaptcha();
      this.captchaResuelto = false;

      await this._authService.incrementarIntentosPorEmail(email);
    }

    this.form.reset();
  }

  async conGoogle() {
    try {
      const result = await this._authService.signInWithGoogle();
      console.log('Usuario autenticado con Google:', result.user);
      Swal.fire({
        icon: 'success',
        title: 'Autenticación con Google exitosa',
        timer: 1500,
        showConfirmButton: false
      });
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error en autenticación con Google:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error en autenticación con Google.'
      });
    }
  }
}
