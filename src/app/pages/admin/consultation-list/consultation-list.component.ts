import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConsultationListService} from './consultation-list.service';
import {Timestamp} from 'firebase/firestore';
import {TableModule} from 'primeng/table';
import {Button} from 'primeng/button';
import Swal from 'sweetalert2';
import {ConsultationListModel} from './consultation-list.model';
import {
  showCancelledMessage,
  showDeleteConfirmation,
  showDeletedMessage
} from '../../../common/dialog/showDeleteConfirmation';
import {showDialogError} from '../../../common/dialog/showDialogError';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputText} from 'primeng/inputtext';

@Component({
  selector: 'app-consultation-list',
  imports: [
    TableModule,
    Button,
    IconField,
    InputIcon,
    InputText
  ],
  templateUrl: './consultation-list.component.html',
  styleUrl: './consultation-list.component.css'
})
export class ConsultationListComponent implements OnInit {
  static readonly ROUTER = 'consultation-list';
  static readonly NAVIGATE = '/consultation-list';
  static readonly TITLE = 'Consultation List';


  consultationForm!: FormGroup;
  consultationList: any[] = [];
  editingId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private consultationService: ConsultationListService
  ) {
    this.consultationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    this.getAllData();
  }


  search(target: EventTarget | null): HTMLInputElement {
    return target as HTMLInputElement;
  }
  // ✅ Submit (Create or Update)
  onSubmit(): void {
    if (this.consultationForm.invalid) return;

    const formData = {
      ...this.consultationForm.value,
      createdAt: Timestamp.now()
    };

    if (this.editingId) {
      // Update
      this.consultationService.updateConsultation(this.editingId, formData)
        .then(() => {
          this.resetForm();
        });
    } else {
      // Create
      this.consultationService.addConsultation(formData)
        .then(() => {
          this.resetForm();
        });
    }
  }

  // ✅ Get All Data
  getAllData(): void {
    this.consultationService.getAllConsultation().subscribe(data => {
      this.consultationList = data;
    });
  }

  // ✅ Edit (Populate form)
  edit(data: any): void {
    this.consultationForm.patchValue({
      name: data.name,
      email: data.email,
      message: data.message
    });
    this.editingId = data.id;
  }

  // ✅ Delete
  confirmAndDelete(data: ConsultationListModel): void {
    showDeleteConfirmation(data.name).then((result) => {
      if (result.isConfirmed) {
        this.consultationService.deleteConsultation(data.id)
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
  resetForm(): void {
    this.consultationForm.reset();
    this.editingId = null;
  }

}
