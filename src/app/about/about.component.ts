import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from '../animation';
import { faGithub, faFacebook, faTwitter, faInternetExplorer, faChrome } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faGlobe, faPhone } from '@fortawesome/free-solid-svg-icons'
@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.less']
})
export class AboutComponent implements OnInit {

    constructor() { }
    faGithub = faGithub;
    faFacebook = faFacebook;
    faTwitter = faTwitter;
    faIE = faInternetExplorer;
    faChrome = faChrome;
    faGlobe = faGlobe;
    faEnvelope = faEnvelope;
    faPhone = faPhone;
    ngOnInit() {
    }
}
