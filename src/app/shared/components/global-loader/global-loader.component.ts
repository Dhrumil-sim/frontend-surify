import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderService } from '../../../core/services/loader.service.ts.service';

@Component({
  selector: 'app-global-loader',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div class="global-loader-overlay" *ngIf="loaderService.globalLoading$ | async">
      <div class="loader-container">
        <mat-spinner diameter="50"></mat-spinner>
        <p>Loading...</p>
      </div>
    </div>
  `,
  styles: [
    `
      .global-loader-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        backdrop-filter: blur(2px);
      }

      .loader-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 16px;
        background: white;
        padding: 32px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      }

      .loader-container p {
        margin: 0;
        font-size: 16px;
        color: #333;
        font-weight: 500;
      }
    `,
  ],
})
export class GlobalLoaderComponent {
  constructor(public loaderService: LoaderService) {}
}
