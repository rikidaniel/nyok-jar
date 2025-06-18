import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {ConsultationListModel} from './consultation-list.model';

@Injectable({
  providedIn: 'root'
})
export class ConsultationListService {
  private collectionName = 'consultations';

  constructor(private firestore: Firestore) {}

  // ✅ Create
  addConsultation(data: any): Promise<any> {
    const ref = collection(this.firestore, this.collectionName);
    return addDoc(ref, data);
  }

  // ✅ Read (All)
  getAllConsultation(): Observable<any[]> {
    const ref = collection(this.firestore, this.collectionName);
    return collectionData(ref, { idField: 'id' });
  }

  // ✅ Read (One)
  getConsultationById(id: string): Promise<any> {
    const docRef = doc(this.firestore, this.collectionName, id);
    return getDoc(docRef);
  }

  // ✅ Update
  updateConsultation(id: string, data: any): Promise<void> {
    const docRef = doc(this.firestore, this.collectionName, id);
    return updateDoc(docRef, data);
  }

  // ✅ Delete
  deleteConsultation(id: string): Promise<void> {
    const docRef = doc(this.firestore, this.collectionName, id);
    return deleteDoc(docRef);
  }
}
