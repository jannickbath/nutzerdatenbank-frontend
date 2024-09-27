import { Component } from '@angular/core';
import { SidebarService } from '../../Services/sidebar.service';
import { ApiService } from '../../Services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar-db-config',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-db-config.html',
  styleUrl: './sidebar-db-config.scss'
})
export class SidebarDbConfigComponent {
  constructor(public sidebarService: SidebarService, private apiService: ApiService) { }

  public get active() {
    return this.sidebarService.dbConfigSidebarActive;
  }

  public get tables() {
    return this.apiService.tables;
  }

  public get columnNames() {
    return Object.keys(this.apiService.columns);
  }

  public get columns() {
    return this.apiService.columns;
  }

  public close() {
    this.sidebarService.dbConfigSidebarActive = false;
  }

  public handleSelect(event: Event) {
    // Get the selected value
    const tableName = (event.target as HTMLSelectElement).value;
    this.apiService.fetchColumns([tableName]);
  }
}
