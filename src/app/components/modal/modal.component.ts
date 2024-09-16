import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  @Input() modalTitle!: string;
  @Output() closeModalOutput = new EventEmitter<any>();

  closeModal() {
    this.closeModalOutput.emit();
  }

}
