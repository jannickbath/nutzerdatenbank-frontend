import { Injectable } from '@angular/core';
import { ApiColumnResponse, ApiTableResponse, ApiUserResponse, MicrosoftUserResponse, SearchCategory, MicrosoftUser, FetchUserOptions } from '../Types';
import { UrlSegment } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private environment = environment;
  public users: Array<MicrosoftUser> = [];
  public tables: Array<string> = [];
  public columns: any = [];
  private tmpColumns: any = [];
  public search: string = "";
  public searchCategories: Array<SearchCategory> = [
    {
      name: "E-Mail",
      value: "mail",
      active: false
    },
    {
      name: "Vorname",
      value: "givenName",
      active: false
    },
    {
      name: "Nachname",
      value: "surname",
      active: false
    }
  ];
  private token = localStorage.getItem("Authorization") ?? "";

  public get iterableColumns() {
    return this.cleanupColumns(this.tmpColumns);
  }

  public fetchUsers(limit: number = 4, offset: number = 0, appendUsers = false): void {
    const baseUrl = `${this.environment.backendUrl}/api/users?limit=${limit}&offset=${offset}`;
    const microsoftBaseUrl = `${this.environment.backendUrl}/api/microsoft_users?limit=${limit}&offset=${offset}`;
    let url = this.search ? (baseUrl + "&search=" + this.search) : baseUrl;
    let microsoftUrl = this.search ? (microsoftBaseUrl + "&search=" + this.search) : microsoftBaseUrl;
    const activeFields = this.searchCategories.filter(field => field.active);

    const requestHeaders = {
      "Authorization": this.token
    }

    if (this.search && activeFields.length > 0) {
      microsoftUrl += "&filter=";
      microsoftUrl += activeFields.map(field => field.value).join(",");
    }

    fetch(microsoftUrl, { headers: requestHeaders })
      .then(res => res.json())
      .then((json) => {
        if (appendUsers) {
          this.users = [...this.users, ...json.users];
        }else {
          this.users = json.users;
        }
      })
      .then(() => console.log(this.users));
  }

  public fetchTables() {
    const url = `${this.environment.backendUrl}/api/db/tables`;

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
      const url = `${this.environment.backendUrl}/api/db/columns?tableName=${tableName}`;

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
    fetch(this.environment.backendUrl + "/login", {
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
          this.loggedInUser = username;
          localStorage.setItem('Authorization', this.token);
          cb(true);
        }else {
          cb(false);
        }
      })
  }

  public unauthorize(): void {
    localStorage.removeItem("Authorization");
    localStorage.removeItem("loggedInUser");
  }

  public validateToken(cb: (valid: boolean) => void): void {
    fetch(this.environment.backendUrl + "/api/validateToken", {
      method: "POST",
      headers: {
        "Authorization": this.token
      }
    }).then(res => res.json())
      .then(json => {
        cb(json.code === 200);
      })
  }

  public set loggedInUser(username: string) {
    localStorage.setItem("loggedInUser", username);
  }

  public get loggedInUser() {
    return localStorage.getItem("loggedInUser") ?? "";
  }

  constructor() { }
}
