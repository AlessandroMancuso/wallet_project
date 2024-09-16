import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() cardType : string = "default";
  @Input() cardTitle !: string;
  @Input() subTitle ?: string | number;
  @Input() cardIcon ?: string;
  
  @Output() cardClickOutput = new EventEmitter<any>();

  cssClass: string = "card ";

  ngOnInit() {
    this.cssClass += this.cardType;
  }

  cardClick() : void {
    this.cardClickOutput.emit();
  }

}
