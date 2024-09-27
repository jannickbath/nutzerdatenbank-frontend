import { Component } from '@angular/core';
import { SidebarService } from '../../Services/sidebar.service';
import { ApiService } from '../../Services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar-db-config',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar-db-config.html',
  styleUrl: './sidebar-db-config.scss'
})
export class SidebarDbConfigComponent {
  constructor(public sidebarService: SidebarService, private apiService: ApiService) { }

  public addColumn: boolean = false;
  public addColumnName: string = "";
  public addColumnType: string = "";
  public activeTableName: string = "";

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

  public handleAddColumn() {
    const url = `http://nutzerdatenbank-backend.loc/db/add-column?columnName=${this.addColumnName}&columnType=${this.addColumnType}&tableName=${this.activeTableName}`;
    
    fetch(url)
      .then(res => res.json())
      .then((json) => {
        console.log(json);
      });
    
      setTimeout(() => {
        this.apiService.fetchColumns([this.activeTableName]);
      }, 200);
  }

  public handleDeleteColumn() {
    const url = `http://nutzerdatenbank-backend.loc/db/delete-column?columnName=${this.addColumnName}&tableName=${this.activeTableName}`;
    
    fetch(url)
      .then(res => res.json())
      .then((json) => {
        console.log(json);
      });
  }

  public handleSelect(event: Event) {
    // Get the selected value
    const tableName = (event.target as HTMLSelectElement).value;
    this.activeTableName = tableName;
    this.apiService.fetchColumns([tableName]);
  }
}
