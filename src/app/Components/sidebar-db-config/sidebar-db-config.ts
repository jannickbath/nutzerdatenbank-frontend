import { Component } from '@angular/core';
import { SidebarService } from '../../Services/sidebar.service';

@Component({
  selector: 'app-sidebar-db-config',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-db-config.html',
  styleUrl: './sidebar-db-config.scss'
})
export class SidebarDbConfigComponent {
  constructor(public sidebarService: SidebarService) { }

  public get active() {
    return this.sidebarService.dbConfigSidebarActive;
  }

  public close() {
    this.sidebarService.dbConfigSidebarActive = false;
  }

  public fetchTables() {
    
  }
}
