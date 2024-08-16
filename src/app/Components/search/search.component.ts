import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ApiService } from '../../Services/api.service';
import { ApiUserResponse, User } from '../../Types';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  public fields: Array<string> = ["E-Mail", "Nachname", "Vorname", "Straße"];
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
