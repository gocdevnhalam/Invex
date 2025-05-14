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
  limit: number = 20;
  constructor(private service: Service) {}
  ngOnInit() {
    let params: any = {};
    params.limit = this.limit;
    this.service.getAllOrderItem(params).subscribe(
      (data: any) => {
        if (data.status == ConstantDef.STATUS_SUCCES) {
          this.products = this.convertImg(data.response);
          console.log(this.products);
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  convertImg(data: any) {
    const obj: any = data;
    obj.map((item: any) => {
      if (item.hasOwnProperty('image') && item.image) {
        item.image = 'https://res.cloudinary.com/dwrv7tedn/' + item.image;
      }
    });
    return obj;
  }
}
