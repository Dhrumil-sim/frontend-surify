import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { GlobalLoaderComponent } from './shared/components/global-loader/global-loader.component';
import { SideBarComponent } from './components/user/dashboard/side-bar/side-bar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GlobalLoaderComponent, SideBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend-surify';
}
