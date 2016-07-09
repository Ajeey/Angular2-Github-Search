import {
    async,
    inject,
    addProviders,
    ComponentFixture
} from '@angular/core/testing';
import { HTTP_PROVIDERS } from '@angular/http';
import { TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { HomeComponent } from './home.component';
import { GithubSearchService } from './github.service';
import { MOCK_REPOS } from './mock-repos';

@Component({
    selector: 'as-home-test',
    template: '<as-home></as-home>',
    directives: [HomeComponent],
    providers: [HTTP_PROVIDERS, GithubSearchService]
})

class TestComponent {}

let testFixture: ComponentFixture<any>;
let homeCompiled;
let homeCmp: HomeComponent;

describe('HomeComponent', () => {
    beforeEach(() => {
        addProviders([
            HTTP_PROVIDERS
        ]);
    });

    it('should have been created successfully', async(inject([TestComponentBuilder],
        (tcb: TestComponentBuilder) => {
            tcb.createAsync(TestComponent).then((fixture: ComponentFixture<TestComponent>) => {
                testFixture = fixture;
                fixture.detectChanges();
                homeCompiled = fixture.nativeElement;
                homeCmp = fixture.debugElement
                    .children[0].componentInstance;
                expect(homeCompiled).toBeDefined();
            });
    })));

    it('should have search input text', async(inject([TestComponentBuilder],
        (tsb: TestComponentBuilder) => {
            tsb.createAsync(TestComponent).then((fixture: ComponentFixture<TestComponent>) => {
                expect(homeCompiled).toBeDefined();
                expect(homeCompiled.querySelectorAll('.search-text').length).toBe(1);
            });
    })));

    it('should have search button', async(inject([TestComponentBuilder],
        (tsb: TestComponentBuilder) => {
            tsb.createAsync(TestComponent).then((fixture: ComponentFixture<TestComponent>) => {
                expect(homeCompiled).toBeDefined();
                expect(homeCompiled.querySelectorAll('.search-button').length).toBe(1);
            });
    })));

    it('should have image tag', async(inject([TestComponentBuilder],
        (tsb: TestComponentBuilder) => {
            tsb.createAsync(TestComponent).then((fixture: ComponentFixture<TestComponent>) => {
                expect(homeCompiled).toBeDefined();
                expect(homeCompiled.querySelectorAll('.profile-image').length).toBe(1);
            });
    })));

    it('should have error div', async(inject([TestComponentBuilder],
        (tsb: TestComponentBuilder) => {
            tsb.createAsync(TestComponent).then((fixture: ComponentFixture<TestComponent>) => {
                expect(homeCompiled).toBeDefined();
                expect(homeCompiled.querySelectorAll('.error-message').length).toBe(1);
            });
    })));

    it('should have repos container div', async(inject([TestComponentBuilder],
        (tsb: TestComponentBuilder) => {
            tsb.createAsync(TestComponent).then((fixture: ComponentFixture<TestComponent>) => {
                expect(homeCompiled).toBeDefined();
                expect(homeCompiled.querySelectorAll('.repos-container').length).toBe(1);
            });
    })));

    it('should NOT render repos', () => {
        homeCmp.success([]);
        testFixture.detectChanges();
        expect(homeCompiled.querySelectorAll('.repo').length).toEqual(0);
    });

    it('should handle success', () => {
        homeCmp.success(MOCK_REPOS);
        testFixture.detectChanges();
        expect(homeCompiled.querySelectorAll('.repo').length).toEqual(2);
    });

    it('should handle error', () => {
        // homeCmp.handleError();
        // testFixture.detectChanges();

        // expect(homeCompiled.querySelectorAll('.error-message')).toBeDefined();

        let error = {
            "message": "Not Found",
            "documentation_url": "https://developer.github.com/v3" 
        };
        homeCmp.error(error);
        testFixture.detectChanges();
        expect(homeCompiled.querySelectorAll('.error-message')).toBeDefined();
    });
});
