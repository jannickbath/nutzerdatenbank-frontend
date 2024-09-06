import { Injectable } from '@angular/core';
import { ApiUserResponse, User } from '../Types';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public active = false;
  public userDetails: Array<User> = [];

  public updateUserDetails(userId: number) {
    const url = `http://nutzerdatenbank-backend.loc/users?id=${userId}`;

    fetch(url)
      .then(res => res.json())
      .then((json: ApiUserResponse
      ) => {
        if (json.users.length > 0) {
          this.userDetails = json.users;
        }
      });

    console.log(this.userDetails);
  }

  constructor() { }
}
