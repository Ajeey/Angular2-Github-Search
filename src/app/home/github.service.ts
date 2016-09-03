import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable} from 'rxjs/Rx';

@Injectable() 
export class GithubSearchService {
    
    constructor (private http: Http) {}

    formRepoUrl(language, pageNumber) {
        // return `https://api.github.com/users/${username}/repos`; // Tempate strings yay!
        return `https://api.github.com/search/repositories?q=+language:${language}&page=${pageNumber}`; // Tempate strings yay!
    }

    getReposByUsername (language, pageNumber): Observable<any> {
        return this.http.get(this.formRepoUrl(language, pageNumber))
                        .map(this.parseRepos)
                        .catch(this.handleError);
    }

    langaugeTagsUrl() {
        return "https://gist.githubusercontent.com/mayurah/5a4d45d12615d52afc4d1c126e04c796/raw/ccbba9bb09312ae66cf85b037bafc670356cf2c9/languages.json";
    }

    getLanguageTags() {
        return this.http.get(this.langaugeTagsUrl())
                        .map(this.parseTags)
                        .catch(this.handleError);
    }

    private parseTags(tags) {
        return JSON.parse(tags._body);
    }

    private parseRepos(res: Response) {
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
