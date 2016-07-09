import {Component} from '@angular/core';
import {NavbarComponent} from './navbar/navbar.component';
import {HomeComponent} from './home/home.component';
import {CONSTANTS} from './shared';

@Component({
    selector: 'as-myapp',
    templateUrl: 'app/app.html',
    directives: [NavbarComponent, HomeComponent]
})
export class AppComponent {
    public appBrand: string;

    constructor() {
        this.appBrand = CONSTANTS.MAIN.APP.BRAND;
    }
}
