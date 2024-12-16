import { Component, Input, NgModule } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SidebarInfoComponent } from '../sidebar-info/sidebar-info.component';
import { SidebarDbConfigComponent } from '../sidebar-db-config/sidebar-db-config';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../Services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SearchComponent, NavbarComponent, SidebarComponent, SidebarInfoComponent, SidebarDbConfigComponent, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  protected token = localStorage.getItem("Authorization") ?? "";
  protected tokenAvailable: boolean = this.token.length > 0;
  protected tokenValid: boolean = false;
  protected loginError: boolean = false;
  protected username: string = "";
  protected password: string = "";

  protected handleSubmit() {
    if (this.username.length <= 0) {
      console.error("Please provide a username in order to log in.");
    }

    if (this.password.length <= 0) {
      console.error("Please provide a password in order to log in.");
    }

    this.apiService.authorize(this.username, this.password, (valid) => {
        this.tokenValid = valid;
        this.loginError = !valid;
    });
  }

  constructor(public apiService: ApiService) {
    if (this.tokenAvailable) {
      apiService.validateToken(valid => this.tokenValid = valid)
    }
  }
}
