import {
    inject,
    beforeEachProviders
    // addProviders,
    // TestComponentBuilder,
    // ComponentFixture
} from '@angular/core/testing';
import {provide} from '@angular/core';
import {BaseRequestOptions, Http, Response, ResponseOptions} from '@angular/http';
import {MockBackend} from '@angular/http/testing';
import { HTTP_PROVIDERS } from '@angular/http';
import { MOCK_REPOS } from './mock-repos';
import { GithubSearchService } from './github.service';

describe('MockBackend: GithubSearchService', () => {
    let mockbackend, service;

    beforeEachProviders(() => [
        GithubSearchService,
        HTTP_PROVIDERS,
        MockBackend,
        BaseRequestOptions,
        provide(Http, {
        useFactory: (backend, options) => new Http(backend, options), 
        deps: [MockBackend, BaseRequestOptions]})
    ]);

    beforeEach(inject([MockBackend, GithubSearchService], (_mockbackend, _service) => {
        mockbackend = _mockbackend;
        service = _service;
    }));
    
    it('should return mocked response', done => {
        let response = MOCK_REPOS;
        mockbackend.connections.subscribe(connection => {
            connection.mockRespond(
                new Response(new ResponseOptions({body: response }))
            );
        });
        service.getReposByUsername().subscribe(repos => {
            repos.forEach(repo => {
                expect(repo.name).toBeDefined();
                expect(repo.description).toBeDefined();
                expect(repo.html_url).toBeDefined();
                expect(repo.stargazers_count).toBeDefined();
                expect(repo.owner).toBeDefined();
                expect(repo.owner.avatar_url).toBeDefined();    
            });

            expect(repos.length).toBe(2);
            done();
        });
    });

    it('it should return mocked error', done => {
        let response = {code: 404, message: 'Not Found'};
        mockbackend.connections.subscribe(connection => {
            connection.mockRespond(
                new Response(new ResponseOptions({body: response }))
            );
        });
        service.getReposByUsername().subscribe(error => {
            expect(error.code).toBe(404);
            expect(error.message).toEqual("Not Found");
            done();
        });
    });

    it('should form url based on username', () => {
        let username = "ajeey";
        let repoUrl =  service.formRepoUrl(username);
        expect(repoUrl).toEqual("https://api.github.com/users/ajeey/repos");
    });
});

