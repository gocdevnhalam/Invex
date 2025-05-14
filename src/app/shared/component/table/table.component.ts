import { Component } from '@angular/core';
import { ConstantDef } from '~/app/core/constantDef';
import { Service } from '~/app/core/services/services.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  products: any[] = [];
  constructor(private service: Service) {}
  ngOnInit() {
    this.service.getProductApi().subscribe(
      (data: any) => {
        if (data.status == ConstantDef.STATUS_SUCCES) {
          console.log(data);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
