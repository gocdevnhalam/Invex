import { Component } from '@angular/core';
import { LoadingService } from './core/services/loading.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Client';
  private loadingSub!: Subscription;
  constructor(
    private spinner: NgxSpinnerService,
    private loadingService: LoadingService
  ) {}
  ngOnInit(): void {
    this.loadingSub = this.loadingService.isLoading.subscribe((loading) => {
      if (loading) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });
  }
  ngOnDestroy(): void {
    this.loadingSub.unsubscribe();
  }
}
