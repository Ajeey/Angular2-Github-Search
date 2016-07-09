import {
    async,
    inject,
    ComponentFixture
} from '@angular/core/testing';
import { HTTP_PROVIDERS } from '@angular/http';
import { TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { HomeComponent } from './home.component';

@Component({
    selector: 'as-home-test',
    template: '<as-home></as-home>',
    directives: [HomeComponent],
    providers: [HTTP_PROVIDERS]
})
class TestComponent {
}

describe('HomeComponent', () => {
    it('should have home component', async(inject([TestComponentBuilder],
        (tsb: TestComponentBuilder) => {
            tsb.createAsync(TestComponent).then((fixture: ComponentFixture<TestComponent>) => {
                fixture.detectChanges();
                let compiled = fixture.debugElement.nativeElement;
                expect(compiled).toBeDefined();
            });
    })));

    it('should have search input text', async(inject([TestComponentBuilder],
        (tsb: TestComponentBuilder) => {
            tsb.createAsync(TestComponent).then((fixture: ComponentFixture<TestComponent>) => {
                fixture.detectChanges();
                let compiled = fixture.debugElement.nativeElement;
                expect(compiled).toBeDefined();
                expect(compiled.querySelectorAll('.search-text').length).toBe(1);
            });
    })));

    it('should have search button', async(inject([TestComponentBuilder],
        (tsb: TestComponentBuilder) => {
            tsb.createAsync(TestComponent).then((fixture: ComponentFixture<TestComponent>) => {
                fixture.detectChanges();
                let compiled = fixture.debugElement.nativeElement;
                expect(compiled).toBeDefined();
                expect(compiled.querySelectorAll('.search-button').length).toBe(1);
            });
    })));

    it('should have image tag', async(inject([TestComponentBuilder],
        (tsb: TestComponentBuilder) => {
            tsb.createAsync(TestComponent).then((fixture: ComponentFixture<TestComponent>) => {
                fixture.detectChanges();
                let compiled = fixture.debugElement.nativeElement;
                expect(compiled).toBeDefined();
                expect(compiled.querySelectorAll('.profile-image').length).toBe(1);
            });
    })));

    it('should have error div', async(inject([TestComponentBuilder],
        (tsb: TestComponentBuilder) => {
            tsb.createAsync(TestComponent).then((fixture: ComponentFixture<TestComponent>) => {
                fixture.detectChanges();
                let compiled = fixture.debugElement.nativeElement;
                expect(compiled).toBeDefined();
                expect(compiled.querySelectorAll('.error-message').length).toBe(1);
            });
    })));

    it('should have repos container div', async(inject([TestComponentBuilder],
        (tsb: TestComponentBuilder) => {
            tsb.createAsync(TestComponent).then((fixture: ComponentFixture<TestComponent>) => {
                fixture.detectChanges();
                let compiled = fixture.debugElement.nativeElement;
                expect(compiled).toBeDefined();
                expect(compiled.querySelectorAll('.repos-container').length).toBe(1);
            });
    })));
});

