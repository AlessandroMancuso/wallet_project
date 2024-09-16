import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { WalletsComponent } from '../wallets/wallets.component';
import { SpesaComponent } from '../spesa/spesa.component';
import { HeaderComponent } from '../header/header.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MovementsComponent } from '../movements/movements.component';
import { NgChartsModule } from 'ng2-charts';
import { ModalComponent } from '../modal/modal.component';
import { WalletDTO } from '../../model/wallet.model';
import { MovementDTO } from '../../model/movement.model';
import { FormsModule } from '@angular/forms';
import { generateId } from '../../utils/utils';
import { ChartData } from '../../model/chartData.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeaderComponent,
    WalletsComponent,
    SpesaComponent,
    MovementsComponent,
    NgChartsModule,
    ModalComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  public isBrowser: boolean = false;
  showModalMovement: boolean = false;

  walletList: WalletDTO[] = [];
  walletOptions: { id: string; name: string }[] = [];

  movementChartData: ChartData[] = [];
  movementList: MovementDTO[] = [];
  newMovement: MovementDTO = {
    id: '',
    name: '',
    import: 0,
    walletId: '',
    walletName: '',
  };

  public pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  pieChartData: any;
  public pieChartType: any = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.setChartData();
  }

  setChartData(): void {
    this.movementChartData = this.groupByWalletName(this.movementList);

    this.pieChartData = {
      labels: this.movementChartData.map((item) => item.walletName),
      datasets: [
        {
          data: this.movementChartData.map((item) => item.importTotal),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    };
  }

  updateWalletList(newWalletList: WalletDTO[]): void {
    this.walletList = newWalletList;
    this.walletOptions = this.walletList?.map((wallet) => ({
      id: wallet.id,
      name: wallet.name,
    }));
  }

  updateWallet(walletId: string, expense: number): void {
    this.walletList = this.walletList.map((wallet) =>
      wallet.id == walletId
        ? ({ ...wallet, balance: wallet.balance - expense })
        : wallet
    );
  }

  saveMovement(isEdit: boolean = false): void {
    if (isEdit) {
      // Modifica wallet
      this.movementList = this.movementList.map((wallet) =>
        wallet.id == this.newMovement.id ? this.newMovement : wallet
      );
    } else {
      // Salva wallet
      this.movementList.unshift({ ...this.newMovement, id: generateId() });
    }

    this.updateWallet(this.newMovement.walletId, this.newMovement.import);
    this.setChartData();
    this.resetNewMovement();
    this.closeModal();
  }

  resetNewMovement(): void {
    this.newMovement = {
      id: '',
      name: '',
      import: 0,
      walletId: '',
      walletName: '',
    };
  }

  updateWalletSelect(walletId: string): void {
    this.newMovement.walletId = walletId;
    this.newMovement.walletName = this.walletOptions.find(
      (wallet) => wallet.id == walletId
    )?.name;
  }

  openModal(): void {
    this.showModalMovement = true;
  }

  closeModal(): void {
    this.showModalMovement = false;
  }

  groupByWalletName(movementList: MovementDTO[]): ChartData[] {
    const result = movementList.reduce((acc, current) => {
      // Find if walletName already exists in accumulator
      const existingWallet = acc.find(
        (item) => item.walletName === current.walletName
      );

      if (existingWallet) {
        // If it exists, add the current import to the existing importTotal
        existingWallet.importTotal += current.import;
      } else {
        // If it does not exist, add a new entry to the accumulator
        acc.push({
          walletName: current.walletName || 'Unknown', // Handle cases where walletName may be undefined
          importTotal: current.import,
        });
      }
      return acc;
    }, [] as ChartData[]);

    return result;
  }
}
