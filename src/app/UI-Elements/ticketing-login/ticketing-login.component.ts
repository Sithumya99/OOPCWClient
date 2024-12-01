import { Component, OnInit } from '@angular/core';
import { UserProfileFacade } from '../../Facades/UserProfile/UserProfileFacade.facade';
import { CommonModule } from '@angular/common';
import { fieldInterface } from '../../Interfaces/BasicData.interface';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-ticketing-login',
  standalone: true,
  imports: [CommonModule, InputComponent],
  templateUrl: './ticketing-login.component.html',
  styleUrl: './ticketing-login.component.scss'
})
export class TicketingLoginComponent implements OnInit  {

  isLogin: boolean = true;
  loginFields: fieldInterface[] = [];

  ngOnInit(): void {
    this.loginFields = UserProfileFacade.getLoginFields();
  }

  public toglleForm() {
    this.isLogin = !this.isLogin;
  }

  public loginUser() {
    UserProfileFacade.loginUser();
  }

  registerCustomer() {
    UserProfileFacade.register("Customer");
  }

  registerVendor() {
    UserProfileFacade.register("Vendor");
  }

  registerAdmin() {
    UserProfileFacade.register("Admin");
  }
}
