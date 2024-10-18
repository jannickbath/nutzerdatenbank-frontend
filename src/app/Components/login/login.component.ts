import { Component, NgModule } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { SidebarInfoComponent } from '../sidebar-info/sidebar-info.component';
import { SidebarDbConfigComponent } from '../sidebar-db-config/sidebar-db-config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SearchComponent, NavbarComponent, SidebarComponent, SidebarInfoComponent, SidebarDbConfigComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  protected loggedIn: boolean = false;

  public onSubmit() {
    localStorage.setItem('token', "myTokenBlah");
  }
}
