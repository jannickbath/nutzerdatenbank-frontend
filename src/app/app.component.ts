import { Component } from '@angular/core';
import { SearchComponent } from './Components/search/search.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { SidebarInfoComponent } from "./Components/sidebar-info/sidebar-info.component";
import { SidebarDbConfigComponent } from "./Components/sidebar-db-config/sidebar-db-config";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SearchComponent, NavbarComponent, SidebarComponent, SidebarInfoComponent, SidebarDbConfigComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'db-solution';
}
