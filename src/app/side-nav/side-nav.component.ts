import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LocationStrategy, DOCUMENT } from '@angular/common';

import { GoogleAnalyticsService } from '../google-analytics.service';

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.less']
})

export class SideNavComponent implements OnInit {

    objectKeys = Object.keys;
    list: object = {
        Home: '',
        Project: '',
        Blog: ''
    };

    constructor(@Inject(DOCUMENT) private document,
        private googleAnalyticsService: GoogleAnalyticsService,
        private router: Router,
        private locationStragegy: LocationStrategy) { }

    ngOnInit() {
        const domainName = document.location.hostname;
        this.googleAnalyticsService.emitEvent('syslog', 'domain', domainName);
        this.googleAnalyticsService.setHostName(domainName)
        if (domainName === 'mingyaoliu.com' ||
            domainName === 'liumingyao.com' ||
            domainName === 'localhost') {
            this.list = {
                Home: '',
                Project: '',
                Blog: '',
                About: ''
            };
        }
    }




    openDraw(event) {
        const checkbox = event.target;
        const slideDrawer = event.target.nextSibling.nextSibling.nextSibling;

        if (slideDrawer == null || slideDrawer.classList == null) {
            // Cannot find sibling
        } else if (slideDrawer.classList !== null && checkbox.checked === false) {
            slideDrawer.classList.add('closed');
        } else {
            slideDrawer.classList.remove('closed');
        }
    }

}
