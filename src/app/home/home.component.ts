import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { GoogleAnalyticsService } from '../google-analytics.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

    constructor() { }

    @ViewChild('ttref', { read: ElementRef, static: true }) ttref: ElementRef;
    @ViewChild('vtref', { read: ElementRef, static: true }) vtref: ElementRef;


    ttInitRight = 0;
    ttInitTop = 0;
    vtInitRight = 0;
    vtInitTop = 0;

    ngOnInit() {
    }

    ngAfterViewInit(): void {

        this.ttInitRight = Number(this.ttref.nativeElement.style.right.slice(0, -3));
        this.ttInitTop = Number(this.ttref.nativeElement.style.top.slice(0, -3));
        this.vtInitRight = Number(this.vtref.nativeElement.style.right.slice(0, -3));
        this.vtInitTop = Number(this.vtref.nativeElement.style.top.slice(0, -3));
        console.log("After view init")
    }

    onMouseMove(e) {

        const targetWidth = e.target.clientWidth;
        const targetHeight = e.target.clientHeight;

        const mousePostionX = e.clientX;
        const mousePostionY = e.clientY;

        this.ttref.nativeElement.style.right = String((targetWidth - mousePostionX) / 500 + this.ttInitRight) + 'rem';
        this.ttref.nativeElement.style.top = String((targetHeight - mousePostionY) / 100 + this.ttInitTop) + 'rem';

        this.vtref.nativeElement.style.right = String((targetWidth - mousePostionX) / 1000 + this.vtInitRight) + 'rem';
        this.vtref.nativeElement.style.top = String((targetHeight - mousePostionY) / 70 + this.vtInitTop) + 'rem';
    }
}
