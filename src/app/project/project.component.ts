import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.less']
})
export class ProjectComponent implements OnInit {

    constructor() { }

    @ViewChild('ttref', { read: ElementRef, static: true }) ttref: ElementRef;
    @ViewChild('vtref', { read: ElementRef, static: true }) vtref: ElementRef;


    ttInitMarginLeft = 0;
    ttInitMarginTop = 0;
    vtInitMarginLeft = 0;
    vtInitMarginTop = 0;

    ngOnInit() {
    }



    ngAfterViewInit(): void {
        this.ttInitMarginLeft = Number(this.ttref.nativeElement.style.marginLeft.slice(0, -3));
        this.ttInitMarginTop = Number(this.ttref.nativeElement.style.marginTop.slice(0, -3));
        this.vtInitMarginLeft = Number(this.vtref.nativeElement.style.marginLeft.slice(0, -3));
        this.vtInitMarginTop = Number(this.vtref.nativeElement.style.marginTop.slice(0, -3));


        console.log(this.ttref.nativeElement.style)
    }

    onMouseMove(e) {

        const targetWidth = e.target.clientWidth;
        const targetHeight = e.target.clientHeight;

        const mousePostionX = e.clientX;
        const mousePostionY = e.clientY;

        // this.ttref.nativeElement.style.marginLeft = String((mousePostionX - targetWidth / 2) / 2000 + this.ttInitMarginLeft) + 'rem';
        this.ttref.nativeElement.style.marginTop = String((targetHeight - mousePostionY) / 400 + this.ttInitMarginTop) + 'rem';

        // this.vtref.nativeElement.style.marginLeft = String((targetWidth - mousePostionX) / 2000 + this.vtInitMarginLeft) + 'rem';
        this.vtref.nativeElement.style.marginTop = String((targetHeight - mousePostionY) / 400 + this.vtInitMarginTop) + 'rem';
    }
}
