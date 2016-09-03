import { Component, ElementRef, AfterViewInit } from '@angular/core';
import { Search } from './search';
import { GithubSearchService } from './github.service';
import { CONSTANTS } from '../shared';

declare var $:any;

@Component({
    selector: 'as-home',
    templateUrl: 'app/home/home.html',
    styleUrls: [
        'app/home/home.css'
    ],
   directives: [  ],
    providers: [ GithubSearchService ]
})
export class HomeComponent implements AfterViewInit {
    public repos: Array<any> = [];
    public originalRepos: Array<any> = [];
    public languageTags: Array<any> = [];

    public elementRef: ElementRef;
    public strings;
    public model = new Search('');
    public fetching: Boolean = false;
    public isError: Boolean = false;
    public isEmpty = null;
    public repoCount = 0;
    public pageNumber = 1;
    public loadingMore = false;
    public maxStarCount = 100;
    public starSlider;
    
    constructor(private githubSearchService: GithubSearchService, elementRef: ElementRef) {
        this.elementRef = elementRef;
        this.strings = CONSTANTS.MAIN.APP;
    }

    onSubmit() { 
        this.fetching = true;
        this.clearRepos();
        this.fetchRepos(this.pageNumber);
    }

    fetchRepos(pageNumber) {
        this.githubSearchService.getReposByUsername(this.model.text, pageNumber)
                        .subscribe(
                            this.success.bind(this),
                            this.error.bind(this)
                        );
    }

    fetchNextPage() {
        this.loadingMore = true;
        this.pageNumber++;
        this.fetchRepos(this.pageNumber);
    }

    clearRepos() {
        this.repos = [];
        this.originalRepos = [];
    }

    success(repos) {
        this.repos = this.repos.concat(repos.items);
        this.originalRepos = this.repos;
        this.repoCount = repos.total_count;
        
        this.isError = false;

        if(repos.length === 0) {
            this.isEmpty = true;
        } else {
            this.isEmpty = false;
            this.getMaxStarCount();
        }

        this.fetching = false;
        this.loadingMore = false;
    }

    error(error) {
        this.handleError();
    }

    getMaxStarCount() {
        this.maxStarCount = this.repos[0].stargazers_count;
        this.starSlider.slider("option", "max", this.maxStarCount);
        this.starSlider.slider("option", "value", this.maxStarCount);
    }

    handleError() {
        this.fetching = false;
        this.isError = true;
        this.isEmpty = false;
        this.repos = null;
    }

    // Slider Range Change detection
    filterReposByStar(stars) {
       this.repos =  this.originalRepos.filter(function(repo) {
            return repo.stargazers_count >= stars;
        });

    }

    ngAfterViewInit() {
        // Init Autocomplete
        this.githubSearchService.getLanguageTags().subscribe(function(tags){
            this.languageTags = tags;
            $(this.elementRef.nativeElement).find(".search-text").autocomplete({
                source: this.languageTags
            });
        }.bind(this), function(error){
            console.error("Could not fetch language tags", error);
        }.bind(this));

        // Initialize Slider
        this.starSlider = $(this.elementRef.nativeElement).find("#slider").slider({
            range: false,
            min: 0,
            max: 20000,
            value: this.maxStarCount,
            slide: ( event, ui ) => {
                this.maxStarCount = ui.value;
                this.filterReposByStar(ui.value);
            }
        });
    }
}
