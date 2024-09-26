import { Injectable } from '@angular/core';
import { ApiUserDetailResponse, ApiUserResponse, MergedUserAdress, User } from '../Types';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  // If true -> add user page opens up
  public active = false;
  // If a number -> update user sidebar opens up
  public activeDetailsUserId: number | null = null;
  public userDetails: Array<MergedUserAdress> = [];
  public dbConfigSidebarActive: boolean = false;

  public updateUserDetails(userId: number) {
    const url = `http://nutzerdatenbank-backend.loc/users?id=${userId}`;

    fetch(url)
      .then(res => res.json())
      .then((json: ApiUserDetailResponse
      ) => {
        if (json.users.length > 0) {
          this.userDetails = json.users;
        }
      });
  }

  constructor() { }
}
