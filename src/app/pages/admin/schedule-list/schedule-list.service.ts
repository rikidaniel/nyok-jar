import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, getDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleListService {
  private collectionName = 'schedules';

  constructor(private firestore: Firestore) {}

  // ✅ Create
  addSchedule(data: any): Promise<any> {
    const ref = collection(this.firestore, this.collectionName);
    return addDoc(ref, data);
  }

  // ✅ Read (All)
  getAllSchedule(): Observable<any[]> {
    const ref = collection(this.firestore, this.collectionName);
    return collectionData(ref, { idField: 'id' });
  }

  // ✅ Read (One)
  getScheduleById(id: string): Promise<any> {
    const docRef = doc(this.firestore, this.collectionName, id);
    return getDoc(docRef);
  }

  // ✅ Update
  updateSchedule(id: string, data: any): Promise<void> {
    const docRef = doc(this.firestore, this.collectionName, id);
    return updateDoc(docRef, data);
  }

  // ✅ Delete
  deleteSchedule(id: string): Promise<void> {
    const docRef = doc(this.firestore, this.collectionName, id);
    return deleteDoc(docRef);
  }
}
