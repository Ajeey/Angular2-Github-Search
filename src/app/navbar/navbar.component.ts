import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';

@Component({
    selector: 'as-navbar',
    templateUrl: 'app/navbar/navbar.html',
    styleUrls: ['app/navbar/navbar.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    directives: [CORE_DIRECTIVES]
})
export class NavbarComponent {
    @Input() brand: string;
}
