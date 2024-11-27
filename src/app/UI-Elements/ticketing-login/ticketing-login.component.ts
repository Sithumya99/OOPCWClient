import { Component } from '@angular/core';
import { UserProfileFacade } from '../../Facades/UserProfile/UserProfileFacade.facade';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ticketing-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticketing-login.component.html',
  styleUrl: './ticketing-login.component.scss'
})
export class TicketingLoginComponent {

  isLogin: boolean = true;

  public toglleForm() {
    this.isLogin = !this.isLogin;
  }

  public saveChanges(event: Event) {
    const inputElm = event.target as HTMLInputElement;
    UserProfileFacade.setUserDetails(inputElm.name, inputElm.value);
  }

  public loginUser() {
    UserProfileFacade.loginUser();
  }
}
