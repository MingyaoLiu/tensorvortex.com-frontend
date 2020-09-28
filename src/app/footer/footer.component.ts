import { Component, OnInit } from '@angular/core';

import { faFacebook, faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {

    faFacebook = faFacebook;
    faTwitter = faTwitter;
    faGithub = faGithub;

    constructor() { }

    ngOnInit() {
    }

}
