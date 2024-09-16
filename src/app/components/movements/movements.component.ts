import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MovementDTO } from '../../model/movement.model';

@Component({
  selector: 'app-movements',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movements.component.html',
  styleUrl: './movements.component.css'
})
export class MovementsComponent {

  @Input() movementList!: MovementDTO[];
  
  // Aggiorna Movimento
  //@Output() updateMovementList = new EventEmitter<MovementDTO[]>();

}
