import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { UserProfileFacade } from "../Facades/UserProfile/UserProfileFacade.facade";

@Injectable({
    providedIn: 'root'
})

export class CommunicationService {
    static http: CommunicationService;
    private httpClient: HttpClient;
    private httpOptions = {
        headers: new HttpHeaders({
            accept: 'application/json',
            'Content-Type': 'application/json; charset=UTF-8'
        }),
    };

    constructor(httpClient: HttpClient) {
        CommunicationService.http = this;
        this.httpClient = httpClient;
    }

    private extractData(res: HttpResponse<any>) {
        let body = res.body;
        let authHeader = res.headers.get('Authorization');
        if (authHeader) {
            UserProfileFacade.setAuth(authHeader);
        }
        return body || {};
    }

    postFromTicketServer(cmd: string, body: any): Observable<any> {
        const url = `${environment.url}/${cmd}`;
        return this.post(url, body);
    }

    getFromTicketServer(cmd: string): Observable<any> {
        const url = `${environment.url}/${cmd}`;
        return this.get(url);
    }

    post(url: string, body: any): Observable<any> {
        return this.httpClient.post<any>(`${url}`, body, {...this.createHttpOptions(), observe: 'response'}).pipe(
            map(this.extractData)
        );
    }

    get(url: string): Observable<any> {
        return this.httpClient.get<any>(`${url}`, {...this.createHttpOptions(), observe: 'response'}).pipe(
            map(this.extractData)
        );
    }

    createHttpOptions(): {headers: HttpHeaders} {
        const userAuth = UserProfileFacade.getAuth();
        let headers = this.httpOptions.headers;

        if (userAuth) {
            headers = headers.set('Authorization', `Bearer ${userAuth}`);
        }

        return { headers };
    }
}