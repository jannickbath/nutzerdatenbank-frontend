import { Component } from '@angular/core';
import { SidebarService } from '../../Services/sidebar.service';
import { ApiService } from '../../Services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-sidebar-db-config',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar-db-config.html',
  styleUrl: './sidebar-db-config.scss'
})
export class SidebarDbConfigComponent {
  constructor(public sidebarService: SidebarService, private apiService: ApiService) { }

  public environment = environment;
  public addColumn: boolean = false;
  public addColumnName: string = "";
  public addColumnType: string = "";
  public activeTableName: string = "";
  private token = localStorage.getItem("Authorization") ?? "";

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
    const url = `${this.environment.backendUrl}/api/db/add-column?columnName=${this.addColumnName}&columnType=${this.addColumnType}&tableName=${this.activeTableName}`;
    
    fetch(url, {
      headers: {
        "Authorization": this.token
      }
    })
      .then(res => res.json())
      .then((json) => {
        console.log(json);
      });
    
      setTimeout(() => {
        this.apiService.fetchColumns([this.activeTableName]);
      }, 50);
  }

  public handleDeleteColumn(columnName: string) {
    const url = `${this.environment.backendUrl}/api/db/delete-column?columnName=${columnName}&tableName=${this.activeTableName}`;
    
    fetch(url,{
      headers: {
        "Authorization": this.token
      }
    })
      .then(res => res.json())
      .then((json) => {
        console.log(json);
      });

    setTimeout(() => {
      this.apiService.fetchColumns([this.activeTableName]);
    }, 50);
  }

  public handleSelect(event: Event) {
    // Get the selected value
    const tableName = (event.target as HTMLSelectElement).value;
    this.activeTableName = tableName;
    this.apiService.fetchColumns([tableName]);
  }
}
