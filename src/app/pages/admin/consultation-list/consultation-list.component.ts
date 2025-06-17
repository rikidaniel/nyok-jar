import { Component } from '@angular/core';

@Component({
  selector: 'app-consultation-list',
  imports: [],
  templateUrl: './consultation-list.component.html',
  styleUrl: './consultation-list.component.css'
})
export class ConsultationListComponent {
  static readonly ROUTER = 'consultation-list';
  static readonly NAVIGATE = '/consultation-list';
  static readonly TITLE = 'Consultation List';

}
