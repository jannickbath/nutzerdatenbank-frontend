import { Component } from '@angular/core';
import { LoginComponent } from "./Components/login/login.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'db-solution';
}
