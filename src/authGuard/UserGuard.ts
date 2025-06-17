import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { onAuthStateChanged } from 'firebase/auth';
import {UserService} from '../app/components/admin/user-list/user.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(private router: Router, private auth: Auth, private userService: UserService) {}

  canActivate(
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable<boolean>((observer) => {
      onAuthStateChanged(this.auth, (currentUser) => {
        if (currentUser) {
          // Jika pengguna sudah login, periksa apakah mereka user biasa
          this.userService.getUserById(currentUser.uid).subscribe(user => {
            if (user.role === 'user') {
              observer.next(true);
            } else {
              // Jika bukan user, arahkan ke halaman "Not Authorized"
              this.router.navigate(['/not-authorized']);
              observer.next(false);
            }
            observer.complete();
          });
        } else {
          // Jika tidak ada pengguna yang login, arahkan ke halaman login
          this.router.navigate(['/login']);
          observer.next(false);
          observer.complete();
        }
      });
    });
  }
}
