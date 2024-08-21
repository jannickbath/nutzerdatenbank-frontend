import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiUserResponse, User } from '../../Types';

type Field = {
  name: string;
  value: string;
  active: boolean;
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  public fields: Array<Field> = [
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
  public users: Array<User> = [];
  private _search = "";
  private _debounceTimeout: any = null;
  private _offset = 0;

  constructor () {
    this.fetchUsers();
  }

  public handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this._search = target.value;

    // Deletes the previous timeout, if one exists.
    if (this._debounceTimeout) {
      clearTimeout(this._debounceTimeout);
    }

    this._debounceTimeout = setTimeout(() => {
      this.fetchUsers();
    }, 200);
  }

  public toggleField(event: Event) {
    const target = event.target as HTMLLIElement;
    const index = target.dataset["index"] as number | undefined;

    if (index) {
      this.fields[index].active = !this.fields[index].active;
    }

    this.fetchUsers();
  }

  public loadMore() {
    const itemsToLoad = 2;
    this._offset += itemsToLoad;
    this.fetchUsers(itemsToLoad, this._offset);
  }
  
  private fetchUsers(limit: number = 4, offset: number = 0): void {
    console.log(limit, offset);
    const baseUrl = `http://nutzerdatenbank-backend.loc/users?limit=${limit}&offset=${offset}`;
    let url = this._search ? (baseUrl + "&search=" + this._search) : baseUrl;
    const activeFields = this.fields.filter(field => field.active);

    if (this._search && activeFields.length > 0) {
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
}
