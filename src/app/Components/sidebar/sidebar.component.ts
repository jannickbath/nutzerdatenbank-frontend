import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  private _active = true;

  get active() {
    return this._active;
  }

  public close() {
    this._active = false;
  }

  public open() {
    this._active = true;
  }

  public handleSubmit() {
    // TODO: Clear input fields
    // TODO: Show success popup
    this.close();
  }
}
