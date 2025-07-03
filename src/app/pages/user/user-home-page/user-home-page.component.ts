import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-home-page',
  imports: [RouterOutlet],
  templateUrl: './user-home-page.component.html',
  styleUrl: './user-home-page.component.css',
})
export class UserHomePageComponent {
  constructor(private router: Router) {}
  openSideBar() {
    this.router.navigate(['user-dashboard/side-bar']);
  }
}
