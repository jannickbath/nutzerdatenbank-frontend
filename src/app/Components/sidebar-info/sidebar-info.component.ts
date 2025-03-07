import { Component } from '@angular/core';
import { SidebarService } from '../../Services/sidebar.service';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../Services/api.service';
import { environment } from '../../../environments/environment';

type UserField = "first_name" | "last_name" | "username" | "email" | "street" | "plz" | "city" | "personnel_number" | "personio_number";

@Component({
  selector: 'app-sidebar-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-info.component.html',
  styleUrl: './sidebar-info.component.scss'
})
export class SidebarInfoComponent {
  private _inputLabels = {
    first_name: ["Vorname", 2],
    last_name: ["Nachname", 2],
    email: ["E-Mail", 2],
    description: ["Job-Beschreibung (Position)", 2],
    password: ["Passwort", 2],
    username: ["Nutzername", 2],
    personnel_number: ["Personalnummer", 2],
    personio_number: ["Personio-Nummer", 2],
    plz: ["PLZ", 2],
    street: ["Straße und Hausnummer", 4],
    city: ["Ort", 2]
  }

  public environment = environment;

  public get active (): boolean {
    if (this.sideBarService.userDetails.length > 0) {
      return true;
    }else {
      return false;
    }
  }

  public get personioLink() {
    return `https://ferdinand-schultz-nachfolger.personio.de/staff/details/${this.getField
    ("personio_number")}`;
  }

  public get iterableColumns() {
    return this.apiService.iterableColumns;
  }

  public get personio_number() {
    return this.getField("personio_number") as string ?? "";
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

  public getLabel(fieldName: string) {
    let label: string = fieldName;

    // @ts-ignore
    if (this._inputLabels[fieldName]) {
      //  @ts-ignore
      label = this._inputLabels[fieldName][0];
    }

    return label;
  }

  public getGridSpanClass(fieldName: string): string {
    let gridSpan: number = 2;

    // @ts-ignore
    if (this._inputLabels[fieldName]) {
      // @ts-ignore
      gridSpan = this._inputLabels[fieldName][1];
    }
    return "w-" + gridSpan;
  }

  // public getColumnValue(fieldName: string): string {
  //   // @ts-ignore
  //   return this.sideBarService.userDetails[0][fieldName] ?? "";
  // }

  constructor (public sideBarService: SidebarService, private apiService: ApiService) { }
}
