import { Injectable } from '@angular/core';
import { ApiColumnResponse, ApiTableResponse, ApiUserResponse, DbColumns, SearchCategory, User } from '../Types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public users: Array<User> = [];
  public tables: Array<string> = [];
  public columns: Array<DbColumns> = [];
  public search: string = "";
  public searchCategories: Array<SearchCategory> = [
    {
      name: "E-Mail",
      value: "email",
      active: false
    },
    {
      name: "Vorname",
      value: "first_name",
      active: false
    },
    {
      name: "Nachname",
      value: "last_name",
      active: false
    }
  ];

  public fetchUsers(limit: number = 4, offset: number = 0): void {
    const baseUrl = `http://nutzerdatenbank-backend.loc/users?limit=${limit}&offset=${offset}`;
    let url = this.search ? (baseUrl + "&search=" + this.search) : baseUrl;
    const activeFields = this.searchCategories.filter(field => field.active);

    if (this.search && activeFields.length > 0) {
      url += "&filter=";
      url += activeFields.map(field => field.value).join(",");
    }

    fetch(url)
      .then(res => res.json())
      .then((json: ApiUserResponse) => {
        if (offset > 0) {
          this.users = [...this.users, ...json.users];
        }else {
          this.users = json.users;
        }
      });
  }

  public fetchTables() {
    const url = `http://nutzerdatenbank-backend.loc/db/tables`;

    fetch(url)
      .then(res => res.json())
      .then((json: ApiTableResponse) => {
        this.tables = json.tables;
      });
  }

  public fetchColumns(tableName: string) {
    const url = `http://nutzerdatenbank-backend.loc/db/columns?tableName=${tableName}`;

    fetch(url)
      .then(res => res.json())
      .then((json: ApiColumnResponse) => {
        this.columns = json.columns;
      });
  }

  constructor() { }
}
