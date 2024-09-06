import { Component } from '@angular/core';
import { SidebarService } from '../../Services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  get active() {
    return this.sideBarService.active;
  }

  public close() {
    this.sideBarService.active = false;
  }

  public open() {
    this.sideBarService.active = true;
  }

  public handleSubmit() {
    // TODO: Clear input fields
    // TODO: Show success popup
    this.close();
  }

  constructor (public sideBarService: SidebarService) { }
}
