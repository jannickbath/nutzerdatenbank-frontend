import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../../Services/api.service';
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

  constructor (public apiService: ApiService) {
    this.fetchUsers();
  }

  public handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this._search = target.value;   
    this.fetchUsers(); 
  }

  public toggleField(event: Event) {
    const target = event.target as HTMLLIElement;
    const index = target.dataset["index"] as number | undefined;

    if (index) {
      this.fields[index].active = !this.fields[index].active;
    }

    this.fetchUsers();
  }

  private fetchUsers(): void {
    const baseUrl = "http://nutzerdatenbank-backend.loc/users";
    let url = this._search ? (baseUrl + "?search=" + this._search) : baseUrl;
    const activeFields = this.fields.filter(field => field.active);

    if (this._search && activeFields.length > 0) {
      url += "&filter=";
      url += activeFields.map(field => field.value).join(",");
    }

    fetch(url)
      .then(res => res.json())
      .then((json: ApiUserResponse) => {
        this.users = json.users;
      });
  }
}
