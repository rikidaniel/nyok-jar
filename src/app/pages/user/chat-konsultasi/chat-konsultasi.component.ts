import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgClass} from '@angular/common';
import {showDialogSuccess} from '../../../common/dialog/showDialogSuccess';
import {showDialogError} from '../../../common/dialog/showDialogError';
import {Button} from 'primeng/button';
import {ConsultationListService} from '../../admin/consultation-list/consultation-list.service';
import {ScheduleListService} from '../../admin/schedule-list/schedule-list.service';

@Component({
  selector: 'app-chat-konsultasi',
  imports: [
    ReactiveFormsModule,
    NgClass,
    Button
  ],
  templateUrl: './chat-konsultasi.component.html',
  styleUrl: './chat-konsultasi.component.css'
})
export class ChatKonsultasiComponent {
  static readonly ROUTER = 'chat-konsultasi';
  static readonly NAVIGATE = '/navigation/chat-konsultasi';

  consultationForm: FormGroup;
  scheduleForm: FormGroup;
  submittedConsultation = false;
  submittedSchedule = false;

  constructor(
    private fb: FormBuilder,
    private consultationService: ConsultationListService,
    private scheduleService: ScheduleListService
  ) {

    this.consultationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      needs: ['', Validators.required]
    });

    this.scheduleForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  submitConsultation() {
    this.submittedConsultation = true;
    if (this.consultationForm.invalid) return;

    this.consultationService.addConsultation(this.consultationForm.value)
      .then(() => {
        showDialogSuccess()
        this.consultationForm.reset();
        this.submittedConsultation = false;
      })
      .catch(() => showDialogError('Gagal kirim pesan.'));
  }

  submitSchedule() {
    this.submittedSchedule = true;
    if (this.scheduleForm.invalid) return;

    this.scheduleService.addSchedule(this.scheduleForm.value)
      .then(() => {
        showDialogSuccess()
        this.scheduleForm.reset();
        this.submittedSchedule = false;
      })
      .catch(() => showDialogError('Gagal ajukan jadwal.'));
  }

}
