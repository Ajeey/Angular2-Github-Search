import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable} from 'rxjs/Rx';

@Injectable() 
export class GithubSearchService {
    
    constructor (private http: Http) {}

    formRepoUrl(username) {
        return `https://api.github.com/users/${username}/repos`; // Tempate strings yay!
    }

    getReposByUsername (username): Observable<any> {
        return this.http.get(this.formRepoUrl(username))
                        .map(this.parseData)
                        .catch(this.handleError);
    }

    private parseData(res: Response) {
        let body = res.json();
        return body || { };
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
