import { Component } from '@angular/core';
import { SidebarService } from '../../Services/sidebar.service';
import { ApiService } from '../../Services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  get active() {
    return this.sideBarService.active;
  }

  public close() {
    this.sideBarService.active = false;
  }

  public open() {
    this.sideBarService.active = true;
  }

  public handleSubmit() {
    // TODO: Clear input fields
    // TODO: Show success popup
    this.close();
  }

  public get iterableColumns() {
    return this.apiService.iterableColumns;
  }

  constructor (public sideBarService: SidebarService, public apiService: ApiService) {
    apiService.fetchColumns(["user", "adress"]);
  }
}
