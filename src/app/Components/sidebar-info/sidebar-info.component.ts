import { Component } from '@angular/core';
import { SidebarService } from '../../Services/sidebar.service';
import { CommonModule } from '@angular/common';
import { User } from '../../Types';

type UserField = "first_name" | "last_name" | "username" | "email" | "street" | "plz" | "city" | "personnel_number";

@Component({
  selector: 'app-sidebar-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-info.component.html',
  styleUrl: './sidebar-info.component.scss'
})
export class SidebarInfoComponent {
  // public get userDetails() {
  //   if (this.sideBarService.userDetails.length > 0) {
  //     console.log(this.sideBarService.userDetails[0]);
  //     return this.sideBarService.userDetails[0];
  //   }

  //   return [];
  // }

  // public get first_name() {
  //   return this.sideBarService.userDetails[0].first_name;
  // }

  public get active (): boolean {
    if (this.sideBarService.userDetails.length > 0) {
      return true;
    }else {
      return false;
    }
  }

  public close() {
    this.sideBarService.userDetails = [];
  }

  public getField(field: UserField) {
    if (this.sideBarService.userDetails.length > 0) {
      return this.sideBarService.userDetails[0][field];
    }
    return "";
  }

  constructor (public sideBarService: SidebarService) { }
}
