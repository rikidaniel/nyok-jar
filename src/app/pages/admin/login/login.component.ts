import {Component, OnDestroy} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Auth, signInWithEmailAndPassword} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {showDialogError} from '../../../common/dialog/showDialogError';
import {AdminHomeComponent} from '../admin-home/admin-home.component';
import {UserRoleEnum} from '../../../enum/user-role.enum';
import {UserService} from './user.service';
import {InputGroup} from 'primeng/inputgroup';
import {InputGroupAddon} from 'primeng/inputgroupaddon';
import {NgClass} from '@angular/common';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {ConsultationListComponent} from '../consultation-list/consultation-list.component';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    InputGroup,
    InputGroupAddon,
    NgClass,
    InputText,
    Button
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy  {
  static readonly ROUTER = 'login';
  static readonly NAVIGATE = '/login';

  signInFormControl: FormGroup;
  passwordFieldType = 'password';

  subscriptions: Subscription[] = [];
  loading = false;
  submitted = false;
  isDisabled = true;
  ipAddress = '';

  constructor(
    private auth: Auth,
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    // Untuk testing / mock IP
    if (this.ipAddress) {
      this.isDisabled = false;
    }

    this.signInFormControl = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }


  onSubmit(value?: any): void {
    this.submitted = true;

    if (this.signInFormControl.invalid) {
      return;
    }

    this.loading = true;
    const { username, password } = this.signInFormControl.value;

    signInWithEmailAndPassword(this.auth, username, password)
      .then((userCredential) => {
        // Ambil data pengguna berdasarkan UID
        this.userService.getUserById(userCredential.user.uid).subscribe({
          next: (user) => {
            if (!user) {
              // Jika data pengguna tidak ditemukan
              this.loading = false;

              showDialogError('Data pengguna tidak ditemukan. Silakan coba lagi.');
              return;
            }

            // Arahkan berdasarkan peran pengguna
            if (user.role === UserRoleEnum.Admin) {
              this.router.navigate([AdminHomeComponent.ROUTER+ConsultationListComponent.NAVIGATE]).then(() => {
                this.loading = false;
              });
            }
            // else if (user.role === UserRoleEnum.User) {
            //   this.router.navigate([UserHomeComponent.ROUTER]).then(() => {
            //     this.loading = false;
            //   });
            // }
            else {
              // Jika peran tidak dikenali
              console.error('Peran pengguna tidak valid:', user.role);
              this.loading = false;
              showDialogError('Peran pengguna tidak valid. Silakan hubungi administrator.')
              // alert('Peran pengguna tidak valid. Silakan hubungi administrator.');
            }
          },
          error: (error) => {
            console.error('Gagal mengambil data pengguna:', error.message);
            this.loading = false;
            // showDialogError(error.message)
            showDialogError('Gagal mengambil data pengguna. Silakan coba lagi.');
          },
        });
      })
      .catch((error) => {
        console.error('Login error:', error.message);
        this.loading = false;
        // showDialogError(error.message)
        showDialogError('Login gagal. Periksa email dan kata sandi Anda.');
      });
  }

  togglePasswordVisibility(): void {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

}
