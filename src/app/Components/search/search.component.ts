import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SidebarService } from '../../Services/sidebar.service';
import { ApiService } from '../../Services/api.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  private _debounceTimeout: any = null;
  private _offset = 0;

  constructor (private sideBarService: SidebarService, private apiService: ApiService) {
    this.apiService.fetchUsers();
  }

  public get fields() {
    return this.apiService.searchCategories;
  }

  public get activeUserId() {
    return this.sideBarService.activeDetailsUserId;
  }

  public get users() {
    return this.apiService.users;
  }

  public handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.apiService.search = target.value;

    // Deletes the previous timeout, if one exists.
    if (this._debounceTimeout) {
      clearTimeout(this._debounceTimeout);
    }

    this._debounceTimeout = setTimeout(() => {
      this.apiService.fetchUsers();
    }, 1000);
  }

  public toggleField(event: Event) {
    const target = event.target as HTMLLIElement;
    const index = target.dataset["index"] as number | undefined;

    if (index) {
      this.fields[index].active = !this.fields[index].active;
    }

    this.apiService.fetchUsers();
  }

  public loadMore() {
    const itemsToLoad = 2;
    this._offset += itemsToLoad;
    this.apiService.fetchUsers(itemsToLoad, this._offset, true);
  }

  // Show user details in sidebar
  public handleUserClick(userId: number) {
    this.sideBarService.updateUserDetails(userId);
    this.apiService.fetchColumns(["user", "adress"]);    
    this.sideBarService.activeDetailsUserId = userId;
  }
}
