import { Injectable } from "@angular/core";
import { CommunicationService } from "../../Services/CommunicationService.service";
import { BasicdataImplementation } from "./BasicdataImplementation.implementation";
import { command, pages } from "../../Interfaces/BasicData.interface";
import { UserProfileFacade } from "../UserProfile/UserProfileFacade.facade";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root',
})

export class BasicdataFacade {
    private static impl: BasicdataImplementation = new BasicdataImplementation();

    public static setCurrentPage(currentPage: pages) {
        this.impl.setCurrentPage(currentPage);
    }

    public static getCurrentPage(): Observable<pages> {
        return this.impl.getCurrentPage();
    }
}