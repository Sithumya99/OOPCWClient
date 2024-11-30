import { Component } from '@angular/core';
import { CommunicationService } from './Services/CommunicationService.service';
import { TicketingApplication } from './UI-Elements/ticketing-application/ticketing-application.component';
import { WebSocketService } from './Services/WebSocketService.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TicketingApplication
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'oop-cw';

  constructor(private commService: CommunicationService, private webSockService: WebSocketService) {}
}
