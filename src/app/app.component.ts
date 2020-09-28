import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { $ } from 'protractor';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { fadeSlideInAnimation, slideInAnimation } from './animation';
import { ImagePreloadService } from './image-preload.service';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';

import { faAddressBook } from '@fortawesome/free-regular-svg-icons';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
    animations: [

        fadeSlideInAnimation,
        slideInAnimation
    ]
})

export class AppComponent {
    title = 'ts-app';
    isNavOpen = true;
    greeting: Promise<string> | null = null;

    constructor( private router: Router) {
    }

    ngOnInit(): void {


    }

    ngAfterViewInit(): void {
    }


    closeTempAlert(event) {
        event.target.style.transition = '0.5s';
        event.target.style.opacity = '0';
    }

    clickOnPageSpace(event: { target: { tagName: string; isContentEditable: boolean; }; }) {
        // console.log(event.target.tagName)
        if (event.target.tagName === 'svg' ||
            event.target.tagName === 'path' ||
            event.target.tagName === 'A' ||
            event.target.tagName === 'BUTTON' ||
            event.target.tagName === 'TEXTAREA' ||
            event.target.tagName === 'INPUT' ||
            event.target.tagName === 'H1' ||
            event.target.tagName === 'H2' ||
            event.target.tagName === 'H3' ||
            event.target.isContentEditable === true ||
            this.router.url == "/blog-gen" ||
            this.router.url == "/purchase")
            {
 
        } else {
            this.isNavOpen = !this.isNavOpen;
        }
    }
 
    prepareRoute(outlet: RouterOutlet) {
        return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
    }
}
