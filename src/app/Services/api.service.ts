import { Injectable } from '@angular/core';
import { ApiColumnResponse, ApiTableResponse, ApiUserResponse, SearchCategory, User } from '../Types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public users: Array<User> = [];
  public tables: Array<string> = [];
  public columns: any = [];
  private tmpColumns: any = [];
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
  private token = localStorage.getItem("Authorization") ?? "";

  public get iterableColumns() {
    return this.cleanupColumns(this.tmpColumns);
  }

  public fetchUsers(limit: number = 4, offset: number = 0): void {
    const baseUrl = `http://nutzerdatenbank-backend.loc/api/users?limit=${limit}&offset=${offset}`;
    let url = this.search ? (baseUrl + "&search=" + this.search) : baseUrl;
    const activeFields = this.searchCategories.filter(field => field.active);

    if (this.search && activeFields.length > 0) {
      url += "&filter=";
      url += activeFields.map(field => field.value).join(",");
    }

    fetch(url, {
      headers: {
        "Authorization": this.token
      }
    })
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
    const url = `http://nutzerdatenbank-backend.loc/api/db/tables`;

    fetch(url, {
      headers: {
        "Authorization": this.token
      }
    })
      .then(res => res.json())
      .then((json: ApiTableResponse) => {
        this.tables = json.tables;
      });
  }

  public fetchColumns(tableNames: Array<string>) {
    this.tmpColumns = [];
    
    tableNames.forEach((tableName, key) => {
      const url = `http://nutzerdatenbank-backend.loc/api/db/columns?tableName=${tableName}`;

      // Set a timeout to make sure that columns are fetched in the right order
      setTimeout(() => {
        fetch(url, {
          headers: {
            "Authorization": this.token
          }
        })
          .then(res => res.json())
          .then((json: ApiColumnResponse) => {
            this.columns = json.columns;
            this.tmpColumns = [...this.tmpColumns, Object.keys(json.columns)];
          });
      }, key * 100);
    })
  }

  public cleanupColumns(columns: Array<Array<string>>): Array<string> {
    const strippedColumns = ["id", "adress_id"];
    let newArr: Array<string> = [];

    columns.forEach(arr => {
      arr.forEach(col => {
        if (!strippedColumns.includes(col)) {
          newArr.push(col);
        }
      })
    })

    return newArr;
  }

  public authorize(username: string, password: string, cb: (token: boolean) => void): void {
    fetch("http://nutzerdatenbank-backend.loc/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username: username, password: password})
    }).then(res => res.json())
      .then(json => {
        // Token valid
        if ((json?.token ?? "").length > 0) {
          this.token = "Bearer " + json.token;
          localStorage.setItem('Authorization', this.token);
          cb(true);
        }else {
          cb(false);
        }
      })
  }

  public validateToken(cb: (valid: boolean) => void): void {
    fetch("http://nutzerdatenbank-backend.loc/api/validateToken", {
      method: "POST",
      headers: {
        "Authorization": this.token
      }
    }).then(res => res.json())
      .then(json => {
        cb(json.code === 200);
      })
  }

  constructor() { }
}
