import { Component } from '@angular/core';
import { Search } from './search';
import { GithubSearchService } from './github.service';
import { CONSTANTS } from '../shared';

@Component({
    selector: 'as-home',
    templateUrl: 'app/home/home.html',
    styleUrls: [
        'app/home/home.css'
    ],
    providers: [GithubSearchService]
})
export class HomeComponent {
    public repos: Array<any> = [];
    
    public strings;
    public model = new Search('');
    public fetching: Boolean = false;
    public isError: Boolean = false;
    public profileImage: string = "";
    public isEmpty = null;

    constructor(private githubSearchService: GithubSearchService) {
        this.strings = CONSTANTS.MAIN.APP;
    }

    onSubmit() { 
        this.fetching = true;
        this.githubSearchService.getReposByUsername(this.model.text)
                        .subscribe(
                            this.success.bind(this),
                            this.error.bind(this)
                        );
    }

    success(repos) {
        this.repos = repos;
        this.isError = false;

        if(repos.length === 0) {
            this.profileImage = "";
            this.isEmpty = true;
        } else {
            this.isEmpty = false;
            this.getImage();
        }

        this.fetching = false;
    }

    error(error) {
        console.log("errror", error);
        this.handleError();
    }

    getImage() {
        this.profileImage = this.repos[0].owner.avatar_url;
    }

    handleError() {
        this.fetching = false;
        this.isError = true;
        this.profileImage = null;
        this.isEmpty = false;
        this.repos = null;
    }
}
