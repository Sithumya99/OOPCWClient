import { Component, OnInit } from "@angular/core";
import { fieldInterface } from "../../Interfaces/BasicData.interface";
import { SessionConfigFacade } from "../../Facades/SessionConfig/SessionConfigFacade.facade";
import { InputComponent } from "../input/input.component";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-session-config',
    templateUrl: './session-config.component.html',
    imports: [InputComponent, CommonModule],
    standalone: true
})

export class SessionConfigComponent implements OnInit {
    isSessionActive: boolean = false;
    sessionConfigFields: fieldInterface[] = [];

    constructor() {
        SessionConfigFacade.getSessionConfigActive().subscribe((isActive: boolean) => {
            this.isSessionActive = isActive;
        });
    }

    ngOnInit(): void {
        if (!this.isSessionActive) {
            this.sessionConfigFields = SessionConfigFacade.getSessionConfigFields();
        }
    }

    startSession() {
        SessionConfigFacade.startSession();
    }

    stopSession() {
        SessionConfigFacade.stopSession();
    }
}