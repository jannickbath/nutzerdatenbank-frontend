import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { ApiUserResponse, User } from '../../Types';

type Field = {
  name: string;
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
      active: false
    },
    {
      name: "Vorname",
      active: false
    },
    {
      name: "Nachname",
      active: false
    }
  ];
  public users: Array<User> = [];

  constructor (public apiService: ApiService) {
    this.fetchUsers();
  }

  public handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    if (value) {
      this.fetchUsers(target.value);
    }else {
      this.fetchUsers();
    }
  }

  public toggleField(event: Event) {
    const target = event.target as HTMLLIElement;
    const index = target.dataset["index"] as number | undefined;

    if (index) {
      this.fields[index].active = !this.fields[index].active;
    }
  }

  private fetchUsers(search: string | null = null): void {
    const baseUrl = "http://nutzerdatenbank-backend.loc/users";
    const url = search ? (baseUrl + "?search=" + search) : baseUrl;

    fetch(url)
      .then(res => res.json())
      .then((json: ApiUserResponse) => {
        this.users = json.users;
      });
  }
}
