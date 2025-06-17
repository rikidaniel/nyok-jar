import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  getDocs,
  getDoc,
  serverTimestamp,
  DocumentReference,
  CollectionReference, collectionData,
} from '@angular/fire/firestore';
import {
  Auth, authState,
  createUserWithEmailAndPassword,
  deleteUser as authDeleteUser,
} from '@angular/fire/auth';
import {Observable, from, throwError, of} from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { User } from './user.model';
import { UserRoleEnum } from '../../../enum/user-role.enum';
import { Timestamp } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly userCollection: CollectionReference<User>;

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {
    this.userCollection = collection(this.firestore, 'users') as CollectionReference<User>;
  }

  // Mendapatkan semua pengguna berdasarkan peran
  getUsers(role?: UserRoleEnum): Observable<User[]> {
    const q = role
      ? query(this.userCollection, where('role', '==', role))
      : this.userCollection;

    return from(getDocs(q)).pipe(
      map((snapshot) =>
        snapshot.docs.map((docSnap) => ({
          ...docSnap.data(),
          uid: docSnap.id,
        } as User))
      ),
      catchError((error) => throwError(() => new Error(error.message)))
    );
  }

  // Mendapatkan pengguna berdasarkan ID
  getUserById(uid: string): Observable<User> {
    if (!uid) {
      return throwError(() => new Error('UID tidak valid.'));
    }

    const userDocRef = doc(this.firestore, `users/${uid}`) as DocumentReference<User>;

    return from(getDoc(userDocRef)).pipe(
      map((docSnap) => {
        if (!docSnap.exists()) {
          throw new Error(`Pengguna dengan UID ${uid} tidak ditemukan.`);
        }
        return {
          ...docSnap.data(),
          uid: docSnap.id,
        } as User;
      }),
      catchError((error) =>
        throwError(() => new Error(`Gagal mengambil pengguna: ${error.message}`))
      )
    );
  }

  getCurrentUser(): Observable<User | null> {
    return authState(this.auth).pipe(
      switchMap(user => {
        if (!user) return of(null);
        return this.getUserById(user.uid);
      }),
      catchError(error => throwError(() => new Error(error.message)))
    );
  }

  // Membuat pengguna baru dengan autentikasi
  createUserWithAuth(
    email: string,
    password: string,
    userData: Omit<User, 'uid' | 'email' | 'registrationDate' | 'createdAt' | 'updatedAt'>
  ): Observable<void> {
    if (!email || !password) {
      return throwError(() => new Error('Email dan kata sandi harus diisi.'));
    }

    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap((userCredential) => {
        const uid = userCredential.user.uid;
        const finalUser: User = {
          ...userData,
          uid,
          email,
          registrationDate: serverTimestamp() as Timestamp,
          createdAt: serverTimestamp() as Timestamp,
          updatedAt: serverTimestamp() as Timestamp,
        };
        const userDocRef = doc(this.firestore, `users/${uid}`) as DocumentReference<User>;
        return from(setDoc(userDocRef, finalUser));
      }),
      catchError((error) => throwError(() => new Error(error.message)))
    );
  }

  // Memperbarui data pengguna
  updateUser(uid: string, data: Partial<Omit<User, 'uid' | 'createdAt'>>): Observable<void> {
    if (!uid) {
      return throwError(() => new Error('UID tidak valid.'));
    }
    if (!data || Object.keys(data).length === 0) {
      return throwError(() => new Error('Tidak ada data untuk diperbarui.'));
    }

    const userDocRef = doc(this.firestore, `users/${uid}`) as DocumentReference<User>;

    return from(
      updateDoc(userDocRef, {
        ...data,
        updatedAt: serverTimestamp(),
      })
    ).pipe(
      catchError((error) => throwError(() => new Error(error.message)))
    );
  }

  // Menghapus akun pengguna yang sedang login
  deleteMyAccount(): Observable<void> {
    const currentUser = this.auth.currentUser;

    if (!currentUser) {
      return throwError(() => new Error('Tidak ada pengguna yang sedang login.'));
    }

    const uid = currentUser.uid;
    const userDocRef = doc(this.firestore, `users/${uid}`) as DocumentReference<User>;

    return from(
      deleteDoc(userDocRef).then(() => authDeleteUser(currentUser))
    ).pipe(
      catchError((error) => throwError(() => new Error(error.message)))
    );
  }




  getAllRegistrationDates(): Observable<{ id: string, registrationDate: Timestamp }[]> {
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('role', '==', 'user'));

    return collectionData(q, { idField: 'id' }).pipe(
      map(users => users.map(user => ({
        id: user['id'],
        registrationDate: user['registrationDate']
      })))
    );
  }
}
