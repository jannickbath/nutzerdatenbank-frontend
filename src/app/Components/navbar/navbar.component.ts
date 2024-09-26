import { Component } from '@angular/core';
import { SidebarService } from '../../Services/sidebar.service';
import { ApiService } from '../../Services/api.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor (private sidebarService: SidebarService, private apiService: ApiService) { }

  public openSidebar() {
    this.sidebarService.active = true;
  }

  public openDbConfig() {
    this.sidebarService.dbConfigSidebarActive = true;
    this.apiService.fetchTables();
  }
}
