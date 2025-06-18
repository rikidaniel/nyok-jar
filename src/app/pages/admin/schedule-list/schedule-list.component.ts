import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConsultationListService} from '../consultation-list/consultation-list.service';
import {Timestamp} from 'firebase/firestore';
import {ConsultationListModel} from '../consultation-list/consultation-list.model';
import {
  showCancelledMessage,
  showDeleteConfirmation,
  showDeletedMessage
} from '../../../common/dialog/showDeleteConfirmation';
import {showDialogError} from '../../../common/dialog/showDialogError';
import Swal from 'sweetalert2';
import {ScheduleListModel} from './schedule-list.model';
import {ScheduleListService} from './schedule-list.service';
import {Button} from 'primeng/button';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';
import {PrimeTemplate} from 'primeng/api';
import {TableModule} from 'primeng/table';

@Component({
  selector: 'app-schedule-list',
  imports: [
    Button,
    IconField,
    InputIcon,
    InputText,
    PrimeTemplate,
    TableModule
  ],
  templateUrl: './schedule-list.component.html',
  styleUrl: './schedule-list.component.css'
})
export class ScheduleListComponent implements OnInit{
  static readonly ROUTER = 'schedule-list';
  static readonly NAVIGATE = '/schedule-list';
  static readonly TITLE = 'Schedule List';


  // scheduleForm!: FormGroup;
  scheduleList: any[] = [];
  editingId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private scheduleService: ScheduleListService
  ) {
    // this.scheduleForm = this.fb.group({
    //   name: ['', Validators.required],
    //   email: ['', [Validators.required, Validators.email]],
    //   message: ['', Validators.required]
    // });
  }

  ngOnInit(): void {

    this.getAllData();
  }


  search(target: EventTarget | null): HTMLInputElement {
    return target as HTMLInputElement;
  }
  // ✅ Submit (Create or Update)
  // onSubmit(): void {
  //   if (this.scheduleForm.invalid) return;
  //
  //   const formData = {
  //     ...this.scheduleForm.value,
  //     createdAt: Timestamp.now()
  //   };
  //
  //   if (this.editingId) {
  //     // Update
  //     this.scheduleService.updateSchedule(this.editingId, formData)
  //       .then(() => {
  //         this.resetForm();
  //       });
  //   } else {
  //     // Create
  //     this.scheduleService.addSchedule(formData)
  //       .then(() => {
  //         this.resetForm();
  //       });
  //   }
  // }

  // ✅ Get All Data
  getAllData(): void {
    this.scheduleService.getAllSchedule().subscribe(data => {
      this.scheduleList = data;
    });
  }

  // ✅ Edit (Populate form)
  // edit(data: any): void {
  //   this.scheduleForm.patchValue({
  //     name: data.name,
  //     email: data.email,
  //     message: data.message
  //   });
  //   this.editingId = data.id;
  // }

  // ✅ Delete
  confirmAndDelete(data: ScheduleListModel): void {
    showDeleteConfirmation(data.name).then((result) => {
      if (result.isConfirmed) {
        this.scheduleService.deleteSchedule(data.id)
          .then(() => {
            showDeletedMessage();
            this.getAllData();
          })
          .catch((error) => {
            console.error('Error deleting data:', error);
            showDialogError(error);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        showCancelledMessage();
      }
    });
  }


  // ✅ Reset form
  // resetForm(): void {
  //   this.scheduleForm.reset();
  //   this.editingId = null;
  // }

}
