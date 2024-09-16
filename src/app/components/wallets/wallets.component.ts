import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { WalletDTO } from '../../model/wallet.model';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { FormsModule } from '@angular/forms';
import { generateId } from '../../utils/utils';

@Component({
  selector: 'app-wallets',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent, ModalComponent],
  templateUrl: './wallets.component.html',
  styleUrl: './wallets.component.css',
})
export class WalletsComponent {
  @Input() walletList!: WalletDTO[];
  @Output() newWalletList = new EventEmitter<WalletDTO[]>();
  newWallet: WalletDTO = { id: '', name: '', balance: 0, type: 'account' };
  showModal: boolean = false;
  isEdit: boolean = false;

  openModal(wallet?: WalletDTO): void {
    if (wallet) {
      this.isEdit = true;
      this.setNewWallet(wallet);
    }

    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.resetNewWallet();
  }

  resetNewWallet(): void {
    this.isEdit = false;
    this.newWallet = { id: '', name: '', balance: 0, type: 'account' };
  }

  saveWallet(isEdit ?: boolean): void {

    if (isEdit) {
      // Modifica wallet
      this.walletList = this.walletList.map(wallet => wallet.id == this.newWallet.id ? this.newWallet : wallet);
    } else {
      // Salva wallet
      this.walletList.push({...this.newWallet, id: generateId()});
    }

    this.newWalletList.emit(this.walletList);
    this.resetNewWallet();
    this.showModal = false;
  }

  deleteWallet() {
    this.walletList = this.walletList.filter(wallet => wallet.id != this.newWallet.id);
    this.newWalletList.emit(this.walletList);
    this.resetNewWallet();
    this.showModal = false;
  }

  getIcon(type?: string): string {
    switch (type) {
      case 'account':
        return 'fa-solid fa-wallet fa-xl';
      case 'cash':
        return 'fa-solid fa-money-bill fa-xl';
      case 'savings':
        return 'fa-solid fa-piggy-bank fa-xl';
      default:
        return 'fa-solid fa-plus fa-xl';
    }
  }

  setNewWallet(wallet: WalletDTO): void {
    this.newWallet = wallet;
  }  
}
