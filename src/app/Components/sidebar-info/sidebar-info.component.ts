import { Component } from '@angular/core';
import { SidebarService } from '../../Services/sidebar.service';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../Services/api.service';

type UserField = "first_name" | "last_name" | "username" | "email" | "street" | "plz" | "city" | "personnel_number" | "personio_number";

@Component({
  selector: 'app-sidebar-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-info.component.html',
  styleUrl: './sidebar-info.component.scss'
})
export class SidebarInfoComponent {
  public get active (): boolean {
    if (this.sideBarService.userDetails.length > 0) {
      return true;
    }else {
      return false;
    }
  }

  public get personioLink() {
    return `https://ferdinand-schultz-nachfolger.personio.de/staff/details/${this.getField("personio_number")}`;
  }

  public close() {
    this.sideBarService.userDetails = [];
    this.sideBarService.activeDetailsUserId = null;
  }

  public getField(field: UserField) {
    if (this.sideBarService.userDetails.length > 0) {
      return this.sideBarService.userDetails[0][field];
    }
    return "";
  }

  public handleSubmit() {
    // Give the server some time for the form to be processed, before updating the user list
    setTimeout(() => {
      this.apiService.fetchUsers();
    }, 1000);
  }

  constructor (public sideBarService: SidebarService, private apiService: ApiService) { }
}
