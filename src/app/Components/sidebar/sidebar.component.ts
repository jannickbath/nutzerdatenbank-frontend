import { Component } from '@angular/core';
import { SidebarService } from '../../Services/sidebar.service';
import { ApiService } from '../../Services/api.service';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  public environment = environment;
  // labelname, grid-span
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

  get active() {
    return this.sideBarService.active;
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

  public close() {
    this.sideBarService.active = false;
  }

  public handleSubmit() {
    // TODO: Clear input fields
    // TODO: Show success popup
    this.close();
  }

  public get iterableColumns() {
    return this.apiService.iterableColumns;
  }

  constructor (public sideBarService: SidebarService, public apiService: ApiService) { }
}
