import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../data-access/auth.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import {
  getAuth,
  RecaptchaVerifier
} from 'firebase/auth';

// Importa SweetAlert2
import Swal from 'sweetalert2';

// Interfaz para los datos del formulario (solo los valores, no los FormControls)
interface SignUpFormValue {
  email: string;
  password: string;
  nombre: string;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export default class SignUpComponent {

  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private auth = getAuth();

  constructor(private router: Router) {}

  captchaResuelto: boolean = false;
  recaptchaVerifier!: RecaptchaVerifier;

  // Tipamos el FormGroup con los tipos correctos
  form: FormGroup = this._formBuilder.group({
    email: this._formBuilder.control<string>('', [Validators.required, Validators.email]),
    nombre: this._formBuilder.control<string>('', [Validators.required]),
    password: this._formBuilder.control<string>('', Validators.required)
  });

  ngOnInit(): void {
    this.initRecaptcha();
  }

  initRecaptcha() {
    if (this.recaptchaVerifier) {
      this.recaptchaVerifier.clear();
    }

    this.recaptchaVerifier = new RecaptchaVerifier(
      this.auth, // ✅ auth primero
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

    if (!this.captchaResuelto) {
      Swal.fire({
        icon: 'warning',
        title: 'Captcha requerido',
        text: 'Por favor, resuelve el reCAPTCHA antes de continuar.'
      });
      return;
    }

    try {
      const { email, password, nombre } = this.form.value as SignUpFormValue;

      if (!email || !password || !nombre) {
        Swal.fire({
          icon: 'error',
          title: 'Campos vacíos',
          text: 'Por favor, completa todos los campos.'
        });
        return;
      }

      if (!email.trim() || !password.trim() || !nombre.trim()) {
        Swal.fire({
          icon: 'error',
          title: 'Campos vacíos',
          text: 'Por favor, completa todos los campos.'
        });
        return;
      }

      await this._authService.signUp({ email, password, nombre });
      Swal.fire({
        icon: 'success',
        title: 'Registro exitoso',
        text: 'Cuenta creada correctamente.',
        timer: 1500,
        showConfirmButton: false
      });
      this.router.navigate(['/home']);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al crear la cuenta. Intenta nuevamente.'
      });
    }
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
