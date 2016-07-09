import {
    async,
    inject,
    ComponentFixture
} from '@angular/core/testing';

import { TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { AppComponent } from './app.component';

@Component({
    selector: 'as-main-test',
    template: '<div><as-main-app></as-main-app></div>',
    directives: [AppComponent]
})
class TestComponent {
}

describe('AppComponent', () => {
    let app;

    beforeEach(() => {
        app = new AppComponent();
    });

    it('should be present', async(inject([TestComponentBuilder],
        (tsb: TestComponentBuilder) => {
            tsb.createAsync(TestComponent).then((fixture: ComponentFixture<TestComponent>) => {
                fixture.detectChanges();
                let compiled = fixture.debugElement.nativeElement;
                expect(compiled).toBeDefined();
            });
    })));

    it('should have appBrand property', function() {
        expect(app.appBrand).toBe('Angular 2 GitHub Search');
    });
});

