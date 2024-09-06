import { Component } from '@angular/core';
import { SidebarService } from '../../Services/sidebar.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor (private sidebarService: SidebarService) { }

  public openSidebar() {
    this.sidebarService.active = true;
  }
}
