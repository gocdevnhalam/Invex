import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrl: './paper.component.scss',
})
export class PaperComponent {
  @Input() data: any;
  date: Date | undefined;

  ngOnInit() {
    this.date = new Date();
  }
}
