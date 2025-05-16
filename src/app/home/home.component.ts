import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  isShowSideBar: boolean = false;
  price: number = 5000000;
  percentGrowth: number = 0.52;
  data: any;
  dataPaper: any[] = [
    {
      title: 'Doanh thu',
      quantity: 500,
      unit: 'sản phẩm',
      percentGrowth: 0.5,
      type: 'ngày hôm qua',
      class: 'pi pi-dollar revenue',
    },
    {
      title: 'Lượng hàng bán',
      quantity: 500,
      unit: 'sản phẩm',
      percentGrowth: 0.5,
      type: 'ngày hôm qua',
      class: 'pi pi-check-circle',
    },
    {
      title: 'Lượng tồn kho',
      quantity: 500,
      unit: 'sản phẩm',
      percentGrowth: 0.5,
      type: 'ngày hôm qua',
      class: 'pi pi-cart-minus',
    },
    {
      title: 'Tồn kho cần xử lý',
      quantity: 500,
      unit: 'sản phẩm',
      percentGrowth: 0.5,
      type: 'ngày hôm qua',
      class: 'pi pi-ban',
      color: 'red',
    },
  ];
  options: any;
  handleData(data: any) {
    this.isShowSideBar = data;
  }
  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue(
      '--text-color-secondary'
    );
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12',
      ],
      datasets: [
        {
          label: 'Hàng bán',
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          yAxisID: 'y',
          tension: 0.4,
          data: [65, 59, 80, 81, 56, 55, 10, 65, 59, 80, 81, 56, 55, 10],
        },
        {
          label: 'Hàng tồn',
          fill: false,
          borderColor: documentStyle.getPropertyValue('--green-500'),
          yAxisID: 'y1',
          tension: 0.4,
          data: [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27, 190],
        },
      ],
    };

    this.options = {
      stacked: false,
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y1: {
          type: 'linear',
          display: true,
          position: 'right',
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            drawOnChartArea: false,
            color: surfaceBorder,
          },
        },
      },
    };
  }
}
