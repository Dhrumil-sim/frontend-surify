import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { SideBarComponent } from '../../../components/user/dashboard/side-bar/side-bar.component';
import { UserHeaderComponent } from '../../../shared/components/user-header/user-header.component';

@Component({
  selector: 'app-user-home-page',
  imports: [RouterOutlet, SideBarComponent, UserHeaderComponent],
  templateUrl: './user-home-page.component.html',
  styleUrl: './user-home-page.component.css',
})
export class UserHomePageComponent {
  constructor(private router: Router) {}
  openSideBar() {
    this.router.navigate(['user-dashboard/side-bar']);
  }
}
