import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ConstantDef } from '~/app/core/constantDef';
import { Service } from '~/app/core/services/services.service';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrl: './paper.component.scss',
})
export class PaperComponent {
  formGroup!: FormGroup;
  selectedTime: string = '0';
  quantity: any;
  revenueBefore: any;
  @Input() data: any;
  date: Date | undefined;
  stateOptions: any[] = [
    { label: 'Off', value: 'off' },
    { label: 'On', value: 'on' },
  ];
  constructor(private sevice: Service) {}
  ngOnInit() {
    this.getRevenue();
  }
  changeType() {
    this.getRevenue();
  }
  getRevenue() {
    const params = {
      dataType: this.data.type,
      timeType: this.selectedTime,
    };
    this.sevice.getRevenue(params).subscribe(
      (data: any) => {
        if (data.status == ConstantDef.STATUS_SUCCES) {
          this.quantity = data.response?.revenue;
          console.log('a', data.response.revenue_before);

          const percentGrowth =
            (this.quantity - data.response.revenue_before) /
            data.response.revenue_before;
          this.revenueBefore = percentGrowth;
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
