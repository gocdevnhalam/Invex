import { NgModule } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TableComponent } from './component/table/table.component';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { CurrencyPipe } from '@angular/common';
@NgModule({
  declarations: [TableComponent],
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    CurrencyPipe,
    RippleModule,
  ],
  exports: [TableComponent],
})
export class SharedModuleApp {}
