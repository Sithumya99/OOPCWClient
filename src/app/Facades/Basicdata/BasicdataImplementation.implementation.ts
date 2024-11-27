import { BehaviorSubject, Observable } from "rxjs";
import { pages } from "../../Interfaces/BasicData.interface";
import { CommunicationService } from "../../Services/CommunicationService.service";

export class BasicdataImplementation {

    currentPage: BehaviorSubject<pages> =  new BehaviorSubject<pages>(pages.loginPage);

    constructor() {}

    getCurrentPage(): Observable<pages> {
        return this.currentPage.asObservable();
    }

    setCurrentPage(page: pages) {
        this.currentPage.next(page);
    }
}