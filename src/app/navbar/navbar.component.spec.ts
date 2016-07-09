import {
    async,
    inject,
    ComponentFixture
} from '@angular/core/testing';

import { TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { NavbarComponent } from './navbar.component';

@Component({
    selector: 'as-navbar-test',
    template: '<as-navbar></as-navbar>',
    directives: [NavbarComponent]
})
class TestComponent {
}

describe('NavbarComponent', () => {
    it('should be present', async(inject([TestComponentBuilder],
        (tsb: TestComponentBuilder) => {
            tsb.createAsync(TestComponent).then((fixture: ComponentFixture<TestComponent>) => {
                fixture.detectChanges();
                let compiled = fixture.debugElement.nativeElement;
                expect(compiled).toBeDefined();
                expect(compiled.querySelectorAll('a.navbar-brand').length).toBe(1);
            });
        })));
});

