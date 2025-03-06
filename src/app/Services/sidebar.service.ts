import { Injectable } from '@angular/core';
import { ApiUserDetailResponse, MergedUserAdress } from '../Types';
import { environment } from '../../environments/environment';

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
  private token = localStorage.getItem("Authorization") ?? "";
  private environment = environment;


  public updateUserDetails(userId: number) {
    const url = `${this.environment.backendUrl}/api/users?id=${userId}`;

    fetch(url, {
      headers: {
        "Authorization": this.token
      }
    })
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
